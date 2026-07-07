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

**Deudas declaradas:**
- Research sin destilar del todo — mezcla narrativa de campaña con salidas de sistema (BL-07).
- `NODOS.md` sigue reflejando estados pre-Stage-4 en varias fichas de nodo (p.ej. contrato de
  datos "a diseñar" cuando CK-08 ya lo diseñó) — se corrige al terminar la arquitectura (BL-03).
- Prioridades del backlog = propuesta de la auditoría; faltan firmas del operador.

*Conecta:* CK-10 (deudas heredadas → BL-01/BL-08/BL-09) · CK-08 (contrato de datos → BL-18) ·
I-05 (límite de prep-auditoria) · I-39 (Prospera sigue fuera, sin cambio).

*Siguiente:* operador firma prioridades del backlog · arrancar BL-15 (definir App del Auditor) o
BL-01/BL-02 (modelo de datos persona/puesto + reconciliación de schemas) como primera campaña.

<!-- Próximas: CK-12, … -->

## Log

| Fecha | Decisión | Fichas |
|---|---|---|
| 2026-07-06 | Graduación de P1 con visión ampliada (4 pilares: procesos/roles/objetivos/personas, marco ISO intermedio); código migrado y verificado standalone; investigación/mockups heredados curados en `docs/`; kit dev como plugin. | CK-10 |
| 2026-07-07 | Nacemos ordenados: tríada `sistema/`·capabilities·`proyecto/`; método del auditor completado desde el legacy (M3, PROCESS-AS-DATA, proceso m1/m2/m3); System Backlog as-code (BL-01..BL-18, 5 columnas) + `docs/INCREMENT.md`; App del Auditor declarada como subsistema. | CK-11 |
