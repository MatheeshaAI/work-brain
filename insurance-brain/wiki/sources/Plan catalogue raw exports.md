---
type: source
sources: ["raw/Health-Insurance/Workspace/Sales Reports/plans_table.md", "raw/Health-Insurance/Workspace/Sales Reports/plans_raw.json"]
updated: 2026-10-22
tags: [insurance, plans, catalogue, export, json]
summary: "The raw plan exports: a 418-row markdown table dump and the same catalogue as JSON with a declared total of 418."
---
# Source: Plan catalogue raw exports

Two files in `raw/Health-Insurance/Workspace/Sales Reports/` hold the same plan catalogue that lives in `Plans/` - in machine-readable form, without the framing.

## `plans_table.md`
A bare markdown table, **418 data rows**, same eight columns as the master table in `Plans/` (`#`, Provider, Plan Name, Plan Type, Network, CO-PAY / CO-INSURANCE, Price (AED), Total with VAT (AED)) and the same row order - price ascending, same plan at row 1 in both. It has no title, no "last updated" stamp and no per-insurer grouping: it is a dump, not a document.

## `plans_raw.json`
The same catalogue as JSON, about 128 KB:

```json
{ "total": 418, "plans": [ { "provider": "...", "planName": "...", ... } ] }
```

The `total` field is **418**, matching the row count of both markdown copies exactly.

## Why it matters
- **It is the export the tooling reads.** The workspace has scrapers that pull the plan table and write JSON, and the JSON carries camelCase keys (`planName`, `provider`) while the markdown uses title-case headers. Anything that parses the catalogue has to know which of the two shapes it is holding.
- **Three copies of one catalogue now live in the workspace** - `Plans/Plans.md`, `Sales Reports/plans_table.md` and `Sales Reports/plans_raw.json` - and they agree on 418 rows. The per-insurer sheets in `Plans/` are the fourth view: same plans, regrouped by provider and network.
- **Only the `Plans/` folder carries a date.** Neither export says when the prices were captured; the insurer sheets say 2026-05-01. Treat the exports as the same 1 May 2026 snapshot.

## Contradictions
- The exports have **no "last updated" field at all**, so a reader of the JSON alone cannot tell whether it is live pricing. The `Plans/` sheets can.
- The workspace audit calls the library "400+ plans across 20+ insurers" - accurate as a summary, but the real shape is 418 plans, 22 provider labels, 21 network labels. See [[Workspace audit June 2026]].

## Related
- [[Insurance plan sheets]]
- [[Plan sheet format]]
- [[Insurance plan catalogue]]
- [[Sales reporting]]
- [[Network lookups]]
