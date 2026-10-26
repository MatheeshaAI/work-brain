---
name: nas-network-search-skill
description: Search the NAS TPA provider network CSV file to find which NAS network tiers (Comprehensive, General, Restricted, Super-Restricted, Workers, Value) cover a specific hospital, clinic, pharmacy, optical center, or any provider in the UAE or GCC. Use this skill immediately whenever Matheesha mentions a provider name and asks about NAS coverage, NAS network tiers, or "is this covered under NAS". Also triggers when asked to check if a facility is in-network under NAS, which NAS plans cover a specific provider, or to search the NAS provider list. Always search the NAS file before answering — do not rely on memory. Trigger on any mention of NAS network, NAS TPA, NAS provider search, or NAS coverage check.
---

# NAS Network Provider Search

## Purpose
Search the NAS TPA provider network CSV to find which network tiers cover a given provider.

## File Location
The NAS network file is uploaded by Matheesha and lives at:
```
/mnt/user-data/uploads/Nas-Network-May.csv
```
> If the file is not found at this path, ask Matheesha to re-upload the latest NAS network CSV.

## Network Tiers (NAS)
NAS has 6 network tiers — from widest to most restricted:

| Tier | Description |
|---|---|
| Comprehensive Network | Widest access — top tier |
| General Network | Broad access |
| Restricted Network | Mid-tier |
| Super-Restricted Network | Limited access |
| Workers Network | For labour/workers plans |
| Value Network | Most restricted / entry-level |

In the CSV, a `?` in a network column = **provider is covered** under that tier. A blank/NaN = **not covered**.

## Search Steps

### Step 1 — Load the file
```python
import pandas as pd
df = pd.read_csv('/mnt/user-data/uploads/Nas-Network-May.csv', encoding='latin-1')
```

### Step 2 — Search by provider name
Use case-insensitive partial matching. If the user gives a location (e.g. "Jumeirah"), filter on that too:

```python
# Example: Emirates Hospital, Jumeirah
results = df[
    df['PROVIDER'].str.contains('Emirates', case=False, na=False) &
    df['PROVIDER'].str.contains('Jumeirah', case=False, na=False)
]
```

If no results, broaden the search (drop location filter, try alternate keywords).

### Step 3 — Extract network coverage
```python
network_cols = [
    'Comprehensive Network',
    'General Network',
    'Restricted Network',
    'Super-Restricted Network',
    'Workers Network',
    'Value Network'
]

for _, row in results.iterrows():
    print('Provider:', row['PROVIDER'])
    print('Region:', row['REGION'], '|', 'Subregion:', row['SUBREGION'])
    print('Type:', row['TYPE'])
    print('Dental:', row['HAS DENTAL SERVICE'])
    print('Special Notes:', row['SPECIAL NOTES'])
    for col in network_cols:
        covered = '✅ Yes' if pd.notna(row[col]) and str(row[col]).strip() != '' else '❌ No'
        print(f'  {col}: {covered}')
```

## Output Format

Present results in a clean table:

```
## 🏥 [Provider Name] — NAS Network Coverage

| Network Tier              | Covered? |
|---------------------------|----------|
| Comprehensive Network     | ✅ Yes   |
| General Network           | ✅ Yes   |
| Restricted Network        | ✅ Yes   |
| Super-Restricted Network  | ❌ No    |
| Workers Network           | ❌ No    |
| Value Network             | ❌ No    |

📍 Region: Dubai | Subregion: Jumeira Second
🏷️ Type: Hospital
🦷 Dental: No
⚠️ Special Notes: [if any]
```

Then add a **quick sales tip**:
- Which plans (Comprehensive/General/Restricted) are covered = safe to recommend this hospital
- Which plans are NOT covered = client would need to go elsewhere or reimburse

## Edge Cases

- **Multiple results returned**: Show all matches and ask Matheesha to confirm which one
- **No results found**: Try broader search (just hospital name, no location). If still nothing, tell Matheesha the provider was not found in the current NAS list
- **Special Notes field**: Always surface this — it often contains exclusions (specific doctors excluded, dental exclusions, etc.)
- **Countries other than UAE**: The file also covers Kuwait, Qatar, Oman, Bahrain. Filter by COUNTRY column if needed
