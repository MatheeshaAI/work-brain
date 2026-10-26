---
name: policy-booker
description: Policy booking checklist — verify all documents are present, draft the AML & KYC booking email, show IMCRM upload steps, then update lead status to Policy Booked. Use when user says "book policy for [REF_ID]", "complete booking for [lead]", or "policy booking for [name]".
---

# Policy Booker — Policy Booking Checklist

## When to Use
Triggered when the user is ready to formally book a policy and complete all submission steps.

## Steps

### 1. Read the lead file and documents folder
- Open `Workspace/Leads/HEA-[CODE]-[First]-[Last].md`
- List contents of `Workspace/Documents/HEA-[CODE]-[First]-[Last]/`

### 2. Verify all required documents are present

Check for the following — flag any that are missing before proceeding:

- [ ] Passport (all members)
- [ ] Emirates ID — front & back (all members)
- [ ] Visa (all members, if applicable)
- [ ] Signed application form
- [ ] Insurance certificate / policy bond
- [ ] E-Card
- [ ] Payment receipt

If any documents are missing, report them to the user and wait before continuing.

### 3. Draft the AML & KYC booking email
Read `Workspace/SOPs/Booking Policy.md` for the email template.

Email format:
- **Subject:** `[Customer Name] - HEA-[CODE] - AML & KYC Check`
- **Reply-to:** The original AML check email thread
- **CC:** Unit head (per SOP)
- **Body:** Standard AML/KYC confirmation text with customer details filled in

### 4. Show IMCRM upload steps
Guide the user through the upload process:
1. Navigate to `https://imcrm.alfred.ae/quotes/health/<code>`
2. Go to the Documents section
3. Upload each required document type
4. Confirm each upload succeeds before moving to the next
5. Submit / finalize the booking in IMCRM

### 5. Update lead status (after user confirms IMCRM upload is complete)
- Update `Workspace/Leads/[lead].md` → `Status: Policy Booked`
- Move lead row to **Policy Booked** section in `Workspace/PIPELINE.md`
- Update Production Summary totals in PIPELINE.md

## Notes
- Follow `Workspace/SOPs/Booking Policy.md` exactly
- Do not mark as Policy Booked until the user confirms IMCRM upload is complete
