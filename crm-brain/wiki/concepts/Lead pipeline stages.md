---
type: concept
sources: ["raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Dashboard/README.md", "raw/Health-Insurance/Memory/memory.md", "raw/Health-Insurance/Context/WORKSPACE_REORGANIZATION.md", "raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/stage_detector.py"]
updated: 2026-10-22
tags: [insurance, pipeline, stages, workspace]
summary: "The five-stage pipeline the workspace dashboard reads, the seven sections of PIPELINE.md, and how they map onto the 16-stage CRM pipeline."
---
# Lead pipeline stages

The desk's pipeline is a markdown file, `Workspace/PIPELINE.md`, and it is read by the local dashboard. The stages below are the **file's own section headings**, not a CRM concept.

## The sections the dashboard parses
| Section | What it holds |
|---|---|
| `## Production Summary` | counts shown on the overview cards |
| `## New Leads` | leads not yet contacted |
| `## In Progress` | leads being worked |
| `## Application / Payment Stage` | applications submitted or payment pending |
| `## Policy Booked` | completed policies |
| `## Renewals` | renewals in flight |
| `## Pending Tasks` | checkbox list of open work, grouped by `###` sub-heading |

Source: [[Insurance Dashboard (Health Insurance OS)]].

## The five stages, and the dashboard's status filter
The dashboard's sidebar filter uses four values plus "all": **new**, **quoted or followed up**, **application or payment**, **booked or allocated**. That filter is a *lead status* field read from the lead file, and it does not line up one-to-one with the pipeline's five sections.

## Three stage vocabularies, not one
| Vocabulary | Source | Shape |
|---|---|---|
| Pipeline sections (5) | `PIPELINE.md` | New Leads, In Progress, Application/Payment, Policy Booked, Renewals |
| Lead-file status field | `Workspace/Leads/*.md` | new, quoted/followed up, application/payment, booked/allocated |
| CRM sales stages (16) | [[Insurance CRM pipeline]] | New Lead → Allocated → Followed Up → Quoted → ... → Policy Booked / Lost |

The vault does not state the mapping between them. The pipeline file is the operational board, the CRM is the system of record, and the lead file carries a status that is closest to the CRM but coarser. **Do not assume a lead in `New Leads` is a CRM "New Lead".**

## The four workflows that move a lead
The persistent memory note states the desk's four recurring flows, which is how a lead crosses the sections:
1. **New lead** - create the lead file, add to the pipeline, add a task, send WhatsApp.
2. **Quotation** - add a Quotation task, update the lead status.
3. **Policy booking** - follow the SOP, update the files, mark the task completed.
4. **Renewals** - create the renewal file, add it to the renewals file, add a task.

Source: [[Agent memory rules]]. The task side of this is [[Task single source of truth]].

## Caveats
- `PIPELINE.md` is edited by hand and by the extension's local server, so its tables and the dashboard's counts can disagree for a day.
- The dashboard reads only `Workspace/Leads/*.md` one level deep, so a lead filed in a sub-folder never appears in a stage board. See [[Markdown-backed lead store]].
- The renewal section overlaps with `Workspace/RENEWALS.md`; the memory rule says the pipeline checklist is for daily reminders while the task file is the master. See [[Task single source of truth]].

Related: [[Insurance Dashboard]], [[Insurance CRM pipeline]], [[Task single source of truth]], [[Lead file naming]], [[Approval gates]].

## Cross-source note: lead-file statuses (2026-10-22)
Counted across 169 individual lead files: about 64 percent still say New or New Lead although 134 carry dated progress notes, so the status field lags reality. The Lead-Context legend (Prospect, Quoted, Pending, Enrolled, Inactive) matches neither the dashboard filter nor the CRM; see [[Lead-Context files]], [[Individual health insurance leads folder]], [[Health renewals leads folder]]. Flag: "Enrolled" and "Inactive" exist only in that legend.

## Stage-count conflict (added)
[[Sales_OS_Opencode_Session]] (31 Jan 2026) lists a 20-stage CRM pipeline (labelled "19 total"), including Allocated and three renewal-only stages, while [[Insurance Sales Pipeline - 16-Stage System]] describes 16. The session proposed dropping Allocated. Which list is current is unresolved; see [[Leads Folder Sales Agent]].

**A third count now exists in code.** The saved Python settings module uses **19** stages - the 20 with Allocated removed - and its stage detector implements rules for six of them ([[Stage detection rules]], [[Health Insurance Sales Agent Python Code]]). It ends at "Policy Pending" where the CRM list says "Policy Booked".

## Six vocabularies, one pipeline (2026-10-22 ingest)
The workspace does not have a stage list. It has **six**, and they disagree:

| Where | Stages |
|---|---|
| `SYSTEM.md` - the canonical reference | **9** (New Lead, Quoted, Followed Up, Payment Initiated, Payment Pending, Application Submitted, Sent for Booking, Policy Booked, Lapsed) |
| the CRM itself | 16 / 19 / 20 depending on which list you read |
| the dashboard's `leadStore.js` | **5** sections |
| `PIPELINE.md` | **5** board sections + 11 status values actually used in its rows |
| the dossier `Status` field | **22** values in 168 files |
| the CRM exports | 6 (April) and 7 (30-day) |
| the Lead-Context legend | 5 (Prospect, Quoted, Pending, Enrolled, Inactive) |

See [[Health insurance CRM system overview]] for the canonical nine, [[Dossier structure]] for the 22, and [[Sales reporting]] for the export vocabularies.

**Two collisions worth naming.**
- **`Allocated` is not in the canonical nine**, yet it is the single most common status on the pipeline board - **8 of the 13 rows** in the Application / Payment stage, all 21 days old, all waiting on "Confirm policy details". The session that proposed dropping Allocated was proposing to drop the desk's largest queue. See [[Pipeline board]].
- **`Lapsed` means two things.** In the canonical lead flow it means *the lead went cold and is removed from the pipeline*; in the renewals flow it means *the policy was not renewed*. Same word, opposite outcomes, one workspace. See [[Renewal pipeline]].

## The board is the pipeline, and it is out of date
`PIPELINE.md` was last written **24 May 2026** and carries **183 lead rows**: 106 New Leads, 48 In Progress, 19 Application/Payment, 5 Motor, 5 booked, 1 cancelled - plus an 8-row renewal snapshot. The audit of 1 June estimates roughly half those numbers, and the board's own New Leads table has 35 rows with a bare reference id and no wikilink. See [[Pipeline board]] and [[Workspace audit June 2026]].

**The duplication rule is what makes this hard.** `SYSTEM.md` sets a dual-update rule - lead file and pipeline board move together - and a three-file rule for renewals. Three files per case, each written by hand, and the workspace has no way to check that they agree. That is the structural reason behind [[CRM hygiene]].
