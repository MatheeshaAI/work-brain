---
type: concept
sources: ["raw/Health-Insurance/Memory/wikilink-conventions.md", "raw/Health-Insurance/Memory/memory.md", "raw/Health-Insurance/Individual-Health-Insurance.md"]
updated: 2026-10-22
tags: [leads, naming, files, organization]
summary: "How a lead file is named and where it lives - reference prefix, name, product folder - and the four naming exceptions found on disk."
---
# Lead file naming

One lead, one file, named so that the reference, the product line and the person are all visible in the filename.

## The pattern
```
[REF_ID]-[First]-[Last].md
```
| Product line | Reference prefix | Example shape |
|---|---|---|
| Individual health | `HEA-` + 8 characters | `HEA-XXXXXXXX-First-Last.md` |
| Motor | `CAR-` + 8 characters | `CAR-XXXXXXXX-First-Last.md` |
| Group health | `HEA-` (company name instead of a person) | `HEA-XXXXXXXX-Company-Name.md` |

Sources: [[Wikilink conventions]], [[Insurance product lines]]. The reference scheme itself is covered in [[Lead reference IDs]].

## Where the file lives
- Health leads: `Workspace/Leads/Health Insurance/Individual-Health-Insurance/`
- Group leads: `Workspace/Leads/Health Insurance/Group-Health-Insurance/`
- Motor leads: `Workspace/Leads/Motor Insurance/`
- Documents for a lead: `Workspace/Documents/[REF_ID]-[Name]/`
- Renewal file: filed under the product line it renews, with the insurer's renewal code (`DIC-XXXXXX-`, `TE-XXXXXXXXXX-`, `{Provider}-{PolicyNumber}-First-Last`)

## What the file contains
A flat list of `- **Field:** value` lines: general information, customer profile, member details, payment details, and a `## Comments` section that the dashboard appends to. The dashboard's parser expects exactly this shape - a file written any other way parses to "Unknown". See [[Markdown-backed lead store]].

## Why the reference comes first
- The filename is the primary key: the extension creates the file, the dashboard finds it, the document folder is derived from it, and the pipeline row references it.
- The prefix makes the type and the uniqueness visible without opening the file.
- It lets a search by lead reference find the file, the documents and the conversation - the search command in the WhatsApp tooling accepts a lead reference for exactly this.

## The exceptions on disk
At ingest, the individual index carried 163 standard names and 3 exceptions:
1. Two entries with **no reference prefix at all** - a plain personal name.
2. One entry that **keeps the raw reference as its display name**, which points at a folder created before the convention was enforced.
Plus one lead file that sits at the root of `Workspace/Leads/` rather than in a product folder, and three duplicate display names where one person appears to have been onboarded twice under two references.

## Caveats
- The display name is derived from the filename mechanically, so the index shows exactly what the file is called - it does not verify that the name is the client's real name. See [[Wikilink conventions]].
- The naming convention is documented in a persistent memory note, but the index maintenance is manual, so exceptions accumulate rather than being corrected.

Related: [[Lead folder index files]], [[Wikilink conventions]], [[Lead reference IDs]], [[Insurance product lines]], [[Markdown-backed lead store]].
