---
type: source
sources: ["raw/Health-Insurance/Workspace/Sales Reports/April_2026_Leads.md"]
updated: 2026-10-22
tags: [insurance, sales, reporting, crm, leads]
privacy: aggregate only - names, lead references and emirates are summarised as counts; no row is reproduced
summary: "The April 2026 CRM lead dump: 123 leads with status, health-team tier, member category and referral source."
---
# Source: April 2026 leads report

`raw/Health-Insurance/Workspace/Sales Reports/April_2026_Leads.md` - a flat markdown table of every health lead created in April 2026, exported from the CRM. **123 data rows, 10 columns.** It is a report, not a working document: no conclusions, only rows.

## The columns
`#`, Ref-ID, First Name, Last Name, Emirate of Visa, Lead Status, Created Date, Health Team Type, Member Category, IMCRM Sub-Source.

## What it says
**Status mix (123 leads):** Followed Up 84, New Lead 16, Application Pending 9, Policy Booked 6, Quoted 5, Lost 2, Payment Initiated 1.

**Health Team Type:** Entry-Level 90, Value 23, Good 9, blank 1. The team label is the desk's own pricing band - the same three values that appear as `Value` / `Good` / blank in the 30-day report and as `Entry Level` / `Good` / `Best` in the plan library. **The same three tiers are spelled three different ways across three sources.**

**Emirate of Visa:** Dubai 94, Sharjah 15, Abu Dhabi 5, Ajman 4, Ras Al Khaimah 4, Umm Al Quwain 1.

**Member Category:** Employee with salary above AED 4000 (40), Dependent spouse (24), Dependent child (18), Golden visa (11), Investor or Partner (10), Employee with salary AED 4000 and below (8), Domestic worker (5), Dependent parent (3), Self-employed or Freelancer (3), Dependent sibling or other relatives (1).

**IMCRM Sub-Source:** blank on 100 rows, **Advisor's own referral on 23**. The blank is the majority, so the column records referral source only when it was captured - it is not a complete segmentation of where leads came from.

**Created Date range:** 06-Apr-2026 12:00pm to 30-Apr-2026 04:27pm, sorted newest first.

## How to read it
- **It is a creation log, not a pipeline.** Status here is the CRM's status at export time, so "Followed Up" 84 means most of the month's leads had been touched - it says nothing about which ones converted. Only 6 reached Policy Booked.
- **The table has no totals row and no link back to the lead file**, so it cannot be joined to the dossiers without the reference column - which is the one column the wiki does not copy. See [[Client dossiers]] and [[Dossier structure]].
- **Six status values appear** here. The lead dossiers use twenty-two. See [[Lead pipeline stages]].

## Contradictions
- **The tier vocabulary differs by source**: `Health Team Type` here (Entry-Level / Value / Good), `Health Team Type` in the 30-day report (Value / Good / blank), `Plan Type` in the plan library (Entry Level / Good / Best), and the sales ladder in [[Insurance plan catalogue]] (Basic / Basic Enhanced / Enhance). Four spellings, one ladder.
- **The report stops at 30 April.** The workspace's pipeline board is dated 08 May, and the audit is dated 01 June, so this export is a snapshot of one month, not the current state.

## Related
- [[Sales reporting]]
- [[Leads last 30 days report]]
- [[WhatsApp non-response report]]
- [[Plan catalogue raw exports]]
- [[Client dossiers]]
- [[Lead pipeline stages]]
- [[Customer categories]]
- [[Insurance CRM pipeline]]
