---
type: source
sources: ["raw/10_Work-Insurance/Crm_data_extraction.md"]
updated: 2026-10-22
tags: [insurance, imcrm, crm-extraction, lead-data, dubaicare]
---

# CRM Data Extraction — Sample Lead Record

> **Privacy:** This file contains a complete client record from [[IMCRM]]. Details below are summarised at the structural level; the original source holds the personal data.

A demonstration extraction of a fully booked health insurance lead from the [[IMCRM]] system. Shows every section the browser extension can extract from a lead's health detail page. Useful as a reference for the structure of the extraction output format. The lead was booked under [[Dubai Care]] N4 via [[Dubai Insurance]].

## Record Structure (Pattern, Not Client Data)

The extracted record covers these sections in order:

| Section | What It Contains |
|---------|-----------------|
| **Customer Profile** | Name, mobile, email, nationality, DOB, Emirates ID, visa emirate, gender, marital status, salary band, member category, risk category, KYC status |
| **Member Details** | One row per insured member with gender, DOB, nationality, visa emirate |
| **Lead Status** | Current status (e.g., "Policy Booked"), transaction type |
| **E-COM Details** | Plan name, provider, payment status, paid-at datetime, total price (with VAT), co-pay terms, plan type |
| **Available Plans** | Total plan count (376 in this example), paginated 15/page |
| **Manage Payments** | Payment Ref ID, collection date, due date, payment method, price excl. VAT, VAT amount, total, allocation status |
| **Policy Details** | Policy number, issuance date, start date, expiry date, price, VAT, insurer quote number, issuance status |
| **Documents** | 16 document types: risk score, receipts, KYC, e-card, tax invoices, signed MAF, policy schedule, visa, policy wordings, certificate, passport, Emirates ID |
| **Booking Details** | Booking date, invoice description, line of business, payment status, insurer invoice dates, commission %, VAT on commission, total commission, branch |
| **Lead History** | Timestamped status change log (typically 4–6 entries) |
| **Other Sections** | Embedded products, email status, BOR, digital consent, lead activities, InstantAlfred chat logs, FTC tracking, audit logs, KYC audit logs |

## Key Metrics from Example Record

- **Plan booked:** [[Dubai Care]] N4 (Entry Level, [[Dubai Insurance]])
- **Commission rate:** ~13.91% of premium (without VAT)
- **Plan co-pay structure:** 20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines
- **Documents uploaded:** 16 files (policy docs, ID copies, tax invoices, e-card)
- **Lead lifecycle:** ~6 hours from start to policy booking on the same day

## Relevance

- Shows the complete data model the [[IMCRM Data Extractor]] extension captures
- Useful when designing the [[OpenClaw Henry agent workspace]] CRM agent's data ingestion flow
- Commission calculation observable: commission invoice number pattern is `CNMUW-XXXXXX`, insurer invoice is `DNMUW-XXXXXX`

## Related Pages

- [[IMCRM Data Extractor handoff]] — extension that produced this output
- [[Steps to get client data from IMCRM]] — step-by-step extraction workflow
- [[Dubai Care]] — the TPA network used for this plan
- [[Dubai Insurance]] — the insurer
- [[IMCRM]] — the CRM system
