---
type: concept
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/browser-profile.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Context/do-not-do.md", "raw/20_AI-and-Agents/My-Shared-Brain/memory/2026-05-17.md"]
updated: 2026-10-22
tags: [browser, profiles, sales, safety]
summary: "Work happens in the browser profile already logged into IMCRM, WhatsApp Business and Gmail, and agents open their own controlled tabs instead of reusing whatever is open."
---
# Work browser profile

The shared brain drives a real, already-signed-in browser. Which profile it drives, and how it handles tabs, is a rule with safety consequences - see [[Automation guardrails]] and [[Browser harness]].

## The rule
Use the profile logged into **IMCRM**, **WhatsApp Business** and **Gmail** for work. For any automation task, open a fresh controlled tab. Never mix the personal and work profiles.

## Why controlled tabs
- The harness can see other tabs in the same profile, but it can safely control only the tabs it opened itself.
- A fresh tab avoids disturbing whatever the owner is doing and gives the agent a known starting state.
- For IMCRM work, open the controllable tab before extracting or navigating; for WhatsApp work, open a controllable WhatsApp Web tab before reading chats or drafting.
- If the wrong profile is open, switch before starting, not mid-task.

## Where it comes from
- `browser-profile.md` in the Sales workspace context. See [[Sales Context File Set]].
- The daily note for 2026-05-17 records the moment the real browser profile was attached and confirmed: a video site, WhatsApp Web and the company CRM were all reachable. See [[Shared Brain Daily Notes May 2026]].
- The vault already has the risk framing in [[Browser Use real browser profiles]].

## Caveats
- The rule lives in the Sales workspace, but the profile is the one the shared brain uses generally - so a task outside Sales has no written profile instruction.
- Reusing a logged-in session means the agent inherits whatever access the owner granted, including mail and messaging accounts.

Related: [[My Shared Brain]], [[Browser harness]], [[Automation guardrails]], [[Page data over screenshots]], [[WhatsApp Business]], [[Gmail]], [[IMCRM]].
