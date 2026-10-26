"""
AI Drafter - Generate and Refine Messages
"""
from integrations.ai_client import AIClient
from loguru import logger

# Global AI client instance
_ai_client = None

def init_ai_client(provider: str, api_key: str, model: str):
    """Initialize global AI client"""
    global _ai_client
    _ai_client = AIClient(provider, api_key, model)

def generate_draft(analysis: dict, stage: str, original_message: str) -> str:
    """Generate personalized draft response"""
    global _ai_client
    if _ai_client is None:
        logger.error("AI client not initialized")
        return "Thank you for your message. I'll review it and get back to you shortly."

    try:
        logger.info(f"Generating draft for stage: {stage}")
        draft = _ai_client.generate_draft(analysis, stage, original_message)
        logger.info(f"Draft generated: {draft[:100]}...")
        return draft
    except Exception as e:
        logger.error(f"Draft generation error: {e}")
        return "Thank you for your message. I'll review it and get back to you shortly."

def refine_message(original: str, instructions: str) -> dict:
    """Refine message based on user instructions"""
    global _ai_client
    if _ai_client is None:
        logger.error("AI client not initialized")
        return {
            "message": original,
            "reasoning": "Could not refine, using original"
        }

    try:
        logger.info("Refining message with AI")
        result = _ai_client.refine_message(original, instructions)
        logger.info("Refinement complete")
        return result
    except Exception as e:
        logger.error(f"Refinement error: {e}")
        return {
            "message": original,
            "reasoning": "Could not refine, using original"
        }
