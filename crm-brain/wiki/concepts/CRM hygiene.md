---
type: concept
sources: ["raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md", "raw/10_Work-Insurance/Leads not in CRM.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/todos.md", "raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv"]
updated: 2026-10-22
tags: [crm, hygiene, data-quality, pipeline]
summary: "Where the sales records disagree with each other: status vocabulary, duplicate extracts, chat threads with no lead record and broken export fields."
---
# CRM hygiene

The state of the sales records: what is duplicated, what is missing, and where two systems hold the same fact in different shapes. This is the "why the pipeline does not add up" page.

## Five kinds of drift

**1. Duplicate extracts of the same population.** [[Leads missing from the CRM]] is titled as a list of leads absent from the CRM, but all 35 of its rows are also rows in [[IMCR Health Leads 07-Jun-2026]] - same reference IDs, same statuses, same timestamps. It is a **filtered slice of the same export**, not a missing set. Two files, one population, two titles.

**2. Status vocabulary that does not close.** The CRM's own statuses are Quoted, Followed Up, Application Pending, In Negotiation, Policy Booked, New Lead, Lost. The desk's own working list ([[Todos]]) uses four task themes that map to none of them: waiting for e-cards, documents received but not submitted, QA refer-back, and a lost quotation. A lead can be simultaneously "Quoted" in the CRM and "waiting on the insurer" on the desk's list.

**3. Threads with no lead record.** About **20 of ~64 rows** in the WhatsApp chat list are a bare phone number with no name and no lead reference ([[WhatsApp chat exports]]). These conversations exist, they get replies, and they cannot appear in a CRM report because they have no lead ID.

**4. The same fact in three systems.** Commission: the CRM booking details carry the commission percentage, VAT and total; the CSV export carries `Comm. (%)` and `Commission`; a chat can carry a quoted price. Three records, no reconciliation step - see [[Commission and premium reporting]]. Plan price: the chat intros quote starting prices that disagree with [[Plan price tiers]] (Takaful Emarat Essential at 1,800 in chat, 2,417.10 on the page).

**5. Broken export fields.** The commission CSV has an epoch placeholder in 20 of 32 period-start cells and 23 of 32 paid-date cells, an empty currency and installment on every row, and a `Paid` column that holds sums rather than flags ([[Sales commission export]]). The report built on it would be wrong, and wrong silently.

## The read/unread gap
**10 rows carry an unread counter** in both WhatsApp exports, and **5 rows had their last message deleted**. Neither state exists in the CRM. A CRM dashboard can be fully green while a tenth of the visible inbox is unread - see [[WhatsApp follow-up gaps]].

## What good hygiene would look like
- One canonical lead list, with every derived extract labelled as a filter of it.
- A status vocabulary that covers the post-sale states the desk actually works in (e-cards, document chase, QA refer-back) - not just the sales stages.
- A lead reference on every chat thread, so phone-only chats can be counted.
- One number per fact, with the others derived.

## Related
[[CRM hygiene]] is the diagnosis; the mechanisms it needs are [[Extracting leads from the CRM]], [[Lead capture gaps]], [[Getting client data from the CRM]], [[Process inbox workflow]] and [[Commission and premium reporting]]. Related existing pages: [[Insurance CRM pipeline]], [[Lead tracking in the CRM]], [[Lead reference IDs]], [[Lead prioritization]], [[Sales operations issues]], [[WhatsApp lead follow-up statuses]].
