---
type: concept
sources: ["raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md"]
updated: 2026-10-22
tags: [audit, process, insurance, automation]
summary: "The daily comms audit routine, its fixed checklist and the issue counts it produced across 26-29 May 2026."
---
# Daily sales audit

The end-of-day report that the hourly comms job writes for a health-insurance sales desk. Four consecutive runs are ingested: [[Daily Audit 2026-05-26]], [[Daily Audit 2026-05-27]], [[Daily Audit 2026-05-28]], [[Daily Audit 2026-05-29]]. It is the bridge between the machine's hourly scan and a human's day - the only artefact in the [[Sales System]] written in prose.

**Counts and issue categories only.** The reports name clients, lead IDs, emails, phone numbers and policy numbers; those stay in the source notes.

## The routine
1. **Read both channels.** WhatsApp is bucketed into needs-reply / waiting-on-client / outbound-only; Gmail is classified as urgent, action or information-only.
2. **Sort the renewals.** Every policy with a notice in the scan window is placed in a bucket by days remaining, and the buckets become the priority order.
3. **Rank by deadline, not by topic.** The report uses a fixed ladder: P0 critical (act within hours), P1 urgent (reply today), P2 this week, P3 pipeline.
4. **Merge everything into one priority action list.** Each row carries a source column - insurer email, CRM alert, internal email, system error - so the reader can see why an item is there.
5. **Draft the reply.** Every urgent item ships with a ready-to-send message body. The drafts are also written to a machine file (see [[Pending reply drafts]]).
6. **Name the system state.** Channel health, last run, next run and the files written.
7. **Escalate internally.** Internal requests and compliance items are kept in their own section, separate from client work.

## Checklist a run covers
| Section | What it holds | Present |
|---|---|---|
| System alert | Channel outage, with the failure signature | all 4 days |
| Summary dashboard | Urgent, action, unread, renewals tracked | all 4 days |
| Critical / urgent items | Numbered, each with age and a draft | all 4 days |
| Renewal pipeline | Table of policies by days remaining | all 4 days |
| Priority action list | Merged, ranked, with source | all 4 days |
| System notes | Channel health, run times, files written | all 4 days |
| Good news | Policies issued, documents ready | 27 May only |
| Internal / admin | Compliance, pendency, product news | 27 May only |
| Active lead callbacks | Leads whose CRM alert says still browsing | 29 May only |
| Cold leads (6+ days) | No response for two weeks or more | 29 May only |

## Issue counts per day
Self-reported by each audit. These do not agree perfectly with the machine files written on the same day (see [[Sales-System automation data]]).

| Date | Day | Generated (UAE) | Urgent | Action items | Priority rows | Renewals tracked | Drafts written |
|---|---|---|---|---|---|---|---|
| 26 May | Tue | 18:30 | 5 (3 of them P0) | - | 11 | 7 | 5 |
| 27 May | Wed | 09:14 | 6 (+8 for the week) | - | 14 | 7 | 5 |
| 28 May | Thu | 16:00 | 7 | 5 | 12 | 10 | 7 |
| 29 May | Fri | 10:10 | 3 | 8 | 13 | 4 critical | 7 |

Totals across the four days: **21 urgent items, 50 priority rows, 34 renewal rows**. Unread mail scanned per run sat at roughly 45-50, of which only 3-7 were urgent.

## Recurring issues, and how long they stayed open
The audits are most useful read as a staleness log. Six items were still open when the four-day window closed:

| Recurring issue | First seen | Days still open at the end | Pattern |
|---|---|---|---|
| A policy flagged at 1 day from expiry and never confirmed renewed | 26 May | 4 (probably lapsed) | Renewal failure; escalates from "expires today" to "likely lapsed" and stays there |
| A client escalation unanswered on a network-coverage question | 26 May (23 days) | 4 more days (reached 25 days) | Grows by one day per day; the only P0 client item on 26 May |
| Three CRM callback alerts (client changed plan preference) | 26 May (6-8 days) | 3 more days (reached 9-11 days) | Alert-driven leads never called; the alert does not repeat, so only the audit keeps them alive |
| An internal colleague request for policy-issuance assistance | 26 May (5 days) | 3 more days (reached 8 days) | Handed over by a colleague; no reply recorded the whole time |
| A revised quote from an insurer after medical review | 27 May | 2 | Instruction was to call before sending, so it waited on a call |
| An approved application awaiting payment | 28 May | 1 | Needed one confirmation chase |
| Mandatory IT account and delegation verification | all 4 days | 8 days by the end | Compliance item that never got closed |

Two items appeared only once each: a policy-issued notification that closed on 27 May, and a claims escalation on 29 May where a claim had been rejected a second time through a TPA's customer app with no update for 5 days.

## What the four days reveal about the working pattern
- **Cadence.** The underlying job is hourly, but the *report* is daily. The log holds 12 runs on 26 May, then 1, 3 and 2 on the following three days - the hourly cadence thinned out or the log is partial. Runs on the busiest day ran from 01:02 to 20:00 UAE, roughly every 1-2 hours inside working hours.
- **Start-of-day vs end-of-day.** 26 and 28 May ran in the afternoon/evening (18:30, 16:00); 27 and 29 May ran in the morning (09:14, 10:10). Morning runs carry the previous day's leftovers into the urgent list.
- **Volume.** 3-7 urgent and 4-11 action items per run; 12-16 information-only mails skipped per day, about half of everything scanned.
- **The blind spot.** WhatsApp was offline on all four days, so every count in these audits is Gmail-only. The WhatsApp share of the workload is invisible in the whole window - see [[WhatsApp bridge server]].
- **Nothing closes by itself.** The same items recur because the report lists them; it does not action them. The audit is a prioritiser, not a workflow engine.

## Caveats
- Each day's counts are the run's own report and conflict with the JSON written alongside it.
- Draft bodies are in the sources; only their themes are recorded in this wiki.
- The window is four days in May 2026. It shows the shape of the routine, not a long-run trend.

Related: [[Sales System]], [[Sales System automation]], [[Sales operations issues]], [[WhatsApp lead follow-up statuses]], [[Standard intro message]], [[Hourly run log]].
