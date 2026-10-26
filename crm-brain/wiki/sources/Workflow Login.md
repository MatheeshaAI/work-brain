---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_Login.md"]
updated: 2026-10-22
tags: [imcrm, workflow, authentication]
summary: "How the owner signs in to the CRM with Google and two-step verification, and what the login script automates."
---
# Workflow Login

Describes signing in to the Alfred CRM ([[IMCRM]]). The file names the owner's work Google account and a phone model; it contains no password.

## Steps
1. **Prepare:** pick a Chrome profile that has the work credentials saved ([[Work browser profile]]); open the CRM login page.
2. **Login:** click "Google Login", choose the work account, enter the password if prompted.
3. **2-step verification:** a prompt is sent to the registered phone; approve it in the Gmail app or system notification.
4. **Scripted login:** a Chrome DevTools MCP script (`crm-login.js`) navigates, clicks, selects the account and types the password, but the phone approval stays manual. See [[Chrome DevTools Protocol]].
5. **Success:** redirect to Home or the lead page that was requested.

## Notes
- The system overview says the scripted CRM login reads email and password from a local `.env` file. That is a credential store; values are not copied here. See [[Health Insurance CRM system overview]].
- The manual 2FA step is why fully unattended CRM runs are not possible. See [[Approval gates]].
