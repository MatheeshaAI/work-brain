---
type: concept
sources: ["raw/20_AI-and-Agents/rename-documents.md"]
updated: 2026-10-22
tags: [documents, naming, automation]
summary: "Client documents arrive as camera images and PDFs with meaningless names."
---
# Document renaming workflow

Client documents arrive as camera images and PDFs with meaningless names. The workflow in [[rename-documents]] has an agent read each file and rename it `First Last - Document Type.ext` (passport, Emirates ID, visa, bill, certificate).

Why: it makes a client folder scannable and matches the lists in [[Policy submission documents]] and [[Document request handling]]. Compare the lead naming rules in [[Lead file naming]].

Risks: identity data is handled by the model; errors in OCR names would mislabel files; duplicates and non-person documents are not specified. Keep outputs out of the wiki.
