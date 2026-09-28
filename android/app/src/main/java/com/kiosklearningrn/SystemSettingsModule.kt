package com.kiosklearningrn

import android.Manifest
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.location.LocationManager
import android.media.AudioManager
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.wifi.WifiManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import java.util.Locale
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.math.roundToInt

class SystemSettingsModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val audioManager =
        reactContext.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    private val wifiManager =
        reactContext.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
    private val connectivityManager =
        reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    private val mainHandler = Handler(Looper.getMainLooper())

    override fun getName(): String = "SystemSettings"

    @ReactMethod
    fun getMediaVolume(promise: Promise) {
        try {
            promise.resolve(mediaVolumePercent())
        } catch (error: Exception) {
            promise.reject("MEDIA_VOLUME_READ_FAILED", error.message, error)
        }
    }

    @ReactMethod
    fun setMediaVolume(percent: Double, promise: Promise) {
        try {
            val min = mediaVolumeMin()
            val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
            val normalized = percent.coerceIn(0.0, 100.0) / 100.0
            val level = (min + normalized * (max - min)).roundToInt().coerceIn(min, max)
            audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, level, 0)
            promise.resolve(mediaVolumePercent())
        } catch (error: Exception) {
            promise.reject("MEDIA_VOLUME_WRITE_FAILED", error.message, error)
        }
    }

    @ReactMethod
    fun getWifiStatus(promise: Promise) {
        try {
            promise.resolve(wifiStatus())
        } catch (error: Exception) {
            promise.reject("WIFI_STATUS_READ_FAILED", error.message, error)
        }
    }

    @ReactMethod
    fun scanWifiNetworks(promise: Promise) {
        if (!hasFineLocationPermission()) {
            promise.reject(
                "WIFI_LOCATION_PERMISSION_REQUIRED",
                "Android requires location permission to list nearby Wi-Fi networks."
            )
            return
        }

        if (!wifiManager.isWifiEnabled || !isLocationEnabled()) {
            try {
                promise.resolve(wifiStatus())
            } catch (error: Exception) {
                promise.reject("WIFI_SCAN_FAILED", error.message, error)
            }
            return
        }

        val completed = AtomicBoolean(false)
        lateinit var receiver: BroadcastReceiver

        val finishScan = Runnable {
            if (completed.compareAndSet(false, true)) {
                try {
                    reactContext.unregisterReceiver(receiver)
                } catch (_: IllegalArgumentException) {
                    // The receiver may already have been removed by Android.
                }

                mainHandler.removeCallbacksAndMessages(receiver)
                try {
                    promise.resolve(wifiStatus())
                } catch (error: Exception) {
                    promise.reject("WIFI_SCAN_FAILED", error.message, error)
                }
            }
        }

        receiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                finishScan.run()
            }
        }

        try {
            val filter = IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                reactContext.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED)
            } else {
                @Suppress("DEPRECATION")
                reactContext.registerReceiver(receiver, filter)
            }

            mainHandler.postAtTime(finishScan, receiver, android.os.SystemClock.uptimeMillis() + 7_000)

            if (!wifiManager.startScan()) {
                // Android may throttle scans. Return the most recent system results.
                finishScan.run()
            }
        } catch (error: Exception) {
            try {
                reactContext.unregisterReceiver(receiver)
            } catch (_: Exception) {
                // It may not have been registered yet.
            }
            promise.reject("WIFI_SCAN_FAILED", error.message, error)
        }
    }

    @ReactMethod
    fun openWifiSettings(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No active Android Activity found.")
            return
        }

        try {
            val panel = Intent(Settings.Panel.ACTION_WIFI)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q && panel.resolveActivity(activity.packageManager) != null) {
                activity.startActivity(panel)
            } else {
                activity.startActivity(Intent(Settings.ACTION_WIFI_SETTINGS))
            }
            promise.resolve(true)
        } catch (_: Exception) {
            try {
                activity.startActivity(Intent(Settings.ACTION_WIFI_SETTINGS))
                promise.resolve(true)
            } catch (error: Exception) {
                promise.reject("WIFI_SETTINGS_UNAVAILABLE", error.message, error)
            }
        }
    }

    @ReactMethod
    fun openLocationSettings(promise: Promise) {
        val activity = reactContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No active Android Activity found.")
            return
        }

        try {
            activity.startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS))
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject("LOCATION_SETTINGS_UNAVAILABLE", error.message, error)
        }
    }

    private fun mediaVolumeMin(): Int =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            audioManager.getStreamMinVolume(AudioManager.STREAM_MUSIC)
        } else {
            0
        }

    private fun mediaVolumePercent(): Int {
        val min = mediaVolumeMin()
        val max = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
        if (max <= min) return 0
        val current = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC)
        return ((current - min) * 100.0 / (max - min)).roundToInt().coerceIn(0, 100)
    }

    private fun hasFineLocationPermission(): Boolean =
        reactContext.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) ==
            PackageManager.PERMISSION_GRANTED

    @Suppress("DEPRECATION")
    private fun isLocationEnabled(): Boolean {
        val manager = reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            manager.isLocationEnabled
        } else {
            manager.isProviderEnabled(LocationManager.GPS_PROVIDER) ||
                manager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)
        }
    }

    @Suppress("DEPRECATION")
    private fun wifiStatus(): WritableMap {
        val result = Arguments.createMap()
        val enabled = wifiManager.isWifiEnabled
        val hasLocationPermission = hasFineLocationPermission()
        val locationEnabled = isLocationEnabled()
        val connectedSsid = if (hasLocationPermission && locationEnabled) {
            wifiManager.connectionInfo?.ssid
                ?.removeSurrounding("\"")
                ?.takeUnless { it.isBlank() || it.equals("<unknown ssid>", ignoreCase = true) }
        } else {
            null
        }

        result.putBoolean("enabled", enabled)
        result.putBoolean("connected", isWifiConnected())
        result.putBoolean("locationPermissionGranted", hasLocationPermission)
        result.putBoolean("locationServicesEnabled", locationEnabled)
        result.putString("connectedSSID", connectedSsid)

        val networks = Arguments.createArray()
        if (enabled && hasLocationPermission && locationEnabled) {
            val seen = mutableSetOf<String>()
            wifiManager.scanResults
                .sortedByDescending { it.level }
                .forEach { scan ->
                    val ssid = scan.SSID?.trim().orEmpty()
                    if (ssid.isNotEmpty() && seen.add(ssid)) {
                        val capabilities = scan.capabilities?.uppercase(Locale.ROOT).orEmpty()
                        val secured = listOf("WEP", "PSK", "EAP", "SAE", "OWE")
                            .any(capabilities::contains)
                        networks.pushMap(Arguments.createMap().apply {
                            putString("ssid", ssid)
                            putBoolean("connected", ssid == connectedSsid)
                            putBoolean("secured", secured)
                            putInt("signalLevel", WifiManager.calculateSignalLevel(scan.level, 5))
                        })
                    }
                }
        }
        result.putArray("networks", networks)
        return result
    }

    private fun isWifiConnected(): Boolean {
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
    }
}
