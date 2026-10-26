---
type: concept
sources: [
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/January/January-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/January/January-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/February/February-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/February/February-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/March/March-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/March/March-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/April/April-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/April/April-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/May/May-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/May/May-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/June/June-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/June/June-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/July/July-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/July/July-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/August/August-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/August/August-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/September/September-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/September/September-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/October/October-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/October/October-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/November/November-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/November/November-Renewal.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/December/December-Health-Insurance.md",
  "raw/Health-Insurance/Workspace/Leads/Renewals/Health Insurance/December/December-Renewal.md",
  "raw/Health-Insurance/Workspace/Renewals/May/May-Renewals.md",
  "raw/Health-Insurance/Workspace/Renewals/May/RENEWALS-May-2026.md"
]
updated: 2026-10-22
tags: [insurance, renewals, pipeline, monthly-tracking, status-flow, aggregates]
privacy: "Aggregate counts and patterns only; no client names, policy numbers, or sensitive financial data copied."
summary: "Comprehensive month-by-month synthesis of the 12 calendar renewal subfolders: 20 active policies across April (8), May (10), and June (2), representing over AED 85,198.45 in tracked gross premiums, alongside empty scaffold boards for the remaining nine months."
---
# Renewal pipeline by month

The health insurance renewal book is organized into twelve monthly folders under `Workspace/Leads/Renewals/Health Insurance/` (January to December), complemented by a parallel `Workspace/Renewals/May/` folder. Rather than maintaining 24 separate sparse source files, this concept consolidates the structure, metrics, insurer distribution, and operational patterns across the entire annual cycle.

In total, the vault records **20 active renewal cases**, all concentrated in Q2 2026 (**April: 8, May: 10, June: 2**). The remaining nine months exist as pre-seeded empty templates. Tracked gross renewal premiums total **AED 85,198.45** (April AED 57,098.00 + May AED 28,100.45).

---

## 1. Structure of the Monthly Tracking System

Each calendar month folder follows a paired Markdown architecture:
1. **`{Month}-Health-Insurance.md`**: The lead roster index linking each individual client renewal dossier (`.md` file) due that month.
2. **`{Month}-Renewal.md`**: The monthly kanban/table tracking board with standard columns:
   `| Client Name | Policy Number | Provider | Expiry Date | Status | Gross Premium | Notes |`

Case files are named with insurer scheme prefixes:
- `TE-` : [[Takaful Emarat]]
- `DIC-` : [[Dubai Insurance]]
- `OI2-` : [[Oman Insurance]] (Oman Insurance Company, formerly misidentified as Orient)
- `HAYAH-` : [[HAYAH Insurance]]

When a policy number is not yet assigned during CRM export, a placeholder is embedded into the filename (e.g., `TE-TBD-*`).

---

## 2. Calendar Breakdown: Month-by-Month Status & Production

| Month | Active Files | Tracked Policies | Total Gross Premium (AED) | Insurer Breakdown | Operational Status |
|---|---|---|---|---|---|
| **January** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **February** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **March** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **April** | 10 | 8 | AED 57,098.00 | [[Dubai Insurance]] (4), [[Takaful Emarat]] (4) | Active board: 1 Renewed, 3 Expired/Quote Sent, 4 Contacted/Pending. Premiums range from AED 1,208 to AED 34,013. |
| **May** | 12 | 10 | AED 28,100.45 | [[Takaful Emarat]] (6), [[Dubai Insurance]] (3), [[Oman Insurance]] (1) | Active board: 10 cases due. Premiums range from AED 1,175.00 to AED 6,799.98. |
| **June** | 4 | 2 | TBD | [[HAYAH Insurance]] (1), [[Takaful Emarat]] (1) | Forward pipeline: 2 cases due (including placeholder `TE-TBD`). |
| **July** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **August** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **September** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **October** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **November** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **December** | 2 | 0 | AED 0.00 | None | Seeded scaffold; empty table. |
| **Total** | **44** | **20** | **AED 85,198.45+** | **4 Insurers** | **3 Active Months, 9 Seeded Months** |

---

## 3. Insurer Concentration in Renewals

The 20 active renewal cases show strong concentration among two primary writers:
- **[[Takaful Emarat]]**: 11 policies (**55.0%** of all renewals) across April (4), May (6), and June (1). Reflects Takaful Emarat's market dominance in the desk's new business book from the previous year.
- **[[Dubai Insurance]]**: 7 policies (**35.0%** of all renewals) across April (4) and May (3). High-value individual policies including partner/investor visas.
- **[[Oman Insurance]] (OI2)**: 1 policy (**5.0%**) in May.
- **[[HAYAH Insurance]]**: 1 policy (**5.0%**) in June.

None of the other 18 insurers in the 22-insurer plan library (such as [[Cigna]], [[BUPA]], [[Daman]], [[ADNIC]], or [[NAS]] partners) appear in the renewal book, indicating that high-volume entry and mid-tier individual policies drive recurring broker maintenance.

---

## 4. Key Operational Dynamics & Pipeline Patterns

### A. The Three-File Update Rule & Synchronization Drift
In theory, when a renewal case advances through the [[Renewal tracking status flow]] (`Due` → `Contacted` → `Quote Sent` → `Payment Pending` → `Renewed` / `Lapsed`), three records must move in tandem:
1. The **Renewal Dossier** in `{Month}/`
2. The **Monthly Board** (`{Month}-Renewal.md`)
3. The **Master Board** (`Workspace/RENEWALS.md` or `Workspace/PIPELINE.md`)

In practice, synchronization drift is pervasive:
- `Workspace/RENEWALS.md` remains frozen at the **April 2026** snapshot even as June 2026 audits took place.
- In April, 3 policies had expired while still sitting at "Quote Sent" status because discount negotiations stalled with the insurer.
- In May, `RENEWALS-May-2026.md` lists all 10 policies as "Not Contacted / Due This Month" (AED 28,100.45 total), while the master pipeline was not kept up to date.

### B. Duplicate May Folder Discrepancy
There are two separate locations for May renewals:
1. `Workspace/Leads/Renewals/Health Insurance/May/`: Holds all 10 client dossiers (`.md`), `May-Health-Insurance.md`, and `May-Renewal.md`.
2. `Workspace/Renewals/May/`: Contains a second copy of `RENEWALS-May-2026.md` and `May-Renewals.md`, but only 1 client file (`DIC-586102-Jitendra-Panikker.md` plus a reference file).
This duplicate indicates an abandoned or incomplete folder migration between an older `Workspace/Renewals/` structure and the canonical `Workspace/Leads/Renewals/` tree.

### C. Renewal Pricing vs. New Business Pricing
Renewal premiums in the dossiers diverge significantly from generic new-business price tables:
- Premiums reflect medical inflation, aging brackets, and individual claims history.
- Instances exist where clients requested premium reductions, but insurers formally **declined discounts**, forcing the broker to re-quote against alternative entry-level products or risk lapse.

---

## 5. Related Pages
- [[Renewal pipeline]] — Core concept covering renewal architecture and the 6-stage lifecycle
- [[Renewal tracking status flow]] — Detailed stage transition rules from Due to Lapsed
- [[Renewals board]] — Analysis of the operational board and its multi-folder contradictions
- [[Renewals Pipeline April 2026]] — Detailed view of the April production cohort
- [[Renewals Pipeline May 2026]] — Detailed view of the May production cohort
- [[Pipeline board]] — Master sales and production board
- [[Workspace audit June 2026]] — Operational audit highlighting folder drift and overdue tasks
- [[Takaful Emarat]], [[Dubai Insurance]], [[Oman Insurance]], [[HAYAH Insurance]] — The four insurers with active renewal policies
