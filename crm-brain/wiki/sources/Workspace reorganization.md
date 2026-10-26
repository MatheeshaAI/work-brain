---
type: source
sources: ["raw/Health-Insurance/Context/WORKSPACE_REORGANIZATION.md"]
updated: 2026-10-22
tags: [workspace, structure, operations]
summary: "The 23-Apr-2026 split of the vault into a daily working area (Workspace) and operational infrastructure at the root."
---
# Source: Workspace reorganization

Original file: [[raw/Health-Insurance/Context/WORKSPACE_REORGANIZATION.md|WORKSPACE_REORGANIZATION.md]]. Dated **23 Apr 2026**, status "complete". The note records a one-off restructuring of the vault into a working area and an infrastructure area.

## The split
**Everything you work with directly** moved into `Workspace/`:
- `Leads/` - lead files
- `Documents/` - one folder per client
- `Renewals/` - renewal files
- `Sales Reports/` - CSV exports from the CRM
- `SOPs/` - merged from two folders that had both been called `SOP's` and `SOPs`
- `PIPELINE.md` - master dashboard
- `RENEWALS.md` - renewals tracker
- `RENEWALS-May-2026.md`

**Operational infrastructure stayed at the root:** `Scripts/` (WhatsApp and CRM automation), `Workflows/` (process documentation), `Dashboard/` (a Node.js dashboard app), `wacli/` (the WhatsApp CLI), `logs/`, the project instruction file, and all the setup/migration notes.

## Counts quoted in the note (as of 23 Apr 2026)
- 50 lead files, 63 client document folders, 18 renewal files, 8 CSV exports.
- These are dated counts; the lead folder grew well past 50 afterwards - see [[Individual Health Insurance leads index]].

## Path changes it forced
| Action | Before | After |
|---|---|---|
| Send a WhatsApp file | `Documents/[Lead]/Quote.pdf` | `Workspace/Documents/[Lead]/Quote.pdf` |
| Create a lead | `Leads/[REF_ID]-[Name].md` | `Workspace/Leads/[REF_ID]-[Name].md` |
| Add an SOP | `SOP's/` or `SOPs/` | `Workspace/SOPs/` |
| View the pipeline | `PIPELINE.md` | `Workspace/PIPELINE.md` |

The project instruction file was updated so every path reference uses the `Workspace/` prefix, and the WhatsApp command examples were rewritten for the new paths.

## Why it matters for the wiki
- It explains why the same artefact appears at two paths in different notes: the setup notes in `Context/` still use the pre-move paths, while the newer notes use `Workspace/`. Path drift between notes is a known artefact, not a mistake to "fix".
- It is the concrete instance of the idea on [[Workspace and infrastructure separation]], and it matches the "one folder per stage, outputs in a known place" pattern described in [[Context engineering]].

Related: [[Workspace and infrastructure separation]], [[Insurance Dashboard]], [[Lead pipeline stages]], [[Context notes folder]].
