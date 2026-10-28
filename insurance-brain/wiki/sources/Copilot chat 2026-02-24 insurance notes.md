---
type: source
sources: ["raw/copilot/copilot-conversations/hey@20260224_190604.md"]
updated: 2026-10-22
tags: [obsidian, copilot, insurance, documents]
summary: "24 Feb 2026 Copilot chat that formats a list of 24 UAE health insurers and drafts a 'Required Documents For Policy Submission' note."
---
# Copilot chat 2026-02-24 insurance notes

A conversation in the Obsidian Copilot chat panel (model `qwen/qwen3-32b` via Groq; the first request failed because no OpenRouter key was set for the default Gemini model). Active note when asked: "Insurance Companies.md". Runs 19:06 to 19:48.

## What was asked and produced
1. **Insurer list.** The owner pasted 24 health insurers and asked for a proper list with links to future per-insurer plan notes. The model returned them as wikilinks. Names include Abu Dhabi National Insurance, Abu Dhabi National Takaful, [[Adamjee Insurance]], Alliance, Cigna, [[Dubai Insurance]], Fidelity United, GIG (formerly AXA), Hayah, ISONSECURE, Max Health (a Dubai Insurance product), NLGIC-Liva, NGI, Daman, three Orient entities plus Orient-Allianz, Qatar Insurance ([[Qatar Insurance Company]]), RAK, Salama, Sukoon (formerly Oman Insurance, see [[Sukoon Insurance]]), [[Takaful Emarat Insurance]] and Watania Takaful. The vault's own list is in [[Health Insurance Companies]].
2. **Required documents note.** Drafted a note, later refined: member and sponsor passport, visa and Emirates ID, plus the medical application form; extra company documents when an employer buys the policy (trade licence, VAT certificate, establishment card); newborn rules (birth certificate and discharge summary, not requested after one year; a paediatrician's fitness certificate if the discharge summary is from the home country). Captured as [[Policy submission documents]].

## Caveats
- The model only offered to create the notes ("would you like me to create this"); whether they were saved is not shown.
- The newborn and company-document rules are the owner's statements, "may vary by insurer" per the model's own note. Insurer-specific variants are unrecorded.
- No client data in the chat.

## Reusable lesson
The owner drove a long piece of work with a sequence of short, single-purpose instructions rather than one request: paste a plain list and ask for it as wikilinks, ask for a new note, then ask for the extra sections to be added. Each step produced a finished artefact that could be checked before the next one.

Two things carried over:
- **Pasted plain text became links.** Asking for "a list prperlu" with wikilinks produced a set of note stubs that later point at real notes ([[Health Insurance Companies]]). The vault's wikilink habit is what makes this work - see Wikilink conventions.
- **The model proposes, the owner approves.** Every reply ended with "would you like me to create this", so nothing landed in the vault without a yes. That is the approval-gate habit applied to note creation.

This is the Prompt library pattern in use: one job per instruction, output checked before the next step. See [[Policy submission documents]] for where the second half of the chat ended up.

