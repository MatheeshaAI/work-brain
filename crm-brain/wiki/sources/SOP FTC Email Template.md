---
type: source
sources: ["raw/Health-Insurance/Workspace/SOPs/FTC_Email_Template.md"]
updated: 2026-10-22
tags: [sop, email, template, terms, underwriting]
summary: "The Financial Terms and Conditions confirmation email: when it is sent, its fixed sections, the plain-text output rules and the key terms it makes the client accept."
---
# SOP FTC Email Template

The template for the email sent after the insurer confirms the application and **before** the payment link goes out. The client must reply to confirm. Concept page: [[Financial terms confirmation email]].

## Output rules
Plain text (`.txt`), not Markdown, so email clients show it correctly: first-level bullets with four spaces and a bullet character, sub-items with eight spaces and a dash, ALL CAPS section headers, saved as an FTC draft in the lead's document folder for copy and paste.

## Sections
1. **Opening:** thanks for the documents; asks the client to confirm that information is accurate and that terms, conditions and exclusions are understood.
2. **Your policy summary:** insurer, plan, network provider, co-insurance or deductible, who the invoice is raised to (individual or company).
3. **Application documents:** medical application form (original or revised, attached), Emirates ID or passport, valid visa, sponsor documents. Only submitted documents are considered.
4. **Key terms and conditions:**
   - *Network changes:* the insurer may change the approved provider list within the network tier at its discretion.
   - *Medical declarations:* declare all known or suspected conditions and planned treatment; failure may affect coverage or reimbursement.
   - *Maternity:* only married females are eligible; undeclared pregnancies can be refused; a pregnancy arising within forty calendar days of the application is at the insurer's discretion.
   - *Outpatient access* (only for basic / clinic-only plans): a GP referral is needed before a specialist; hospital access limited to emergency and approved in-patient treatment, so outpatient care is at designated clinics.
5. **Close:** other terms are in the table of benefits and policy wording; after payment the insurer onboards and issues (turnaround "xx working days"); asks for a reply confirmation.

## Use
Drives the "ftc-drafter" subagent ([[Health Insurance CRM system overview]]). The outpatient-access clause connects the template to the Basic / Basic Enhanced / Enhanced ladder ([[Plan price tiers]]) and to [[Explaining co-pay and plan terms]].
