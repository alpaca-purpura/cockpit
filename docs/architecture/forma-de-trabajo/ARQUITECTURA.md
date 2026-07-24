# Arquitectura de la forma de trabajo — Cockpit

> **Naturaleza:** documento PARA HUMANOS — lectura del operador, snapshot **2026-07-23**. NO es
> as-code: no lo valida ningún gate, no genera vistas, no es SSoT de nada. Ante divergencia mandan
> las fuentes que se citan en cada sección (`VISION.md`, `LEDGER.md`, `sistema/arquitectura/NODOS.md`,
> `sistema/metodo/`, `sistema/schema/`, `docs/product/`, `project.config.yaml`, `.claude/rules/`).
> Se actualiza a mano cuando el operador lo pida.

---

## 1 · Propósito y alcance

Explica la arquitectura COMPLETA de nuestra forma de trabajo: el objetivo que persigue, los
principios que la rigen, sus bloques (proceso de desarrollo, ejes as-code, cerebro de conocimiento,
runtime, memoria de sesión), sus datos, sus flujos, sus decisiones, sus atributos de calidad, sus
riesgos — y cierra con las **recomendaciones vigentes** (§13). Cubre el repo `cockpit` y sus
relaciones con los repos hermanos del ecosistema; no detalla los productos hermanos (cada uno tiene
su repo).

## 2 · Objetivo del sistema y drivers

**Meta (VISION.md · CK-21):** *Organization as Code → Organization Twin* — la organización entera
(procesos, roles, objetivos, personas/puestos) como dato versionado en git, evolucionando a un twin
operable: `Twin = estado deseado (N6) × estado real (N16) × brecha continua (N13)`. GitOps
organizacional: el repo declara el deber-ser, el lakehouse observa el ser, Cockpit reconcilia y
muestra el drift; los proyectos de mejora cierran la brecha y el KPI se mueve — todo dentro de la
misma herramienta.

**Drivers que moldean la forma de trabajo:**
- **El diferenciador es el hilo de oro medido** (objetivos directorio → OKR → KPI por
  proceso/rol/persona) → exige un modelo de dominio riguroso (12 entidades, provenance por dato).
- **El método se vende** (consolidado de miles de páginas de administración/alta dirección en
  M-cards + proceso operable + nichos) → el conocimiento es IP de primera clase y debe ser dato,
  no prosa.
- **Los arneses son el vehículo** (Consultio/Colab Studio sobre Claude Code) → lo que construimos
  para trabajar NOSOTROS es el prototipo de lo que el cliente recibe (dogfood estructural).
- **Un solo operador + agentes** → el proceso debe ser ejecutable por sesiones de Claude Code con
  gates automáticos donde sea posible y firma humana donde importa.

## 3 · Stakeholders y roles

| Rol | Quién | Responsabilidad |
|---|---|---|
| Operador / ratificador | Chris | firma prioridades, decisiones de dogma (fichas CK-NN), verify G, merges |
| Sesiones Claude Code | agentes | refinar, construir, auditar, mantener el cerebro — bajo las reglas del arnés |
| Roles del arnés (a mano, hueco W8 del KIT) | /pm, /architect, /dev-team, /auditor | el KIT 0.5.3 no publica las skills de rol; se operan manualmente siguiendo las rules |
| Cliente futuro | organizaciones | recibe instancia hosteada (N6+N13+N16) + arneses por puesto |

## 4 · Principios rectores (el dogma — cada uno con su fuente)

1. **As-code o no existe** — todo conocimiento estructural vive como dato versionado con la tríada
   `SSoT hand-authored → vista GENERADA → gate anti-drift` (`[[arquitectura-as-code]]`,
   `[[metodologia-as-code]]`).
2. **Git es el cerebro; toda BD es índice derivado regenerable** (rediseno-total/01, ratificado por
   cerebro-conocimiento/01 con evidencia 2026).
3. **Build determinístico, inteligencia en lectura/consolidación — jamás LLM en el write path de un
   gate** (validado por LazyGraphRAG y la retractación de mem0).
4. **Nada se borra: se invalida con puntero, autor y razón** (`estado: superseded` + `superseded_by`
   + `razon_estado`; en el producto: Gestión de Cambios ISO con firma).
5. **Provenance obligatorio** — todo dato AS-IS lleva `fuente`+`conf`; todo conocimiento de nicho
   lleva `derivado_de`+`confianza`+`condiciones` (anti-alucinación, anti-contaminación).
6. **Files-first con umbral firmado** — grep+índice-en-contexto hasta 200-500 notas / corpus
   no-greppeable; vector DB nunca antes de demanda real.
7. **TDD y verificación REAL** — RED→GREEN→REFACTOR; "verificado" = acción real ejercida + logs +
   efecto observado, jamás "GET 200" (`[[tdd-mandatory]]`, `[[test-design-doctrine]]`).
8. **Anti-duplicación** — grep antes de crear; consumir/extender, jamás espejar
   (`[[anti-duplication]]`).
9. **Nada llega a done como isla** — 4 contenciones CONN (`[[anti-orphan-integration]]`).
10. **El LLM propone, el contrato dispone, el humano con autoridad firma** — decisiones de dogma =
    ficha CK-NN ratificada; durante fase de construcción, cambios mecánicos no llevan ficha
    (memoria: ledger ligero).
11. **Español neutro LATAM, sin voseo** en producto y docs (`locale: es-419`).

## 5 · Vista de contexto

**Dos planos de conocimiento (no confundirlos — desambiguación cardinal de `[[metodologia-as-code]]`):**
- **Cómo construimos** = arnés prenter (plugin `harness@prenter-marketplace`, KIT 0.5.3) — proceso
  de desarrollo, gates, reglas.
- **Qué vendemos** = el método del producto (`sistema/metodo/`) — el cerebro metodológico que
  diagnostica y mejora empresas.

**Ecosistema (cada producto en SU repo, contrato sin import cruzado):** P2 DevStudio
(`~/Proyectos/dev-studio`) · P3 Kit (`~/Proyectos/harness-repo`) · P4 Arnesia/Harness Studio
(`~/Proyectos/harness-studio`, N15) · marketplaces de arneses (`~/Proyectos/marketplace-metodo`,
`~/Proyectos/marketplace-arneses`) · shells de datos por organización (`~/Proyectos/{prenter,
terranova, alameda, vulcano}` — instancias `empresa/**`, D-15; el repo cockpit NO contiene data de
cliente, I-39).

**Arquitectura del producto (SSoT: `sistema/arquitectura/NODOS.md`, 16 nodos · 3 planos):**
Fabricante (N15 Arnesia · N2 Repo Maestro · N3 Portal/licencias) → Organización por cliente (N6
Repo Oficial Forgejo · N13 Cockpit · N16 Lakehouse · N12 Depósito · N18 sistemas) → Edge sobre
Claude Code local (N14 Consultio · N17 Colab Studio · N5 DevStudio · N8 motor). Muertos CK-18:
N1/N4/N7. *Este doc no re-describe nodos: NODOS.md manda.*

## 6 · Bloques de construcción (vista funcional)

### 6.1 Proceso de desarrollo — el arnés prenter (CK-19)

- **SSoT del qué:** `docs/product/` — historias `stories/<module>/<story-id>/` (7 módulos ↔ nodos),
  capabilities, releases F0-F3. Ciclo de vida 10 estados:
  `idea → refining → refined → ready → developing → developed → [G Chris-verify] → [R reconcile] →
  reviewing → done` (+ parked/dropped). WIP caps por módulo; story-closure-gate absoluto.
- **Reglas:** `.claude/rules/` — 21 CORE byte-idénticas (NO editar, `_HARNESS-CORE.md`) + 5
  project-layer editables (`arquitectura-as-code`, `metodologia-as-code`, `cockpit-stack`,
  `ui-design-system`, +). Patrón slim-stub → detalle on-demand (con hueco conocido: ver §12).
- **El seam:** `project.config.yaml` — TODO lo tech/proyecto-específico que el CORE lee por slots
  (`toolchain`, `live_verify_infra`, `domain_modules`, `design_system_ref`, `wip_caps`). Doctor:
  `python3 scripts/harness_config.py --doctor` = 0.
- **Git:** trunk-based, `main` única, commit+push directo por pathspec (jamás `git add .`), commits
  >2 archivos delegados a worker Haiku, `--no-verify` prohibido.

### 6.2 Los ejes as-code — 4 gates en pre-commit (`.githooks/pre-commit`)

| Eje | SSoT (a mano) | Generador | Vistas GENERADAS |
|---|---|---|---|
| Arquitectura | `NODOS.md` + `arquitectura.yaml` | `gen_arquitectura.py` | `nodos.data.js`, `arquitectura.html` |
| Metodología | `methodologies.yaml` (45 M-cards) + `proceso/**` + `nichos/*.yaml` | `gen_metodo.py` | `METODOLOGIA.md §4`, `NOTACIONES.html`, `GRAFO.md` |
| Roadmap | `story.yaml` × `releases/*.yaml` | `gen_roadmap.py` | `ROADMAP.md § Estado` |
| Schema objeto | `objeto.schema.yaml` (12 entidades) + `verbos.yaml` | `gen_schema.py` | validación runtime espejo |

Cualquier gate falla → commit bloqueado; generado cambia → se auto-stagea en el mismo commit.
El patrón es idéntico en los 4: **misma máquina, distinto dominio** — y es el patrón que se replica
al twin.

### 6.3 El cerebro metodológico (construido 2026-07-22, commit `adb4e97`)

- **Corpus:** 45 M-cards (fichas telegráficas con `fuente`/`que`/`aporte_unico`/`cuando_usar`/
  `combina_con[]`/`twin{}`) · `proceso/**` (12 pasos ejecutables poblados, 8 etapas stub — BL-05) ·
  `nichos/` (17 unidades, 3 verticales) · backbone O1-O7/T1-T3 anclado al objeto de negocio ·
  218 refs `met:` en el schema (cada campo cita su metodología).
- **Acceso (skill `/metodo`):** `GRAFO.md` (índice-grafo GENERADO ~160 líneas: 1 línea por nodo +
  grafo inverso + backbone + recetas) → ruteo → grep+Read dirigido de ≤6 nodos (~24 líneas c/u).
  Presupuesto total ~2-4k tokens. Prohibido cargar el catálogo entero.
- **Aprendizaje (skill `/metodo-aprende`):** prior-art scan → clasificar (new/extend/supersede/
  descartar) → barrido de contradicciones → gate. Ciclo de vida en contrato v3:
  `estado: vigente|superseded|descartada` + `superseded_by` + `razon_estado`; el gate valida (ERR)
  y WARNea aristas/pasos que citen conocimiento reemplazado. Dogma tocado → ficha CK.
- **Diseño v2 aprobado en research** (`docs/research/cerebro-conocimiento/02`): bi-temporal
  light · puerta temática · gleanings · bandeja de episodios no-lossy · `/metodo-consolida`
  (sleep-time) · `/api/metodo` (ver §13).

### 6.4 Runtime del producto

Binario Go 1.23 `directorio` (`go/cmd/directorio`, HTTP :4100): sirve SPA Next.js exportada
estática embebida (`go:embed`) + API JSON (`/api/portfolio`, `/api/negocio`, `/api/objeto`).
Lee/valida las instancias `empresa/**` de los shells (validador espejo del schema v2: errores duros
vs warnings; deriva `divergente` al leer, RN-9); carga `verbos.yaml` en caliente. Sin auth/DB hoy
(single-tenant read-only; escenarios multitenant del CORE = N/A declarado). UI contra el design
system **PRENTER** (`[[ui-design-system]]`: tokens en `globals.css`, átomos en `ui/components/ds/`,
catálogo vivo `/design-system`, teal único acento, DRY). Live-verify del seam: ejercer los 3
endpoints DE VERDAD + logs + efecto.

**Aún no construido en N13:** motor de indicadores (hilo de oro medido), ciclo brecha→proyecto,
Gestión de Cambios, niveles de acceso, cruce lakehouse.

### 6.5 Memoria y activación por conversación

| Capa | Qué carga | Cuándo |
|---|---|---|
| `CLAUDE.md` (79 líneas) + `.claude/rules/` (26 files, ~1.2k líneas) | proceso + dogma | always-on |
| Skills project-layer (`/metodo`, `/metodo-aprende`) | cerebro del método | por description/trigger — carga dirigida |
| Memoria persistente (`~/.claude/projects/.../memory/`) | hechos cross-sesión (3 memorias: ledger ligero, hueco KIT, cerebro) | recall automático |
| `docs/product/` + `LEDGER.md` | pool de historias + decisiones | disciplina de arranque de sesión |
| Research (`docs/research/**`) | SOTA + veredictos | on-demand por referencia |

## 7 · Vista de datos

- **SSoTs y su autoridad:** ver tabla §6.2 + `docs/product/stories/**` (estado de trabajo) +
  `LEDGER.md` (decisiones CK-NN, append-only) + `VISION.md` (norte, cambia solo por ficha).
- **El objeto de negocio (12 entidades, schema v2/CK-26):** empresa · persona · rol · area ·
  proceso · sistema · objetivo · kpi · proyecto_mejora · idea · capability · brecha — un archivo
  por entidad en `empresa/<tipo>/` del shell de cada organización, descubrimiento por scan (D-03,
  D-15), `negocio.yaml` = proyección (D-13, generación pendiente BL-19).
- **Provenance:** por entidad y por medición (`fuente`+`conf`; `valor_declarado` vs
  `valor_observado` → `divergente` computado, disco intacto).
- **Frontera de datos:** cero data de cliente real en repos de sistema (I-39); nichos anonimizados
  a categorías de rubro; twin mide roles/procesos, NO personas (CK-24).

## 8 · Vista de despliegue

**Hoy (fase construcción):** todo local — binario :4100 + shells hermanos como datos; git en
GitHub; GitHub Actions **deferred** (calidad 100% en hooks locales, `[[github-actions-deferred]]`).
**Comercial (CK-21, por construir):** instancia hosteada single-tenant por cliente (Forgejo N6 +
Cockpit N13 + lake N16, dev→UAT→prod por branches+tags) · tier enterprise = en la red del cliente ·
edge BYO-licencia sobre Claude Code local · Portal N3 (licencias por asiento, fingerprint
compuesto). SSoT del despliegue: `sistema/arquitectura/despliegue.html` (curado, gate de madurez).

## 9 · Flujos clave (vista de procesos)

1. **Historia idea→done:** idea (con `node: N-NN` obligatorio) → refining (prior-art scan) → ready
   (arch + tickets + validators) → developing (TDD, Step-0 grep) → developed → **G** (Chris ejerce
   el kit en vivo, signoff) → **R** (reconcile: spec⟵realidad) → reviewing (auditor responsable,
   fix-and-own) → done (merge + capability + archive). Aprendizajes rutean al CIL (L1-L4).
2. **Consulta de conocimiento:** tarea toca método → `/metodo` → GRAFO (mapa) → grep ancla → Read
   offset (≤6 nodos) → responder citando `M\d+` vigentes.
3. **Ingesta de conocimiento:** texto/teoría nueva → `/metodo-aprende` → scan → clasificar →
   contradicciones → escribir YAML → `gen_metodo.py` + `--check` → commit (dogma → ficha CK antes).
4. **Commit:** pathspec exacto → pre-commit corre los 4 gates → generados se auto-stagean → push
   directo a main. >2 archivos → worker Haiku con guardrails verbatim.

## 10 · Decisiones de arquitectura (registro)

Registro formal = `LEDGER.md` (fichas CK-NN) + `sistema/schema/DECISIONES.md` (D-NN) + fichas de
nodo. Las estructurales de la forma de trabajo: **CK-11** nacemos ordenados · **CK-17** gate
anti-drift automático · **CK-18** Fábrica+Organización, método se entrega en arneses · **CK-19**
adopción total del arnés + 2 ejes as-code propios · **CK-21** Organization Twin + 37 capacidades ·
**CK-24** frontera twin↔persona · **CK-26** schema v2 hilo de oro + kinética · **CK-27** PRENTER
design system. Sin ficha (fase construcción, mecánicos): cerebro v1 `adb4e97` + research
`a611f77` (2026-07-22/23).

## 11 · Atributos de calidad y cómo se logran

| Atributo | Mecanismo |
|---|---|
| Consistencia conocimiento↔vistas | 4 gates anti-drift en cada commit (DRIFT = bloqueo) |
| No-contradicción del cerebro | ciclo de vida v3 + WARN aristas→superseded + protocolo `/metodo-aprende` |
| Trazabilidad | provenance por dato · fichas CK/D · git history · grafo inverso GRAFO §2 |
| Economía de contexto | índice-en-prompt + grep dirigido + presupuestos explícitos (≤6 nodos, ~2-4k tokens) |
| Correctitud del código | TDD + gates toolchain (vet/gofmt/test · lint/tsc/vitest) + live-verify real + auditor responsable |
| No-duplicación | Step-0 grep + banco DS PRENTER + prior-art scan en refining |
| Reproducibilidad | generadores determinísticos stdlib+pyyaml · binario self-contained · seam declarativo |
| Seguridad de proceso | prohibiciones git duras · sweep-guard multi-sesión · secretos jamás commiteados |

## 12 · Riesgos y deuda conocida

1. **Población del método (el cuello real):** 12/~60 pasos; 35/45 cards sin operacionalizar
   (auto-visible en GRAFO §2). Sin esto, arneses vacíos y Consultio v0 sin contenido.
2. **Pipeline Arnesia inexistente:** el arnés prototipo está escrito a mano (anti-patrón propio);
   falta compilar arneses desde la SSoT.
3. **Meta-capa del arnés con referencias colgantes:** 13 rules citan `docs/rules-detail/`
   inexistente (HB-C2); skills de rol del KIT no publicadas (W8) — se opera a mano.
4. **Motor de indicadores y lakehouse no construidos** — el twin hoy es estructura sin pulso.
5. **Runtime ciego al método:** los 218 `met:` no se sirven por API; el twin no explica su porqué.
6. **Bus factor = 1** (operador único) — mitigado parcialmente por as-code + memoria persistente.
7. **Deuda declarada:** Next→Vite (BL-20) · `negocio.yaml` a proyección generada (BL-19) ·
   organismos legacy fuera del banco DS.

## 13 · Recomendaciones (consolidado vigente, en orden)

**R1 · Poblar el método = primera prioridad de contenido** (historia `sistema/poblar-metodo-m1-m3`,
F1.2). Es el único ítem que ningún tooling resuelve: destilar las "miles de hojas" a pasos con
provenance. El GRAFO §2 (huérfanas) es el tablero de avance gratis.

**R2 · Cerebro v2 — Fase 1 ya** (horas, sin dogma): bi-temporal light (`vigencia.desde/hasta` +
regla "contradicción solo si solapan"), puerta temática en GRAFO (`_meta.rutas_tematicas`),
gleanings en `/metodo-aprende`. Diseño listo en `cerebro-conocimiento/02`.

**R3 · Cerebro v2 — Fase 2 como historia** (`sistema/cerebro-ingesta-episodios`, state: idea, la
firma el operador): bandeja de episodios no-lossy (`ingesta/episodios/`) + `/metodo-consolida`
sleep-time con presupuesto anti-entropía (~≤60 cards vigentes). El texto de Teoría de la
Coordinación + Redes de Petri del operador = episodio #1 y test de aceptación end-to-end.

**R4 · Compilar el primer arnés desde la SSoT** (`consultio/metodo-como-arnes-v0` con generador,
no a mano) — ahí nace Arnesia de verdad y se cierra el loop método→arnés→puesto.

**R5 · `/api/metodo` en el binario** (patrón `cargaVerbos()` ya existente): servir catálogo + `met:`
reverso para que el twin explique el porqué metodológico de cada indicador. Encaja con el motor de
indicadores (N13) cuando se construya.

**R6 · Sanear la meta-capa del arnés:** resolver HB-C2 (materializar o recortar los 13 stubs
colgantes) y mantener el hueco W8 documentado hasta que el KIT publique las skills de rol.

**R7 · Sostener el dogma re-firmado (no revisitarlo cada mes):** git-SSoT · build determinístico ·
invalidación explícita · files-first con umbral (200-500 notas / corpus no-greppeable / no cabe en
contexto). La evidencia 2026 (mem0 ADD-only, LazyGraphRAG, Claude Code grep, Amazon AAAI, Letta
git) está toda de este lado — cambiarlo requeriría evidencia equivalente en contra + ficha CK.

**R8 · Replicar, no reinventar, al construir el twin:** el mapeo 1:1 cerebro-propio → twin-cliente
está en `cerebro-conocimiento/03` (episodios→N12, gate del schema→ingesta Consultio,
superseded→Gestión de Cambios firmada, GRAFO→grafo por organización en los arneses,
consolida→crowdsourcing-frescura). Toda historia futura de conocimiento del twin debe citar ese
mapeo como prior-art.

---

*Referencias raíz: `VISION.md` · `LEDGER.md` · `CLAUDE.md` · `project.config.yaml` ·
`sistema/arquitectura/NODOS.md` · `sistema/metodo/{README.md, GRAFO.md}` ·
`sistema/schema/objeto.schema.yaml` · `docs/product/README.md` ·
`docs/research/{organization-as-code, rediseno-total, cerebro-conocimiento}/`.*
