---
type: concept
sources: ["raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body2.txt", "raw/10_Work-Insurance/whatsapp_body.txt"]
updated: 2026-10-22
tags: [whatsapp, follow-up, process, gaps]
summary: "The unanswered-chat problem measured from the WhatsApp exports: unread counts, chased replies, deleted messages and promises with dates."
---
# WhatsApp follow-up gaps

What the raw WhatsApp exports show about conversations that stopped moving. Source: the [[WhatsApp chat exports]]; the wider measurement is in [[WhatsApp analysis May-June 2026]].

## The snapshot

| Measure | `chatlist_full.txt` | `whatsapp_body2.txt` |
|---|---|---|
| Chat rows visible | ~64 | ~59 |
| Rows with an **unread counter** | 10 | 10 |
| Rows whose last message was **deleted** | 5 | 3 |
| Rows with **no preview** ("Loading…") | 0 | 23 |
| Day markers spanned | Today → Wednesday (5 days) | Today → Wednesday |

So roughly **one row in six** was sitting unread in the visible list, and **one in thirteen** had a deleted last message.

## The five recurring shapes of a stalled chat

**1. The chase.** "Please let me know your feedback", "can you please let me know ?", "Most welcome ma'am, apologies for the delay". The advisor is asking for a reply that has not come, and in one case apologising for the delay in getting back.

**2. The client-side deferral.** "Give me sometime shall update", "will let you know". The lead is alive but has stalled - a colder state than silence, because the CRM still shows it as an active conversation.

**3. The dated promise.** "by monday will get the rest of the documents from the insurance company" and "Will share you the documents shortly sir still didn't get it from the insurance company". A commitment with a date on it, which becomes a promise to chase when the date passes. This is the same dependency recorded in [[Sales operations issues]] and [[Document request handling]].

**4. The channel switch.** "noted sir, i have shared you the quotation details to your email sir". The working content - the quotation - leaves WhatsApp for email, and the chat becomes a pointer. The quote then exists in two places, and the follow-up evidence lives in neither in a structured form.

**5. The resumed conversation.** "can we now discuss?" - a client re-opening after a silence. This is the message the [[WhatsApp analysis May-June 2026]] draft list was built around, and it is the clearest signal that the earlier follow-up failed.

## Deleted messages are a gap in the record
"You deleted this message" appears 5 times in the fullest export and 3 in the earlier one. Whatever was said is not recoverable from these dumps, so a chat can look like it never had a reply when the reply was removed - for a deliberate reason such as a wrong number, or a withdrawn quotation.

## Bare-number chats are an ungroomed gap
**20 of ~64 rows** in the fullest export are a phone number with no name and no CRM reference. These are conversations that exist but are not attached to a lead record: no lead ID to search, no member category, no referral tag, no CRM status. The desk can see them in the list and cannot count them in a report. The IMCRM extension's **Save Number** button exists for exactly this ([[IMCRM Data Extractor]]).

## What follows from this
- **Unread is not a status.** Ten unread chats are invisible to the CRM, because "read" is a property of the chat list, not of the lead.
- **The batch pushes the ratio up.** [[Batch intro messaging]] adds ~25 new conversations a morning; the follow-up load grows faster than the reading capacity.
- **The gap is recorded in three places, inconsistently.** The CRM status vocabulary ([[WhatsApp lead follow-up statuses]]) is separate from what the chat list shows, and the [[Process inbox]] is the manual reconciliation between them.

Related: [[WhatsApp analysis May-June 2026]], [[Batch intro messaging]], [[WhatsApp lead follow-up statuses]], [[Sales operations issues]], [[CRM hygiene]], [[Process inbox workflow]].
