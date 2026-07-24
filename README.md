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

## Cómo está organizado el repo (CK-28)

- [`sistema/`](./sistema/) — el producto as-code (fuente, no documentación): arquitectura y
  despliegue (`sistema/arquitectura/`), método del consultor (`sistema/metodo/`), schemas de
  dominio (`sistema/schema/`). SSoT hand-authored + generadores + vistas generadas, validado por
  gates pre-commit.
- **Código** — `go/` + `ui/` (detalle abajo).
- [`docs/`](./docs/) — todo el conocimiento del proyecto (mapa completo en
  [`docs/README.md`](./docs/README.md)): `product/` (SSoT del qué se construye — historias,
  capabilities, releases), `research/` (SOTA vivo), `process/` (proceso de desarrollo + registros
  vivos), `architecture/` (lecturas de arquitectura para humanos).

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
