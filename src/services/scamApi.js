// src/services/scamApi.js
import { API_BASE_URL, SCORE_ENDPOINT, ANALYZE_ENDPOINT } from '../config/api';

/**
 * 1. BATCH SCORING (For Feed & Notifications)
 * Keeps existing functionality working.
 */
export async function scoreMessages(items) {
  try {
    const response = await fetch(`${API_BASE_URL}${SCORE_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error('❌ Batch API error:', err.message || err);
    return [];
  }
}

/**
 * 2. MULTIMODAL ANALYSIS (For Detect Screen)
 * Handles Text + Image/Audio/Video safely.
 */
export async function analyzeText(text, media = null) {
  try {
    // 🔍 Debug Log
    console.log(`📤 Sending to API... Text: ${!!text}, Media: ${media ? media.mimeType : 'False'}`);

    // Construct Payload
    const bodyPayload = { 
      text: text || "Analyze this content", // Fallback text prevents backend crash
      media: media // Contains { base64, mimeType, type }
    };

    const response = await fetch(`${API_BASE_URL}${ANALYZE_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server Error:', errorText);
      throw new Error('Server returned ' + response.status);
    }

    const data = await response.json();
    return data; // Returns { score, risk, reason }

  } catch (err) {
    console.error('❌ Analyze API Error:', err);
    // Return safe fallback so app doesn't crash
    return { 
      score: 50, 
      risk: "Error", 
      reason: "Connection failed or file too large. Please try again." 
    };
  }
}