package com.insightify

import java.util.Locale
import java.util.regex.Pattern

object ScamFilter {

    private val LINK_PATTERN: Pattern = Pattern.compile(
        "(https?://|www\\.|bit\\.ly|tinyurl|\\b(?:\\w+\\.)+\\w{2,}\\b)",
        Pattern.CASE_INSENSITIVE
    )

    private val urgencyWords = listOf(
        "urgent",
        "immediately",
        "asap",
        "now",
        "last chance",
        "limited time",
        "verify",
        "verify now",
        "act now",
        "suspend",
        "suspended",
        "blocked",
        "expire",
        "expired"
    )

    private val sensitiveWords = listOf(
        "bank",
        "account",
        "password",
        "pin",
        "otp",
        "one-time",
        "transaction",
        "card",
        "credit",
        "debit",
        "verification",
        "ssn"
    )

    fun computeLocalScore(title: String, text: String): Int {
        var score = 0
        val combined = "$title $text".lowercase(Locale.getDefault())

        if (looksLikePhoneNumber(title)) {
            score += 1
        }

        if (LINK_PATTERN.matcher(combined).find()) {
            score += 1
        }

        if (urgencyWords.any { combined.contains(it) }) {
            score += 1
        }

        if (sensitiveWords.any { combined.contains(it) }) {
            score += 1
        }

        return score
    }

    fun shouldSendToBackend(title: String, text: String): Boolean {
        return computeLocalScore(title, text) >= 2
    }

    private fun looksLikePhoneNumber(s: String?): Boolean {
        if (s.isNullOrBlank()) return false

        val t = s.trim()
        val digitCount = t.count { it.isDigit() }

        if (t.startsWith("+") && digitCount >= 6) return true
        if (digitCount >= 7 && digitCount >= t.length / 2) return true

        val cleaned = t.replace("[\\s\\-()]+".toRegex(), "")
        return cleaned.length >= 7 && cleaned.all { it.isDigit() }
    }
}
