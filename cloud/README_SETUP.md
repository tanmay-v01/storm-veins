# 🪐 24/7 Antigravity Sovereign Cloud Setup (PC-Off Autonomy)

Operate your Antigravity AI pair programmer and Storm Veins outreach engine **24/7/365 without needing your computer on**.

---

## 📱 Part 1: Mobile Gmail Executive Agent (2-Minute Setup)
*Runs 100% free on Google Cloud servers. Your PC can be completely turned off or unplugged.*

### Step 1: Open Google Apps Script
1. In your browser (logged into `tanmayv86@gmail.com`), go to: **[script.google.com](https://script.google.com)**
2. Click **New project** (top-left).
3. Name the project **Antigravity Gmail Agent**.

### Step 2: Paste the Code
1. Open [`cloud/antigravity_gmail_agent.js`](./antigravity_gmail_agent.js).
2. Copy the entire file contents.
3. In the Google Apps Script editor, delete any existing code in `Code.gs` and **Paste** the code.
4. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your Gemini API Key on line 37 (or add it in **Project Settings ⚙️ > Script Properties** with key `GEMINI_API_KEY`).
5. Click the **Save 💾** icon (or `Ctrl + S`).

### Step 3: Add the 24/7 Cloud Background Trigger
1. Click the **Clock icon (Triggers ⏰)** on the left sidebar.
2. Click **+ Add Trigger** (bottom-right).
3. Configure the trigger:
   - **Choose which function to run**: `processAntigravityGmailCommands`
   - **Select event source**: `Time-driven`
   - **Select type of time based trigger**: `Minutes timer`
   - **Select minute interval**: `Every 5 minutes` (or `Every minute`)
4. Click **Save**.
5. When Google prompts for authorization, click **Review permissions** > Select your Google Account > Click **Advanced** > Click **Go to Antigravity Gmail Agent (unsafe)** > Click **Allow**.

---

### 📲 How to Use From Your Phone (Anytime, Anywhere!)
1. Open the **Gmail App** on your iPhone / Android phone.
2. Compose an email to yourself (`tanmayv86@gmail.com`).
3. Set the **Subject** starting with `[Antigravity]` or `[AGY]`:
   - `[Antigravity] Status report on Storm Veins CRM`
   - `[Antigravity] Draft a follow-up proposal for Sobha Realty`
   - `[Antigravity] Add lead: Godrej Properties, Anil Kumar, VP Projects, anil@godrej.com`
   - `[Antigravity] What are our best converting hooks for MEP engineering consultancies?`
4. Send the email.
5. Within seconds, Google Cloud executes your instruction via Gemini and **emails you back a formatted executive briefing right in the Gmail thread!**

---

## 🐙 Part 2: GitHub Actions Cloud Cadence Scheduler
*Already configured in [`.github/workflows/daily_crm_cloud.yml`](../.github/workflows/daily_crm_cloud.yml).*

- **Automatic Daily Cadence**: Runs at **06:00 UTC (11:30 AM IST)** every single day on GitHub's cloud runners without touching your laptop.
- **Manual 1-Click Trigger**:
  1. Go to your GitHub repository: `https://github.com/tanmay-v01/storm-veins`
  2. Click **Actions** > **Storm Veins 24/7 Cloud Cadence & Inbound Watcher**.
  3. Click **Run workflow**.

---

## 🌐 Part 3: Deploy Full Web Studio to Free Cloud Hosting (Optional)
*To keep the full online Web Studio and Anti Chat console live on a permanent public HTTPS URL 24/7:*

1. Sign up for free at **[render.com](https://render.com)** (or **[koyeb.com](https://koyeb.com)**).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `tanmay-v01/storm-veins`.
4. Render will automatically detect the [`Dockerfile`](../Dockerfile) and [`render.yaml`](../render.yaml).
5. Add Environment Variable:
   - `GEMINI_API_KEY`: *(Your Gemini API Key)*
   - `ANTICHAT_PASSWORD`: `anti-ops`
   - `VITE_STUDIO_PASSWORD`: `storm-ops`
6. Click **Deploy**.
7. You will receive a permanent HTTPS link (e.g. `https://stormveins-crm.onrender.com`) where your Studio and Anti Chat will stay online 24/7!
