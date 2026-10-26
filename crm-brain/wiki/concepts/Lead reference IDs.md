---
type: concept
sources: ["raw/10_Work-Insurance/Ref-ID.md", "raw/10_Work-Insurance/README_Lead_Tracking.md", "raw/Health-Insurance/Memory/wikilink-conventions.md", "raw/Health-Insurance/Motor-Insurance.md"]
updated: 2026-10-22
tags: [insurance, crm, leads, id, reference]
summary: "Lead reference ID scheme structure (patterns only)"
---
# Lead reference IDs

Structure of lead reference IDs in IMCRM/lead tracking. From [[raw/10_Work-Insurance/Ref-ID.md|Ref-ID]] source - **patterns only, no real lead IDs copied** per privacy rules.

## Format
Health insurance leads use format like `HEA-XXXXXXX` (e.g. seen in [[Lead tracking in the CRM]] as Reference ID). Motor leads may use different prefixes (pattern not fully specified in sampled data).

## Usage
Reference ID is unique identifier linking leads across Lead Tracker, client folders ([Name - Ref ID]), and IMCRM. Used in folder naming per [[Folder structure convention]].

## Context
Appears in IMCRM lead data structure (customer profile, quote details, advisor/subteam, source). For privacy, only structure noted; actual IDs not reproduced.

## Related

- [[Lead tracking in the CRM]]
- [[Insurance CRM pipeline]]
- [[IMCRM]]
- [[Folder structure convention]]

## The prefix is the product line (2026-10-22 ingest)
The live workspace makes the prefix explicit, and it is what separates one reference scheme from another:
- `HEA-` + 8 characters - **health** leads, individual and group.
- `CAR-` + 8 characters - **motor** leads.
- `DIC-XXXXXX-...` and `TE-XXXXXXXXXX-...` - **renewal** files, using the insurer's own renewal scheme codes.

The reference is also the **primary key of the file system**: the lead file is named `[REF_ID]-[First]-[Last].md`, the document folder is `[REF_ID]-[Name]`, and the pipeline and task files reference it. Because the prefix differs by product line, the same person can hold a health and a motor reference without collision. See [[Lead file naming]], [[Insurance product lines]].

Two practical uses of the reference outside the CRM:
- The WhatsApp search script accepts a **lead reference** as well as a phone number or name, which is how a conversation is joined to a lead file. See [[Local message archive]].
- The 2026-05-22 agent design makes the reference the primary input to the `crm-reader` and `crm-status-updater` agents, in "any form" - short code, full ID or URL. See [[Tiered agent architecture]].
