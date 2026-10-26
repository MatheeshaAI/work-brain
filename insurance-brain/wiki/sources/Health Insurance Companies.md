---
type: source
sources: ["raw/10_Work-Insurance/Health Insurance Companies.md", "raw/work_os system designing documents/00_ORIGINALS/Health Insurance Companies.md", "raw/work_os system designing documents/00_ORIGINALS/Insurance Companies.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/Companies.md", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [insurance, companies, providers]
summary: "List of health insurance companies in UAE market"
---
# Source: Health Insurance Companies

Original note: [[raw/10_Work-Insurance/Health Insurance Companies.md|Health Insurance Companies]]. Lists insurers operating in UAE market (as recorded).

Includes: Abu Dhabi National Insurance, Abu Dhabi National Takaful, Adamjee Insurance, Alliance Insurance, Cigna Insurance, Dubai Insurance, Fidelity United, GIG Insurance (formerly AXA), Hayah Insurance, ISONSECURE Insurance, Max Health (Dubai Insurance product), NLGIC – Liva Insurance, National General Insurance (NGI), National Health Insurance Company – Daman, Orient Insurance/Takaful/UNB/Orient-Allianz, Qatar Insurance, RAK Insurance, Salama Insurance, Sukoon Insurance (formerly Oman Insurance), Takaful Emarat Insurance, Watania Takaful Insurance.

## Related

- [[Insurance plan catalogue]]
- [[Plan price tiers]]
- [[Insurance Sales Platform]]

## Also stored in work_os
The same list appears in three places in the `work_os system designing documents` folder: `00_ORIGINALS/Health Insurance Companies.md` (plain list, same as this note), `00_ORIGINALS/Insurance Companies.md` (the list as wikilinks, with a closing explanation that each name can become a plan note) and `03_INSURANCE_KNOWLEDGE/Companies.md` (headed "UAE Health Insurance Companies", states "all 24" companies). All carry the same 24 names. The conversation log in the same folder says "23+" companies, so 24 is the count to use. The list drives the per-insurer plan notes and the expert prompt: [[Health Insurance Expert System Prompt]], [[Work OS Master Index]].

## A fourth copy, in code (2026-10-22 ingest)
The saved Python settings module declares `INSURANCE_COMPANIES` with the same 24 names, which confirms the count independently of the notes. It is a different list from the neighbouring `NETWORK_PROVIDERS` constant, which mixes insurers with legacy names (Oman Insurance, AXA) and is wrong as a network list - see [[Network tiers]].

Source: [[Health Insurance Sales Agent Python Code]].
