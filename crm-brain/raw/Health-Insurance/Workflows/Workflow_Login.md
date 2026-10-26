# Workflow: IMCRM Authentication

This document outlines the steps to log into the InsuranceMarket CRM (IMCRM) using Google Authentication.

## Phase 1: Preparation
1. **Profile Selection:** Use a Chrome profile where your work credentials might be saved (e.g., "Default" or "insurancemarket.ae").
2. **URL:** Navigate to `https://imcrm.alfred.ae/login`.

## Phase 2: Login Process
1. **Google Auth:** Click the **"Google Login"** button on the main login screen.
2. **Account Selection:** Select the account: `matheesha.sarathchandra@insurancemarket.ae`.
3. **Password Entry:**
   - If prompted, enter your password.
   - Click **"Next"**.

## Phase 3: 2-Step Verification (2FA)
1. **Mobile Notification:** A notification will be sent to your registered device (e.g., iPhone 14 Pro Max).
2. **Action:** Open the **Gmail App** or the system notification on your phone.
3. **Approval:** Tap **"Yes, it's me"** to authorize the login.

## Phase 4: Automated Login (Using Script)
If you are using the provided automation script:
1. Run the script: `npx chrome-devtools-mcp run-script crm-login.js`.
2. The script will automatically navigate, click the login button, select your account, and enter the password.
3. **Manual Step:** You will still need to perform the **2-Step Verification** on your phone when the prompt appears.

## Success State
Once authenticated, you should be redirected to the Home page or the specific lead page you were trying to access.
