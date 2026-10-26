---
name: ftc-drafter
description: Generate the Financial Terms & Conditions confirmation email for a lead as a plain .txt file ready to copy-paste. Use when user asks for "FTC email", "financial terms for [REF_ID]", "draft FTC for [lead]", or "generate the FTC email".
---

# FTC Drafter — Financial Terms & Conditions Email

## When to Use
Triggered when the user needs to generate the FTC confirmation email to send to a client before sharing the payment link.

## Steps

### 1. Read the FTC template
Open `Workspace/SOPs/FTC_Email_Template.md` and note all placeholder fields.

### 2. Read the lead file
Open `Workspace/Leads/HEA-[CODE]-[First]-[Last].md` to gather:
- Customer name and salutation
- Plan name and insurer
- Premium amount (total and per member if applicable)
- Member details
- Policy terms and exclusions

### 3. Populate all template placeholders
Replace every `[PLACEHOLDER]` with actual data from the lead file.

### 4. Format as plain text
Output requirements — strictly follow this format:
- **File type:** Plain `.txt` (not markdown, not HTML)
- **Section headers:** ALL CAPS
- **Bullet points:** 4 spaces + `•`
- **Sub-bullets:** 8 spaces + `•`
- No markdown symbols: no `**bold**`, no `##`, no `-` for bullets

### 5. Save the file
```
Workspace/Documents/HEA-[CODE]-[First]-[Last]/FTC_Email_Draft.txt
```

### 6. Confirm to user
Tell the user the file path — it is ready to open and copy-paste into email.

## Notes
- Do not send the email directly — produce the `.txt` file for the user to review and send
- The plain `.txt` format is intentional so it pastes cleanly into any email client
- If the Documents folder for this lead doesn't exist, create it before saving
