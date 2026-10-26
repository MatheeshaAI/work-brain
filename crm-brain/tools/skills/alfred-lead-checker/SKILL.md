---
name: alfred-lead-checker
description: >
  Checks Gmail for new health insurance leads assigned to Matheesha today and cross-references
  them against a known list to find any that are missing or unactioned. Use this skill whenever
  Matheesha asks to "check for new leads", "see if I got any leads today", "how many leads did
  I get", "check my email for leads", "did I miss any leads", or any variation of verifying
  today's lead assignment emails. Also trigger when he asks to cross-check leads against his
  email or CRM. Pulls from notify.insurancemarket.ae sender emails and extracts lead codes
  (HEA-XXXXXXXX format) with client names.
---

# Alfred Lead Checker Skill

Checks Gmail for all health insurance leads assigned to Matheesha today, deduplicates them,
and cross-references against any known list he provides.

---

## How Alfred Assigns Leads via Email

Every lead assigned to Matheesha generates an email from:
- **Sender:** `matheesha.sarathchandra@notify.insurancemarket.ae`
- **Subject format:** `{Client Name}'s Health Insurance with Alfred {HEA-XXXXXXXX}`
- **CC:** `health@insurancemarket.ae, matheesha.sarathchandra@insurancemarket.ae`

There are two email templates:
1. **New lead** — "I'm Matheesha Sarathchandra, your dedicated insurance advisor..."
2. **Takeover lead** — "your previous advisor, [Name], is currently unavailable..."

Both count as assigned leads.

---

## Step 1: Search Gmail for Today's Leads

Use today's date in `YYYY/MM/DD` format:

```
from:matheesha.sarathchandra@notify.insurancemarket.ae after:2026/04/08 before:2026/04/09
```

Adjust the date dynamically to today. Use `maxResults: 50` to catch all leads.

---

## Step 2: Parse and Deduplicate

From each email result, extract:
- **Lead code** — from Subject: `HEA-XXXXXXXX` pattern
- **Client name** — from Subject: everything before `'s Health Insurance`
- **Time** — from `internalDate` (convert from epoch ms to readable time)
- **Read/Unread** — check `labelIds` for `"UNREAD"`

**Deduplication:** Santhosh Sabu's leads sometimes send duplicate emails (two emails same UUID).
Group by lead code, keep the earliest timestamp.

---

## Step 3: Cross-Reference (if user provides a list)

If Matheesha gives you a list of leads he already worked on, compare:
- Leads in email ✅ AND in his list → **Already handled**
- Leads in email ❌ NOT in his list → **Missing / not yet actioned**
- Items in his list NOT in email → Flag as **not found in email** (manual entry or different date)

---

## Step 4: Output Format

Present a clean table:

```
📋 TODAY'S LEADS — {DATE} ({N} total)

| # | Client Name        | Code          | Time  | Status        |
|---|--------------------|---------------|-------|---------------|
| 1 | Santhosh Sabu      | HEA-NEVJSDUU  | 13:19 | ✅ Handled    |
| 2 | MHD Mussalli       | HEA-JYJ468YE  | 13:22 | ✅ Handled    |
| 7 | Zainab Durrani     | HEA-N5GBHSXY  | 13:38 | ⚠️ Unread     |
| 8 | Gisele Silva       | HEA-V8NQEPT7  | 13:43 | ⚠️ Unread     |

⚠️ ACTION NEEDED: 2 leads not yet actioned — Zainab Durrani, Gisele Silva
```

Status logic:
- ✅ Handled — in user's provided list
- ⚠️ Unread — has UNREAD label, not in user's list
- 📖 Read — no UNREAD label, not in user's list (may have been checked but not logged)

---

## Notes

- **Halima Mohamed / Margaux Candava pattern:** These sometimes come in as read (no UNREAD flag)
  because Matheesha opened them quickly. Still include them in the count.
- **HEA-YVLASP95 / application emails:** Emails from `no-reply@alert.insurancemarket.email`
  with subject "Health Insurance Application with Alfred HEA-..." are customer-facing alerts,
  NOT new lead assignments. Exclude these.
- **Policy booked emails** (e.g. "Jorge Serra... your Health Insurance is done!") are NOT leads.
  Exclude these.
- Only count emails from `notify.insurancemarket.ae` sender as lead assignments.
