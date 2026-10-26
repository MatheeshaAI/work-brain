---
type: source
sources: ["raw/Health-Insurance/Workspace/Sales Reports/Leads_Last_30_Days.md"]
updated: 2026-10-22
tags: [insurance, sales, reporting, crm, leads]
privacy: aggregate only - names, lead references, links and prices are summarised as counts; no row is reproduced
summary: "A rolling 30-day CRM lead list: 38 leads with status, assignment type, tier band and starting price, linked to CRM quote pages."
---
# Source: Leads last 30 days report

`raw/Health-Insurance/Workspace/Sales Reports/Leads_Last_30_Days.md` - "Health Insurance Leads - Last 30 Days". **38 data rows, 11 columns**, with each reference rendered as a markdown link to the CRM quote page for that lead.

## The columns
Reference ID (linked), First Name, Last Name, Emirate of Visa, Lead Status, Assignment Type, Created Date, Health Team Type, Starting From Price, Lead Type, Member Category.

Two columns exist here that the April report does not have: **Assignment Type** and **Starting From Price**.

## What it says
**Status mix (38 leads):** New Lead 12, Allocated 10, Followed Up 10, Quoted 2, Policy Booked 2, Payment Initiated 1, Awaiting Insurance confirmation 1.

**Assignment Type:** Self Assigned 17, System Assigned 10, Bought Lead 9, Reassigned as Bought Lead 2. So **9 + 2 = 11 of 38 leads were bought and 10 were system-allocated** - the CRM decides, not the advisor.

**Health Team Type:** Value 17, Good 11, blank 10.

**Lead Type:** Individual 15, Family (2) 1, SME 1, blank 21.

**Starting From Price:** populated on 11 rows only - the bought and reassigned leads, which are the ones that already had a quote attached. Values range from 1,668 AED to 11,106 AED.

**Created Date range:** 23-Mar-2026 to 23-Apr-2026 - so the export is anchored on a 30-day window that ended 23 April 2026, not on the file's own date.

## How to read it
- **This is the pipeline's input, not its output.** The `Allocated` rows are the ones the CRM has handed out but nobody has worked - they are the backlog. Ten of them.
- **The link in the reference column is the hand-off to the CRM.** It is the fastest path from a lead list to the live record, and the reason the file is a working document rather than a pure export.
- **Prices appear only for leads that had been quoted**, so the "starting from" column is a quote artifact, not a catalogue price. The plan library's entry-level floor is 1,114 AED - see [[Insurance plan sheets]].

## Contradictions
- **The tier column uses the same label set as the April report but with different counts** - here `Value` and `Good` and blank, never `Entry-Level`; in the April report `Entry-Level` 90, `Value` 23, `Good` 9. Two exports of overlapping weeks use different vocabularies for the same three bands.
- **`Awaiting Insurance confirmation`** appears here and nowhere else in the workspace's status vocabularies; the April report has `Application Pending` for the same idea, and the lead dossiers use both `Application Submitted` and `Application Pending`. See [[Lead pipeline stages]].
- **Ten rows carry no tier, no lead type and no price** - the system-allocated ones. The export is only as complete as the CRM's own fields.

## Related
- [[Sales reporting]]
- [[April 2026 leads report]]
- [[WhatsApp non-response report]]
- [[Extracting leads from the CRM]]
- [[Workflow Last 30 Days Report]]
- [[Insurance CRM pipeline]]
- [[Lead pipeline stages]]
- [[Customer categories]]
