#!/bin/bash
set -euo pipefail

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required. Install pnpm before running the harness bootstrap." >&2
  exit 1
fi

if [ ! -x node_modules/.bin/tsx ]; then
  pnpm install --frozen-lockfile
fi

if [ ! -f .env.local ] && [ -f .env.example ]; then
  cp .env.example .env.local
fi

pnpm check:harness
