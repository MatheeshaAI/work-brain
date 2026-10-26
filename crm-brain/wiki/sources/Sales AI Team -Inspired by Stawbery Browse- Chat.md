---
type: source
sources: ["raw/30_Projects/Sales AI Team -Inspired by Stawbery Browse- Chat.md", "raw/work_os system designing documents/00_ORIGINALS/Sales AI Team -Inspired by Stawbery Browse- Chat.md", "raw/work_os system designing documents/06_REFERENCE/Sales_AI_Team_Design.md"]
updated: 2026-10-22
tags: [source, discussion, design, backend]
summary: "Chat/discussion with full UI design system, backend code, and advice."
---
# Source: Sales AI Team -Inspired by Stawbery Browse- Chat

Long discussion covering UI reverse-engineering, design system (colors/typography/shadows), full component specs, backend code (Prisma schema, SalesAgent, WhatsApp automation, task queue, APIs), free AI options, validation paths.

## Related
[[Sales AI Team]].

## Also stored in work_os
Stored twice in the work_os folder: `00_ORIGINALS/Sales AI Team -Inspired by Stawbery Browse- Chat.md` and, renamed, `06_REFERENCE/Sales_AI_Team_Design.md` (identical, about 74 KB). The Master Index lists it as 'Sales AI team design (Strawberry Browser inspired)' under reference material ([[Work OS Master Index]]).

## The reference copy's structure (2026-10-22 ingest)
`Sales_AI_Team_Design.md` is 2,970 lines in chat format - a conversation, not a document with headings. Read end to end it runs in six movements:

1. **How to get the exact UI** - inspect the Strawberry Browser and copy its components, or rebuild from Radix UI + Tailwind + Lucide + Framer Motion. Includes the reasoning for each choice.
2. **A full starter template** - around 900 lines of JSX/TSX: sidebar navigation, chat container, message bubbles, input with attachments, agent cards, buttons, responsive layout.
3. **A three-phase build plan** - Phase 1 core UI (weeks 1-2), Phase 2 backend integration (weeks 3-4: OpenAI API, WhatsApp Web automation, agent creation, Prisma database, BullMQ queue, CRM integrations), Phase 3 advanced features (weeks 5-6: drag-drop agent builder, analytics dashboard).
4. **Logo and avatar assets** - sizes, a gradient, and six agent avatars.
5. **After the owner's "give me all 4"** - the complete backend code: Prisma models, the agent system, browser automation.
6. **Team, skills and money** - a skills assessment (must-have, should-have, nice-to-have), running-cost estimates, a 12-16 week timeline, and the three delivery paths with cost bands and success rates.

## The three paths and their numbers (the part worth keeping)
| Path | Shape | Cost | Time to launch | Stated success rate |
|---|---|---|---|---|
| 1. Solo developer | 6+ months programming, 20+ hours a week | $600-1k/month | 4-6 months | 20-30% |
| 2. Owner + developer partner | Owner on product and sales, developer on backend, AI integration, WhatsApp automation, deployment | equity 50-50, or $3k-5k/month, or $10-15k one-off | 2-3 months | 50-60% |
| 3. No-code then custom | Make.com/Zapier, Typebot/Voiceflow, the official WhatsApp Business API, manual handling for the first 10-20 customers; then a custom MVP funded by revenue | $50-200/month, then $5-10k for the developer | start in 2-4 weeks | 70%+ |

The document's recommendation is **Path 3 first, evolving to Path 2** - validate with no-code tools, get paying customers, then fund a custom build with the revenue.

Running-cost estimates in the same section: OpenAI API $100-300/month, hosting $50-200/month, database $25-50/month (Supabase or PlanetScale), domain and email about $20, Redis for queues $10-30, and optionally Browserless.io at $100-500/month for WhatsApp automation.

**These are the design's own estimates, not measured results** - the success rates in particular are stated without a source. See [[Sales AI Team]] and [[Planning document]].
