# Cockpit — Visión de producto

> Norte vivo del producto. Esta visión es **estática** entre firmas — evoluciona por ficha explícita
> del [`LEDGER.md`](./LEDGER.md) (`CK-NN`), nunca por edición silenciosa.
> Este repo nació de la graduación de la célula P1 del monorepo `prenter-harness` (2026-07-06,
> ficha ecosistema en `tooling/strategy/LEDGER.md` del monorepo). La historia CK-01..CK-08 (fundación,
> extracción Stage 1-4) vive allá, congelada, como fuente del port; aquí arranca en **CK-10**
> (CK-09 = la ficha de graduación, escrita del lado viejo).

## Identidad

Cockpit es el sistema para el **levantamiento, diseño, creación, propagación/adopción, monitoreo
y mejora continua** de los cuatro objetos que sostienen a cualquier empresa:

- **Procesos** — qué se hace de verdad (AS-IS) y qué debería hacerse (TO-BE).
- **Roles** — quién tiene autoridad y responsabilidad sobre cada proceso.
- **Objetivos** — qué resultado persigue cada rol/área y cómo se mide.
- **Personas (puestos)** — quién ejecuta, con qué arnés/capacidad, y qué le falta.

El eje es **gestión empresarial basada en buenas prácticas de normas ISO** — no como aparato de
certificación, sino como **ontología y disciplina operativa** (ver §ISO más abajo). Es un sistema
de **gran escala** con arquitectura empresarial: se despliega en la infraestructura del cliente
(modelo CK-18 «Fábrica + Organización instalada» — ver §Arquitectura y `sistema/arquitectura/NODOS.md`).

**Core del sistema:** acompañar a la empresa mediante la **ingesta de datos de múltiples
fuentes** (sistemas manuales, documentos, interfaces conversacionales) para modelar su estado
actual, proyectar su estado ideal, y accionar la brecha.

**Flujo de valor (heredado de CK-01, intacto):** los datos ingeridos **modelan el estado actual
(As-Is)** → se **proyecta el estado ideal (To-Be)**, informado por las buenas prácticas ISO y las
metodologías de proceso/rol/objetivo (§Pilares) → de esa **brecha** se generan los **proyectos de
desarrollo y necesidad** — que pueden resolverse con arneses por puesto (P3 · Kit, fabricados en
Arnesia/P4) o con software a medida (P2 · DevStudio, también en manos de los devs del cliente).

## Los cuatro pilares

Cada pilar tiene metodologías de respaldo ya investigadas y curadas en
[`sistema/metodo/`](./sistema/metodo/) (portadas desde el catálogo de 31 fichas del monorepo,
filtradas a las que aplican a gestión empresarial — se dejaron atrás las de construcción de
software, que son dominio de DevStudio/Kit):

| Pilar | Pregunta que responde | Metodologías de respaldo |
|---|---|---|
| **Procesos** | ¿Qué hacemos de verdad, y qué deberíamos hacer? | BPMN (notación) · APQC PCF (taxonomía universal, "el esqueleto para no perderse") · Event Storming (AS-IS por eventos) · Value Stream Mapping (desperdicio, future-state) · Service Blueprint (frontstage/backstage) |
| **Roles** | ¿Quién tiene autoridad y responsabilidad? | RACI · ISO 9001 cl.5.3 (roles y autoridades) |
| **Objetivos** | ¿Qué perseguimos y cómo lo medimos? | OKR · Hoshin Kanri (cascada estrategia→área) · Balanced Scorecard · COBIT 2019 (goals cascade + niveles de madurez 0-5, "el semáforo del gap") |
| **Personas / puestos** | ¿Quién ejecuta, con qué capacidad, y qué le falta? | Process/Task Mining (descubre el proceso real desde el trabajo) · el catálogo de arneses por puesto (P3 · Kit, externo) · vocabulario de capital humano (ISO 30414) |

Transversal a los cuatro: **ArchiMate/TOGAF** (mapeo negocio↔aplicación) y **Business Capability
Modeling** (mapa de capacidades + heatmap de gaps) — el lenguaje común que conecta procesos, roles
y sistemas en una sola vista para el Directorio.

**This Is Service Design Doing** es el método con el que Cockpit se diseña A SÍ MISMO (mapa de
actores → persona → journey map → service blueprint → interfaces) — no es una metodología que el
producto le enseñe al cliente, es la disciplina interna con la que cada pantalla nueva se
justifica antes de construirse (ver `proyecto/research/service-design/`).

## ISO — marco entre ambos (decisión CK-10)

El precedente heredado (`I-05` del monorepo, "roba la ontología, rechaza el aparato") sigue vigente
como **columna vertebral**: de ISO 9001 tomamos el vocabulario de contexto (cl.4), roles/autoridad
(cl.5.3), objetivos (cl.6.2) y mejora continua vía PDCA (cl.10); de ISO 30414 tomamos vocabulario de
capital humano para el pilar Personas. Esto se usa como **estructura del dato** (`negocio.schema`,
§Arquitectura), no como checklist de auditor.

**Decisión CK-10 (ampliación sobre I-05):** Cockpit declara, además, una capability **futura**
de "preparación para auditoría" — un módulo que compara el estado modelado del cliente contra
las cláusulas de la norma y reporta gaps — sin construir el aparato de certificación/control
documental completo. Es una capability `estado: pendiente` en
`sistema/arquitectura/arquitectura.yaml` desde el día uno: se activa cuando exista demanda real
de un cliente que la pida, nunca antes (disciplina
anti-código-especulativo, heredada del monorepo). El sistema **nunca** emite certificados ni
sustituye a un auditor — el veredicto I-05 sigue rigiendo el límite.

## Roles (heredado de CK-01, ampliado CK-18)

Cockpit sirve a **toda la organización por niveles de acceso** (CK-18): **Gobernanza** (Directorio),
**Estratégico** (C-level/gerencias), **Táctico** (jefaturas), **Operativo** (analistas/usuarios). Cada
nivel ve lo que su rol permite, en coherencia con la estructura del Repositorio Oficial.

- **Gobernanza / Directorio** — el mapa vivo de la organización: objetivos, cumplimiento, drill-down.
  Vivo hoy (Visualización).
- **Niveles Estratégico/Táctico/Operativo** — cada uno su rebanada. Declarados, placeholder en el
  shell hasta que existan los niveles de acceso reales (BL-12, sube a alta).
- **Consultor** (transferible) — construye el sistema de la organización con **Consultio** (N14, clon
  de DevStudio sobre Claude Code) y lo publica al Repositorio Oficial. Rol transferible: inicia siendo
  persona de Prenter, luego lo hereda un **Analista de Calidad del cliente** (N19), que mantiene lo
  oficial con la Gestión de Cambios (§ISO).

## Arquitectura — el modelo CK-18 (Fábrica + Organización instalada)

Rediseñado de fondo en **CK-18**: el sistema deja de ser "BYOC con motor server-side" y pasa a ser
una **fábrica de software** que construye el sistema operativo de la organización y lo **instala en
su red**. El método **se entrega al cliente** empaquetado en arneses (deroga el límite de IP "el
método nunca al cliente"; protección = licencia + contrato). Tres planos — ver
`sistema/arquitectura/NODOS.md` (16 nodos, SSoT) + `despliegue.html` + `proyecto/research/rediseno-total/`:

- **Plano del Fabricante (nuestro):** **Arnesia (N15)** fabrica los arneses por rol-en-proceso;
  **Repositorio Maestro (N2)** guarda método + arneses plantilla + código; **Distribución (N3)**
  publica releases firmadas, gestiona licencias y recibe telemetría — habilita el mantenimiento. No
  razona en runtime.
- **Plano de la Organización (cliente):** **Cockpit (N13)** — Visualización (cruza la estructura del
  Repositorio Oficial con la operación del Data Lakehouse) + **Gestión de Cambios** (ISO) + niveles
  de acceso; binario propio `directorio` (Go, 4100), la Visualización base ya construida y verificada
  standalone. **Repositorio Oficial (N6)** — git self-hosted confidencial (Forgejo), SSoT de la
  estructura (ya no GitHub). **Data Lakehouse (N16)** — dlt + DuckLake, reúne la operación de todos
  los sistemas (N18) y nutre a Cockpit ("cómo vamos día a día"). **Depósito (N12)** — crudo transitorio.
- **Edge (apps sobre Claude Code local, BYO licencia):** **Consultio (N14)** — App del Consultor, clon
  de DevStudio con nombre propio: construye el mapa completo (objeto normalizado + documentos + arneses)
  con preview local de Cockpit y lo **publica a N6** ("deploy de procesos"); transferible al Analista
  de Calidad. **Colab Studio (N17)** — app del trabajador operativo (arneses por puesto). **DevStudio
  (N5)** — también a devs del cliente. **N8** motor común.
- **Muertos (CK-18):** el Motor de Discovery server-side (N1) renace como arneses; la voz (N4) se
  difiere; los agentes efímeros (N7) mueren — **todo el levantamiento es vía consultor**.

## Ecosistema (contrato, no implementación — el detalle de cada producto vive en SU repo)

- **P2 · DevStudio** (`~/Proyectos/dev-studio`) — app de escritorio del ciclo de desarrollo
  (CTO/dev/devops/PO). CK-18: se **entrega también a los devs del cliente** para construir su sistema
  a medida; es el linaje del que se **clona Consultio** (N14). Sistemas separados, sin import cruzado.
- **P3 · Kit** (`~/Proyectos/harness-repo`, graduado) — el catálogo de arneses por puesto: el
  entregable del pilar Personas, respuesta a una brecha detectada.
- **P4 · Arnesia / Harness Studio** (`~/Proyectos/harness-studio`) — **la fábrica de arneses (N15,
  ascendida en CK-18)**: produce y versiona los arneses por rol-en-proceso que cargan Consultio,
  Colab Studio y DevStudio; se entrega al cliente para que mantenga los suyos. Es pieza central del
  Plano del Fabricante, no ya un plano de talento aparte.

## Estado heredado al graduarse (2026-07-06)

Todo Stage 1-4 (CK-02, CK-05, CK-06, CK-07/CK-08 en la historia congelada) migrado y **verificado
standalone en este repo**: modelo de portfolio (`ui/lib/portfolio.ts`, 25 tests), módulo Go propio
(`go/`, handlers `/api/portfolio`+`/api/negocio`), vistas + shell propio (`ui/components/`), runtime
propio (binario `directorio`, sin dependencia de ningún otro binario). Investigación y mockups
previos rescatados en [`proyecto/research/`](./proyecto/research/) (campañas "cockpit-negocio" y
"modelo-objeto") — ver el índice de cada carpeta antes de retomar una investigación a fondo,
para no re-gastar tokens redescubriendo lo ya hecho.

**No migrado deliberadamente (doctrina "cero data de cliente" — I-39 del monorepo):** el mockup
visual real del deal Prospera y su pricing/deck comercial siguen en
`prenter/clientes/prospera/` (repo hermano, EMPRESA) — se referencian, no se copian. Lo que SÍ
viajó de ese material es la versión ya genérica/ficticia (persona "Mateo Salas /
Inmobiliaria Vértice") usada en `proyecto/research/service-design/` y
`sistema/metodo/proceso/_sample/`.

## TBD — huecos abiertos

Desde CK-11, el detalle, estado y prioridad de TODO lo pendiente viven en el System Backlog
([`proyecto/backlog.yaml`](./proyecto/backlog.yaml)) — única fuente de la verdad del trabajo.
Aquí queda solo el porqué estratégico de los tres huecos mayores:

- **Persona/puesto como entidad de primera clase** (→ BL-01, **cerrado en CK-12**) — persona +
  rol se leen del objeto normalizado y son visibles en la Vista de Negocio (CAP-07). La
  convergencia de lectura del objeto completo también cerró (BL-02 → CK-13, CAP-08); queda
  voltear negocio.yaml a proyección generada (BL-19).
- **Comprador con nombre y cara, pricing, éxito a 12 meses** (→ BL-10) — heredado de CK-01, sin
  gate bloqueante (I-71 lo derogó); con CK-18 incluye licencia de Arnesia + arneses + contrato de
  mantenimiento (N3).
- **El rediseño CK-18** (Fábrica + Organización instalada) abre el grueso del backlog nuevo: Consultio
  (BL-15..17), Repositorio Oficial (BL-21), Data Lakehouse (BL-22), Gestión de Cambios + niveles de
  acceso (BL-24/BL-12), Plano del Fabricante (BL-25/BL-26). El Motor de Discovery como servicio
  server-side (ex-BL-13) quedó **derogado** — su razonamiento vive como arneses.

## Gestión

Desde CK-11 ("nacemos ordenados"):

- **Trabajo pendiente** — System Backlog en [`proyecto/backlog.yaml`](./proyecto/backlog.yaml)
  (SSoT, columnas por subsistema; vista humana [`proyecto/BACKLOG.md`](./proyecto/BACKLOG.md)).
- **Decisiones** — fichas `CK-NN` en el [`LEDGER.md`](./LEDGER.md) de este repo (continúa la
  numeración de la célula original — CK-10 en adelante).
- **Capabilities funcionales** — Product Increment en [`docs/increment.yaml`](./docs/increment.yaml)
  (SSoT, `CAP-NN`; vista humana [`docs/INCREMENT.md`](./docs/INCREMENT.md)) — solo lo verificado.
