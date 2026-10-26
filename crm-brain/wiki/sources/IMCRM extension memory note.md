---
type: source
sources: ["raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md"]
updated: 2026-10-22
tags: [imcrm, extension, memory, extraction]
summary: "Persistent memory of the IMCRM Chrome extension: location, four extraction features, five buttons, status."
---
# Source: IMCRM extension memory note

Original file: [[raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md|IMCRM_Chrome_Extension.md]]. A persistent memory (frontmatter with a name and description) recording what the IMCRM data-extracting extension is and how well it works. **No credentials are copied here; the vault's `.env` file holds credentials and is not ingested.**

## What it is
- A Chrome extension (Manifest V3) in the folder `IMCRM Data Extracting Extention/` at the project root.
- It extracts structured data from IMCRM health insurance quote pages and can create lead markdown files in the workspace.
- Files: `manifest.json`, `popup.html`, `popup.js` (the main logic, about 626 lines), `content.js` (DOM helpers).

## The four extraction features
1. **Lead details** - reference, name, mobile, email, nationality, date of birth, emirate of visa, gender, member category. Method: read the `dl`/`dt`/`dd` form elements on the page.
2. **Member details** - all family members from the member tables; non-member rows (activities, payments, documents, policies) are filtered out; duplicates removed; falls back to the lead's own details when no members are found.
3. **Available plans** - the full plans table: provider, plan name, plan type, network, co-pay, price, total price.
4. **Basic plans** - a filtered subset. Include criteria: **E CARE BLUE, E CARE, AAFIYA (APN)**. Exclude criteria: Fidelity, Takaful Emarat, Essential, Dubai Care and others. **Max 2 plans per provider, sorted by price ascending.** Concept page: [[Basic plan filter]].

Note the tension between criteria 3 and 4: the basic filter *excludes* [[Takaful Emarat]] and Dubai Care while the later entry-plans work treats three Takaful Emarat plans and one Dubai Insurance plan as the entry-level set. Both are "the cheap end", selected differently - by network in one case, by plan name in the other. See [[Entry level plans]].

## The five buttons
Extract Data (lead + members + available plans); Extract Basic Plans; Copy to Clipboard; Debug (shows the DOM structure); Create Lead File (writes a lead file - needs the local server, see [[Local file writing sidecar]]).

## Status as recorded
- Working: lead details, member details, available plans.
- In progress: the basic-plans filtering.
- Not mentioned: the entry-plans extraction designed in [[Entry level plans extraction plan]] (dated after this note), so treat the feature as planned rather than shipped.

## Related
- [[IMCRM]] is the system being scraped; the project page is [[IMCRM Data Extractor]].
- The other two memory notes cover usage ([[IMCRM extension how-to memory note]]) and the server ([[IMCRM extension server memory note]]).

Related: [[IMCRM]], [[IMCRM Data Extractor]], [[Basic plan filter]], [[Co-pay and co-insurance]].
