---
type: concept
sources: ["raw/work_os system designing documents/04_AUTOMATION/Sales_Automation_Notes.md", "raw/work_os system designing documents/00_ORIGINALS/Sales_Automation_Notes.md"]
updated: 2026-10-22
tags: [email, ftc, process, payment, insurance]
summary: "The order of operations around the FTC confirmation email: fill the policy fields, choose wording by plan type, send, wait for client confirmation, only then send the payment link."
---
# FTC email confirmation flow

The sequence in [[Sales Automation Notes]]; the template itself is in [[SOP FTC Email Template]].

1. Mark the lead and paste the policy fields: insurer, plan, network, co-insurance or deductible, preferred facility, invoice-to party, plan type, issuance turnaround, link.
2. Confirm sponsor name and email.
3. Plan type decides the outpatient wording: Basic (clinics only, specialists by GP referral), Basic Enhanced (designated clinics with direct specialists), Enhanced (hospitals and clinics in network).
4. Check the summary matches the quotation, replace the link placeholder, send.
5. **Wait for an explicit confirmation** ("Confirmed", "Proceed", "Go Ahead").
6. Only then send the payment link, set the stage to Payment Link Sent To Customer, and set a follow-up date if payment is not immediate.

The point is the gate in step 5: no payment link before written confirmation. The automation idea is one prompt producing the email draft, a WhatsApp message and a CRM note ([[Draft and approve messaging flow]] for the human approval layer). See also [[Plan tiers and variables]].
