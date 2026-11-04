#!/usr/bin/env bash
# Sync the dashboard into the installer skill and build the .skill package.
set -euo pipefail
cd "$(dirname "$0")"
VER=$(grep -o 'APP_VERSION = "[0-9.]*' dashboard.html | grep -o '[0-9.]*$')
SK=skill/architect-command-center-installer
cp dashboard.html "$SK/assets/dashboard.html"
rm -rf "$SK/scripts/__pycache__"
mkdir -p dist
OUT="$PWD/dist/architect-command-center-installer-v${VER}.skill"
rm -f "$OUT"
(cd skill && zip -qr "$OUT" architect-command-center-installer)
echo "Built $OUT"
