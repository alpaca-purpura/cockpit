# Cockpit

Producto standalone (graduado del monorepo `prenter-harness`, 2026-07-06 — ficha de graduación CK-09).
Norte = [`VISION.md`](./VISION.md) · registro de decisiones = [`LEDGER.md`](./LEDGER.md) — fichas `CK-NN`
(continúa la numeración de la célula original; arranca en CK-10 aquí).

**Qué es:** **Organization as Code → Organization Twin** (CK-21): la organización entera
(procesos/roles/objetivos/personas-puestos) como dato versionado en git, con buenas prácticas ISO como
ontología + PDCA (sin aparato de certificación — VISION.md §ISO). Twin = estado deseado (N6) × estado
real (N16) × brecha continua (N13). Flujo-loop: ingesta multi-fuente → As-Is → To-Be → brechas con
costo/ROI → proyectos de mejora con ciclo de vida DENTRO de la solución → KPI movido. Diferenciador:
el hilo de oro medido (objetivos directorio → OKRs → KPIs por proceso/rol/persona) + arneses por puesto.
SOTA + TO-BE (37 capacidades): `docs/research/organization-as-code/`.

## Proceso de desarrollo — el arnés prenter (CK-19, adoptado 2026-07-09)

Cockpit se construye **bajo la doctrina del arnés** `harness@prenter-marketplace` (plugin, canal estable).
Migración total ratificada por el operador (CK-19). Cómo trabajar:

- **SSoT del qué se construye = `docs/product/`** (ver `docs/product/README.md`): historias
  (`stories/<module>/<story-id>/`), capabilities (`capabilities/<module>/`), releases, módulos.
  El backlog y el increment pre-arnés quedaron **archivados** en `docs/product/_archive/` (registro
  histórico congelado); correspondencia lossless en `docs/product/MAPEO.md`.
- **Mapa del árbol `docs/` = `docs/README.md`** (CK-28, principio hexagonal): `sistema/` = fuente
  as-code (gates/generadores/runtime) — `docs/` = lo que se lee (`product/` · `research/` ·
  `metodo/` · `architecture/` · `process/`). Regla: lo que valida un gate NUNCA va a `docs/`; la
  lectura humana desacoplada NUNCA va a `sistema/`.
- **Ciclo de vida (10 estados macro):** `idea → refining → refined → ready → developing → developed →
  [G Chris-verify] → [R reconcile] → reviewing → done` (+ `parked`/`dropped`). Gates, roles, DoD, TDD,
  anti-duplicación, learning-capture: reglas **always-on** en `.claude/rules/` (CORE del arnés, byte-idéntico,
  **NO editar** — ver `_HARNESS-CORE.md`) + doctrina en `docs/process/harness/`.
- **El seam:** `project.config.yaml` (repo root) — todo hecho tech/toolchain/live-verify/módulos. `doctor`:
  `python3 scripts/harness_config.py --doctor` (debe salir 0). El CORE nunca se edita para encajar Cockpit;
  lo específico va al seam o a reglas **project-layer** (`.claude/rules/*` sin sufijo CORE).
- **Disciplina de sesión:** arrancar leyendo `docs/product/` (historias `idea/refined/ready` = pool) +
  `LEDGER.md`. Idea nueva → historia en `state: idea` primero, construir después. Terminada Y **verificada
  en vivo** (`live_verify_infra` del seam) → `state: done` + capability. Prioridades las firma el operador.

## Las dos extensiones as-code propias (lo que el arnés no trae — CK-19)

El CORE es agnóstico; Cockpit **amplía** con dos ejes as-code (SSoT versionado → vista generada → gate
anti-drift en `.githooks/pre-commit`), gemelos entre sí:
- **Arquitectura** (`.claude/rules/arquitectura-as-code.md`, **supersede** el `paradigm-arquitectura.md` del
  CORE): SSoT = `sistema/arquitectura/NODOS.md` (16 nodos) + `arquitectura.yaml` → `gen_arquitectura.py`.
  Las historias anclan a un `node: N-NN`.
- **Metodología** (`.claude/rules/metodologia-as-code.md`, eje **nuevo**): el método del PRODUCTO (lo que
  Cockpit vende, distinto del proceso de desarrollo) — SSoT = `sistema/metodo/methodologies.yaml` (31 M-cards)
  + `proceso/**` + `sistema/schema/objeto.schema.yaml` (9 entidades) → `gen_metodo.py`.
- Adaptaciones del stack SaaS→Cockpit: `.claude/rules/cockpit-stack.md`.

## Arquitectura vigente (CK-18 Fábrica + Organización · CK-21 default comercial hosteado)

Tres planos — SSoT `sistema/arquitectura/NODOS.md` (16 nodos) + `despliegue.html` + SOTA en
`docs/research/{rediseno-total,organization-as-code}/`:
- **Fabricante (nuestro):** Arnesia (N15), Repositorio Maestro (N2, método+arneses+código), **Portal** de
  distribución + telemetría + **licencias por asiento, fingerprint compuesto — no MAC** (N3, asciende a
  producto en CK-21). No razona en runtime — fábrica de software. El método **se entrega al cliente** en
  arneses (CK-18/D1; protección = **licencia + contrato**).
- **Organización (una instancia por cliente — hosteada por nosotros = default CK-21, en su red = tier
  enterprise/regulados; multitenant = fase 2):** Repositorio Oficial (N6, git confidencial Forgejo,
  entornos dev→UAT→prod), Cockpit (N13 = Visualización + **motor de indicadores** (hilo de oro) + **ciclo
  brecha→proyecto** + Gestión de Cambios ISO + niveles de acceso), Data Lakehouse (N16), Depósito (N12),
  Sistemas operacionales (N18).
- **Edge (apps sobre Claude Code local, BYO licencia):** Consultio (N14, App del Consultor; **v0 CK-21 =
  arneses del método sobre Claude Code pelado, sin app shell**; el clon DevStudio después; construye el
  mapa y lo publica a N6), Colab Studio (N17), DevStudio (N5), N8 motor común, actores N9/N19/N10/N11.
- **Muertos (CK-18):** N1 (Discovery server-side → arneses), N4 (voz, diferida), N7 (agentes efímeros).
- El objeto normalizado COMPLETO (9 entidades) se lee/valida entero en `/api/objeto` (CK-13, CAP-08;
  instancias en `empresa/<tipo>/` — D-15). `negocio.yaml` sigue curado a mano (D-13); voltear a generado =
  historia `sistema/negocio-yaml-proyeccion-generada`.

## Stack + estado

Go 1.23 (`github.com/alpacapurpura/cockpit`) + Next.js (`cockpit-ui`) → binario `directorio` (:4100, UI
estática embebida). Comandos y live-verify en el seam. Código migrado y verificado standalone (Go
build/vet/test + UI tsc/vitest/export, verdes). Detalle del stack: `.claude/rules/cockpit-stack.md`.

**Arnés de construcción:** plugin `harness@prenter-marketplace` (canal estable, KIT 0.5.3). Evoluciona con el
producto — mejoras al arnés se **upstreamean** (backflow), jamás fork silencioso. Reglas CORE = copia
byte-idéntica en `.claude/rules/` (regenerar con `/harness:bootstrap` tras `claude plugin update`).

**Git:** trunk-based, `main` única, commit y push directo, tags semver cuando haya releases. El pre-commit
corre los dos gates as-code (arquitectura + metodología) — no usar `--no-verify`.
