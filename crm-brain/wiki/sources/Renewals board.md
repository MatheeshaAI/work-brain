---
type: source
sources: ["raw/Health-Insurance/Workspace/RENEWALS.md", "raw/Health-Insurance/Workspace/Renewals/May/RENEWALS-May-2026.md", "raw/Health-Insurance/Workspace/Renewals/May/May-Renewals.md"]
updated: 2026-10-22
tags: [insurance, renewals, dashboard, pipeline, contradictions]
privacy: aggregate only - client names, phone numbers, policy numbers and premiums are counted, not reproduced
summary: "The renewals master board: 8 April policies worth 57,098.06 AED, 7 of them never contacted, a premium total that does not add up, and a file that never rolled over to May."
---
# Source: Renewals board

`Workspace/RENEWALS.md` is the master renewals board: **4.8 KB, 99 lines, last written 22 May 2026**. Its title still reads **"Renewals Pipeline — April 2026"** - the month never rolled over, even though May renewals were being worked in parallel in `Renewals/May/` and `Leads/Renewals/Health Insurance/May/`. That single fact is the summary of this page: **the renewals board is a month behind.**

## The April summary
| Metric | Value |
|---|---|
| Total renewals due | **8** |
| Total renewal premium | **57,098.06 AED** |
| Renewed | 1 |
| In Progress | 0 |
| Not Contacted | 7 |
| Lapsed | 0 |

## The sections
| Section | Rows | State |
|---|---|---|
| URGENT - expired / expiring within 24 hours | **5** | 2 due within a day, 3 already expired at *Quote Sent* |
| Due This Month - not yet contacted | **2** | expiring 27 and 29 April |
| In Progress (contacted / quoting) | 0 | empty template row |
| Quote Sent / Payment Pending | 0 | empty template row |
| Renewed - April 2026 | **1** | 9,162.56 AED |
| Did Not Renew / Lapsed | 0 | empty template row |

**7 of the 8 policies were never contacted**, and the three largest-value expired cases were at least quoted. The empty sections are not "nothing happened" - they are placeholder rows of em-dashes, so the board's shape says "in progress" while the summary says "not contacted".

## The premium total does not add up
The summary states **57,098.06 AED** across 8 policies. The eight premiums listed in the tables sum to **64,992.62 AED**. Excluding the one already renewed, the seven open policies total **55,830.06 AED** - which is **1,268.00 AED short** of the stated figure.

So the headline number matches neither the list nor the list minus the renewed row. Either a policy was removed from the table without updating the total, or a ninth case was counted without being listed. The pipeline board repeats the same 57,098.06 figure and the same 8-policy count, so the error has been copied. See [[Pipeline board]].

## One contact, three policies
The urgent section carries a note that **three policies belonging to one family share a single contact number**, totalling **9,774.21 AED**, all three expired on the same day and all three at *Quote Sent*, with a quote comparison sent the following day. The board's instruction is to contact once and handle all three together - a good piece of operational thinking that the workspace records nowhere else.

**The renewal also consolidates.** The one renewed row shows a **family policy of three members consolidated into a single combined policy**, quoted with Live Insurance, and cross-referenced back to the health lead's CRM reference rather than to a renewal file. Renewals are therefore not always renewals in the product sense: they can be re-underwritten as a fresh family policy.

## The checklist
Under **Renewal Checklist** there are two lists: **Urgent (Do Today)** with 4 items - two of them already ticked, one of which records the consolidated renewal, one of which is the three-policy call - and **This Week** with 2 open items. Each item names a client and a phone number. Both of the open urgent items expire within 24 hours of the board's own date.

## The View links point at the wrong place
Every renewal row has a **View** link of the form `Renewals/` followed by the renewal filename wrapped in a wikilink, then the same filename repeated as `-<Client-Name>.md` - a wikilink wrapped inside a markdown path, with the file name repeated after the closing bracket. The target files do exist, but in `Leads/Renewals/Health Insurance/April/`, not in the root `Renewals/` folder. The Renewed row's link is worse: it opens with four square brackets before the reference instead of two. **Every deep link on this board is broken in some way**, which is why the wiki pages have to be written by hand. (The policy number and the client's name in the link are not reproduced here.)

## The instructions the board gives
> "When a status changes, tell Claude: *contacted, sending quote for 36,000 AED with TE*. Claude will: 1. update the individual file in `Renewals/`; 2. move the row to the correct section; 3. update counts in the summary table and in `PIPELINE.md`."

**Status flow:** `Due -> Contacted -> Quote Sent -> Payment Pending -> Renewed / Lapsed`.

This is the three-file rule in miniature, and it is worth noting what it assumes: that `Renewals/` is where the renewal file lives. Only one renewal dossier actually lives there (a single Dubai Insurance case, plus a `_reference` copy of it); the other 19 sit in the Leads tree. So following the board's own instructions would create a third location. See [[Renewal pipeline]] and [[Client dossiers]].

## Policy numbers in three forms
The same policy is written three ways across the workspace: the full insurer form `01-115-01-25-XXXXXXXXXX` (board and pipeline), the last ten digits `TE-XXXXXXXXXX` (renewal filenames, per the naming rule), and the insurer's own short form `DIC-XXXXXX` (DIC rows). One renewal file still carries the placeholder `TE-TBD`.

## May, in the other folder
`Renewals/May/RENEWALS-May-2026.md` (written 24 May, three days after the master board) holds the May board, and `Renewals/May/May-Renewals.md` (22 May) holds its index - note the naming drift: the Leads tree calls the same file `<Month>-Health-Insurance.md`. The May set is **10 renewal cases**, all policies that started in May 2025 and expire in May 2026: 6 Takaful Emarat, 3 Dubai Insurance and 1 [[Oman Insurance]] (`OI2`, policy numbers in the Oman-style `P/01/<year>/<serial>` form). Nine are *Due*, one is *Quote Sent*. See [[Takaful Emarat]] and [[Dubai Insurance]].

**All ten of those May renewal clients also sit in the pipeline board's Application / Payment stage** - nine as *Allocated*, 21 days waiting, pending action *"Confirm policy details"*, and one as *Quote Sent (Renewal)*. So renewals and new business share one queue, and the workspace does not record which of the two a given case is. See [[Pipeline board]].

## Related
- [[Renewal pipeline]]
- [[Pipeline board]]
- [[Task list]]
- [[Client dossiers]]
- [[Takaful Emarat]]
- [[Dubai Insurance]]
- [[Sales reporting]]
- [[Workspace audit June 2026]]
- [[Sales operations issues]]
- [[Renewals Pipeline April 2026]]
- [[Renewals Pipeline May 2026]]
- [[Health renewals leads folder]]
- [[Oman Insurance]]
- [[Live Insurance]]
- [[Renewal tracking status flow]]
