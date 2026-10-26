---
type: source
sources: ["raw/Health-Insurance/Motor-Insurance.md"]
updated: 2026-10-22
tags: [insurance, motor, leads, index]
privacy: "structure and counts only, no client names or lead IDs"
summary: "Folder index for motor insurance leads: 5 entries with the CAR- reference pattern."
---
# Source: Motor Insurance leads index

Original file: [[raw/Health-Insurance/Motor-Insurance.md|Motor-Insurance.md]]. The folder index for the motor (car) insurance product line. **This page keeps only structure and counts.** No client names, vehicle details or reference IDs are copied.

## Shape of the file
- Heading: "Motor Insurance Leads".
- Count line: `## Leads (5)`.
- 5 entries in the folder-index format `- Filename -- Display Name`, where the filename is wrapped in a wikilink.
- 9 lines total.

## Counts and patterns (at ingest, 2026-10-22)
- **5 motor leads.** This is a small book compared with the health line: [[Individual Health Insurance leads index]] lists 166 and [[Group Health Insurance leads index]] lists 1.
- **All 5 entries use the `CAR-XXXXXXXX-First-Last.md` pattern** - a different reference prefix from health leads, which use `HEA-`. Motor references therefore cannot be confused with health references, and the same person can hold one of each. The prefix table is in [[Lead file naming]].
- One display name appears twice in the list under two different CAR references, the same duplication pattern seen in the individual health index.
- Unlike the health line, a motor lead file holds vehicle and quote detail rather than member details. The extraction side of this is handled by the same browser tooling: see [[IMCRM Data Extractor]].
- **Where the folder lives:** `Workspace/Leads/Motor Insurance/` - 6 files, which is 5 lead files plus this index. See [[Workspace and infrastructure separation]].

## Caveats
- No insurer, plan tier, premium, excess or underwriting rule appears in the file. Motor product knowledge for this workspace (provider, plan name, price, starting date) lives in the plan reference files, which are not ingested yet.
- The count is a snapshot and can drift.

Related: [[Insurance product lines]], [[Lead folder index files]], [[Lead pipeline stages]], [[Lead file naming]].
