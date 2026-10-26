---
type: source
sources: ["raw/10_Work-Insurance/process-inbox.md"]
updated: 2026-10-22
tags: [workflow, inbox, process, automation, tasks]
privacy: no client data in this source
summary: "A seven-step inbox-processing workflow that files client documents, updates two trackers and reports what moved."
---
# Source: Process inbox

A written workflow, tagged `// turbo` on the final step, for turning an `INBOX/` folder into filed client work and an updated tracker. No client data in the source.

## The workflow

**Trigger:** the phrase "process inbox" or "check inbox".

| # | Step | What happens |
|---|---|---|
| 1 | **Scan INBOX** | Read `INBOX/tasks.md` for new instructions; find new files (PDFs, images, Excel) in `INBOX/` |
| 2 | **Analyse content** | For tasks, read `tasks.md` for required actions. For files, use the `rename-documents` workflow if they are new client documents, otherwise attach them to the existing client folder in `Clients/` |
| 3 | **Categorise and action** | New lead -> create folder, move documents to `03_Documents/`, add to `Task_Tracker.csv`. Quotes and policies -> move PDF quotes to `02_Quotations/`, policies to `06_Policies/`. Claims -> move files to `Claims/` and log the task |
| 4 | **Update trackers** | Sync `Task_Tracker.csv` and `Lead_Tracker.csv` from the processed items |
| 5 | **Clean up** | Move processed files to the correct client or category folders; mark tasks in `tasks.md` as processed |
| 6 | **Summary report** | Detailed summary of every file moved and task updated |
| 7 | **Turbo** | Run the processing script if available, otherwise do the manual steps to sync the data |

## The folder scheme it assumes
`INBOX/`, `Clients/` with per-client subfolders `02_Quotations/`, `03_Documents/`, `06_Policies/`, plus a sibling `Claims/` folder, and two trackers (`Task_Tracker.csv`, `Lead_Tracker.csv`) at that level.

## Why it matters here
- **It is the manual half of the CRM problem.** [[CRM hygiene]] is the same issue stated abstractly: files arrive in one place and have to be moved into a client structure that the CRM can then point at. Step 3 is literally "categorise the incoming thing".
- **It is a two-tracker design.** A task tracker and a lead tracker are updated separately, which is the same split as the CRM's own [[Insurance CRM pipeline]] - a lead status and a task list. [[Tasks and analytics]] covers the reporting side.
- **Steps 5 and 6 are the fragile ones.** "Mark tasks as processed" and "summarise what moved" are the manual checks that determine whether the next run repeats work. [[Process inbox workflow]] records the failure modes.
- **The `rename-documents` workflow is a dependency** that is not part of this file. It is referenced from step 2 and has no source in this folder - a gap in the workflow documentation.

Related: [[Process inbox workflow]], [[CRM hygiene]], [[Insurance CRM pipeline]], [[Tasks and analytics]], [[Document request handling]], [[Open tasks]], [[Sales System automation]].
