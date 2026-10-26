---
type: source
sources: ["raw/Health-Insurance/agent.md"]
updated: 2026-10-22
tags: [insurance, agents, workspace, rules]
summary: "The short rule sheet every subagent in the health insurance workspace reads: what to read first, how to report back, which files to touch."
---
# Health Insurance subagent guide

A short rule sheet at the root of the in-place `raw/Health-Insurance/` workspace. It tells every dispatched subagent how to behave. It sits beside the orchestrator instructions described in [[Health Insurance CRM system overview]] and the project page [[Health Insurance Sales Workspace]]. Source: `raw/Health-Insurance/agent.md`.

## The five rules
1. **Read the orchestrator instructions first.** They hold the delegation table, workflows and file structures; use the exact SOP templates in `Workspace/SOPs/`.
2. **Work with files directly.** Subagents may read and write `PIPELINE.md`, `RENEWALS.md` and lead files; verify paths against the real repo before writing.
3. **Maintain the memory system.** Log findings, decisions, blockers and learnings to a dated memory file; when the owner says "remember this", create a persistent memory file with frontmatter and add it to the memory index. See [[Memory files]] and [[Agent memory]].
4. **Expect self-contained prompts.** The orchestrator passes the REF_ID, client, action and extras so the subagent never needs to ask back.
5. **Report back clearly.** Summary of what was done, files created or updated, blockers, learnings for the session file.

## Task table
| Job | Action |
|---|---|
| Onboard new lead | create lead file and document folder, update the pipeline |
| File documents | organise, rename, update the lead's document inventory |
| Update lead status | update the lead file, move it in the pipeline, set pending action |
| Send WhatsApp | MCP tools or REST API, log the message in the session file |
| Draft FTC email | use the template, output a `.txt` into the documents folder |
| Book policy | verify documents, update status, record in the pipeline |
| Update / check renewal | update the renewal file and `RENEWALS.md`; scan for status |
| Morning briefing | read the pipeline checklist, return today's priorities |
| Audit pipeline | compare lead files with the pipeline and report gaps |

## Conventions it restates
- Lead files `[REF_ID]-[First]-[Last].md`; renewal files `[Provider]-[PolicyNumber]-[First]-[Last].md`; document folders `[REF_ID]-[Lead Name]/` (see [[Lead file naming]], [[Lead reference IDs]]).
- Lead statuses must match the CRM ([[IMCRM]]); renewal statuses run Due, Contacted, Quote Sent, Payment Pending, then Renewed or Lapsed ([[Renewal pipeline]]).
- When in doubt: check the orchestrator file, read the SOP template, look at an existing lead file, then report back.

## Status
Working rules. The same agents are described as built in [[Health Insurance CRM system overview]] and audited in [[Workspace Audit 2026-06-01]].
