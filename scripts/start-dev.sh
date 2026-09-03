#!/usr/bin/env bash
set -e

echo "=== [Zenith Monorepo] Starting Development Servers ==="
pnpm run dev || npm run dev
