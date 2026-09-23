#!/bin/bash
# Kills any process already running for this app, then starts fresh.
# Usage:
#   ./start.sh          -> dev server (default port 3000)
#   ./start.sh build    -> production build + start
#   PORT=4000 ./start.sh -> use a different port

set -e
cd "$(dirname "$0")"
PROJECT_DIR="$(pwd)"

PORT="${PORT:-3000}"
MODE="${1:-dev}"
SELF_PID=$$

echo "Stopping anything already running for this app..."

# 1. Kill whatever is bound to the port (and a few ports after it, in case
#    Next previously auto-bumped to avoid a conflict).
for p in $(seq "$PORT" $((PORT + 5))); do
  PID="$(lsof -ti tcp:$p 2>/dev/null || true)"
  if [ -n "$PID" ]; then
    echo "Killing process $PID on port $p"
    kill -9 $PID 2>/dev/null || true
  fi
done

# 2. Next.js (Turbopack) can keep a background dev process alive that isn't
#    tied to a port at all, which is what causes "Another next dev server
#    is already running" even after the port is free. Find and kill any
#    process whose command line references this exact project folder,
#    but never kill ourselves or our own parent shell.
for PID in $(pgrep -f "$PROJECT_DIR" 2>/dev/null || true); do
  if [ "$PID" != "$SELF_PID" ] && [ "$PID" != "$PPID" ]; then
    echo "Killing stray process $PID for this project"
    kill -9 "$PID" 2>/dev/null || true
  fi
done

# 3. Clear Next's dev lock/cache so it can't refuse to start over a stale lock.
rm -rf .next/dev 2>/dev/null || true

sleep 1

if [ "$MODE" = "build" ]; then
  echo "Building for production..."
  npx next build
  echo "Starting production server on port $PORT..."
  exec npx next start -p "$PORT"
else
  echo "Starting dev server on port $PORT..."
  exec npx next dev -p "$PORT"
fi
