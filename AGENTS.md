# Work Brain: rules for every agent

This repo is the owner's shared work memory (Hermes, Codex, OpenCode, Claude and any other agent). Read `CLAUDE.md` for the full layout: two sub-brains, `crm-brain/` (how the desk sells and tracks) and `insurance-brain/` (what the desk sells).

## What you may write
- **Only** new files in one of the two inbox folders:
  - `crm-brain/raw/Inbox - To sort/`: leads, clients, pipeline, IMCRM, renewals, WhatsApp, follow-ups, bookings, commissions, desk tools.
  - `insurance-brain/raw/Inbox - To sort/`: insurers, TPAs, networks, plans, prices, coverage, underwriting, claims, documents.
  - Not sure which? Use `crm-brain` and set `brain: unsure`.
- Never edit or delete anything else. The wiki is filed from the inbox by the daily filing job.
- Do not commit or push. The sync script on each machine does that.

## When to write a note
At the end of any task worth remembering: a lead or client worked, a quote or plan found, a rule or price learned, an SOP changed, a tool built or fixed, a decision made. One note per task. Skip trivial chat.

## Note format
File name: `YYYY-MM-DD_HHMM_<agent>_<machine>_<short-title>.md`, for example `2026-10-27_0915_codex_office_nas-network-check.md`. Use lowercase, hyphens, and no spaces in the title part.

```
---
date: 2026-10-27 09:15
agent: codex
machine: office
brain: crm | insurance | unsure
tags: []
---
# Short title

What happened, in a few lines.

## Worth remembering
- Facts, rules, prices, decisions learned.

## Next steps
- Follow-ups, if any.
```

## Never put in a note
- Passwords, API keys, tokens, cookies, card or account numbers, Emirates ID or passport numbers.
- Personal life topics (family, personal finance, side projects). Those belong in the separate personal brain, which is not on this machine.
- Client detail beyond what the task needs. Refer to clients by lead reference (for example `HEA-XXXXXXXX`) rather than full name and phone when you can.
