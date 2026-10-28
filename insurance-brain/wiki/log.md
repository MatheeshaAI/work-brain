# Log

Append-only history. Line format: `## [YYYY-MM-DD] ingest | <title>` (also `query`, `lint`, `migrate`). Earlier history is in PKM-Work `wiki/log.md`.

## [2026-10-26] migrate | Built from PKM-Work (Brain-Work)
Pages for this brain copied from PKM-Work's wiki, sorted by the rule in `../CLAUDE.md` (insurance-brain = what the desk sells; crm-brain = how it sells and tracks; commissions in crm-brain). General AI tooling and marketing pages were left in PKM-Work; links to them became stubs that say so. Pages shared by both brains live in one brain with a stub in the other. In-place source paths (Health-Insurance/, Insurance Workspace/, work_os, copilot) were moved under `raw/` and citations rewritten to match. Only cited raw files were copied; files containing credentials stayed in PKM-Work (listed in `raw/README.md`). Index regenerated from frontmatter summaries; overview rewritten for this brain.

## [2026-10-28] lint | Naming, duplicate merges and stub cleanup
- Deleted 24 "Not migrated" stubs. Their pages stay in PKM-Work; the links and index lines that pointed to them were removed.
- Merged duplicates: ADNIC stub into Abu Dhabi National Insurance Company; Live Insurance into Takaful Emarat Insurance (retail name, recorded as an inference); QIC into Qatar Insurance Company.
- Renamed insurers to end in "Insurance" (old names kept as aliases): Takaful Emarat, Orient Takaful, Orient-Allianz, Cigna, Max Health, Adamjee, DIC-Viventa, Fidelity United, Daman, BUPA, Watania Takaful, NLGIC Liva, Abu Dhabi National Takaful, ISONSECURE, April Hayah.
- Added Orient Insurance Group as the parent of Orient Insurance, Orient Takaful Insurance and Orient-Allianz Insurance.
- Naming rule added to CLAUDE.md.
- Left open: 72 crm-brain stubs (decision deferred by owner); Sukoon Insurance and Oman Insurance (sources conflict on whether they are the same insurer); Sources index count (54) does not match the 86 files in wiki/sources.
