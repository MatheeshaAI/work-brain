---
type: concept
sources: ["raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv", "raw/10_Work-Insurance/Crm_data_extraction.md", "raw/10_Work-Insurance/IMCR Health Leads - 07-Jun-2026.md"]
updated: 2026-10-22
tags: [commission, reporting, data-quality, sales]
summary: "How commission and premium reporting is currently assembled, and the field-level defects that make the numbers unreliable."
---
# Commission and premium reporting

Commission and premium reporting is assembled from **two independent sources** - the CRM booking record and a CSV book of business - and the two are never reconciled. This page records the sources, the numbers they hold, and what has to be fixed before a report can be trusted.

## The two sources

**CRM booking details** (one policy): commission **13.91%**, VAT on commission **25.59**, commission **511.74**, **total commission 537.33**, branch Dubai & Northern Emirates, with insurer invoice number, insurer commission invoice number, booking date and line of business. See [[IMCRM health detail page extraction]].

**CSV book of business**: 32 rows, 18 columns, with `Comm. (%)`, `Commission`, `Sum`, `Tax amount`, `Customer payable`, `Period begin`, `Due date`, `Date paid`, `Paid`, `Unpaid`. See [[Sales commission export]].

## The book, in numbers
| Measure | Value |
|---|---|
| Policies | 32 |
| Health / Business | 28 / 4 |
| Takaful Emarat Insurance | 22 |
| Dubai Insurance | 5 |
| HAYAH Insurance | 3 |
| Qatar Insurance Company | 1 |
| Abu Dhabi National Takaful | 1 |
| Distinct salespeople | 1 |

**Concentration:** 69% of policies with one insurer, 94% with three.

## The fields that break a report
| Field | Defect | Consequence |
|---|---|---|
| `Period begin` | `1970-01-01` on 20 of 32 rows | Any ageing, renewal-due or cohort calculation is wrong |
| `Date paid` | `1970-01-01` on 23 rows, impossible years (e.g. `8912-03-09`) on 9 rows | Payment timing cannot be computed |
| `Currency` | Empty on all 32 rows | Amounts have no currency attached - assume AED, but it is an assumption |
| `Installment` | Empty on all 32 rows | No instalment schedule can be derived |
| `Paid` | Holds a **sum** on 22 rows and `-` on 10 | The paid flag has to be derived as "non-empty", not read as a boolean |
| `Unpaid` | `-` on 31 rows, `0` on 1 | Same issue, smaller scale |

## The rules a report needs
1. **Derive the paid flag** from a non-empty `Paid` cell, never from the column's literal value.
2. **Treat any date in or before 1970 as missing**, and re-derive period starts from the policy or invoice date instead.
3. **Stamp AED explicitly** wherever an amount appears, because the currency column is empty.
4. **Split commission by source**: the CRM's own figure is the insurer's statement of commission; the CSV's is the broker's book. Report both, and flag the difference rather than picking one.
5. **Group by insurer and line of business** first - the concentration is the interesting fact, and it survives the broken dates.

## The reporting side of the tiered scheme (2026-10-22 ingest)
The Life OS career area holds the other half of the commission story, and the two fit together. **[[Commission structure]]** is the scheme the reporting has to feed: base AED 8,000, a AED 2,000 guaranteed floor, and six tier bands from 5% to 25% applied to the month's **IM Revenue**. **[[Commission calculation]]** is the method that turns a statement into a salary figure.

Three points where the reporting problem and the scheme meet:
- **The tier makes duplicate entries expensive.** A credit booked twice inflates the month's IM Revenue and can push it into a **higher band**, so a data defect can change the payout and not just the report. This is the risk in the duplicate-credit case tracked in [[Commission clarification queries]].
- **Group business enters the blend at 2-7%** against 14-15% for individual and family plans, so the band moves on the *mix* of the book, not the number of policies. A report grouped by policy count will not predict the band; group by insurer and line of business.
- **The reporting rules above are the input side of the audit.** The reconciliation work - cross-check each month's expected salary against the salary actually received - is the same test as in [[Salary follow-up]], and it is the check that would have caught the missing AED 2,000 MGI.

## The pipeline context
A commission report is the natural end of the [[Insurance CRM pipeline]] and the natural input to [[Tasks and analytics]]. The book's broken fields mean the CRM is currently the more reliable of the two sources for anything policy-level, and the CSV is the more useful for anything book-level (how many policies, with whom, in which line of business).

Related: [[Sales commission export]], [[IMCRM health detail page extraction]], [[CRM hygiene]], [[Tasks and analytics]], [[Insurance CRM pipeline]], [[Sales operations issues]], [[Commission structure]], [[Commission calculation]], [[Commission clarification queries]], [[Salary follow-up]], [[Insurancemarket.ae]].

## Cross-vault note

Citation(s) moved out during the 2026-10-25 vault split; the source files live in the sibling vault (Brain-Personal):

- `Life_OS/02_Career/My_Work/Commissions/Commission_Structure.md`
- `Life_OS/02_Career/My_Work/Commissions/Commission_Calculation.md`
- `Life_OS/Commission_Clarification_Queries.md`
