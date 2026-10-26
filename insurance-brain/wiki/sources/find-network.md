---
type: source
sources: ["raw/10_Work-Insurance/find-network.md"]
updated: 2026-10-22
tags: [insurance, workflow, network-search, facility-search, tpa]
---

# find-network — Workflow: Find Facility Network Coverage

A short workflow definition for quickly checking whether a hospital or clinic (e.g., Saudi German, Mediclinic) is covered under a specific TPA network. Designed to avoid loading the full 34 GB network list file directly.

## Steps

1. **Ask for Facility Name** — Identify the hospital or clinic name
2. **Run Search Command:**
   ```bash
   python facility_search.py "[Facility Name]"
   ```
3. **Analyze Results** — Look at the "Coverage" section in the output; it lists all networks (N1, N2, N3, etc.) where the facility appears
4. **Report to Client** — Provide the list of plans/networks that include the requested facility

## Trigger Phrase

> *"Is Saudi German covered in Dubaicare?"* → runs this workflow automatically

## Context

- The network list referenced is ~34 GB (CSV format, [[Dubai Care]] [[Nextcare]] etc.)
- The `facility_search.py` script is a PowerShell-optimised Python search against that file
- This was part of the Work OS agent agent context system for the [[Insurancemarket.ae]] role
- Related to the [[Network Database Design]] initiative — building a structured JSON database from TPA network lists

## Related Pages

- [[Network lookups]] — concept page on network search patterns
- [[TPA and network reference]] — broader TPA/network reference
- [[Dubai Care]] — primary network frequently searched
- [[NAS]] — another common TPA
- [[Nextcare]] — another common TPA
- [[Mednet]] — another common TPA
- [[Network Database Design]] (source) — JSON schema design for TPA data
