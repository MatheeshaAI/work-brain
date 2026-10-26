---
type: source
sources: ["raw/Health-Insurance/Lead-Context.md", "raw/Health-Insurance/Leads.md", "raw/Health-Insurance/Referral-Leads.md"]
updated: 2026-10-22
tags: [insurance, leads, index, referrals]
privacy: "structure and counts only, no client names or lead IDs"
summary: "Three root lead index files (Lead-Context, Leads, Referral-Leads): one entry each, all pointers."
---
# Source: Lead index files (root)

Three small files at the root of the Health-Insurance vault: [[raw/Health-Insurance/Lead-Context.md|Lead-Context.md]], [[raw/Health-Insurance/Leads.md|Leads.md]] and [[raw/Health-Insurance/Referral-Leads.md|Referral-Leads.md]]. **This page keeps only structure, counts and patterns.** No client names or reference IDs are copied.

## What they are
All three follow the same five-line folder-index format described in [[Lead folder index files]]:
- A title line naming the folder.
- A count line `## Leads (1)`.
- One entry `- Filename -- Display Name`, where the filename is wrapped in a wikilink.

| File | Points at | Count |
|---|---|---|
| `Lead-Context.md` | a context file named `leads` | 1 |
| `Leads.md` | one lead file sitting at the root of the Leads area | 1 |
| `Referral-Leads.md` | the referral tracker file (`Referral_Leads_Tracker`) | 1 |

## Where the real folders are
Every one of the three has a **byte-identical twin inside the Leads area**: `Workspace/Leads/Leads.md`, `Workspace/Leads/Lead-Context/Lead-Context.md` and `Workspace/Leads/Referral Leads/Referral-Leads.md`, next to the folder they index. The root copies are duplicates, kept in sync by hand.
- `Workspace/Leads/` holds 2 files: the `Leads.md` index and one stray lead file that sits outside the product folders.
- `Workspace/Leads/Lead-Context/` holds the index plus one file named `leads`.
- `Workspace/Leads/Referral Leads/` holds the index plus `Referral_Leads_Tracker.md`.
- The workspace root also has a `REFERRALS.md`, which is a different file from the tracker and is out of this scope. See [[Workspace and infrastructure separation]].

## Patterns
- **These are pointers, not records.** Two of the three entries point at another *file* rather than at a lead - the referral tracker and a context note. The index therefore also functions as a "files worth knowing about" list for those folders.
- **The referral tracker is the only handle on referral leads.** `Referral-Leads.md` is the single place in this scope that names the referral tracker; the tracker itself lives in the workspace area, which is owned by another ingest stream and is not ingested yet. The referral programme itself is described in [[Referral sources]].
- **The root `Leads.md` holds the strays.** One lead sits outside the organised product folders. The product split is described in [[Insurance product lines]].
- **A "Lead-Context" file is per-lead context, not a shared brief.** The single entry shows the pattern: a file named after a lead that holds supporting context for that lead. The one in scope is described in [[Lead intro email batch]].
- **Two copies of the same index is a drift risk.** The root copies and the in-folder copies are identical today; nothing enforces that.

## Counts and caveats
- 3 files, 3 entries, all counts = 1. These indexes are the thinnest in the vault: the volume is in the product-line indexes ([[Individual Health Insurance leads index]], [[Motor Insurance leads index]], [[Group Health Insurance leads index]]).
- The counts are snapshots of files that can be regenerated.
- Nothing here records a stage, a price or a policy; the pipeline that these leads move through is described in [[Lead pipeline stages]].

Related: [[Lead folder index files]], [[Lead pipeline stages]], [[Referral sources]], [[Insurance product lines]].
