"""
Startup Helper - Initialize WhatsApp Agent
Helper script to set up and start the WhatsApp agent
"""
import os
import sys
from pathlib import Path

def check_requirements():
    """Check if all requirements are installed"""
    try:
        import fastapi
        import uvicorn
        import sqlalchemy
        import requests
        import openai
        import loguru
        print("✅ All requirements installed")
        return True
    except ImportError as e:
        print(f"❌ Missing requirement: {e}")
        print("Run: pip install -r requirements.txt")
        return False

def check_env_file():
    """Check if .env file exists"""
    env_file = Path(".env")
    env_example = Path(".env.example")

    if not env_file.exists():
        print("❌ .env file not found")
        if env_example.exists():
            print("Creating .env from .env.example...")
            import shutil
            shutil.copy(".env.example", ".env")
            print("✅ .env created")
            print("⚠️  Please edit .env and add your API keys!")
        return False
    else:
        print("✅ .env file exists")
        return True

def create_directories():
    """Create necessary directories"""
    dirs = ["data", "logs"]
    for dir_name in dirs:
        dir_path = Path(dir_name)
        if not dir_path.exists():
            dir_path.mkdir(parents=True)
            print(f"✅ Created directory: {dir_name}")
        else:
            print(f"✅ Directory exists: {dir_name}")

def main():
    """Main startup function"""
    print("=" * 50)
    print("  WhatsApp Health Insurance Agent - Setup")
    print("=" * 50)
    print()

    # Check Python version
    print("🔍 Checking Python version...")
    if sys.version_info < (3, 10):
        print("❌ Python 3.10+ required")
        sys.exit(1)
    else:
        print(f"✅ Python {sys.version_info[0]}.{sys.version_info[1]}.{sys.version_info[2]}")

    print()
    print("📁 Creating directories...")
    create_directories()

    print()
    print("📦 Checking requirements...")
    if not check_requirements():
        sys.exit(1)

    print()
    print("🔐 Checking environment...")
    if not check_env_file():
        print()
        print("⚠️  Setup incomplete!")
        print("Please follow these steps:")
        print("1. Edit whatsapp_agent/.env file")
        print("2. Add your Evolution API URL and API key")
        print("3. Add your OpenAI or Anthropic API key")
        print("4. Run this script again")
        sys.exit(1)

    print()
    print("=" * 50)
    print("✅ Setup Complete!")
    print("=" * 50)
    print()
    print("🚀 To start the agent:")
    print("   cd whatsapp_agent")
    print("   python main.py")
    print()
    print("📱 API Endpoints available at:")
    print("   Webhook:  http://localhost:8000/webhook/whatsapp")
    print("   Drafts:  http://localhost:8000/api/drafts")
    print("   Health:    http://localhost:8000/health")

if __name__ == "__main__":
    main()
