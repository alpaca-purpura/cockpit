# Cockpit

Producto standalone (graduado del monorepo `prenter-harness`, 2026-07-06 — ficha ecosistema en
`tooling/strategy/LEDGER.md` de allá, ficha de graduación CK-09 en `products/cockpit/LEDGER.md`,
congelado). Norte = [`VISION.md`](./VISION.md) · registro = [`LEDGER.md`](./LEDGER.md) — continúa
la numeración `CK-NN` de la célula original (arranca en CK-10 aquí).

**Qué es:** sistema para el levantamiento, diseño, creación, propagación/adopción, monitoreo y
mejora continua de procesos/roles/objetivos/personas(puestos), basado en buenas prácticas ISO
(ontología + PDCA, sin el aparato de certificación — ver VISION.md §ISO). Flujo: ingesta
multi-fuente → As-Is → To-Be → proyectos desde la brecha.

**Decisiones técnicas vigentes:**
- Dos mitades: Vista Negocio (N13, construida — binario `directorio` + Next.js embebido) y Motor de
  Discovery (N1, ★IP, sin construir) — ver `docs/architecture/NODOS.md`.
- Contrato de datos DevHub→Cockpit: Pull API versionada, diseñada, sin implementar (CK-08).
- `negocio.schema` modela objetivo/área/proceso/brecha; "persona/puesto" como entidad de primera
  clase es el hueco a cerrar (VISION.md §TBD).

**Estado:** código migrado y verificado standalone (Go build/vet/test + UI tsc/vitest/export
estático, todos verdes sin dependencias del monorepo de origen). Investigación heredada indexada
en `docs/research/` y `docs/mockups/` — leer los índices antes de investigar desde cero.

**Arnés de construcción:** kit dev — plugin del marketplace `alpacapurpura/prenter-marketplace`
(`harness@prenter-marketplace`, canal estable). Evoluciona con el producto — mejoras al arnés se
upstreamean al kit (backflow), jamás fork silencioso.

**Git:** trunk-based, `main` única, commit y push directo, tags semver cuando haya releases.
