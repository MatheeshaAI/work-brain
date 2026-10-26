---
type: concept
sources: ["raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/Plans.md", "raw/work_os system designing documents/00_ORIGINALS/health_insurance_plan_options.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/Sales_Frameworks.md", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [insurance, plans, tiers, copay, tpa]
summary: "The advisor's four-tier plan ladder (Basic, Basic Enhanced, Enhanced Levels 1-6, International) and the TPA and co-pay variables that multiply it into 100-plus variations."
---
# Plan tiers and variables

How a health plan is classified when selling. Source: [[UAE Health Insurance Plan Structure and Pricing]] and [[Health Insurance Sales Frameworks]].

| Tier | Meaning |
|---|---|
| Basic | clinic visits only |
| Basic Enhanced | more clinics plus direct specialist access |
| Enhanced Level 1 to 6 | hospital cover; higher level = more and better hospitals (L1 entry, L3 premium, L4 top-tier, L5/L6 maximum) |
| International | worldwide cover, highest price |

Variables per plan: **TPA** (Nextcare, MEDNET, eCare, Aafiya, NAS, DubaiCare, ADNIC, Sukoon) and **co-pay** (0%, 10%, 20%; see [[Co-pay and co-insurance]]). Four tiers x five or six Enhanced levels x five or six TPAs x three co-pays gives "100+ variations", which is why selling means narrowing to at most three options.

This ladder matches [[Plan price tiers]] and [[Insurance plan catalogue]] (Basic / Basic Enhance / Enhance) but is not the Basic/Silver/Gold/Platinum ladder in the persona prompt ([[Health Insurance Expert System Prompt]]); the CRM also labels plans Entry level / Good / Best ([[IMCRM CRM Guide]]), a third vocabulary. Whether "Enhanced level 3" equals a TPA network tier (for example Mednet Silver Premium) is not stated; see [[Network tiers]].

## The code uses the prompt's ladder too (2026-10-22 ingest)
The Python settings module in the work_os folder declares `PLAN_TIERS = Basic, Silver, Gold, Platinum` - the same four-name ladder as the persona prompt, so the code would rank plans on a scale the knowledge notes do not use. Two of the four names overlap by accident: "Basic" and "Platinum" both appear in the sales ladder, but "Silver" and "Gold" do not, and the code has no "Enhanced" at all.

Source: [[Health Insurance Sales Agent Python Code]].
