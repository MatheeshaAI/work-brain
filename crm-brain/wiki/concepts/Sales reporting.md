---
type: concept
sources: ["raw/Health-Insurance/Workspace/Sales Reports/April_2026_Leads.md", "raw/Health-Insurance/Workspace/Sales Reports/Leads_Last_30_Days.md", "raw/Health-Insurance/Workspace/Sales Reports/plans_table.md", "raw/Health-Insurance/Workspace/Sales Reports/plans_raw.json", "raw/Health-Insurance/Workspace/Reports/WhatsApp-No-Response-Report-28-Apr-2026.md", "raw/Health-Insurance/Workspace/daily/2026-05-20.md", "raw/Health-Insurance/Workspace/PIPELINE.md", "raw/Health-Insurance/Workspace/RENEWALS.md", "raw/Health-Insurance/Workspace/tasks.md"]
updated: 2026-10-22
tags: [insurance, reporting, analytics, sales, data-quality]
summary: "The six report surfaces of the workspace, what each one measures, and the vocabulary and reconciliation gaps between them."
---
# Sales reporting

The workspace reports on itself in six places. None of them is a dashboard over the others - they are separate exports written by different tools, and they do not reconcile.

## The six surfaces
| Surface | What it measures | Shape |
|---|---|---|
| `Sales Reports/` CRM exports | lead creation over a window | markdown table, one row per lead |
| `Sales Reports/` commission CSVs | the book of business: policy, premium, tax, commission | CSV, 18 columns |
| `Sales Reports/` plan exports | the plan catalogue | markdown table + JSON |
| `Reports/` WhatsApp report | how many chats went unanswered | dated markdown with drafted messages |
| `daily/` daily note | what was worked in one day | short markdown checklist |
| `PIPELINE.md` / `RENEWALS.md` / `tasks.md` | live board state, not a report | markdown boards, hand-maintained |

## The lead exports
Two CRM dumps with different windows, different columns and different vocabularies. **April 2026** - 123 leads, status + tier + member category + referral sub-source. **Last 30 days** (window ending 23 April) - 38 leads, status + assignment type + tier + starting price, each row linked to the CRM quote page.

Useful facts from them: the April book's status mix is Followed Up 84, New Lead 16, Application Pending 9, Policy Booked 6, Quoted 5, Lost 2, Payment Initiated 1; and **11 of the 38 recent leads were bought, 10 were system-allocated** - so more than half of that month's flow was assigned by the CRM rather than sourced. See [[April 2026 leads report]] and [[Leads last 30 days report]].

## The commission exports
Ten dated CSVs of the same shape - policy, period, sum, discount, customer payable, tax, commission percentage, commission, dates paid/unpaid, insurer, line of business, customer, salesperson. One value in the salesperson column across every row. The **commission percentage is the one field worth trusting** (business facts, no client data needed), and it runs from single digits on some policies to the mid-teens on others - it is the field the CRM booking record should be checked against. The existing wiki page for the March export records the data-quality defects in detail: epoch placeholders for blank dates, an empty currency column, and a `Paid` column that holds an amount rather than a flag. See [[Sales commission export]] and [[Commission and premium reporting]].

## The channel report
The one measurement of communication rather than pipeline: 105 WhatsApp chats analysed in April 2026, 65 replied (62%), 40 silent - of which 24 are lead-shaped and 8 of those have no matching lead file. See [[WhatsApp non-response report]].

## The problems
1. **No shared tier vocabulary.** Four spellings of the same three-band ladder across four files: `Entry-Level / Value / Good` (April export), `Value / Good / blank` (30-day export), `Entry Level / Good / Best` (plan library), `Basic / Basic Enhanced / Enhance` (sales ladder). See [[Insurance plan catalogue]] and [[Customer categories]].
2. **No shared status vocabulary.** The CRM export uses six status values, the 30-day export seven, the lead dossiers **twenty-two**, and the pipeline board uses its own five sections. See [[Lead pipeline stages]] and [[Dossier structure]].
3. **The boards are hand-maintained, so they age.** `PIPELINE.md` is dated 08 May while the renewal board still shows April, and the workspace audit found the New Leads section with rows jumbled together. See [[Workspace audit June 2026]] and [[Sales operations issues]].
4. **Nothing reconciles.** The commission book and the CRM booking record are independent sources for the same commission, and no check compares them. See [[Commission and premium reporting]].
5. **PII everywhere.** Every one of these surfaces names clients; several add phone numbers, family structure and health information. The wiki keeps counts and patterns only. See [[Client privacy]].

## What to trust
- **Counts and distributions** inside a single file - they are self-consistent.
- **The commission percentage** in the CSVs, read as a range.
- **The plan library** - 418 rows, internally consistent across four copies.

Treat anything that requires joining two surfaces as unsupported until the vocabularies are reconciled.

## Related
- [[Sales reporting]]'s sources: [[April 2026 leads report]], [[Leads last 30 days report]], [[WhatsApp non-response report]], [[Daily activity 20 May 2026]], [[Plan catalogue raw exports]], [[Sales commission export]]
- [[Lead pipeline stages]]
- [[Tasks and analytics]]
- [[Daily sales audit]]
- [[CRM hygiene]]
- [[Commission and premium reporting]]
- [[Pipeline board]]
- [[Renewals board]]
