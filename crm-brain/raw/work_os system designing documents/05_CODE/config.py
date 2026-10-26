"""
Configuration Settings for Health Insurance Sales Agent System
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Base Directory
BASE_DIR = Path(__file__).parent.absolute()

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

# Choose AI Provider: "openai" or "anthropic"
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai")

# Model Settings
if AI_PROVIDER == "openai":
    AI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4-turbo-preview")
    AI_TEMPERATURE = float(os.getenv("AI_TEMPERATURE", "0.7"))
    AI_MAX_TOKENS = int(os.getenv("AI_MAX_TOKENS", "2000"))
elif AI_PROVIDER == "anthropic":
    AI_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-3-opus-20240229")
    AI_TEMPERATURE = float(os.getenv("AI_TEMPERATURE", "0.7"))
    AI_MAX_TOKENS = int(os.getenv("AI_MAX_TOKENS", "2000"))

# Database
DATABASE_PATH = os.getenv("DATABASE_PATH", str(BASE_DIR / "data" / "leads_db.sqlite"))

# Data Directories
CLIENTS_DIR = BASE_DIR / "data" / "clients"
EXTRACTED_DIR = BASE_DIR / "data" / "extracted"
KNOWLEDGE_DIR = BASE_DIR / "knowledge"

# CRM Settings
CRM_URL = os.getenv("CRM_URL")
CRM_API_KEY = os.getenv("CRM_API_KEY")
CRM_USERNAME = os.getenv("CRM_USERNAME")
CRM_PASSWORD = os.getenv("CRM_PASSWORD")

# WhatsApp Settings
WHATSAPP_WEB_URL = "https://web.whatsapp.com"
WHATSAPP_HEADLESS = os.getenv("WHATSAPP_HEADLESS", "False").lower() == "true"
WHATSAPP_SCREENSHOT_DIR = BASE_DIR / "data" / "screenshots"

# Email Settings (for WhatsApp sync)
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_SERVER = os.getenv("EMAIL_SERVER", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))

# Pipeline Stages
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

# Follow-Up Settings
DEFAULT_FOLLOW_UP_ATTEMPTS = 5
FOLLOW_UP_INTERVAL_HOURS = int(os.getenv("FOLLOW_UP_INTERVAL_HOURS", "48"))
QUOTATION_FOLLOW_UP_HOURS = int(os.getenv("QUOTATION_FOLLOW_UP_HOURS", "48"))

# Sentiment Analysis Thresholds
POSITIVE_THRESHOLD = float(os.getenv("POSITIVE_THRESHOLD", "0.6"))
NEGATIVE_THRESHOLD = float(os.getenv("NEGATIVE_THRESHOLD", "0.4"))

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = BASE_DIR / "logs" / "agent.log"

# Dashboard Settings
DASHBOARD_HOST = os.getenv("DASHBOARD_HOST", "localhost")
DASHBOARD_PORT = int(os.getenv("DASHBOARD_PORT", "8501"))
DASHBOARD_DEBUG = os.getenv("DASHBOARD_DEBUG", "False").lower() == "true"

# Create necessary directories
for directory in [CLIENTS_DIR, EXTRACTED_DIR, KNOWLEDGE_DIR, WHATSAPP_SCREENSHOT_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Create logs directory
(BASE_DIR / "logs").mkdir(parents=True, exist_ok=True)

# Knowledge Base Files
NETWORKS_DB = KNOWLEDGE_DIR / "networks.json"
PLANS_DB = KNOWLEDGE_DIR / "plans.json"
INSURERS_DB = KNOWLEDGE_DIR / "insurers.json"
REGULATIONS_DB = KNOWLEDGE_DIR / "regulations.json"
TEMPLATES_DB = KNOWLEDGE_DIR / "templates.json"
OBJECTIONS_DB = KNOWLEDGE_DIR / "objections.json"

# System Prompt
SYSTEM_PROMPT_FILE = BASE_DIR / "system_prompt.txt"

# Supported Insurance Companies
INSURANCE_COMPANIES = [
    "Abu Dhabi National Insurance Company",
    "Abu Dhabi National Takaful Insurance",
    "Adamjee Insurance",
    "Alliance Insurance",
    "Cigna Insurance",
    "Dubai Insurance",
    "Fidelity United",
    "GIG Insurance",
    "Hayah Insurance",
    "IONSECURE Insurance",
    "Max Health",
    "NLGIC – Liva Insurance",
    "National General Insurance (NGI)",
    "National Health Insurance Company – Daman",
    "Orient Insurance",
    "Orient Takaful Insurance",
    "Orient UNB Insurance",
    "Orient-Allianz Insurance",
    "Qatar Insurance",
    "RAK Insurance",
    "Salama Insurance",
    "Sukoon Insurance",
    "Takaful Emarat Insurance",
    "Watania Takaful Insurance"
]

# Network Providers (TPAs)
NETWORK_PROVIDERS = [
    "Nextcare",
    "GIG",
    "Oman Insurance",
    "Daman",
    "AXA",
    "Cigna",
    "MetLife",
    "Allianz"
]

# Hospital Networks
HOSPITAL_NETWORKS = [
    "HealthHub",
    "Aster",
    "Mediclinic",
    "American Hospital Dubai",
    "Medeor",
    "NMC",
    "Burjeel",
    "Al Zahra",
    "Saudi German Hospital"
]

# Plan Tiers
PLAN_TIERS = [
    "Basic",
    "Silver",
    "Gold",
    "Platinum"
]

# Objection Types
OBJECTION_TYPES = [
    "Price",
    "Network",
    "Coverage",
    "Timing",
    "Trust",
    "Competitor",
    "Budget",
    "Pre-existing",
    "BMI"
]

# Client Types
CLIENT_TYPES = [
    "Individual",
    "Family",
    "Corporate",
    "Renewal"
]

# Inquiry Types
INQUIRY_TYPES = [
    "New Individual",
    "New Family",
    "Family with Kids",
    "For Kids",
    "For Parents",
    "Renewal",
    "Other"
]

# Document Types
DOCUMENT_TYPES = [
    "Emirates ID",
    "Passport",
    "Visa",
    "Medical Report",
    "BMI Report",
    "Pre-existing Proof"
]

# Application Status
APPLICATION_STATUS = [
    "Pending",
    "Underwriting",
    "Approved",
    "Rejected",
    "Waiting for Documents"
]

# Payment Status
PAYMENT_STATUS = [
    "Pending",
    "Initiated",
    "Completed",
    "Failed",
    "Refunded"
]

# Lost Reasons
LOST_REASONS = [
    "Price",
    "Network",
    "Coverage",
    "No Response",
    "Competitor",
    "Budget",
    "Timing",
    "Trust",
    "Other"
]
