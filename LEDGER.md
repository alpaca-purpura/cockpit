# Ledger — Cockpit (fichas CK-NN)

> Continuidad: este repo nació de la graduación de la célula P1 del monorepo `prenter-harness`
> (2026-07-06). CK-01..CK-08 (fundación + extracción Stage 1-4) y CK-09 (la ficha de graduación)
> quedan allá, en `products/cockpit/LEDGER.md`, congelados como historia. Aquí arranca **CK-10** —
> misma numeración, sin romper identidad (a diferencia de otras graduaciones del mismo ecosistema
> que sí rompieron prefijo; decisión explícita del operador, ver CK-10).

## Fichas

### CK-10 · Fundación del repo propio — graduación de P1 con visión ampliada — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-06):* "Promueve el producto cockpit a una carpeta propia con un
repositorio propio... el proyecto se llamará Cockpit y su visión es la de ser un sistema para el
levantamiento, diseño, creación, propagación/adopción, monitoreo y mejora continua de procesos /
roles / objetivos / personas (puestos) basados en las buenas prácticas ISO... a este repositorio
traslada de forma ordenada todo lo avanzado con la lógica que tenemos de producto y servicio... y
que los mockups/investigaciones no se pierdan, que queden cableados para revisarlos cuando se
pida investigar."

*Desarrollo:* graduación ejecutada tras auditoría de 4 subagentes (metodología ya existente en el
monorepo · inventario de investigación/mockups dispersos · plantilla de las 3 graduaciones previas
del mismo ecosistema — DevHub/Kit/Harness Studio · relevancia de skills). Repo `~/Proyectos/cockpit`
(remote `alpacapurpura/cockpit`, privado) nacido con: código migrado byte-a-byte desde
`products/cockpit/` (Go module renombrado `github.com/alpacapurpura/cockpit`, UI renombrada
`cockpit-ui`) y **verificado standalone** (go build/vet/test + UI tsc/vitest + export estático
real — cero dependencia del monorepo de origen); VISION.md ampliada (identidad = 4 pilares
procesos/roles/objetivos/personas, marco ISO intermedio — ver fork abajo); LEDGER propio
continuando `CK-NN`; `docs/{research,mockups,architecture,methodology}/` con el material heredado
curado (campañas cockpit-negocio y modelo-objeto, subset de NODOS.md/ARCHITECTURE.md, M-cards de
gestión empresarial del catálogo de 31 metodologías); kit dev instalado como plugin
(`harness@prenter-marketplace`, canal estable, scope project).

**Forks firmados por AskUserQuestion:**
- **Alcance ISO = "marco entre ambos"** — ontología+PDCA como columna vertebral (hereda el
  veredicto I-05 del monorepo, "roba la ontología, rechaza el aparato") MÁS una capability futura
  declarada (no construida) de "preparación para auditoría" — gap-checklist vs. norma, sin aparato
  de certificación. Ver VISION.md §ISO.
- **Prefijo del ledger = continuar `CK-NN`** (no romper a uno nuevo, a diferencia del precedente de
  Harness Studio) — la identidad "Cockpit" no muta, solo se amplía.

**Deudas declaradas:**
- Persona/puesto sin modelo de dato propio (`negocio.schema` lo trata como texto libre) — hueco
  más grande identificado por la auditoría de metodología, candidato a CK-11.
- El mockup real y el pricing del deal Prospera NO viajaron (doctrina I-39 "cero data de cliente")
  — quedan en `prenter/clientes/prospera/`, solo referenciados desde `docs/research/`.
- `arquitectura.yaml` (heredado) sigue apuntando a fichas CK-01..CK-08 y a un generador
  (`gen_arquitectura_cockpit.py`) que vivía en el monorepo — no se portó el generador; el YAML
  queda como documentación curada a mano hasta que se decida si vale la pena un render propio.
- La campaña `~/Proyectos/campaign-cockpit-negocio/` estaba marcada "temporal, bórrala al cierre"
  en el monorepo de origen — su contenido fue rescatado a `docs/research/`, pero la carpeta
  original NO fue borrada (decisión del operador, no de esta sesión).

*Conecta:* ficha ecosistema en `tooling/strategy/LEDGER.md` del monorepo (graduación de P1, 4/4
productos graduados) · CK-09 (la ficha de graduación, lado viejo) · I-39 (cero data de cliente) ·
I-78/I-79/I-80 (precedentes DevHub/Kit/Harness Studio, mecánica replicada) · I-05 (veredicto ISO
heredado y ampliado aquí).

*Siguiente:* modelar persona/puesto como entidad de primera clase (CK-11) · decidir si el Motor de
Discovery (N1) arranca campaña propia.

### CK-11 · Nacemos ordenados — tríada sistema/capabilities/proyecto · método del auditor migrado · System Backlog — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "¿Tenemos product backlog y product increment? Audita — y no
confundas lo que es SISTEMA (arquitectura, metodología, doctrina as-code; se llama sistema porque
tiene múltiples puntos de despliegue) con los capabilities YA desarrollados (documentation-as-code)
ni con los documentos de cómo me organizo para construir ('Proyecto'). Organiza el trabajo
pendiente en un system backlog con una columna por subsistema/aplicación y dame un medio para
hacerlo contigo de forma ordenada — nacemos ordenados. Antes, audita la migración desde
`prenter-harness` (legacy): las cosas de servicio deberían venir también, ya que estará embebida
en la aplicación del auditor."

*Desarrollo:* auditoría de 2 subagentes (inventario cockpit + legacy). Hallazgos: (1) migración de
código completa y verificada (módulo renombrado, tests verdes), pero **método de servicio
incompleto** — faltaban `M3-ESPINAZO.md`, `PROCESS-AS-DATA.md` y `service/process/` completo
(proceso-como-dato m1/m2/m3); (2) **no existía backlog ni increment** como artefactos — el trabajo
pendiente estaba fragmentado en VISION §TBD, `arquitectura.yaml` (`estado: pendiente`), LEDGER
"Siguiente:" y campañas de research; (3) la tríada estaba mezclada (`objeto.schema.yaml` enterrado
bajo research; VISION declaraba la capability prep-auditoría "en arquitectura.yaml" pero el YAML
no la tenía — drift). Ejecutado: migración completada (`sistema/metodo/{M3-ESPINAZO,
PROCESS-AS-DATA,proceso/}`, refs `service/methodology/*` reescritas); **reorganización en tríada**
— `sistema/` (arquitectura + metodo + schema), capabilities = código + `docs/`
(`docs/INCREMENT.md` nuevo, 6 capabilities verificadas), `proyecto/` (backlog + research);
`objeto.schema.yaml` promovido a `sistema/schema/`; fixture Vértice deduplicada (SSoT en
`sistema/metodo/proceso/_sample/`); **System Backlog** sembrado con BL-01..BL-18 en 5 columnas
(sistema · vista-negocio · motor-discovery · app-auditor · contrato-datos); drift corregido en
`arquitectura.yaml` (rutas `products/cockpit/*` → rutas del repo; componentes `app-auditor` y
`prep-auditoria` añadidos).

**Forks firmados (respuestas del operador en sesión):**
- **App del Auditor = subsistema propio.** Aplicación instalable del Consultor (patrón
  harness-studio/dev-studio); su resultado se publica al repositorio de la empresa cliente —
  "deploy de procesos": como código a producción, pero el artefacto son procesos/roles/objetivos
  que Cockpit entiende y renderiza. Nueva columna del backlog + componente en arquitectura.yaml +
  VISION §Arquitectura (que pasa de "dos mitades" a "las piezas").
- **Backlog = as-code.** `proyecto/backlog.yaml` SSoT + `BACKLOG.md` vista curada (mismo evento,
  jamás divergen); disciplina cableada en `CLAUDE.md` y `proyecto/README.md`.
- **Migración de servicio = copiar ya, destilar en el camino** (BL-07 queda `en-curso`).

*Addendum (misma sesión, v2):* el operador pidió cerrar dos huecos de la propia CK-11 — (1)
**única fuente de la verdad del pendiente**: VISION §TBD desduplicado (ahora apunta a BL-NN, el
detalle vive solo en el backlog; los "Siguiente:" de fichas quedan como narrativa histórica,
regla escrita en el header de backlog.yaml y en CLAUDE.md); (2) **Product Increment as-code**:
`docs/increment.yaml` (SSoT, CAP-01..CAP-06, cada capability cableada a los componentes
`estado: activo` de arquitectura.yaml) + `INCREMENT.md` degradado a vista humana — mismo patrón
SSoT-yaml/vista-md que el backlog.

**Deudas declaradas:**
- Research sin destilar del todo — mezcla narrativa de campaña con salidas de sistema (BL-07).
- `NODOS.md` sigue reflejando estados pre-Stage-4 en varias fichas de nodo (p.ej. contrato de
  datos "a diseñar" cuando CK-08 ya lo diseñó) — se corrige al terminar la arquitectura (BL-03).
- Prioridades del backlog = propuesta de la auditoría; faltan firmas del operador.

*Conecta:* CK-10 (deudas heredadas → BL-01/BL-08/BL-09) · CK-08 (contrato de datos → BL-18) ·
I-05 (límite de prep-auditoria) · I-39 (Prospera sigue fuera, sin cambio).

*Siguiente:* operador firma prioridades del backlog · arrancar BL-15 (definir App del Auditor) o
BL-01/BL-02 (modelo de datos persona/puesto + reconciliación de schemas) como primera campaña.

### CK-12 · Personas de primera clase — slice vertical persona/rol (cierra BL-01) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "Ok, vayamos con el BL-01" — primera firma de prioridad sobre el
System Backlog (CK-11); alcance firmado por AskUserQuestion: **slice vertical con UI**.

*Desarrollo:* la campaña modelo-objeto ya había clavado el diseño (D-09: cadena
persona→rol→proceso; D-11: objeto.schema aditivo; D-13: negocio.yaml = proyección, el pilar
Personas vive upstream, en las entidades; D-15: instancias en `<shell>/empresa/<tipo>/` layout
plano). Lo que faltaba era implementación: el cockpit solo leía negocio.yaml y `puesto` era texto
libre dentro de proceso. Ejecutado:

- **Reconciliación D-15**: `sistema/schema/objeto.schema.yaml` corrige `meta.aplica_a` de
  `data/<tipo>/` a `empresa/<tipo>/` (el desajuste interno que D-15 dejó anotado).
- **`go/personas.go` — GET /api/personas?empresa=**: lee persona + rol un-archivo-por-entidad del
  shell de la empresa, valida el subset que rompe silencioso (ids únicos, `persona.roles[].rol` y
  `reporta_a` resuelven, sin ciclos de `reporta_a`, enums conf/fuente) como warnings no-fatales —
  espejo del patrón `validateNegocio`. Carpetas ausentes → listas vacías = empty-state honesto;
  archivo YAML roto → warning con nombre de archivo, la respuesta no rompe.
- **Cuarta lente "Personas" en la Vista de Negocio** (`PersonasTab.tsx` + modelo puro
  `ui/lib/personas.ts`, 7 tests vitest): roles con quién los cumple (inverso por scan,
  un-hecho-un-lugar), vacantes delatadas ("sin persona asignada" — caso rol cumplido externamente
  por el holding), procesos que corre cada rol (match `puesto`↔`rol.nombre` — puente consciente
  hasta que negocio.yaml se genere del objeto, D-13). La lente es visible AUN SIN negocio.yaml,
  porque el pilar vive upstream (caso dogfood: prenter tiene personas/roles y no tiene diagnóstico).
- Componente `personas-api` registrado en `arquitectura.yaml`; capability **CAP-07** al increment.

**Forks firmados:**
- **Alcance = slice vertical con UI**, sabiendo que el design system (BL-04) no existe aún: la
  lente extiende NegocioView (no es vista nueva); se re-estiliza contra el design system cuando
  exista — deuda de estilo declarada, no silenciosa.
- **La convergencia BL-02 arranca por acá**: contrato vigente = objeto.schema; persona+rol son las
  primeras 2 de 9 entidades leídas del objeto normalizado. BL-02 sigue abierto para el resto.

**Verificación (2026-07-07):** go build/vet/test + tsc + vitest (32 tests) + export estático,
todos verdes; binario `directorio` contra el shell real de prenter — `/api/personas` sirve
1 persona + 7 roles con cero warnings, la lente renderiza con la data real, empty-states honestos
en empresas sin pilar poblado, 400 en empresa desconocida.

*Conecta:* CK-11 (backlog/increment as-code, promoción de objeto.schema) · D-09/D-11/D-13/D-15
(campaña modelo-objeto) · BL-01 (cierra) · BL-02 (avanza, no cierra) · BL-04 (deuda de estilo).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml` (BL-02 reconciliación
completa del objeto · BL-04 design system antes de la próxima vista nueva).

### CK-13 · El objeto completo — /api/objeto con las 9 entidades (cierra BL-02) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "Termina el resto de entidades."

*Desarrollo:* CK-12 dejó leídas 2 de 9 entidades (persona/rol en `/api/personas`). Las refs del
Hilo de Oro cruzan entidades (`brecha.against_ref` → capability|proceso|sistema|objetivo;
`kr.driver_refs` → proceso|capability; `actividad.carril_ref` → rol; `area.lider_ref` → rol…) →
la validación necesita el objeto ENTERO en un solo chokepoint. Ejecutado:

- **`go/objeto.go` — GET /api/objeto?empresa=**: las 9 entidades (`empresa.yaml` = raíz del
  tenant + 8 carpetas un-archivo-por-entidad, layout plano D-15), validadas JUNTAS al leer: ids
  únicos por tipo, toda ref FK y ref local (`#`) resuelve, enums (digital · conf · prio ·
  procedencia · fuente · sirve_a · tipo_actividad · gap_tipo), `key_results ≥ 1`, RACI A
  exactamente 1, ids locales únicos dentro del padre, sin ciclos (`reporta_a` ·
  `area.parent_ref`), `empresa.id == slug`. Warnings no-fatales (patrón `validateNegocio`).
- **`/api/personas` superseded** la misma sesión en que nació (cero consumidores externos): la
  lente Personas consume la rebanada personas/roles de `/api/objeto`; componente `personas-api` →
  `objeto-api` en arquitectura.yaml. Los warnings que ve la lente son ahora del objeto entero —
  un `carril_ref` colgante en un proceso también delata al pilar Personas.
- Increment reacomodado: **CAP-07 = la lente Personas** (UI) · **CAP-08 = el API del objeto**.

**Verificación (2026-07-07):** go build/vet/test + tsc + vitest (32 tests) + export estático,
todos verdes; binario contra el shell real de prenter — el objeto entero servido: empresa +
1 persona + 7 roles + 5 áreas + 12 procesos (con actividades/RACI) + 8 sistemas + 5 capabilities,
**cero warnings** (el objeto dogfood está íntegro: todas las refs del Hilo resuelven); la lente
Personas renderiza igual contra el endpoint nuevo.

**Deuda/siguiente declarado:** el último tramo de la convergencia D-13 — voltear `negocio.yaml` a
PROYECCIÓN generada del objeto (mecanismo D-04: archivo generado vs join-en-vivo) — nace como
**BL-19** (gatillo: objeto poblado con objetivos/brechas; hoy prenter tiene 0 y 0).

*Conecta:* CK-12 (primera rebanada) · D-04/D-13/D-15 (mecanismo, proyección, layout) · BL-02
(cierra) · BL-19 (nace).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-14 · Arquitectura terminada — N14 App del Auditor al mapa + estados post-Stage-4 (cierra BL-03) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "Quiero realizar el BL-03 del backlog."

*Desarrollo:* lo encontrado — `NODOS.md` con 13 nodos y fichas reflejando estados pre-Stage-4
(deuda declarada en CK-11: contrato de datos "a diseñar" cuando CK-08 ya lo diseñó; N13 "embebido
en N5" cuando Stage 4 ya desmontó el andamiaje; `/api/objeto` de CK-12/CK-13 ausente); la App del
Auditor declarada subsistema (CK-11) pero **fuera del mapa de despliegue**; y el link a
`despliegue.html` muerto — el diagrama quedó en el monorepo legacy, también desactualizado
(binario único pre-I-74, drawer dependiente de `nodos.data.js` generado, generador no portado).
Ejecutado:

- **N14 · App del Auditor** — ficha completa en `NODOS.md` (Edge/máquina del consultor · app
  instalable · no-construido · ★IP): método embebido viaja con nuestra persona, al repo del
  cliente solo cruza el resultado; **R16** (operar el método m1·m2·m3 con carriles/provenance) y
  **R17** ("deploy de procesos" → N6) en el responsibility-walk, con etapa nueva **E3 =
  Mantenimiento (M2)**. Cableada en N6 (escritor), N9 (su herramienta), N13 (consumidor), chequeo
  de consistencia IP (no lo rompe: edge nuestro, no infra del cliente). Los límites quedan fijados
  ANTES de definir el producto (BL-15) — la definición se hace contra estos límites.
- **Estados post-Stage-4 corregidos**: N5 (andamiaje desmontado, DevHub graduado, contrato
  diseñado CK-08 con endpoint/envelope/auth explícitos, BL-18), N13 (reescrito: binario
  `directorio` puerto 4100, madurez `existe`, expone `/api/objeto` con las 9 entidades, repo
  propio CK-09/CK-10), pendientes consolidados (#6 cerrado por CK-08; lista degradada a narrativa
  — el tracking vive en el backlog, regla CK-11 aplicada también aquí).
- **`despliegue.html` portado y actualizado**: dos binarios independientes en el data plane,
  contrato CK-08 como pieza diseñada-sin-código, N14 en el edge del consultor con su flujo de
  publicación, tabla de protocolos con columna de estado, decisiones al día (2026-06-20 → CK-14).
- **`ARCHITECTURE.md` al día** (14 nodos, R1–R17, diagrama ASCII con los dos binarios + N14,
  links del monorepo anotados como legacy, decisiones ampliadas) + `README.md` de arquitectura
  reescrito + refs `CK-14`/`N14` en `arquitectura.yaml` y `VISION.md`.

**Forks firmados (AskUserQuestion):**
- **Diagrama = portar estático actualizado, sin drawer.** El drawer del legacy lee
  `nodos.data.js`/`interfaces.data.js` GENERADOS desde NODOS.md; sin el generador,
  hand-escribirlos = segunda SSoT que driftea. Fichas → `NODOS.md` (SSoT); el HTML es la vista
  visual, curada a mano en el mismo evento que la decisión que la cambia.

**Deuda consolidada al backlog:** la deuda Go/Next del lado Cockpit (N13 → Vite SPA) vivía solo
como narrativa en NODOS; nace **BL-20** (disciplina CK-11: el pendiente se trackea en el backlog).

**Verificación (2026-07-07):** revisión cruzada de refs — índice/fichas/R-walk consistentes (14
nodos, R1–R17 resuelven), `despliegue.html` sin dependencias muertas, YAMLs parsean, links
relativos válidos.

*Conecta:* CK-11 (deuda declarada + App del Auditor declarada + disciplina backlog-SSoT) ·
CK-07/CK-08 (los estados que se corrigieron) · CK-12/CK-13 (`/api/objeto` a la ficha N13) ·
BL-03 (cierra) · BL-20 (nace) · BL-15..BL-17 (límites arquitectónicos listos para la definición).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-15 · Render de la arquitectura-as-code — gen_arquitectura.py (cierra BL-08) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "¿Hay forma de que el mockup lea de la arquitectura as-code para
visualizarla? … Sí, arranca — necesito ver todo de forma visual para poder confirmar o pedir
cambios sobre la arquitectura del sistema."

*Desarrollo:* el legacy ya resolvía esto (gen_nodos.py + gen_arquitectura_cockpit.py, no portados
en CK-10); el render de célula dependía del shell de harness-studio (P4, otro producto) —
copiarlo sería fork silencioso, así que el render aquí es propio y self-contained. Ejecutado:

- **`sistema/arquitectura/gen_arquitectura.py`** — un script, dos SSoT, dos salidas GENERADAS:
  `NODOS.md` → `nodos.data.js` (fichas para el drawer) y `arquitectura.yaml` →
  `arquitectura.html` (vista de la célula: planos como bandas, tarjetas coloreadas por estado
  activo/declarado/pendiente, fichas CK-NN como chips, tabla de relaciones, drawer por componente
  con propósito/fichas/relaciones entrantes y salientes). Modo `--check` = gate anti-drift
  (exit 1 sin escribir).
- **El diente del gate** (heredado de la doctrina del legacy): índice↔fichas de NODOS ambos
  sentidos · toda ref `[R#]` resuelve al responsibility-walk · relaciones joinean (from/to) ·
  `tipo ∈ {usa,compone,adapta,alimenta,gobierna}` · `estado ∈ {activo,declarado,pendiente}` ·
  rutas existen · fichas `CK-10+` resuelven en LEDGER.md. **CK-01..CK-09 = historia congelada**
  del monorepo (este ledger arranca en CK-10) — se aceptan sin verificar; el primer run del gate
  las delató, prueba de que muerde.
- **Drawer de `despliegue.html` restaurado**: clic en cualquier nodo (N1..N14, también las
  píldoras del flujo) → su ficha completa de NODOS.md. La razón del fork CK-14 (no hand-escribir
  el data.js) desaparece: ahora es generado.
- **Verificación en navegador real** (Chrome, `file://`): despliegue.html renderiza y el drawer
  abre N14 con sus 13 campos; arquitectura.html renderiza 4 planos · 17 componentes · 17
  relaciones y el drawer de componente funciona. `--check` en verde tras regenerar.

**Doctrina:** los `.data.js`/`.html` generados se commitean JUNTO con la edición de su SSoT
(mismo evento); jamás se editan a mano. Regla escrita en `README.md` de arquitectura y en los
headers de ambos artefactos.

*Conecta:* CK-10 (deuda del generador no portado) · CK-14 (fork "sin drawer" — superseded en la
parte del drawer: ya hay generador) · CK-11 (disciplina mismo-evento) · BL-08 (cierra) ·
I-73/I-60 (arquitectura-como-dato y DIP del legacy, espíritu heredado).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-16 · P2 = DevStudio — re-fichado N5 (server→app de escritorio) · contrato CK-08 derogado · N6 = GitHub — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "Hemos creado DevStudio, que reemplaza al devhub (antes cockpit)
— repo `~/Proyectos/dev-studio`. Los desarrolladores tendrán a la mano los repositorios que
manejan y las historias que tienen que desarrollar; estamos haciendo una versión para el Product
Manager con el refinamiento y priorización, para que los developers en sus propias aplicaciones
ya puedan revisar qué les tocó — todo a través de GitHub como canalizador. (Cómo conectamos
lo veremos cuando se implemente esa parte.) Si tienes dudas, grill me."

*Desarrollo:* recon del repo P2 — DevStudio continúa el ledger DH-NN (graduación DH-12; el repo
`~/Proyectos/devhub` ya no existe): **app de escritorio multiplataforma** (binario Go + UI
embebida, instalador = el binario) para CTO/developer/devops/PO trabajando orquestados, GitHub
como punto de encuentro, Claude Code vía **driver CLI-nativo BYO-licencia** (DH-10). El cambio
rompe dos supuestos del mapa: N5 era *server en el data plane del cliente* (ahora es app edge
por usuario) y el contrato CK-08 era *Pull API contra ese server en vivo* (ya no hay host).

**Forks firmados (grill vía AskUserQuestion):**
1. **N5 se re-ficha** (conserva número e historia) → "DevStudio — app de escritorio de
   desarrollo (P2)", plano Data→**Edge**; el rol de punto compartido pasa a GitHub/N6. Ficha
   deliberadamente magra: fija la frontera con Cockpit, el detalle lo gobierna P2 (DH-NN).
2. **Contrato CK-08 = DEROGADO.** BL-18 redefinido: "diseñar+implementar la conexión
   DevStudio/GitHub→Cockpit, mecanismo TBD con el primer consumidor real" — coherente con el
   "veremos cuando se implemente" del operador. Disciplina anti-código-especulativo intacta.
3. **N6 = repo GitHub del cliente** (org propia) + **matiz BYOC firmado**: la promesa pasa de
   "nunca sale de su red" a *"sus datos viven en SU GitHub y sus sistemas, no en infra
   nuestra"* — misma soberanía, residencia explícita; el crudo sensible (N12) nunca toca
   GitHub; git self-hosted = opción documentada para regulados (espejo del "LLM on-premise").
4. **Versión PM = nota en la ficha de N5**, sin nodo/actor propio — se modela cuando la
   conexión se implemente (anti-especulación).

Ejecutado: NODOS.md (N5 movido a EDGE y reescrito; N6 re-fichado; N13 "único binario del data
plane"; N3/N8/N10 ajustados; chequeo BYOC con el matiz; pendientes consolidados #3/#5/#6) ·
`despliegue.html` (data plane con un binario; DevStudio en la laptop del dev; flujo delivery
PM→dev→Claude Code; tabla de conexiones; decisiones) · ARCHITECTURE.md · README arquitectura ·
arquitectura.yaml (componente `devhub-delivery`→DevStudio, `contrato-datos`→conexión sin
mecanismo; regenerado `arquitectura.html`) · VISION §Ecosistema · CLAUDE.md · INCREMENT.md ·
backlog (BL-18 + columna renombrada) + BACKLOG.md.

*Addendum (misma sesión):* aclaración del operador sobre N8 — "es DevStudio el que lo gestiona;
DevStudio **se cuelga sobre N8 para programar**". Cableado en N8 (resumen + consumido_por: N5 es
su gestor — parametriza, dispara y supervisa las sesiones; el dev trabaja desde DevStudio, no el
CLI a pelo; N8 = el motor debajo), en N5 (responsabilidades) y en el diagrama.

*Addendum 2 (misma sesión):* "la App del Auditor (N14) también funcionará igual — se cuelga del
Claude Code instalado en la máquina, como DevStudio". Esto **cierra la decisión de runtime que
N14 tenía abierta** (¿suscripción interactiva o API key? — quedaba para BL-15): firmado = driver
CLI-nativo sobre el `claude` del consultor, BYO licencia, la app jamás toca credenciales de
Anthropic; lo desatendido/server-side, si existe algún día, va por N1 con API key. Emergió el
**patrón común del ecosistema**: app instalable = superficie · Claude Code local = motor ·
licencia = del humano firmado (N5/dev, N14/consultor) — registrado en el chequeo de consistencia
3 de NODOS.md. BL-15 queda con el resto (alcance/stack/UX).

*Addendum 3 (misma sesión):* el operador preguntó por la asimetría del diagrama — el Developer
mostraba DevStudio + Claude Code como dos cajas y el Consultor solo N14. Causa: N8 estaba fichado
como runtime *de Delivery* (específico del dev) y el claude del consultor era solo dependencia de
N14. Fork firmado = **B: generalizar N8 → "Runtime de agente local (Claude Code)"** — motor común
con una instancia por humano firmado: la del dev la gestiona N5, la del consultor N14; N8 presta
el motor, jamás es dueño del método (N14) ni del proceso (N5). Índice, fichas N8/N14/N9, chequeo
3 y diagrama (columna consultor ahora muestra N14 + su N8) actualizados.

*Conecta:* I-74/CK-07 (frontera P1/P2 — sigue; el runtime de P2 cambió de forma) · CK-08
(**deroga** su diseño; la ficha vive en la historia congelada del monorepo, la derogación se
registra aquí) · CK-14 (mapa que se re-ficha) · DH-10/DH-12 (decisiones de P2 citadas) ·
BL-18 (redefine) · BL-20 (sin cambio — la deuda Go/Next quedó solo del lado N13).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-17 · Gate anti-drift automático — pre-commit hook + validación de despliegue.html — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-07):* "¿arquitectura.html también se renderiza automático ante los
cambios como despliegue?" → aclarado el modelo (arquitectura.html = 100% generado; despliegue =
curado con drawer generado; nada corre solo sin invocar el script) → "Me parece bien, hagámoslo
[pre-commit hook], y que actualice despliegue también si fuera posible."

*Desarrollo:* dos piezas —

1. **Validación de `despliegue.html` en el generador.** El layout es curado a mano (generarlo
   destruiría la narrativa visual), así que "actualizarlo automático" se resuelve como **gate**:
   todo nodo del índice de NODOS.md aparece en el diagrama (`data-nodo`) y viceversa, y la
   **madurez** de cada art coincide con la del índice (incluye el caso `existe` vs `existe
   (parcial)`). Si divergen → exit 1 con mensaje puntual; el diagrama se corrige a mano en el
   mismo evento. Test negativo ejecutado: madurez adulterada de N13 → el gate la delató.
2. **Hook versionado `.githooks/pre-commit`** (+ `git config core.hooksPath .githooks`, config
   local documentada en el README para clones nuevos): en cada commit corre el generador —
   valida las tres fuentes, **regenera `nodos.data.js` + `arquitectura.html` y los agrega al
   commit** (mismo evento, sin paso manual); si algo no valida, **bloquea el commit**. Patrón
   heredado del `gen_all.py --check` del monorepo, en versión regenera-y-stagea.

*Conecta:* CK-15 (el generador que se extiende) · CK-14 (despliegue.html curado que ahora se
valida) · CK-11 (disciplina mismo-evento, ahora con diente automático).

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-18 · Rediseño de fondo — Fábrica + Organización instalada · el método se entrega en arneses · mueren N1/N4/N7 — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-08):* rediseño del ecosistema tras varias sesiones de revisión de
`despliegue.html`/`arquitectura.html`. "Voy a construir una aplicación para el consultor propia, que
se cuelgue sobre Claude Code, con arneses creados por Arnesia (`~/Proyectos/harness-studio`), desde
la cual el consultor podrá hacer todo el levantamiento y 'construir' todo el mapa completo, como un
desarrollador hace software … y lo colgaría en el Repositorio del cliente (que ya no sería GitHub,
sino un repositorio confidencial en un servidor/máquina del cliente). N7 lo eliminamos de momento,
todo será a través del consultor. Agregamos un 'Data Lakehouse' que nutra al Cockpit para mostrar no
solo la organización sino cómo vamos día a día. El Cockpit sería solo Cockpit, con niveles de acceso
por rol." + diagrama `mapaCockpitTotal`.

*Desarrollo:* el cambio deroga el eje BYOC-con-motor-server-side. Se lanzaron **7 investigaciones
SOTA** (2026-07-08, en [`proyecto/research/rediseno-total/`](../cockpit/proyecto/research/rediseno-total/)):
repositorio oficial (git/Forgejo), data lakehouse (dlt+DuckLake), knowledge DB (files-first),
distribución/licencias/telemetría (go-tuf v2 + Tauri + Ed25519 + OTLP), auth/RBAC (embebida
policy-as-data), gestión de cambios ISO (git + UI que oculta git), proceso-como-arnés (skill=proc,
plugin=rol; hueco competitivo real). El mapa nuevo se propuso visualmente (artefacto) y el operador
firmó 5 decisiones.

**Decisiones firmadas (D1..D5, AskUserQuestion + confirmación directa):**
1. **D1 — Deroga el límite de IP "el método nunca al cliente".** El método SÍ cruza, empaquetado en
   arneses que corren en el edge del cliente (Consultio/N14, Colab Studio/N17), y **Arnesia se
   entrega** al cliente para que los mantenga. La protección pasa de **arquitectura** a **licencia +
   contrato** (canal N3 revocable). Riesgo residual documentado en las fichas (chequeo 1 de NODOS).
2. **D2 — N18 (Sistemas operacionales) y N19 (Analista de Calidad) = nodos propios** (RACI/fuentes
   distintos, merecen ficha).
3. **D3 — Data Lakehouse:** default en la infra del cliente; "hosteado por nosotros" = modalidad
   comercial documentada, no el default.
4. **D4 — App del Consultor = "Consultio"** (clon de DevStudio con adaptación propia; arranca cuando
   DevStudio esté terminado).
5. **D5 — Knowledge Database:** declarada `pendiente`, files-first en el repo cuando haya demanda;
   vector DB nunca antes (el operador: "intuyo que será importante pronto").

**El mapa nuevo (tres planos):**
- **Fabricante (nuestro):** N15 Arnesia (nace, fábrica de arneses), N2 Repositorio Maestro (re-ficha,
  era Playbook+Metodología — ahora guarda también arneses plantilla + código; el motor de discovery
  vive aquí como arneses), N3 Distribución+telemetría+**licencias** (re-ficha, crece).
- **Organización (cliente):** N6 Repositorio Oficial (re-ficha, ya no GitHub — git self-hosted
  confidencial), N13 Cockpit (re-ficha — Visualización + **Gestión de Cambios** + niveles de acceso),
  N16 Data Lakehouse (nace), N12 Depósito (sigue), N18 Sistemas operacionales (nace).
- **Edge:** N14 Consultio (re-ficha, era App del Auditor), N17 Colab Studio (nace), N5 DevStudio
  (amplía — también a devs del cliente), N8 Claude Code (sigue, motor común), N9 Consultor
  (transferible → N19), N19 Analista de Calidad (nace), N10 Developer (sigue), N11 Usuarios de la
  organización (re-ficha — 4 niveles).
- **Mueren:** N1 (Motor de Discovery server-side → arneses; deroga BL-13), N4 (voz, diferida), N7
  (agentes efímeros → todo el levantamiento es vía consultor).

*Ejecutado:* NODOS.md (reescrito: header, índice de 16 nodos, R-walk R1..R15 nuevo, fichas, chequeos
de consistencia — el chequeo 1 pasa de "IP por arquitectura" a "IP por licencia+contrato", el hallazgo
"transitan no persisten" reencuadrado a la inferencia local N8) · `despliegue.html` (curado a mano:
tres planos, edges por humano, flujo objetivos→operación, tabla de conexiones, decisiones D1..D5;
data-nodo de los 16 nodos, madurez sincronizada) · `arquitectura.yaml` v0.2.0 (célula: plano
`fuentes` nuevo, componentes Consultio/Arnesia/Distribución/Repositorio Oficial/Data Lakehouse/Gestión
de Cambios/niveles-acceso, `motor-discovery` y `app-auditor`/`contrato-datos` retirados) + regenerados
`nodos.data.js` + `arquitectura.html` (gate verde) · 7 informes SOTA en `proyecto/research/rediseno-total/`
· backlog (columnas + BLs redefinidos/nuevos) + BACKLOG.md · VISION.md · CLAUDE.md · ARCHITECTURE.md
· README de arquitectura.

*Conecta:* CK-14/15/16/17 (el mapa que se rediseña) · CK-11 (disciplina mismo-evento + backlog-SSoT) ·
CK-08 (ya derogado en CK-16; el contrato de datos se reemplaza por las conexiones N6/N16→Cockpit) ·
BL-13 (**derogado**: N1 no se construye como servicio) · BL-15/16/17 (redefinidos: Consultio) · BL-18
(redefinido: Lakehouse→Cockpit) · BL-12 (sube a alta: niveles de acceso). Nota disciplina: en fase de
construcción no se corta ficha por cada cambio (memoria `ledger-ligero`); esta es de fondo — cambio de
rumbo del ecosistema — por eso lleva ficha.

*Siguiente:* narrativa — el pendiente vive en `proyecto/backlog.yaml`.

### CK-19 · Adopción del arnés prenter — migración total al proceso as-code + amplían las dos extensiones (arquitectura/metodología) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-09):* "necesitamos una metodología de desarrollo de software madura, que
podamos utilizar. Para ello instala el plugin del marketplace de prenter … lleva toda la información que
hemos creado como capabilities, etc. y todo lo que vamos a construir como historias de usuario … sin haber
perdido nada de información, [para] seguir programando bajo la doctrina del plugin de prenter. Lo único que
no tiene prenter que nosotros tenemos que ampliar es la metodología as code, y la arquitectura as code —
extender y cablear apropiadamente."

*Desarrollo:* censo profundo de ambos lados (subagentes). El arnés `harness@prenter-marketplace` (KIT 0.5.3)
= kit de **proceso** agnóstico que lee `project.config.yaml` (el seam); adopción = llenar el seam →
`/harness:bootstrap` (re-exponer reglas always-on + hooks) → correr el ciclo idea→done. Hallazgo clave: el
manifest always-on del plugin está **vacío** (scaffold) → `.claude/rules/` es el único canal always-on, así
que el bootstrap es obligatorio. Cockpit ya tenía un sistema **maduro y paralelo** (VISION/LEDGER/backlog/
increment + `sistema/` as-code con drift-gate) — la migración es mapear ese sistema al vocabulario del arnés.

**Forks firmados (AskUserQuestion, 2026-07-09):**
1. **Q1 — Migración total.** `docs/product/` pasa a ser el SSoT (historias + capabilities + releases);
   `proyecto/backlog.yaml` + `docs/increment.yaml` se **archivan** (congelados, no borrados). `sistema/` queda
   como las dos extensiones.
2. **Q2 — Fundación + esqueleto completo** en esta sesión (bootstrap + seam + cablear extensiones + espejar
   8 CAP + 23+ historias + reglas project-layer + MAPEO + esta ficha).
3. **Q3 — Reconstruir gen+gate de la metodología ahora** (el schema/generador gemelo quedó en el monorepo de
   origen): `methodology.schema.yaml` + `gen_metodo.py` + gate en pre-commit, a paridad con arquitectura-as-code.

*Ejecutado:* **bootstrap** — 21 reglas CORE copiadas byte-idénticas a `.claude/rules/` (+ `_HARNESS-CORE.md`),
`grep-bot` a `.claude/agents/`, doctrina a `docs/process/harness/`, templates a `docs/product/templates/`,
seam `project.config.yaml` (doctor exit 0), loader `scripts/harness_config.py`; hooks de telemetría vía el
plugin (Stop/SubagentStop/SessionEnd → emit.py, sink local). **Migración total (lossless)** — 29 historias
(`docs/product/stories/<module>/<story-id>/` = story.yaml + 00-story.md; 23 idea · 5 done · 1 dropped) con
`provenance{}` verbatim de cada BL, 8 capabilities (CAP-01..08 → `capabilities/cockpit/`), 2 releases (F0/F1),
7 module docs, `README.md` + `MAPEO.md` (prueba nada-perdido). **Extensión #1 arquitectura** — regla
`arquitectura-as-code.md` que **supersede** `paradigm-arquitectura.md` del CORE (planos Fabricante/Organización/
Edge; §Dónde-vive ancla a `node: N-NN`). **Extensión #2 metodología** — `methodology.schema.yaml` +
`gen_metodo.py` (valida 31 M-cards + árbol `proceso/` + regenera METODOLOGIA.md §4) + segundo gate en
`.githooks/pre-commit`; regla `metodologia-as-code.md`. Regla `cockpit-stack.md` (adapta los supuestos SaaS del
CORE). `CLAUDE.md` reescrito a la doctrina del arnés; banners de archivado en backlog/increment + sus vistas.

**Deudas declaradas:**
1. **Bug del KIT 0.5.3 (backflow pendiente):** `find_unfilled` en `harness_config.py` recursa infinito ante
   cualquier leaf `null` del seam. Workaround in-contract (sin editar el CORE): sin `null` en el seam. Debe
   upstreamearse al kit (no fork silencioso).
2. Historias en `idea` **sin refinar** — `01-spec.md`/`checkpoint.md`/`06-tickets.yaml` se crean al promover
   a refining/developing (no se inventaron scenarios a nivel idea).
3. Árbol `proceso/` **parcial** (m1/b1 + m3/e0; resto skeleton) — completarlo = historia `poblar-metodo-m1-m3`.
4. Reglas CORE traen supuestos SaaS/multitenant/agentes que Cockpit no cumple — documentado y neutralizado en
   `cockpit-stack.md` (escenarios tenant-isolation = N/A hasta que exista auth).

**Verificación (2026-07-09):** doctor `exit 0` · gate arquitectura `--check` verde · gate metodología `--check`
verde (31 M-cards + proceso/ válido + §4 en sync) · `go build/vet/test` verde · UI `tsc` + `vitest` 32/32
verdes · 29/29 BL y 8/8 CAP con round-trip parse == fuente (subagentes de migración). Telemetría: emite en el
primer Stop de sesión (sink local `~/.prenter/telemetry/cockpit/`, sin egress = default).

*Conecta:* CK-11 (tríada + disciplina backlog-SSoT, ahora evolucionada a `docs/product/`) · CK-17 (gate
arquitectura, gemelo del nuevo gate de metodología) · CK-18 (los 16 nodos que las historias ancoran) · toda la
numeración BL-01..29 y CAP-01..08 (preservada en `provenance`). El arnés = el "kit dev" que CLAUDE.md ya
nombraba, ahora **instalado y cableado**.

*Siguiente:* narrativa — el pendiente vive en `docs/product/` (historias `idea/refined/ready`); ver `MAPEO.md`.

### CK-20 · Cableado del arnés — corpus del KIT materializado + hueco 0.5.3 documentado (roles a mano) — `decidida` · `vig:vigente`

CK-19 adoptó el arnés; **CK-20 lo termina de cablear**. Se materializó, a los paths convencionales que las
reglas referencian, el corpus que el KIT 0.5.3 **sí** publica pero que la adopción no había copiado:
- `docs/process/` ← los 6 process-docs del KIT verbatim (tier:core, no editar): `harness-lifecycle`,
  `ticket-states`, `continuous-improvement` (CIL), `spec-mapa-funcional`, `tech-debt`, `cockpit-permissions`.
- `scripts/git/` ← los 6 scripts de coordinación (`session-lock`, `commit-paths`, `dod-evidence-gate`,
  `multi-session-scope-guard`, `cleanup-wip-branches`, `ps1-harness`) que `parallel-safety`/`git-safety` citan.
- `docs/process/harness-backlog.md` + `learnings.md` — los archivos de captura del HLP (carriles L1/L2 del CIL).

**Decisión (3 forks ratificados):** (Q1) copiar a paths convencionales — **extiende la razón CK-19** (copiar,
no symlink a la cache versionada/volátil del plugin → repo portable). (Q2) el KIT 0.5.3 **no publica** el
pipeline ejecutable → **documentar el hueco + operar los roles a mano**, sin autoría propia (fork silencioso
prohibido; se upstrea el "W8 lift-kit"). (Q3) commit de la base CK-19/20 primero, luego la reorg; sin push.

**Revisión de colocación (lo pedido — "dónde va cada archivo"):** ya correcto y sin mover — `CLAUDE.md`,
`VISION.md`, `README.md`, `LEDGER.md`, `project.config.yaml` viven en root (seam + norte + project-layer);
`docs/product/**` es el SSoT del qué-construir; `.claude/rules|agents|settings.json` re-expuestos;
`sistema/**` = los dos ejes as-code. Lo único que faltaba poblar era `docs/process/` y `scripts/git/`.

**Hueco del KIT 0.5.3 (registrado en `harness-backlog.md` HB-C1..C5 — no es cableable, es subset extractable):**
role-skills (`/pm · /dev-team · /auditor · /architect · /po · /harness-issue`) + sub-agents (`auditor-*`,
`builder-*`) no publicados (W8 lift-kit) · **13 reglas** citan `docs/rules-detail/*` ausente · **3 reglas**
citan templates `03-arch/04-validators/06-tickets` ausentes · varios `docs/process/*` (capability-protocol,
lifecycle, parallel-sessions-protocol, promotion-protocol, audits, ADRs) no extraídos · registry con
duplicados 0.5.2. Materializar/escribir project-layer **solo cuando el ciclo lo ejerza**, no masivo.

**Verificación (2026-07-09):** gate arquitectura `--check` verde · gate metodología `--check` verde · doctor
`exit 0` · base CK-19/20 commiteada (`00994ea`) con los dos gates as-code corriendo en el pre-commit.

*Conecta:* CK-19 (adopción — CK-20 la cablea) · `harness-lifecycle.md` (HLP, ahora en repo) · `cockpit-stack.md`
(supuestos SaaS neutralizados). *Siguiente:* al llegar la 1ª historia a refining/ready se materializan los
templates `03-arch/04-validators/06-tickets` (HB-C3); el pipeline de roles espera el upstream del KIT (HB-C1).

### CK-21 · Organization as Code → Organization Twin — visión con nombre + pivote comercial hosteado + TO-BE de 37 capacidades — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-15/16, 3 rondas):* (R1) "Se me está haciendo difícil que los clientes me
paguen toda la consultoría de construcción de infraestructura… se me ocurrió una solución en la nube
multitenant… que cualquier persona que pague pueda loguearse, descargar dev-studio, colab-studio,
arnesia y consultio… gestionar usuarios y contraseñas… restringido por MAC… consultio sería como un
IDE que va commiteando… 3 repositorios: development, UAT y producción… ponte el sombrero de CEO y
conversa con tu CTO… dime sinceramente dónde ves todas las posibles fallas." (R2) "Me gusta cómo
Catio propone deconstruir la arquitectura… quisiera algo similar a nivel organizacional: puestos,
roles, procesos, funciones, todo… la idea es tener una 'organization twin' que permita obtener el
estado real de todo, y que podamos articular incluso." (R3) "Mapear, visualizar y monitorear desde
los objetivos de directorio hasta el último nivel (bajados con OKRs) y cruzados con KPIs… que sea
tan obvio detectar dónde mejorar que de allí nazcan los proyectos de mejora y que todo ese ciclo de
vida lo tengamos en nuestra solución… que seamos la solución definitiva que se conecte a todo
sistema… además de los arneses para cada puesto con el Colab Studio… que el trabajo diario de todos
apunte a mejorar la organización." + "Todo ahora para no perder nada… actualiza visión, todo… no
quiero sesgos por contradicción, no me sirve el histórico, solo a donde apuntamos."

*Desarrollo:* conversación estratégica CEO/CTO en 3 rondas con investigación creciente: (1) análisis
de la propuesta multitenant contra la arquitectura CK-18 + fallas; (2) SOTA organization-as-code
(Catio, Backstage, Palantir, categoría DTO de Gartner, GitLab handbook-first, Orgvue, DEMO/BPSim,
simulación organizacional con agentes LLM); (3) deep-dive de **11 vendors** vía 3 subagentes de
investigación (iGrafx · Celonis · BusinessOptix · ARIS · Bizzdesign · Ardoq · edgeTI · Bee360 ·
KYP.ai · Mavim · doctrina de ontología de Palantir Foundry) + la lista de features DTO de Gartner
(ago 2025) → lista maestra TO-BE de **37 capacidades** etiquetadas [MVP]/[V2]/[H] + secuencia MVP.
Corpus completo persistido en **`proyecto/research/organization-as-code/`** (9 docs, hermano de
`rediseno-total/`). Hallazgos clave: la categoría "organization as code" está libre (anclar a DTO
para analistas); los 11 vendors convergieron 2024-26 en "repositorio como capa de contexto para AI
agents" (nuestra tesis de arneses = la versión más radical); nadie opera una cascada OKR viva ni
cierra el loop brecha→proyecto→KPI en la misma herramienta; el patrón dual-repo/release-cycle de
ARIS valida dev→UAT→prod sobre git; Mavim = la referencia a batir; la doctrina Palantir
(semántica+kinética, actions como superficie de operación, provenance structs) mapea 1:1 al objeto
normalizado.

**Decisiones firmadas (D1..D9):**
1. **D1 — La visión se llama Organization as Code → Organization Twin.** Twin = estado deseado (N6)
   × estado real (N16) × brecha continua (N13). GitOps organizacional: el repo declara el deber-ser,
   el lakehouse observa el ser, Cockpit muestra el drift, los proyectos son los controladores. La
   brecha deja de ser entregable puntual → loop permanente.
2. **D2 — El diferenciador es el hilo de oro medido:** objetivos directorio → OKRs por nivel → KPIs
   por proceso/rol/persona; brechas con costo + ranking ROI ("los proyectos nacen solos"); ciclo de
   vida del proyecto de mejora DENTRO de la solución; arneses por puesto = trabajo diario apuntando
   al hilo. Posicionamiento: "twin de ejecución estratégica".
3. **D3 — Pivote comercial: default = hosteado por nosotros, single-tenant por cliente** (instancia
   aislada Forgejo+Cockpit+lake, suscripción; mismo código, cero reescritura). Invierte el default
   D3 de CK-18 (reversión parcial del chequeo 2 asumida: en el default hosteado el dato reside en
   nuestra nube bajo DPA; "transitan, no persisten" pertenece al tier self-hosted, que NO muere =
   tier enterprise/regulados). Multitenant real = fase 2 (>10-20 clientes). La propuesta multitenant
   inicial se descartó como primer paso: Cockpit hoy no tiene auth ni DB; multitenancy antes de
   vender = meses sin ingreso.
4. **D4 — N3 asciende a Portal:** login, cobro, gestión de usuarios/asientos, descargas, licencias
   por asiento con **fingerprint compuesto — NO MAC** (spoofeable/inestable; SOTA = CPU+disco+placa
   SHA-256, node-locked, activación/heartbeat — keygen-go ya fichado).
5. **D5 — Un repo por organización, 3 entornos** (dev/UAT + main vigente + tags), no 3 repos. El
   pipeline dev→UAT→prod ES la Gestión de Cambios ISO — y el gate que hace viable el "a prueba de
   tontos" sin mapas basura (provenance M23 obligatorio).
6. **D6 — Capa kinética en `objeto.schema.yaml`** (acciones por entidad: quién modifica qué, con qué
   aprobación; Gestión de Cambios = motor) + **doctrina Palantir adoptada** como gramática del
   schema + entidades **OKR/KPI/Proyecto de primera clase** ancladas al hilo.
7. **D7 — Consultio = apuesta principal, desbloqueado:** primer entregable = **los arneses del
   método M1-M3 sobre Claude Code pelado, sin app shell** (ya no espera a que DevStudio termine; el
   clon llega después). Patrón validado por BusinessOptix Discovery Agent/iGrafx Pia/ARIS Companion.
8. **D8 — Gestión de Cambios sube al MVP** (es el gate UAT→prod). Accesos derivados de la estructura
   (idea RRHH del operador): la estructura PROPONE, un humano APRUEBA — human-in-the-loop siempre.
9. **D9 — Horizontes gateados** (precedente CK-10): what-if (branch=escenario) → simulación
   (BPSim/DEMO) → ensayo del TO-BE con agentes LLM corriendo los arneses (jugada única: los arneses
   son tooling de producción Y actores de simulación). MCP server del twin = V2 (table stakes
   agéntico 2025-26). Nada antes del twin base + demanda.

*Ejecutado:* corpus `proyecto/research/organization-as-code/` (README + 8 docs: SOTA process
intelligence, SOTA EA, KYP/Mavim, doctrina Palantir, SOTA organization-as-code, features Gartner
DTO + mapeo, TO-BE 37 capacidades + MVP + derivación de arquitectura, pivote comercial) · VISION.md
reescrita al norte nuevo (identidad + sección "Organization as Code → Organization Twin" + flujo
como loop + arquitectura con default hosteado + TBD sin drift post-CK-19) · CLAUDE.md y fichas
NODOS ajustadas al mismo evento · historias nuevas `state: idea` en `docs/product/` (subagente, con
prior-art scan contra las existentes).

**Deudas declaradas:**
- Re-fichado FINO de NODOS.md (chequeo 2 reescrito en profundidad, R-walk si el portal agrega
  responsabilidad, arquitectura.yaml con componentes nuevos cuando tengan `ruta:` real) — las fichas
  se ajustaron en lo esencial; el pase completo con gate = próxima sesión de arquitectura.
- Compliance del default hosteado (DPA como procesador, aislamiento por instancia, BYOK tier alto)
  — presupuestar antes del primer cliente hosteado.
- La fricción BYO-licencia Claude persiste en el edge (ToS N8, cambió 3× en H1-2026) — al modelo de
  costo por asiento.

*Conecta:* CK-18 (el modelo físico que se conserva; su D3 se invierte; chequeo 1 licencia+contrato
ahora carga también el portal N3) · CK-19/CK-20 (las historias nuevas entran por `docs/product/`) ·
CK-10 (precedente de capability declarada-no-construida, aplicado a simulación/MCP) · I-05 (ISO como
ontología — ahora con OKR/KPI como dato de primera clase) · BL-10 heredado (pricing ahora =
suscripción + asientos).

*Siguiente:* narrativa — el pendiente vive en `docs/product/` (historias CK-21 en `state: idea`;
prioridades las firma el operador).

### CK-22 · Roadmap MVP — F1 re-alcance (Terreno + MVP Twin) · nacen F2/F3 · la arquitectura primero — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-16):* "Revisa mi backlog, las historias que están por venir, revisa cada
una y ayúdame a reorganizar todo mi trabajo pendiente, estructurarlo de forma adecuada y crear un
roadmap para mi MVP, siendo la primera la revisión y actualización de la arquitectura para preparar
el terreno de todo lo funcional."

*Desarrollo:* censo de las 36 historias (5 done/F0 · 1 dropped · 30 idea) — F1 era una bolsa de 23+
historias sin secuencia (el rediseño CK-18 entero). Reorganizado contra el norte CK-21:

- **F1 re-alcanzada = "Terreno + MVP Twin vendible"** (16 historias, 4 fases + carril paralelo):
  F1.0 Terreno (**`arquitectura-refichado-ck21` — historia NUEVA, LA PRIMERA** por pedido del
  operador; schema-v2; negocio-schema-ssot) → F1.1 Método operable (poblar-metodo ↑alta;
  metodo-como-arnes-v0; operar-metodo con dep re-apuntada al v0 — ya NO espera al clon DevStudio;
  deposito v0 liviano) → F1.2 Organización viva (forgejo ↑alta; hosteado-single-tenant ↑alta;
  gestión-cambios ↑alta CK-21/D8; publicación deploy-procesos; auth-niveles) → F1.3 El twin mide
  (lakehouse ↑alta; cruce-indicadores ↑alta, absorbe el motor de indicadores; brecha-proyecto
  ↑alta — el diferenciador) + F1.x negocio (comprador-pricing baja→alta: sin pricing no hay venta).
  Exit: demo del loop completo contra organización real. Archivo renombrado
  `F1-terreno-mvp-twin.yaml` (era "organización instalada", framing CK-18).
- **F2 nueva = "Comercial"** (7): canal N3 + portal (NO fusionadas: producto vs canal técnico, el
  portal depende del canal) · deuda Go/Next→Vite + design system (**deuda aceptada en F1, se paga
  arrancando F2 antes de crecer más UI** — precedente CK-12) · rol-area · negocio.yaml generado
  (gatillo BL-19 ocurre en F1) · catálogo de conectores.
- **F3 nueva = "Edge completo + escala"** (8): clon DevStudio (alta→media — el shell es
  experiencia, no capacidad), Colab Studio, pipeline Arnesia, MCP server, crowdsourcing,
  knowledge-DB (D5), prep-auditoría (CK-10), housekeeping.
- **Deps re-cableadas** (28 story.yaml editados, verificación yaml 37/37 + estados intactos):
  schema-v2←refichado · metodo-v0←{poblar,schema-v2} · operar/publicación←metodo-v0 ·
  {hosteado,gestión-cambios,auth}←forgejo · cruce←{schema-v2,lakehouse} · brecha←{schema-v2,cruce}.
- **`docs/product/ROADMAP.md`** nace como vista humana curada (SSoT = releases/*.yaml +
  story.yaml, mismo evento) con el grafo del camino crítico + 5 decisiones de secuencia revisables.

*Conecta:* CK-21 (el norte que ordena; la deuda "re-fichado fino" se vuelve la historia primera) ·
CK-19 (modelo de releases del arnés) · CK-11 (disciplina SSoT + vista curada mismo evento).

*Siguiente:* arrancar `sistema/arquitectura-refichado-ck21` (F1.0) — promover a `refining`.

### CK-23 · Twin-first — el twin lleno antes que el proceso de llenado (re-secuencia F1) — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-17):* "Quiero consolidar cuáles son las dimensiones de mi organization
as code, tener todas las plantillas — el to-be una vez tenga todo llenado, con todos los niveles
bien organizados — para tener mi Organization Twin pintado en el cockpit. Hardcodeado inicialmente
con una organización ficticia para ir probando el desarrollo. […] Vamos a partir de atrás hacia
adelante: quiero tener un organization twin con todo lleno para luego ahondar en el proceso de
llenado. […] Firmo la secuencia, ejecuta todo con ficha CK-23."

*Desarrollo:* estrategia **twin-first**: construir primero el artefacto final (twin 100% lleno,
pintado en Cockpit, organización ficticia) y después el proceso que lo llena (Consultio) y la
infraestructura viva. Contra el estado real: las dimensiones ya estaban 80% consolidadas
(`objeto.schema.yaml` v1, 9 entidades + hilo de oro; el delta OKR/KPI/Proyecto + capa kinética ya
era la historia `schema-v2-hilo-de-oro-kinetica`); el hueco real era la instancia completa —
ninguna ejerce el schema al 100% (prenter dogfood: 42 yamls, parcial). Decisiones:

- **Historia NUEVA `sistema/organizacion-ficticia-golden-fixture`** (F1.1, alta, dep schema-v2):
  shell hermano lleno al 100% contra el v2 — todas las entidades/campos/aristas del hilo de oro,
  brechas con costo/ROI, proyectos con ciclo de vida, KPIs con valores hardcodeados, provenance
  realista (`fuente`+`conf`) simulando la salida de M1. Triple uso: fixture de desarrollo ·
  plantillas-por-ejemplo · demo comercial. Además = **contrato de salida de Consultio**
  (`operar-metodo` gana la dep: la corrida del método debe producir un objeto de esa completitud).
- **F1 re-secuenciada (5 fases):** F1.0 Terreno (igual) → **F1.1 Twin pintado** (fixture →
  cruce-indicadores → brecha-proyecto; la ex F1.3 adelanta) → F1.2 Método operable (ex F1.1) →
  F1.3 Organización viva (ex F1.2) → **F1.4 Twin mide real** (lakehouse). Hito intermedio nuevo:
  **twin completo demo-able con organización ficticia** al cierre de F1.1.
- **Lakehouse sale del camino crítico** (alta→media, fase propia): `cruce-indicadores` cambia su
  dep lakehouse→fixture; los KPIs del fixture mockean el estado real; el lakehouse los reemplaza
  al final sin cambiar la vista. Exit criteria de F1 intactos (demo contra organización real).
- **Riesgo aceptado consciente:** schema v2 + fixture diseñados sin feedback del proceso de
  captura pueden requerir ajuste cuando Consultio llene datos reales; mitigación: el fixture
  simula la salida del método (provenance incluida), no un dump sintético.

*Conecta:* CK-22 (la secuencia que se re-ordena; sus decisiones 1-5 siguen vigentes) · CK-21 (el
norte twin; #10-13 del TO-BE = la fase F1.1) · CK-13/CAP-08 (`/api/objeto` ya sirve las 9
entidades — el fixture lo ejerce entero) · I-39/D-15 (instancias en shells hermanos).

*Siguiente:* sin cambio — `sistema/arquitectura-refichado-ck21` sigue primera; el fixture entra
tras `schema-v2`.

### CK-24 · Frontera twin ↔ evaluación individual — el twin mide roles/procesos/áreas, no personas — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-17):* "Firma" — respuesta al hallazgo #2 de la auditoría adversarial del
refinamiento de `arquitectura-refichado-ck21` (5 auditores paralelos, pedido del operador: "genera
subagentes que se pongan en todos los peores escenarios posibles").

*Desarrollo:* la auditoría detectó contradicción frontal: la doctrina propia
(`sistema/schema/metodologia/objetivos.md §8`: "Rol = KR ownership, NO OKR individual") prohibía lo
que el producto vendía ("KPIs por persona", drill-down directorio→analista, NASA-TLX midiendo
desgaste versionado en git = registro de salud ocupacional de facto). Exposición real: AI Act
Anexo III (empleo), GDPR art. 22, comités/sindicatos — la objeción #1 que un DPO le hará al
producto.

**Decisión firmada:** el twin mide **roles, procesos y áreas** por defecto. (a) KPI ancla a
rol/proceso/área — la persona entra como *ocupante del rol*, jamás como eslabón de medición; (b) la
vista por persona-nombrada existe SOLO con opt-in de nivel Gobernanza + consentimiento declarado;
(c) desgaste/carga cognitiva (NASA-TLX) se agrega por rol/proceso — nunca se versiona como registro
individual; (d) nace M-card transversal "métricas de persona" (agregación mínima · acceso por nivel
· consentimiento · retención), gemela de M23-provenance, obligatoria como ancla del triage de
automatización (el score puntúa ACTIVIDADES de un rol, no personas).

*Conecta:* CK-21 (acota el diferenciador "hilo de oro medido" sin matarlo) · historia
`arquitectura-refichado-ck21` (spec v3 la cementa en la matriz WS5) ·
`schema-v2-hilo-de-oro-kinetica` (la hereda como invariante de diseño) ·
`auth-niveles-acceso-policy-as-data` (el opt-in Gobernanza aterriza ahí).

### CK-25 · Consultio no se clona: se extrae `studio-core`, ambas apps lo consumen — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-17):* "revisá el plan, forzá fallos, arquitectura hexagonal, ejecutá vos
mismo, avisame con consultio corriendo primitivo."

*Desarrollo:* scout de `~/Proyectos/dev-studio` (célula N5): 60-70% del código ya es núcleo
genérico aislado tras puertos DIP (motor arneses, driver Claude Code, sesión, store, transporte,
updater, design system). N14 estaba fichado "clon de DevStudio" (CK-18) — clonar es fork = doble
mantenimiento sin backflow; CK-21/D7 ya había desacoplado el MVP (Consultio v0 = arneses sin
shell). Regla de tres (AHA): Consultio ES el 2º consumidor real → momento correcto de extraer.

**Decisión:** topología de **tres piezas** — `studio-core` (kernel Go compartido, módulo propio,
ledger SC-NN, puertos DIP estables) + `dev-studio` (N5, app fina, taxonomía dev) + `consultio`
(N14, app fina, taxonomía engagement/método M1-M3). Repos separados por producto (doctrina de
células, NO monorepo). Disciplina **upstream-first**: todo cambio genérico aterriza en el core
primero, los productos consumen por import semver; **ban de mirror producto→producto** (mismo
patrón que backflow del arnés) — lo específico de un producto (taxonomía, value-stream, branding)
nunca se copia al otro, se implementa fino y propio en su seam. Gate de promoción = 2º consumidor
necesita el patrón → lift al core en ese momento, ni antes (adivinar API) ni después (fork
silencioso). Secuencia F0 (arneses v0, ya corriendo) → F1 (frontera fitness en dev-studio) → F2
(extracción) → F3 (Consultio app fina) — la extracción no bloquea la entrega del método.

Stress-test forzado contra el código real de dev-studio (11 escenarios de fallo, `05-arquitectura-
hexagonal.md`) fijó 10 decisiones de arquitectura: paquetes del core públicos, no `internal/` (A1)
· `replace` local comiteado como transición sin remote, deuda registrada (A2) · sesión genérica del
core con `Contexto map[string]string` opaco a la taxonomía del producto (A3) · identidad de app
(`app.Info{Name, LockDirName, DataDir,...}`) siempre inyectada, cero literal de producto en el
kernel (A4) · router composicional, el core arma rutas genéricas y la app monta las suyas (A5) ·
driver fake para tests/CI sin licencia (A6) · UI mínima propia descartable, design system npm
diferido a F2.5 — prohibido copiar componentes de dev-studio (A7) · fitness gate EN el core desde
el commit 1 (A8) · extracción por COPIA no move, dev-studio migra en su propia sesión/ledger DH-NN,
duplicación transitoria core↔dev-studio fichada como deuda de esa célula (A9) · marketplace del
método como seam de datos (A10).

**Ejecutado y verificado en vivo (mismo día, autónomo):** `studio-core` nace (commit `5dc94c1`,
SC-01, v0.1.0 tageado) con fitness gate propio (`TestCoreSinIdentidadDeProducto` + 4 tests más,
verdes) · `consultio` nace (commit `742bc51`, CN-01) consumiéndolo vía `replace => ../studio-core`
· suite completa contra adaptadores reales (HB-94, cero mocks) · live-verify del binario corriendo:
registry método → `POST /api/engagements` (el dir ES repo git, valida hipótesis F0 CK-21 "engagement
≈ repo git") → instalar arnés (lock `.consultio/arneses.yaml` + commit pathspec real) → sesión
ligada al engagement → turno con driver fake → frames SSE + `state.json` con efecto observado ·
`dev-studio` INTACTO (V6, tree limpio, HEAD sin tocar). F3 se adelantó respecto del trigger de F2
("necesidad real de shell") por directiva del operador del mismo goal.

**Consecuencias.** NODOS.md: N14 re-fichado "clon de DevStudio" → "app fina sobre `studio-core`
(extraída de N5)", madurez no-construido → existe (parcial); riesgo abierto (2) de N5 ("cómo se
clona Consultio") cerrado por esta ficha. `dev-studio`/DH-NN registra su F1 (frontera fitness) y F2
(migración) en su propio ledger cuando corresponda — no bloquean esta ficha.

**Alternativas descartadas:** fork/clon (doble mantenimiento, divergencia silenciosa, descartada) ·
monorepo único edge (contradice doctrina de células/graduación; `go.work` local da la misma
velocidad sin fusionar repos, descartada) · un solo binario con "ediciones" (mete `if producto` al
core, acopla releases de compradores distintos — descartada, revisable si F0-F3 muestran variación
menor a la prevista).

*Conecta:* CK-21/D7 (Consultio v0 = arneses sin shell, el MVP que este plan no bloquea) · CK-18
(origen del ficha "clon de DevStudio", corregido acá) · CK-22 (F3 "Edge completo + escala" donde
vivía el clon DevStudio, ahora reemplazado por esta topología) · CK-19 (backflow/upstream-first del
arnés prenter, misma doctrina trasladada a código Go/TS).

*Siguiente:* dev-studio migra a `studio-core` en su propia sesión (F2.3, ledger DH-NN) · borrar
`replace => ../studio-core` cuando exista remote publicado (R5 puro) · extraer design system React
a paquete npm cuando haya registry (F2.5). Plan detallado:
`proyecto/plans/consultio-studio-core/`.

### CK-26 · Schema v2 — hilo de oro medible (modo regional OKR/GPD/BSC) + capa kinética + mejora como entidad — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-17):* refinamiento de `schema-v2-hilo-de-oro-kinetica`: "los OKRs y los
kpis no compiten… revisa apegándote a lo que dicen realmente las metodologías… cuál es el estándar
actual en LATAM y Brasil (investiga), y con eso definimos" + aclaración de `proyecto` = "aquellas
cosas que propone el personal… para lograr un avance o mejora… considera six sigma como base pero
ve cuál es la que más se utiliza" + "todo lo que no usamos elimínalo… no quiero contaminar con
deprecados cuando aún ni nacemos". FIRMA 1 sobre spec v2 · G SATISFIED ("hemos hecho solo el
backend" — correcto: el pintado es F1.1).

*Desarrollo:* dos investigaciones web (fuentes primarias — 00-research-latam-br.md de la historia).
Verificado: OKR↔KPI se complementan con frontera PERMEABLE bidireccional (Doerr/Castro/Wodtke/
Perdoo); "no OKR individual" confirmado (Spotify 2016 primario, Klau 2017, HBR 2020, Bock:
divorcio total OKR↔compensación — sandbagging); Brasil = GPD/Falconi como estándar corporativo
(desdobramento anual + PDCA + PLR; 3 de 4 "Melhores e Maiores"), LATAM hispano = BSC como mapa;
proyectos de mejora = PDCA paraguas con dialectos DMAIC (vigente) / MASP (estándar BR) / kaizen,
con charter + doble firma sponsor-finanzas + auditoría de beneficios ~12 meses; ideas del personal
= funil separado (kaizen teian → plataformas tipo AEVO).

**Decisiones firmadas:** (1) **GPD y OKR = el mismo grafo** — el modo es configuración de empresa
(`config_estrategia.modo: okr-trimestral|gpd-anual|mixto`), no entidades distintas; **RN-14**:
acople KR↔compensación SOLO en modo GPD (PLR). (2) KPI = entidad (salud con banda) y KR = contrato
de cambio; frontera permeable como acciones kinéticas (`promover-kpi-a-kr`/`decantar-kr-a-kpi`).
(3) `proyecto_mejora` e `idea` = entidades SEPARADAS enlazadas (Misnomer resuelto vs unidad D-07);
ciclo PDCA-genérico con `metodologia: pdca|dmaic|masp|kaizen` como dialecto de render; **RN-15**
auditoría de beneficios. (4) **Corte limpio sin deprecados** — formas v1 = ERROR; prenter migrado
en el mismo evento. (5) Vocabulario de verbos propio (ALM×MGI, 44) con gobernanza por PR (RN-11).
(6) Capa kinética declarada en el schema (15 acciones + máquina de estados); BL-24 = motor.

*Ejecutado:* `objeto.schema.yaml` v2 (12 entidades) · `verbos.yaml` + `gen_schema.py` (4º gate) ·
M41-M45 + dimensión `mejora-proyectos` (NOTACIONES regenerado) · `/api/objeto` v2 con `errors[]` ·
prenter migrado (29 kpis entidad) · live-verify doble (prenter 0E/0W + fixture 12 entidades) ·
book (backbone O7 · kpis.md · mejoras.md · objetivos.md §6-bis).

*Conecta:* CK-21/D6 (la kinética que manda) · CK-23 (el fixture que sigue: corporación ficticia
~200 empleados, directiva registrada) · CK-24 (frontera persona, cableada como RN-8/RN-16) ·
D-07 (unidad de ejecución en la medición).

<!-- Próximas: CK-27, … -->

## Log

| Fecha | Decisión | Fichas |
|---|---|---|
| 2026-07-06 | Graduación de P1 con visión ampliada (4 pilares: procesos/roles/objetivos/personas, marco ISO intermedio); código migrado y verificado standalone; investigación/mockups heredados curados en `docs/`; kit dev como plugin. | CK-10 |
| 2026-07-07 | Nacemos ordenados: tríada `sistema/`·capabilities·`proyecto/`; método del auditor completado desde el legacy (M3, PROCESS-AS-DATA, proceso m1/m2/m3); System Backlog as-code (BL-01..BL-18, 5 columnas) + `docs/INCREMENT.md`; App del Auditor declarada como subsistema. | CK-11 |
| 2026-07-07 | Personas de primera clase (cierra BL-01): `/api/personas` + lente Personas leen persona/rol del objeto normalizado (`empresa/<tipo>/` del shell, layout D-15); objeto.schema reconciliado; CAP-07; primera rebanada de la convergencia BL-02. | CK-12 |
| 2026-07-07 | El objeto completo (cierra BL-02): `/api/objeto` sirve y valida las 9 entidades JUNTAS (refs del Hilo cruzan entidades, RACI A==1, enums, ciclos); supersede `/api/personas`; CAP-08; verificado contra prenter (12 procesos, cero warnings). Nace BL-19 (negocio.yaml → proyección). | CK-13 |
| 2026-07-07 | Arquitectura terminada (cierra BL-03): N14 App del Auditor al mapa (R16/R17 + etapa E3); estados post-Stage-4 corregidos en NODOS.md (contrato CK-08 diseñado, N13 = binario `directorio` con `/api/objeto`); `despliegue.html` portado estático y actualizado; ARCHITECTURE/README al día. Nace BL-20 (deuda Go/Next N13). | CK-14 |
| 2026-07-07 | Render de la arquitectura-as-code (cierra BL-08): `gen_arquitectura.py` valida (refs R#, fichas CK-10+, relaciones, rutas) y genera `nodos.data.js` (drawer de despliegue.html restaurado) + `arquitectura.html` (vista de célula desde arquitectura.yaml); `--check` = gate anti-drift; verificado en navegador real. | CK-15 |
| 2026-07-07 | P2 = DevStudio (app de escritorio, GitHub como conector — reemplaza al server DevHub): N5 re-fichado Data→Edge; contrato CK-08 DEROGADO (BL-18 redefinido: mecanismo TBD con primer consumidor); N6 = repo GitHub del cliente + matiz BYOC "sus datos viven en SU GitHub, no en infra nuestra"; versión PM como nota (anti-especulación). Addendums: DevStudio gestiona N8 · N14 misma mecánica · N8 generalizado a runtime de agente local (motor de N5 y N14). | CK-16 |
| 2026-07-07 | Gate anti-drift automático: hook `.githooks/pre-commit` (valida fuentes, regenera derivados y los stagea; bloquea si no valida) + `despliegue.html` curado ahora SE VALIDA (cobertura data-nodo ↔ índice, madurez por art vs NODOS.md; test negativo verificado). | CK-17 |
| 2026-07-08 | Rediseño de fondo: Fábrica de software (Plano del Fabricante) + Organización instalada. El método se entrega al cliente en arneses (deroga el límite de IP). Mueren N1 (motor→arneses)/N4/N7; nacen Arnesia (N15)/Data Lakehouse (N16)/Colab Studio (N17)/Sistemas org (N18)/Analista de Calidad (N19); N6 = Repositorio Oficial confidencial (ya no GitHub); N13 Cockpit = Visualización + Gestión de Cambios + niveles de acceso; N14 = Consultio (clon DevStudio). 7 investigaciones SOTA. Decisiones D1..D5. | CK-18 |
| 2026-07-09 | Adopción del arnés prenter (migración total, lossless): `docs/product/` pasa a SSoT (29 historias + 8 capabilities + 2 releases + 7 module docs, con `provenance` verbatim de BL/CAP); `proyecto/backlog.yaml`+`docs/increment.yaml` archivados; 21 reglas CORE always-on en `.claude/rules/` + seam `project.config.yaml` (doctor 0) + hooks de telemetría. Se amplían las dos extensiones as-code: arquitectura (`arquitectura-as-code.md` supersede el `paradigm-arquitectura` del CORE) y metodología (nueva: `methodology.schema.yaml`+`gen_metodo.py`+2º gate en pre-commit). Forks Q1(migración total)/Q2(esqueleto completo)/Q3(gen+gate ahora). Deuda: bug `find_unfilled` del KIT 0.5.3 a backflow. | CK-19 |
| 2026-07-09 | Cableado del arnés (termina CK-19): 6 process-docs + 6 scripts/git del KIT materializados a paths convencionales (copia, no symlink a cache volátil — extiende CK-19); capture files del HLP creados; hueco del KIT 0.5.3 (role-skills/agents, rules-detail, specs-templates no publicados = W8 lift-kit) documentado en `harness-backlog.md` y operado a mano (sin fork). | CK-20 |
| 2026-07-16 | Organization as Code → Organization Twin: visión con nombre (twin = deseado N6 × real N16 × brecha continua N13, GitOps organizacional); diferenciador = hilo de oro medido (objetivos→OKR→KPI) + brechas con ROI + ciclo brecha→proyecto dentro de la solución + arneses por puesto. Pivote comercial: default hosteado single-tenant (invierte D3 de CK-18; self-hosted = tier regulados; multitenant = fase 2); N3 asciende a Portal (licencias fingerprint, no MAC); 1 repo · 3 entornos dev/UAT/prod; capa kinética + OKR/KPI/Proyecto al schema (doctrina Palantir); Consultio v0 = arneses sin app shell; Gestión de Cambios al MVP; horizontes gateados (what-if→BPSim→agentes-con-arneses, MCP V2). SOTA 11 vendors + Gartner DTO → TO-BE 37 capacidades en `proyecto/research/organization-as-code/`. | CK-21 |
| 2026-07-16 | Roadmap MVP: F1 re-alcanzada a "Terreno + MVP Twin vendible" (16 historias, fases F1.0 Terreno → F1.1 Método → F1.2 Organización viva → F1.3 El twin mide + carril negocio; historia nueva `arquitectura-refichado-ck21` = LA PRIMERA, pedido del operador); nacen F2 "Comercial" (portal+canal, deuda UI se paga aquí, conectores) y F3 "Edge completo + escala" (clon DevStudio baja a media, Colab, Arnesia pipeline, MCP, frescura, gateadas D5/CK-10); 28 story.yaml re-cableados (prioridades + deps, operar-metodo/publicación ya no esperan al clon); `docs/product/ROADMAP.md` como vista humana. | CK-22 |
| 2026-07-17 | Twin-first (re-secuencia F1): el twin lleno y pintado ANTES que el proceso de llenado — historia nueva `organizacion-ficticia-golden-fixture` (shell ficticio 100% contra schema v2, provenance simulando M1; fixture + plantillas-por-ejemplo + demo + contrato de salida de Consultio); F1 pasa a 5 fases (F1.1 Twin pintado adelanta a método/organización-viva; lakehouse alta→media a F1.4, mockeado por los KPIs del fixture); hito intermedio: twin demo-able con org ficticia. | CK-23 |
| 2026-07-17 | Frontera twin ↔ evaluación individual (de la auditoría adversarial del refinamiento): el twin mide roles/procesos/áreas — KPI ancla a rol, persona = ocupante; vista persona-nombrada solo opt-in Gobernanza + consentimiento; NASA-TLX agregado por rol/proceso, nunca registro individual; nace M-card "métricas de persona" gemela de M23. Mismo evento: D-07 clavada (techo=empresa; holding=agrupador; proyecto/sucursal = unidad de ejecución, no empresa) + historia nueva `cockpit/captura-manual-kpis`. | CK-24 |
| 2026-07-17 | Schema v2 shipped (historia `schema-v2-hilo-de-oro-kinetica`, idea→done en el día): hilo de oro MEDIBLE — 12 entidades (kpi salud-con-banda · proyecto_mejora · idea como funil separado), modo regional como configuración (OKR-trimestral / GPD-anual Falconi / mixto — investigación LATAM/BR con fuentes primarias; RN-14 divorcio KR↔compensación), capa kinética declarada (15 acciones + máquina de estados PDCA con loop-back MASP; BL-24 = motor), vocabulario de verbos ALM×MGI (44, gobernanza por PR) + 4º gate `gen_schema.py`, corte limpio sin deprecados con prenter migrado (29 kpis) y live-verify doble. M41-M45 + dimensión `mejora-proyectos` al catálogo. | CK-26 |
| 2026-07-17 | Consultio no se clona: se extrae `studio-core` (kernel Go compartido) y `dev-studio`(N5)/`consultio`(N14) lo consumen por import semver — disciplina upstream-first + ban de mirror producto→producto (misma doctrina que backflow del arnés); 10 decisiones de arquitectura (A1-A10) tras stress-test de 11 escenarios de fallo contra dev-studio real. Ejecutado y verificado en vivo el mismo día: `studio-core` v0.1.0 (SC-01) con fitness gate propio + `consultio` primitivo (CN-01) corriendo — engagement→repo git, arnés instalado con lock+commit real, sesión ligada, turno con SSE — dev-studio intacto. N14 re-fichado "clon de DevStudio"→"app fina sobre studio-core"; riesgo (2) de N5 cerrado. | CK-25 |
