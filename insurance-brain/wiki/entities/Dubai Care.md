---
type: entity
sources: ["raw/10_Work-Insurance/Dubaicare-Hospitals-Dubai.md", "raw/10_Work-Insurance/Dubaicare Network Comparison (N4-N1).md", "raw/20_AI-and-Agents/YOUR MULTI-AGENT TEAM STRUCTURE.md", "raw/10_Work-Insurance/Call transcriptions.md", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/10_Work-Insurance/Matheesha Sarathchandra_09-Mar-2026 10_33_57.csv", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/work_os system designing documents/03_INSURANCE_KNOWLEDGE/TPAs_and_Networks.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Multi_Agent_Design.md"]
updated: 2026-10-22
tags: [tpa, insurance, dubai]
summary: "Dubai Care TPA - Dubai-focused, 7 networks (N1 down to N5 OP/IP)"
---
# Dubai Care

TPA focused on Dubai, government and corporate contracts. Has specialist agent in [[TPA Network Lookup Agents]] (see [[YOUR MULTI-AGENT TEAM STRUCTURE]]).

## Networks (7)
From [[Network tiers]]: N1 (premium), Exclusive N2/N2 (high), N3 (mid), N4 (economy), N5 OP (outpatient only), N5 IP (inpatient only).

## Notes from existing wiki
N3 covers 47 hospitals/clinics in Dubai (Deira 12, Bur Dubai 8, Jumeirah 6, Business Bay 5, others 16). N1 covers all three in multi-hospital example while N2 misses NMC Royal. Example prices illustrative (N1 AED 3200/year, N2 AED 8800 for family). Burjeel Abu Dhabi not covered (Dubai-focused). [[WhatsApp analysis May-June 2026]] notes case where policy issued as Dubai Care N5 (AED 2000 dental limit) instead of Next N5 (AED 3500 dental) - raised with insurer to switch without new payment.

## Network data
[[Dubaicare-Hospitals-Dubai]] lists hospitals in Dubai by network; [[Dubaicare Network Comparison (N4-N1)]] compares tiers. Full Dubaicare network list CSV exists in raw (819KB) - structure only, no row copying.

## Related
[[Mednet]], [[NAS]], [[Nextcare]], [[Network tiers]], [[Network database design]], [[Finding a hospital in a network]], [[TPA Network Lookup Agents]].

## As a selling plan in 2026
- **Dubai Care N4 is the plan quoted most often.** It is the plan on the one booked policy captured in the CRM extraction ([[IMCRM health detail page extraction]]), and it appears in the scripted intro's Enhanced tier with a starting price of AED 1,757 excl. / 1,883.70 incl. VAT - under the name "Dubai Insurance - Remnto N4 Value (Dubai Care)", where the word *Remnto* is almost certainly a template artefact for **Dubai Care N4**. See [[Plan price tiers]], [[Batch intro messaging]].
- **Dubai Care N4 is also the platform catalogue's most expensive entry plan** at AED 1,780, and Dubai Care's **Next N5** and **Next N5B** sit at AED 1,102 and 1,183 - see [[Insurance plan catalogue]].
- **5 of the 32 policies** in the 09-Mar-2026 commission export are with Dubai Insurance, which writes Dubai Care plans - second only to [[Takaful Emarat]]. See [[Sales commission export]].
- **The N4 versus N5 mismatch is a live case.** [[WhatsApp analysis May-June 2026]] records a policy issued as Dubai Care N5 (AED 2,000 dental limit) when Next N5 (AED 3,500 dental) was needed. The **calls** add the other half: a customer holding two quotations that look identical is told the difference is the **network operator, not the benefits** - here N4 versus Pearl - and the decision is framed as paying about AED 2,000 more for ten minutes of approval speed. See [[Handling the price objection]], [[Call transcriptions]] and [[Customer objections]].

**Caveat on the approval-speed argument:** it is a sales claim made on a call, not a measured service level. See [[Takaful Emarat]] for the same caveat.

## Dubai Care is the network, Dubai Insurance is the insurer (2026-10-22 ingest)
The in-place workspace files add a fourth entry-level plan whose name carries both names at once: **"Remento N4 Base Plan" (also "RN4")**, written by [[Dubai Insurance]] on the Dubai Care N4 network. Source: [[Entry level plans extraction plan]].

- The name is written three ways across the vault - **Remento N4**, **Remnto N4**, **RN4** - while the older vocabulary says "Dubai Care N4". This is a template artefact, not a plan family: see [[Plan price tiers]].
- The extension's basic-plans filter **excludes Dubai Care** as a network, yet the entry-level set includes this Dubai Care N4 plan. The same disagreement as with [[Takaful Emarat]]: see [[Basic plan filter]] and [[Entry level plans]].
- The two entities are separate pages on purpose - the network operator and the insurer are different companies with different roles on the quotation sheet.

Related: [[Dubai Insurance]], [[Entry level plans]], [[Basic plan filter]], [[Network tiers]].

See also (added): [[Network plan code list (NAS_CN)]] for the plan codes of this network.

## Where it sits in the work_os reference lists (2026-10-22 ingest)
The work_os TPA list gives Dubai Care **6 networks** (N1, Exclusive N2, N2, N3, N4, N5) and describes it as Dubai-focused with its strength in Dubai. The multi-agent design gives **7**, splitting N5 into **N5 OP** (outpatient only) and **N5 IP** (inpatient only). Source: [[TPAs and Networks Reference (Work OS)]], [[YOUR MULTI-AGENT TEAM STRUCTURE]].

The split version is the one the rest of the vault uses, and it matches the network-search tooling, which reports coverage for N1, Exclusive N2, N2, N3, N4, **N5 OP, N5 IP** and the dental tiers N1-N4. See [[Network tiers]], [[TPA and network reference]].

The `TPA's & Networks` note also lists ADNIC as a separate Abu Dhabi-focused TPA with four networks (Platinum, Gold, Silver, Bronze) - do not confuse it with Dubai Care's tiers. See [[ADNIC]].
