---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Lead-Context/Lead-Context.md", "raw/Health-Insurance/Workspace/Leads/Lead-Context/leads.md", "raw/Health-Insurance/Workspace/Leads/Leads.md"]
updated: 2026-10-22
tags: [insurance, leads, templates, index, client-data]
summary: "The Lead-Context folder (an index and a master 'Active Leads' table with status legend and lead template) plus the root Leads.md index."
---
# Lead-Context files

Files under `"raw/Health-Insurance/Workspace/Leads/Lead-Context"` and the root index `Leads.md`.

## Files
| File | Role |
|---|---|
| `Lead-Context/Lead-Context.md` | Index with one link, to `leads.md` ([[Lead folder index files]]) |
| `Lead-Context/leads.md` | "Active Leads" master table, status legend, quick-action links and a lead template |
| `Leads.md` | Index of the root folder, one link (see [[Lead index files (root)]]) |

## The master table (leads.md)
Columns: Ref ID, Name, Company, Status, Last Contact, Next Action, Due Date. It has 2 data rows (one Enrolled, one Quoted), both last contacted on 20 May 2026; one row has no ref ID. Names are in the file and not copied here.

## Status legend (design intent)
Five values: Prospect (initial contact), Quoted (plans and prices sent), Pending (awaiting decision or documents), Enrolled (policy activated), Inactive (no activity for 30 or more days). Compare with the 20-odd values actually found in [[Individual health insurance leads folder]] (New Lead, Quoted, Followed Up, Allocated, Policy Booked, ...), the CRM stages in [[Lead pipeline stages]], and the chat board in [[WhatsApp lead follow-up statuses]]. This is a fourth vocabulary; "Enrolled" and "Inactive" do not exist in the CRM, and the 30-day inactivity rule is not applied anywhere in the lead files.

## The lead template
A markdown skeleton to create `leads/<FIRSTNAME-LASTNAME>.md`: Contact Info (ref ID, email, phone, company, role, address), then profile, interest and activity sections. See [[Lead folder note template]]: the template's name-based filename conflicts with the HEA-prefixed names used in practice ([[Lead file naming]]).

## Quick-action links
Links point to a tasks file and a daily activity file for 20 May 2026 that do not exist inside this folder, so they are stale (see [[Open tasks]]).

## Data quality
- Master table is nearly empty versus 168 lead files: it was an early manual tracker, superseded by the folder indexes and the dashboard ([[Insurance Dashboard (Health Insurance OS)]]).
- Contains client names; keep out of the wiki.

Related: [[Workspace Leads folder overview]].
