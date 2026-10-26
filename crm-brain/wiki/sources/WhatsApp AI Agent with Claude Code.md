---
type: source
sources: ["raw/20_AI-and-Agents/WhatsApp AI Agent with Claude Code.md"]
updated: 2026-10-22
tags: [whatsapp, claude-code, baileys, openrouter, easypanel, tutorial]
summary: "Video notes on building, training and deploying a WhatsApp AI agent with Claude Code, OpenRouter and a Hostinger VPS in three phases."
---
# WhatsApp AI Agent with Claude Code

Notes on a tutorial video whose promise is a professional WhatsApp AI agent built entirely from VS Code with [[Claude Code]], "no coding required". The recipe is in [[WhatsApp AI agent build recipe]]; the paste-in prompt is [[WhatsApp AI Agent - Build Prompt]].

## Three phases
1. **Development (local).** Paste a roughly 7,000-word project prompt into Claude Code (Ultra mode, bypass permissions). It generates backend, dashboard, WhatsApp integration and database. Create an [[OpenRouter]] account (free signup, free models exist), give Claude the key, scan the QR code under Linked Devices. The agent then works, but only while the PC is on.
2. **Training.** A `/personaliza` command asks for business name, customers, what makes a lead qualified, and tone, then builds a **system prompt** and injects it. Optional extras: Supabase or vector memory, Google Calendar booking, email follow-ups, dashboard branding. A per-conversation **AI / Human toggle** hands a chat over to a person.
3. **Production (24/7).** Push to GitHub; buy a [[Hostinger]] VPS (KVM2, long term; the video promotes a discount code); install with the EasyPanel control panel ([[EasyPanel]]); connect GitHub with a read-only fine-grained token; set `OPEN_ROUTER_API_KEY` and model name as environment variables; add persistent volumes; deploy; add basic auth; rescan the QR code through the live dashboard.

## Glossary in the note
Claude Code, Open Router, VPS, EasyPanel, [[Baileys]], system prompt.

## Important disclaimer (from the note)
This uses Baileys, a WhatsApp Web emulation, fine for inbound customer support but **not** for bulk marketing: Meta will ban the account. Use official Meta templates for marketing.

## Relevance
Close to the owner's own plans in [[Leads Folder Sales Agent]] (Evolution API on a Hostinger VPS) and to [[WhatsApp automation stack]] (Baileys). The note links to "Claude Free Setups" and "How to Learn Claude Code", which have no pages here. Design intent only; no record of the owner running this exact build.
