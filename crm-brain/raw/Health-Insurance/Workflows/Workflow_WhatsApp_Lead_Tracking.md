# Workflow: Lead Lifecycle with WhatsApp Integration

## Overview

This workflow integrates WhatsApp messaging and conversation tracking into your complete lead management lifecycle—from initial quote through policy booking.

## Lead Lifecycle Stages

```
┌─────────────┐
│   NEW LEAD  │ ← From IMCRM
├─────────────┘
│
├─→ [1] Extract lead data
│        ├─ Name: Ahmed Khan
│        ├─ Phone: 971501234567
│        ├─ REF-ID: HEA-12345678
│        ├─ Preferred plan: Gold Plus
│
├─→ [2] Generate & Send Quote
│        ├─ Create PDF in IMCRM
│        ├─ Save to Documents/
│        └─ Send via WhatsApp
│
├─→ [3] Track Response
│        ├─ Wait for lead reply
│        ├─ Search conversation
│        └─ Note questions/objections
│
├─→ [4] Follow-up as Needed
│        ├─ Send clarifications
│        ├─ Answer coverage questions
│        └─ Address objections
│
├─→ [5] Close Sale
│        ├─ Lead confirms interest
│        ├─ Update IMCRM: "Quoted"
│        └─ Proceed to collection
│
├─→ [6] Document Collection
│        ├─ Request documents via WhatsApp
│        ├─ Receive scans (WhatsApp or email)
│        └─ Store in Documents/[Lead]/
│
├─→ [7] Policy Booking
│        ├─ Upload documents to IMCRM
│        ├─ Send policy certificate
│        ├─ Send e-card via WhatsApp
│        └─ Update IMCRM: "Policy Booked"
│
└─→ [8] Retention
         ├─ Send renewal reminders
         ├─ Check satisfaction
         └─ Export chat for archives
```

## Stage 1: Extract Lead Data from IMCRM

### From IMCRM:
```
Navigate to: https://imcrm.alfred.ae/quotes/health/HEA-12345678

Extract:
├─ Ref-ID: HEA-12345678
├─ Name: Ahmed Khan
├─ Phone: 971501234567
├─ Email: ahmed.khan@email.com
├─ Member Category: Employee (AED 4000-6000)
├─ Preferred Plan: Gold Plus
└─ Annual Cost: AED 8,500
```

### Document Folder:
```bash
# Create documentation folder
mkdir -p "Documents/Ahmed-Khan-HEA-12345678"
```

## Stage 2: Generate & Send Quote

### 1. Generate Quote in IMCRM
- Navigate to lead
- Click "Generate Quote"
- Download as PDF
- Save to: `Documents/Ahmed-Khan-HEA-12345678/Quote_2026-04-17.pdf`

### 2. Send via WhatsApp

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/Quote_2026-04-17.pdf" \
  --caption "Hi Ahmed, here's your personalized health insurance quote for AED 8,500/year.

Gold Plus Plan includes:
✓ Full outpatient coverage
✓ Hospital admission (100%)
✓ 50+ network hospitals

Please review and let me know if you'd like to proceed or have any questions!"
```

### 3. Log in Lead File

Update `Leads/HEA-12345678-Ahmed-Khan.md`:

```markdown
## Status: Quoted
- **Quote Sent Date:** 2026-04-17 14:30
- **Quote Amount:** AED 8,500
- **Communication Method:** WhatsApp
- **Last Contact:** 2026-04-17 14:30
- **Status Notes:** Quote PDF sent via WhatsApp
```

## Stage 3: Track Response

### Check for Replies

```bash
# Search for conversation within 24 hours
node Scripts/wacli-search-lead.js --phone "971501234567"
```

### Possible Responses

**Lead replies immediately:**
```
"Thanks for the quote! Can you explain the outpatient coverage?"
```
→ Proceed to **Stage 4: Follow-up**

**No response after 24 hours:**
```
"Ahmed, just checking in on the quote. Any questions about the plan?"
```

**Lead asks to think about it:**
```
"Let me discuss with my family and get back to you by Friday"
```
→ Set reminder to follow up Friday

### Update Lead Status

If response is favorable, update `CLAUDE.md`:

```markdown
## Status: Following Up
- **Quote Sent:** 2026-04-17 14:30
- **Response Received:** 2026-04-18 09:15
- **Current Status:** Awaiting decision (family discussion)
- **Expected Response:** 2026-04-19
- **WhatsApp Messages:** 3
```

## Stage 4: Follow-up & Objection Handling

### Search Previous Conversation

```bash
node Scripts/wacli-search-lead.js --phone "971501234567"
```

**Example conversation:**
```
Lead: "What about pre-existing conditions?"
```

### Send Clarification

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --message "Great question! Our Gold Plus plan covers most pre-existing conditions after a 12-month waiting period. Some conditions like diabetes and hypertension are covered from day 1. Would you like me to send you the full policy document with detailed exclusions?"
```

### Continue Until Resolved

- **Lead ready to buy** → Proceed to Stage 5
- **Lead needs more time** → Set follow-up reminder
- **Lead not interested** → Mark as "Not Interested" in lead file

## Stage 5: Close Sale & Update Status

### Confirm Purchase

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --message "Perfect! Let's proceed with your policy. Please send me:

1. Clear photo/scan of your passport (first page)
2. Clear photo/scan of your UAE visa
3. Medical certificate (if applicable for your age)

You can reply with the documents via WhatsApp or email to matheesha.sarathchandra@insurancemarket.ae"
```

### Update IMCRM Status

```
In IMCRM: Change lead status to "Quoted" → "Ready for Policy Booking"
```

### Update Lead File

```markdown
## Status: Policy Booking - Awaiting Documents
- **Quote Accepted:** 2026-04-19 11:00
- **Documents Requested:** 2026-04-19 11:05
- **Documents Received:** [Pending]
- **Next Step:** AML/KYC check
```

## Stage 6: Document Collection & Verification

### Receive Documents

Lead sends documents via WhatsApp or email:
- Passport scan
- Visa scan  
- Medical certificate (if needed)

### Store in Document Folder

```bash
# Example
Documents/Ahmed-Khan-HEA-12345678/
├── Passport.pdf
├── Visa.pdf
├── Medical_Certificate.pdf
└── Quote_2026-04-17.pdf
```

### AML/KYC Check

Send documents to compliance team:

```
Subject: Ahmed Khan - HEA-12345678 - AML & KYC Check
To: [compliance@insurancemarket.ae]

Hi [Team],

Customer: Ahmed Khan
REF-ID: HEA-12345678
Phone: 971501234567

Attached documents for AML/KYC verification:
- Passport copy
- UAE Visa copy
- Medical certificate

Customer agreed to policy terms and plan details via WhatsApp.
Awaiting your approval to proceed with policy issuance.

Regards,
Matheesha
```

## Stage 7: Policy Booking & Delivery

### Once Approved by AML/KYC

1. **Generate policy documents** in IMCRM:
   - Policy certificate
   - E-card/health card
   - Policy bond
   - Receipt

2. **Send via WhatsApp:**

```bash
# Send policy certificate
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/Policy_Certificate.pdf" \
  --caption "🎉 Congratulations Ahmed! Your policy is now ACTIVE.

Attached: Your official policy certificate.
Policy Number: [POLICY_NUM]
Effective Date: 2026-04-20
Coverage: AED 500,000

Your policy is valid immediately. You can visit any network hospital."

# Send e-card
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/e-card.jpg" \
  --caption "Here's your digital health card. Save this or forward to family members. You can present it at hospitals for instant recognition."
```

3. **Update IMCRM:** Change status to "Policy Booked"

4. **Update Lead File:**

```markdown
## Status: Policy Booked ✓
- **Policy Number:** HI-2026-0001234
- **Active Date:** 2026-04-20
- **Annual Premium:** AED 8,500 (PAID)
- **Beneficiaries:** 4 family members
- **Coverage:** AED 500,000
- **Documents Sent:** 2026-04-20 15:30
- **Next Renewal:** 2027-04-20
```

## Stage 8: Retention & Renewal

### Maintain Records

Export complete conversation:

```bash
node Scripts/wacli-export-conversation.js \
  --jid "971501234567@s.whatsapp.net" \
  --output "Documents/Ahmed-Khan-HEA-12345678"
```

Store as: `Documents/Ahmed-Khan-HEA-12345678/WhatsApp_Chat_Final.md`

### Renewal Reminder (11 Months Later)

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --message "Hi Ahmed, your health insurance policy will expire on 2027-04-20. Would you like to renew for another year? Same coverage, same premium of AED 8,500. Let me know!"
```

## Summary Checklist

- [ ] Extract lead from IMCRM
- [ ] Create document folder
- [ ] Generate and send quote
- [ ] Wait for response
- [ ] Send follow-ups if needed
- [ ] Close sale once confirmed
- [ ] Request documents via WhatsApp
- [ ] Store documents in folder
- [ ] Send to AML/KYC team
- [ ] Generate policy documents
- [ ] Send policy + e-card to lead
- [ ] Update IMCRM status
- [ ] Export conversation for records
- [ ] Set renewal reminder (11 months)

## Automation Opportunities

Future enhancements:

```bash
# Automatic quote sending (coming soon)
# Automatic renewal reminders (coming soon)  
# Automatic document organization (coming soon)
# WhatsApp → IMCRM status sync (coming soon)
```

## Key Contacts

- **Matheesha (You):** 971XXXXXXX
- **AML/KYC Team:** [compliance@insurancemarket.ae]
- **Support:** [support@insurancemarket.ae]
