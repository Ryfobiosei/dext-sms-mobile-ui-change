package com.kiosklearningrn

import android.app.ActivityManager
import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.content.Context
import android.os.Bundle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {

    private lateinit var devicePolicyManager: DevicePolicyManager
    private lateinit var adminComponent: ComponentName

    override fun getMainComponentName(): String = "main"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegateWrapper(
            this,
            BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
            object : DefaultReactActivityDelegate(
                this,
                mainComponentName,
                fabricEnabled
            ) {}
        )
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)

        devicePolicyManager =
            getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager

        adminComponent =
            ComponentName(this, KioskDeviceAdminReceiver::class.java)

    }

    override fun onResume() {
        super.onResume()

        window.decorView.postDelayed({ enterManagedKioskIfEnabled() }, 500)
    }

    private fun enterManagedKioskIfEnabled() {
        val kioskEnabled = getSharedPreferences(KioskPreferences.NAME, Context.MODE_PRIVATE)
            .getBoolean(KioskPreferences.MANAGED_ENABLED, false)
        if (!kioskEnabled || !devicePolicyManager.isDeviceOwnerApp(packageName)) {
            return
        }

        try {
            devicePolicyManager.setLockTaskPackages(
                adminComponent,
                arrayOf(packageName)
            )

            val activityManager =
                getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager

            if (
                activityManager.lockTaskModeState ==
                ActivityManager.LOCK_TASK_MODE_NONE
            ) {
                startLockTask()
            }

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
