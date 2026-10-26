"""
AI Analyzer Wrapper Functions
Convenience functions for AI operations
"""
from integrations.ai_client import AIClient
from loguru import logger

# Global AI client instance
_ai_client = None

def init_ai_client(provider: str, api_key: str, model: str):
    """Initialize global AI client"""
    global _ai_client
    try:
        _ai_client = AIClient(provider, api_key, model)
        logger.success("AI client initialized")
    except Exception as e:
        logger.error(f"Failed to initialize AI client: {e}")
        raise

def analyze_message(sender: str, message: str) -> dict:
    """Analyze incoming WhatsApp message"""
    global _ai_client
    if _ai_client is None:
        logger.error("AI client not initialized")
        return {
            "sentiment": "neutral",
            "intent": "other",
            "type": "follow_up",
            "urgency": "medium",
            "key_topics": [],
            "needs_response": True
        }

    try:
        logger.info(f"Analyzing message from {sender}")
        result = _ai_client.analyze_message(sender, message)
        logger.info(f"Analysis result: {result}")
        return result
    except Exception as e:
        logger.error(f"Analysis error: {e}")
        return {
            "sentiment": "neutral",
            "intent": "other",
            "type": "follow_up",
            "urgency": "medium",
            "key_topics": [],
            "needs_response": True
        }
