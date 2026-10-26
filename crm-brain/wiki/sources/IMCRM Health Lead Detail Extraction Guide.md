---
type: source
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/context/crm-health-lead-detail.md"]
updated: 2026-10-22
tags: [imcrm, crm, browser, extraction, reference]
privacy: "Example lead values in the source are omitted; only field names, page structure and counts are recorded."
summary: "Reference for the IMCRM health lead detail page: 26 sections, key fields, and runnable read and write scripts."
---
# Source: IMCRM Health Lead Detail Extraction Guide

Original note: [[raw/20_AI-and-Agents/My-Shared-Brain/context/crm-health-lead-detail.md|context/crm-health-lead-detail.md]]. A complete reference for the [[IMCRM]] health-insurance lead detail page: what is on it, which fields matter, and how to read or change it from a browser session. **The example lead values in the source (names, phone numbers, emails, ID numbers) are not copied here.**

## Shape of the page
- **Route pattern:** `https://imcrm.alfred.ae/quotes/health/{REF_ID}`, where the reference id has the form `HEA-` plus eight characters.
- **Size:** roughly 8,000 pixels tall, with 26 collapsible sections, several of them lazy-loaded behind a "Load ..." button.
- **Header:** page title with a staleness badge ("Stale for X days"), action buttons (Notes, Duplicate Lead, Health List, Edit) and counters for pending callbacks, pending WhatsApp requests, a document-upload link and payment authorisation.

## Section map (26 sections)
| Group | Sections |
|---|---|
| Lead and quote | Lead meta info, Quote details, Customer profile, Member details, Additional contacts, Lead status, E-com details |
| Product and money | Available plans, Manage payments, Embedded products, Policy details, Commission schedule, Booking details |
| Communication and documents | Email status, Documents, Digital consent, FTC tracking, InstantAlfred chat logs, BOR (broker on record) |
| Activity and logs | Lead activities, Lead history, API logs, Audit logs, KYC audit logs, Health routing logs, OCR AI logs |

## Fields worth knowing
- **Lead meta info:** reference id, customer type, AML status (insurer and IM), created and last-modified dates, subteam, advisor, source URL, ecommerce flag, renewal flag, lost reason, device, insurer API and issuance status, STP flag.
- **Customer profile:** name, insured name (editable), mobile, email, nationality, date of birth, marketing opt-in, Emirates id number and expiry, visa emirate, gender, marital status, salary band, member category, private-client flag, risk category, and a KYC status badge in the corner.
- **Lead status:** a dropdown plus a notes textarea and a "Change Status" button; transaction type is read-only.
- **E-com details:** plan name, provider, payment status, authorised and paid dates, network, total price with VAT, co-pay or co-insurance, plan type.
- **Available plans:** a paginated table (the source records 437 plans at 15 per page) with provider, plan, plan type, network provider, co-pay, price and total price with VAT; some rows are tagged hidden.
- **Payments:** payment number, payment reference, collection and due dates, method, price without VAT, VAT, total, discount, collected amount, payment status and allocation status.
- **Policy details:** policy number, issuance and start date, expiry, prices with and without VAT, VAT amount, total, insurer quote number, issuance status.
- **Booking details:** booking date, line of business, insurer invoice dates, broker and insurer invoice numbers, discount, commission percentage, commission amounts with and without VAT, VAT on commission, total commission, branch.
- **Lead activities:** client name, lead status, title, follow-up date, assigned to, done flag.

## Scripts provided (read and write)
- **Read:** pull every label/value grid row at once; read one field by name; read the lead-status dropdown; read the members table; walk the paginated Available Plans table; read lead activities, payments, email status and documents.
- **Write:** set the lead status dropdown and click "Change Status"; open the Add Activity modal; open the Upload Documents modal; open the Add Manual Payment modal; open Edit mode. Each write is followed by a screenshot to confirm.
- **Technique notes:** grid rows are `div` elements with a `sm:grid-cols-2` class and are read as label/value pairs; React form fields are set by assigning `.value` and dispatching an `input` event.

## Agent tips recorded in the note
Do not screenshot for data; sections collapse by default so a count of zero does not mean empty; Available Plans is paginated; lazy-loaded logs need their button clicked first and about two seconds of waiting; after any write, screenshot to confirm.

## Status and caveats
- The page structure is described as observed at the time of writing (mid-2026) and is likely to drift as the CRM ships changes; the note gives no version stamp beyond the REF_ID format.
- The example lead in the source is a real lead record and is deliberately left out of this page.
- The reference sits in the context folder but is not linked from the domain index, so the routing map does not currently point an agent at it.

Related: [[My Shared Brain]], [[IMCRM]], [[Extract IMCRM Health Leads Workflow]], [[Page data over screenshots]], [[IMCRM Health Leads May 2026]], [[Browser harness]], [[WhatsApp Web Interface Reference Guide]], [[Gmail Reference Guide for Browser Automation]].
