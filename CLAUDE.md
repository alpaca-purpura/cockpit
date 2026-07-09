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
- Capabilities construidas — código (`go/`, `ui/`) + `docs/` (documentation-as-code; Product
  Increment = `docs/increment.yaml` SSoT `CAP-NN` + `INCREMENT.md` vista).
- `proyecto/` — organización del trabajo: `proyecto/backlog.yaml` (System Backlog, SSoT, columnas
  por subsistema; vista `BACKLOG.md` mismo evento) + `proyecto/research/`.

**Disciplina de trabajo:** toda sesión arranca leyendo `proyecto/backlog.yaml` — única fuente de
la verdad del pendiente (los "Siguiente:" de fichas del LEDGER son narrativa histórica, no
tracking). Idea nueva → backlog primero, construir después. Ítem terminado Y verificado → `hecho`
+ capability en `docs/increment.yaml`+`INCREMENT.md`. Capabilities nuevas se construyen contra el sistema as-code (arquitectura,
schemas, design system cuando exista — BL-04). Prioridades las firma el operador.

**Decisiones técnicas vigentes (rediseño CK-18 — Fábrica + Organización instalada):** el modelo dejó
de ser "BYOC con motor server-side". Ahora tres planos — ver `sistema/arquitectura/NODOS.md` (16
nodos, SSoT) + `despliegue.html` + fichas SOTA en `proyecto/research/rediseno-total/`:
- **Fabricante (nuestro):** Arnesia (N15, fábrica de arneses), Repositorio Maestro (N2, método +
  arneses + código), Distribución+telemetría+**licencias** (N3). No razona en runtime — es fábrica
  de software. El método **se entrega al cliente** empaquetado en arneses (CK-18/D1 derogó el límite
  de IP "el método nunca al cliente"; la protección pasa a **licencia + contrato**).
- **Organización (cliente):** Repositorio Oficial (N6, git self-hosted confidencial — ya NO GitHub),
  Cockpit (N13 = Visualización + Gestión de Cambios ISO + niveles de acceso), Data Lakehouse (N16,
  nutre a Cockpit con la operación día a día), Depósito (N12), Sistemas operacionales (N18).
- **Edge (apps sobre Claude Code local, BYO licencia):** Consultio (N14, App del Consultor = clon de
  DevStudio; construye el mapa completo y lo publica a N6), Colab Studio (N17, app del trabajador),
  DevStudio (N5, también a devs del cliente), N8 motor común, actores N9/N19/N10/N11 (4 niveles).
- **Muertos (CK-18):** N1 (Motor de Discovery server-side → vive como arneses), N4 (voz, diferida),
  N7 (agentes efímeros → todo el levantamiento es vía consultor).
- El objeto normalizado COMPLETO (9 entidades de `objeto.schema`) se lee y valida entero en
  `/api/objeto` (CK-13, CAP-08; instancias en `empresa/<tipo>/` del shell — D-15). `negocio.yaml`
  sigue curado a mano como proyección (D-13); voltearlo a generado = BL-19.

**Estado:** código migrado y verificado standalone (Go build/vet/test + UI tsc/vitest/export
estático, todos verdes sin dependencias del monorepo de origen). Método del auditor completado
desde el legacy (CK-11). Investigación heredada indexada en `proyecto/research/` — leer los
índices antes de investigar desde cero.

**Arnés de construcción:** kit dev — plugin del marketplace `alpacapurpura/prenter-marketplace`
(`harness@prenter-marketplace`, canal estable). Evoluciona con el producto — mejoras al arnés se
upstreamean al kit (backflow), jamás fork silencioso.

**Git:** trunk-based, `main` única, commit y push directo, tags semver cuando haya releases.
