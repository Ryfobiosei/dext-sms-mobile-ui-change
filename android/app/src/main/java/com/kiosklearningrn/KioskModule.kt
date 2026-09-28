package com.kiosklearningrn

import android.app.Activity
import android.app.ActivityManager
import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

internal object KioskPreferences {
    const val NAME = "kiosk_settings"
    const val MANAGED_ENABLED = "managed_kiosk_enabled"
}

class KioskModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private val devicePolicyManager =
        reactContext.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
    private val adminComponent =
        ComponentName(reactContext, KioskDeviceAdminReceiver::class.java)
    private val activityManager =
        reactContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    private val preferences =
        reactContext.getSharedPreferences(KioskPreferences.NAME, Context.MODE_PRIVATE)

    override fun getName(): String = "KioskModule"

    @ReactMethod
    fun isDeviceOwner(promise: Promise) {
        promise.resolve(isDeviceOwner())
    }

    @ReactMethod
    fun getKioskStatus(promise: Promise) {
        try {
            val mode = when (activityManager.lockTaskModeState) {
                ActivityManager.LOCK_TASK_MODE_LOCKED -> "locked"
                ActivityManager.LOCK_TASK_MODE_PINNED -> "pinned"
                else -> "none"
            }
            promise.resolve(Arguments.createMap().apply {
                putBoolean("deviceOwner", isDeviceOwner())
                putBoolean(
                    "managedKioskEnabled",
                    preferences.getBoolean(KioskPreferences.MANAGED_ENABLED, false)
                )
                putString("mode", mode)
            })
        } catch (error: Exception) {
            promise.reject("KIOSK_STATUS_ERROR", error.message, error)
        }
    }

    @ReactMethod
    fun startKiosk(promise: Promise) {
        val activity: Activity = reactApplicationContext.currentActivity
            ?: run {
                promise.reject("NO_ACTIVITY", "No active Android Activity found.")
                return
            }
        val managed = isDeviceOwner()

        try {
            if (managed) {
                devicePolicyManager.setLockTaskPackages(
                    adminComponent,
                    arrayOf(reactApplicationContext.packageName)
                )
                configureKioskHomeApp()
                if (!preferences.edit().putBoolean(KioskPreferences.MANAGED_ENABLED, true).commit()) {
                    clearKioskHomeApp()
                    promise.reject("KIOSK_PREFERENCE_ERROR", "Could not save kiosk mode state.")
                    return
                }
            }

            activity.runOnUiThread {
                try {
                    if (activityManager.lockTaskModeState == ActivityManager.LOCK_TASK_MODE_NONE) {
                        // Non-managed devices enter Android's user-confirmed screen-pinning flow.
                        activity.startLockTask()
                    }
                    promise.resolve(true)
                } catch (error: Exception) {
                    if (managed) {
                        preferences.edit().putBoolean(KioskPreferences.MANAGED_ENABLED, false).apply()
                        clearKioskHomeApp()
                    }
                    promise.reject("KIOSK_START_ERROR", error.message, error)
                }
            }
        } catch (error: Exception) {
            if (managed) {
                preferences.edit().putBoolean(KioskPreferences.MANAGED_ENABLED, false).apply()
                clearKioskHomeApp()
            }
            promise.reject("KIOSK_START_ERROR", error.message, error)
        }
    }

    @ReactMethod
    fun stopKiosk(promise: Promise) {
        preferences.edit().putBoolean(KioskPreferences.MANAGED_ENABLED, false).apply()
        if (isDeviceOwner()) {
            clearKioskHomeApp()
        }
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No active Android Activity found.")
            return
        }

        activity.runOnUiThread {
            try {
                if (activityManager.lockTaskModeState != ActivityManager.LOCK_TASK_MODE_NONE) {
                    activity.stopLockTask()
                }
                promise.resolve(true)
            } catch (error: Exception) {
                promise.reject("KIOSK_STOP_ERROR", error.message, error)
            }
        }
    }

    private fun isDeviceOwner(): Boolean =
        devicePolicyManager.isDeviceOwnerApp(reactApplicationContext.packageName)

    private fun configureKioskHomeApp() {
        val homeFilter = IntentFilter(Intent.ACTION_MAIN).apply {
            addCategory(Intent.CATEGORY_HOME)
            addCategory(Intent.CATEGORY_DEFAULT)
        }
        devicePolicyManager.addPersistentPreferredActivity(
            adminComponent,
            homeFilter,
            ComponentName(reactApplicationContext, MainActivity::class.java)
        )
    }

    private fun clearKioskHomeApp() {
        devicePolicyManager.clearPackagePersistentPreferredActivities(
            adminComponent,
            reactApplicationContext.packageName
        )
    }
}
