---
type: source
sources: ["raw/Health-Insurance/Workspace/Plans/Plans.md", "raw/Health-Insurance/Workspace/Plans/All-Plans-List.md", "raw/Health-Insurance/Workspace/Plans/Entry Level Plan.md", "raw/Health-Insurance/Workspace/Plans/Abu-Dhabi-National-Insurance-Company.md", "raw/Health-Insurance/Workspace/Plans/Abu-Dhabi-National-Takaful.md", "raw/Health-Insurance/Workspace/Plans/Adamjee-Insurance.md", "raw/Health-Insurance/Workspace/Plans/April-Hayah.md", "raw/Health-Insurance/Workspace/Plans/BUPA.md", "raw/Health-Insurance/Workspace/Plans/Cigna-Insurance.md", "raw/Health-Insurance/Workspace/Plans/DICViventa.md", "raw/Health-Insurance/Workspace/Plans/Dubai-Insurance.md", "raw/Health-Insurance/Workspace/Plans/Fidelity-United.md", "raw/Health-Insurance/Workspace/Plans/HAYAH-Insurance.md", "raw/Health-Insurance/Workspace/Plans/ISONSECURE.md", "raw/Health-Insurance/Workspace/Plans/Max-Health.md", "raw/Health-Insurance/Workspace/Plans/National-General-Insurance.md", "raw/Health-Insurance/Workspace/Plans/National-Health-insurance-Company-Daman.md", "raw/Health-Insurance/Workspace/Plans/NLGIC-Liva-Insurance.md", "raw/Health-Insurance/Workspace/Plans/Orient-Insurance.md", "raw/Health-Insurance/Workspace/Plans/Orient-Takaful.md", "raw/Health-Insurance/Workspace/Plans/OrientAllianz.md", "raw/Health-Insurance/Workspace/Plans/Qatar-Insurance-Company.md", "raw/Health-Insurance/Workspace/Plans/RAK-Insurance.md", "raw/Health-Insurance/Workspace/Plans/Takaful-Emarat-Insurance.md", "raw/Health-Insurance/Workspace/Plans/WATANIA-TAKAFUL.md"]
updated: 2026-10-22
tags: [insurance, plans, catalogue, pricing, networks]
summary: "The workspace plan library: one 418-row master table, 22 per-insurer sheets and two derived guides, all a 01-May-2026 snapshot."
---
# Source: Insurance plan sheets

The plan library of the insurance sales workspace: **25 markdown files** in `raw/Health-Insurance/Workspace/Plans/`. It is the reference the desk quotes from, and the same data exists in two other shapes outside the folder (see [[Plan catalogue raw exports]]).

**Everything here is a point-in-time snapshot.** Every insurer sheet is stamped `_Last updated: 2026-05-01_`; prices and co-pays are the insurer's quoted catalogue as of that date, not live pricing. Treat every figure as a vendor claim from 1 May 2026.

## The three kinds of file

| File | Kind | Size |
|---|---|---|
| `Plans.md` | master table, 418 plan rows | one table, 8 columns |
| 22 insurer sheets (`Dubai-Insurance.md`, `Takaful-Emarat-Insurance.md`, ...) | one file per provider | grouped by network, then by tier |
| `All-Plans-List.md`, `Entry Level Plan.md` | derived quick-reference guides | network-grouped listings |

## The master table (`Plans.md`)
One row per plan, sorted by price ascending within the file, with a running `#` index.

| # | Provider | Plan Name | Plan Type | Network | CO-PAY / CO-INSURANCE | Price (AED) | Total with VAT (AED) |
|---|---|---|---|---|---|---|---|

- **Price** is the annual premium before VAT; **Total with VAT** is price x 1.05.
- **Co-pay** is a free-text string, not structured data - the recurring shape is "20% max AED 50 on consultation, 20% on diagnostics, 20% on medicines". See [[Co-pay and co-insurance]].
- **Plan Type** is one of three labels: `Entry Level`, `Good`, `Best`. These are the sheet's own tier words, and they line up with the Basic / Basic Enhanced / Enhance ladder in [[Insurance plan catalogue]] and [[Entry level plans]].

## The insurer sheets
Every insurer sheet follows one template:

```
# <Provider> - Plans
_<N> plans | Last updated: 2026-05-01_
## Network: <NETWORK NAME>
### Entry Level | Good | Best
| Plan Name | Copay | Price (AED) | Total w/ VAT |
```

A provider with plans on several networks gets one `## Network:` block per network, and each block is split by tier. This is why the folder is browsable by "network first" - the same axis the client asks about - rather than by price.

## What is in the library (all 418 plans)

**Providers, by plan count:** Dubai Insurance 64, Cigna Insurance 40, Abu Dhabi National Insurance Company 36, Takaful Emarat Insurance 33, Abu Dhabi National Takaful 30, April Hayah 28, HAYAH Insurance 21, Qatar Insurance Company 19, Adamjee Insurance 19, RAK Insurance 18, Orient-Allianz 17, Orient Insurance 13, NLGIC - Liva Insurance 12, Watania Takaful 12, National General Insurance 10, Daman 9, DIC-Viventa 9, Fidelity United 7, ISONSECURE 7, Orient Takaful 6, BUPA 5, Max Health 3.

**Networks, by plan count:** MEDNET 115, NAS 52, NEXTCARE 46, NEURON 40, Abu Dhabi National Insurance Company 36, DUBAI CARE 34, Allianz 17, Qatar Insurance Company 12, HEALTHNET 10, Daman Insurance 9, ISONSECURE 7, QIC MEDNET 7, ECARE 6, orient takaful 6, RAK NAS 5, E CARE BLUE 4, Maxwell 3, SUKOON PREMIUM 3, AAFIYA 3, SUKOON SIGNATURE + MEDCARE 2, DUBAI CARE (Remnto) 1.

**Tier mix:** Best 216, Good 125, Entry Level 77 - the library is weighted to the top of the ladder, and the cheapest end is thin (77 entry-level plans, of which most sit under 3,000 AED).

**Price range:** 1,114 AED (Takaful Emarat) to 102,498 AED (BUPA, on the Sukoon Signature + Medicare network). Every entry-level plan in the library is below 4,000 AED; every BUPA and April Hayah plan is above 9,000 AED.

## The two derived guides
- **`All-Plans-List.md`** - "Complete mapping of all insurance plans by network provider", one numbered list per network with provider, tier, price and the co-pay line. It closes with a **Quick Stats by Network** table (7 networks, 91 plans counted) and the lines "Total Plans Mapped: 100+" and "Networks Covered: 8 major networks".
- **`Entry Level Plan.md`** - the same shape filtered to entry-level plans only, with a **Key Features** column and a "Best for" line per network ("value-conscious clients", "budget plans with flexibility"). It also carries a **Network Facilities** note per network, e.g. that Nextcare has extensive UAE coverage but facility availability must be checked - see [[Network lookups]].

## Contradictions and caveats
- **The quick-reference guide covers less than the library.** `All-Plans-List.md` stats count 91 plans across 7 networks; the master table holds 418 plans across 21 network labels. The guide's own claim of "100+ plans mapped" and "8 major networks" is consistent with itself but not with the library it summarises. Use the master table for counts.
- **The network axis is not clean.** Five labels are really insurer names (Abu Dhabi National Insurance Company, Qatar Insurance Company, Daman Insurance, ISONSECURE, orient takaful) and two are plan-family variants of another network (QIC MEDNET, RAK NAS, DUBAI CARE (Remnto)). "Maxwell", "SUKOON PREMIUM" and "SUKOON SIGNATURE + MEDCARE" read as product names rather than network operators - they should be checked before being quoted as networks. Compare [[Network tiers]] and [[TPA's and Their Networks with Structure]].
- **April Hayah and HAYAH Insurance are two sheets, 28 + 21 plans, on two different networks (Mednet and Nextcare).** They are treated as separate providers here because the workspace does; whether they are one group under two brands is not settled by these files.
- **Orient appears three times** - Orient Insurance (13), Orient Takaful (6), Orient-Allianz (17) - with three network labels between them.
- **`Plans.md` in this folder and `Sales Reports/plans_table.md` hold the same 418 rows.** The folder copy is the titled, sorted master; the Sales Reports copy is an untitled dump. See [[Plan catalogue raw exports]].

## Related
- [[Plan sheet format]]
- [[Insurance plan catalogue]]
- [[Plan price tiers]]
- [[Network tiers]]
- [[Network lookups]]
- [[Entry level plans]]
- [[Basic plan filter]]
- [[Co-pay and co-insurance]]
- [[Health Insurance Companies]]
- [[Dubai Insurance]], [[Takaful Emarat]], [[QIC]], [[Adamjee]]
