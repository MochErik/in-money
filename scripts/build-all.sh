#!/usr/bin/env bash
set -e

echo "=== [Zenith Monorepo] Building all packages and apps ==="
pnpm install || npm install
pnpm run build || npm run build

echo "=== [Zenith Monorepo] Build completed successfully ==="
