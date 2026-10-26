---
name: renewal-scanner
description: Scan all renewal files and produce a prioritized action report — expired policies, expiring soon, no-response follow-ups, and payment chasers. Use when user says "renewal check", "what renewals are due", "renewal report", "what renewals need attention", or "scan renewals".
---

# Renewal Scanner — Prioritized Renewal Report

## When to Use
Triggered when the user wants an overview of the current renewal pipeline and what actions are needed.

## Steps

### 1. Read RENEWALS.md
Get the current state and section of all renewal clients.

### 2. Read all individual renewal files
Scan all `.md` files in `Workspace/Renewals/` to extract:
- Policy expiry date
- Last contact date
- Current status
- Quote amount (if any)
- Payment status

### 3. Categorize by urgency

| Category | Criteria |
|----------|---------|
| 🔴 Expired / Overdue | Expiry date already passed, not yet renewed |
| 🟠 Expiring Soon | Active, but expiry within 30 days |
| 📞 No Response | Contacted or quoted, no reply in 5+ days |
| 💳 Payment Pending | Client agreed, awaiting payment |
| ✅ Renewed | Completed (for reference only) |

### 4. Produce the prioritized report

```
RENEWAL ACTION REPORT — [Today's Date]

🔴 EXPIRED / OVERDUE (N clients)
• [Name] — [Policy Number] — expired [date] — last contact: [date]

🟠 EXPIRING SOON (N clients)
• [Name] — [Policy Number] — expires [date] — status: [status]

📞 NO RESPONSE (N clients)
• [Name] — quote sent [date] — [amount] AED — no reply

💳 PAYMENT PENDING (N clients)
• [Name] — [amount] AED — agreed on [date]

✅ RENEWED THIS MONTH (N clients)
• [Name] — [amount] AED
```

## Notes
- Today's date is in the system context — use it to calculate days remaining / overdue
- Flag anything expired at the very top
- Suggested next actions should be one line per client, actionable and specific
