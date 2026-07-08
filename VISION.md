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
(BYOC — arquitectura de referencia heredada en `sistema/arquitectura/`).

**Core del sistema:** acompañar a la empresa mediante la **ingesta de datos de múltiples
fuentes** (sistemas manuales, documentos, interfaces conversacionales) para modelar su estado
actual, proyectar su estado ideal, y accionar la brecha.

**Flujo de valor (heredado de CK-01, intacto):** los datos ingeridos **modelan el estado actual
(As-Is)** → se **proyecta el estado ideal (To-Be)**, informado por las buenas prácticas ISO y las
metodologías de proceso/rol/objetivo (§Pilares) → de esa **brecha** se generan los **proyectos de
desarrollo y necesidad** — que pueden resolverse con arneses por puesto (P3 · Kit) o con software a
medida (histórico: P2 · DevHub, hoy graduado y externo).

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

## Roles (heredado de CK-01)

- **Directorio** — el mapa vivo de la organización: objetivos, cumplimiento, drill-down. Vivo hoy
  (Vista Negocio).
- **Área** — su rebanada de procesos/sistemas. Declarado, placeholder en el shell.
- **Consultor** (nuestro) — en la fase de implantación; a futuro opera el Motor de Discovery
  desde su aplicación propia (App del Auditor, CK-11 — §Arquitectura).

## Arquitectura — las piezas de Cockpit

Heredado de CK-07/CK-08 (Stage 4, ejecutado) y ampliado por CK-11 — ver
`sistema/arquitectura/NODOS.md`:

- **Vista Negocio (N13)** — la mitad **ya construida**: binario propio `directorio` (Go, puerto
  4100) + Next.js standalone (puerto 4101, embebido como export estático vía `go:embed`). Sirve
  `/api/portfolio` (árbol Empresa→Sistema) y `/api/negocio` (Hilo de Oro + Brechas). Vive en
  [`go/`](./go) y [`ui/`](./ui) de este repo, migrado byte-a-byte del monorepo y verificado
  standalone (build+vet+test Go, tsc+vitest UI, export estático real — sin dependencias del
  monorepo de origen).
- **Motor de Discovery (N1, ★IP)** — la mitad **aún no construida**: backend de razonamiento
  server-side (ingesta multi-fuente, orquesta AS-IS→TO-BE→gaps sobre los 4 pilares). Diseño
  detallado (stack candidato, endpoints, riesgos abiertos) heredado en
  `sistema/arquitectura/NODOS.md#n1`. Campaña propia, sin fecha — sigue siendo Cockpit, no un
  producto aparte.
- **App del Auditor (N14, declarada CK-11, sin construir)** — la aplicación instalable **propia del
  Consultor** (patrón harness-studio/dev-studio): opera el método del servicio
  (`sistema/metodo/` — levantamiento m1, mantenimiento m2, espinazo m3) durante el engagement y
  **publica su resultado al repositorio propio de la empresa cliente** para actualizar el
  sistema — como un programador que carga código a producción, solo que el artefacto son
  procesos/roles/objetivos que Cockpit entiende y renderiza (BL-15..BL-17 del backlog).

La conexión de datos de delivery hacia Cockpit está **sin mecanismo firmado**: el contrato Pull
API de CK-08 se diseñó contra el server DevHub que ya no existirá y quedó **derogado** (CK-16);
se diseña con el primer consumidor real (BL-18), probablemente vía el repo GitHub del cliente.

## Ecosistema (contrato, no implementación — el detalle de cada producto vive en SU repo)

- **P2 · DevStudio** (`~/Proyectos/dev-studio`, reemplazó al server DevHub — CK-16) — app de
  escritorio por usuario del ciclo de desarrollo (CTO/dev/devops/PO): cada developer ve sus
  repos y sus historias; la versión Product Manager (en construcción) concentra refinamiento y
  priorización, con **GitHub como canalizador**. Futura fuente de datos de delivery de Cockpit
  (mecanismo TBD, BL-18). Sistemas separados, sin import de código cruzado.
- **P3 · Kit** (`~/Proyectos/harness-repo`, graduado) — el entregable final del pilar Personas: los
  arneses por puesto que resuelven una brecha detectada se conectan aquí como respuesta a un gap.
- **P4 · Harness Studio** (`~/Proyectos/harness-studio`, graduado) — no es fuente de datos de
  Cockpit; opera en el plano de talento-IA de la fábrica, no en el de la empresa cliente.

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
  gate bloqueante (I-71 lo derogó); contexto para priorizar.
- **Motor de Discovery (N1)** (→ BL-13) — sin fecha, campaña propia.

## Gestión

Desde CK-11 ("nacemos ordenados"):

- **Trabajo pendiente** — System Backlog en [`proyecto/backlog.yaml`](./proyecto/backlog.yaml)
  (SSoT, columnas por subsistema; vista humana [`proyecto/BACKLOG.md`](./proyecto/BACKLOG.md)).
- **Decisiones** — fichas `CK-NN` en el [`LEDGER.md`](./LEDGER.md) de este repo (continúa la
  numeración de la célula original — CK-10 en adelante).
- **Capabilities funcionales** — Product Increment en [`docs/increment.yaml`](./docs/increment.yaml)
  (SSoT, `CAP-NN`; vista humana [`docs/INCREMENT.md`](./docs/INCREMENT.md)) — solo lo verificado.
