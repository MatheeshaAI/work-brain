---
type: project
sources: ["raw/work_os system designing documents/04_AUTOMATION/Browser_Automation.md", "raw/work_os system designing documents/04_AUTOMATION/Sales_Automation_Notes.md", "raw/work_os system designing documents/04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md", "raw/work_os system designing documents/04_AUTOMATION/WhatsApp_Notion_Integration.md", "raw/work_os system designing documents/02_SYSTEM_DESIGN/Full_System_Documentation.md"]
updated: 2026-10-22
tags: [project, sales, automation, browser, whatsapp, notion]
summary: "The 04_AUTOMATION design set - one Node service running WhatsApp, Notion, browser-driven CRM and Gmail for the insurance sales desk."
---
# Sales Automation

The `04_AUTOMATION` folder of the work_os design set: **four documents describing how the repetitive parts of the insurance sales desk would be automated**, all built on one idea - a single Node.js service that talks to WhatsApp, Notion, the CRM and Gmail, with a human approving anything that goes out. Source: [[WhatsApp MVP and Notion Integration]], [[Browser Automation for CRM and Gmail]], [[Sales Automation Notes]].

This is **design intent**, not a running system. It is the Node-side twin of the Python design in [[Health Insurance Sales Agent Plan (Jan 2026)]], and it is a *different* thing from the hourly audit job in [[Sales System automation]] - that one runs in the Insurance Workspace today; this one was never built.

## The four documents

| Document | Size | What it specifies |
|---|---|---|
| `Browser_Automation.md` | 8.8 KB | Why browser automation instead of an API, library choice, the CRM/Gmail/Notion/WhatsApp loop |
| `Sales_Automation_Notes.md` | 9.5 KB | The FTC email flow, a tailored advisor prompt template, and the IMCRM quote extraction that *does* work |
| `whatsapp_mvp_Based_on_Mark.md` | 2.8 KB | A tiny `whatsapp-web.js` proof of concept to try the idea before building the stack |
| `WhatsApp_Notion_Integration.md` | 8.2 KB | The MVP's own code, and Notion as the message store, outbox and approval surface |

## The architecture they all converge on

```
   WhatsApp <-> whatsapp-web.js  + Chromium
             ↕
            SQLite  <─
             ↕       │
    Notion Webhooks   │
             ↕       │
         Node service (runAgent, CRM automation, Notion helpers)
             ↕
    Browser automation (Puppeteer / agent-browser)
             ↕
      CRM Web UI  &  Gmail Web UI
```

The follow-up cycle this produces: load recent messages from SQLite, run a CRM lookup through browser automation, prompt the model to draft a reply, write the draft back to Notion for approval, then - once approved - update the CRM record and dispatch the message. See [[WhatsApp Notion integration]].

The driver is a constraint, not a preference: **the CRM is a custom web application with no API**. Without an API the only way in is to drive the browser like a human - click, type, read text - so Puppeteer/Playwright become the integration layer, and the Gmail API is only an alternative for the mail side.

## The business side: the FTC email flow
The `Sales_Automation_Notes.md` document carries two halves. The first is the generic process for the FTC (Free to Continue) email - nine policy fields are pasted, the plan type selects the correct outpatient wording, and a client confirmation reply is the gate before the payment link is sent and the lead stage moves to **Payment Link Sent To Customer**. The second half is the tailored version: one prompt template carrying both the policy details and the channel, from which a script would fill an email template, format a WhatsApp message and write a CRM entry. It names the three channels the desk actually uses - **WhatsApp without the official API, email, and a CRM/browser interface**.

Both halves are in the wiki already as [[FTC email confirmation flow]] and [[Sales Automation Notes]]; the gate itself is [[Approval gates]] and [[Plan confirmation before payment]].

## The one piece described as already working
The notes claim one automation is live: with **Claude plus the Claude-in-Chrome extension**, you can ask in plain English for the cheapest plans on an IMCRM health quote page, and it works against the logged-in Chrome session - navigate, find the available-plans table, read the 15 visible rows, sort by price, return a table. The note says outright "This already works today."

Why it works and a Selenium script would not: the extension shares the **real, already-authenticated Chrome session**, while Playwright and Selenium start a fresh browser with no session. Three limits the note states itself: the browser must be open and the extension connected; the table is paginated at 15 rows per page; and **IMCRM can change its HTML and break the selectors**.

This is the practical, proven ancestor of [[IMCRM Data Extractor]] and [[Getting client data from the CRM]], and it is the piece of the work_os design set most worth keeping.

## What the notes get wrong about privacy
The design proposes the chat-analysis module **extract personal details** - date of birth, Emirates ID, visa, nationality - and track document attachments such as IDs and passports. That is the intent of the Python plan in [[Health Insurance Sales Agent Plan (Jan 2026)]], and it conflicts with this vault's own rule: client data is summarized as patterns and numbers only, and ID numbers are never copied into the wiki. See [[Client privacy exposure in agent memory]] and [[Underwriting rules]]. The design also notes that "everything the script sees is now stored on your server" - the Node process holds WhatsApp messages, CRM records and email.

## Duplication
All four documents are **byte-identical copies** of the matching files in `00_ORIGINALS` - the work_os folder ships the same content twice. See [[Work OS duplication map]].

Related: [[Work OS]], [[WhatsApp automation stack]], [[Browser automation]], [[Approval gates]], [[Notion]], [[IMCRM]], [[Sales AI Team]], [[Sales System automation]].
