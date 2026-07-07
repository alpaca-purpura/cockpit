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

<!-- Próximas: CK-14, … -->

## Log

| Fecha | Decisión | Fichas |
|---|---|---|
| 2026-07-06 | Graduación de P1 con visión ampliada (4 pilares: procesos/roles/objetivos/personas, marco ISO intermedio); código migrado y verificado standalone; investigación/mockups heredados curados en `docs/`; kit dev como plugin. | CK-10 |
| 2026-07-07 | Nacemos ordenados: tríada `sistema/`·capabilities·`proyecto/`; método del auditor completado desde el legacy (M3, PROCESS-AS-DATA, proceso m1/m2/m3); System Backlog as-code (BL-01..BL-18, 5 columnas) + `docs/INCREMENT.md`; App del Auditor declarada como subsistema. | CK-11 |
| 2026-07-07 | Personas de primera clase (cierra BL-01): `/api/personas` + lente Personas leen persona/rol del objeto normalizado (`empresa/<tipo>/` del shell, layout D-15); objeto.schema reconciliado; CAP-07; primera rebanada de la convergencia BL-02. | CK-12 |
| 2026-07-07 | El objeto completo (cierra BL-02): `/api/objeto` sirve y valida las 9 entidades JUNTAS (refs del Hilo cruzan entidades, RACI A==1, enums, ciclos); supersede `/api/personas`; CAP-08; verificado contra prenter (12 procesos, cero warnings). Nace BL-19 (negocio.yaml → proyección). | CK-13 |
