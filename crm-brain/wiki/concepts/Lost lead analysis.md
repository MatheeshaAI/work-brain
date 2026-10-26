---
type: concept
sources: ["raw/work_os system designing documents/02_SYSTEM_DESIGN/PLANNING.md", "raw/work_os system designing documents/00_ORIGINALS/CONVERSATION_LOG.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/main.py"]
updated: 2026-10-22
tags: [sales, lost-leads, win-back, agent-module, planned]
summary: "The planned Lost Lead Analyzer: read the chat history of lost leads for the reason, find patterns across them, and generate win-back messages."
---
# Lost lead analysis

A planned module of the [[Leads Folder Sales Agent]] (module 5 of six). For every lead moved to the Lost stage it would: analyse the full chat history for loss reasons, identify the specific objections that caused it, detect patterns across many lost leads, produce a loss report, suggest re-engagement strategies and "Win-Back" message templates, and update the objections knowledge base. It would also feed the dashboard's "Lost Analysis" view. Source: [[Health Insurance Sales Agent Plan (Jan 2026)]], with the lost rules (3 to 5 follow-ups, or 5 from a proceed date) in [[Negotiation stage stalls]].

Status: **design intent only**; no implementation. The same idea at CRM level appears as the lost reason field in [[IMCRM]] and in [[Customer objections]].

## What the code adds (2026-10-22 ingest)
Two pieces of the module exist as scaffolding. The console menu has "Analyze Lost Lead" as its fifth option - it logs the choice and prints "Feature coming soon in Phase 1". And the settings module declares a **nine-item lost-reason list**: Price, Network, Coverage, No Response, Competitor, Budget, Timing, Trust, Other. That list is the taxonomy the analysis would report into, and it is nearly the same as the nine objection types with "No Response" in place of the medical pair (Pre-existing, BMI).

Nothing analyses a chat for these reasons yet; see [[Health Insurance Sales Agent Python Code]].
