---
name: lead-onboarder
description: Full new lead onboarding — fetch CRM data, create lead markdown file, add to PIPELINE.md, and prepare the WhatsApp welcome message. Use when user says "add lead", "onboard lead", "new lead [REF_ID]", or provides a REF_ID and asks to set it up in the system.
---

# Lead Onboarder — Full New Lead Setup

## When to Use
Triggered when a new lead needs to be added to the system. The user provides a REF_ID in any format.

## Steps

### 1. Extract the 8-character REF_ID code
- `HEA-282Q2JGD` → `282Q2JGD`
- Full URL → extract last path segment

### 2. Pull lead data from CRM
```powershell
node Scripts/get_lead_detail.js <8-char-code>
```
Capture: name, mobile, email, DOB, nationality, emirate, gender, member category, all member details.

### 3. Fix phone number
CRM often returns 970-prefix — always correct to 971:
- `970501234567` → `971501234567`

### 4. Create lead markdown file
Create `Workspace/Leads/HEA-[CODE]-[First]-[Last].md`:

```markdown
# Lead Detail: HEA-XXXXXXXX - [Customer Name]

## General Information
- **Ref-ID:** HEA-XXXXXXXX
- **Customer Type:** Individual/Family
- **Created Date:** DD-MMM-YYYY HH:MM:00
- **Advisor:** Matheesha Sarathchandra
- **Status:** Followed Up

## Customer Profile
- **Full Name:** [Name]
- **Email:** [email]
- **Mobile:** [971XXXXXXXXX]
- **Emirate of Visa:** [Emirate]
- **Member Category:** [Category]
- **Date of Birth:** [DOB]
- **Nationality:** [Nationality]
- **Gender:** [Gender]

## Member Details
[Include all family members with DOB, nationality, relation, member category]

## Payment Details
- **Total Amount:** — AED
- **Status:** Pending
```

### 5. Add to PIPELINE.md
Add a new row under the **New Leads** section:

```
| HEA-XXXXXXXX | [Name] | Individual/Family | [Date] | Followed Up | Await WhatsApp response |
```

### 6. Check & update CRM status
- Check live CRM status for this lead
- If status is `Quoted` → change it to `Followed Up` in IMCRM immediately (prevents reassignment)
- Use the `alfred-lead-status-update` skill — must click confirm button after selecting

### 7. Prepare WhatsApp welcome message
Read `Workspace/SOPs/WhatsApp_Welcome_Message_Template.md` and compose the welcome message.

**Salutation rules:**
| Condition | Title |
|-----------|-------|
| Male | Mr. |
| Female + Married | Mrs. |
| Female + Unmarried | Miss |
| Female + no marital status | Ms. |
| Age < 18 | First name only (no title) |

**For referred leads:** Mention the referrer in the intro; drop "dedicated advisor" and "reviewed your profile" lines.

**Show the message in chat for the user to review — do NOT auto-send.**

### 8. Update PIPELINE.md pending action
After the user confirms the welcome message was sent:
- Update pending action to: `"Await WhatsApp response — get insurance requirements"`

## Notes
- Only create the Documents folder when actual documents are provided
- Do not add unrequested analysis or extra content
