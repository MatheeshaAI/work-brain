---
type: source
sources: ["raw/10_Work-Insurance/chatlist_full.txt", "raw/10_Work-Insurance/full_chatlist.txt", "raw/10_Work-Insurance/whatsapp_body.txt", "raw/10_Work-Insurance/whatsapp_body2.txt"]
updated: 2026-10-22
tags: [whatsapp, sales, leads, export]
privacy: summarized, no client names, phone numbers or lead IDs
summary: "Four raw WhatsApp Business-on-Web exports: format, volume, date range and how the desk uses the chat list."
---
# Source: WhatsApp chat exports

Four text dumps of WhatsApp Business on Web, captured from the desk's own browser session. **Patterns and numbers only** - the dumps contain client names, phone numbers and lead IDs, and none of that is copied here.

| File | Size | Lines | What it captures |
|---|---|---|---|
| `chatlist_full.txt` | 34.6 KB | 309 | The fullest capture: search bar, the whole visible chat list with previews, then one opened chat |
| `whatsapp_body2.txt` | 28.7 KB | 233 | The same chat list, captured earlier or mid-render: 23 rows show "Loading…" instead of a preview |
| `whatsapp_body.txt` | 2.7 KB | 121 | A narrow capture: the list rendered as bare phone numbers with timestamps, plus the business profile panel |
| `full_chatlist.txt` | 2.1 KB | 64 | One opened chat, full body, with the sidebar controls around it |

The raw files live in `raw/10_Work-Insurance/`. The screenshot folder `raw/10_Work-Insurance/images/` holds about 50 PNGs of the same interface - opening the chat list, opening a chat, the add-contact and new-chat forms, the contact panel, search by number, saving a contact - and is **not ingested**; the filenames are the only record of it here.

## The export format

A WhatsApp Business-on-Web chat list is a flat, one-item-per-line text dump. Each chat row is a **title line**, then a **timestamp**, then a **preview of the last message**, then optionally an **unread counter** and a **day marker** ("Today", "Yesterday", "Friday", "Thursday", "Wednesday"). Around the list sit the UI strings: `All / Unread / Favourites / Groups / Labels`, `Updates in Status`, `Message yourself`, `Click here to get older messages from your phone`, and the contact-panel block (`Media, links and docs`, `Starred messages`, `Disappearing messages`, `Advanced chat privacy`, `Encryption`, `About and phone number`, `Clear chat`, `Delete chat`).

**The title line is the record of who a chat is.** It carries, in one string:
- the client's name,
- the **CRM lead reference** (HEA-xxxxxxxx),
- often a **member-category label** ("Dependent child", "Employee with salary above AED 4000", "Expat (Dubai Visa)", "Investor or Partner", "Golden visa", "Newborn"),
- sometimes a **referral tag** and a topic word ("- <referrer>'s Referral", "(Renewal)", "Baby's", "Daught & Son - Pearl Plan - Dubai Insurance").

So the chat list is simultaneously the inbox, the CRM join table and the segmentation list. Counting distinct categories or referral sources in the export is the same operation as counting in [[IMCRM]].

## Volume and date range

- The chat counter reads **49** in `whatsapp_body.txt` and `whatsapp_body2.txt`, and **47** in `full_chatlist.txt` - so the account held roughly **47-49 chats** across the captures.
- `chatlist_full.txt` shows about **64 chat rows** in the visible scroll: **43 rows carry a lead reference**, **20 rows are a bare phone number** (some rows are counted in both groups because a title shows both).
- **10 rows carry an unread counter** in both `chatlist_full.txt` and `whatsapp_body2.txt`.
- The day markers run **Today → Yesterday → Friday → Thursday → Wednesday**, so a single export spans about **five days** of activity.
- The exports sit alongside the [[IMCR Health Leads 07-Jun-2026]] CRM batch, whose leads are created 31 May to 7 June 2026. The intro burst in the list is timestamped **08:38 to 09:10** on the export day, which is the same morning as the CRM batch. The window is therefore **early June 2026**, with the oldest visible chat around **Wednesday of that week**.
- `full_chatlist.txt` carries one dated entry of ambiguous format (`04/03/2026`) alongside a "Within 2 weeks" note; the date could be read as 4 March or 3 April 2026. It is not reconciled with anything else in the vault, so treat it as unverified.

## Conversation types in the export

| Type | Count (chatlist_full) | Shape |
|---|---|---|
| Lead conversation with a CRM reference | 43 rows | Intro message, then quotes, links or replies |
| Bare phone-number chat | 20 rows | A chat with no saved name - the "save this number" workflow |
| Colleague / internal | several | Staff of the broker, and the ops team asking for documents |
| Insurer contact | 3-4 named | Health insurers and underwriters, one of them a group chat for health underwriting/operations |
| Business-account rows | 1-2 | The business profile and the "message yourself" row |

Referral tags appear in the titles of about **5 chats**, referring to **2 distinct referrers** in this export; the business account also carries a referral **label** in `whatsapp_body.txt`, making **3 distinct referral sources** visible across the four dumps. Names are left out; see [[Referral sources]].

## How the team works with the exports

1. **Search by lead reference.** The search field holds recent searches that are mostly phone numbers and one lead reference; the desk navigates by lead ID.
2. **Open the chat from the list, then work from the title.** The title carries the member category, so the advisor knows what is being quoted before reading a message.
3. **Label and note.** The contact panel offers "add notes about your customer" and a labels list; referral labels are attached to referral chats so the source is visible in the list.
4. **Quote from inside the chat.** The payment links in the exports are `insurancemarket.ae/health-insurance/quote/<ref>/payment/...` with a provider code, plan id and co-pay id - the chat is where a quote is handed over.
5. **Save unknown numbers.** A chat that exists only as a phone number is a lead that has no CRM reference in the title. This is exactly what the IMCRM extension's **Save Number** button addresses ([[IMCRM Data Extractor]]), and the `images/` screenshots of the new-chat and add-contact forms are the manual version of the same job.

## Caveats
- **The exports are partial and of different moments.** `whatsapp_body2.txt` has 23 "Loading…" rows with no preview; `whatsapp_body.txt` shows the list without names. They are not one clean dataset and should not be added together as counts.
- **Deleted messages.** "You deleted this message" appears **5 times** in `chatlist_full.txt` and **3 times** in `whatsapp_body2.txt`, so the previews are not a complete record of what was sent.
- **Timestamps are relative** ("Today", "Friday") and only time-of-day is shown for recent chats, so a precise response time cannot be computed from these files alone.
- **Older messages are not exported** - the UI says so explicitly ("Click here to get older messages from your phone"). The oldest content in each row is only the last message.
- The dumps include the broker's own business profile (company address, email, website, business number). Those are not reproduced here.

Related: [[WhatsApp follow-up gaps]], [[Batch intro messaging]], [[Quote request handling]], [[Document request handling]], [[Standard intro message]], [[WhatsApp lead follow-up statuses]], [[IMCRM]], [[IMCRM Data Extractor]].
