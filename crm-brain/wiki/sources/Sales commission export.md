---
type: source
sources: ["raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv", "raw/10_Work-Insurance/commision issue march.pdf", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_26-Mar-2026 14_55_15.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_30-Mar-2026 08_42_25.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_30-Mar-2026 08_42_25 (1).csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_06-Apr-2026 14_45_43.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_10-Apr-2026 12_45_12.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_14-Apr-2026 17_32_55.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_16-Apr-2026 12_02_45.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_17-Apr-2026 11_27_44.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_23-Apr-2026 14_26_31.csv", "raw/Health-Insurance/Workspace/Sales Reports/Matheesha Sarathchandra_24-Apr-2026 15_16_11.csv"]
updated: 2026-10-22
tags: [commission, export, csv, reporting, sales]
privacy: aggregate only - no client names, policy numbers or payment amounts per row
summary: "The commission export family: a 32-row March file plus ten dated exports in the workspace (84 rows, 74 unique) with the same 18 columns, six insurers, a 15% modal commission rate and the same broken date and currency fields."
---
# Source: Sales commission export

A CSV export of the salesperson's commission and policy book, dated in the filename **09-Mar-2026**. The companion PDF `commision issue march.pdf` sits alongside it and is **referenced by filename only** - it is not ingested.

The same export exists in the workspace ten more times, one per reporting run. That family is documented in full in the section **Ten more exports of the same report** below.

## The file

`Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv` - **32 data rows, 18 columns**.

| Column | Notes |
|---|---|
| Policy | Policy number |
| Installment | Blank on all 32 rows |
| Period begin | Policy period start |
| Due date | |
| Sum | |
| Currency | Blank on all 32 rows |
| Discount | |
| Customer payable | |
| Tax amount | |
| Comm. (%) | Commission percentage |
| Commission | |
| Date paid | 23 rows carry a date |
| Paid | 10 rows are `-`; the rest are **amounts**, not flags |
| Unpaid | 31 rows are `-`, 1 row is `0` |
| Insurer | See distribution below |
| Object | Health Insurance 28, Business Insurance 4 |
| Customer | Client name - **not reproduced** |
| Sales person | One value across all 32 rows |

## Distributions

**Insurer**
| Insurer | Policies |
|---|---|
| Takaful Emarat Insurance | 22 |
| Dubai Insurance | 5 |
| HAYAH Insurance | 3 |
| Qatar Insurance Company | 1 |
| Abu Dhabi National Takaful | 1 |

**Line of business:** Health Insurance 28, Business Insurance 4 - 88% health.
**Sales person:** a single value on all 32 rows.

## Data quality
| Issue | Extent |
|---|---|
| `Period begin` is the epoch placeholder `1970-01-01` | 20 of 32 rows |
| `Date paid` is `1970-01-01` | 23 of 32 rows |
| `Date paid` is an impossible year (e.g. `3648-03-09`, `8912-03-09`) | 9 rows |
| `Currency` empty | 32 of 32 |
| `Installment` empty | 32 of 32 |
| `Paid` holds a sum instead of a yes/no | 22 rows (the other 10 are `-`) |
| `Unpaid` holds `0` instead of a dash | 1 row |

## What the numbers say
- **The export is a book of business, not a settlement file.** It tracks policies, periods, premiums, tax and commission per row; the fields that would make it a settlement file - currency, installment plan, and a clean paid/unpaid flag - are broken or empty in every row.
- **The book is concentrated.** 22 of 32 policies with one insurer is a 69% concentration; adding Dubai Insurance and HAYAH brings it to 94% across three insurers. The two tail insurers are one policy each.
- **Timestamps are unreliable.** Two thirds of the period-start and paid-date values are epoch placeholders, which is what an unformatted export does when a date is blank or zero. Any ageing or "renewals due" calculation run on this file would be wrong.
- **`Paid` as an amount is workable, `Paid` as a flag is not.** Since the non-dash values are sums, the paid state has to be derived from a non-empty cell - a small but necessary rule before this file can feed a report.
- **The commission rate sits in `Comm. (%)`** and the CRM-side equivalent is the booking-details commission field seen in [[IMCRM health detail page extraction]] (13.91% on that policy). Two independent sources of the same fact, which is what makes [[Commission and premium reporting]] possible - and also what makes a mismatch check worth having.

## Ten more exports of the same report
`raw/Health-Insurance/Workspace/Sales Reports/` holds **ten further CSVs** of the identical 18-column report, exported on 26 March and then 6, 10, 14, 16, 17, 23 and 24 April 2026. Together with the 09-March file they are the commission book's rolling history.

| Export date | Data rows |
|---|---|
| 26-Mar | 8 |
| 30-Mar | 10 |
| 30-Mar **(1)** | 10 |
| 06-Apr | 13 |
| 10-Apr | 4 |
| 14-Apr | 4 |
| 16-Apr | 6 |
| 17-Apr | 9 |
| 23-Apr | 10 |
| 24-Apr | 10 |
| **Total** | **84** (74 unique) |

**The 30-March pair is byte-identical** - same SHA-256 hash - so it is a re-download saved twice, and **10 of the 84 rows are duplicates.** Every count below therefore has to state which it is.

### Insurers across the ten files
| Insurer | Rows |
|---|---|
| Takaful Emarat Insurance | 60 |
| Abu Dhabi National Takaful | 8 |
| Orient Insurance | 6 |
| Dubai Insurance | 4 |
| Cigna Insurance | 3 |
| Qatar Insurance Company | 3 |

**Line of business:** Health Insurance 59, Business Insurance 1, **blank 24**. The blank column is the same export defect as the March file - 29% of rows have no line of business at all.

### The commission rate is the interesting column
`Comm. (%)` on these rows is not a single rate: **15% on 23 rows**, 14% on 6, 3% on 4, and then a long tail of near-15 fractional rates - 13.97, 14.83, 14.85, 14.89, 14.92, 14.94, 14.95, 15.71, 16, 17, 17.50 - alongside 9 rows at 0.00, 3 at 0, and a handful of low rates (0.08, 2.99, 4.60, 6.04, 7.39, 7, 9.86) and 10 rows with a dash.

The near-15 cluster is the tell: these look like **rates computed from a fixed commission amount divided by a premium**, not rates typed in by hand. A broker's rate that lands on 14.83 / 14.89 / 14.95 is a number derived after the fact, and a derived rate means **the commission rate cannot be used to verify anything** - it is an output, not an input. The 15% and 14% rows are the ones that were entered.

### The same defects, unchanged
| Defect | Extent across the ten files |
|---|---|
| `Currency` empty | 84 of 84 rows |
| `Installment` empty | 84 of 84 |
| `Period begin` = `1970-01-01` | 38 rows |
| `Date paid` with an impossible year | 15 rows |
| `Paid` holding an amount rather than a flag | 65 rows |

**Six weeks of exports, and the export does not improve.** The March file and the April files have the same empty currency column, the same epoch dates and the same amount-in-a-flag column. This is what [[CRM hygiene]] looks like at the reporting layer, and it is why [[Commission and premium reporting]] has to reconcile against the CRM rather than trust the export. See also [[Sales reporting]].

## How it connects
- **The commission number in the CRM** comes from the insurer invoice; the number in this CSV comes from the broker's own book. They are produced by different systems, so [[Commission and premium reporting]] records the reconciliation gap.
- **The `Sales person` column with a single value** is the same shape as the commissions in [[IMCRM health detail page extraction]]: one salesperson, commission split by branch.
- **Policy-period dates here** overlap the policy records on IMCRM, which is what lets a renewal be predicted - the subject of one call in [[Call transcriptions]].

## Related
- [[Commission and premium reporting]]
- [[Sales operations issues]]
- [[IMCRM health detail page extraction]]
- [[CRM hygiene]]
- [[Tasks and analytics]]
- [[Insurance CRM pipeline]]
- [[Sales reporting]]
- [[Plan catalogue raw exports]]
- [[April 2026 leads report]]
- [[Takaful Emarat]]
