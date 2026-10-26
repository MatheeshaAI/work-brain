---
type: concept
sources: ["raw/10_Work-Insurance/Leads not in CRM.md", "raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/whatsapp_body.txt", "raw/10_Work-Insurance/Call transcriptions.md"]
updated: 2026-10-22
tags: [leads, crm, capture, gaps, whatsapp]
summary: "The four ways a lead gets lost between arriving, being messaged and being recorded: unnamed chats, missing references, missing details and unlogged calls."
---
# Lead capture gaps

Where leads are created but not properly captured. Four distinct gaps, each with a measurable size.

## 1. The unnamed chat
About **20 of ~64 rows** in the WhatsApp chat list are a phone number with no name and no lead reference ([[WhatsApp chat exports]]). The `whatsapp_body.txt` capture shows the same list rendered as bare numbers with timestamps - the contact-list view of the same inbox. These are live conversations that the CRM cannot see, count or report on. The extension's **Save Number** button exists to close this gap ([[IMCRM Data Extractor]]).

## 2. The mislabelled extract
[[Leads missing from the CRM]] is named for a gap that it does not contain: all 35 leads are also in the [[IMCR Health Leads 07-Jun-2026]] export of 68. Read as a work list, it produces a false task ("chase these 35 leads that are missing"), and it hides the real shape of the day - 68 leads, half of them quoted.

**The size of the real gap is the difference:** 68 leads in the system, and a chat list with ~20 conversations that carry no lead reference at all.

## 3. The lead with no member record
In the 35 detail blocks, one lead has **no member count**, and lead-level attributes disagree with the member-level attributes in places. A lead that cannot be segmented by visa emirate, salary band or member category cannot be quoted accurately - those three fields drive plan choice ([[Customer categories]], [[Plan price tiers]]).

## 4. The call with no record
Not one of the **five calls** in [[Call transcriptions]] carries a date, a duration, a lead reference or an outcome code. Every call ends with a promise to send something, and none of those promises is tracked. The CRM status moves to "Quoted" on the strength of a quote; nothing records that the quote was only promised, or whether it was sent.

## The intake gap in numbers
| Gap | Size | Evidence |
|---|---|---|
| Chats with no lead reference | ~20 of ~64 visible rows | WhatsApp chat exports |
| Leads in the day book | 68 | IMCR daily export |
| Of those, still at Quoted | 34 | IMCR daily export |
| Of those, in a contact-or-wait state | 22 (Followed Up + New Lead) | IMCR daily export |
| Reached Policy Booked | 1 | IMCR daily export |
| Contacts without a lead record | 20 rows, mostly phone-only | WhatsApp chat exports |
| Calls with no CRM trail | 5 of 5 | Call transcriptions |

## Why it compounds
Every gap is a place where a lead can be worked twice or not at all. The [[WhatsApp follow-up gaps]] show the same lead sitting unread in the chat list and quoted in the CRM. [[CRM hygiene]] shows two exports of one population. [[Todos]] shows the desk keeping its own third list because the first two are not enough.

Related: [[CRM hygiene]], [[Extracting leads from the CRM]], [[Lead capture gaps]] pairs with [[Lead prioritization]] and [[Lead reference IDs]], [[WhatsApp follow-up gaps]], [[Call handling routine]], [[Insurance CRM pipeline]].
