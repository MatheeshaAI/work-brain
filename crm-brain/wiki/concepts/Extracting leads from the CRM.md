---
type: concept
sources: ["raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md", "raw/10_Work-Insurance/Steps to get client data from IMCRM.md", "raw/work_os system designing documents/04_AUTOMATION/Sales_Automation_Notes.md", "raw/work_os system designing documents/01_DAILY_COMMANDS/CRM_Guide.md"]
updated: 2026-10-22
tags: [extraction, crm, extension, automation, workflow]
summary: "The mechanical route from an IMCRM lead page to structured text: what the extension extracts, what it saves and what it cannot reach."
---
# Extracting leads from the CRM

How lead data actually leaves IMCRM today. The route is a Chrome extension plus a copy-and-paste step - not an API integration.

## The route

```
IMCRM lead page (imcrm.alfred.ae/quotes/health/<ref>)
   ↓  extension reads the DOM
six buttons produce formatted text
   ↓  Copy to Clipboard
paste into the CRM note, the WhatsApp message, the tracker
```

## What each button yields

| Button | Output | Used for |
|---|---|---|
| **Extract Health Lead** | Customer info + members + all plans | Building the lead record ([[Getting client data from the CRM]]) |
| **Extract Motor Lead** | Motor lead data | The car side of the book |
| **Save Number** | `Name - RefID - Member Category` | Naming a bare-number chat so it can be found again ([[Lead capture gaps]]) |
| **Save Checked** | `Provider||PlanName` identifiers for ticked rows | Recording which plans were compared |
| **Extract Checked** | Full plan data for ticked plans, walking backward through pagination | Pulling a shortlist out of the 376-plan catalogue |
| **Copy to Clipboard** | The output box, formatted per extraction type | The paste step |

## The hard part is the catalogue, not the lead
The lead fields are easy - they are label/value pairs in the DOM. The plan table is not, because the platform uses **vue3-easy-data-table** with virtualised pagination:
- the table is found by scanning every `<table>` for `<th>` headers containing `provider` and `plan name`, lowercased, after a case-sensitivity bug made the original text guard fail on every table;
- the checkbox state is Vue-managed, so four indicators are checked (`checked`, `allSelected`, `someSelected`, `aria-checked`);
- pagination is walked **backward** from the current page to page 1, 600 ms per step, capped at 30 pages, because walking forward and matching identifiers produced the same plan 30 times.

Full detail: [[IMCRM Data Extractor handoff]].

## The catalogue behind it
The platform exposes **376 plans** ([[Steps to get client data from IMCRM]]). The first 15, all entry level, run from AED 930 to AED 1,183 across 8 networks and 12 insurers - see [[Insurance plan catalogue]] and [[Network tiers]].

## What this route cannot do
- **No API, no sync.** The connector script in [[Using ICM for a CRM-driven insurance sales agent]] is a proposal; what exists is DOM scraping of one page at a time.
- **Nothing is written back.** The extension reads; it does not update the CRM. Every field change is still manual.
- **The paste step is unguarded.** Nothing checks that the copied text went into the right lead, or that it did not carry PII into a shared note - see [[Getting client data from the CRM]].
- **One lead at a time.** The daily book is 68 leads ([[IMCR Health Leads 07-Jun-2026]]); the extension is a single-lead tool.
- **Sensitive fields come along for the ride.** "Extract Health Lead" reads the customer profile, which includes the Emirates ID and the document list. The button does not redact.

Related: [[IMCRM Data Extractor]], [[Getting client data from the CRM]], [[IMCRM data handoff]], [[Lead capture gaps]], [[CRM hygiene]], [[Document request handling]].

## Console snippet and bookmarklet route (work_os)
Before the extension, the same data was reached by pasting JavaScript into the browser console on a quote page (find the third table, read the 15 visible plan rows, sort by price) or by a one-click bookmarklet showing the cheapest ten; the paginated table (15 per page) and fragile selectors are the limits ([[Sales Automation Notes]]). The daily guide to the sections of a lead page is [[IMCRM CRM Guide]].
