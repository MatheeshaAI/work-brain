# Wikilink System Conventions

## Overview
All cross-references in this system use **short wikilinks** (filename only, no path). This enables Obsidian's graph view, backlinks, and click-through navigation.

## Wikilink Format
```
[[Filename]]
```
- No path prefix: `[[HEA-WXD99WYY-Mariamma-Jose]]` NOT `[[Workspace/Leads/.../HEA-WXD99WYY-Mariamma-Jose]]`
- Display text separator: `--` (double dash): `- [[Filename]] -- Display Name`

## Where Wikilinks Are Used

### Dashboard Files
| File | What Gets Wikilinked |
|------|---------------------|
| `Workspace/tasks.md` | Every lead reference in tables + checklists |
| `Workspace/PIPELINE.md` | Every REF-ID in tables + checklist items |
| `Workspace/RENEWALS.md` | Every renewal file reference + lead file reference |

### Folder Index Files
Every folder with `.md` files has an index file listing all contents as wikilinks:
- `Leads/Health Insurance/Individual-Health-Insurance/Individual-Health-Insurance.md`
- `Leads/Health Insurance/Group-Health-Insurance/Group-Health-Insurance.md`
- `Leads/Motor Insurance/Motor-Insurance.md`
- `Leads/Leads.md`
- `Leads/Renewals/Health Insurance/{Month}/{Month}-Health-Insurance.md`
- `Renewals/{Month}/{Month}-Renewals.md`

### Lead Files
Leads with active tasks have a `## Related Tasks` section:
```markdown
## Related Tasks
- [[tasks]] -- Task description (Due: YYYY-MM-DD, Priority)
```

### Renewal Files
Renewal files wikilink to their CRM lead file:
```markdown
- **IMCRM Lead:** [[HEA-JB8CU79K-Vishnu-Ramachandran]]
```

## Maintenance Rules

### Adding a New Lead
1. Create lead file in correct folder
2. Add wikilink to folder index: `- [[HEA-XXXX-Name]] -- Display Name`
3. Add wikilink to `PIPELINE.md` table
4. If task exists, add wikilink to `tasks.md` table + checklist
5. Add `## Related Tasks` section to lead file with `[[tasks]]` link

### Adding a Task
1. Add to `tasks.md` table with wikilink to lead
2. Add to `tasks.md` checklist with wikilink to lead
3. Add to `PIPELINE.md` daily checklist with wikilink
4. Add `## Related Tasks` section to lead file (if not present)

### Removing/Archiving a Lead
1. Remove wikilink from folder index
2. Remove from `PIPELINE.md`
3. Remove from `tasks.md` (if present)
4. Update any other files referencing the lead

### Moving a File
1. Remove wikilink from old folder index
2. Add wikilink to new folder index
3. Update all wikilink references in dashboard files

### Updating a Renewal
1. Update renewal file
2. Update `RENEWALS.md` with wikilink
3. Update `PIPELINE.md` with wikilink
4. Ensure CRM lead wikilink is present in renewal file

## Filename Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Individual Lead | `HEA-XXXXXXXX-First-Last.md` | `HEA-WXD99WYY-Mariamma-Jose.md` |
| Motor Lead | `CAR-XXXXXXXX-First-Last.md` | `CAR-V8VNHY6J-Veronica-Fanias.md` |
| Renewal (DIC) | `DIC-XXXXXX-First-Last.md` | `DIC-591571-Vishnu-Ramachandran.md` |
| Renewal (TE) | `TE-XXXXXXXXXX-First-Last.md` | `TE-3450982303-Alaya-Jamaldeen.md` |
| Renewal (Other) | `{Provider}-{Policy}-First-Last.md` | `HAYAH-B06958018E528F2B-Leoric-Zayn.md` |

## Display Name Extraction
To get display name from filename:
1. Remove `.md` extension
2. Remove `HEA-` or `CAR-` prefix
3. Remove 8-char REF_ID + hyphen
4. Replace hyphens with spaces
5. Example: `HEA-WXD99WYY-Mariamma-Jose.md` -> `Mariamma Jose`
