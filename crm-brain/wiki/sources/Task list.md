---
type: source
sources: ["raw/Health-Insurance/Workspace/tasks.md"]
updated: 2026-10-22
tags: [insurance, tasks, dashboard, wikilinks]
privacy: aggregate only - the task list names every client and quotes their situations; task shapes and counts only are reproduced
summary: "The master task list: 12 open tasks across 7 types, a duplicated table row, and two tasks that leak the reasoning the SOPs are supposed to own."
---
# Source: Task list

`Workspace/tasks.md` is the workspace's task list: **4.3 KB, 64 lines, last written 24 May 2026**. It calls itself *"master task list for all leads. Updates daily."* - and it holds **12 open tasks**, dated 22 May, plus two completed ones.

## Shape
| Part | Content |
|---|---|
| Today's Tasks (2026-05-22) | a 7-column table - task, lead (wikilink), type, status, priority, due date, notes |
| Task Types | 7 types: Follow-up, Documents, Plans, Quotation, Enrollment, Admin, Other |
| By Status | To-do (12 checkboxes), In Progress (none), Completed This Week (2) |
| Overdue Tasks | (None) |
| How to Update Tasks | 4 steps, ending "log daily activity in `daily/[YYYY-MM-DD].md`" |

**Types in use:** Quotation 5, Follow-up 5, Admin 1, plus one row that is both a Quotation and a Follow-up in the table (see below). **Priorities:** High 9, Medium 3. **Due dates:** 22 May (10), 25 May (1), 1 June (1).

## The tasks are a category error
The task list is not a to-do list. It is a **client-by-client statement of where each negotiation stands**, written in the imperative so that it can be pasted into a message:

- send a quotation matching a renewal price shared by a referrer, to close a policy;
- prepare and send a Basic Enhanced quote with a direct-hospital-access comparison;
- apply for a final premium on an upgrade, for a client who is pregnant and moving up a tier;
- call to settle a QA complaint **before** applying for a pre-existing condition case with two insurers;
- await the client's decision to proceed **without** a declaration, after being told the premium would rise 15-50%;
- monitor an upcoming renewal date.

Each one names the client, the insurer, the money and the obstacle. That is **the negotiation state of the book**, and it exists in no other file. See [[Client dossiers]] and [[Pipeline board]].

## Two defects
**1. A duplicated row.** The table's header is followed by an empty separator row and then a stray `|---|` row, and one task appears **twice** in the task table (a "Prepare and send quotation" for the same lead, once with a High priority). The To-do checklist below it lists it twice as well, so the count of 12 open tasks contains one duplicate.

**2. The notes leak the case, and in two cases they leak health information.** The task for a pre-existing-condition case records the client's condition, the QA complaint and the two insurers being approached; another records that the client is pregnant and upgrading tier. Those facts belong in the dossier, not in a task list that is read out loud every morning. See [[Client privacy exposure in agent memory]] and [[Underwriting rules]].

**3. The salutation problem.** Two tasks link to leads by **client name only** - the two newest dossiers, which do not have a reference id in their filename. Every other task links a `HEA-` reference. So the task list mixes the two naming conventions, and a script that resolves tasks by reference id misses exactly the two newest cases. See [[Dossier structure]] and [[Lead file naming]].

## Overdue: none, and that is the tell
The file says **Overdue Tasks: (None)** while 10 of the 12 tasks are dated **22 May** and the file was last written on **24 May**. Nothing is overdue because the list is regenerated with fresh dates instead of the old ones being carried forward. The overdue section is a shape, not a measurement.

## The update rule
1. Move completed tasks to "Completed This Week";
2. create new tasks as you work with leads;
3. update the lead files with task outcomes;
4. log the daily activity in `daily/[YYYY-MM-DD].md`.

Step 3 is the one that keeps the task list and the dossiers in step, and step 4 is what makes the daily notes a record rather than a list. Both are honoured: the two completed tasks are logged in the 20 May daily note. See [[Daily activity 20 May 2026]].

## Related
- [[Task single source of truth]]
- [[Pipeline board]]
- [[Renewals board]]
- [[Client dossiers]]
- [[Dossier structure]]
- [[Lead file naming]]
- [[Lead reference IDs]]
- [[Daily activity 20 May 2026]]
- [[Client privacy exposure in agent memory]]
- [[Underwriting rules]]
