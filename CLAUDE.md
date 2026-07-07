# Cockpit

Producto standalone (graduado del monorepo `prenter-harness`, 2026-07-06 — ficha ecosistema en
`tooling/strategy/LEDGER.md` de allá, ficha de graduación CK-09 en `products/cockpit/LEDGER.md`,
congelado). Norte = [`VISION.md`](./VISION.md) · registro = [`LEDGER.md`](./LEDGER.md) — continúa
la numeración `CK-NN` de la célula original (arranca en CK-10 aquí).

**Qué es:** sistema para el levantamiento, diseño, creación, propagación/adopción, monitoreo y
mejora continua de procesos/roles/objetivos/personas(puestos), basado en buenas prácticas ISO
(ontología + PDCA, sin el aparato de certificación — ver VISION.md §ISO). Flujo: ingesta
multi-fuente → As-Is → To-Be → proyectos desde la brecha.

**Organización — la tríada (CK-11, "nacemos ordenados"):**
- `sistema/` — el sistema as-code: arquitectura/despliegue, método del auditor, schemas. Cambiarlo
  = decisión → ficha `CK-NN` en el mismo evento.
- Capabilities construidas — código (`go/`, `ui/`) + `docs/` (documentation-as-code; registro
  funcional = `docs/INCREMENT.md`).
- `proyecto/` — organización del trabajo: `proyecto/backlog.yaml` (System Backlog, SSoT, columnas
  por subsistema; vista `BACKLOG.md` mismo evento) + `proyecto/research/`.

**Disciplina de trabajo:** toda sesión arranca leyendo `proyecto/backlog.yaml`. Idea nueva →
backlog primero, construir después. Ítem terminado Y verificado → `hecho` + entrada en
`docs/INCREMENT.md`. Capabilities nuevas se construyen contra el sistema as-code (arquitectura,
schemas, design system cuando exista — BL-04). Prioridades las firma el operador.

**Decisiones técnicas vigentes:**
- Tres piezas: Vista Negocio (N13, construida — binario `directorio` + Next.js embebido), Motor de
  Discovery (N1, ★IP, sin construir) y App del Auditor (CK-11, sin construir — instalable, patrón
  harness-studio/dev-studio, publica procesos al repo cliente) — ver `sistema/arquitectura/NODOS.md`.
- Contrato de datos DevHub→Cockpit: Pull API versionada, diseñada, sin implementar (CK-08).
- `negocio.schema` modela objetivo/área/proceso/brecha; "persona/puesto" como entidad de primera
  clase es el hueco a cerrar (VISION.md §TBD, BL-01).

**Estado:** código migrado y verificado standalone (Go build/vet/test + UI tsc/vitest/export
estático, todos verdes sin dependencias del monorepo de origen). Método del auditor completado
desde el legacy (CK-11). Investigación heredada indexada en `proyecto/research/` — leer los
índices antes de investigar desde cero.

**Arnés de construcción:** kit dev — plugin del marketplace `alpacapurpura/prenter-marketplace`
(`harness@prenter-marketplace`, canal estable). Evoluciona con el producto — mejoras al arnés se
upstreamean al kit (backflow), jamás fork silencioso.

**Git:** trunk-based, `main` única, commit y push directo, tags semver cuando haya releases.
