# tools/

Skills, subagents and apps for the CRM desk. Not wiki sources: do not ingest.

## skills/
From the owner's Claude account: `alfred-lead-checker`, `chatwoot-new-health-lead-contact`, `motor-booking-email`, `motor-document-extraction`.
From PKM-Work `Health-Insurance/.claude/skills/`: `alfred-crm`, `alfred-lead-status-update`, `daily-briefer`, `document-filer`, `ftc-drafter`, `lead-onboarder`, `lead-updater`, `pipeline-auditor`, `policy-booker`, `project-conventions`, `renewal-scanner`, `renewal-updater`, `whatsapp-lead-checker`, `whatsapp-sender`.
From PKM-Work `work_os system designing documents/`: `whatsapp.skill`.

Note: the account versions of `alfred-crm` and `alfred-lead-status-update` are longer and newer, but they contain credentials, so the shorter workspace versions are used here.

## agents/
Subagent definitions from PKM-Work `Health-Insurance/.claude/agents/`.

## apps/
| Folder | From PKM-Work | Wiki page |
|---|---|---|
| `IMCRM Data Extractor` | `Health-Insurance/IMCRM Data Extracting Extention` | [[IMCRM Data Extractor]] |
| `Insurance Dashboard` | `Health-Insurance/Dashboard` | [[Insurance Dashboard]] |
| `IMCRM Scripts` | `Health-Insurance/Scripts` (without `temp_docs`, which held client ID documents) | [[Sales Automation]] |
| `InsureCRM` | `raw/30_Projects/InsureCRM 1` | [[InsureCRM]] |
| `Sales System` | `Insurance Workspace/Sales-System` | [[Sales System]] |
| `Work OS code` | `work_os system designing documents/05_CODE` | [[Work OS]] |

`node_modules` and `.env` files were not copied. Run `npm install` inside an app before using it.
