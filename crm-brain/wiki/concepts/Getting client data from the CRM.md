---
type: concept
sources: ["raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/10_Work-Insurance/Crm_data_extraction.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 1.md"]
updated: 2026-10-22
tags: [crm, privacy, extraction, pii, redaction]
summary: "A privacy-safe route for pulling client data out of the CRM: extract by need, redact at the boundary, keep aggregates, and never paste raw PII into the vault."
---
# Getting client data from the CRM

Both worked CRM extractions in this folder begin by reading **everything on the lead page** - name, mobile, email, date of birth, Emirates ID, nationality, gender, marital status, salary band, the document list with file names, and for health leads the medical history. That is the raw state of the route this page describes: read the page, and you have PII.

This page is the **privacy-preserving** version of the same route.

## The rule
> Extract the fields the next step needs, redact at the boundary, and keep aggregates in the vault.

Concretely: the vault keeps **counts, categories, field names and structure**; it never keeps the values.

## What is safe to keep
| Keep | Do not keep |
|---|---|
| Section names and field lists | Field values |
| Document **categories** and counts | File names (they contain names, dates and IDs) |
| Member-category, visa-category, salary-band, emirate distributions | Individual names, mobiles, emails |
| Plan names, networks, prices, catalogue size | Lead reference IDs |
| Co-pay strings, plan types, commission percentages | Emirates ID numbers, passport copies, dates of birth |
| Status distributions and assignment splits | One lead's total price or commission |

## The redaction boundary
The extraction happens **in the browser session**; the redaction happens **before** anything is written down. The practical sequence:

1. Open the lead, read the section you need.
2. Take the **counts and categories** immediately - member count, plan count, status, visa category.
3. Take the **field names** you need for the next step, not the values.
4. If a value is genuinely needed downstream (a plan name, a price, a co-pay string), take that value only.
5. Write only what survived steps 2-4 into the note.

Two examples of the same page handled this way:
- [[Steps to get client data from IMCRM]] keeps the **catalogue** - 376 plans, the first 15 with insurer, network and price - and drops every personal field.
- [[IMCRM health detail page extraction]] keeps the **commission mechanics** - rate, VAT on commission, branch - and drops the client identity and the document file names.

## The specific traps in this data
| Trap | Where it appears |
|---|---|
| Lead IDs embedded in a URL | `imcrm.alfred.ae/quotes/health/<ref>` - a link is an identifier |
| File names that are people | `Firstname_Lastname_-_Insurer_MAF.pdf`, `Sir_Firstname_EID_.pdf` |
| Batch files that are pure PII | The three "Leads not in CRM - Details Batch" files: every row is a name, mobile, email, DOB, nationality, Emirates ID |
| Chat titles that are identifiers | WhatsApp titles carry name + `HEA-xxxxxxxx` + member category |
| A "stub" lead with a real person's data | Test rows exist in the CRM export and still contain contact details |
| Health data in a free-text field | The lead history and notes fields can carry medical history and clinical remarks |

## The one-line version
**Count things, name fields, quote plan data, drop everything else** - and if a number can only be produced by identifying someone, produce the distribution instead of the row.

Related: [[Extracting leads from the CRM]], [[IMCRM data handoff]], [[CRM hygiene]], [[Document request handling]], [[Using ICM for a CRM-driven insurance sales agent]].
