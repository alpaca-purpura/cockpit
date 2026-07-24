---
story_id: twin-territorio-mapa-zoomable
type: ui-story
module: cockpit
node: N13
capability: cockpit/twin-territorio-mapa-zoomable
state: idea
links:
  story_yaml: ./story.yaml
  prototipo: ../../../../../docs/product/prototypes/twin-territorio-2026-07-20/index.html
  artifact: "https://claude.ai/code/artifact/20907d03-3979-42f2-b5c8-b33fa5e383f6"
  ledger: ../../../../../LEDGER.md
---

> **Estado: `idea`.** Concepto capturado en la sesión 2026-07-20. **El operador tiene MÁS ajustes
> visuales que dará en una conversación nueva** — esta historia es el punto de continuidad. NO está
> refinada ni ratificada; el mockup es un prototipo para iterar, no la vista final.

## Job-To-Be-Done

**Como** director (o consultor operando el twin)
**Quiero** ver la organización entera como **un mapa navegable** (organigrama conectado) con **zoom
semántico** y **capas que se pintan encima**
**Para** leer el big picture de un vistazo, drillar donde importe (área → proceso → detalle) y volver
al panorama en cualquier momento, sin perder el hilo de oro.

## Por qué importa

Hoy el twin (`ui/components/negocio/NegocioView.tsx`) son **4 tabs planas** — Mapa vivo · Hilo de oro ·
Brechas · Personas — cada una una tabla/grid. Está fragmentado: el director no ve la organización como
un todo, ni cómo el hilo de oro cruza la estructura, ni dónde duelen las brechas *sobre* el organigrama.

El pedido del operador (2026-07-20, verbatim resumido): *"ver a la organización como un mapa, como un
organigrama conectado; los procesos pintados como un lienzo (inspiración: harness-studio); las distintas
capas que se pinten 'encima'; poder hacer zoom y doble-click donde corresponda y volver al big picture
en cualquier momento. Basándote en lo que tenemos para mostrar y lo que le interesa a un director."*

Es el **diferenciador visual** del producto (CK-21: Organization as Code → Organization Twin). El grafo
ya existe como dato (`sistema/schema/objeto.schema.yaml` v2); esto es su vista espacial.

---

## El concepto — "el Twin como territorio"

**Un solo mapa vivo, no 4 tabs.** La organización es un territorio que se navega por **zoom semántico**
y sobre el que se **pintan capas** (conmutador). El big picture siempre está a un gesto. Las 4 tabs de
hoy dejan de ser tabs → se vuelven **capas** sobre el mismo mapa.

Encaja con el schema: el grafo **nunca se materializa** — es `hilo(desde_id)`, se pinta caminando refs
desde un nodo foco (`objeto.schema.yaml:460`). El canvas **expande progresivamente** desde donde estás;
no hay "cargar grafo gigante". El zoom semántico ES el modelo de datos.

### Escalas (zoom semántico + doble-click + "volver" siempre)

| z | Escala | Qué se ve | Base |
|---|---|---|---|
| **z0** | **Sala de mando** (big picture) | Toda la org. Default del director. | Organigrama conectado (áreas + `reporta_a`) |
| **z1** | **Área / gerencia** | Doble-click un nodo → sus procesos, líder (rol), KPIs, brechas | proceso-cards |
| **z2** | **Proceso = lienzo** | Doble-click un proceso → canvas de swim-lanes: actividades = nodos, **carriles = roles** (`carril_ref`), edges = `secuencia_ref`/`flujos_alternos`, tiempos toque/espera | swim-lane |
| **z3** | **Nodo · detalle** | Drawer: procedencia (`fuente`/`conf`), mediciones, drill fino | — |

"Volver al big picture" = `fitView` (overview-first), gesto único, en cualquier momento (patrón de
harness-studio). Pan + wheel-zoom continuos además del drill semántico.

### El conmutador de capas (se pintan **encima** del mismo mapa)

Cada capa cae directo de un `o_code` del schema. Cada una es toggle, **derivada** (no se guarda — igual
que el schema y que harness-studio pintan overlays derivados; cero DOM extra cuando off):

| Capa | O-code | Qué pinta |
|---|---|---|
| **Estructura** *(base)* | `O4` | Organigrama matricial: áreas + roles + personas, edges `reporta_a` (jerárquico sólido / funcional punteado). El esqueleto — **el "organigrama conectado" del pedido.** |
| **Hilo de oro** | `O2` | objetivo→KR→KPI→proceso como **líneas que cruzan el mapa**. Tocás un objetivo → el hilo se enciende, el resto se atenúa (spine-always + hover-reveal). El hilo como dato de primera clase visual (`METODOLOGIA.md:76-104`). |
| **Salud** | `O3/O5` | **3 semáforos que NUNCA se fusionan** en un color: digitalización (manual/externo/integrado) · confianza (provenance 🟢🟡🔴) · madurez (COBIT 0-5). Heatmap sobre nodos. |
| **Brechas** | `O6` | Pins sobre su `against_ref` (lo que atacan), severidad = tamaño, costo = etiqueta. Filtra por el objetivo activo. |
| **Cinética / Mejora** | `O7` | proyectos_mejora en vuelo como **movimiento**: estado PDCA, qué brecha cierran, `mueve_refs`→KPI. El loop `brecha→proyecto→KPI movido`. **Ningún vendor lo cierra in-tool.** |

### La vista del director (z0) — esquiva las 2 trampas que el método nombra

z0 NO abre como "mar de rojo". Abre como **Sala de mando** anclada a plata (`M1-LEVANTAMIENTO.md:274-278`):
- **Pulso del hilo** — ¿los objetivos del directorio van? (KRs dentro de banda).
- **LA Apuesta** — UN solo próximo paso secuenciado y costeado (M3 Etapa 0: el sistema recomienda 1,
  no 50), anclado a un KR: *"cerrar esta brecha mueve KR X, cuesta ~A"*.
- **Estado del loop** — qué está cerrando (proyectos → KPI movido).

Todo atado a KR/plata → cero "semáforo de vanidad".

### z0 tiene DOS pieles (toggle) — decisión del operador

- **Territorio** (default) — el organigrama conectado con salud pintada + la Apuesta.
- **Strategy map (BSC)** — objetivos por perspectiva (financiera/cliente/procesos/aprendizaje)
  conectados por causalidad. Piel clásica de directorio. Es una **proyección declarada** en el schema
  (`objeto.schema.yaml:70`, `perspectiva_bsc`), no una vista inventada.

---

## Decisiones tomadas en esta sesión (2026-07-20)

1. **Metáfora base:** el twin = territorio; zoom semántico + conmutador de capas (vs. las 4 tabs planas).
2. **z0 default = AMBAS pieles con toggle** (Territorio ↔ Strategy map BSC) — elegido por el operador.
3. **Organigrama COMPLETO desde z0** (las 13 áreas conectadas, no solo el nivel gerencial) — pedido
   explícito del operador. Trade-off aceptado: el fit por defecto queda ~57% (texto chico); los colores
   de salud y el organigrama se leen a cualquier zoom, los nombres con zoom/drill.
4. **Cards sin relleno "plomo"** — las áreas son borde hairline sobre negro (transparente), no el
   gradiente gris `#181f1e→#141a19`. Pedido del operador (ref: /tmp/aa.png de la sesión).
5. **Dark-only robusto** — `color-scheme: dark` + fondos opacos, para que un viewer en tema claro no
   filtre blanco a los `<button>` (bug encontrado y arreglado; verificado emulando viewer claro).
6. **Deliverable = mockup interactivo HTML** (no la app real todavía) — datos canned de terranova,
   zoom+capas reales, PRENTER dark/teal. NO wirea Go/Next.
7. **Shell v2 ratificado (2026-07-20, sesión 2)** — tras investigación de UI de DTO/process-mining/
   org-design/canvas (`research-shell-ui.md`, 3 sweeps con fuentes): partición **izquierda = qué
   existe** (escala + capas con leyenda inline) · **derecha = inspector contextual** (sin selección =
   sala de mando: Pulso + Apuesta + Estado del loop; con selección = ficha del nodo) · **arriba =
   identidad As-Is/corrida + chips de filtro + contador n/N + búsqueda ⌘K** · **abajo-izq = zoom/fit +
   Niveles (LOD declarativo 1/2/3)** · **abajo-der = minimapa**. La legibilidad del org completo se
   resuelve con LOD (plegar a N niveles, todo rueda al ancestro visible: pins, semáforos, cinética),
   no con tipografía. Salud queda como color-by radio (una métrica a la vez) con leyenda pegada.
8. **Las "corridas" what-if = escenario-objeto, jamás toggle** (patrón unánime de la investigación):
   rama con nombre + ciclo Draft→Review→Merged + diff coloreado + panel de deltas + gate explícito.
   Mapeo natural: corrida = rama sobre N6 (git), aplicar = PR. En el mockup queda como teaser en el
   menú de identidad ("Nueva corrida — próximamente"); construir el eje = historia futura propia.

---

## Anclaje metodológico (los marcos as-code que lo respaldan)

Las capas y las pieles NO se inventan — el schema/método ya las declara:

- **ArchiMate** (`objeto.schema.yaml:28`, cada entidad tipada) — la **justificación** de que las capas
  son capas de arquitectura reales (Motivation/Business/Application/Implementation), no arbitrarias.
- **Los O-codes** (contexto·O2-O7) = los estratos naturales del twin (§ conmutador de capas arriba).
- **BSC strategy map** (M30, `perspectiva_bsc`) — la piel de directorio (z0 alternativa).
- **Hoshin/GPD** (M26/M41, `objetivo.parent_ref`) — el cascade directorio → área → equipo (drill del hilo).
- **VSM** (M09, `actividad.tiempos{toque,espera}`) — el overlay del lienzo z2 (desperdicio visible).
- **COBIT** (M15, `capability.assessment`) — la capa madurez.
- **PDCA/DMAIC/MASP** (M16/M42/M43, `proyecto_mejora` state machine, `objeto.schema.yaml:445-457`) — la
  capa cinética; loop-back `en-verificacion→en-ejecucion` incluido.
- **3 semáforos ortogonales** — confianza (M23 provenance) · madurez (COBIT) · digitalización (SOMA C7).
  El método es explícito: **no fusionarlos** (`M1-LEVANTAMIENTO.md:252-257`).
- **Frontera persona (CK-24)** — el twin mide roles/procesos/áreas; vista por persona nombrada solo con
  opt-in de Gobernanza. La capa Estructura muestra roles y ocupantes, NO métricas por persona.
- **El loop diferenciador** (`mejoras.md`) — `brecha → proyecto_mejora → KPI movido` con `resultado`
  real, dentro del twin. Es el "money shot" del director.

---

## Veredicto técnico (de harness-studio, repo hermano — DNA compartible)

harness-studio (`~/Proyectos/harness-studio`) ya resolvió las dos mitades:

- **z0/z1 mapa org libre y zoomable → React Flow (`@xyflow`)**. Es *exactamente* su "Organigrama"
  (node = unidad org, edge = `reporta a` bezier que sigue al arrastrar, click-sin-mover = drill). Lo
  tienen **specado pero NO construido** (`docs/product/ux.md`, `vision.md:208`) → construiríamos lo que
  ellos diseñaron.
- **z2 proceso-lienzo (swim-lanes fijos) → HTML+SVG a mano**. Es su `web/src/widgets/map-canvas/**`,
  que **ya shipearon** (custom, no React Flow). Lift candidato (repo hermano + doctrina `studio-core`
  de kernel compartido, CK-25).
- **Técnicas transplantables tal cual:** viewport por CSS-transform (pan/zoom/fit en ~100 líneas, sin
  lib); nodos DOM + edges SVG medidos por `getBoundingClientRect`+`ResizeObserver` (cero coords
  guardadas); selectores puros como SSOT de layout; conmutador de capas con *disable honesto* (capa sin
  dato = deshabilitada, no oculta); overlays derivados; spine-always + hover-reveal (revela el vecindario
  del nodo, atenúa el resto a 0.2); glyph redundante (forma+color+char, color-blind); hash deep-linkable
  (`escala·capa·selección` en URL, restaurable/compartible).

**Stack de destino:** el mockup es vanilla; la implementación real es sobre `cockpit-ui` (Next export
estático embebido en el binario `directorio`). Dependencia nueva a evaluar: `@xyflow/react` (React Flow)
para z0/z1 — cae bajo `[[cockpit-stack]]` "no nuevas deps FE sin justificación"; la justificación es el
mapa org libre-zoomable. z2 puede ser a mano (sin dep).

---

## El mockup (prototipo de esta sesión)

- **Fuente en el repo:** `docs/product/prototypes/twin-territorio-2026-07-20/index.html` (un solo HTML
  autocontenido; datos canned de terranova; vanilla JS/SVG; PRENTER dark/teal).
- **Artifact publicado (privado del operador):**
  `https://claude.ai/code/artifact/20907d03-3979-42f2-b5c8-b33fa5e383f6`
- **Para re-publicar tras editar** (nueva conversación): editar el HTML del repo y volver a llamar
  Artifact con `url` = ese artifact URL (mantiene el link).

### Qué demuestra
z0 territorio (organigrama 13 nodos, auto-layout desde `reporta_a`) · toggle Territorio↔BSC · 5 capas
conmutables · hilo-de-oro (dim/light al elegir objetivo) · salud 3 sub-semáforos · brechas pins ·
cinética (loop) · z1 drill (subtree de una gerencia) · z2 lienzo (Cobranza de cuotas, 3 carriles, 7
actividades reales con triage ECRS + RTLX) · drawer z3 (proceso/brecha/proyecto/actividad) · pan/zoom/fit.

### Datos
Shell real `~/Proyectos/terranova` (Desarrolladora Terranova S.A.C.): 7 objetivos (BSC), 13 áreas (árbol
`reporta_a`), ~17 procesos, 6 brechas (incl. `gap-postventa` = `sin-ancla-de-valor`: NPS 42→31 que ningún
KR mide — joya del diagnóstico), KPIs con banda, proceso insignia Cobranza expandido a actividades.

---

## Estado visual + fixes aplicados (self-review de la sesión)

El operador señaló "visualmente hay cositas que no se ven bien". Self-review encontró y arregló **4**:
1. **Cards blancas** en viewer claro → faltaba `color-scheme: dark` (**arreglado**, verificado emulando
   tema claro: sigue todo oscuro).
2. **Todo diminuto (50%)** → 13 nodos apretados. Iterado: primero 7 nodos legibles (81%), luego el
   operador pidió el **organigrama completo** → 13 nodos a ~57% (trade-off aceptado).
3. **Hint tapaba la Apuesta** → reposicionado.
4. **Fondo plomo en las áreas** → cards a transparente + hairline (**arreglado**).
5. **Pins z1 sobre el proceso equivocado** (el cuerpo alto llegaba a la fila de arriba) → ahora abrazan
   su propio proceso; z1 canvas dimensionado al contenido (legible ~85%).

---

## Decisiones adicionales (sesión 2, continuación)

9. **La sección "Escala" del rail se ELIMINA** (challenge del operador, razón parcial reconocida):
   el concepto de escala z0/z1/z2 sigue vivo, pero como *estado de drill* — se entra desde el mapa
   (doble-click) y se lee en el breadcrumb, nunca desde un menú lateral (ningún producto investigado
   tiene "menú de niveles"). El rail pasa a navegar **módulos**.
10. **El mockup pasa a ser el PRODUCTO COMPLETO (4 módulos + corrida)** — pedido del operador
    ("asume que este mockup es el de todo el DTO"): rail = **Territorio** (el twin, con capas) ·
    **Mejora** (funnel brecha rankeada por ROI → proyecto PDCA → **KPI movido con veredicto** — se
    agregó un proyecto cerrado `pm-cie` con `resultado{delta_observado, veredicto: movió}`) ·
    **Método** (engagement M1/M3/M2 con gates, barra de provenance, y la traza "cada capa ← una
    M-card" — metodología-as-code visible) · **Cambios** (solicitudes ISO con 3 niveles de aprobación,
    versiones dev→UAT→prod, git invisible). **Corrida demo funcional** desde el pill de identidad:
    banner ámbar + tinte de viewport + diff Δ sobre nodos + inspector "Impactos en vivo"
    (previous→new, neto, payback) + gate "Enviar a aprobación" que aterriza en la cola de Cambios.
    Capas con disable honesto fuera de Territorio.

## El viaje completo (v5 · CK-29) — toda entidad navegable + el twin que compila trabajo

**Pedido del operador (2026-07-24):** "integra un viaje completo hasta el doble click del proceso,
persona, etc — todas las entidades; repiensa todo desde nuestra visión y no te sesgues por las
decisiones". Auditoría previa contra CK-29 encontró: el mockup era CK-21 completo pero CK-29 ausente
(cero arneses, cero conocimiento, cero colaborador-orquestador; triage como etiqueta muerta).

11. **Gramática de ficha universal** — TODA entidad del schema (las 12: empresa · persona · rol ·
    area · proceso · sistema · objetivo · kpi · proyecto_mejora · idea · capability · brecha) abre
    ficha en el inspector con las mismas secciones: **qué-es** (semántica + salud) · **hilo**
    (arriba/abajo, links navegables — el viaje nunca se corta) · **pulso** (mediciones/frescura/
    conector) · **conocimiento** (know-how anclado, teaser F3) · **acciones** (capa kinética del
    schema, con nivel + aprobación; toda acción no-directa aterriza en la cola de Cambios).
    Puntos de entrada: líder del área (z0) → persona · dueño/rol (cards, KPIs, RACI) → rol ·
    sistemas → sistema · chips de objetivo → objetivo · brand → empresa · carriles z2 → rol.
12. **Capa Trabajo (N15·17)** — el twin COMPILA trabajo: badge ⛨ por puesto (vigente /
    ⚠ desactualizado si el twin cambió / gris = sin arnés, el gap visible). Ficha rol = la joya:
    Puesto & arnés (compilado-de, skills, uso agregado por rol CK-24) + **"el día del ocupante —
    orquestar, no ejecutar"** (fin-estado CK-29). Ficha arnés declara la doctrina: vista GENERADA
    del twin para un puesto, se recompila jamás se edita.
13. **La cadena triage→Arnesia cierra** — el veredicto M36 deja de ser etiqueta: actividad
    `automatizable-agente`/`aumentable` → "candidato a skill del arnés" → funil de ideas (M44,
    columna 0 nueva en Mejora, autoría reconocida RN-16) → proyecto → al cerrar, la mejora se
    **recompila al arnés** (pm-cie muestra el loop llegando al edge). Anti-drift twin→arnés en
    Cambios (SC-14: recompilar arnés por drift).
14. **Fixes de dato:** 9→12 entidades (CK-26) · 31→45 M-cards · pins con title completo.

## v6 · El Mapa de Valor (2026-07-24, ratificado "dale") — la geografía correcta

**Crítica del operador (verbatim resumido):** "los procesos usualmente son con pasos — en Arnesia los
arneses los hice como mapa de proceso; al ver los procesos de una empresa debería verlos similar…
hay procesos transversales… el BSC así no le encuentro sentido… los objetivos deberían estar en el
lienzo también, y no veo objetivos ni KPIs ni OKRs ni personas — se ven cuadrados y bloques pero no
un sistema interconectado. Sal de la caja y proponme algo mejor."

15. **La geografía deja de ser el organigrama y pasa a ser el MAPA DE VALOR** — ISO 9001 (enfoque a
    procesos) × cadena de valor Porter × strategy map, en 5 bandas sobre UN lienzo (mismo ADN de
    bandas que el map-canvas de harness-studio — fractal con el arnés):
    **Estrategia** (objetivos+KR, perspectivas BSC como orden interno — muere la piel BSC; la
    causalidad = arcos dentro de la banda) → **Cadena de valor** (8 misionales izq→der, cada proceso
    = mini-mapa con sus pasos como micro-chevrons; doble-click = lienzo) → **Apoyo** (transversales
    ANCHOS: el ancho dice cuántas áreas cruzan) → **Gente & arneses** (los ~15 puestos con ocupante
    y ⛨) → **Sistemas** (plataformas, ancho = procesos que sirven). **El hilo de oro = edges
    VERTICALES reales** cruzando las bandas: tenues siempre; click en un objetivo → su hilo completo
    se enciende (drivers + roles + sistemas), el resto se atenúa. El organigrama NO muere: se degrada
    a **piel secundaria** ("la estructura como lente"). Todo lo previo (capas, fichas, corrida,
    módulos, z1/z2) se conserva.

## ⚠ PENDIENTE — ajustes del operador (continuar en conversación nueva)

**El operador sigue iterando el mockup.** Estado tras la sesión 2 (shell v2):
- ~~Legibilidad del organigrama completo a zoom lejano~~ → **resuelto** con el control Niveles
  (LOD declarativo 1/2/3): default = las 13 áreas; Niveles 2 = 7 nodos legibles con rollup honesto.
- Comentarios visuales del operador sobre el shell v2 (acaba de re-publicarse — feedback pendiente).
- Decisión futura: refinar la historia del eje "corridas" what-if (ver decisión 8).

**Cómo continuar:** leer esta historia + abrir el prototipo (`docs/product/prototypes/twin-territorio-2026-07-20/index.html`)
o el artifact; aplicar los comentarios editando el HTML; re-publicar al mismo artifact URL.

---

## Relación con otras historias (anti-duplicación)

Esta historia es el **frame espacial** (paradigma de visualización de N13). NO recrea los lentes — los
**re-hospeda como capas**:
- **`cruce-estructura-operacion-indicadores`** (refining) = el lente **Indicadores** (KPI semáforo por
  banda, cadena kpi→KR→objetivo). Se vuelve la **capa Hilo/Indicadores** dentro del territorio. Su
  `derivaSemaforo` (Go) + `ui/lib/indicadores.ts` se consumen tal cual — no se duplican.
- **`brecha-proyecto-ciclo-vida`** (F1.1) = la **capa Cinética** (O7, loop brecha→proyecto→KPI).
- **`persona-puesto-primera-clase`** (done, CK-12) = la base O4 de la capa Estructura.
- **`negocio-yaml-proyeccion-generada`** = la proyección objeto→negocio (`go/negocio_projection.go`, CK-27)
  que ya alimenta los lentes actuales (Mapa/Hilo/Brechas del `NegocioView.tsx`).
- **Supersede** (a definir en refinamiento) el arreglo de **4 tabs planas** de `NegocioView.tsx` — o
  convive: el territorio como shell, los componentes de tab existentes (`MapaTab`, `HiloTab`,
  `BrechasTab`, `PersonasTab`, `ProcesoDrawer`, `SEMAFORO`) como fuentes de las capas. Decisión de scope
  para el refinamiento.

### Prior-art scan (anti-duplication-refining)
- `~/Proyectos/harness-studio` `web/src/widgets/map-canvas/**` — técnica de canvas/lienzo (lift candidato).
- `ui/components/negocio/NegocioView.tsx` — los 4 lentes actuales (MapaTab/HiloTab/BrechasTab/PersonasTab
  + ProcesoDrawer + SEMAFORO) = fuente de las capas, no se recrean.
- `go/negocio_projection.go` + `go/objeto.go` (`/api/objeto`, `/api/negocio`) — el dato, sin endpoint nuevo.
- `sistema/schema/objeto.schema.yaml` v2 — el grafo (O2-O7) + `relaciones` (el modelo de aristas del hilo).
- `.claude/rules/ui-design-system.md` — PRENTER (todo se construye contra el banco `ds/`).

---

## Out of scope (explícito, para el refinamiento)

- El **motor de indicadores** (semáforo/rollup real) — ya es `cruce-estructura-operacion-indicadores`.
- El **ciclo de vida brecha→proyecto** — ya es `brecha-proyecto-ciclo-vida`.
- El **lakehouse** (dato de operación real, N16) — F1.4; el twin lee el golden-fixture (CK-23).
- **Auth/niveles de acceso** que gobiernan qué capa ve cada nivel — `auth-niveles-acceso-policy-as-data`.
- Los **proyectos_mejora** del mockup son ILUSTRATIVOS (el fixture no los tiene aún).

## Riesgos / Asunciones

- **Riesgo:** re-frame de toda la superficie /negocio = scope grande. **Mitigación:** construir el shell
  territorio + zoom primero, migrar lentes uno a uno (las capas ya existen como componentes de tab).
- **Riesgo:** React Flow como dep nueva FE (`[[cockpit-stack]]`). **Mitigación:** justificado por el
  mapa org libre-zoomable; z2 puede ser sin dep (a mano). Evaluar en refinamiento.
- **Asunción:** el organigrama completo (13 nodos) a ~57% es aceptable con level-of-detail por zoom
  (pendiente de confirmar con el operador).
- **Asunción:** las 5 capas ↔ O-codes son la taxonomía correcta (respaldada por ArchiMate + método).

## Próximo paso

**Continuar con los comentarios visuales del operador en una conversación nueva**, iterando sobre el
prototipo (`docs/product/prototypes/twin-territorio-2026-07-20/index.html` → re-publicar al artifact URL).
Cuando el concepto visual cierre → refinar (`/po-ux` a mano: `01-spec.md` con § Mapa funcional + §
Pantallas + scenarios) y decidir el scope vs. `cruce-estructura-operacion-indicadores` y el arreglo de
tabs actual. Ratificación del operador + (si es decisión de fondo) ficha CK-NN.

## Changelog

- v1 2026-07-20 — captura del concepto "Twin como territorio" (idea): metáfora, zoom semántico z0-z3,
  conmutador de 5 capas ↔ O-codes, doble piel z0 (Territorio/BSC), anclaje metodológico, veredicto
  técnico (React Flow + swim-lane, harness-studio hermano), mockup interactivo publicado + iterado
  (fixes: dark-only, org completo 13 nodos, sin plomo, legibilidad z1). PENDIENTE: más ajustes visuales
  del operador en conversación nueva.
- v2 2026-07-20 (sesión 2) — **shell v2** ratificado por el operador tras investigación de UI
  (`research-shell-ui.md`: DTO/process mining · org-design what-if · gramática canvas/GIS/node-graph):
  rail = solo escala+capas con leyenda inline · inspector derecho contextual (home = Pulso/Apuesta/Loop)
  · top bar identidad As-Is + chips + contador + búsqueda ⌘K · LOD Niveles 1/2/3 con rollup (resuelve
  la legibilidad) · minimapa · teaser "Nueva corrida". Decisiones 7-8. Mockup re-publicado al mismo
  artifact y verificado en navegador (z0/z1/z2, BSC, capas, búsqueda, tema claro emulado, 0 errores).
- v3 2026-07-20 (sesión 2) — **auditoría contra el pool de historias** (26 historias barridas; mandatos
  z1/z2 = esta historia + `cruce-estructura-operacion-indicadores`; alimentadoras: brecha-proyecto,
  persona-puesto CK-12, captura-manual, rol-area-real; restricción transversal CK-24) → 6 gaps cerrados
  en el mockup: (1) **hilo MEDIDO**: motor `semaforo()` derivado al leer (gris = sin dato, nunca rojo
  por ausencia) — 9 KPIs con banda/mediciones; filas KPI en proc-cards z1, chips en header z2, drawer
  KPI con sparkline + banda + cadena KPI→KR(peso)→objetivo + caso "⚠ sin ancla de valor" (k-nps) +
  frescura vencida (k-vis ⌛); (2) **z2 con edges reales**: lienzo re-hecho en el world — bandas de
  carril + secuencia sólida + flujos alternos punteados con condición ("mora dura", "sin respuesta ×3");
  (3) **cinética en z1** (token sobre el proceso que mejora); (4) **capas honestas**: pintan en z2
  (brecha pin + chips hilo + dot salud) y capa sin efecto en la escala → atenuada con razón (disable
  honesto); (5) **lente personas en z1**: roles del área con ocupante por scan + "SIN PERSONA ASIGNADA"
  + nota CK-24 + tag rol-vacante en cards; (6) menores: severidad = tamaño en pins, VSM totales,
  RACI/mandato/procedencia en drawer actividad. Re-publicado + verificado (0 errores JS).
- v4 2026-07-20 (sesión 2) — **producto completo**: rail Escala → rail **Módulos** (decisión 9 — la
  escala es estado de drill, no menú); módulos Mejora (loop con KPI-movido + veredicto) · Método
  (M1/M3/M2 + gates + traza M-cards) · Cambios (ISO, git invisible); **corrida what-if demo**
  (banner + tinte + Δ diffs + impactos previous→new + gate → cola de Cambios). Decisión 10.
  Re-publicado + verificado módulo por módulo (0 errores JS).
- v5 2026-07-24 — **el viaje completo (CK-29)**: auditoría contra la visión unificada (el twin es un
  cerebro que compila trabajo) → decisiones 11-14: gramática de ficha universal (las 12 entidades
  navegables, hilo que nunca se corta, acciones kinéticas del schema con nivel+aprobación), capa
  **Trabajo** (arneses por puesto: vigente/desactualizado/sin — ficha rol con "el día del ocupante",
  ficha arnés con doctrina vista-generada + drift + recompilar), cadena **triage→funil→Arnesia**
  (columna Ideas M44 en Mejora; SC-14 recompilación en Cambios; pm-cie recompila al arnés al cerrar),
  fichas nuevas persona/rol/arnés/sistema/objetivo/idea/capability/empresa, bloque "el twin compila
  trabajo" en sala de mando, fixes 12 entidades/45 M-cards. Verificado headless (8 estados, capturas).
- v5.1 2026-07-24 — fix crítico de interacción: la capa de pins (div full-cover z4) se tragaba TODOS
  los clicks reales del mouse (`pointer-events`); presente desde el shell v2 — las verificaciones
  previas usaban dispatch directo que salta el hit-testing. Suite nueva de 15 viajes con
  `elementFromPoint` (hit-testing real): 15/15. + verificación en el artifact REAL vía Chrome del
  operador (claude-in-chrome): drill confirmado con eventos confiables.
- v6 2026-07-24 — **El Mapa de Valor** (decisión 15, ratificada): geografía nueva de 5 bandas con el
  hilo de oro como edges verticales; organigrama → piel-lente; BSC absorbido por la banda Estrategia;
  pasos mini por proceso (lenguaje fractal Arnesia); transversales por ancho. Suite v6 hit-tested:
  9/9, 0 errores JS.
