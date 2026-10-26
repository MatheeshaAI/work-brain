---
type: concept
sources: ["raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/June/June-Renewal.md", "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/May/May-Health-Insurance.md", "raw/Health-Insurance/Workspace/RENEWALS.md", "raw/Health-Insurance/Workspace/PIPELINE.md", "raw/Health-Insurance/Workspace/SYSTEM.md", "raw/Health-Insurance/Workspace/Plans/Takaful-Emarat-Insurance.md"]
updated: 2026-10-22
tags: [insurance, renewals, pipeline, status-flow, process]
privacy: aggregate only - client names, policy numbers and premiums are counted, not reproduced
summary: "The renewal pipeline: six status stages, a policy-numbered file per case, and the three-file update rule that keeps the board and the dossier in step."
---
# Renewal pipeline

Renewals are the recurring half of the book. They have their own folder, their own file naming, their own status flow and their own board - and they are the part of the workspace where the dates actually bite.

## The status flow
**Due -> Contacted -> Quote Sent -> Payment Pending -> Renewed -> Lapsed.**

Six stages, and the monthly boards use a traffic-light emoji for each. The order matters: **Lapsed is not an exit, it is a failure** - the desk has to chase a policy that has already expired, which is what the April board shows (three expired policies sitting at "Quote Sent").

## The files
| Thing | Where | Keyed on |
|---|---|---|
| Renewal dossier | `Leads/Renewals/Health Insurance/{Month}/` | insurer + policy number + client name |
| Month index | `{Month}-Health-Insurance.md` | lists that month's dossiers |
| Month board | `{Month}-Renewal.md` | client, policy number, provider, expiry, status, gross premium, notes |
| Master board | `Workspace/RENEWALS.md` | the current month's renewals, by urgency |
| Duplicate month | `Workspace/Renewals/{Month}/` | a second copy of one month's set |

**Provider prefixes are the insurer's own scheme codes**: `DIC-` (Dubai Insurance), `TE-` (Takaful Emarat), `HAYAH-`, `OI2-` ([[Oman Insurance]]). One file carries `TE-TBD` - the policy number was not known when the file was created and the placeholder became part of the filename. See [[Lead reference IDs]].

**Correction (2026-10-22):** `OI2` was read here as [[Orient Insurance]]. The May renewal file names the insurer explicitly - *"Provider: Oman Insurance (OI2)"* - with an Oman-style policy number, so `OI2` is [[Oman Insurance]] and Orient has no renewal book at all. See [[Oman Insurance]].

## The three-file update rule
A renewal status change is **not** a one-file edit. The workspace requires three files to move together:

1. the **renewal dossier** - the quote, the premium, the status;
2. the **renewal board** - the row moves to the matching status section;
3. the **pipeline board** - the renewals table row status and the production totals.

Miss one and the three views disagree. They currently do: `RENEWALS.md` is titled **April 2026** while the workspace audit is dated **1 June 2026**, and the May renewals live in a different folder (`Renewals/May/`). See [[Renewals board]] and [[Workspace audit June 2026]].

## The monthly rhythm
Twelve month folders exist (January to December). Only three hold cases: **April 8, May 10, June 2** - 20 renewal dossiers in total. The other nine months hold only an index and an empty board template, which is what a full year of placeholders looks like once the folder has been seeded.

## Where renewals come from
- **Automated notices.** The largest source: Takaful Emarat's renewal notifications, which arrive with a policy number, a quotation reference and a **days-to-expiry** value, and which the desk buckets into 1 / 7 / 15 / 30 / 45 days. See [[Takaful Emarat]] and [[Daily sales audit]].
- **Manual chasing.** Two policies had already passed expiry by the end of that audit window, having been flagged days earlier - and notices do not stop, so a lapsed policy has to be chased by hand.
- **The renewal price is not the same as the new-business price.** The April board shows premiums spanning 1,208 to 34,013 AED, and one case where the insurer **declined a discount** and the client was notified by WhatsApp. That is a renewal-specific negotiation, and it is the reason a renewal dossier carries a gross premium of its own.

## Related
- [[Renewals board]]
- [[Pipeline board]]
- [[Client dossiers]]
- [[Dossier structure]]
- [[Task list]]
- [[Takaful Emarat]]
- [[Daily sales audit]]
- [[Sales operations issues]]
- [[Lead pipeline stages]]
- [[Health renewals leads folder]]
- [[Renewals Pipeline April 2026]]
- [[Renewals Pipeline May 2026]]
- [[Renewal pipeline by month]]
- [[Renewal tracking status flow]]
- [[Oman Insurance]]
