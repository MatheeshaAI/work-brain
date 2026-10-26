---
type: source
sources: ["raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md"]
updated: 2026-10-22
tags: [crm, leads, health-insurance, icm, pipeline]
privacy: summarized, no client names, phone numbers or lead IDs
summary: "The 07-Jun-2026 IMCRM health-lead export: 68 leads, their status, assignment and visa category."
---
# Source: IMCR Health Leads 07-Jun-2026

One markdown export of every health lead on the IMCRM system on a single morning. **Distributions only** - the file itself lists names and reference IDs.

## The export

Title: `IMCR Health Leads - All Pages`. Date **07-Jun-2026**. Total **68 leads**. Same eight columns as every other CRM dump in this folder: **# / Ref ID / URL Link / Name / Lead Status / Assignment Type / Created Date / Visa Category**, with each row linking to `imcrm.alfred.ae/quotes/health/<ref>`.

All 68 reference IDs are distinct. Created timestamps run from **31-May-2026 01:21** to **07-Jun-2026 03:14** - so the export covers roughly the last week of lead creation, and the creation order runs backwards down the table (newest first).

## Distributions

**Lead Status**
| Status | Count | Share |
|---|---|---|
| Quoted | 34 | 50% |
| Followed Up | 19 | 28% |
| Application Pending | 6 | 9% |
| Lost | 4 | 6% |
| New Lead | 3 | 4% |
| In Negotiation | 1 | 1% |
| Policy Booked | 1 | 1% |

**Assignment Type**
| Type | Count |
|---|---|
| System Assigned | 53 |
| System Reassigned | 10 |
| Self Assigned | 5 |

**Visa Category**
| Category | Count | Share |
|---|---|---|
| Sponsored (Employer or Family) | 50 | 74% |
| N/A | 9 | 13% |
| Investor / Partner | 5 | 7% |
| Golden Visa | 4 | 6% |

## What the numbers say
- **Half the book is one stage deep.** 34 of 68 leads are sitting at Quoted and nothing later. Only **one** lead has reached Policy Booked and **one** is In Negotiation. The pipeline is a funnel with a very wide top and a pinched bottom.
- **19 Followed Up and 3 New Lead** means 22 leads (32%) are in the contact-and-wait stage - exactly the state the [[WhatsApp follow-up gaps]] measures on the chat side.
- **Almost three quarters are sponsored employees or family members**, so employer-linked pricing and the employee's salary band drive most quotes ([[Customer categories]]). Golden Visa and Investor leads - the ones the sales calls treat as renewal-sensitive - are only 13% combined.
- **Assignment is mostly automatic** (53 system-assigned). 10 reassignments against 68 leads is a ~15% churn rate, which usually means a lead did not respond and was routed to someone else.
- **One row is a test record** (a placeholder name), so the usable lead count is 67.

## Relationship to the other exports
- **The 35-lead file is a subset of this one.** [[Leads missing from the CRM]] contains the first 35 rows of this table, with identical reference IDs, statuses, assignment types, created dates and visa categories. Its title is therefore misleading - nothing in it is absent from the CRM. This is the main contradiction found in this ingestion.
- **The 35 leads with full detail** are the ones whose member blocks were also exported; see [[Leads missing from the CRM]] for the member-level aggregates.
- **The chat list on the same morning** shows the same population being contacted - about two dozen intros between 08:38 and 09:10 ([[Batch intro messaging]]). The 68-lead book and the ~25 intros are the same cohort seen from two sides.

Related: [[IMCRM]], [[Leads missing from the CRM]], [[WhatsApp lead follow-up statuses]], [[CRM hygiene]], [[Lead capture gaps]], [[Customer categories]], [[Using ICM for a CRM-driven insurance sales agent]], [[Daily sales audit]].
