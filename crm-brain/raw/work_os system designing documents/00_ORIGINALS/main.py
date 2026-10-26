"""
Health Insurance Sales Agent System - Main Entry Point
"""

import sys
from pathlib import Path

# Add project root to Python path
BASE_DIR = Path(__file__).parent.absolute()
sys.path.insert(0, str(BASE_DIR))

from loguru import logger
from config import LOG_LEVEL, LOG_FILE, DASHBOARD_HOST, DASHBOARD_PORT

# Configure logging
logger.remove()
logger.add(
    LOG_FILE,
    rotation="500 MB",
    retention="10 days",
    level=LOG_LEVEL,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
)
logger.add(
    sys.stdout,
    level=LOG_LEVEL,
    format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <level>{message}</level>"
)


def print_banner():
    """Print application banner"""
    banner = """
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   HEALTH INSURANCE SALES AGENT SYSTEM                            ║
║   Powered by 20-Year UAE Insurance Expert AI                     ║
║                                                                  ║
║   Version: 1.0.0                                                  ║
║   Status: Development Mode                                        ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
"""
    print(banner)


def print_menu():
    """Print main menu"""
    menu = """
╔══════════════════════════════════════════════════════════════════╗
║                        MAIN MENU                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  1. Analyze Client WhatsApp Chat                                 ║
║  2. Generate Follow-up Message                                   ║
║  3. Match Client to Insurance Plans                              ║
║  4. Get Pipeline Recommendations                                  ║
║  5. Analyze Lost Lead                                            ║
║  6. Start WhatsApp-to-Email Sync                                  ║
║  7. View Client Dashboard                                         ║
║  8. Exit                                                          ║
╚══════════════════════════════════════════════════════════════════╝
"""
    print(menu)


def main():
    """Main application entry point"""
    print_banner()
    logger.info("Starting Health Insurance Sales Agent System...")

    # TODO: Initialize database
    # TODO: Load knowledge base
    # TODO: Check API keys

    logger.info("System initialized successfully")
    logger.info(f"Dashboard will be available at http://{DASHBOARD_HOST}:{DASHBOARD_PORT}")

    # Main application loop
    while True:
        print_menu()
        choice = input("\nSelect an option (1-8): ").strip()

        if choice == "1":
            logger.info("Option selected: Analyze Client WhatsApp Chat")
            # TODO: Implement chat analysis
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "2":
            logger.info("Option selected: Generate Follow-up Message")
            # TODO: Implement message drafter
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "3":
            logger.info("Option selected: Match Client to Insurance Plans")
            # TODO: Implement network matcher
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "4":
            logger.info("Option selected: Get Pipeline Recommendations")
            # TODO: Implement pipeline advisor
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "5":
            logger.info("Option selected: Analyze Lost Lead")
            # TODO: Implement lost analyzer
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "6":
            logger.info("Option selected: Start WhatsApp-to-Email Sync")
            # TODO: Implement WhatsApp sync
            print("\n🚧 Feature coming soon in Phase 1\n")

        elif choice == "7":
            logger.info("Option selected: View Client Dashboard")
            # TODO: Launch Streamlit dashboard
            print("\n🚧 Dashboard coming soon in Phase 4\n")

        elif choice == "8":
            logger.info("Exiting...")
            print("\n👋 Goodbye! Have a great day!\n")
            sys.exit(0)

        else:
            print("\n❌ Invalid option. Please select 1-8.\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        logger.info("Interrupted by user")
        print("\n\n👋 Goodbye!")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        print(f"\n❌ Error: {e}")
        sys.exit(1)
