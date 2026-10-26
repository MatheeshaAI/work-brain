---
name: pipeline-auditor
description: Cross-checks all lead markdown files against PIPELINE.md and RENEWALS.md for status mismatches, missing files, stale leads, and pipeline inconsistencies. Use when user says "audit pipeline", "check for inconsistencies", "pipeline check", "are the files in sync", or "run a pipeline audit".
---

# Pipeline Auditor — Consistency Check

## When to Use
Triggered when the user wants to verify that all lead files and pipeline records are complete and in sync.

⚠️ This skill is **READ-ONLY** — it reports issues but does NOT modify any files.

## Steps

### 1. Read the pipeline index files
- Read `Workspace/PIPELINE.md` — extract all REF_IDs, names, and statuses
- Read `Workspace/RENEWALS.md` — extract all renewal client entries and statuses

### 2. Scan lead files
- List all `.md` files in `Workspace/Leads/`
- For each file, extract the `Ref-ID:` and `Status:` fields

### 3. Scan renewal files
- List all `.md` files in `Workspace/Renewals/`
- For each file, extract the status field

### 4. Cross-check for each issue type

**Status mismatches:**
- Lead in PIPELINE.md with status X, but lead `.md` file says status Y
- Renewal in RENEWALS.md with status X, but renewal `.md` file says status Y

**Missing files:**
- REF_ID in PIPELINE.md but no `.md` file found in `Workspace/Leads/`
- Renewal entry in RENEWALS.md but no `.md` file found in `Workspace/Renewals/`

**Orphaned files:**
- `.md` file in `Workspace/Leads/` but no matching row in PIPELINE.md
- `.md` file in `Workspace/Renewals/` but no matching row in RENEWALS.md

**Stale leads:**
- Leads with no Pending Action defined
- Leads in "In Progress" status with no recent activity noted

### 5. Produce the audit report

```
PIPELINE AUDIT REPORT — [Today's Date]

STATUS MISMATCHES (N)
• [REF_ID] [Name] — PIPELINE.md: [status] | Lead file: [status]

MISSING LEAD FILES (N)
• [REF_ID] [Name] — in PIPELINE.md but no .md file found

ORPHANED FILES (N)
• [filename] — .md file exists but not referenced in PIPELINE.md

STALE LEADS (N)
• [REF_ID] [Name] — no pending action defined

✅ Clean entries: N
```

## Notes
- Do NOT modify any files — audit and report only
- The user can use `lead-updater` or `renewal-updater` to resolve any issues found
- Surface all issues — do not auto-fix anything
