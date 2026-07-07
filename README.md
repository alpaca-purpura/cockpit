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

## Las tres zonas (CK-11)

- [`sistema/`](./sistema/) — el sistema as-code: arquitectura y despliegue
  (`sistema/arquitectura/`), método del servicio/auditor (`sistema/metodo/`), schemas de dominio
  (`sistema/schema/`).
- **Capabilities construidas** — código (`go/`, `ui/`) + [`docs/`](./docs/) (documentation-as-code;
  Product Increment en [`docs/increment.yaml`](./docs/increment.yaml), vista
  [`docs/INCREMENT.md`](./docs/INCREMENT.md)).
- [`proyecto/`](./proyecto/) — organización del trabajo: **System Backlog**
  ([`proyecto/backlog.yaml`](./proyecto/backlog.yaml), vista en
  [`proyecto/BACKLOG.md`](./proyecto/BACKLOG.md)) + research heredada
  ([`proyecto/research/`](./proyecto/research/)).

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
