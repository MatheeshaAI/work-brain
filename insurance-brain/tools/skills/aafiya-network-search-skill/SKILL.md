---
name: aafiya-network-search-skill
description: Search across all Aafiya TPA provider network files (APN Plus, Essential, APN) to find which Aafiya network plans cover a specific hospital, clinic, pharmacy, optical center, or any provider in the UAE. Use this skill immediately whenever Matheesha mentions a provider name and asks about Aafiya coverage, Aafiya network tiers, or "is this covered under Aafiya". Also triggers when asked to check if a facility is in-network under Aafiya, which Aafiya plans cover a specific provider, or to search the Aafiya provider list. Always search the Aafiya files before answering — do not rely on memory. Trigger on any mention of Aafiya network, Aafiya TPA, Aafiya provider search, or Aafiya coverage check.
---

# Aafiya TPA Network Provider Search

## Purpose
Search across all 3 Aafiya TPA network Excel files to find which network plan(s) cover a given provider.

## Aafiya Network Tiers
Aafiya has 3 network plans — from widest to most restricted:

| Network | File | Description |
|---|---|---|
| **APN Plus** | `AAFIYA_-_APN_PLUS__2_.xlsx` | Widest network — includes clinics, pharmacies, hospitals, optical, diagnostics |
| **Essential** | `AAFIYA_-_ESSENTIAL.xlsx` | Mid-tier — hospitals, pharmacies, day care only |
| **APN** | `AAFIYA_-_APN__1_.xlsx` | Most restricted — hospitals, pharmacies, day care only |

## File Locations
```
/mnt/user-data/uploads/AAFIYA_-_APN_PLUS__2_.xlsx
/mnt/user-data/uploads/AAFIYA_-_ESSENTIAL.xlsx
/mnt/user-data/uploads/AAFIYA_-_APN__1_.xlsx
```
> If files are missing, ask Matheesha to re-upload the latest Aafiya network Excel files.

## Important File Format Note
- All 3 files have **12 rows of disclaimers at the top** before the actual data
- Always load with `header=12` (0-indexed row 12 = the actual column header row)
- Key columns: `NAME OF THE PROVIDER`, `PROVIDER TYPE`, `EMIRATE`, `AREA`, `ADDRESS`, `PHONE`, `NOTE`

## Search Steps

### Step 1 — Load all 3 files into a unified dataframe
```python
import pandas as pd

files = {
    'APN Plus':  '/mnt/user-data/uploads/AAFIYA_-_APN_PLUS__2_.xlsx',
    'Essential': '/mnt/user-data/uploads/AAFIYA_-_ESSENTIAL.xlsx',
    'APN':       '/mnt/user-data/uploads/AAFIYA_-_APN__1_.xlsx',
}

dfs = []
for network_name, path in files.items():
    df = pd.read_excel(path, header=12)
    df['NETWORK'] = network_name
    dfs.append(df[['NAME OF THE PROVIDER','PROVIDER TYPE','EMIRATE','AREA','ADDRESS','PHONE','NOTE','NETWORK']])

combined = pd.concat(dfs, ignore_index=True)
```

### Step 2 — Search by provider name
Use case-insensitive partial matching. Add location/area filter if user provides one:

```python
# Basic search by name only
results = combined[combined['NAME OF THE PROVIDER'].str.contains('SEARCH_TERM', case=False, na=False)]

# With area/location filter (recommended when user specifies location)
results = combined[
    combined['NAME OF THE PROVIDER'].str.contains('SEARCH_TERM', case=False, na=False) &
    combined['AREA'].str.contains('LOCATION', case=False, na=False)
]

# With provider type filter (e.g. HOSPITAL, CLINIC, PHARMACY, OPTICAL, DIAGNOSTICS, DAY CARE)
results = combined[
    combined['NAME OF THE PROVIDER'].str.contains('SEARCH_TERM', case=False, na=False) &
    (combined['PROVIDER TYPE'] == 'HOSPITAL')
]
```

If no results → broaden: drop location filter, try shorter keyword.

### Step 3 — Group by provider and show which networks cover it
```python
grouped = results.groupby(
    ['NAME OF THE PROVIDER','EMIRATE','AREA','PROVIDER TYPE']
)['NETWORK'].apply(list).reset_index()

all_networks = ['APN Plus', 'Essential', 'APN']

for _, row in grouped.iterrows():
    covered = row['NETWORK']
    not_covered = [n for n in all_networks if n not in covered]
    print('Provider:', row['NAME OF THE PROVIDER'])
    print('Location:', row['EMIRATE'], '-', row['AREA'])
    print('Type:', row['PROVIDER TYPE'])
    print('Covered:', covered)
    print('Not covered:', not_covered)
```

## Output Format

Present results clearly:

```
## 🏥 [Provider Name] — Aafiya Network Coverage

📍 Location: Dubai - Jumeirah
🏷️ Type: Hospital

| Network   | Covered? |
|-----------|----------|
| APN Plus  | ✅ Yes   |
| Essential | ❌ No    |
| APN       | ❌ No    |

⚠️ Notes: [if any — surface the NOTE column content]
```

Then add a **sales tip**:
- Which Aafiya plans give access to this provider
- If only APN Plus covers it — clients on Essential or APN won't have direct billing access

## Edge Cases

- **Multiple matches**: Show all, ask Matheesha to confirm which one is the right branch
- **No results**: Try broader search (name only, no area filter). Still nothing = provider not in current Aafiya network
- **NOTE column**: Always check and surface — may contain IP-only restrictions, referral requirements, or special conditions
- **Provider in multiple emirates**: Group clearly by EMIRATE + AREA so Matheesha can see which branch is where

## Provider Types Reference
| Type | Meaning |
|---|---|
| HOSPITAL | Full hospital |
| CLINIC | Outpatient clinic |
| PHARMACY | Pharmacy |
| OPTICAL | Optical center |
| DIAGNOSTICS | Labs / imaging |
| DAY CARE | Day surgery / day care center |
| PROVISION OF HEALTH SERVICES | Specialized health services |
