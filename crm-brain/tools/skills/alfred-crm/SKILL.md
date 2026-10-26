---
name: alfred-crm
description: Pull lead details from IMCRM, check lead status, or retrieve insurance plans. Use when user provides a REF_ID and asks to get/pull/check/fetch lead data from CRM.
---

# Alfred CRM — Lead Data Extraction

## When to Use
Triggered when the user asks to pull, get, check, or fetch data for a specific lead from IMCRM. The REF_ID can be in any format.

## Steps

### 1. Extract the 8-character code from the REF_ID provided

| Format | Example | Code to use |
|--------|---------|-------------|
| Short code | `282Q2JGD` | `282Q2JGD` |
| Full Ref-ID | `HEA-282Q2JGD` | `282Q2JGD` |
| Full URL | `https://imcrm.alfred.ae/quotes/health/282Q2JGD` | `282Q2JGD` |

### 2. Run the extraction script

```powershell
node Scripts/get_lead_detail.js <8-char-code>
```

### 3. Report the full output

Include all lead fields and the complete member details table.

## Script Output Format

```
Lead Details
Ref-ID: HEA-XXXXXXXX
Created Date: ...
Name: ...
Mobile: ...
Email: ...
Nationality: ...
Date of Birth: ...
Emirate of Visa: ...
Gender: ...
Member Category: ...

Member Details
Number of Members: N

Member 1:
  Member Name: ...
  Relationship: ...
  Gender: ...
  Date of Birth: ...
  Nationality: ...
  Emirates of Visa: ...
  Member Category: ...
```

## Notes
- Session is cached in `Scripts/crm-session/` — no re-login needed between runs
- If session expires, re-authenticate via `crm-login.js`
- Phone numbers from CRM may have 970-prefix — always correct to 971 before saving or sending
