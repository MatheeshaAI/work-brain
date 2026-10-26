---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-28.json", "raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/Dashboard/lib/leadStore.js"]
updated: 2026-10-22
tags: [insurance, whatsapp, workflow]
summary: "The chat-board status vocabulary, and how it does not line up with the stage-based statuses the CRM uses."
---
# WhatsApp lead follow-up statuses

How [[WhatsApp analysis May-June 2026]] sorts every conversation into a status board. A useful template for any lead inbox.

| Status | Meaning | Examples of reasons |
|---|---|---|
| Urgent | Needs action now | Paid but no policy documents for over a month; customer asking for a payment link; expired quote |
| Needs follow-up today | Ball is in your court | Unsent draft; payment confirmation pending; unanswered question |
| In progress / awaiting customer | Waiting on the customer or the insurer | Documents promised by a date; feedback on quotes |
| New leads, intro sent, no response | Cold after first message | The largest group |
| Closed / converted | Done | Payment received and documents awaited; plan explained and thanked |
| Internal / team | Not a lead | Colleagues, insurer contacts, personal chats |

## Per-conversation labels used
Quoted, Docs pending, Following up, Payment pending, Ready to pay, Closed, New lead, Explaining plan, Existing policy, Draft unsent, Processing.

## Why it works
It turns an inbox into a queue ordered by who is waiting on whom. The automation idea of tracking these statuses fits the [[Sales operations issues]] list.

## The same board, machine version
The [[Sales System]] audit encodes three of these states as its WhatsApp buckets: **need to reply**, **waiting reply** and **outbound only**. They are written into `Sales-System/Communications/WhatsApp/<date>.json` on every run.

The 29 May daily audit adds a distinction the board above does not make, and it is the more useful one: **active lead callbacks** (the client is still browsing and changing plan preference, so they are live) against **cold leads at 6+ days** (no recorded response for two weeks or more). Three of each appeared that day, at 9-11 days and 13-14 days respectively.

## The failure mode to avoid
The WhatsApp channel was unreachable for the whole 26-29 May 2026 window, and the buckets were written as **empty arrays and zero counts** rather than as unavailable. The run log put it as "0 need_reply (API OFFLINE), 0 waiting". A board that reads zero because it was never scanned looks exactly like a board where nothing is waiting. Any status board fed by an automation needs an explicit "not scanned" state alongside the counts - see [[WhatsApp bridge server]], [[Sales System automation]].

## The CRM's own status vocabulary is a different board
The chat board above sorts conversations by **who is waiting**. The CRM sorts leads by **sales stage**, and the two are not the same list.

**CRM statuses (07-Jun-2026, 68 health leads):** Quoted 34, Followed Up 19, Application Pending 6, Lost 4, New Lead 3, In Negotiation 1, Policy Booked 1.

Mapping the two boards onto each other:

| CRM status | Chat board equivalent | Note |
|---|---|---|
| New Lead | New leads, intro sent, no response | Only 3 leads; the real cold population lives in the chat list, not the CRM |
| Quoted | Waiting for feedback on the quote | 34 leads - half the book |
| Followed Up | Needs follow-up today / awaiting customer | 19 leads, the second largest bucket |
| Application Pending | In progress, awaiting insurer or customer | 6 leads |
| In Negotiation | Ready to pay / explaining plan | 1 lead |
| Policy Booked | Closed / converted, documents awaited | 1 lead |
| Lost | Closed | 4 leads |
| - | **Docs pending, payment pending, draft unsent, internal/team** | **No CRM status exists for these** |

The last row is the gap. The chat board has states the CRM cannot hold: **docs pending, payment pending, draft unsent** and **internal/team** chats. The desk's own task list adds four more that match none of the CRM's: waiting on e-cards, documents received but not submitted, QA refer-back, and lost quotation. See [[CRM hygiene]], [[Open tasks]].

**Also unmatched: the chat list's own signals.** 10 rows in the raw exports carry an unread counter and 5 had their last message deleted - neither is a CRM state, and neither is in the chat board above. See [[WhatsApp follow-up gaps]].

## A fourth board: the local conversation archive (2026-10-22 ingest)
The local WhatsApp tooling keeps its own searchable copy of the conversations, which can be turned into a status board from the machine rather than from the phone:
- The search script accepts a **phone number, a name, or a lead reference**, so a lead file can be joined to its conversation without storing a number in the lead file.
- The `whatsapp-reader` agent in the 2026-05-04 design returns exactly four facts per conversation - **last message date, message count, and a status assessment (responsive / no response / interested / not interested)** - which is a status board derived from the archive rather than from the CRM.
- The stated workflow puts the conversation **in the lead file**: an "Inquiries & Interactions" block with date, type, current plan, requested plan and status. That block is the per-lead version of this board.

Sources: [[Baileys WhatsApp integration setup complete]], [[Agent architecture redesign spec]], [[Local message archive]].

The two practical points for anyone reading these boards: the archive's status assessment is an **inference**, not a CRM field, and it is only as fresh as the last sync - which, if the phone was offline or the bridge was down, is silently stale. See [[WhatsApp bridge server]], [[Linked device authentication]].

## Where the stage boards live
The operational counterpart of these chat boards is the markdown pipeline file - five stage sections plus a task checklist - read by the local dashboard. It is a different vocabulary again from both the chat board and the CRM stages. See [[Lead pipeline stages]].

## Cross-source note: status values in the lead files (2026-10-22)
The lead files themselves ([[Individual health insurance leads folder]]) use a third vocabulary again: New Lead 81 and New 27 of 169 files, Quoted 18, Followed Up 13, Allocated 8, Policy Booked 4, with about 20 distinct strings in all. Renewals use a six-step flow ([[Renewal tracking status flow]]). **Contradiction flagged:** four vocabularies now coexist (chat board, CRM stages, lead-file text, renewal flow) with no mapping; see [[Lead data quality issues]].
