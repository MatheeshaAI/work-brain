---
type: concept
sources: ["raw/20_AI-and-Agents/WhatsApp AI Agent with Claude Code.md", "raw/20_AI-and-Agents/WhatsApp AI Agent - Build Prompt.md"]
updated: 2026-10-22
tags: [whatsapp, claude-code, deployment, tutorial]
summary: "A repeatable recipe for a customer-support WhatsApp agent, from WhatsApp AI Agent with Claude Code and WhatsApp AI Agent"
---
# WhatsApp AI agent build recipe

A repeatable recipe for a customer-support WhatsApp agent, from [[WhatsApp AI Agent with Claude Code]] and [[WhatsApp AI Agent - Build Prompt]].

**Pieces.** [[Claude Code]] writes the code from one long prompt; [[Baileys]] connects to WhatsApp Web by QR; [[OpenRouter]] supplies any model; SQLite stores conversations, messages and logs; an Express dashboard shows chats with a per-chat AI/Human toggle; a Dockerfile lets [[EasyPanel]] deploy it from GitHub onto a [[Hostinger]] VPS with persistent volumes, basic auth and a health endpoint.

**Steps.** Build locally, personalise the system prompt (`/personaliza`), push to GitHub, deploy, rescan the QR on the live URL.

**Limits.** Inbound support only; bulk or marketing sends risk a ban (Baileys is unofficial). Always-on hosting needs a VPS ([[VPS hosting for agent servers]]). Compare the owner's approval-first design in [[Draft and approve messaging flow]] and the stack history in [[WhatsApp automation stack]].
