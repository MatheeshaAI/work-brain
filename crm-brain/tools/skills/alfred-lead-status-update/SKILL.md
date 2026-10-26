---
name: alfred-lead-status-update
description: Update a lead's status in IMCRM (e.g., mark as "Followed Up", "Quoted"). Use when user asks to update status in CRM, mark a lead as followed up in IMCRM, or change a lead's CRM status directly.
---

# Alfred Lead Status Update — IMCRM Status Change

## When to Use
Triggered when the user wants to change a lead's status directly in IMCRM (not just in local files).

## Steps

### 1. Navigate to the lead page
```
https://imcrm.alfred.ae/quotes/health/<8-char-REF_ID-code>
```

### 2. Locate the status dropdown on the lead detail page

### 3. Select the new status from the dropdown
Common values: `New Lead`, `Followed Up`, `Quoted`, `Payment Initiated`, `Payment Pending`, `Policy Booked`

### 4. ⚠️ CRITICAL: Click the Confirm / Change button after selecting
- Simply selecting the dropdown value does **NOT** save the change
- You MUST click the confirm/submit button for the new status to persist in IMCRM

### 5. Verify the page reflects the new status after saving

### 6. Update local files to match
- Update the `Status:` field in the lead's `.md` file
- Update the row in `Workspace/PIPELINE.md` to the correct section

## Status → PIPELINE.md Section Mapping

| Status | PIPELINE.md Section |
|--------|-------------------|
| New Lead / Followed Up | New Leads |
| Quoted | In Progress |
| Payment Initiated / Payment Pending | Payment Stage |
| Policy Booked | Policy Booked |

## Notes
- Always update both IMCRM and local files to keep them in sync
- If changing from `Quoted` → `Followed Up` during new lead onboarding, do this BEFORE sending the WhatsApp welcome message so the lead is not reassigned
