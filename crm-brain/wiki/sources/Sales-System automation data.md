---
type: source
sources: ["raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/Email/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Drafts/pending_replies.json", "raw/Insurance Workspace/Sales-System/Logs/hourly_runs.log", "raw/Insurance Workspace/Sales-System/Tasks/tasks.json"]
updated: 2026-10-22
tags: [automation, sales, schema, logs]
privacy: structure and counts only, no message bodies, client names, emails, lead IDs or policy numbers
summary: "The machine-written side of the hourly comms audit: 11 files under `raw/Insurance Workspace/Sales-System/`, plus the four ma"
---
# Source: Sales-System automation data

The machine-written side of the hourly comms audit: 11 files under `raw/Insurance Workspace/Sales-System/`, plus the four markdown audits they sit beside. **This page describes structure, schema and counts, not row content.** The files themselves contain client names, email addresses, lead IDs, policy and quotation numbers and full draft message bodies; none of that is reproduced here. Message bodies are described by theme only.

## Folder structure
```
Insurance Workspace/
├── Daily_Audit_YYYY-MM-DD.md          one markdown report per day, written by the run
└── Sales-System/
    ├── Communications/
    │   ├── Email/YYYY-MM-DD.json       one file per day, overwritten each run that day
    │   └── WhatsApp/YYYY-MM-DD.json    one file per day, overwritten each run that day
    ├── Drafts/pending_replies.json     single file, fully rewritten each run
    ├── Logs/hourly_runs.log            append-only text, one line per run
    └── Tasks/tasks.json                single file, fully rewritten each run
```
Three storage styles sit side by side: **per-day snapshot files** (Communications), **single overwritten state files** (Drafts, Tasks) and **one append-only log** (Logs). That distinction decides what history you keep - see [[Sales System automation]].

## What each file is for

| File | Purpose | Lifetime |
|---|---|---|
| `Communications/Email/YYYY-MM-DD.json` | The classified Gmail scan for one day: urgent, action, and information-only mail that was skipped | Last write of that day wins |
| `Communications/WhatsApp/YYYY-MM-DD.json` | The classified WhatsApp scan for one day, in three reply-state buckets | Last write of that day wins |
| `Drafts/pending_replies.json` | Ready-to-send replies the run prepared, each with its channel, urgency and a short context note | Replaced on every run |
| `Tasks/tasks.json` | The ranked to-do list the run derived, one entry per action with a priority number and a source | Replaced on every run |
| `Logs/hourly_runs.log` | One line per run: channel health and the counts that run produced | Appended, never rewritten |
| `Daily_Audit_YYYY-MM-DD.md` | The human-facing report for the day | One per day |

## Schema notes, file by file

### Email events (`Communications/Email/YYYY-MM-DD.json`)
Four files, one per day. The **top-level keys drift between days**, and so do the names of the item fields:
- The date field is called `scan_date` (26th, 29th), `date` (27th) or `run_date` (28th).
- The timestamp is `scan_time_uae` ("18:30 UTC+4" or "10:10"), `generated_at` ("10:00 UAE (UTC+4)") or an ISO string ("2026-05-28T12:00:00+04:00").
- A scan window is expressed differently each time: a `scan_window` string on the 27th, `scan_window_days: 14` on the 28th, a `period` string on the 29th.
- Section names differ: `urgent` + `action` (26th, 27th, 28th) versus `urgent` + `action_required` (29th). The 26th has no summary object at all.
- Item fields drift too: the age of an item is `days_unactioned` (26th), `days_old` (27th), absent (28th), `days_since` (29th). Renewals use `days_to_expiry` plus `date_received`; leads use `client` / `lead`; one day uses `category` strings ("Urgent", "Action - Renewal CRITICAL") while others use free-text `classification` or `snippet` + `action`.
- `info_skipped` is an array of short strings on the 26th, 28th and 29th (16, 14 and 15 entries) but only a count on the 27th (12).
- Only the 28th and 29th carry an explicit summary block with a `total_unread_scanned` figure (50 on the 28th).

**Counts per file:** urgent 5 / 6 / 5 / 3 for 26, 27, 28, 29 May. Action-section entries 8 / 8 / 7 / 11.

### WhatsApp events (`Communications/WhatsApp/YYYY-MM-DD.json`)
Four files, one per day, and **all four record the same thing: the channel was unreachable, so no data was retrieved**. Each has empty arrays and a zero summary.
- 26th: `scan_date`, `scan_time_uae`, `api_status`, `api_endpoint`, `error`, `need_to_reply[]`, `waiting_reply[]`, `outbound_only[]`, `notes`.
- 27th: `date`, `generated_at`, `api_status`, `summary{need_to_reply, waiting_reply, outbound_only, note}`, `chats[]` - the only file that uses a `chats` array instead of the three buckets.
- 28th: `run_date`, `generated_at`, `api_status`, `api_url`, `error`, the three buckets, **and** a summary with suffixed count keys.
- 29th: `scan_date`, `scan_time_uae`, `api_status`, `api_url`, `error`, the three buckets, `notes`.
- The failure text differs each day: connection refused, connection refused again, connection refused on the port, and finally a 15-second timeout.
- The three buckets the design intends - needs reply, waiting on the client, outbound only - match the status board in [[WhatsApp lead follow-up statuses]].

### Pending drafts (`Drafts/pending_replies.json`)
One file, rewritten by every run. Top level: `generated`, `source` (the 29 May run says "Gmail (WhatsApp API offline)"), and `drafts[]` with 8 entries.
- Each draft has an `id` (`draft_001` ... `draft_008`), a `client`, a `channel`, an `urgency`, a `context` sentence and the `draft_reply` body.
- `channel` takes three values: `email` (2), `email_internal` (1), `phone_or_whatsapp` (5). `phone_or_whatsapp` means the drafted text is meant to be spoken or sent as a chat, not emailed.
- `urgency` takes four values: `urgent` (3), `follow_up` (2), `cold` (1), `CRITICAL` (2).
- Contact details are inconsistent: a `lead` key on some entries, a `contact_email` on only 2, a `contact_via` (a colleague) on 1, and one entry with neither a lead nor a contact field.
- The `context` field is the useful part for a human: it states why the reply is needed and how long the client has been waiting.

### Run log (`Logs/hourly_runs.log`)
18 lines, append-only, one per run. The shape is
`[timestamp] Run complete. WA: <status and counts>. Gmail: <counts>. [renewals / leads / drafts / tasks counts]`
- **Timestamps use six different formats**: ISO with offset, ISO without a space, `YYYY-MM-DD HH:MM:SS+04:00`, `YYYY-MM-DD HH:MM UAE`, `YYYY-MM-DD HH:MM UTC+4`, and `YYYY-MM-DD HH:MM:SS UAE`. The lines are not in strict chronological order within a day.
- Every line ends with "Run complete" even when the WhatsApp leg failed outright.
- The WA field carries the whole WhatsApp status: "OFFLINE (API unreachable)", "API_UNREACHABLE (timeout)", "0 need_reply (API OFFLINE), 0 waiting", "connection refused".
- The Gmail field carries per-run urgent and action counts, which move between 3-7 urgent and 4-11 action items.
- Only some lines add the extra segments: renewals by bucket, the active lead IDs, the number of drafts generated, the number of tasks saved.
- One line notes that Gmail had scanned about 47 unread; another notes 9 information mails skipped.

### Task list (`Tasks/tasks.json`)
One file, rewritten by every run. Top level: `generated` and `tasks[]` with 13 entries on the 29 May run.
- Each entry has a numeric `priority` (1 to 13, and the array is stored in that order), an `action` string, a `contact`, a `source` naming where the item came from, and an `urgency` label.
- `urgency` values in use: `CRITICAL` (2), `URGENT` (3), `High` (2), `Follow-up` (2), `Follow-up/Cold` (1), `Medium` (1), `Compliance` (1), `System` (1).
- The identifier field depends on the item: renewal tasks carry `lead_policy`, lead tasks carry `lead`, and a compliance task carries neither.
- `notes` is optional and appears on about half the entries; it usually carries the age of the item and the reason for the priority.
- The list always ends with the system task to fix the unreachable WhatsApp bridge.

## How the pieces fit together
One scheduled job runs the cycle; each run writes five things and the cycle repeats on the hour:
1. Probe the WhatsApp bridge, bucket the chats, write `Communications/WhatsApp/<date>.json`.
2. Scan Gmail, classify each message as urgent, action or information-only, write `Communications/Email/<date>.json`.
3. Turn the urgent and action items into ready-to-send drafts, rewrite `Drafts/pending_replies.json`.
4. Turn them into a ranked to-do list, rewrite `Tasks/tasks.json`.
5. Append one summary line to `Logs/hourly_runs.log`.
6. Once a day, render the day's picture as `Daily_Audit_<date>.md` in the workspace root.

Because the Communication files are keyed by date and rewritten, **only the last run of each day survives there**; the log is the only place that keeps every run. The 26 May log holds 12 runs but there is a single pair of 26 May JSON files. That is also why the schemas drift - each run writes the shape it happened to produce.

## Caveats and data-quality flags
- **Counts disagree between artefacts of the same run.** On 28 May the markdown audit says 7 urgent and 5 action items while the email JSON summary says 5 urgent and 7 action items; the log holds three different pairs for that day. On 29 May the email JSON lists 11 action-required rows but reports 8, and the markdown audit also says 8. No artefact is authoritative.
- **Timestamps disagree for the same run.** The 27 May audit says 09:14, the log says 09:13:44 and the email JSON says 10:00.
- **Zeros mean "no data", not "nothing to do".** The WhatsApp files report zero needs-reply because the bridge was down; the log writes them as "0 need_reply (API OFFLINE)". Read as a dashboard this is misleading.
- **Overwriting loses history.** Drafts and tasks are snapshots; only the log and the four audits preserve the sequence.
- **Identifier hygiene is uneven.** Drafts carry email addresses in some entries and nothing in others; tasks mix a policy-number field with a lead-ID field; one lead appears under two different client names across the audits.
- The bridge address and any credential-like config values in these files are not copied into this wiki. The endpoint is recorded in the source files.

Related: [[Sales System]], [[Sales System automation]], [[Daily sales audit]], [[Pending reply drafts]], [[Hourly run log]], [[Sales task automation]], [[WhatsApp bridge server]], [[IMCRM]].
