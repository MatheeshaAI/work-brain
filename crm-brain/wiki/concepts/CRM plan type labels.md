---
type: concept
sources: ["wiki/sources/Plans - Abu Dhabi National Insurance Company.md", "wiki/sources/Plans - Daman.md", "wiki/entities/Abu Dhabi National Insurance Company.md", "wiki/entities/Daman.md", "wiki/concepts/Plan library.md", "wiki/concepts/Plan price tiers.md"]
updated: 2026-10-22
tags: [plans, crm, labels, vocabulary]
summary: "CRM label vocabulary for plan types (Basic/Basic Enhanced/Enhanced) and per-insurer label positions, with conflicts."
---
# CRM plan type labels

The label vocabulary the CRM uses for plan types and how it maps to selling tiers. Labels vary by insurer and by quote context.

## Customer-facing selling tiers
From [[Plan price tiers]], the sales desk uses three tiers for quotes:
- Basic (clinic coverage only)
- Basic Enhanced (clinic + direct access to specialists)
- Enhanced (complete coverage: clinics + hospitals outpatient + international)

Prices vary by quote; see [[Plan price tiers]] for conflicts across sources.

## CRM/catalogue plan type labels
In the 418-plan export [[Plans Table 418 Plans]], each row has a plan type assigned per insurer:
- Best (216), Good (125), Entry Level (77)
- The same plan name can be labeled differently across insurers; labels are not globally consistent.
- Empty co-pay cells appear for some rows.

## Per-insurer examples
- [[Plans - Abu Dhabi National Insurance Company]] (ADNIC): Entry Level 4, Good 7, Best 25 (Shifa Bronze/Silver/Gold). "Best" can apply to Silver 1 while other Silver variants are "Good".
- [[Plans - Daman]]: labels Entry Level for Care Bronze starting at AED 10,392 (above most entry plans elsewhere) - "Entry Level" is position within insurer range, not a universal price band.
- [[Plans - BUPA]]: all 5 labeled Best in the file.
- [[Plans - National General Insurance]]: uses Classic/Prime naming; labels described in context of plan families.

## Conflicts/flags
- "Entry Level" in CRM does not equal the AED 1k-2k customer Basic tier in all cases (Daman example).
- Network/plan name overlap confuses filters (e.g. Aafiya/E Care Blue used as both network and plan) - see [[Network tiers]].
- Multiple "entry level" selectors exist: three-tier ladder, CRM entry-level flag (15 plans AED 930-1183 in catalogue), and four named plans in extraction plan - no stated mapping.

Cited: [[Plans Table 418 Plans]], [[Plans - Abu Dhabi National Insurance Company]], [[Plans - Daman]], [[Plan library]], [[Plan price tiers]], [[Network tiers]].
