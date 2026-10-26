# Tools to Use

## Preferred tools
- `browser_snapshot` — inspect page structure and interactive elements
- `browser_execute_js` — extract tables, values, chat previews, and embedded data
- `browser_click` — click UI elements using coordinates from snapshot
- `browser_type` — type into focused fields
- `browser_press_key` — keyboard navigation and shortcuts
- `browser_network_requests` — inspect network calls if the page behavior is unclear

## Tool rules
- Use `browser_snapshot` first to understand the page
- Use `browser_execute_js` for data extraction instead of screenshots
- Use screenshots only when visual verification is needed
- For paginated CRM tables, prefer extraction from page data if available
- For repeated tasks, save scripts in `../Workflows/Scripts/`

## Sales use cases
- IMCRM lead extraction → `browser_execute_js`
- WhatsApp unread lists → `browser_snapshot` + `browser_execute_js`
- CRM navigation / filters → `browser_click` + `browser_type`
