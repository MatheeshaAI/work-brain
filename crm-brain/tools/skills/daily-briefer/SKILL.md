---
name: daily-briefer
description: Morning pipeline briefing — reads PIPELINE.md, RENEWALS.md, and recently active lead files to surface today's priorities, overdue follow-ups, and stale leads. Use when user says "morning briefing", "what's today", "what do I have today", "daily briefing", "priorities today", or "what should I focus on".
---

# Daily Briefer — Morning Pipeline Briefing

## When to Use
Triggered at the start of the workday when the user wants a prioritized overview of what needs attention today.

## Steps

### 1. Read the core pipeline files
- `Workspace/PIPELINE.md` — all active leads, statuses, and pending actions
- `Workspace/RENEWALS.md` — all renewal clients and current statuses

### 2. Note recently active leads
Check the Workspace/Leads/ folder for files modified in the last 24–48 hours — these are leads with recent activity worth highlighting.

### 3. Categorize by priority

| Category | What belongs here |
|----------|-----------------|
| 🔴 Urgent / Overdue | Pending actions that are past due; renewals past expiry |
| 🟠 Follow Up Today | Leads awaiting response for 2+ days; renewals expiring ≤ 30 days not yet contacted |
| 🟡 In Progress | Leads with active quotes pending client decision; payment pending items |
| 📋 Admin | Documents not yet filed; policy bookings not yet completed |

### 4. Produce the morning briefing

```
MORNING BRIEFING — [Today's Date]

🔴 URGENT (N items)
• [REF_ID] [Name] — [what needs to happen]

🟠 FOLLOW UP TODAY (N items)
• [REF_ID] [Name] — last contact [date] — [what to do]

🟡 IN PROGRESS (N items)
• [REF_ID] [Name] — [current status and next step]

📋 ADMIN (N items)
• [task description]

RENEWALS NEEDING ATTENTION: N
• [Name] — [what's needed]
```

## Notes
- Keep the briefing scannable — bullet points only, no long paragraphs
- Today's date is in the system context
- Surface the most time-sensitive items first — the user should be able to act immediately from this output
