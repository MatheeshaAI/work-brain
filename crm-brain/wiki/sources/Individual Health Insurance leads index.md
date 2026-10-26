---
type: source
sources: ["raw/Health-Insurance/Individual-Health-Insurance.md"]
updated: 2026-10-22
tags: [insurance, leads, index]
privacy: "structure and counts only, no client names or lead IDs"
summary: "Folder index for individual health leads: 166 entries, 162 distinct names, naming quirks."
---
# Source: Individual Health Insurance leads index

Original file: [[raw/Health-Insurance/Individual-Health-Insurance.md|Individual-Health-Insurance.md]]. The largest folder index in the Health-Insurance vault: a heading, a count line and one wikilink entry per lead. **This page keeps only structure, counts and patterns.** No client names, lead IDs, member details or health information are copied.

## Shape of the file
- Heading: "Individual Health Insurance Leads".
- Count line: `## Leads (166)`.
- 166 entries in the folder-index format `- Filename -- Display Name`, where the filename is wrapped in a wikilink.
- Sorted by filename, not by name or by date. The sort therefore groups the few entries that have no REF-ID prefix at the top and the HEA- entries in ascending ID order.
- 170 lines total: 2 lines of heading, 1 count line, 166 entries, 1 blank.

## Counts and patterns (at ingest, 2026-10-22)
- **166 entries, 162 distinct display names.** Four names appear twice, each time under a different REF-ID - so the same person has been onboarded twice under two references.
- **163 entries follow the standard `HEA-XXXXXXXX-First-Last.md` pattern.** 3 entries do not: two are plain names with no reference prefix, and one keeps the raw ID as the display name (`HEA-XXXXXXXX` + `-Chandra-Mohan`), which is a sign the folder was created before the naming convention was enforced.
- **The index and the folder are not perfectly in sync.** The lead folder holds 168 lead files (excluding its own index file); 2 of them are not listed in the index at all. The index also has no dangling links - every entry it lists exists as a file. So the drift runs one way: new leads get created but are not always added to the index.
- **Data shape per lead:** one lead, one file. Family members live inside the lead file, not as separate entries. The lead file itself carries general information, customer profile, member details and payment details - see [[Lead file naming]] and [[Customer categories]].
- **Where the leads live:** `Workspace/Leads/Health Insurance/Individual-Health-Insurance/` - 169 files in the folder, which is 168 lead files plus this index. The same subtree also holds a `Group-Health-Insurance/` folder with an index and one lead. See [[Workspace and infrastructure separation]].

## Naming and link rules this index follows
- Short wikilinks, filename only, with `--` as the display separator. Full rules: [[Wikilink conventions]].
- One index file per folder, maintained whenever a lead is added, moved or removed: [[Lead folder index files]].

## Caveats
- The count line is a snapshot of a file that is edited by hand or by tooling; it drifts (see the two unlisted leads above).
- The duplicated names are counted by display name only. Whether a duplicate is a genuinely different person or a re-onboarded one cannot be read from the index.
- Nothing in this file states a plan, insurer or premium. It is navigation only. Product knowledge for this product line is tracked separately: [[Insurance product lines]], [[Entry level plans]].

Related: [[Lead folder index files]], [[Insurance product lines]], [[Lead pipeline stages]], [[Customer categories]].
