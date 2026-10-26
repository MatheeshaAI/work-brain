---
type: source
sources: ["raw/work_os system designing documents/02_SYSTEM_DESIGN/system_prompt.md", "raw/work_os system designing documents/00_ORIGINALS/system_prompt.md", "raw/work_os system designing documents/05_CODE/config.py"]
updated: 2026-10-22
tags: [system-prompt, persona, uae, health-insurance]
summary: "The system prompt that makes the agent a 20-year UAE health-insurance sales expert: knowledge domains, role, objection playbooks, tone and closing strategies."
---
# Source: Health Insurance Expert System Prompt

The persona prompt for the [[Leads Folder Sales Agent]]. Two identical copies. It is a prompt (design intent), not a record of results.

## Structure
- **Expertise claims:** all 24 insurers (list matches [[Health Insurance Companies]]), TPAs and which insurers use which, plan structures, UAE regulators (DHA, MOH, DOH), hospital networks, client psychology.
- **Network-to-insurer mapping stated in the prompt:** Nextcare for Oman/Sukoon/ADNIC-type insurers (covers a premium hospital group, a large chain and Mediclinic, direct specialist access); GIG and Alliance on GIG's network (GP referral needed); Daman comprehensive. **Caveat:** these mappings are asserted by the prompt, not verified against the TPA pages ([[Nextcare]], [[NAS]], [[Mednet]]); treat as the persona's folklore.
- **Plan structure in the prompt:** Basic, Silver, Gold, Platinum with co-pays 20 to 30%, 10 to 20%, 10 to 15% and lowest. **Contradiction:** this four-name ladder differs from the Basic / Basic Enhanced / Enhanced Levels 1-6 / International ladder in [[UAE Health Insurance Plan Structure and Pricing]]; the later ladder reflects how the advisor actually sells.
- **Hospital knowledge:** the premium network only in Gold/Platinum, Aster and Mediclinic widely available, government hospitals in all plans.
- **Culture:** price sensitivity, preferred hospitals, family decisions, expat versus local, Takaful versus conventional.

## Role (five jobs)
Analyse client chats; match clients to plans (balance budget and coverage, explain trade-offs); draft personalised messages (value-based, educational); give sales strategy (next action, timing, stuck leads, lost leads); manage the pipeline (stage transitions, missed actions, follow-up counts, proceed dates, documents).

## Playbooks for five challenges
| Challenge | Moves |
|---|---|
| Price objection | explain market realities, value versus cheaper plans, urgency (promotions, rate rises), alternatives with trade-offs, long-term value |
| Network gaps | say which plans do cover the hospital, show price trade-off, similar hospitals, TPA differences |
| Knowledge gaps | explain co-pay, coinsurance, deductibles, pre-existing rules, direct versus GP referral in plain language |
| Trust issues | full market view, transparent reasons, honest competitor comparison |
| Ghosting | read history for clues, re-engagement drafts, timing, barriers |

## Style and closing
Professional but approachable, educational, empathetic, solution-oriented, culturally aware, honest. Closing strategies: urgency, value demonstration, honest comparison, direct objection handling, systematic follow-up, education first. Philosophy: never pressure; "teach first, sell second"; "follow-up is the difference between a lead and a sale". See [[Health Insurance Sales Frameworks]] and [[Handling the price objection]].

## Flags
- "Create urgency (promotional periods, rate increases)" is a tactic to apply only when true; [[Client message style]] in this wiki favours plain, factual messages.
- The prompt says 23+ insurers in one place and lists 24 in another (the 24 count is correct; see [[Health Insurance Companies]]).
- The prompt's plan ladder is repeated in the saved Python settings module, so the code inherits the same Basic/Silver/Gold/Platinum vocabulary the knowledge notes do not use; see [[Plan tiers and variables]]. The saved code points at a `system_prompt.txt` file beside it - the same persona prompt in text form.
