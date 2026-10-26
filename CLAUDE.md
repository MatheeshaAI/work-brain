# Work Brain: router

One work brain, built on the LLM Wiki pattern (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). It holds two sub-brains, each a full wiki with its own rulebook:

| Brain | Holds | Rulebook |
|---|---|---|
| `crm-brain/` | **How the desk sells and tracks.** Leads, pipeline stages, IMCRM/Alfred, renewals, WhatsApp follow-ups, client messaging, objections and sales frameworks, policy booking, commissions, sales reports, daily audits, and the tools built for the desk. | `crm-brain/CLAUDE.md` |
| `insurance-brain/` | **What the desk sells.** Insurers, TPAs and networks, plans and tiers, coverage terms (co-pay), underwriting, claims, required documents per product. | `insurance-brain/CLAUDE.md` |

Built on 2026-10-26 from PKM-Work (Brain-Work). Personal topics stay in PKM-Personal. General AI/agent tooling and marketing content were left in PKM-Work.

## Routing
1. Read `index.md` (this folder), then the `wiki/index.md` of the brain the question belongs to.
2. A question that spans both (for example "which plan fits this lead") reads both brains' indexes.
3. Follow the rulebook of the brain you write in. Never write into the other brain during an ingest; link a stub instead.
4. A new source goes into the `raw/` of the brain it belongs to. If unsure which, ask the owner.

## Layout of each brain
- `raw/` sources, read-only.
- `wiki/` Claude's pages: `index.md`, `log.md`, `overview.md`, `sources/`, `entities/`, `concepts/`, `projects/`, `queries/`.
- `tools/` skills, subagents and apps for that brain.
- `CLAUDE.md` the rulebook.
