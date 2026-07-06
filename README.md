# Cockpit

Sistema para el levantamiento, diseño, creación, propagación/adopción, monitoreo y mejora continua
de procesos · roles · objetivos · personas (puestos), basado en buenas prácticas ISO (ontología +
PDCA, sin el aparato de certificación).

> Repo graduado (2026-07-06) de la célula P1 del monorepo `prenter-harness`. Visión ampliada
> firmada el mismo día (CK-10).

## Documentos norte

- Visión — [`VISION.md`](./VISION.md)
- Decisiones — [`LEDGER.md`](./LEDGER.md) (fichas `CK-NN` — historia CK-01..CK-09 en la incubadora
  `prenter-harness`)
- Investigación y mockups heredados — [`docs/research/`](./docs/research/) ·
  [`docs/mockups/`](./docs/mockups/) · [`docs/architecture/`](./docs/architecture/) ·
  [`docs/methodology/`](./docs/methodology/)

## Código

- `go/` — módulo Go `cockpit` (handlers `/api/portfolio` + `/api/negocio`) + binario propio
  `go/cmd/directorio` (puerto 4100).
- `ui/` — Next.js standalone (puerto 4101 en dev; export estático embebido en el binario para
  producción vía `./build-ui.sh`).

Arrancar en dev: `./start.sh` (Go, puerto 4100) + `cd ui && pnpm dev` (Next, puerto 4101, con
rewrites hacia el backend Go).

## Arnés de construcción

Kit dev: plugin `harness@prenter-marketplace` (canal estable).

Privado — © Alpaca Púrpura / Prenter.
