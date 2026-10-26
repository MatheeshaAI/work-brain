---
type: concept
sources: ["raw/Health-Insurance/Individual-Health-Insurance.md", "raw/Health-Insurance/Group-Health-Insurance.md", "raw/Health-Insurance/Motor-Insurance.md", "raw/Health-Insurance/Leads.md", "raw/Health-Insurance/Lead-Context.md", "raw/Health-Insurance/Referral-Leads.md", "raw/Health-Insurance/Memory/wikilink-conventions.md"]
updated: 2026-10-22
tags: [insurance, organization, index, navigation]
summary: "One markdown index per lead folder, listing every lead as a short wikilink - and the four ways those indexes drift."
---
# Lead folder index files

Every folder that holds lead files carries a markdown index listing its contents as short wikilinks. The index is the navigation layer of the workspace: a human or an agent can list a folder's contents without opening it.

## The format
```
# Individual Health Insurance Leads

## Leads (166)

- HEA-XXXXXXXX-First-Last -- First Last
```
(In the real index the filename is wrapped in a wikilink; the example above shows the bare name.)
- One file per folder, named after the folder.
- A count line `## Leads (n)`.
- One entry per file, `- Filename -- Display Name` (the filename wrapped in a wikilink, then the display name), with a **double dash** separator. Full rules: [[Wikilink conventions]].
- Entries are sorted by filename.
- The index is an Obsidian file, so the links resolve inside the vault, not just as text.

## Where the indexes are
| Index | Folder it indexes |
|---|---|
| `Individual-Health-Insurance.md` | `Workspace/Leads/Health Insurance/Individual-Health-Insurance/` |
| `Group-Health-Insurance.md` | `Workspace/Leads/Health Insurance/Group-Health-Insurance/` |
| `Motor-Insurance.md` | `Workspace/Leads/Motor Insurance/` |
| `Leads.md` | the root of `Workspace/Leads/` (strays) |
| `Lead-Context.md` | `Workspace/Leads/Lead-Context/` |
| `Referral-Leads.md` | `Workspace/Leads/Referral Leads/` |

Each of the three product-line indexes also exists as a **duplicate at the vault root** (`raw/Health-Insurance/*.md`), byte-identical to the copy inside the Leads area. See [[Lead index files (root)]].

## The maintenance rules
The wikilink conventions note states what has to happen when the folder changes, and it is entirely manual:
- Adding a lead: create the file, add it to the folder index, add it to the pipeline table, add the task, and add a `## Related Tasks` section to the lead file.
- Moving a lead: remove from the old index, add to the new one, update every reference.
- Removing a lead: remove from the index, the pipeline, the task file and everything else that points at it.

## How the indexes drift
Four observed failure modes, all consequences of the rules being manual:
1. **Unlisted files.** The individual folder holds 168 lead files but the index lists 166 - two leads were created and never indexed. The drift runs one way: no index entry points at a file that does not exist.
2. **Duplicate display names.** Four names appear twice in the individual index under two different references, and one motor name appears twice. The display name is derived mechanically from the filename, so a re-onboarded lead looks like a duplicate until the reference is checked.
3. **Malformed names.** Three individual entries do not follow the reference pattern - two have no prefix at all and one keeps the raw reference as the display name.
4. **Duplicate index copies.** The root copies and the in-folder copies are identical today, but nothing keeps them that way.

## Why it matters
- The counts in the indexes are the cheapest available measure of the book of business, and they are the basis for the numbers on [[Individual Health Insurance leads index]] and [[Motor Insurance leads index]].
- An index is a **read-only view** of a folder, so it can be summarised as counts and patterns without touching client data - which is how these pages are written.
- The index is the closest thing the workspace has to a database. The dashboard that reads lead files reads them the same way the index lists them: [[Markdown-backed lead store]].

Related: [[Wikilink conventions]], [[Lead file naming]], [[Insurance product lines]], [[Lead index files (root)]], [[Markdown-backed lead store]].

## Cross-source note: counts (2026-10-22)
Folder totals: individual 169 files (index counted 166), renewals 44 across twelve month folders (April index lists 8 against 10 files), motor 6, group 2, referral 2, Lead-Context 2. Overview: [[Workspace Leads folder overview]].

## The indexes, re-counted (2026-10-22 ingest)
Every folder has been walked and the index compared with what it claims to list.

| Folder | Files | Index entries | Gap |
|---|---|---|---|
| Individual health | 168 dossiers | 166 | **2 dossiers not listed**, no broken entries |
| Root `Leads/` | 1 dossier | 1 | correct |
| Motor | 5 dossiers | 5 | correct |
| Group | 1 | 1 | correct |
| Referral Leads | 1 tracker | 1 | correct |
| Lead-Context | 1 table | 1 | correct |
| Renewals, each month folder | index + board + N dossiers | - | 12 month folders, 24 index/board files |

**The root index is right and the big one is wrong.** The audit read the root index showing 1 entry against 166 in the individual folder as a defect; it is actually correct - only one dossier sits at the root. The folder that is out by two is the individual health index. See [[Workspace audit June 2026]] and [[Client dossiers]].

**Two index conventions for renewals.** The Leads tree names them `<Month>-Health-Insurance.md` (the month's dossiers) and `<Month>-Renewal.md` (the month's board). The root `Renewals/` tree names the same thing `<Month>-Renewals.md`. Same artefact, three different names in three places, and only one of them is referenced by the workspace rulebook. See [[Renewal pipeline]] and [[Renewals board]].

**What is missing an index:** the **documents** folders. `Workspace/Documents/` holds 16 per-client folders and **no index at all** - which is why a client folder cannot be found by browsing, and why 14 of them are empty. See [[Folder structure convention]].

**What the index is worth.** The index is the cheapest count of the book available without touching a client record, which is why these pages can be written at all. But it is hand-maintained, so it measures the folder **as someone remembered it**, not as it is: two dossiers exist that the index does not know about.
