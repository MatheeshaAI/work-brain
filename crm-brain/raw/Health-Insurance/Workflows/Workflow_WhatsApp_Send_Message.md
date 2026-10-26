# Workflow: Send WhatsApp Messages to Leads

## Overview

This workflow explains how to send quotes, follow-up messages, and documents to insurance leads using wacli.

## Prerequisites

- wacli installed and authenticated (see Workflow_WhatsApp_Setup.md)
- Lead's WhatsApp phone number in format: `971XXXXXXXXX` (UAE example)
- Background sync running (recommended): `./Scripts/wacli-sync-service.sh start`

## How to Send a Text Message

### Quick Send (Command Line)

```bash
wacli send text --to 971501234567 --message "Hello! Here's your insurance quote..."
```

### Using Node.js Script (Recommended)

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --message "Your AED 5,000 annual family health plan quote is ready. Would you like to proceed?"
```

**Output:**
```
Sending to 971501234567...
✓ Message sent successfully
```

## How to Send a Document or File

### Send PDF Quote

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/Quote_2026-04-17.pdf" \
  --caption "Here's your personalized health insurance quote for AED 8,500/year"
```

### Send Policy Document

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/Policy_Certificate.pdf" \
  --caption "Your policy is now active! Find attached your policy certificate and e-card."
```

### Send Medical Card

```bash
node Scripts/wacli-send-message.js \
  --phone "971501234567" \
  --file "Documents/Ahmed-Khan-HEA-12345678/e-card.jpg" \
  --caption "Your digital health card - scan this QR code at hospitals"
```

## Message Templates

### Quote Sent
```
Hi [NAME]!

Your personalized health insurance quote is ready:

📋 Plan: [PLAN_NAME]
💰 Annual Cost: AED [AMOUNT]
👥 Members: [COUNT]
📅 Valid until: [DATE]

Ready to proceed? Reply YES to move forward, or let me know if you have questions!

Best regards,
Matheesha Sarathchandra
```

### Follow-up Message
```
Hi [NAME],

Just checking in on your insurance quote from [DATE]. Do you have any questions about:

✓ Coverage details
✓ Network hospitals
✓ Claims process
✓ Documentation needed

Let me know how I can help!

Regards,
Matheesha
```

### Policy Activated
```
Congratulations [NAME]! 🎉

Your health insurance policy has been activated:

✓ Policy Number: [POLICY_NUM]
✓ Effective Date: [DATE]
✓ Coverage: AED [AMOUNT]
✓ Beneficiaries: [COUNT] family members

Attached: Your policy certificate and digital health card

Thank you for choosing us!
```

## Workflow: Send Quote to Lead

### Manual Process

1. **Extract lead details from IMCRM:**
   - Lead name: Ahmed Khan
   - Phone: 971501234567
   - Plan: Gold Plus
   - Amount: AED 8,500
   - REF-ID: HEA-12345678

2. **Prepare quote PDF:**
   - Generate or export from IMCRM
   - Save to: `Documents/Ahmed-Khan-HEA-12345678/Quote_2026-04-17.pdf`

3. **Send message:**
   ```bash
   node Scripts/wacli-send-message.js \
     --phone "971501234567" \
     --file "Documents/Ahmed-Khan-HEA-12345678/Quote_2026-04-17.pdf" \
     --caption "Hi Ahmed, here's your personalized insurance quote. Ready to move forward?"
   ```

4. **Track response:**
   - Lead replies on WhatsApp
   - Message syncs to local database automatically
   - Check response with: `node Scripts/wacli-search-lead.js --phone "971501234567"`

5. **Update IMCRM status:**
   - Once lead confirms: Mark as "Quoted" in IMCRM
   - Once payment received: Mark as "Policy Booked"

## Workflow: Send Document to Lead (Post-Booking)

### After Policy Approval

1. **Lead submits documents:**
   - Passport/EID copy
   - Visa copy
   - Medical certificate (if required)

2. **You prepare policy documents:**
   - Policy certificate
   - E-card
   - Policy bond
   - Receipt

3. **Send via WhatsApp:**
   ```bash
   # Send policy certificate
   node Scripts/wacli-send-message.js \
     --phone "971501234567" \
     --file "Documents/Ahmed-Khan-HEA-12345678/Policy_Certificate.pdf" \
     --caption "Your policy is activated! Find your certificate attached."

   # Send e-card
   node Scripts/wacli-send-message.js \
     --phone "971501234567" \
     --file "Documents/Ahmed-Khan-HEA-12345678/e-card.jpg" \
     --caption "Here's your digital health card - you can use this immediately!"
   ```

4. **Send email confirmation to AML team**
   - Subject: `Ahmed Khan - HEA-12345678 - AML & KYC Check`
   - Include: Documents sent, policy details, coverage dates

## Limitations & Notes

⚠️ **Important:**
- **File size limit:** wacli can send files up to ~100MB (WhatsApp limit)
- **Media types:** Supports PDF, JPG, PNG, MP4, WAV, MP3, and more
- **Phone number format:** Use international format without + (e.g., 971501234567, not +971501234567)
- **Rate limiting:** WhatsApp may throttle if sending too many messages rapidly
- **Message history:** All messages sync to `.wacli-store/wacli.db` for searching

## Troubleshooting

### Issue: "Invalid phone number"
- **Cause:** Wrong format (e.g., with +, spaces, or hyphens)
- **Fix:** Use format: `971501234567` (no country code prefix)

### Issue: "Message delivered but not read"
- **Cause:** Normal - message shows as delivered (checkmark), pending read
- **Fix:** Wait for lead to open WhatsApp and read message

### Issue: "File not found" error
- **Cause:** PDF/document path is incorrect
- **Fix:** Verify document exists: `ls Documents/[LEAD_NAME]-[REF_ID]/`

### Issue: "Cannot send - rate limit"
- **Cause:** Too many messages sent in short time
- **Fix:** Wait a few minutes before sending more messages

## Next Steps

- See **Workflow_WhatsApp_Search.md** to find and export lead conversations
- See **Workflow_WhatsApp_Lead_Tracking.md** for complete lead lifecycle
