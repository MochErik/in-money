#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_ZIP="${PROJECT_DIR}/zenith_tactile_financial_monorepo.zip"

echo "=== Packaging Zenith Monorepo to ZIP archive ==="
cd "${PROJECT_DIR}"

rm -f "${OUTPUT_ZIP}"
zip -r "${OUTPUT_ZIP}" . \
  -x "node_modules/*" \
  -x "*/node_modules/*" \
  -x ".turbo/*" \
  -x "*/.turbo/*" \
  -x "dist/*" \
  -x "*/dist/*" \
  -x ".git/*" \
  -x "*.DS_Store" \
  -x "zenith_tactile_financial_monorepo.zip"

echo "=== ZIP Package created successfully: ${OUTPUT_ZIP} ==="
ls -lh "${OUTPUT_ZIP}"
