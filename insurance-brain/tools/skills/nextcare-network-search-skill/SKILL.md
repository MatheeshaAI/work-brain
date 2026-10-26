---
name: nextcare-network-search-skill
description: >
  Search across all NextCare TPA provider network files to find which networks cover a specific
  provider, hospital, clinic, or pharmacy. Use this skill whenever the user asks about NextCare
  network coverage for a provider — e.g. "which NextCare network covers X?", "is [provider] in
  RN2?", "does NextCare GN include [hospital]?", "find [clinic] in NextCare networks", or any
  question about whether a provider is covered under GN, GN+, GN Excl., RN, RN2, or RN3.
  Always use this skill when NextCare provider network lookup is involved, even if phrased casually.
compatibility: pandas, openpyxl — required. All 6 NextCare network xlsx files must be present at /mnt/user-data/uploads/
---

# NextCare Network Search Skill

Search for a provider across all 6 NextCare network files and return which networks cover them,
along with their provider category tier.

---

## Network Files

| Variable | File Path | Network |
|----------|-----------|---------|
| GN | `/mnt/user-data/uploads/NEXTCARE_GN.xlsx` | General Network |
| GN+ | `/mnt/user-data/uploads/NEXTCARE_GN_.xlsx` | General Network Plus (includes ProviderCategory column) |
| GN Excl. | `/mnt/user-data/uploads/NEXTCARE_-_GN_EXCLUDING_MEDICLINIC__AL_ZAHRA_SULAIMAN_AL_HABIB_GROUP.xlsx` | GN excluding Mediclinic, Al Zahra & Sulaiman Al Habib |
| RN | `/mnt/user-data/uploads/NEXTCARE_RN.xlsx` | Restricted Network |
| RN2 | `/mnt/user-data/uploads/NEXTCARE_RN2.xlsx` | Restricted Network 2 |
| RN3 | `/mnt/user-data/uploads/NEXTCARE_RN3.xlsx` | Restricted Network 3 (most basic) |

---

## Search Logic

Use `pandas` with a **case-insensitive partial match** on the `Provider Name` column.
Always search all 6 files in a single script run.

```python
import pandas as pd

files = {
    "GN": "/mnt/user-data/uploads/NEXTCARE_GN.xlsx",
    "GN+": "/mnt/user-data/uploads/NEXTCARE_GN_.xlsx",
    "GN_Excl": "/mnt/user-data/uploads/NEXTCARE_-_GN_EXCLUDING_MEDICLINIC__AL_ZAHRA_SULAIMAN_AL_HABIB_GROUP.xlsx",
    "RN": "/mnt/user-data/uploads/NEXTCARE_RN.xlsx",
    "RN2": "/mnt/user-data/uploads/NEXTCARE_RN2.xlsx",
    "RN3": "/mnt/user-data/uploads/NEXTCARE_RN3.xlsx",
}

search_term = "<user query>".lower()  # e.g. "emirates hospital"

for name, path in files.items():
    df = pd.read_excel(path)
    mask = df['Provider Name'].str.lower().str.contains(search_term, na=False)
    results = df[mask]
    if not results.empty:
        print(f"FOUND in {name}:")
        for _, row in results.iterrows():
            print(f"  - {row['Provider Name']} | {row.get('City','')} | {row.get('Area','')} | Type: {row.get('Type','')} | ProviderCategory: {row.get('ProviderCategory','N/A')}")
    else:
        print(f"NOT found in {name}")
```

---

## Filtering Results

If the user specifies a city or area (e.g. "in Dubai", "Jumeirah"), **filter results** to only show
matching rows. Apply city/area filters after the name search.

```python
# Example: filter by city
if city_filter:
    results = results[results['City'].str.lower().str.contains(city_filter.lower(), na=False)]
```

---

## Output Format

Present results as a clear summary table:

1. **Specific provider match** (when user names a specific provider + location):
   - Lead with a simple ✅/❌ table showing which networks cover it
   - Follow with the GN+ `ProviderCategory` tag (this tells the sub-tier: GN, GN+, RN, RN2, RN3, PCP)
   - Add a plain-English conclusion (e.g. "covered only on GN-level plans, not on restricted networks")

2. **Broad search** (multiple matches found):
   - List all matching providers grouped by network
   - Show: Provider Name | City | Area | Type | ProviderCategory

---

## Network Hierarchy (for explanations)

From broadest to most restrictive:
**GN / GN+ / GN Excl. → RN → RN2 → RN3**

- A provider in RN3 is also in RN2, RN, and GN (it's a subset relationship going upward)
- A provider only in GN is NOT covered under RN, RN2, or RN3
- GN+ is the same as GN but adds the `ProviderCategory` column — useful for identifying sub-tiers
- GN Excl. is GN minus Mediclinic, Al Zahra, and Sulaiman Al Habib Group facilities

---

## Edge Cases

- **Provider not found in any network**: State clearly it's not in any NextCare network file. Suggest checking spelling or trying a partial name.
- **Multiple locations** (same provider name, different branches): List all branches with their city/area so the user can identify the right one.
- **ProviderCategory column** only exists in GN+ — show as "N/A" for all other files.
- **Duplicate/inconsistent naming**: NextCare files sometimes have duplicate type entries (e.g. `Hospital` and `Hospital ` with trailing space). Treat them as the same.
