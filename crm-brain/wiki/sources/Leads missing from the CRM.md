---
type: source
sources: ["raw/10_Work-Insurance/Leads not in CRM.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 1.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 2.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 3.md", "raw/10_Work-Insurance/"]
updated: 2026-10-22
tags: [crm, leads, health-insurance, icm]
privacy: summarized, no client names, phone numbers, emails, dates of birth or lead IDs in the body or the source list - the fifth source is a single-lead conversation file whose name carries a client name and lead ID, so it is cited at folder level only
summary: "A 07-Jun-2026 CRM export of 35 leads with full member detail, and the worked single-lead conversation that came with it."
---
# Source: Leads missing from the CRM

Five files, one export: a summary table of **35 leads**, three detail batches covering the same 35, and one worked conversation. **Counts, categories and status distributions only** - the detail files contain names, mobiles, emails, dates of birth and passport details, and none of that is reproduced here.

| File | Covers |
|---|---|
| `Leads not in CRM.md` | Summary table: 35 leads, 8 columns |
| `Leads not in CRM - Details Batch 1.md` | Leads 1-10, full detail |
| `Leads not in CRM - Details Batch 2.md` | Leads 11-20, full detail |
| `Leads not in CRM - Details Batch 3.md` | Leads 21-35, full detail |
| A single-lead transcript file (its name carries a client name and a lead ID) | A worked conversation, referenced below by filename only |

## Summary table structure

Columns: **# / Ref ID / URL Link / Name / Lead Status / Assignment Type / Created Date / Visa Category**. Each row links to `imcrm.alfred.ae/quotes/health/<ref>`. The export is dated **07-Jun-2026** and the created timestamps run from **31-May-2026 01:21** to **07-Jun-2026 03:14**.

**Lead Status:** Quoted 27, Application Pending 4, New Lead 2, Followed Up 2.
**Assignment Type:** System Assigned 29, System Reassigned 4, Self Assigned 2.
**Visa Category:** Sponsored (Employer or Family) 23, N/A 7, Investor / Partner 4, Golden Visa 1.

## Detail blocks

Each of the 35 blocks has two parts.

**Lead Details:** Ref-ID, Created Date (to the second), Name, Mobile, Email, Nationality, Date of Birth, Emirate of Visa, Gender, Member Category.

**Member Details:** Number of Members, then a block per member with Member Name (plus the role in brackets - Policyholder, Principal, Dependent), Relationship, Gender, Date of Birth, Nationality, Emirates of Visa, Member Category, Visa Category, Marital Status, Salary.

This is the full CRM record for a health lead, and it is **PII by design**: identity, contact, nationality, birth date and location. It is the reason the CRM extraction route in [[Getting client data from the CRM]] needs a redaction step.

### Aggregates across the 35 blocks
| Measure | Value |
|---|---|
| Leads | 35 |
| Total members | 39 |
| Members per lead: 1 / 2 / 3 / 0 | 30 / 3 / 1 / 1 |
| Lead member category | Expat (Dubai Visa) 26, Expat (Non-Dubai Visa) 7, Newborn 1, not filled 1 |
| Emirate of visa | Dubai 27, Sharjah 3, Ajman 2, Ras Al Khaimah 1, Fujairah 1, not filled 1 |
| Member visa category | Sponsored 32, Investor / Partner 3, Golden Visa 1, Newborn 1, domestic-worker categories 2 |
| Salary | No salary (dependents/children) 17, AED 4,001-12,000 12, ≤ AED 4,000 7, > AED 12,000 3 |

Two relationship fields in the detail blocks hold a stray `Gender: Male` value instead of a relationship - a parsing artefact of the extraction, not a real category. No relationship statistics are published here.

### What the aggregates say
- **Family cover is the exception, not the rule.** 30 of 35 leads insure a single person. This matches the [[WhatsApp chat exports]], where most intros are written for "yourself".
- **Salary banding is decisive for price.** 17 members have no salary because they are children or dependents; the remaining 18 split into three bands, and those bands are exactly what [[Plan price tiers]] and [[Call handling routine]] use to pick a plan ([[Customer categories]]).
- **Non-Dubai residency is small but real** - 7 leads, and 8 members living in Sharjah, Ajman, Ras Al Khaimah and Fujairah. Network choice matters more outside Dubai.
- **The lead field and the member field disagree in places** - a lead can carry a member category that does not match its members' categories (one lead has no member count at all). The lead-level attribute is what the CRM filters on, so it can mis-segment.

## The single-lead transcript

The fifth file is one worked conversation, in the style of the other client transcripts. It shows a customer weighing a **low budget** against **access to a specific hospital** - the same trade-off the sales calls argue. Its content is not summarised here because the conversation is about one identified person, and the file's own name carries that person's name and their lead reference. **The file name is a privacy leak worth fixing at source** - a client name plus a live lead ID sits in the raw folder, where it can be picked up by any glob, export or search.

## Contradiction to note
Every one of these 35 leads also appears in the [[IMCR Health Leads 07-Jun-2026]] daily batch of 68. The file title says "not in CRM", but the reference IDs and creation timestamps are identical to a CRM export. **The two files are the same population viewed twice** - one appears to be a filtered extract (35 of 68) rather than a set of leads missing from the system. This is recorded as a naming contradiction, not resolved here.

Related: [[IMCRM]], [[IMCR Health Leads 07-Jun-2026]], [[CRM hygiene]], [[Lead capture gaps]], [[Extracting leads from the CRM]], [[Getting client data from the CRM]], [[Customer categories]], [[Plan price tiers]], [[Using ICM for a CRM-driven insurance sales agent]].
