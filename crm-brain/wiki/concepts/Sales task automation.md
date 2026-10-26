---
type: concept
sources: ["raw/Insurance Workspace/Sales-System/Tasks/tasks.json", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md"]
updated: 2026-10-22
tags: [automation, tasks, process, sales]
summary: "The ranked to-do list the hourly audit derives: entry shape, urgency vocabulary, priorities and what it never closes."
---
# Sales task automation

The ranked work list the hourly audit derives from its own scan. One file, `Sales-System/Tasks/tasks.json`, rewritten by every run. File detail is in [[Sales-System automation data]]; the 29 May run is the state on record.

**Structure and counts only.** Task entries name clients, hold lead and policy identifiers and carry internal email addresses. None of that is reproduced here.

## Shape
Top level: `generated` and `tasks[]`. Each entry has:
- `priority` - a number from 1 upward, and the array is stored in that order, so the list is already ranked.
- `action` - one imperative sentence, usually carrying its own urgency word.
- `contact` - who the action is with.
- `lead` or `lead_policy` - the identifier, and which one depends on the item type.
- `source` - where the item came from: an insurer renewal mail, a CRM alert mail, an insurer quote mail, a Gmail thread, an internal forward, an IT mail, or the audit system itself.
- `urgency` - the label.
- `notes` - optional, on roughly half the entries, usually giving the age of the item and the reason it ranks where it does.

## Urgency vocabulary on the 29 May run
| Label | Count | What it covers |
|---|---|---|
| CRITICAL | 2 | A policy that may already have lapsed, and one expiring within days |
| URGENT | 3 | A premium objection with an outstanding quote, a claims escalation with no update for 5 days, an internal handover 8 days old |
| High | 2 | A revised quote to review, a renewal at about a week |
| Follow-up | 2 | CRM callback alerts, 9 days old |
| Follow-up/Cold | 1 | A CRM callback alert, 11 days old |
| Medium | 1 | A renewal at 15 days |
| Compliance | 1 | A mandatory IT verification |
| System | 1 | The WhatsApp bridge is unreachable |

**13 tasks, one per action, no duplicates within a run.** The source of a task is always named, so a reader can tell a renewal from a CRM alert from a colleague's request without opening the mail.

## How the list is built
1. Take the urgent and action items from the day's email classification.
2. Sort by deadline type: renewals by days remaining, client escalations by days waiting, callbacks by days since the CRM alert, internal requests by days since the hand-over.
3. Break ties by channel - a claims escalation and a lapse outrank a callback.
4. Fold in the compliance items and, last, the system item.

The ranking therefore mixes two clocks - time until a money deadline, and time since a person asked for something. A client waiting 25 days and a policy lapsing today both sit above a callback, and both are still below a fresh critical renewal in the 29 May list.

## What the list never does
- **No closed state.** There is no `status`, `done` or `completed` field. Nothing records that an item was dealt with, so the next run rebuilds the same item from the same unread mail. That is why the same renewal, the same escalation and the same three callbacks appear in four consecutive days of tasks (see [[Daily sales audit]]).
- **No owner.** Every task defaults to the same person; there is no delegation field even when the action is clearly someone else's.
- **No due date.** Urgency is a label; the date is embedded in the free-text action.
- **Two identifier vocabularies.** Renewals carry a policy-number field, leads carry a lead-ID field, and compliance items carry neither, so the list cannot be joined back to a single system without string parsing.
- **No system retry.** The bridge outage becomes task 13 rather than a retry with backoff, and the job keeps reporting "Run complete".

## Good property
Every task carries its `source`. A task that says where it came from can be checked, dismissed or delegated without re-reading the mailbox - and it also makes the audit reproducible, since the same source list drives the report, the drafts and the tasks.

Related: [[Sales System]], [[Sales System automation]], [[Daily sales audit]], [[Pending reply drafts]], [[Hourly run log]], [[Sales operations issues]].
