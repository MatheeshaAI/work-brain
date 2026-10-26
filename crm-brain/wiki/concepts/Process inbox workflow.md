---
type: concept
sources: ["raw/10_Work-Insurance/process-inbox.md"]
updated: 2026-10-22
tags: [workflow, inbox, process, tasks, files]
summary: "The seven-step inbox routine that files incoming client documents and syncs two trackers - and the three places it fails."
---
# Process inbox workflow

The routine the desk runs on the files that arrive outside any system: scan, analyse, categorise, act, sync, clean up, report, turbo. Source: [[Process inbox]].

## The loop
1. **Scan** `INBOX/` for new files and `INBOX/tasks.md` for new instructions.
2. **Analyse** - tasks give actions; files are either new client documents (rename workflow) or attachments for an existing client folder.
3. **Categorise and act** - new lead gets a folder and a tracker row; quotes go to `02_Quotations/`; policies to `06_Policies/`; claims to `Claims/` and a logged task.
4. **Sync** `Task_Tracker.csv` and `Lead_Tracker.csv`.
5. **Clean up** - move processed files, mark tasks done.
6. **Report** - what moved and what changed.
7. **Turbo** - run the script if it exists, else do it manually.

## The folder grammar it assumes
A client folder is a numbered sub-structure: `02_Quotations`, `03_Documents`, `06_Policies`. Claims live outside the client folders. Two trackers sit at the top: one for tasks, one for leads.

## Where it fails
| Failure | Why |
|---|---|
| **A dependency is missing** | Step 2 calls a `rename-documents` workflow that is not documented anywhere in this folder - the routine has an undocumented step |
| **"Processed" is a manual flag** | Step 5 marks tasks done by editing `tasks.md`. If the run is interrupted between step 3 and step 5, files have moved but the task still looks open, and the next run double-files them |
| **Two trackers, one truth** | `Task_Tracker.csv` and `Lead_Tracker.csv` are synced separately in step 4, from the same processed items. A task without a lead row, or a lead row with no task, is possible and invisible |
| **The last step is manual** | Step 7 is marked `// turbo` but says "run the processing script **if available**" - the routine is written as if automated while depending on a person |

## Why it is the same problem as the CRM
The inbox routine is a **manual, file-based implementation of the CRM pipeline**: files arrive unstructured, get classified, get attached to a record, and a tracker is updated so the state is queryable. [[CRM hygiene]] is the same thing on the CRM side. [[Insurance CRM pipeline]] is the shared shape; [[Tasks and analytics]] is the reporting side.

The practical difference is that the folder structure can be changed by moving a file, whereas a CRM status change is a deliberate act with a history trail - which is why [[Lead tracking in the CRM]] can reconstruct what happened, and the inbox cannot.

Related: [[Process inbox]], [[CRM hygiene]], [[Open tasks]], [[Document request handling]], [[Tasks and analytics]], [[Sales task automation]], [[Sales System automation]].
