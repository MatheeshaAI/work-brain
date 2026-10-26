---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt", "raw/10_Work-Insurance/whatsapp_body.txt", "raw/Health-Insurance/Referral-Leads.md"]
updated: 2026-10-22
tags: [insurance, leads, referrals]
summary: "How referred leads are marked in the chat title and the business label, and how many referral sources are actually visible in the raw exports."
---
# Referral sources

Where leads came from in [[WhatsApp analysis May-June 2026]]. The report says most new leads arrived through referrals from named colleagues or partners, plus direct leads from the CRM ([[IMCRM]]).

- Seven referrers are named (by first name or nickname). One is called the "primary referral source".
- Referred leads are tagged in the chat (for example "Bhavesh's Referral"), so each conversation shows who brought it in.
- Direct CRM leads are the other source.

Names of individual referrers are left out here; see the original note. Related: [[Standard intro message]].

## How referrals are marked in the raw chat exports
The referral tag is **part of the chat title** - the chat list row reads `Client Name - HEA-xxxxxxxx <Referrer>'s Referral`, sometimes with a topic word such as `(Renewal)`. The business account also carries a referral **label**, so the source can be seen in the chat list without opening the chat.

**Counts in the raw exports** (no names):
| Measure | `chatlist_full.txt` | `whatsapp_body2.txt` |
|---|---|---|
| Chats whose title carries a referral tag | ~5 | ~5 |
| Distinct referrers named in those titles | 2 | 3 |
| Referral labels on the business account | - | 1 (in `whatsapp_body.txt`) |

So **three distinct referral sources** are visible across the four dumps, against the **seven** the WhatsApp analysis names for the May-June window. The exports cover a few days; the analysis covers two months. Both are subsets of the same referral programme - see [[WhatsApp chat exports]], [[Batch intro messaging]].

**Referral tagging is the only cheap segmentation on the chat list.** The other title fields - member category, renewal marker, named hospital - come from the CRM and are copied in by the advisor's own naming. A referral that is not tagged in the title is invisible in any list-level report, which is why the count above is a floor rather than a total.

Related: [[WhatsApp chat exports]], [[Batch intro messaging]], [[CRM hygiene]], [[Lead capture gaps]].

## The referral tracker is a file, not a folder (2026-10-22 ingest)
The in-place workspace keeps referrals in one place: `Workspace/Leads/Referral Leads/`, holding a **tracker file** (`Referral_Leads_Tracker.md`) and a folder index that points at it. The workspace root also carries a separate `REFERRALS.md`.

Source: [[Lead index files (root)]], [[Lead folder index files]]. The tracker itself has since been ingested - see [[Referral leads board]] for its contents and [[Referral lead records]] for how a referral becomes a lead.

## Two trackers, and the split of concerns (2026-10-22 ingest)
Reading both trackers against this page's chat-title mechanism shows **three different places a referral can be recorded**, each with a different lifetime:

| Where | What it records | Lifetime |
|---|---|---|
| the **chat title** tag | who referred the person, once they have a chat | permanent, in the chat list |
| `Leads/Referral Leads/Referral_Leads_Tracker.md` | 3 pending referrals from one referrer, with the six-step conversion | until converted |
| `Workspace/REFERRALS.md` | 2 referrals awaiting response, from two referrers | until onboarded - then the row is deleted |

So a referral can be marked three times, in three files, with three counts - and **no two of them reconcile**. The April CRM export adds a fourth record of the same fact in its **IMCRM Sub-Source** column: 23 of 123 leads are attributed to the advisor's own referral and 100 have no sub-source recorded, so the CRM is the only count with a number attached to it. See [[April 2026 leads report]], [[Sales reporting]].

**The split of concerns is worth keeping:** the chat-title tag is *how a referral is marked*, and the tracker files are *the lifecycle of a referral before it becomes a lead*. This page covers the first; [[Referral lead records]] covers the second. See [[Standard intro message]] for the adapted welcome message rule.

Related: [[WhatsApp chat exports]], [[Batch intro messaging]], [[CRM hygiene]], [[Lead capture gaps]], [[Referral lead records]], [[Referral leads board]], [[April 2026 leads report]].
