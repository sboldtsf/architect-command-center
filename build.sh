#!/usr/bin/env bash
# Build the installer skill from dashboard.html.
#   1. (optional) run the smoke tests          npm test
#   2. minify to dist/dashboard.min.html       needs `npm install` once (terser); falls back to the readable file
#   3. copy the result into the skill and zip it as dist/architect-command-center-installer-v<version>.skill
set -euo pipefail
cd "$(dirname "$0")"
VER=$(grep -o 'APP_VERSION = "[0-9.]*' dashboard.html | grep -o '[0-9.]*$')
SK=skill/architect-command-center-installer
mkdir -p dist
SRC=dashboard.html
if command -v node >/dev/null 2>&1 && [ -d node_modules/terser ]; then
  node tools/minify.js dashboard.html dist/dashboard.min.html && SRC=dist/dashboard.min.html
  if [ -d node_modules/jsdom ]; then node tests/run.js "$SRC" >/dev/null && echo "Smoke tests passed on $SRC" || { echo "Smoke tests FAILED on $SRC"; exit 1; }; fi
else
  echo "Minifier not installed (run: npm install). Shipping the readable dashboard.html."
fi
cp "$SRC" "$SK/assets/dashboard.html"
rm -rf "$SK/scripts/__pycache__"
OUT="$PWD/dist/architect-command-center-installer-v${VER}.skill"
rm -f "$OUT"
(cd skill && zip -qr "$OUT" architect-command-center-installer)
echo "Built $OUT"
