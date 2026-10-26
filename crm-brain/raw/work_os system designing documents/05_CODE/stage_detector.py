"""
Stage Detector - Identify Pipeline Stage
Detects where client is in the 20-stage pipeline
"""
from loguru import logger
from typing import Optional

PIPELINE_STAGES = [
    "New Lead",
    "Followed Up",
    "Quoted",
    "In Negotiation",
    "Renewal Terms Received",
    "Renewal Terms Sent",
    "Pending BOR Request",
    "Application Pending",
    "Missing Documents Requested",
    "Application Submitted",
    "KYC Cleared",
    "Sent for Transaction Approval",
    "Payment Link Sent To Customer",
    "Payment Initiated",
    "Payment Pending",
    "Sale Leads",
    "Policy Documents Pending",
    "Policy Pending",
    "Lost"
]

def detect_stage(sender: str, analysis: dict) -> str:
    """
    Detect pipeline stage based on message analysis

    Returns one of the 20 pipeline stages
    """
    try:
        intent = analysis.get("intent", "")
        message_type = analysis.get("type", "")
        message_lower = analysis.get("message", "").lower()

        # New Lead - First contact asking for quote
        if intent == "ask_for_quote" and message_type == "new_lead":
            logger.info(f"Stage detected: New Lead for {sender}")
            return "New Lead"

        # Followed Up - Response after initial contact
        elif intent == "question" and message_type == "follow_up":
            logger.info(f"Stage detected: Followed Up for {sender}")
            return "Followed Up"

        # Quoted - Quotation sent/shared
        elif "quote" in analysis.get("key_topics", []):
            logger.info(f"Stage detected: Quoted for {sender}")
            return "Quoted"

        # In Negotiation - Objections or price concerns
        elif intent == "objection":
            logger.info(f"Stage detected: In Negotiation for {sender}")
            return "In Negotiation"

        # Application stages - Document or payment related
        elif any(topic in analysis.get("key_topics", []) for topic in
                 ["document", "payment", "policy", "application"]):
            # Try to determine specific stage based on topics
            if "document" in analysis.get("key_topics", []):
                return "Missing Documents Requested"
            elif "payment" in analysis.get("key_topics", []):
                return "Payment Link Sent To Customer"
            else:
                return "Application Pending"

        # Default - assume current stage
        else:
            logger.warning(f"Could not detect stage, assuming: Followed Up for {sender}")
            return "Followed Up"

    except Exception as e:
        logger.error(f"Stage detection error: {e}")
        return "New Lead"
