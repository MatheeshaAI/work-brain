# agent.md

This file provides guidance to all subagents working within this Insurance Sales Workflow Management System.

## Subagent Rules

When you are dispatched to handle a task, follow these rules:

### 1. Read CLAUDE.md First
- Check CLAUDE.md for the delegation table, workflows, and file structures
- Follow all naming conventions and formatting standards
- Use the exact SOP templates provided in `Workspace/SOPs/`

### 2. Work with Files Directly
- You have full access to read and write files
- Update PIPELINE.md, RENEWALS.md, and lead files as directed
- Create and organize documents in the correct folders
- Verify paths against the actual repo before writing

### 3. Memory System
All subagents should maintain the memory system:

**During your work:**
- Add important findings, decisions, and task outcomes to `Memory/21-05-2026.md` (or today's dated file)
- Record blockers, errors, learnings, and context that might help future work

**When user asks to remember something:**
- Create a persistent memory file (e.g., `Chrome-extension.md`) with proper frontmatter
- Add the file to `Memory/MEMORY.md` index
- This knowledge becomes available to all agents in future sessions

### 4. Self-Contained Prompts
When the orchestrator (Claude) dispatches you:
- You receive a self-contained prompt with all context you need
- REF_ID, client name, specific action, and extra details are included
- You should not need to ask the orchestrator for clarification

### 5. Report Back Clearly
After completing your work:
- Return a clear summary of what was done
- List files created/updated
- Note any blockers or issues
- Share any learnings that should go in the session file

## Common Subagent Tasks

| Task | What to Do |
|------|-----------|
| Onboard new lead | Create lead file, document folder, update PIPELINE.md |
| File documents | Organize, rename, and update lead's document inventory |
| Update lead status | Update lead markdown, move in PIPELINE.md, update pending action |
| Send WhatsApp | Use MCP tools or REST API; log message in session file |
| Draft FTC email | Use template, output as .txt, save to Documents folder |
| Book policy | Verify documents, update lead status, record in PIPELINE.md |
| Update renewal | Update renewal markdown, move in RENEWALS.md, update PIPELINE.md |
| Check renewals | Scan RENEWALS.md, return status report |
| Morning briefing | Read PIPELINE.md checklist, return today's priorities |
| Audit pipeline | Check lead files vs PIPELINE.md, report inconsistencies |

## File Structure Quick Reference

```
Workspace/
  ├── PIPELINE.md              (Master dashboard - update status, pending actions, checklist)
  ├── RENEWALS.md              (Renewal pipeline - organize by month/status)
  ├── Leads/                   (Lead markdown files: HEA-XXXX-Name.md)
  ├── Renewals/                (Renewal files: Provider-PolicyNum-Name.md)
  ├── Documents/               (Lead folders: HEA-XXXX-Name/)
  ├── SOPs/                    (Templates: use exact format)
  └── [other folders...]       (Knowledge Base, Plans, Networks, Reports, etc.)
```

## Key Conventions

- **Lead files:** `Workspace/Leads/[REF_ID]-[First_Name]-[Last_Name].md`
- **Renewal files:** `Workspace/Renewals/[Provider]-[PolicyNumber]-[First]-[Last].md`
- **Document folders:** `Workspace/Documents/[REF_ID]-[Lead Name]/`
- **Statuses (Leads):** "Policy Booked", "Quoted", "Followed Up", etc. (match IMCRM)
- **Statuses (Renewals):** `Due` → `Contacted` → `Quote Sent` → `Payment Pending` → `Renewed`/`Lapsed`

## When in Doubt

1. Check CLAUDE.md for the specific workflow
2. Read the SOP template if one applies
3. Look at existing lead files for format examples
4. Add findings to the session file
5. Report back to the orchestrator with what you found and what you did

---

**Remember:** You are specialized for your task. Do it well, document it clearly, and help the memory system grow.
