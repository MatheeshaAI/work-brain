---
type: concept
sources: ["raw/10_Work-Insurance/whatsapp-analysis-may-june-2026.md", "raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md", "raw/10_Work-Insurance/Leads not in CRM.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 1.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 2.md", "raw/10_Work-Insurance/Leads not in CRM - Details Batch 3.md", "raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md"]
updated: 2026-10-22
tags: [insurance, leads, segmentation]
summary: "How health leads are segmented - by visa, emirate, salary band and family size - from both the WhatsApp report and the CRM counts."
---
# Customer categories

How [[WhatsApp analysis May-June 2026]] splits the health-insurance leads it counted (approximate numbers from the source):

| Category | Approx. count | Meaning |
|---|---|---|
| Expat, Dubai visa | ~12 | Dubai-based expats |
| Expat, non-Dubai visa | ~5 | Sharjah, Ajman and other emirates |
| Dependent child | ~8 | Parents asking for children |
| Dependent spouse | ~4 | Spouse coverage |
| Dependent parent | ~3 | Parent coverage |
| Employee, salary above 4K | ~5 | Employed individuals |
| Employee, salary below 4K | ~1 | Lower salary bracket |
| Investor / partner | ~5 | Investor visa holders |
| Sponsored (employer or family) | ~2 | Sponsored individuals |

## Reading it
Dubai-visa expats and dependent children are the biggest groups. Visa emirate and salary bracket matter because they decide which plans and [[Network tiers]] a customer can be offered. See [[Plan price tiers]].

## The CRM's own categories, counted exactly
The table above is the WhatsApp report's approximation. The CRM export of **07-Jun-2026** gives hard numbers on the same morning - source: [[IMCR Health Leads 07-Jun-2026]] and [[Leads missing from the CRM]].

**Visa category, all 68 health leads**
| Category | Count | Share |
|---|---|---|
| Sponsored (Employer or Family) | 50 | 74% |
| N/A | 9 | 13% |
| Investor / Partner | 5 | 7% |
| Golden Visa | 4 | 6% |

**Member category, 35 leads with full detail**
| Category | Leads |
|---|---|
| Expat (Dubai Visa) | 26 |
| Expat (Non-Dubai Visa) | 7 |
| Newborn | 1 |
| Not filled in | 1 |

**Emirate of visa, 35 leads**
| Emirate | Leads |
|---|---|
| Dubai | 27 |
| Sharjah | 3 |
| Ajman | 2 |
| Ras Al Khaimah | 1 |
| Fujairah | 1 |
| Not filled in | 1 |

**Salary band, 39 members across the 35 leads**
| Band | Members |
|---|---|
| No salary (dependents or children) | 17 |
| AED 4,001-12,000 | 12 |
| AED 4,000 or less | 7 |
| Above AED 12,000 | 3 |

**Family size:** 30 leads insure one person, 3 insure two, 1 insures three, 1 has no member count recorded. Total 39 members.

## Three things the CRM numbers add
1. **Sponsored dominates.** Nearly three quarters of the book is employer- or family-sponsored, which is why the employee's salary band is the first question in the [[Call handling routine]] and why the band table drives [[Plan price tiers]].
2. **Single-person cover is the norm.** 30 of 35 leads insure one person - and 17 of 39 members have no salary because they are children or dependents. The "family plan" prices in [[Batch intro messaging]] are the minority case, not the typical one.
3. **Non-Dubai residency is small but material.** 7 leads, across Sharjah, Ajman, Ras Al Khaimah and Fujairah. Network choice matters more outside Dubai, which is exactly what [[Network tiers]] and [[Finding a hospital in a network]] are for.

**A caution on labels.** The CRM member categories, the chat-title labels and the WhatsApp report's categories are three overlapping vocabularies, not one - the chat titles use a mix of both ("Dependent child", "Employee with salary above AED 4000", "Investor or Partner"). The lead-level attribute can also disagree with the member-level attributes on the same lead. See [[CRM hygiene]].

## Where the category fields live in the tooling (2026-10-22 ingest)
The category is carried as a **structured field**, not as prose, in two places:
- **In the lead file.** The dashboard's parser reads `Member Category` (plus `Customer Type`, `Nationality`, `Gender`, `DOB`, `Advisor`) as flat `- **Field:** value` lines, and counts members from the rows of the `## Member Details` table. A lead file written in another shape parses to "Unknown". See [[Markdown-backed lead store]].
- **In the extension's extraction.** The lead-detail extraction pulls the customer profile - reference, name, mobile, email, nationality, date of birth, emirate of visa, gender, **member category** - and the member-detail extraction pulls each family member from the member tables, filtering out non-member rows and de-duplicating, falling back to the lead's own details when no members are found. See [[IMCRM extension memory note]].

**The fallback is worth flagging.** When a quote page has no member table, the extractor uses the lead's own details as the member. That means a single-member lead can look like a member row without the page actually stating one - the same "lead-level attribute can disagree with the member-level attribute" problem this page already records for the CRM.

## Cross-source note: member categories in lead files (2026-10-22)
Member rows in [[Individual health insurance leads folder]] split as dependent child 64, employee above AED 4,000 60, dependent spouse 53, investor or partner 25, golden visa 24, employee at or below AED 4,000 15, domestic worker 9, self-employed 8, dependent parent 7. Emirate of visa: Dubai 107, Sharjah 17, Ajman 9, Ras Al Khaimah 7. Customer type is free text: about 137 individual, 24 family.
