---
name: document-filer
description: File documents for a lead — scan Downloads, Screenshots, and .browseros/downloads for files belonging to the given lead, move and rename them descriptively, then update the lead's markdown file. Use when user says "file docs for [REF_ID]", "move documents", "organize docs for [lead]", or provides files and specifies which lead they belong to.
---

# Document Filer — Lead Document Organization

## When to Use
Triggered when the user wants to move and organize documents for a specific lead.

## Steps

### 1. Identify the lead and target folder
Resolve the REF_ID to: `Workspace/Documents/HEA-[CODE]-[First]-[Last]/`

Create the folder only if you have actual documents to move into it.

### 2. Scan source locations for matching files
Search for files belonging to this lead in:
- `C:\Users\Matheesha-IM.AE\Downloads\`
- `C:\Users\Matheesha-IM.AE\Pictures\Screenshots\`
- `C:\Users\Matheesha-IM.AE\.browseros\downloads\`

Match by lead name, REF_ID, or context provided by the user.

### 3. Visually identify each file
For image files (jpg, png, jpeg): view the file to identify:
- Document type (EID, Passport, Visa, Policy document, etc.)
- Person's name (if visible on the document)

For PDFs: infer type from filename or content preview.

### 4. MOVE files — never copy
```powershell
Move-Item -Path "<source-path>" -Destination "Workspace\Documents\[REF_ID]-[Name]\"
```
Always MOVE, never copy — source locations should be cleared after filing.

### 5. Rename descriptively
Apply naming pattern: `[FirstName]-[LastName]_[DocumentType].ext`

| Document | Type label |
|----------|-----------|
| Emirates ID front | `EID-Front` |
| Emirates ID back | `EID-Back` |
| Passport | `Passport` |
| Visa | `Visa` |
| Insurance comparison | `Insurance-Comparison` |
| Quotation | `Quotation` |
| Medical application form | `Medical-Application-Form` |
| Signed application | `Signed-Application` |
| E-Card | `E-Card` |
| Policy bond | `Policy-Bond` |
| Payment receipt | `Receipt` |

### 6. Update lead markdown file
Add or update a `## Documents` section in the lead's `.md` file listing all filed documents.

## Notes
- Always MOVE files, never copy — this keeps Downloads/Screenshots clean
- Do not create the Documents folder unless you have actual files to move
- Do not add unrequested analysis or comments
