---
description: analyze documents (PDFs, images) in a directory and rename them based on personal details and document type
---
# /rename-documents

Use this command to analyze documents (PDFs, PNGs, JPGs, etc.) in a specified directory and rename them based on the first name, last name, and document type extracted from their content.

## Workflow steps

1. **List Files**: List all files in the target directory (e.g., `@[Directory Name]`).
2. **Analyze Content**: For each file (PDF or Image), use the `view_file` tool to examine its contents.
3. **Identify Details**: Extract the individual's **First Name**, **Last Name**, and the **Document Type** (e.g., Emirates ID, Passport, Residence Visa, Bill, Certificate, etc.).
4. **Rename**: Rename each file using the format: `[First Name] [Last Name] - [Document Type].[extension]`.

## Example
If an image `IMG_5678.png` is a scan of "Jane Smith's" Passport, it should be renamed to `Jane Smith - Passport.png`.

