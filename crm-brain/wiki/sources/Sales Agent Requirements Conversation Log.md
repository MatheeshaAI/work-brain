---
type: source
sources: ["raw/work_os system designing documents/00_ORIGINALS/CONVERSATION_LOG.md", "raw/work_os system designing documents/07_ARCHIVE/CONVERSATION_LOG.md"]
updated: 2026-10-22
tags: [requirements, interview, pipeline, pain-points, january-2026]
privacy: one live client case is summarised without names, contacts or document details
summary: "The requirements interview with the owner on 31 January 2026: workflow, stage-by-stage pain points, decisions, tech stack and success metrics for the Leads sales agent."
---
# Source: Sales Agent Requirements Conversation Log

A structured record of the planning interview behind the [[Leads Folder Sales Agent]]. It is the "why" behind [[Health Insurance Sales Agent Plan (Jan 2026)]]. Session date: 31 January 2026. (Two identical copies: 00_ORIGINALS and 07_ARCHIVE.)

## The original request
A "Leads" folder on the desktop holds, per client, a WhatsApp export (`_chat.txt`) plus photos of IDs, passports and documents. The owner wants to run an OpenAI-based agent in it, with a 20-year UAE health-insurance expert as the system prompt ([[Health Insurance Expert System Prompt]]), handling client management and "guaranteeing" each policy closes.

## What the agent must do (requirements as stated)
- **Network and facility search:** match client preferences (hospital, specialist, direct access) to TPA networks.
- **Follow-up drafting** from the last chat or call and the quote already shared, including educational content.
- **Interaction analysis:** sentiment, mood, hesitation, interest; client profile insights; closing recommendations.
- **Use of client data** (ID, visa, passport, nationality) to personalise offers.
- **Next-best-action and follow-up sequence** with timing and content.

## Working setup described
WhatsApp Web is the main channel plus email; 23+ insurers; quotes come from the CRM ([[IMCRM]]) with provider, plan, plan type, network (TPA), co-pay, price and total with VAT; the owner can paste, screenshot or give browser access.

## Pipeline findings
- Stage updates are **manual** in the CRM; data fields are mostly the same across stages; documents add ID, visa file number and passport details, and policy completion adds policy number, receipt, invoice and commission.
- Stage durations vary widely; **stage 5 usually blocks**.
- **New lead flow:** a bought lead arrives by email, then CRM, then number and details, then a call. If unanswered, send WhatsApp asking for a convenient time or member details to quote. CRM details on bought leads are accurate.
- **Allocated stage** is redundant, so remove it.
- **Stages 9 to 16 speed:** fast for clean cases that send documents promptly; slow with BMI issues or pre-existing conditions (medical reports, proofs, possibly changing details or waiting for underwriting and a premium loading).
- **Lost rules:** client says no, or no response for X days; standard 3 to 5 follow-ups, or 5 from a stated proceed date.

## Stage 5 pain points (client behaviour)
Price too high versus unrealistic expectations; not understanding insurance; no response after a quote; comparison shopping; window shopping. See [[Negotiation stage stalls]] and [[Handling the price objection]].

## Live example (anonymised)
A family lead referred by a contact wanted a basic, inexpensive plan covering a premium hospital group, a large hospital chain, specialists, gynaecology and paediatrics. The premium hospital group is **not** in basic plans (it sits in higher categories), so the owner offered both direct-access and GP-referral variants. The agent was expected to explain price-versus-coverage trade-offs. Identity, contact and family details are in the source only.

## Decisions
- Priority order: (1) full pipeline tracking, (2) WhatsApp synced with email, (3) unblock stage 5 with follow-up reminders.
- WhatsApp sync must work **without API keys**, using browser automation of WhatsApp Web (this later changed when Evolution API became available, see [[whatsaoo agent sessinon]]).
- Build phases: core (chat parser, matcher, drafter, tracking), integrations, advanced AI (sentiment, lost-lead analysis, value messaging), dashboard.
- Stack: Python 3.10+, OpenAI or Claude, Selenium or Playwright, SQLite or JSON, Streamlit or FastAPI plus React, Tesseract, SMTP/IMAP.
- Success metrics: stage-5 time minus 30%, drop-off minus 50%, close rate plus 20%, follow-up time minus 80%, drafting time minus 70%.

## Caveat
The log says "20 total" pipeline stages, matching the plan but not the 16-stage [[Insurance CRM pipeline]]; see the flag in [[Health Insurance Sales Agent Plan (Jan 2026)]]. It contains personal data for the example client, so do not copy from the source into the wiki.
