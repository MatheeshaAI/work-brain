---
name: motor-booking-email
description: Draft the "Motor Policy Issuance – Booking Email" that Matheesha sends to the Policy Admin (PA) team once a motor insurance lead's documents are uploaded and payment is confirmed. Use this whenever Matheesha asks for a "booking email", "PA email", "policy issuance email", says "book this policy" / "issue this policy", or pastes raw lead data from the Alfred CRM (imcrm.alfred.ae) car insurance lead page — fields like FIRST NAME, ORDER REFERENCE, PROVIDER NAME, PLAN NAME, PRICE, chassis number, starting date — and wants it turned into the booking email. Also trigger if he has a CAR-XXXXXXX lead open and just says something like "booking email please" or "draft the PA email for this one" with no other context, since the pasted data or the open CRM lead is the input. Output is short, copy-paste-ready plain text, not a document or markdown report.
---

# Motor Policy Issuance – Booking Email

Matheesha is an insurance advisor at InsuranceMarket.ae (Dubai). Once a motor lead's documents are uploaded and payment is confirmed in Alfred CRM, he sends a short email to the Policy Admin (PA) team asking them to issue and book the policy. This skill turns whatever lead data he gives you — a raw CRM paste, a pasted "Plan details" block, or a lead he's just looked up via the alfred-crm skill — into that email, filled in and ready to paste, with zero extra commentary.

This is an operational task. Per Matheesha's standing preferences, the output is the email itself — short, copy-paste ready, no headers or bullet commentary wrapped around it beyond the template's own bullets, and no "here's your email" preamble. Default to action: fill in what you can, flag what's missing or looks wrong in one line after the email, and don't stop to ask a clarifying question the way you might for a more open-ended task.

## The template

Fill this exactly — field labels, bullet formatting, and structure stay fixed. Only the bracketed values change.

```
Subject: [Client Name] - [CAR-XXXXXXX] - Motor Policy Issuance

Dear Team,

Good [Morning/Afternoon]!

Please note that we have uploaded all the documents and the payment is done. Kindly issue the policy and book the policy.

- Insurer - [Insurer Name]
- Starting Date - [DD/MM/YYYY]
- Quotation No - [Quotation Number]
- Chassis - [Chassis Number]
- Amount - [Amount] AED
- IMCRM Link - [https://imcrm.alfred.ae/quotes/car/XXXXXXXX]

Thanks & Regards,
```

See `references/examples.md` for a full worked example against a raw CRM paste, plus a second filled example — use these to sanity-check your field mapping before sending.

## Filling in each field

**Client Name** — Use INSURED FIRST NAME + INSURED LAST NAME if present (that's the name on the policy). Fall back to FIRST NAME + LAST NAME if the insured fields are blank or absent.

**CAR-XXXXXXX** — This is the order reference / ref-ID, e.g. `CAR-SZH3CTGH`. It usually appears labeled ORDER REFERENCE, REF-ID, or as part of the PAYMENT REFERENCE. Use it as-is (with the `CAR-` prefix) in the subject line.

**Good Morning / Good Afternoon** — Base this on the current time in Asia/Dubai (Matheesha's timezone): before 12:00 → "Good Morning", 12:00 or later → "Good Afternoon". If you don't have a reliable clock reading, "Good Afternoon" is the safer default since most of these get sent later in the day, but prefer checking the actual time when you can.

**Insurer** — The PROVIDER NAME field, e.g. "GIG INSURANCE (GULF) BSC(C)". Write it in normal case rather than shouting caps if the source data is all-caps (e.g. "GIG Insurance (Gulf) BSC(C)") — match the style used in `references/examples.md`.

**Starting Date** — Format as DD/MM/YYYY. This is the policy's own starting date, which is a separate field from CREATED DATE or AUTHORISED AT — don't confuse them.

**Quotation No** — This comes from the plan/quote details block Matheesha pastes separately (often a row like `GIG Gulf (AXA) - Third Party Only  TPL  Q26UAERTB615945  ...`), NOT from the ORDER REFERENCE or PAYMENT REFERENCE. It's typically a longer alphanumeric code distinct from the CAR- ref. If Matheesha only gives you the CRM lead export without a separate plan/quote line, flag that the quotation number is missing rather than guessing it from the order reference — they are different identifiers and mixing them up causes real issues for the PA team.

**Chassis** — The CHASSIS NUMBER field, used as-is.

**Amount** — The final PRICE (the total the customer paid/was authorised for), not the insurer net premium if multiple amounts are given in a plan breakdown — use the last/total figure in that row. Append " AED".

**IMCRM Link** — Build as `https://imcrm.alfred.ae/quotes/car/{REF}` where `{REF}` is the CAR ref code *without* the `CAR-` prefix, e.g. `CAR-SZH3CTGH` → `https://imcrm.alfred.ae/quotes/car/SZH3CTGH`.

## Handling missing or off-looking data

Don't block on missing fields — fill in everything you can determine and leave a clearly bracketed placeholder like `[Quotation No missing]` for anything you genuinely can't find, so it's obvious in a quick scan before sending. After the email, add one short line (not a list, not a section) flagging what's missing or worth double-checking — for example, a starting date that falls before the lead's CREATED DATE, or a quotation number you couldn't locate. Keep this to a sentence or two; this isn't a report, just a heads-up before he hits send.

## Output format

Reply with the filled template as plain text, ready to copy straight into an email client — no markdown headers, no "Here's your email:" preamble, no extra bullets beyond the template's own five. If there's a flag to raise, put it as one short line after the email, separated by a blank line.
