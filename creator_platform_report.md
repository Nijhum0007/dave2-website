# Dave Platform: Creator Ecosystem & Architecture Report

This report outlines the business strategy, user upload workflows, hardware requirements, and technical infrastructure needed to launch your crowdsourced video-to-data platform.

---

## 1. Video Direction Strategy: "Bounties" vs. "Free-form"

**Recommendation:** You MUST provide specific video directions (guardrails). Do not let users upload "anything."

**Why?** 
1. **Garbage In, Garbage Out:** If you tell people to upload anything, 90% of the submissions will be useless (people walking down the street, staring at walls, or recording their TV). 
2. **What AI Labs Actually Buy:** Companies training robots want highly specific "manipulation" tasks. They want to see hands interacting with objects. They need videos of people folding laundry, opening doors, picking up mugs, using a screwdriver, or wiping a table. 
3. **The Bounty System:** You should implement a "Bounty Board" on your website. For example:
   - *Bounty 1:* "Open and close a microwave" (Requires Tier 2 or 3) - Payout: $2
   - *Bounty 2:* "Fold a t-shirt" (Requires Tier 1 or 2) - Payout: $5
   This gives users a fun, clear mission and guarantees you only collect data that you can actually sell.

---

## 2. Device, Format, and Upload Workflows (Tiers 1, 2, and 3)

Since you are using Google Drive links to save on database storage costs, every user will follow a similar core workflow: **Record -> Upload to personal Google Drive -> Ensure link is "Anyone with link can view" -> Submit link on your dashboard.**

### 🥇 Tier 1: Industrial Depth (For Robotics Engineers)
*Target Audience: Robotics students, labs, and professionals.*
- **Hardware Needed:** Intel RealSense (e.g., D435i), ZED Camera, or Azure Kinect, connected to a laptop/PC running Linux (Ubuntu).
- **Format Accepted:** `.bag` or `.mcap` (ROS / ROS2).
- **Workflow:**
  1. Mount the depth camera to a chest harness or head mount.
  2. Use ROS (Robot Operating System) terminal commands to record the RGB and Depth topics into a `.bag` file while performing the task.
  3. Transfer the `.bag` file to Google Drive.
  4. Generate a shareable link and paste it into the Dave Platform dashboard.

### 🥈 Tier 2: Consumer LiDAR (For Tech-Savvy Creators)
*Target Audience: Everyday users who own an iPhone Pro.*
- **Hardware Needed:** iPhone 15 Pro, iPhone 16 Pro, iPad Pro (Any Apple device with a physical LiDAR scanner).
- **Format Accepted:** `.r3d` (Record3D app) or `.zip` (Stray Scanner app).
- **Workflow:**
  1. Download the **Record3D** or **Stray Scanner** app from the App Store.
  2. Strap the phone to your chest (using a cheap GoPro chest mount) so your hands are free.
  3. Hit record in the app, perform the physical task (e.g., pouring water), and hit stop.
  4. Export the file from the app to your phone's files, upload it to the Google Drive app, and paste the link in your dashboard.

### 🥉 Tier 3: Standard Video (For the Masses)
*Target Audience: Anyone with a smartphone.*
- **Hardware Needed:** Any modern Android (e.g., Samsung S23 Ultra) or iPhone.
- **Format Accepted:** `.mp4`
- **Workflow:**
  1. Open the standard camera app on the phone.
  2. Mount the phone to your chest or head.
  3. Record the task at 30 or 60 FPS.
  4. Upload the `.mp4` to Google Drive and paste the link in your dashboard.

---

## 3. The "Plain English" Customer Guideline
*(You can copy and paste this directly onto your website for normal users)*

> ### How to Record and Get Paid
> We pay you to record simple, everyday tasks from your Point-of-View (POV). To ensure your video gets approved, please follow these rules:
> 
> **1. Hands Free (POV Only)**
> We need to see exactly what you see. You cannot hold the phone in your hand while recording. You must use a chest mount, head mount, or neck lanyard so both of your hands are visible in the video while you do the task.
> 
> **2. Choose Your Payout Tier**
> - **Standard Payout (Tier 3):** Use any Android or iPhone. Open your normal camera, record an `.mp4` video, and upload it. 
> - **Premium Payout (Tier 2):** If you have an iPhone 15 Pro, 16 Pro, or iPad Pro, you have a secret LiDAR sensor! Download the **Record3D** app or **Stray Scanner** app, record using the app, and upload the special `.r3d` or `.zip` file to get paid a premium rate!
> 
> **3. How to Submit**
> - Do not upload the video directly to our site.
> - Upload the video file to your own **Google Drive**.
> - Right-click the file in Google Drive, click **"Share"**, and change General Access to **"Anyone with the link"**.
> - Copy that link and paste it into our Bounty Dashboard to get paid!

---

## 4. User Dashboard Recommendations

To make the user experience seamless, their logged-in dashboard should contain:
1. **The Bounty Board:** A list of active tasks they can claim (e.g., "Make a cup of coffee").
2. **Submission Form:** A simple input field for the Google Drive link and a dropdown to select their Tier/Device.
3. **Wallet / Earnings:** A clear display of their pending and approved cash balances.
4. **Status Tracker:** A list of their submitted links showing if they are *Pending AI Verification*, *Approved*, or *Rejected (e.g., Hands not visible, Link not public)*.

---

## 5. Technical Infrastructure (GCP + Google Sheets)

You mentioned you want to host this on Google Cloud Platform (Compute Engine) and use Google Sheets as your database. Here is how that architecture works:

### Architecture Flow
1. **The Database (Google Sheets):** 
   - When a user submits a Drive link on your frontend, it uses the **Google Sheets API** to add a new row to your spreadsheet (Columns: `User_ID`, `Drive_Link`, `Tier`, `Status`, `Payout`).
   - *Pros:* Free, incredibly easy for your team to view and manage data visually.
   - *Cons:* Google Sheets is not a real database. It has API rate limits. If your platform goes viral and thousands of people submit links per minute, the Google Sheets API will crash. It is great for an MVP (Minimum Viable Product), but plan to migrate to PostgreSQL eventually.
2. **The Hosting (GCP Compute Engine - VM Instance):**
   - You will spin up an `e2-standard-4` (or similar) Ubuntu Virtual Machine on GCP.
   - Your React frontend and FastAPI backend (the Dave Platform code we built) will run on this VM.
   - When the backend reads a new row from Google Sheets, it will use Python (via `gdown` or Google Drive API) to automatically download the `.mp4` or `.r3d` from the user's Drive link into the VM's temporary storage.
   - The backend runs the kinematic extraction (generating the HDF5 data).
   - Once verified, the backend updates the Google Sheet row status to "Approved", triggering the payout.
