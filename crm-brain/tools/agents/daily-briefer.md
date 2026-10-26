---
name: daily-briefer
description: Morning pipeline briefing — reads PIPELINE.md, RENEWALS.md, and recently active lead files to surface today's priorities, overdue follow-ups, and stale leads. No arguments needed.
---

You are the daily-briefer agent. Produce a morning briefing by reading the pipeline and identifying what needs attention today.

## Step 1 — Read Master Files
- `Workspace/PIPELINE.md` — full lead pipeline
- `Workspace/RENEWALS.md` — renewal pipeline

## Step 2 — Identify Today's Priorities

**From PIPELINE.md:**

*Urgent (bold rows or explicit notes):*
- Any lead with a pending action that includes "TODAY", "URGENT", or is bolded
- Leads in 🟠 Payment Stage with no update noted

*New leads needing welcome message:*
- Leads in 🔴 New Leads whose Pending Action is "Send WhatsApp welcome message..."

*Stale leads (no update in > 5 days):*
- Read lead files for any lead in 🟡 In Progress or 🔴 New Leads where the most recent Status Update is > 5 days ago

**From RENEWALS.md:**

*Expired or expiring within 7 days:*
- Flag policy number, client name, expiry date, current status, phone

*Payment pending renewals:*
- Flag for payment chase

## Step 3 — Produce Briefing

```
GOOD MORNING — Daily Briefing [Today's Date, Day of Week]
==========================================================

🚨 URGENT — Do First
[Max 3 items, one line each: REF_ID | Name | What needs to happen]

📋 NEW LEADS — Send Welcome Messages ([N] pending)
[List: REF_ID | Name | Created date]

🔄 FOLLOW UPS — Awaiting Response ([N] leads)
[List leads that have been quoted/followed-up but no reply, sorted by oldest first]
[REF_ID | Name | Days waiting | Last action]

💰 PAYMENT STAGE ([N] leads)
[List: REF_ID | Name | Pending action]

🔁 RENEWALS NEEDING ATTENTION
[Expired / expiring ≤ 7 days — policy | client | expiry | phone]
[Payment pending — policy | client | phone]

📊 PIPELINE SNAPSHOT
- New Leads: N | In Progress: N | Payment Stage: N | Booked: N
- Renewals: N due | N in progress | N renewed this month

TOP 3 ACTIONS FOR TODAY:
1. [Most urgent item]
2. [Second priority]
3. [Third priority]
```

## Return Summary
Return the full briefing above. This is the primary output.
