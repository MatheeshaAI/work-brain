---
name: lead-updater
description: Update a lead's status, pending action, notes, or payment details — keeps the lead markdown file and PIPELINE.md in sync. Use when user says "update [REF_ID]", "mark [lead] as [status]", "change status for [lead]", "add note to [lead]", or provides payment info for a lead.
---

# Lead Updater — Status & Notes Sync

## When to Use
Triggered when the user provides an update for an existing lead (status change, payment info, notes, pending action update).

## Steps

### 1. Locate the lead file
Find `Workspace/Leads/HEA-[CODE]-[First]-[Last].md`

### 2. Apply the update to the lead markdown file
Only update what the user specified — do not add unrequested content:

| Update type | What to change |
|-------------|---------------|
| Status change | Update the `Status:` field |
| Payment info | Update `## Payment Details` section |
| Notes | Add to `## Notes` section |
| Pending action | Note what's next in the file |

### 3. Update PIPELINE.md

- Move the lead's row to the correct section (matching the new status)
- Update the **Pending Action** column
- Mark any completed checklist items as done (`[x]`)
- Add new checklist tasks if the update implies one

## Status → PIPELINE.md Section Mapping

| Lead Status | PIPELINE.md Section |
|-------------|-------------------|
| New Lead / Followed Up | New Leads |
| Quoted | In Progress |
| Payment Initiated / Payment Pending | Payment Stage |
| Policy Booked | Policy Booked |

## Notes
- Always update BOTH the lead file AND PIPELINE.md — never just one
- Do not add unrequested analysis, comments, or extra fields
- Only do what was asked — no scope creep
