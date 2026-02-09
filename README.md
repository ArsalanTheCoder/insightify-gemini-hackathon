# 🛡️ Insightify: Multimodal AI Scam Defense

<div align="center">
  <img src="https://github.com/user-attachments/assets/03f9553b-0493-4f5e-b966-dfa332b9f939" width="180" alt="Insightify Logo">
  <h1 style="margin-top: 0px;">🛡️ Insightify: Multimodal AI Scam Defense</h1>
</div>

> **The world's first Multimodal Scam Detector powered by Google Gemini 3.** > *Protecting humans from AI voice clones, deepfakes, and social engineering fraud.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/React_Native-Node.js-blue)](https://reactnative.dev/)
[![AI Power](https://img.shields.io/badge/Powered_by-Gemini_3_Flash-purple)](https://deepmind.google/technologies/gemini/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Submission-success)]()

---

## 📜 Table of Contents
- [Inspiration](#-inspiration)
- [Key Features](#-key-features)
- [How It Works (Architecture)](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#-installation-guide)
- [Smart Fallback System](#-smart-fallback-system)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)

---

## 💡 Inspiration
Scams are no longer just poorly written emails. Today, scammers use **AI Voice Cloning** to mimic loved ones and **Deepfake Videos** to fabricate celebrity endorsements. Traditional antivirus software protects devices from malware, but it fails to protect *people* from psychological manipulation.

We built **Insightify** to be the "Human Firewall"—an intelligent guardian that uses the same advanced AI technology to detect fraud that scammers use to commit it.

---

## 🚀 Key Features

### 🕵️‍♂️ Multimodal Detection
Insightify goes beyond text. It analyzes:
* **Audio:** Detects synthetic voice patterns, urgency, and fear in voice notes.
* **Video:** Identifies deepfake artifacts and lip-sync anomalies.
* **Images:** Scans screenshots of emails, texts, and websites for phishing indicators.
* **Text:** Uncovers social engineering patterns (e.g., "Pig Butchering", "Tech Support").

### 🧠 Powered by Gemini 3 Flash
We utilize Google's latest experimental model for complex reasoning, allowing the app to understand *context*, not just keywords.

### 🎮 Gamified Security
* **Earn XP:** Users get points for scanning messages and learning about safety.
* **Leaderboard:** Compete globally to become an "AI Awareness Champion."
* **Badges:** Unlock achievements for staying vigilant.

### 📢 Community Defense
* **Real-time Feed:** Get alerts about trending scams (e.g., "$200M Voice Cloning Fraud") in your area.
* **Report System:** Instantly report suspicious numbers to a shared database.

---

## 🏗 How It Works

Insightify uses a hybrid cloud architecture to ensure speed and reliability.

<img width="1376" height="704" alt="system architecture" src="https://github.com/user-attachments/assets/fcf668e5-2b09-4610-b79f-423c6628d95c" />


1.  **User Input:** The user uploads a file (Audio/Video/Image) via the React Native App.
2.  **Backend Processing:** The Node.js server receives the file and processes it for the AI.
3.  **Smart Routing:**
    * **Primary:** Request sent to **Gemini 3 Flash** for deep reasoning.
    * **Fallback:** If Gemini 3 is busy/overloaded, the system *automatically* switches to **Gemini 1.5 Flash**.
4.  **Analysis:** The AI returns a **Risk Score (0-100%)**, a **Verdict (Safe/Dangerous)**, and a detailed **Forensic Explanation**.
5.  **Result:** The user sees a clear Red or Green alert screen.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Mobile App** | React Native | Cross-platform (iOS/Android) UI. |
| **Backend** | Node.js / Express | API handling and file processing. |
| **AI Model A** | **Gemini 3 Flash** | Primary multimodal reasoning engine. |
| **AI Model B** | **Gemini 1.5 Flash** | Stable fallback engine for 100% uptime. |
| **Database** | MongoDB / Firebase | Storing user profiles, XP, and reports. |
| **Hosting** | Railway | Backend deployment. |
| **Animations** | Lottie | Interactive UI elements. |

---

## 💻 Installation Guide

Follow these steps to run Insightify locally.

### Prerequisites
* Node.js (v18+)
* React Native CLI environment setup
* Google Gemini API Key

### 1. Backend Setup
```bash
# Clone the repository
git clone [https://github.com/yourusername/insightify.git](https://github.com/yourusername/insightify.git)
cd insightify/backend

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_google_api_key_here" > .env
echo "PORT=5000" >> .env

# Run the server
npm start
