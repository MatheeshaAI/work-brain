---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/Referral Leads", "raw/Health-Insurance/Workspace/Leads/Referral Leads/Referral-Leads.md", "raw/Health-Insurance/Workspace/Leads/Referral Leads/Referral_Leads_Tracker.md"]
updated: 2026-10-22
tags: [insurance, referrals, leads, aggregate, client-data]
summary: "The referral leads folder: an index plus a small tracker of unnamed referred prospects waiting for CRM entry, with the conversion process it defines."
---
# Referral leads folder

Aggregate of `"raw/Health-Insurance/Workspace/Leads/Referral Leads"`. Two files: `Referral-Leads.md` (index, one link) and `Referral_Leads_Tracker.md`. The tracker holds phone numbers of prospects, which are not copied here.

## What the tracker is
A holding table for referred prospects not yet in [[IMCRM]]. Columns: phone, referrer, status, date added, notes. A second section ("Lead Details (as received)") repeats each prospect with referrer, a type (medical or health) and the status "awaiting name and details".

## Numbers
| Measure | Value |
|---|---|
| Referral entries | 3 |
| Distinct referrers | 1 (a single named referrer; one source only) |
| Status | Message Sent 3, awaiting response 3 |
| Date added | all three on 20 May 2026 |
| Names, emails, nationality, family size | none yet |

## Defined conversion process (design intent, not measured)
1. Referral replies; collect full details (name, customer type, family, email).
2. Enter in IMCRM, which generates a REF_ID ([[Lead reference IDs]]).
3. Create a lead markdown file in the main leads folder and a documents folder.
4. Move to the main pipeline ([[Lead pipeline stages]]).
5. Remove from tracker or mark Converted.

## Observations
- It is the only place referral leads are held before they exist in the CRM; the individual lead files mostly have no source, and only one carries a referral source ([[Individual health insurance leads folder]]).
- The sole referrer here is one of the sources described in [[Referral sources]]; counts there (7 named referrers in the WhatsApp analysis) are far higher, so this tracker covers a fraction of referral flow.
- Same "Message Sent" step as the intro batch in [[Batch intro messaging]].

Data quality: no ID, no follow-up date column, no converted entries logged, and a mismatch between "Medical" and "Health" type labels.

Related: [[Workspace Leads folder overview]], [[Leads missing from the CRM]].
