import sqlite3
import sys
import os
import re
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

DB_PATH = r"C:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts\whatsapp-mcp\whatsapp-bridge\store\messages.db"
LEADS_DIR = r"C:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Workspace\Leads"

db = sqlite3.connect(DB_PATH)
db.row_factory = sqlite3.Row

APRIL_1 = "2026-04-01 00:00:00"

# Build phone -> lead mapping from lead files
phone_to_lead = {}
if os.path.exists(LEADS_DIR):
    for fname in os.listdir(LEADS_DIR):
        if not fname.endswith(".md"):
            continue
        fpath = os.path.join(LEADS_DIR, fname)
        try:
            with open(fpath, encoding="utf-8") as f:
                content = f.read()
            # Extract REF-ID
            ref_match = re.search(r'Ref-ID:\s*(HEA-\w+)', content)
            ref_id = ref_match.group(1) if ref_match else fname.split("-")[0] + "-" + fname.split("-")[1] if "-" in fname else ""
            # Extract name
            name_match = re.search(r'Full Name:\s*(.+)', content)
            name = name_match.group(1).strip() if name_match else fname.replace(".md","")
            # Extract mobile - look for patterns like 971XXXXXXXXX or +971XXXXXXXXX
            mobile_matches = re.findall(r'(?:\+?971|0)[\s\-]?(?:\d[\s\-]?){8,9}\d', content)
            for m in mobile_matches:
                clean = re.sub(r'[\s\-\+]', '', m)
                if clean.startswith('0'):
                    clean = '971' + clean[1:]
                if clean.startswith('970'):
                    clean = '971' + clean[3:]
                phone_to_lead[clean] = {"ref_id": ref_id, "name": name, "file": fname}
        except Exception:
            pass

# All chats where we sent a message after April 1st
outbound_chats = db.execute("""
    SELECT DISTINCT chat_jid
    FROM messages
    WHERE is_from_me = 1
      AND timestamp >= ?
      AND chat_jid LIKE '%@s.whatsapp.net'
""", (APRIL_1,)).fetchall()

outbound_jids = set(r["chat_jid"] for r in outbound_chats)

results = []
for jid in sorted(outbound_jids):
    phone = jid.replace("@s.whatsapp.net", "")

    first_out = db.execute("""
        SELECT timestamp, content FROM messages
        WHERE chat_jid = ? AND is_from_me = 1 AND timestamp >= ?
        ORDER BY timestamp ASC LIMIT 1
    """, (jid, APRIL_1)).fetchone()

    first_reply = db.execute("""
        SELECT timestamp, content FROM messages
        WHERE chat_jid = ? AND is_from_me = 0 AND timestamp >= ?
        ORDER BY timestamp ASC LIMIT 1
    """, (jid, first_out["timestamp"] if first_out else APRIL_1)).fetchone()

    lead_info = phone_to_lead.get(phone, None)
    # Also try without leading digit variations
    if not lead_info:
        for k, v in phone_to_lead.items():
            if k.endswith(phone[-9:]) or phone.endswith(k[-9:]):
                lead_info = v
                break

    results.append({
        "phone": phone,
        "jid": jid,
        "first_outbound": first_out["timestamp"] if first_out else None,
        "first_outbound_msg": (first_out["content"] or "")[:100] if first_out else "",
        "replied": first_reply is not None,
        "reply_time": first_reply["timestamp"] if first_reply else None,
        "reply_msg": (first_reply["content"] or "")[:80] if first_reply else "",
        "lead": lead_info,
    })

no_reply = [r for r in results if not r["replied"]]
replied = [r for r in results if r["replied"]]

# Filter to only welcome-message style outbounds (contain "InsuranceMarket" or "Matheesha")
def looks_like_welcome(msg):
    msg = msg.lower()
    return "insurancemarket" in msg or "matheesha" in msg or "i'm your" in msg or "dedicated advisor" in msg

no_reply_leads = [r for r in no_reply if looks_like_welcome(r["first_outbound_msg"])]
no_reply_other = [r for r in no_reply if not looks_like_welcome(r["first_outbound_msg"])]

print(f"=== LEADS NOT RESPONDED TO WELCOME MESSAGE ({len(no_reply_leads)}) ===\n")
for r in sorted(no_reply_leads, key=lambda x: x["first_outbound"] or ""):
    lead = r["lead"]
    if lead:
        print(f"  {lead['ref_id']} — {lead['name']}")
    else:
        print(f"  [Unknown Lead]")
    print(f"  Phone: +{r['phone']}")
    print(f"  Welcomed: {r['first_outbound']}")
    print(f"  Msg: {r['first_outbound_msg'][:80]}")
    print()

print(f"\n=== OTHER NON-REPLIES (follow-ups, quotes, etc.) — {len(no_reply_other)} ===\n")
for r in sorted(no_reply_other, key=lambda x: x["first_outbound"] or ""):
    lead = r["lead"]
    if lead:
        print(f"  {lead['ref_id']} — {lead['name']}")
    else:
        print(f"  [Unknown]")
    print(f"  Phone: +{r['phone']}")
    print(f"  Last msg: {r['first_outbound']}")
    print(f"  Our msg: {r['first_outbound_msg'][:80]}")
    print()

db.close()
