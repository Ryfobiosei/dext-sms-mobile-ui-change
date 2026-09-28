package com.kiosklearningrn

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.app.admin.DevicePolicyManager

class BootReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (
            intent.action == Intent.ACTION_BOOT_COMPLETED
        ) {
            val devicePolicyManager =
                context.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
            val kioskEnabled = context.getSharedPreferences(
                KioskPreferences.NAME,
                Context.MODE_PRIVATE
            ).getBoolean(KioskPreferences.MANAGED_ENABLED, false)

            if (!kioskEnabled || !devicePolicyManager.isDeviceOwnerApp(context.packageName)) {
                return
            }

            val launchIntent = context.packageManager
                .getLaunchIntentForPackage(context.packageName)

            launchIntent?.addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                        Intent.FLAG_ACTIVITY_CLEAR_TOP
            )

            if (launchIntent != null) {
                context.startActivity(launchIntent)
            }
        }
    }
}
