---
type: concept
sources: ["raw/Health-Insurance/Workspace/Plans/Plans.md", "raw/Health-Insurance/Workspace/Plans/All-Plans-List.md", "raw/Health-Insurance/Workspace/Plans/Entry Level Plan.md", "raw/Health-Insurance/Workspace/Plans/Dubai-Insurance.md", "raw/Health-Insurance/Workspace/Plans/Takaful-Emarat-Insurance.md"]
updated: 2026-10-22
tags: [insurance, plans, format, catalogue, templates]
summary: "How a plan sheet is laid out - master table, per-insurer sheet, network-grouped guide - and how to read a price from one."
---
# Plan sheet format

A plan sheet is a markdown table with a fixed set of columns. The same columns appear in three places in the workspace - the master table, the per-insurer sheets and the raw exports - so a reader who knows one knows all of them.

## The columns
| Column | Meaning | Notes |
|---|---|---|
| `#` | running index | the master table is numbered 1-418; insurer sheets drop it |
| Provider | the insurer writing the plan | 22 distinct labels in the master |
| Plan Name | the insurer's own product name | free text, and not stable across sources |
| Plan Type | `Entry Level`, `Good`, `Best` | the sheet's own tier words |
| Network | the network / provider panel | 21 distinct labels, and the label is not always an operator |
| CO-PAY / CO-INSURANCE | co-share string | free text, most plans repeat one standard line |
| Price (AED) | annual premium before VAT | integer, no thousands separator |
| Total with VAT (AED) | price x 1.05 | always the price column times 1.05 |

## The three shapes
1. **Master table** - `Plans.md`, one flat table of all 418 plans, sorted by price ascending.
2. **Per-insurer sheet** - one file per provider, `## Network:` blocks, each split into `### Entry Level / Good / Best` tiers, columns reduced to `Plan Name | Copay | Price (AED) | Total w/ VAT`. Every sheet carries `_N plans | Last updated: 2026-05-01_` on line three.
3. **Network-grouped guide** - `All-Plans-List.md` and `Entry Level Plan.md`, a numbered list per network with a "Best for" line, or a table with a `Key Features` column.

## Reading a price
- Read the **co-pay string first**: two plans can differ only by co-pay, and that difference is the one clients argue about - see [[Co-pay and co-insurance]] and [[Explaining co-pay and plan terms]].
- **Price excludes VAT; the last column includes it.** A quoted "1,209" in a chat is the pre-VAT number unless it says otherwise.
- **The tier word is the desk's, not the insurer's.** `Entry Level` / `Good` / `Best` are the sheet's labels for what [[Insurance plan catalogue]] calls Basic / Basic Enhanced / Enhance. A plan the sheet calls `Best` may be the insurer's "Silver" - the two vocabularies are not one-to-one.
- **The plan name may be unstable.** The same product appears as "Remento N4", "Remnto N4" and "RN4"; see [[Dubai Insurance]] and [[Plan price tiers]].

## The rules a sheet follows, and the rules it breaks
- Prices are a **1 May 2026 snapshot**; the sheets are stamped, the exports are not.
- The Network column mixes **operators** (MEDNET, NAS, NEXTCARE, DUBAI CARE, AAFIYA) with **insurer names** and **product names** (Maxwell, SUKOON PREMIUM). A network filter built on that column alone will miss rows.
- **Tier totals are lopsided**: 216 Best, 125 Good, 77 Entry Level. "How many plans do you have" is answered by the master table, not by the entry-level guide.

## Related
- [[Insurance plan sheets]]
- [[Plan catalogue raw exports]]
- [[Insurance plan catalogue]]
- [[Plan price tiers]]
- [[Network tiers]]
- [[Network lookups]]
- [[Entry level plans]]
- [[Basic plan filter]]
- [[Co-pay and co-insurance]]
