---
type: source
sources: ["raw/Health-Insurance/Group-Health-Insurance.md"]
updated: 2026-10-22
tags: [insurance, leads, index]
privacy: "structure and counts only, no client names or lead IDs"
summary: "Folder index for group health leads: 1 corporate lead, no product or plan content."
---
# Source: Group Health Insurance leads index

Original file: [[raw/Health-Insurance/Group-Health-Insurance.md|Group-Health-Insurance.md]]. A five-line Obsidian folder index for the group-health folder. **This page keeps only structure and counts.** The single entry is a company name and is not copied here.

## What the file is
- Heading: "Group Health Insurance Leads".
- A count line: `## Leads (1)`.
- One entry in the folder-index format `- Filename -- Display Name`, where the filename is wrapped in a wikilink.

## Counts (at ingest, 2026-10-22)
- 1 group lead listed.
- Group leads are corporate accounts, not individuals - the entry points at a company file rather than a person file. Compare the individual and motor indexes: [[Individual Health Insurance leads index]], [[Motor Insurance leads index]].
- The index format is described in [[Lead folder index files]]; the product split is described in [[Insurance product lines]].

## What this file does **not** contain
- No insurer, TPA, plan name, premium, deductible, underwriting rule, eligibility condition or claim step appears in it. It is a navigation file, not product knowledge.
- The insurance product and plan knowledge for this workspace sits in other folders (plan reference files, insurer underwriting notes and network lists under the workspace area). Those are not ingested yet; the entries planned are [[Entry level plans]] and [[Insurance plan catalogue]].
- **Where the folder lives:** `Workspace/Leads/Health Insurance/Group-Health-Insurance/` - an index file and one lead file. See [[Workspace and infrastructure separation]].

## Caveats
- The count is a snapshot of a file that is maintained by hand or by tooling; it can drift from the folder contents.
- Because the display name is a company, this is the one lead folder where the linked target is a corporate entity rather than a person.

Related: [[Lead folder index files]], [[Insurance product lines]], [[Lead pipeline stages]].
