---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_Single_Lead_Detail.md"]
updated: 2026-10-22
tags: [imcrm, workflow, leads, extraction]
summary: "Three-phase procedure for extracting one lead's full details from its CRM page into a lead markdown file."
---
# Workflow Single Lead Detail

The procedure behind the lead files in the workspace; compare [[Getting client data from the CRM]] and [[IMCRM health detail page extraction]].

1. **Navigate:** directly via the lead URL, or by searching the Ref-ID box on the Health list and clicking the result.
2. **Identify sections:**
   - header box: ref ID, customer type, AML statuses, dates, advisor, source;
   - quote details: requirement type, current insurer, plan category, enquiry count;
   - customer profile: name, contact, nationality, DOB, gender, salary band, member category;
   - member details: click the Member Details button if the table is hidden, then read name, relation, gender, DOB, nationality and the pre-existing-condition flag per member;
   - lead status: current status, notes, transaction type.
3. **File generation:** write structured Markdown named `[REF_ID]-[First]-[Last].md` ([[Lead file naming]]).

Scripted by `single_lead_scraper.js` and `get_lead_detail.js` ([[Health Insurance CRM system overview]]). Related: [[Lead reference IDs]], [[IMCRM Health Lead Detail Extraction Guide]].
