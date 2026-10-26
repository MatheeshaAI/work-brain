---
type: concept
sources: ["raw/copilot/copilot-conversations/hey@20260224_190604.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/Required_Documents.md", "raw/work_os system designing documents/00_ORIGINALS/Required Documents For Policy Submission.md", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [insurance, documents, onboarding]
summary: "What an insurer asks for when a health policy is submitted: identity and medical papers, employer and newborn variants, and the extended visa-specific rules."
---
# Policy submission documents

What an insurer asks for when a health policy is submitted, as the owner dictated it in [[Copilot chat 2026-02-24 insurance notes]].

- **Always:** medical application form; member's passport, visa and Emirates ID; sponsor's passport, visa and Emirates ID.
- **Employer-bought policy:** trade licence, VAT certificate, establishment card.
- **Newborn:** birth certificate and discharge summary (not asked after the child's first year); if the discharge summary is from the home country, a fitness certificate from a paediatrician.
- **Caveat:** insurers may add or relax items; originals and validity may be checked.

Used with [[Document request handling]] (the chasing side) and [[Document renaming workflow]] (naming the files received). Sibling process: [[Quote request handling]].

## Extended rules (work_os checklist)
The work_os copy, `Required Documents For Policy Submission`, adds to the list above: **pre-existing conditions** need medical reports, prescriptions and treatment records from the last 3 months in the UAE; **members aged 75+** need a fitness certificate with test reports for every insurer; **visa-specific sets** (Dubai new member: Emirates ID application form and e-visa; Northern Emirates: change of status and passport; Abu Dhabi: Emirates ID if a renewal and a Certificate of Continuity, mandatory for renewals; new entrant: change of status or entry stamp); and the fines for late cover ([[Late insurance fines]]). Full summary: [[Required Documents for Policy Submission]].

## The code's own document vocabulary is shorter (2026-10-22 ingest)
The saved Python settings module declares six document types - Emirates ID, Passport, Visa, Medical Report, BMI Report, Pre-existing Proof - against the checklist above and the CRM's 16-document list ([[Document request handling]]). It keeps the identity trio and the two medical items, and drops the sponsor documents, the employer pack, the newborn set, the fitness certificate and every post-issue document. So the code's vocabulary is what a *client* is asked for, not what a *policy* accumulates; the two must not be confused.

Source: [[Health Insurance Sales Agent Python Code]].
