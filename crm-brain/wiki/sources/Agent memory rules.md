---
type: source
sources: ["raw/Health-Insurance/Memory/memory.md"]
updated: 2026-10-22
tags: [memory, tasks, leads, process]
summary: "Persistent memory of the workspace's operating rules: one task file, where leads live, four key workflows."
---
# Source: Agent memory rules

Original file: [[raw/Health-Insurance/Memory/memory.md|memory.md]]. Titled "Memory - Health Insurance CRM". Unlike the dated file next to it, this one is a **persistent memory**: the operating rules an agent is expected to apply without being told.

## Rule 1: one task list
- **All tasks and todos live in `Workspace/tasks.md` and nowhere else.**
- "Add to tasks" or "add to todos" means: add to that file.
- Session-only todo lists must never be the primary tracker; anything session-level has to be mirrored into the task file.
- The checklist section of the pipeline file is for daily operational reminders only - the task file is the master.
- Task types: Follow-up, Documents, Plans, Quotation, Enrollment, Admin, Other.
- Task statuses: To-do, In Progress, Completed This Week, Overdue.

## Rule 2: where things live
| Thing | Location |
|---|---|
| Leads | `Workspace/Leads/[REF_ID]-[Name].md` |
| Pipeline dashboard | `Workspace/PIPELINE.md` |
| Renewals | `Workspace/Renewals/` and `Workspace/RENEWALS.md` |
| Documents | `Workspace/Documents/[REF_ID]-[Name]/` |

## Rule 3: the four key workflows
1. **New lead** -> create the lead file, add to the pipeline, add a task, send WhatsApp.
2. **Quotation** -> add a Quotation task, update the lead status.
3. **Policy booking** -> follow the SOP, update all the files, move the task to Completed.
4. **Renewals** -> create the renewal file, add to the renewals file, add a task.

## Why it matters
- It is the clearest statement of the **single source of truth** rule in the vault, and the reason two dashboards can coexist without diverging. Concept page: [[Task single source of truth]].
- The file paths are the same ones the reorganisation note introduced: [[Workspace reorganization]].
- It says nothing about prices, plans or eligibility - the memory is about *where to write*, not what to write. That split is deliberate: product knowledge belongs with the plan sources, see [[Entry level plans]].

Related: [[Agent memory]], [[Task single source of truth]], [[Lead pipeline stages]], [[Lead file naming]].
