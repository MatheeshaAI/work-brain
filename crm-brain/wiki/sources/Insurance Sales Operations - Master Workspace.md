---
type: source
sources: ["raw/10_Work-Insurance/README.md"]
updated: 2026-10-22
tags: [insurance, crm, operations, pipeline, documentation]
summary: "Master workspace overview for insurance sales operations"
---
# Source: Insurance Sales Operations - Master Workspace

Original note: [[raw/10_Work-Insurance/README|README]]. Central hub for leads, sales, documentation.

## Quick actions & inbox
Drop files (EIDs, passports, quotations, policies) in INBOX/; update tasks in INBOX/tasks.md; run `/process-inbox` to file and update trackers.

## Network & facility search
Search via "is [Hospital Name] covered?" or `/find-network`. Uses Dubaicare Network List CSV; tool `facility_search.py`. See [[Network database design]] and [[Finding a hospital in a network]].

## Core trackers
- Task Tracker (daily to-do: new leads, renewals, claims, admin)
- Lead Tracker (16-stage pipeline)
- Sales Analytics (performance, commission, policy types)

## Workspace structure (client-centric)
Clients/[Name - Ref ID]/ with subfolders: 01_Conversations, 02_Quotations, 03_Documents, 04_Applications, 05_Meetings, 06_Policies; Knowledge_Base (Health/Motor/Message_Templates); Claims, Renewals, Lost_Leads.

## Automated workflows
`/process-inbox` files documents and updates Task_Tracker; `/rename-documents` renames by content. Daily routine: morning process inbox, update stages, evening mark complete.

## Related docs
README_Folder_Structure, README_Pipeline, README_Tasks_Analytics, README_Lead_Tracking.

## Related

- [[Insurance CRM pipeline]]
- [[Lead tracking in the CRM]]
- [[Folder structure convention]]
- [[Tasks and analytics]]
- [[Lead reference IDs]]
