#!/usr/bin/env bash
# Arranca el binario `directorio` (Stage 4 · CK-07) en foreground. Sin
# daemon/PID todavía — nada depende de este binario corriendo 24/7 hoy (ver
# products/cockpit/go/cmd/directorio, mismo trato simple que `go run`).
#
# Uso:
#   products/cockpit/start.sh [-port 4100] [-workspace PATH]
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR/go"
exec go run ./cmd/directorio "$@"
