---
type: source
sources: ["raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/work_os system designing documents/00_ORIGINALS/steps to get the client data from imcrm.md"]
updated: 2026-10-22
tags: [imcrm, extraction, crm, plans, networks, privacy]
privacy: field structure and aggregates only - no names, mobiles, emails or dates of birth
summary: "A second worked IMCRM health-detail extraction, this time capturing the plan catalogue and the network/insurer spread behind 376 plans."
---
# Source: Steps to get client data from IMCRM

A second worked extraction from an IMCRM health-lead detail page, written as a step guide. It carries the same personal identifiers as the other example and they are **omitted here**; what is kept is the section structure, the plan catalogue sample and the network/insurer spread.

## How it is organised
The note states that the data was extracted "from the expanded dropdowns and interactive sections" of the health insurance detail page, and then splits it into sections:

| Section | Fields |
|---|---|
| **CUSTOMER PROFILE** | First name, last name, mobile, email, nationality, date of birth, Emirates ID + expiry, emirate of visa, gender, marital status, salary band, member category, private client flag, risk category, marketing opt-in, KYC status |
| **MEMBER DETAILS** | Member count plus a member table |
| **CUSTOMER ADDITIONAL CONTACTS** | Additional-contact count plus a table |
| **LEAD STATUS** | Status, transaction type, notes |
| **E-COM DETAILS** | Plan name, provider name, payment status, authorised/paid timestamps, network, total price with VAT, co-pay, plan type |
| **AVAILABLE PLANS** | The full plan catalogue, sampled page by page |
| **MANAGE PAYMENTS** | Payment rows |
| **OTHER SECTIONS** | Which panels were populated and which were collapsed |

## The plan catalogue is the valuable part
**376 plans are available** on the platform. This extraction captured the first **four pages, 60 plans**, and that sample is the most concrete catalogue view in the vault.

**Every one of the 15 plans on page 1 is an Entry Level plan**, and they are listed in ascending price order:

| # | Insurer | Plan | Network | From (AED) |
|---|---|---|---|---|
| 1 | Dubai Insurance | Dubai Care N4 | Dubai Care | 1,780 |
| 2 | Takaful Emarat Insurance | E Care Blue 1 | E Care Blue | 930 |
| 3 | Takaful Emarat Insurance | E Care Blue 2 | E Care Blue | 1,000 |
| 4 | Takaful Emarat Insurance | APN | Aafiya | 1,003 |
| 5 | Takaful Emarat Insurance | E Care Blue 3 | E Care Blue | 1,039 |
| 6 | Fidelity United | Plan F | Nextcare | 1,043 |
| 7 | Takaful Emarat Insurance | Essential | Aafiya | 1,099 |
| 8 | Dubai Insurance | Dubai Care Next N5B | Dubai Care | 1,102 |
| 9 | Abu Dhabi National Takaful | Core | NAS | 1,107 |
| 10 | Dubai Insurance | Blue 01 | Ecare | 1,122 |
| 11 | Dubai Insurance | Blue 02 | Ecare | 1,122 |
| 12 | HAYAH Insurance | Care Protect RN3 B | Nextcare | 1,152 |
| 13 | Takaful Emarat Insurance | E Care Blue 4 | E Care Blue | 1,162 |
| 14 | Takaful Emarat Insurance | Silver | Nextcare | 1,163 |
| 15 | Dubai Insurance | Dubai Care Next N5A | Dubai Care | 1,183 |

Pages 2-4 continue upward, **AED 1,184 to AED 1,782** by plan 30, and bring in the mid-tier: Orient Insurance RN3, Dubai Insurance Dubai Care Next N5, Orient Takaful PLAN5, then Mednet-network plans from Takaful Emarat, Adamjee Insurance, NLGIC and Abu Dhabi National Takaful, then Sukoon (Oman Insurance), Watania Takaful, DIC-Viyenta and Orient Insurance in the "Good" category.

**Insurers present:** Dubai Insurance, Takaful Emarat Insurance, HAYAH Insurance, Abu Dhabi National Takaful, Fidelity United, Orient Insurance, NLGIC, Watania Takaful, Adamjee Insurance, RAK Insurance, Sukoon (Oman Insurance), DIC-Viyenta - **12 in the first 60 plans**.
**Networks present:** Dubai Care, E Care Blue, Aafiya, Ecare, Nextcare, NAS, Mednet, Sukoon - **8**.

These eight network names are the same eight the vault's provider-lookup skills cover ([[Mednet]], [[NAS]], [[Nextcare]], [[Dubai Care]], [[Takaful Emarat]], [[Adamjee]]), so the catalogue and the network files are two views of one thing - see [[Network tiers]] and [[Insurance plan catalogue]].

## The panels that were populated or collapsed
| Panel | State |
|---|---|
| Embedded Products | 0 |
| Lead Activities | 0 |
| BOR (Broker on Record) | 0 |
| Email Status | No data |
| Send Update | No data |
| FTC Tracking | No data |
| Policy Details, Documents, Digital Consent, Booking Details, Lead History, InstantAlfred Chat Logs | collapsed but present |
| Audit Logs, KYC Audit Logs | available for loading |

**Two things stand out.** The lead has **16 documents** attached even though the other panels are empty - document collection is the part that is actually used. And there is an **InstantAlfred Chat Logs** panel on the page, which is the in-app messaging record - a second channel alongside the WhatsApp one in [[WhatsApp chat exports]].

## The commercial fields on this lead
The same defaults appear: plan **Dubai Care N4** from Dubai Insurance, entry level, **20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines**, total price **AED 1,919.10 with VAT** for a single-member policy - roughly half the family figure in the other extraction, which is the family/single ratio visible again ([[Customer categories]]).

## The privacy cost
The first section alone carries name, mobile, email, nationality, date of birth, Emirates ID number and expiry, gender, marital status and salary band. Any extractor that copies this page into a file copies PII - see [[Getting client data from the CRM]] and [[Extracting leads from the CRM]].

Related: [[IMCRM]], [[IMCRM Data Extractor]], [[IMCRM health detail page extraction]], [[Getting client data from the CRM]], [[Extracting leads from the CRM]], [[Insurance plan catalogue]], [[Network tiers]], [[Plan price tiers]], [[Document request handling]].

## Also stored in work_os
A copy is in `00_ORIGINALS/steps to get the client data from imcrm.md`. The daily-use version of the CRM walkthrough is [[IMCRM CRM Guide]]; the quote-extraction snippet and bookmarklet are in [[Sales Automation Notes]].
