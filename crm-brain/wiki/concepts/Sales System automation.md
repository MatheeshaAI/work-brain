---
type: concept
sources: ["raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Drafts/pending_replies.json", "raw/Insurance Workspace/Sales-System/Logs/hourly_runs.log", "raw/Insurance Workspace/Sales-System/Tasks/tasks.json"]
updated: 2026-10-22
tags: [automation, process, sales, logging]
summary: "How the Sales-System folders run each hour: what is read, what is written, and what each storage style keeps."
---
# Sales System automation

The hourly job behind the [[Daily sales audit]]. It reads two communication channels, writes three kinds of file, and produces one report a day. The file-level detail is in [[Sales-System automation data]]; this page is how the pieces run.

## The cycle
One scheduled run does six things in order:

1. **Probe WhatsApp.** Fetch the chat list from the bridge, sort each chat into needs-reply / waiting-on-client / outbound-only. These are the same three states as [[WhatsApp lead follow-up statuses]].
2. **Scan Gmail.** Read unread mail over a rolling 14-day window and classify every message as urgent, action or information-only. The information-only bucket is large and deliberate - newsletters, product launches, HR notices and system mail are skipped rather than read.
3. **Write the day's channel snapshots.** `Communications/WhatsApp/<date>.json` and `Communications/Email/<date>.json`.
4. **Write drafts.** Turn the urgent and action items into ready-to-send replies in `Drafts/pending_replies.json` (see [[Pending reply drafts]]).
5. **Write tasks.** Rank the same items into `Tasks/tasks.json` (see [[Sales task automation]]).
6. **Append a log line.** One line to `Logs/hourly_runs.log` (see [[Hourly run log]]).

Once a day the same job renders the day's picture as `Daily_Audit_<date>.md` in the workspace root.

## The four input sources
| Source | Type | What it contributes |
|---|---|---|
| WhatsApp bridge | Self-hosted HTTP service on the desk's own server | Chat list and reply-state buckets |
| Gmail | Mailbox via a mail connector | The urgent, action and skipped classes, and the bulk of actionable work |
| CRM alert emails | Automated notifications from the CRM | "Client is online and changed plan preference" callbacks - the trigger for the follow-up calls |
| Insurer and internal mail | Ordinary email | Renewals with days remaining, revised quotes, policy issuance requests, compliance tasks |

The CRM is the same system as [[IMCRM]]; its alert and notification emails are the audit's main source of new callbacks. The insurer side is dominated by [[Takaful Emarat]] renewal notices.

## Three storage styles, and why they matter
- **Per-day snapshot** (`Communications/*`): keyed by date, rewritten by every run on that day. **Only the last run of a day survives.** On 26 May the log records 12 runs but only one pair of JSON files exists.
- **Overwritten state** (`Drafts`, `Tasks`): one file each, replaced wholesale. They are a current snapshot, not a history.
- **Append-only log** (`Logs/hourly_runs.log`): the only record that keeps every run.

The practical consequence: to reconstruct what the system saw, you have the log plus the daily audits. The JSON files tell you the state of the day at its last run.

## How the outputs feed each other
- The **email JSON** is the raw classification. The **drafts file** and the **tasks file** are two different renderings of the same urgent and action items - one as a message to send, one as a thing to do.
- The **daily audit** is a third rendering of the same material, as prose with a priority table.
- So one run produces the same facts three times in three shapes, and they drift apart. On 28 May the markdown and the JSON swap their urgent and action counts; on 29 May the JSON lists 11 action rows and reports 8.
- The **task list** always ends with a system task when the WhatsApp bridge is down, so the outage itself is tracked as work rather than silently retried.

## Runtime behaviour observed 26-29 May 2026
- The job runs on the hour; the log holds **18 runs across 4 days** - 12 on 26 May, then 1, 3 and 2.
- On the busiest day runs spanned 01:02 to 20:00 UAE, roughly every 1-2 hours during the day.
- Every run ends "Run complete", including the ones where the WhatsApp leg failed outright.
- Per-run Gmail output: **3-7 urgent** and **4-11 action items**. Information-only mail skipped: **12-16 per day**.
- The WhatsApp leg failed on **every run in the window** (see [[WhatsApp bridge server]]), so in practice this is a Gmail-only automation for those four days.

## What the design gets right and what it does not
**Right:** a fixed priority ladder; a cheap information-mail filter that keeps the urgent count small; drafts generated at the same moment as the task, so nothing is prioritised without a proposed reply; and one append-only log that survives the rest being overwritten.

**Not right:** no history in the working files; counts that disagree between artefacts; zeros that mean "no data" rather than "nothing to do"; no closed loop - the system lists and drafts but nothing records that an item was actually dealt with, which is why the same items recur for four days (see [[Daily sales audit]]); and schema drift, because each run writes whatever shape it produced.

## Caveats
- The window is four days in May 2026, from a job whose configuration is not in the vault. The schedule is described as hourly in every run.
- No source in scope describes the code that implements this, only its outputs.

Related: [[Sales System]], [[Sales-System automation data]], [[Daily sales audit]], [[Pending reply drafts]], [[Hourly run log]], [[Sales task automation]], [[Sales operations issues]], [[IMCRM]].
