# FDP 2026 Registration Portal · Intelligent Technologies & Autonomous Systems
### Al-Azhar College of Engineering and Technology
**Department of Artificial Intelligence & Machine Learning**

A responsive, single-page registration portal for the 6-Day Online Faculty Development Programme (FDP) on **Intelligent Technologies and Autonomous Systems** (30 November – 5 December 2026).

---

## 🚀 How to Push to GitHub & Publish on GitHub Pages

### Step 1: Initialize Git and Push to GitHub
Open your terminal (PowerShell or Bash) in this project folder and run:

```bash
# 1. Initialize local git repository
git init

# 2. Add all files
git add .

# 3. Create your first commit
git commit -m "Initial commit: FDP 2026 Registration Portal with CSV export and GitHub Pages support"

# 4. Set the default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

### Step 2: Publish on GitHub Pages (Takes 30 seconds)
1. Go to your repository on [GitHub](https://github.com).
2. Click **Settings** (top navigation tab with gear icon).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
5. Wait 1–2 minutes. Refresh the page. You will see a banner:
   > **Your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`**

---

## 📊 How Responses Are Saved to CSV

You have **two powerful ways** to collect and download responses in CSV format:

### Method 1: Google Sheets Cloud Integration (Recommended for Live Deployments)
All registrations automatically append to a live Google Sheet in real time, from which you can download CSV anytime.

1. Go to [Google Sheets](https://sheets.new) and create a new sheet named **"FDP 2026 Registrations"**.
2. Click **Extensions > Apps Script**.
3. Copy and paste the entire code from [`google-sheets-script.js`](./google-sheets-script.js).
4. Click **Deploy > New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** *(Crucial!)*
5. Click **Deploy**, authorize permissions, and copy the generated **Web app URL**.
6. Open `index.html`, find line ~110:
   ```javascript
   var ENDPOINT = "";
   ```
   Paste your Web app URL:
   ```javascript
   var ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
7. Commit and push to GitHub! Every registration is now logged directly to your Google Sheet.
8. To download as CSV: In Google Sheets, click **File > Download > Comma-separated values (.csv)**.

---

### Method 2: Built-in Client-Side CSV Export (Works Immediately)
- **For Participants**: Right after submitting, participants see a confirmation screen with a button:
  **`📥 Download Confirmation (CSV)`** to download their personal registration receipt (`FDP_Registration_[ID].csv`).
- **For Coordinators**: In the footer, click:
  **`📊 Export All Registrations (CSV)`** (Enter PIN: `fdp2026`).
  This immediately downloads `FDP_All_Registrations_[Date].csv` with all recorded participants.

---

## 📁 Repository Structure
- `index.html`: Main entry point for GitHub Pages (fully self-contained with responsive CSS, embedded logos, and validation).
- `google-sheets-script.js`: Ready-to-use Google Apps Script backend for real-time Google Sheet & CSV logging.
- `.nojekyll`: Disables Jekyll processing on GitHub Pages for fast and reliable serving.
- `.gitignore`: Ignores temporary and backup files.
