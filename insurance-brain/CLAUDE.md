# Insurance Brain: LLM Wiki rulebook

This brain is the **insurance half** of Work Brain: what the desk sells. Insurers, TPAs and networks, plans and tiers, coverage terms (co-pay), underwriting, claims, and the documents each product requires. The sibling brain is `../crm-brain/` (how the desk sells and tracks). Read the router at `../CLAUDE.md` first.

You (Claude) maintain a wiki between the owner and their notes. The owner adds sources and asks questions. You write and keep the wiki tidy.

## Layers
1. **Sources (read-only).** Everything under `raw/`. Never edit these.
   - `raw/10_Work-Insurance`, `raw/20_AI-and-Agents`, `raw/90_Archive`: copied from PKM-Work.
   - `raw/Health-Insurance/` (plan sheets, knowledge base, underwriting notes), `raw/Insurance Workspace/`, `raw/work_os system designing documents/`, `raw/copilot/`: the old in-place sources, copied from PKM-Work.
   - Client lead files are not kept here. Pages that cite them point to `crm-brain/raw/...`.
   - `raw/Inbox - To sort/`: new, unsorted notes land here.
2. **Wiki (yours).** Everything under `wiki/`. Only write there.
3. **Tools.** `tools/skills/` holds the provider-network search skills (Mednet, NAS, Nextcare, Aafiya). Do not ingest them; a page may describe a tool and link its folder.
4. **This file.** Update it when the owner corrects your style.

## Skip list (do not ingest)
`node_modules`, `.git`, `.obsidian`, `.claude`, agent config files (`AGENTS.md`, `CLAUDE.md`, `SKILL.md`), everything in `tools/`, binaries and media (mention by filename only).

## Secrets
Never copy API keys, passwords, ID numbers, card or account numbers, cookies or `.env` values into the wiki or `tools/`. If a source contains one, say "contains credentials" and cite the file. Files that contained credentials were not copied here; they stay in PKM-Work (see `raw/README.md`).

## Client privacy (strict)
This brain should rarely need client data. Sources about clients (WhatsApp chats, leads, CRM exports, dossiers) are summarized as patterns and numbers only. Do not copy client names, phone numbers, emails, lead IDs, payment details or health information into the wiki. Say which source holds the detail. Team members and referrers may be mentioned by role; individual names only when the owner asks.

## Wiki layout
- `wiki/index.md` catalog of every page: a link plus a one-line summary, grouped by category. Read it first when answering.
- `wiki/log.md` append-only history. Line format: `## [YYYY-MM-DD] ingest | <title>` (also `query`, `lint`, `migrate`).
- `wiki/overview.md` the big picture, kept current.
- `wiki/sources/` one summary page per ingested source.
- `wiki/entities/` insurers, TPAs, networks, companies.
- `wiki/concepts/` coverage terms, plan structures, underwriting, claims, how things work.
- `wiki/projects/` product-knowledge tools (network lookup agents).
- `wiki/queries/` good answers worth keeping.

## Page format
```
---
type: source | entity | concept | project | query | stub
sources: ["raw/10_Work-Insurance/..."]
updated: 2026-10-26
tags: []
summary: "One line for the index."
---
# Title
Short summary first. Claims cite their source as a link. Link related pages with [[wikilinks]].
```
Names: plain English titles, one concept per page. Prefer updating a page over creating a near-duplicate.

### Entity naming (set 2026-10-28)
- **Insurers** end in "Insurance" in the page title, e.g. `Takaful Emarat Insurance`, `Orient Takaful Insurance`. Trading names and short forms (`TE`, `Live Insurance`, `ADNIC`) go in `aliases:` frontmatter, not separate pages.
- **Insurer groups** get one parent page, `<Group> Insurance Group`, linking each company, e.g. `Orient Insurance Group`.
- **TPAs and networks** are named after the administrator or network (`Dubai Care`, `NAS`, `Mednet`). A network label on a plan (`Dubai Care N4`) names a network run by that TPA; link it to the TPA page.
- Tie-breakers: a trading name is never a separate page; two entries for one legal company are merged.

## Sibling brain rule
Desk operations (leads, pipeline, IMCRM, renewals, WhatsApp follow-ups, client messaging, sales method, policy booking, commissions) belong in **crm-brain**, not here. If an insurance note touches a CRM topic, link a stub instead of copying content. Stubs look like:
```
---
type: stub
sources: []
updated: <date>
tags: [stub]
---
# Title

This page lives in the sibling brain: [[crm-brain/wiki/<folder>/<Title>|crm-brain → <Title>]].
```
Stubs that say "Not migrated. This page lives in PKM-Work" point at pages deliberately left out (general AI tooling, marketing).

## Ingest (one source at a time unless the owner says batch)
1. Read the source.
2. Tell the owner the key takeaways and which pages you will create or update. Wait for feedback while we are still learning the style.
3. Write `wiki/sources/<title>.md`.
4. Create or update the entity, concept and project pages it touches (often 10 to 15). Flag contradictions with older pages instead of silently overwriting.
5. Update `wiki/index.md`.
6. Append a line to `wiki/log.md`.

### Style (set by the owner, 2026-10-22)
- Create as many pages as the source supports; do not hold back on entity and concept pages.
- Name project pages with a relevant, descriptive name.
- Source summaries are detailed: key points, flows, setup details, status, caveats. Mark design intent versus built facts.
- Create a stub page for a mentioned entity whose own source is not ingested yet, and say it is a stub.

## Query
Read `wiki/index.md`, open the relevant pages, answer with links to the pages and sources. For questions that also need desk or lead context, read `../crm-brain/wiki/index.md` too. If the answer is worth keeping, offer to save it in `wiki/queries/` and update the index and log.

## Lint (when asked, or every ~20 ingests)
Report and fix: contradictions between pages, claims a newer source replaced, orphan pages with no inbound links, concepts mentioned but missing a page, missing cross-links, gaps worth researching. Log the pass.

## Commands the owner may use
- "ingest <note>" or "ingest the next 5 in <folder>"
- "ask <question>"
- "lint the wiki"

## Safety
Any move or delete outside `wiki/` needs the owner's OK and a log entry. Back up before bulk changes.
