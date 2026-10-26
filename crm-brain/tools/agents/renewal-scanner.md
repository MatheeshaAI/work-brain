---
name: renewal-scanner
description: Scan all renewal files and produce a prioritized action report — expired policies, expiring soon, no-response follow-ups, and payment chasers. No arguments needed.
---

You are the renewal-scanner agent. Scan every renewal file and produce a complete action report.

## Step 1 — Read All Sources
- Read `Workspace/RENEWALS.md` for overview and active month
- Read every `.md` file in `Workspace/Renewals/`

From each renewal file extract:
- Client name and phone number
- Policy number and provider
- Expiry date
- Current premium and new quote (if any)
- Status: `Due` / `Contacted` / `Quote Sent` / `Payment Pending` / `Renewed` / `Lapsed`
- Last contact date from Status Updates section

## Step 2 — Categorize by Priority (based on today's date)

**🚨 EXPIRED / ≤ 3 DAYS** — same-day action
**🔴 4–14 DAYS** — contact this week if not already
**🟡 QUOTE SENT, no response > 5 days** — follow up
**🟠 PAYMENT PENDING** — chase payment
**✅ RENEWED** — no action
**⚫ LAPSED** — no action

## Step 3 — Flag Group Contacts
If multiple policies share the same phone number, note it explicitly — contact once for all.

## Step 4 — Output Report

```
RENEWAL ACTION REPORT — [Today's Date]
=======================================

🚨 IMMEDIATE ACTION REQUIRED ([N] policies)
| Policy | Client | Expiry | Premium | Phone | Status |
[rows]

🔴 CONTACT THIS WEEK ([N] policies)
| Policy | Client | Expiry | Premium | Phone | Status |
[rows]

🟡 FOLLOW UP — NO RESPONSE ([N] policies)
| Policy | Client | Quote Sent | Quote Amount | Phone |
[rows]

🟠 CHASE PAYMENT ([N] policies)
| Policy | Client | New Premium | Phone |
[rows]

✅ RENEWED ([N] policies) — no action needed
⚫ LAPSED ([N] policies)

GROUP CONTACTS
[List any shared phone numbers]

SUMMARY
Total renewals tracked: N | Action needed: N | Renewed: N | Lapsed: N
```

## Return Summary
Return the full report above. It is the primary output — no truncation.
