---
type: source
sources: ["raw/Health-Insurance/Workspace/PIPELINE.md"]
updated: 2026-10-22
tags: [insurance, pipeline, dashboard, leads, production]
privacy: aggregate only - the board names every client; only counts, status values and premiums are reproduced here
summary: "The master dashboard: 152 lead rows across six sections, two monthly production summaries, 76 daily-checklist items, and a broken New Leads table."
---
# Source: Pipeline board

`Workspace/PIPELINE.md` is the desk's main operating dashboard: **43.7 KB, 421 lines, last written 24 May 2026**. It carries the production summaries, every active lead with its pending action, the renewal snapshot and the daily checklist. The workspace's own rulebook calls it *"the main operating dashboard for active work"* and *"the single source of truth for all leads, statuses, and pending tasks"* - though the dossier store says otherwise. See [[Client dossiers]].

Its header still reads **"Pipeline — 08 May 2026"**, while `tasks.md` (written the same day) carries tasks dated 22 May. The board is stale relative to the tasks.

## The two production summaries
| | New business | Group additions | Renewals | Total |
|---|---|---|---|---|
| **May 2026** | 0 | **1 policy / 2,251.45 AED** | 0 | 1 policy / 2,251.45 AED |
| **April 2026** | **3 policies** | - | 1 / 9,162.56 AED | 3 policies / - |

with a footnote: **renewal premium due in April, 57,098.06 AED across 8 policies**. The May row is a single **pro-rated group addition**, not a new individual policy - so a month with one group addition and no new business reads as one policy booked.

**Broken link:** the May summary links the group policy to a file under `Companies/<company-name>.md`. There is **no `Companies/` folder** in the workspace; the group file lives under `Leads/Health Insurance/Group-Health-Insurance/`. See [[Group health insurance leads folder]].

## The sections
| Section | Rows | What it holds |
|---|---|---|
| New Leads (Needs Immediate Action) | **106** | client, type, created date, pending action |
| In Progress (Quoted / Followed Up) | **48** | + status, amount, days waiting |
| Application / Payment Stage | **19** | + status, amount, days waiting |
| Motor Leads | **5** | car, value, created date, pending action |
| Renewals — April 2026 | **8** | policy number, provider, expiry, premium, status |
| Policy Booked — April 2026 | **4** | client and booked date |
| Policy Booked — May 2026 | **1** | member, company, pro-rated addition, 2,251.45 AED |
| Cancelled / Inactive | **1** | cancellation with a recorded reason |

**183 lead rows in all, 191 table rows with the renewal snapshot, 240 wikilinks in the file.** Status values in play on the board: *Quoted*, *Followed Up*, *Application Submitted*, *Application Pending*, *Sent for Booking*, *Payment Initiated*, *Allocated*, *Quote Sent*, *Quote Sent (Renewal)*, *Renewed*, *Due*, *Cancelled*.

Two patterns worth naming:
- **"Allocated" is a stage, not an outcome.** Eight of the 19 rows in Application / Payment sit at Allocated with the pending action *"Confirm policy details"* and 21 days waiting - a queue of allocated leads that never converted into quotes.
- **The Days column exposes the backlog.** Most in-progress rows show 0 days, but a block of 13, a block of 21, and individual rows at 24, 26 and 28 days.

## The New Leads table is broken
The audit's first finding is confirmed and measurable. The section has **106 rows and 108 wikilinks** - 96 rows link the lead, 10 show a bare reference id with no wikilink at all, and one linked row carries two references, with several rows running together on one line. The bigger problem is that **35 rows across the whole board show a bare reference id** (against 148 rows that link correctly), so a graph traversal of the board misses roughly one lead in five.

The pending-action vocabulary is narrow and repetitive: **93 rows** read *"Await WhatsApp response - get insurance requirements"*, **21** read *"Send WhatsApp welcome message - get insurance requirements"*, **14** read *"Send quote"*, and the rest are *"Quote comparison sent - follow up on WhatsApp response"* or *"Await client response - quote comparison sent"*. A handful of rows carry a specific reason - verify a date of birth, prepare a family quote for six members including infants and seniors, send a Basic Enhanced comparison with a direct-hospital-access option.

**The oldest row in the section was created 23 March 2026** and several sit in the 30 March - 8 April band, all still "Send quote". The audit recorded this as *"very old leads still in New Leads"*; the leads over a year old it means are the two motor rows, one of them created 19 May 2025. See [[Workspace audit June 2026]].

## The daily checklist
Under **Pending Tasks — Daily Checklist** there are seven dated subsections: Today (22 May) **7 items**, Today (06 May) **13**, Today (24 Apr) **0**, Today (27 Apr) **54**, Friday (08 May) **1**, This Week **1**, Outstanding Documents **0**. Total **76 checkbox items**, each linking the lead it refers to.

**The checklist is organised by date, not by state.** A day in April still holds 54 open checkboxes, and nothing moves them out except a manual edit. That is why the board and `tasks.md` disagree: the board's checklist keeps the 22 May list short because it was rewritten that day, while the April backlog is still there under its own date heading.

## Motor section
Five motor leads, columns REF-ID, client, **car**, **value (AED)**, created date, pending action - all five "Quoted — await response". The oldest was created 19 May 2025, a full year before the board was last touched. Values run 50,000 to 230,000 AED. See [[Motor insurance leads folder]].

## Renewals snapshot
Eight April renewal rows: **1 Renewed, 4 Due, 3 Quote Sent - and all three of those are already expired**. The two largest premiums in the section (34,013.70 and 7,251.88 AED) sit against expiry dates of 22 and 23 April. The provider column reads *Live Ins.* for one row and *TE* for others - the same insurer under two names. See [[Renewals board]] and [[Renewal pipeline]].

## The cancellation
One row, cancelled 20 May 2026, with the reason recorded and a cancellation application submitted to the insurer. It is the only non-lead event on the board.

## Caveats
- **The board is hand-maintained and is not in sync with the dossiers.** Row counts, statuses and the 21/26/28-day backlogs are all asserted by hand.
- **The board is not the CRM.** It uses its own status words, so it has to be reconciled against the CRM to be trusted. See [[CRM hygiene]] and [[Lead pipeline stages]].
- **The `Companies/` link is dead**, and 35 rows are not linked at all.

## Related
- [[Renewals board]]
- [[Task list]]
- [[Referral leads board]]
- [[Client dossiers]]
- [[Dossier structure]]
- [[Renewal pipeline]]
- [[Sales reporting]]
- [[Insurance CRM pipeline]]
- [[CRM hygiene]]
- [[Workspace audit June 2026]]
- [[Group health insurance leads folder]]
- [[Motor insurance leads folder]]
