package com.insightify

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import org.json.JSONObject

object ScamNotifier {

    private const val TAG = "SCAM_DEBUG"
    private const val CHANNEL_ID = "scam_alerts"
    private const val CHANNEL_NAME = "Scam Alerts"

    /**
     * Show high-priority system alert for dangerous scam
     */
    fun showAlertNotification(
        context: Context,
        payload: JSONObject
    ) {
        try {
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

            // Android 8+ notification channel
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
                ).apply {
                    description = "Alerts for suspected scam messages"
                    enableVibration(true)
                }
                nm.createNotificationChannel(channel)
            }

            val title = payload.optString("title", "Unknown")
            val text = payload.optString("text", "")
            val score = payload.optDouble("score", 0.0)

            val shortText =
                if (text.length > 120) text.substring(0, 120) + "…" else text

            // 🔐 Persist payload for cold-start handling (NotificationModule will read this)
            val prefs = context.getSharedPreferences(NotificationModule.PREFS, Context.MODE_PRIVATE)
            prefs.edit().putString(NotificationModule.KEY_LAUNCH_PAYLOAD, payload.toString()).apply()

            // 🔗 Launch Insightify when notification tapped — include the payload in extras
            val launchIntent =
                context.packageManager.getLaunchIntentForPackage(context.packageName)
            launchIntent?.apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                // Put the payload directly so MainActivity.handleLaunchIntent can read it immediately
                putExtra("payload", payload.toString())
                // Also set a recognizable action in case you want to filter it inside MainActivity
                action = NotificationModule.ACTION_NOTIFICATION
            }

            val requestCode = payload.optString("id").hashCode()
            val pendingFlags =
                PendingIntent.FLAG_UPDATE_CURRENT or
                        (if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
                            PendingIntent.FLAG_IMMUTABLE else 0)

            val pi = PendingIntent.getActivity(
                context,
                requestCode,
                launchIntent,
                pendingFlags
            )

            val notif = NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.stat_sys_warning) // replace with app drawable if you want
                .setContentTitle("⚠️ Possible Scam Detected")
                .setContentText("$title: $shortText")
                .setStyle(
                    NotificationCompat.BigTextStyle().bigText(
                        "$text\n\nRisk Score: ${(score * 100).toInt()}%"
                    )
                )
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setContentIntent(pi)
                .setAutoCancel(true)
                .build()

            val notifId = payload.optString("id").hashCode()
            nm.notify(notifId, notif)

            Log.d(TAG, "🚨 Scam alert notification shown (id=${payload.optString("id")})")

            // Also broadcast so RN in foreground receives it immediately
            val broadcast = Intent(NotificationModule.ACTION_NOTIFICATION)
            broadcast.putExtra("payload", payload.toString())
            context.sendBroadcast(broadcast)

        } catch (e: Exception) {
            Log.e(TAG, "showAlertNotification failed", e)
        }
    }
}
