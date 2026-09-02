#!/bin/zsh
set -euo pipefail

cd "$(dirname "$0")"
PORT="${1:-8765}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/policy-calculator-server.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM
sleep 1
open "http://127.0.0.1:${PORT}/index.html"
wait "$SERVER_PID"
