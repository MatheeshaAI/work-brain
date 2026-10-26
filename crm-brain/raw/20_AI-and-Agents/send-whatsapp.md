---
description: Send a WhatsApp message to a specific phone number.
---

# Workflow: Send WhatsApp

This workflow allows you to send a WhatsApp message to a client or colleague using the local Playwright integrated tool.

## Steps:

1. **Verify Number**: Ensure the phone number is provided in international format (e.g., 971501234567).
2. **Run Script**:
// turbo
   `python send_whatsapp.py "{{phone_number}}" "{{message}}"`
3. **QR Code Step**: If this is the first time running, a browser window will open. **You must scan the QR code within 60 seconds** to authenticate.
4. **Completion**: Once sent, the browser will close automatically.

---

*Tip: You can just say "send whatsapp to 97150xxxxxx saying Hello" to trigger this.*
