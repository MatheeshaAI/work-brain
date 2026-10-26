---
name: renewal-updater
description: Update a renewal client's status, quote details, or payment info — keeps the renewal markdown file, RENEWALS.md, and PIPELINE.md all in sync. Use when user says "update renewal for [client]", "renewal status change", "[client] — sent quote [amount]", or provides renewal payment info.
---

# Renewal Updater — Renewal Status Sync

## When to Use
Triggered when the user provides an update for a renewal client (new quote, status change, payment received, policy renewed).

## Steps

### 1. Find the renewal file
Locate `Workspace/Renewals/[Provider]-[PolicyNumber]-[First]-[Last].md`

File naming convention:
| Provider | Example filename |
|----------|----------------|
| TE | `TE-3450982303-First-Last.md` (last 10 digits of full policy number) |
| DIC | `DIC-572095-First-Last.md` (short policy number) |

### 2. Update the renewal markdown file
Apply only the changes the user specified:
- Update `Status:` field
- Add new quote details (plan name, insurer, premium amount)
- Add payment information if provided
- Add a dated note for the update

### 3. Move the row in RENEWALS.md
Move the client's row to the correct section matching the new status:

```
🔴 Due → 🟠 Contacted → 🟡 Quote Sent → 🔵 Payment Pending → ✅ Renewed → ❌ Lapsed
```

### 4. Update PIPELINE.md
- Update the renewal row in the Renewals table (status + pending action)
- If status changed to `Renewed`: update Production Summary totals

## Renewal Status Values

`Due` → `Contacted` → `Quote Sent` → `Payment Pending` → `Renewed` → `Lapsed`

## Notes
- Always update all three files: renewal `.md`, `RENEWALS.md`, and `PIPELINE.md`
- Never update just one file — all three must stay in sync
