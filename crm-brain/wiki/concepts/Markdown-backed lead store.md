---
type: concept
sources: ["raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Dashboard/README.md", "raw/Health-Insurance/Memory/memory.md", "raw/Health-Insurance/Memory/IMCRM_Extension_Server.md"]
updated: 2026-10-22
tags: [leads, markdown, storage, dashboard, extension]
summary: "Markdown files in Workspace/Leads are the database - four tools read and write them, and there is no database anywhere."
---
# Markdown-backed lead store

There is no database in this workspace. **The lead files are the store**, and four different tools read and write the same markdown.

## The files that make up the store
| File | Role |
|---|---|
| `Workspace/Leads/[product]/<REF_ID>-<Name>.md` | the record: one lead, one file |
| `Workspace/PIPELINE.md` | the stage board: tables per stage plus the task checklist |
| `Workspace/tasks.md` | the task master |
| `Workspace/RENEWALS.md` | the renewals tracker |
| `Workspace/Documents/<REF_ID>-<Name>/` | the document folder per lead |

## Who writes to it
| Writer | What it writes | Mechanism |
|---|---|---|
| **Browser extension** | the lead file, the document folder, a pipeline row | `chrome.scripting.executeScript` for the read, then a local HTTP call to the server for the write |
| **Local file server** | the lead file, the document folder, the pipeline row | Node.js, `node Scripts/lead-file-server.js`, port 3000 |
| **Dashboard** | a timestamped comment appended to the lead file, and uploaded documents into the document folder | `POST /api/leads/:refId/comments` and `/documents` |
| **Human / agent** | everything else, by hand in Obsidian | - |

Sources: [[IMCRM extension server memory note]], [[Insurance Dashboard (Health Insurance OS)]], [[Agent memory rules]].

## Why it works
- **Everything is inspectable.** The state of a lead is a file you can read, diff and edit in Obsidian, with no export step.
- **There is one truth by construction.** The extension, the server, the dashboard and the human all write the same markdown, so there is no sync step between tools.
- **Portability.** The whole book of business is a folder of markdown that can be zipped, grepped or committed.

## How the dashboard reads it
`lib/leadStore.js` is the reference implementation of the format:
- Every `.md` file **directly inside** `Workspace/Leads/` is a lead. Files in sub-folders are not visible.
- Fields are read with regular expressions from flat `- **Field:** value` lines: Ref-ID, Full Name, Status, Customer Type, Created Date, Mobile, Email, Nationality, Gender, DOB, Member Category, Advisor.
- A file without a reference is skipped; a file with an unfamiliar shape parses to "Unknown".
- Member count comes from the rows of the `## Member Details` table.
- Comments come from the text under `## Comments`, split on ISO timestamps.
- Writing a comment appends under `## Comments`, creating the section if needed, and inserts it before `## Lead Status` or `## Payment Details` when those exist.

## The costs
- **One level deep.** A lead filed in a sub-folder disappears from the dashboard and from the counts.
- **No constraints.** Nothing enforces a valid reference, a valid stage or a valid date; the dashboard's job is to survive whatever it finds.
- **Write conflicts are silent.** Two tools appending to the same file at the same time is a lost update, and there is no locking - the server does warn about a lock file in the session store, but that is the WhatsApp side.
- **Parse drift is the real risk.** If a lead file is written in a different shape, it stays in the folder but disappears from every board.

Related: [[Insurance Dashboard]], [[Local file writing sidecar]], [[Task single source of truth]], [[Lead file naming]], [[Lead folder index files]], [[IMCRM Data Extractor]].

## What the store actually contains (2026-10-22 ingest)
The store has been read end to end, and the shape is now measured rather than inferred:

| Folder | Files |
|---|---|
| Individual health dossiers | **168** (+ 1 index) |
| Motor dossiers | 5 (+ 1 index) |
| Group policy | 1 (+ 1 index) |
| Referral tracker | 1 (+ 1 index) |
| Lead-context table | 1 (+ 1 index) |
| Renewal dossiers | 20 across 12 month folders (+ 24 index/board files) |
| Archived scripts | 15 (+ 1 recovery note) |
| **Total under `Leads/`** | **243** |

See [[Client dossiers]] for the anatomy and [[Dossier structure]] for the template.

## The three failure modes, observed
1. **Parse drift is real and it is large.** The canonical template has six sections, but **45 distinct heading names** appear across the 168 dossiers, and the working sections are optional: `Customer Profile` in 163 files, `General Information` in 161, `Payment Details` in 138, `Member Details` in 117, `Documents` in 109, `Status Updates` in **82**. A parser that requires the lower half of the template loses 51% of the files.
2. **The status field is unconstrained.** **22 distinct values** in 168 files, against a canonical 9 in [[Health insurance CRM system overview]] and a 16-19 stage CRM pipeline - see [[Lead pipeline stages]]. Nothing checks the value, so the drift is invisible until a report counts it.
3. **The indexes are not a view of the folder.** The individual-health index lists 166 entries against 168 files: two dossiers are not in the index, and no entry is broken. See [[Lead folder index files]].

## One level deep, confirmed
The "one level deep" cost is visible in the numbers: the individual health dossiers sit three folders below the workspace root and the group, motor and referral sets sit beside them, while the **renewals are split across two conventions** - 20 files under `Leads/Renewals/Health Insurance/{Month}/` and one under the root `Renewals/May/`. A tool that walks one level finds one of them. See [[Renewal pipeline]].

**The document folders show the same asymmetry.** `Workspace/Documents/` holds 16 client folders named after the reference id, and **14 of them are empty** - the folder is created when the lead is created, the files never arrive. See [[Folder structure convention]] and [[Workspace audit June 2026]].
