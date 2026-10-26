---
name: chatwoot-new-health-lead-contact
description: Creates a new contact in Matheesha's self-hosted Chatwoot from an Alfred CRM (imcrm.alfred.ae) health insurance lead, following his existing "{Client Name} - {REF-ID}" naming convention. Use this whenever Matheesha asks to add, create, or make a contact in Chatwoot for a lead or client — e.g. "make a new contact in chatwoot for this client", "add this lead to chatwoot", "create a chatwoot contact for this health lead", or when he has a lead open in the browser and wants it in Chatwoot. Also applies if he gives a HEA- ref-ID or CRM UUID directly instead of having the page open.
---

# Chatwoot New Health Lead Contact

Turns an Alfred CRM health lead into a Chatwoot contact, matching the naming convention already used across Matheesha's ~95 existing Chatwoot contacts.

## Step 1: Get the lead's details

**If a lead is already open in the browser** (built-in Claude Browser tool, tab origin `imcrm.alfred.ae`): read the page directly with `get_page_text` or `read_page` rather than going through any API/cookie flow — it's already right there in the DOM. This is the common case, since Matheesha usually has the lead pulled up while working it.

**If no lead is open and Matheesha gives a ref-ID or UUID instead**: fall back to the `alfred-crm` skill's Cookie Keeper + curl/Python flow to fetch `GET /quotes/health/{UUID}`.

From the lead page, pull:
- **Ref-ID** (e.g. `HEA-JQQMW9VT`) — top of the Health Detail page
- **Client full name** — `POLICYHOLDER FIRST NAME` + `POLICYHOLDER LAST NAME` fields (these are the Emirates-ID-style fields; use them over any nicer display name elsewhere on the page)
- **Mobile number** — `MOBILE NUMBER` field, keep the `+` country code prefix as shown
- **Email** — `EMAIL` field

If any of these are blank on the CRM page, ask Matheesha before proceeding rather than guessing or leaving them empty — a contact with a missing phone number is much harder to match to WhatsApp conversations later.

## Step 2: Build the contact name

Matheesha's contacts consistently follow **`{Client Full Name} - {REF-ID}`**, confirmed from real examples already in his Chatwoot:
- `Reginaldo Jr Bagain - HEA-423Z3X2Y`
- `Arshad Hossain - CAR-PFGRZRB8` (CAR- prefix for car leads, not relevant here but shows the pattern holds across lead types)
- `Dilshad  - Jamal's  Brother - HEA-MRHP9W85` (a relationship note can be appended before the ref-ID when the contact isn't the policyholder themself — not the default case, only follow this if Matheesha specifies the contact is someone other than the policyholder)

So for a standard health lead: `Adnan Ali Khan - HEA-JQQMW9VT`.

## Step 3: Check for an existing contact first

Before creating anything, search for a contact that might already exist for this phone number or name, to avoid duplicates:

```bash
chatwoot contacts --search="<phone_number>"
```

Set `$env:CHATWOOT_API_KEY` inline before every call in this environment — a fresh PowerShell process in this tool doesn't reliably inherit the persisted Windows user env var:

```powershell
$env:CHATWOOT_API_KEY = [System.Environment]::GetEnvironmentVariable("CHATWOOT_API_KEY","User")
```

If a matching contact already exists, tell Matheesha and stop — don't create a duplicate. If he wants it updated instead, that's a different (PATCH) operation, outside this skill's scope.

## Step 4: Confirm before creating

Creating a contact is a write operation. Show Matheesha the exact name, phone, and email you're about to submit and get a clear go-ahead before running anything — same rule as any other write against this CLI (see the account's Chatwoot CLI safety notes: replies, assigns, resolves, and raw POST/PATCH/DELETE calls all need confirmation first).

## Step 5: Create the contact

The CLI has no dedicated `contact create` subcommand — use the raw API passthrough:

```bash
chatwoot api -X POST /contacts --data '{"name":"Adnan Ali Khan - HEA-JQQMW9VT","phone_number":"+971588349743","email":"ic.adnan@gmail.com"}'
```

**Known quirk**: this specific call sometimes prints a bare `API error 400:` with no body, even though the contact was actually created successfully — the CLI's error handler seems to swallow the response. So after any 400 here:

1. Re-run `chatwoot contacts --search="<phone_number>"` to check whether it actually went through.
2. Only if it truly didn't get created, retry — don't retry blindly, since that risks creating a duplicate if the first attempt actually succeeded.
3. If you need to see the real error body (e.g. to diagnose a genuine validation failure), fall back to a direct HTTPS call, which does surface the body:

```powershell
try {
  Invoke-RestMethod -Uri "https://chatwoot-w9pq.srv1855388.hstgr.cloud/api/v1/accounts/1/contacts" -Method POST -Headers @{ "api_access_token" = $env:CHATWOOT_API_KEY; "Content-Type" = "application/json" } -Body '{"name":"...","phone_number":"...","email":"..."}'
} catch {
  $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
  $reader.ReadToEnd()
}
```

## Step 6: Confirm the result

After creating, do one final `chatwoot contacts --search=` to confirm exactly one contact exists with the expected name/phone, and report the new contact's ID back to Matheesha.
