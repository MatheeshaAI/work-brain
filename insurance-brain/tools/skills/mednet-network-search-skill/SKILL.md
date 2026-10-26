---
name: mednet-network-search-skill
description: >
  Search the MEDNET provider network CSV file to find which insurance network plans (Gold, Silver Premium, Silver Classic, Green, Emerald, Pearl, EBP OP/IP, Basic OP/IP, Silk Road OP/IP) cover a specific hospital, clinic, pharmacy, or provider in the UAE. Use this skill immediately whenever Matheesha mentions a hospital name, clinic name, or provider and asks about MEDNET coverage, network plans, or "is this covered in MEDNET". Also triggers when asked to check if a facility is in-network, which plans cover a specific provider, or to search the MEDNET list. Always search MEDNET before answering — do not rely on memory.
compatibility: pandas, latin1-encoded CSV at /mnt/user-data/uploads/Mednet-Network-May.csv
---

# MEDNET Network Search Skill

Search the MEDNET provider network list to identify which insurance plans cover a given provider.

## File Details

- **Path:** `/mnt/user-data/uploads/Mednet-Network-May.csv`
- **Encoding:** `latin1` (not UTF-8 — always specify this)
- **Key columns:** `PROVIDER NAME`, `PROVIDER TYPE`, `EMIRATE`, `REGION`, `ADDRESS`
- **Network plan columns:** `GOLD`, `SILVER PREMIUM`, `SILVER CLASSIC`, `GREEN`, `SILK ROAD OP\n`, `SILK ROAD IP\n`, `EMERALD`, `PEARL`, `EBP OP`, `EBP IP`, `BASIC OP`, `BASIC IP`, `DENTAL`, `OPTICAL`, `ALTERNATIVE`

> Note: `SILK ROAD OP` and `SILK ROAD IP` columns have a trailing newline in their name (`\n`). Always reference them as `'SILK ROAD OP\n'` and `'SILK ROAD IP\n'` in code.

## Network Plans to Show (Insurance Plans Only)

Only show these columns in results — **exclude DENTAL, OPTICAL, ALTERNATIVE**:

```
GOLD, SILVER PREMIUM, SILVER CLASSIC, GREEN,
SILK ROAD OP, SILK ROAD IP, EMERALD, PEARL,
EBP OP, EBP IP, BASIC OP, BASIC IP
```

## Step-by-Step Search Process

### Step 1 — Load the file

```python
import pandas as pd
df = pd.read_csv('/mnt/user-data/uploads/Mednet-Network-May.csv', encoding='latin1', low_memory=False)
```

### Step 2 — Search by provider name

Use case-insensitive partial match on `PROVIDER NAME`:

```python
results = df[df['PROVIDER NAME'].str.contains('SEARCH_TERM', case=False, na=False)]
```

If the user also mentions a location (e.g. "Jumeirah", "Dubai Marina", "Deira"), narrow it:

```python
results = results[
    results['ADDRESS'].str.contains('LOCATION', case=False, na=False) |
    results['REGION'].str.contains('LOCATION', case=False, na=False)
]
```

### Step 3 — Deduplicate by provider name + address

```python
results = results.drop_duplicates(subset=['PROVIDER NAME', 'ADDRESS'])
```

### Step 4 — Check network plan coverage

```python
plan_cols = [
    'GOLD', 'SILVER PREMIUM', 'SILVER CLASSIC', 'GREEN',
    'SILK ROAD OP\n', 'SILK ROAD IP\n', 'EMERALD', 'PEARL',
    'EBP OP', 'EBP IP', 'BASIC OP', 'BASIC IP'
]

for _, row in results.iterrows():
    covered = [col.strip() for col in plan_cols if pd.notna(row[col])]
    not_covered = [col.strip() for col in plan_cols if pd.isna(row[col])]
```

## Output Format

Present results as:

**Provider Name — Location**
- Address: ...
- Type: Hospital / Clinic / Pharmacy

| Plan | Covered? |
|---|---|
| Gold | ✅ |
| Silver Premium | ✅ |
| ... | ... |

**Only show ✅ covered plans** — do not list uncovered plans unless the user specifically asks.

If multiple matches found, show each one separately with its own coverage table.

## Edge Cases

- **No results found:** Broaden the search — try removing the location filter, or search by partial name. Tell the user what was searched and suggest alternatives.
- **Multiple results:** Show all matches clearly labeled with their address so Matheesha can identify the right branch.
- **Provider in multiple rows:** This is normal — the CSV has one row per plan per provider. Always deduplicate before displaying.
- **Empty/NaN in plan columns = Not Covered.** Non-null value (any character like `ü`) = Covered.

## Example Queries That Trigger This Skill

- "Is Mediclinic City covered in MEDNET?"
- "Which networks cover Emirates Hospital Jumeirah?"
- "Check if Saudi German Hospital is in the MEDNET list"
- "Is NMC Royal covered under Gold plan in MEDNET?"
- "Search MEDNET for Aster Clinic Deira"
