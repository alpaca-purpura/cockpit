#!/usr/bin/env bash
# Builds the Cockpit Next.js UI as a static export for embedding in the
# `directorio` binary (Stage 4 · CK-07). Mirrors products/devhub/go/build-ui.sh
# — no API-stash step here: cockpit/ui never had app/api/* routes (it only ever
# talked to a Go backend via fetch), so there's nothing to hide during the build.
set -euo pipefail

UI_DIR="$(cd "$(dirname "$0")/ui" && pwd)"
EMBED_DIR="$(cd "$(dirname "$0")/go/cmd/directorio" && pwd)"

cd "$UI_DIR"
rm -rf .next out
COCKPIT_UI_STATIC=1 ./node_modules/.bin/next build

rm -rf "$EMBED_DIR/ui"
cp -r out "$EMBED_DIR/ui"
echo "✓ static UI exported to $EMBED_DIR/ui ($(du -sh "$EMBED_DIR/ui" | cut -f1))"
