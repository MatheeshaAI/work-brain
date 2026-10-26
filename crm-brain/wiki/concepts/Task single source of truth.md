---
type: concept
sources: ["raw/Health-Insurance/Memory/memory.md"]
updated: 2026-10-22
tags: [tasks, process, single-source, desk]
summary: "The rule that every task and todo lives in Workspace/tasks.md and nowhere else, and why a second tracker is only allowed to be a reminder."
---
# Task single source of truth

The workspace's hardest-won operational rule, stated in the persistent memory: **all tasks and todos live in `Workspace/tasks.md` and nowhere else.**

## The rule as written
- "Add to tasks" or "add to todos" means: add to that file.
- **Session-only todo lists must never be the primary tracker.** Anything session-level has to be mirrored into the task file.
- The checklist section of the pipeline file is for **daily operational reminders only** - the task file is the master.

Source: [[Agent memory rules]].

## Why it exists
The desk runs on several surfaces at once - a task file, a pipeline file with its own checklist, a renewals tracker, a referral tracker, a chat inbox, and a CRM with its own statuses. Each can hold "the next action", and when they disagree nobody can say which is true. The rule picks one file as the answer and demotes the others to reminders.

The same problem appears elsewhere in the vault: the CRM's status vocabulary does not cover the post-sale states the desk actually works in, so those live on a separate task list - see [[CRM hygiene]] and [[WhatsApp lead follow-up statuses]].

## The taxonomy
- **Task types:** Follow-up, Documents, Plans, Quotation, Enrollment, Admin, Other.
- **Task statuses:** To-do, In Progress, Completed This Week, Overdue.

The task file is a table, and the pipeline's daily checklist mirrors the urgent entries from it.

## The rules that keep it true
- Every lead gets a `## Related Tasks` section pointing back at the task file, so a task is findable from the lead. See [[Wikilink conventions]].
- The pipeline file's checklist is regenerated from the task file, not maintained alongside it.
- The dashboard's Priority Radar reads the pipeline's pending-task list and shows up to 6 urgent items plus today's open tasks - so the task file is what reaches the screen. See [[Insurance Dashboard]].

## Caveats
- The rule is enforced by convention, not by tooling: nothing checks that a session list was mirrored, and nothing checks the pipeline checklist against the task file.
- The task file is markdown, so "completed" is a status column, not a removal - the file grows monotonically.
- Because both the task file and the pipeline hold task-shaped data, the two can drift; the rule only says which one wins.

## How it is holding up (2026-10-22 ingest)
The task file has now been read alongside the pipeline it is supposed to feed. The rule is **half-kept**:

- The master file is small and current: `tasks.md` was written on 24 May and holds **12 open tasks** plus 2 completed, in 7 types, with High/Medium priority and due dates of 22 May (10), 25 May (1) and 1 June (1). See [[Task list]].
- **The pipeline checklist has 76 items, not 12.** Dated subsections are kept per day rather than regenerated, so 54 of the items sit under a late-April heading that nobody has cleared. The rule says the checklist is regenerated from the task file; in practice it is a historical pile.
- **"Overdue Tasks: (None)"** is a shape, not a measurement: 10 of the 12 tasks were dated 22 May and the file was last written on 24 May, so nothing is overdue because the dates are refreshed rather than carried forward.
- **One task is duplicated** in both the table and the checklist, and **two tasks link to leads by client name** rather than by reference id - the two newest dossiers, which have no reference in their filename. A resolver keyed on the reference id silently misses exactly those two. See [[Lead reference IDs]] and [[Dossier structure]].

**The real content of the task file is not scheduling.** Each task records a negotiation state - a premium increase to explain, a condition to declare, a renewal price to match, a QA complaint to settle first - which is the book's commercial detail, kept in a checklist rather than in a dossier. See [[Task list]] and [[Client dossiers]].

Related: [[Agent memory rules]], [[Lead pipeline stages]], [[Markdown-backed lead store]], [[Wikilink conventions]], [[Insurance Dashboard]], [[Task list]], [[Pipeline board]].

A lighter-weight version of the same discipline - one file, sorted by urgency rather than by type - is the "Executive Function Externalizer" prompt in [[ADHD Productivity Prompts]], which dumps open loops and sorts them into Now / Later / Trash.

## A project that had to choose one (2026-10-22 ingest)
[[Tandem Browser]] started with two planning files and had to collapse them into one - a clean illustration of the failure this concept warns about:
- `docs/internal/ROADMAP.md` (sprint planning and feature backlog) and `docs/internal/STATUS.md` (daily standup tracker) were the original pair. The `internal/` folder was split out from the public docs on 7 March 2026.
- Later, a single **`TODO.md`** became the live engineering backlog, and both internal files were explicitly demoted: *"TODO.md is the active engineering backlog; docs/internal/ROADMAP.md and docs/internal/STATUS.md are historical snapshots, not the day-to-day source of truth."* The contributing guide repeats the rule for contributors.

Two further disciplines are worth copying: the **status files live beside the work** they describe (`docs/<track>/STATUS.md`), and the **plan and the writeup live in different folders** - `docs/plans/` for not-yet-implemented designs and `docs/implementations/` for what was built - so the folder structure itself records progress. See [[Tandem Browser feature design plans]], [[Tandem Browser implementation tracks]].

Source: [[Tandem Browser backlog]], [[Tandem Browser contributing and security policy]], [[Tandem Browser internal planning notes]].
