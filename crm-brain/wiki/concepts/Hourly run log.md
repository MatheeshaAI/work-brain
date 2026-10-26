---
type: concept
sources: ["raw/Insurance Workspace/Sales-System/Logs/hourly_runs.log", "raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md"]
updated: 2026-10-22
tags: [automation, logging, process, sales]
summary: "The append-only run log of the hourly audit: line format, the 18 runs it holds, and what it is the only record of."
---
# Hourly run log

`Sales-System/Logs/hourly_runs.log` - one appended line per run of the hourly comms audit. It is the **only** file in the [[Sales System]] that keeps every run; everything else is overwritten. File detail is in [[Sales-System automation data]].

## Line format
```
[timestamp] Run complete. WA: <channel status and counts>. Gmail: <counts>. [optional extra segments]
```
- **Timestamps use six different formats**: ISO with an offset, ISO with a space before the time, a plain date-time with an explicit `+04:00`, `... UAE`, and `... UTC+4`. The lines are also not in strict chronological order within a day.
- **The WA segment carries the whole WhatsApp state** - the failure signature ("OFFLINE (API unreachable)", "API_UNREACHABLE (timeout)", "API OFFLINE (connection refused)") and the counts.
- **The Gmail segment** gives urgent and action counts for that run.
- **Extra segments appear only on some lines**: renewals by bucket, the active lead IDs, drafts generated, tasks saved, total unread scanned, information mail skipped.

## The 18 runs it holds
| Date | Runs | Times (UAE) | Gmail urgent per run | Gmail action per run |
|---|---|---|---|---|
| 26 May | 12 | 01:02, 08:53, 10:14, 11:10, 13:11, 14:00, 14:12, 15:11, 16:13, 18:11, 18:30, 20:00 | 7, 4, 5, 6, 7, 6, 6, 5, 6, 5, 7, 5 | 4, 7, 9, 8, 8, 9, 4, 11, 8, 10, 7, 7 |
| 27 May | 1 | 09:13 | 6 | 8 |
| 28 May | 3 | 12:00, 12:13, 16:10 | 7, 6, 6 | 5, 8, 7 |
| 29 May | 2 | 09:12, 10:10 | 7, 3 | 8, 8 |

**Gmail urgent: 3-7 per run. Action: 4-11 per run.** Every one of the 18 lines says the run completed; 18 of 18 record the WhatsApp leg as offline.

## What only the log knows
- **Run density.** 12 runs on 26 May, then 1, 3 and 2. Either the hourly schedule thinned out or the log is incomplete for the later days - the sources do not say.
- **The working day in numbers.** On 26 May the job fired from 01:02 to 20:00 UAE, roughly every 1-2 hours inside working hours, with one early-morning run and one at 20:00.
- **When a day's snapshot was written.** Because the JSON files are overwritten (see [[Sales System automation]]), the log is the only way to know a day had a dozen scans and not one.
- **What the day looked like before the report.** The 26 May 14:12 line already recorded the renewal that expires tomorrow; the 15:11 line named the two top priorities; the 16:13 line noted 7 drafts generated; the 20:00 line noted 13 tasks saved.
- **Volume of noise.** One line notes about 47 unread scanned, another notes 9 information mails skipped.

## Reading hazards
- **"0 need_reply" does not mean an empty inbox.** The log writes `WA: 0 need_reply (API OFFLINE), 0 waiting` when the bridge is down. Three lines use exactly that phrasing, and the paired files confirm no data was retrieved. Taken at face value the log says the WhatsApp inbox was clear all four days; it was never read at all.
- **The same run has several lines.** On 26 May there are pairs close together (13:11 and 14:00/14:12, 18:11 and 18:30) with different counts, and on 28 May the 12:00 and 12:13 entries disagree. Either the job ran twice or a second reporting path writes here.
- **Counts move between runs of the same day.** On 26 May the urgent count goes 7, 4, 5, 6, 7, 6, 6, 5, 6, 5, 7, 5. The measurement is noisy, so a single run's count is not a trend.
- **Timestamps disagree with the other artefacts.** The 27 May run is logged at 09:13:44, its audit says 09:14 and its email JSON says 10:00.
- **Free text leaks identifiers.** Some lines list active lead IDs, and the file mixes timestamp styles, so it is not machine-parseable as it stands.

Related: [[Sales System]], [[Sales System automation]], [[Daily sales audit]], [[Sales task automation]], [[WhatsApp bridge server]].
