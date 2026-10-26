---
type: project
sources: ["raw/30_Projects/Sales AI Team -Inspired by Stawbery Browser.md", "raw/30_Projects/Sales AI Team -Inspired by Stawbery Browse- Chat.md"]
updated: 2026-10-22
tags: [project, sales, agents, automation, whatsapp, crm]
summary: "Sales AI automation platform (Strawberry-inspired) with multi-agents, WhatsApp, CRM."
---
# Sales AI Team

**Goal:** Sales AI automation platform (inspired by [[Strawberry Browser]]) to automate WhatsApp, email, CRM updates via AI agents.

## Design/spec (from first file)
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Radix UI, Framer Motion; Prisma + PostgreSQL, BullMQ + Redis, Puppeteer; AI via Ollama/Groq/HF (free preferred)
- **Features:** Chat interface, WhatsApp Web automation, lead qualification, multi-agent system, CRM integrations (HubSpot/Salesforce/Pipedrive), Gmail, task queue, analytics, agent builder
- **Schema:** User, Agent, Conversation, Message, Lead, Task (with statuses, triggers/workflows/config)
- **UI:** Sidebar (collapsible), chat container/bubbles/input, agent cards, analytics
- **Implementation notes:** Agent core with tool calls (add_lead_to_crm, send_whatsapp_message, schedule_followup, send_email, analyze_buying_signal, update_lead_status), Puppeteer stealth for WhatsApp, BullMQ workers, API routes

## Discussion/spec details (from chat file)
Extensive UI design system, component specs, backend code (Prisma schema, SalesAgent class with OpenAI/Groq/Ollama variants, WhatsApp automation with Puppeteer, task queue, API routes), deployment/paths, free options (Ollama local, Groq free tier, HF), validation advice (no-code first).

## Status
Design/spec + detailed implementation plan/chat; no code in repo recorded as built yet.

## How to build it - three paths with numbers (2026-10-22 ingest)
The reference chat ends with the delivery question answered with costs and success rates. This is the most decision-useful part of the file, and it was not in the wiki before:

| Path | Shape | Cost | Time to launch | Stated success rate |
|---|---|---|---|---|
| 1. Solo developer | 6+ months programming experience, 20+ hours a week | $600-1k/month | 4-6 months | 20-30% |
| 2. Owner + developer partner | Owner keeps product, sales and customers; developer takes backend architecture, AI integration, WhatsApp automation, deployment | equity 50-50, or $3k-5k/month, or $10-15k one-off | 2-3 months | 50-60% |
| 3. No-code, then custom | Make.com/Zapier, Typebot/Voiceflow, the official WhatsApp Business API, manual handling for the first 10-20 customers; then a custom MVP funded by revenue | $50-200/month, then $5-10k for the developer | start in 2-4 weeks | 70%+ |

The recommendation is **Path 3, evolving to Path 2**: validate cheaply first, then spend revenue rather than savings. Stated running costs: OpenAI API $100-300/month, hosting $50-200, database $25-50, domain and email ~$20, Redis $10-30, optionally Browserless.io $100-500; 12-16 weeks to an MVP.

**The success rates are the design's own estimates, with no source behind them** - treat them as opinion. The cost figures are more checkable. Source: [[Sales AI Team -Inspired by Stawbery Browse- Chat]].

## The three-phase build plan
Phase 1 core UI (weeks 1-2: sidebar, chat, message bubbles, input with attachments, agent cards, buttons, responsive layout); Phase 2 backend (weeks 3-4: OpenAI API, WhatsApp Web automation, agent creation, Prisma database, BullMQ queue, CRM integrations); Phase 3 advanced (weeks 5-6: drag-drop agent builder, analytics dashboard). The same file then supplies the full backend code - Prisma models, the agent system, browser automation. See [[Sales AI Team -Inspired by Stawbery Browse- Chat]].

## Related
[[Strawberry Browser]], [[Agent OS Dashboard]], [[Multi-agent systems]], [[Specialist agents]], [[Sales operations issues]], [[WhatsApp lead follow-up statuses]], [[Standard intro message]].

Earlier January 2026 planning of a related agent: [[Leads Folder Sales Agent]].
