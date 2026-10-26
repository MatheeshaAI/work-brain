---
type: source
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md"]
updated: 2026-10-22
tags: [imcrm, leads, sales, aggregate]
privacy: "Aggregate counts only. The source holds client names, phone numbers, emails, lead reference IDs and premiums; none are reproduced here."
summary: "The May 2026 IMCRM health-lead export: 51 leads across 6 pages, summarised as counts and distributions only."
---
# Source: IMCRM Health Leads May 2026

Original note: [[raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md|workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md]]. The output of [[Extract IMCRM Health Leads Workflow]]. **The source contains client names, phone numbers, emails, lead reference IDs and premiums; this page records aggregate counts only. The detail stays in the source file.**

## Header facts
- Total leads: 51. Pages scraped: 6.
- Filter: created between 01/05/2026 and 31/05/2026.
- Columns: Ref ID, first name, last name, mobile, email, emirate, lead status, created date, last modified, team, premium, insurer.

## Status distribution (n = 51)
| Status | Count | Share |
|---|---|---|
| Followed Up | 30 | 59% |
| Quoted | 7 | 14% |
| Application Pending | 6 | 12% |
| New Lead | 4 | 8% |
| Lost | 1 | 2% |
| Qualified | 1 | 2% |
| Policy Booked | 1 | 2% |
| Transaction Approved | 1 | 2% |

## Emirate distribution (n = 51)
| Emirate | Count |
|---|---|
| Dubai | 38 |
| Ajman | 5 |
| Sharjah | 3 |
| Ras Al Khaimah | 2 |
| Abu Dhabi | 2 |
| Fujairah | 1 |

## Team and insurer
- Team: Entry-Level 43, Value 8.
- Insurer, where recorded: Takaful Emarat Insurance 4, Dubai Insurance 3, Abu Dhabi National Takaful 1, Fidelity United 1. The remainder have no insurer recorded.
- Premium is populated on only 9 of 51 rows: minimum 1,110.90 AED, maximum 17,836.35 AED, total 51,536.10 AED.

## Status and caveats
- Created in May 2026, so the file is a snapshot of a single month. It was produced on 17 May 2026 and the dates inside it stop at 17 May, so the last fortnight of the month is missing even though the filter ran to 31 May.
- The premium column is sparse (9 of 51), so the total above describes only the leads where a premium was recorded - not the month.
- "Followed Up" dominates, which is consistent with a lead-scraping workflow rather than with a pipeline snapshot: the status reflects the last action taken on each lead, not its likelihood to close.
- The extracted rows include fields a list view does not show (mobile, email), so this file is a client-data export and should be treated as sensitive. See [[Automation guardrails]].

Related: [[My Shared Brain]], [[IMCRM]], [[Extract IMCRM Health Leads Workflow]], [[Sales Context File Set]], [[Lead prioritization]], [[Business Goals]], [[Health insurance]].
