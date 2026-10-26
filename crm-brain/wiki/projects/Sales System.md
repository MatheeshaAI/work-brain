---
type: project
sources: ["raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Drafts/pending_replies.json", "raw/Insurance Workspace/Sales-System/Logs/hourly_runs.log", "raw/Insurance Workspace/Sales-System/Tasks/tasks.json"]
updated: 2026-10-22
tags: [project, sales, automation, audit, insurance]
status: running, WhatsApp leg down for the whole ingested window
summary: "The hourly comms audit that scans mail and chat, drafts replies, ranks tasks and writes a daily report for an insurance desk."
---
# Sales System

The automation behind an insurance sales desk: an hourly job that scans mail and chat, sorts what it finds by deadline, prepares the replies, ranks the to-dos and writes a daily report. The ingested window is 26-29 May 2026 - four consecutive runs.

**Everything here is described as patterns, counts and structure.** The source files hold client names, contact details, lead and policy identifiers and full message bodies; the wiki keeps none of that.

## What it is made of
| Part | Where | Wiki page |
|---|---|---|
| The hourly job and its cycle | `Sales-System/` | [[Sales System automation]] |
| The data it reads and writes | 11 files | [[Sales-System automation data]] |
| The daily report it produces | `Daily_Audit_*.md` | [[Daily sales audit]] |
| Prepared replies | `Drafts/pending_replies.json` | [[Pending reply drafts]] |
| Ranked work list | `Tasks/tasks.json` | [[Sales task automation]] |
| Run history | `Logs/hourly_runs.log` | [[Hourly run log]] |
| The channel it could not reach | bridge on the desk's own server | [[WhatsApp bridge server]] |

## How the pieces connect
Four inputs feed the cycle: the WhatsApp bridge, the Gmail mailbox, CRM alert emails, and ordinary insurer and internal mail. The CRM is [[IMCRM]]; its "client is online and changed plan preference" notifications are the trigger for most of the follow-up calls the system proposes. The insurer side is dominated by [[Takaful Emarat]] renewal notices.

Each run writes three things - a channel snapshot, a drafts file and a tasks file - and appends one line to the log. Once a day the same job renders `Daily_Audit_<date>.md` next to the folders. So a single pass over the inbox becomes three renderings of the same facts: raw classification in JSON, a message to send in the drafts file, a thing to do in the tasks file, and a fourth one in prose on the day.

**The audits and the automation are two views of one process.** Every audit's "system notes" section points back at the Sales-System files, and every file in Sales-System is written by the same run that produced that day's audit. Nothing else in the desk writes to these files.

## What the audit found
The four days are mostly a story about one thing going wrong and four things not closing.

**The channel was down for the whole window.** All 18 runs recorded the WhatsApp bridge as unreachable - connection refused, then filtered ports, then timeouts. Every WhatsApp snapshot file is empty, every dashboard row is blank or zero, and the 28 May report asks for a manual check of all active chats. **Every count in this project for 26-29 May is Gmail-only.** The bridge address and its config are not copied here; see the source file.

**Six items stayed open across four days.** A policy flagged at one day from expiry and never confirmed renewed; a client escalation whose reply grew from 23 to 25 days of silence; three CRM callback alerts that aged from 6-8 days to 9-11 days with no call made; an internal colleague request for policy-issuance help that went from 5 to 8 days unanswered; a revised quote from an insurer after medical review; and a mandatory IT verification that sat on the list all four days. Nothing in the system marks an item as done, so each run rediscovered the same mail.

**The workload shape is steady.** 3-7 urgent and 4-11 action items per run, 12-16 information-only mails skipped per day out of roughly 45-50 scanned. 21 urgent items and 50 priority rows across the four days.

**The design is ahead of the plumbing.** The audit produces a fixed priority ladder, a cheap noise filter, a ready-to-send reply alongside every prioritised item, a named source for every task, and one append-only log. What it lacks is a closed loop and a working second channel.

## The gaps, in order of how much they cost
1. **No WhatsApp.** The largest gap, and it is a single unstarted service.
2. **No done state.** Every artefact is rebuilt from scratch each run, so nothing can be closed and history is lost.
3. **Counts that disagree.** On 28 May the markdown and the JSON swap their urgent and action counts; on 29 May the JSON lists 11 action rows and reports 8; timestamps for one run differ across three files. No artefact is authoritative.
4. **Zeros that mean "no data".** The log writes "0 need_reply" when the bridge is down. As a dashboard that reads as a clear inbox.
5. **Schema drift.** The date field is `scan_date`, `date` or `run_date` depending on the day; six timestamp formats in the log; one day uses `chats`, another uses three buckets plus a summary.
6. **Identifier hygiene.** Drafts sometimes carry an email, sometimes a colleague, sometimes neither; one lead appears under two different client names across the audits.

## How it sits with the rest of the vault
- The desk's problem list lives in [[Sales operations issues]]; the daily audit confirms most of those issues as a standing pattern rather than one-offs.
- The channel buckets the system uses - needs reply, waiting on client, outbound only - are the same board as [[WhatsApp lead follow-up statuses]].
- The cold-lead re-engagement draft on 29 May is a sibling of the [[Standard intro message]], not the same message.
- Plan naming has drifted: the audits speak of entry-level, mid-range and top-tier plans, while [[Plan price tiers]] records Basic / Basic Enhanced / Enhanced. The two vocabularies are not mapped in any source.
- A claims escalation in the window involved [[Nextcare]]'s customer app, and the quote escalations involved insurers with no page yet ([[QIC]]).
- This is the working automation behind the desk; [[Sales AI Team]] is the design for a broader platform, and the two are separate.

## Caveats
- The window is four days. Nothing here proves how the system behaves over a month.
- No code, schedule file or configuration for the job is in the ingested scope - only its outputs.
- Client, policy and lead identifiers are deliberately absent from this wiki; the source notes hold them.

Related: [[Daily sales audit]], [[Sales System automation]], [[Sales-System automation data]], [[Pending reply drafts]], [[Sales task automation]], [[Hourly run log]], [[WhatsApp bridge server]], [[IMCRM]], [[Sales operations issues]].
