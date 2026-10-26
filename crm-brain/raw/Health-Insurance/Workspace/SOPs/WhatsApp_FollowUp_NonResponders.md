# SOP: WhatsApp Follow-Up — Non-Responders

**Purpose:** Identify leads who haven't replied to your WhatsApp messages and send personalised follow-ups.
**When to run:** Weekly (every Monday morning recommended) or after a batch of new leads.
**Time required:** ~10 minutes

---

## Step 1 — Run the Analysis

Ask Claude:

> *"Check WhatsApp conversations from [date] to today — which clients have not responded back to the welcome message?"*

Claude will:
1. Query the WhatsApp SQLite database at `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`
2. Find all chats where you sent a message (outbound) since the given date
3. Check which of those chats have no inbound reply after your first message
4. Cross-reference phone numbers against lead files in `Workspace/Leads/`
5. Split results into: welcome-message non-responders vs follow-up/quote non-responders

---

## Step 2 — Review the Report

Claude saves a dated report to:

```
Workspace/Reports/WhatsApp-No-Response-Report-DD-MMM-YYYY.md
```

The report contains:
- **Summary stats** (total chats, reply rate %)
- **Priority tiers** by days silent (🔴 10+ days · 🟠 6–7 days · 🟡 3–5 days)
- **Personalised suggested message** for each client (uses name, gender, visa category)
- **Unknown contacts** — clients messaged but with no matching lead file
- **Other non-replies** — follow-up / quote stage leads

Review and edit any messages before sending.

---

## Step 3 — Send Follow-Ups (Tier by Tier)

Tell Claude:

> *"Send follow-up messages to them — go with Option B (tier by tier)"*

Claude will:
1. Start with 🔴 (oldest, highest priority) — send and confirm each one
2. Pause and show results — you approve before moving to next tier
3. Proceed to 🟠 then 🟡, sending all in parallel within each tier
4. Uses the Node.js REST API → WhatsApp bridge (localhost:8080) for all sends

**Prerequisite:** WhatsApp bridge must be running. Verify with:
```
curl http://localhost:8080/api/health
```
If it returns `{"connected":true}` you're good. If not, start it:
```powershell
Start-Process -FilePath "go" -ArgumentList "run", "." -WorkingDirectory "C:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts\whatsapp-mcp\whatsapp-bridge" -WindowStyle Hidden
```

---

## Message Personalisation Rules

Claude auto-personalises each message based on the lead profile:

| Profile detail | How it's used |
|----------------|---------------|
| Gender: Male | "Mr. [First name]" |
| Gender: Female-Married | "Mrs. [First name]" |
| Gender: Female-Single | "Ms. [First name]" |
| Member Category: Domestic worker | Mentions affordable domestic worker plans |
| Member Category: Golden Visa | Mentions local + international plan options |
| Member Category: Dependent spouse | Acknowledges dependent spouse coverage |
| Member Category: Investor/Partner | Mentions UAE-wide coverage |
| Salary ≤ AED 4,000 | Mentions budget-friendly plans |
| Senior (DOB indicating 60+) | Mentions senior plan specialisation |
| Family plan | References family members by name |

**Tone by tier:**
- 🔴 10+ days: Warmer re-introduction, acknowledge time passed, invite re-engagement
- 🟠 6–7 days: Friendly check-in, ask for requirements
- 🟡 3–5 days: Light nudge, easy call-to-action

---

## Triage Flags to Watch For

| Flag | Action |
|------|--------|
| ⚠️ DOB incorrect in system | Add DOB confirmation request to message |
| ⚠️ Phone number last digit uncertain | Verify before sending |
| ⚠️ Bridge was down at lead creation | Treat as first contact, not follow-up |
| ❓ No lead file match for phone number | Identify manually from name in message, then follow up |

---

## After Sending

- Check for replies in WhatsApp within a few hours
- Update lead status in `Workspace/Leads/[REF_ID].md` and `PIPELINE.md` for any leads that respond
- If a lead still doesn't respond after 2 follow-ups, move to "call" — don't message a third time

---

## Frequency Guide

| Scenario | Action |
|----------|--------|
| Lead created today | Welcome message only — no follow-up yet |
| 3–5 days no reply | First follow-up (🟡) |
| 6–7 days no reply | Second follow-up (🟠) |
| 10+ days no reply | Final WhatsApp follow-up (🔴) + phone call |
| 2 follow-ups sent, still no reply | Mark as cold, stop messaging |
