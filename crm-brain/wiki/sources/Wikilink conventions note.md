---
type: source
sources: ["raw/Health-Insurance/Memory/wikilink-conventions.md"]
updated: 2026-10-22
tags: [wikilinks, conventions, obsidian, leads]
summary: "The short-wikilink convention for the workspace: format, where links go, and the maintenance rules."
---
# Source: Wikilink conventions note

Original file: [[raw/Health-Insurance/Memory/wikilink-conventions.md|wikilink-conventions.md]]. A persistent memory note that specifies how cross-references are written and kept consistent across the workspace. It exists so that graph view, backlinks and click-through navigation work.

## The format
- **Filename only, never a path prefix.** The note's own example contrasts a bare filename such as `HEA-XXXXXXXX-First-Last` (wrapped in a wikilink) with a full path form, and rejects the path form.
- A list entry is `- Filename -- Display Name`, with the filename wrapped in a wikilink. The display separator is a **double dash**, used in every list entry.

## Where links are used
- **Dashboard files:** every lead reference in the task file's tables and checklists, every reference in the pipeline file's tables and checklist, every renewal and lead reference in the renewals file.
- **Folder index files:** every folder holding markdown files gets an index that lists all its contents as wikilinks. The note names the individual, group, motor, root-leads and monthly-renewal index files.
- **Lead files:** a lead with active tasks carries a `## Related Tasks` section linking back to the task file.
- **Renewal files:** a renewal file links to its CRM lead file.

## Maintenance rules (the operational part)
- **Adding a lead:** create the file, add the wikilink to the folder index, add it to the pipeline table, add the task and its links if there is one, and add the `## Related Tasks` section to the lead file.
- **Adding a task:** add to the task file table *and* checklist, add to the pipeline daily checklist, add the backlink section to the lead file.
- **Removing or archiving a lead:** remove from the folder index, the pipeline, the task file and every other reference.
- **Moving a file:** remove from the old index, add to the new one, update all references.
- **Updating a renewal:** update the renewal file, the renewals file, the pipeline, and keep the CRM lead link present.

## Filename patterns it tabulates
Individual lead `HEA-XXXXXXXX-First-Last`; motor lead `CAR-XXXXXXXX-First-Last`; renewal for one insurer `DIC-XXXXXX-...`; renewal for another `TE-XXXXXXXXXX-...`; any other provider `{Provider}-{PolicyNumber}-First-Last`.

## Display-name extraction (a small algorithm)
Strip the `.md`, strip the `HEA-`/`CAR-` prefix, strip the 8-character reference and its hyphen, then replace hyphens with spaces.

## Why it matters here
- The convention is what makes the folder indexes usable as a navigation layer, which is why they can be summarised as counts only: [[Lead folder index files]], [[Individual Health Insurance leads index]].
- The maintenance rules are the reason the index files drift: every rule is manual, and nothing checks it. The drift found in the individual index (2 unlisted lead files, 4 duplicated names) is exactly the failure mode these rules do not cover.
- The note also explains why some display names look wrong - the algorithm is mechanical, so a file whose name does not match the pattern produces a strange display name.

Related: [[Wikilink conventions]], [[Lead file naming]], [[Lead folder index files]], [[Task single source of truth]].
