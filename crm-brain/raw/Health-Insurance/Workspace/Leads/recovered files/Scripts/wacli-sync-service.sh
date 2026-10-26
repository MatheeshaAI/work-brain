#!/bin/bash

# wacli Background Sync Service
# Keeps WhatsApp messages synced continuously
# Usage: ./wacli-sync-service.sh [--daemon] [--idle-exit 30m]

set -e

# Configuration
STORE_DIR="${WACLI_STORE_DIR:-./.wacli-store}"
LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/wacli-sync.log"
PID_FILE="$LOG_DIR/wacli-sync.pid"
MAX_LOG_SIZE=10485760  # 10MB

# Create log directory
mkdir -p "$LOG_DIR"

# Function to rotate logs
rotate_logs() {
  if [[ -f "$LOG_FILE" ]] && [[ $(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE") -gt $MAX_LOG_SIZE ]]; then
    mv "$LOG_FILE" "$LOG_FILE.$(date +%s)"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Log rotated" > "$LOG_FILE"
  fi
}

# Function to log
log() {
  local message="$1"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $message" | tee -a "$LOG_FILE"
}

# Function to check auth status
check_auth() {
  if ! wacli auth status > /dev/null 2>&1; then
    log "ERROR: Not authenticated. Run 'wacli auth' first"
    return 1
  fi
  return 0
}

# Function to start sync
start_sync() {
  log "Starting wacli sync service..."

  if ! check_auth; then
    exit 1
  fi

  # Start sync with media download
  log "Syncing WhatsApp messages (continuous)..."
  wacli sync --follow --download-media >> "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"

  log "Sync started (PID: $(cat $PID_FILE))"
}

# Function to stop sync
stop_sync() {
  if [[ -f "$PID_FILE" ]]; then
    local pid=$(cat "$PID_FILE")
    log "Stopping sync (PID: $pid)..."
    kill $pid 2>/dev/null || true
    rm "$PID_FILE"
    log "Sync stopped"
  fi
}

# Function to status
show_status() {
  echo "=== wacli Sync Service Status ==="

  if [[ -f "$PID_FILE" ]]; then
    local pid=$(cat "$PID_FILE")
    if ps -p $pid > /dev/null 2>&1; then
      echo "✓ Status: Running (PID: $pid)"
    else
      echo "✗ Status: Stopped (stale PID file)"
      rm "$PID_FILE"
    fi
  else
    echo "✗ Status: Not running"
  fi

  if [[ -f "$LOG_FILE" ]]; then
    echo "📄 Log file: $LOG_FILE"
    echo "📊 Last 10 lines:"
    tail -10 "$LOG_FILE" | sed 's/^/  /'
  fi

  if wacli auth status > /dev/null 2>&1; then
    echo "✓ WhatsApp: Authenticated"
  else
    echo "✗ WhatsApp: Not authenticated"
  fi
}

# Main logic
case "${1:-start}" in
  start)
    rotate_logs
    start_sync
    ;;
  stop)
    stop_sync
    ;;
  restart)
    stop_sync
    sleep 1
    rotate_logs
    start_sync
    ;;
  status)
    show_status
    ;;
  logs)
    if [[ -f "$LOG_FILE" ]]; then
      tail -f "$LOG_FILE"
    else
      echo "No log file found"
    fi
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|logs}"
    exit 1
    ;;
esac
