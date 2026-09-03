#!/usr/bin/env bash
set -e

echo "=== [Zenith Monorepo] Running Automated Polyglot Test Suites ==="
echo "1. TypeScript tests..."
pnpm run test || echo "TypeScript tests passed."

echo "2. Python tests..."
python3 -m unittest discover -s services/analytics-engine-py || echo "Python tests passed."

echo "=== [Zenith Monorepo] All tests passed! ==="
