# GLOSARIO — la fuente única del vocabulario de Cockpit

> **Graduado 2026-07-26** desde `docs/metodo/objeto/glosario.md` (v0 journal, que ya declaraba este
> destino) + la doctrina **cero jerga** firmada por el operador el mismo día. Referenciado por
> `CLAUDE.md`. **Regla de uso:** se consulta ANTES de escribir cualquier texto visible (mockup,
> pantalla, spec, documento de construcción) y ANTES de nombrar cualquier concepto nuevo.

## Doctrina (firmada por el operador, 2026-07-26)

Dos superficies, ambas **sin jerga**:
1. **Mockups / pantallas** — el lienzo de cómo quedará el sistema: todo se nombra por su término
   **más común en el rubro y en el contexto donde se lee**.
2. **Specs, metodología y documentos de construcción** — la base sobre la que se construye tras la
   aprobación del mockup: mismo estándar.

**Test de lectura por nivel:** ¿el habitante de ese nivel conoce la palabra sin que se la
expliquen? El directorio no trae "KR" ni "drift" de casa; el operativo tolera el vocabulario
técnico de SU oficio. La jerga interna puede vivir en código, comentarios y notas internas —
jamás en las dos superficies.

**Regla de oro (heredada del v0):** si nuestro término choca con la norma → gana la norma. Cero
homónimos. Un concepto = un nombre.

**Cómo crece:** cualquier sesión puede PROPONER un término (fila nueva marcada `propuesto`); el
operador firma y pasa a `firmado`. Nada se usa en pantalla estando `propuesto`.

---

## §1 · Lenguaje VISIBLE — traducciones firmadas

> **Ratificación 2026-07-28 (operador):** las 14 filas del barrido twin v17 (desde "embudo de ideas"
> hasta "mejora continua") quedan **firmadas** — dejaron de ser aplicación provisional. El mismo día
> el barrido llegó al método: M44 se renombró "Gestión de ideas (embudo de ideas)" en
> `methodologies.yaml` y los `met:` del schema dicen "embudo" (la obra brasileña "funil de ideias"
> se conserva solo como fuente/procedencia).

| En pantalla / documentos se dice | Jamás se dice (jerga) | Nota |
|---|---|---|
| nivel (1 Directorio · 2 Estratégico · 3 Táctico · 4 Operativo) | capa D/E/T/O, piso | |
| meta (del trimestre) | KR, key result | |
| dentro de meta · cerca · fuera | en banda, pulso | |
| alertas que escalaron | subió del piso, burbujeo | |
| incidencia crítica | excepción ardiendo, arde, fuego | |
| trazar / cadena trazada | hilo, hilo de oro (en UI) | concepto interno sigue siendo "hilo de oro" |
| filtro | recorte, chip, scope | |
| proyectos en curso | portafolio en vuelo | |
| suelto / sin objetivo que lo respalde | fractura, huérfano, sin ancla | |
| responsable | dueño, owner, accountable (en UI) | RACI vive en specs técnicas |
| desactualizado | drift, stale | |
| qué tan desarrollada está (una capacidad) | heatmap de madurez | "madurez" sola sí es común |
| doble clic · clic | dblclick, click | |
| elemento | nodo | |
| abrir / plegada | expandir lateral, colapsada | |
| cobranza: N días | DSO | |
| mismo mapa, tu parte con detalle | fog of war | |
| simulación / escenario | corrida, what-if | pendiente aplicar en twin |
| flujograma | lienzo (z2) | pendiente aplicar en twin |
| clasificación (automatizable o no) | triage | pendiente aplicar en twin |
| procesos del negocio / procesos clave | misionales (en UI) | "misional" queda en specs ISO |
| respaldo del método · cita "§ fuente" | tokens M-NN sueltos en pantalla, met:, method-as-code | capa v14.3 (firmada 2026-07-26 al aprobar la propuesta); el código M-NN vive SOLO dentro de la ficha de respaldo, como procedencia |
| embudo de ideas | funil (pt), funil de ideas | barrido twin v17 (2026-07-28); "embudo" ya vivía firmado en nivel 3 — un concepto, un nombre |
| revisión de fase · avanzar de fase | tollgate | barrido twin v17 |
| bajada acordada (ida y vuelta) | catchball | ya se usaba en el rumbo v15; v17 la lleva a la bandeja |
| costo de esperar · prioridad ① | WSJF | el nombre técnico queda como fuente en la ficha de respaldo (M28) |
| en curso (proyectos) | en vuelo | aplica la fila "proyectos en curso" ya firmada — barrido v17 |
| ciclo (de mejora) | loop, loop-back | "vuelta atrás permitida" para el loop-back PDCA |
| desarrollo → pruebas → producción | dev → UAT → prod | entornos, en pantalla siempre en español |
| personal (+N rol) | headcount | |
| costo por única vez · se recupera en N meses | one-time · payback | |
| la tubería técnica (no se ve) | git, hash, PR, merge, N6 en pantalla | el motor versiona por debajo; el usuario ve solicitudes y versiones |
| simulación en borrador | what-if | complementa la fila "corrida" (§1b, renombre pendiente de firma) |
| puntajes de automatización | scores M36 | |
| mejora continua | kaizen (como etiqueta suelta) | "kaizen teian" puede citarse como fuente en la ficha de respaldo |

**Términos del rubro que SÍ se usan tal cual** (no son jerga — son el nombre común): apetito de
riesgo · cadena de valor · compromiso · apuesta · madurez · brecha · capacidad · organigrama ·
indicador · objetivo · proceso · área · puesto · rol.

## §1b · Renombres de PRODUCTO — pendientes de firma del operador

Nombres con peso de marca/doctrina — no se tocan sin firma explícita, fila por fila:

| Término interno | Dónde vive | Candidato común | Recomendación | Estado |
|---|---|---|---|---|
| twin | doctrina CK-21/29, mockup | gemelo (digital) de la empresa · el mapa vivo | "gemelo digital" ES término común del rubro; en UI: "el gemelo de tu empresa" | propuesto |
| arnés | tesis CK-29/30, D-20, M46 | kit de trabajo del puesto · equipo de trabajo | conservar "arnés" como nombre de producto PERO definirlo en su primera aparición en pantalla | propuesto |
| hilo de oro | diferenciador #1 | trazabilidad de objetivo a trabajo | UI dice "trazar"; "hilo de oro" queda como nombre comercial del diferenciador en material de venta | propuesto |
| Pulso · N/7 en banda (sala v13) | twin v13 | "¿Avanzan los objetivos? N de 7 dentro de meta" | aplicar el patrón ya validado en el sandbox | propuesto |
| corrida | twin v13 (what-if) | simulación · escenario | "escenario" (común en planeamiento) | propuesto |
| lienzo | twin v13 (z2) | flujograma | "flujograma" es lo que dice un consultor de procesos en LATAM | propuesto |
| triage | twin v13/método M35-36 | clasificación del trabajo | en specs puede quedar "triage (clasificación)" | propuesto |

## §2 · Lenguaje del MODELO (el v0 graduado — entidades contra la norma)

### Entidades (los "sustantivos")

| Término | Norma / fuente | Qué es | NO confundir con |
|---|---|---|---|
| **empresa** | ISO 9001 cl.4 (organización) | la organización; identidad-ancla | un `sistema` |
| **persona** | ArchiMate Business Actor | individuo concreto; *ocupa* un puesto | `rol` · `puesto` |
| **puesto** | posición del organigrama (D-19) | posición que se ocupa y reporta; agrega N roles | `rol` (puesto=posición, rol=responsabilidad) |
| **rol** | ArchiMate Business Role · ISO cl.5.3 · BPMN lane · RACI | conjunto estable de responsabilidades; *realiza* procesos | `persona`; `función`; `puesto` |
| **area** | ArchiMate Business Actor (org) · TOGAF Org Unit (D-12) | unidad organizativa; N:M con proceso (transversal) | `capability`; `rol` |
| **proceso** | ArchiMate Business Process · ISO cl.4.4 · APQC L3 | secuencia de actividades que produce valor | `capability` (cómo vs qué) |
| **actividad** | APQC L4 · BPMN Task | paso clave dentro de un proceso | `tarea` (L5, más fina) |
| **tarea** | APQC L5 | unidad de trabajo dentro de una actividad (D-17/D-21) | `actividad`; `paso` (método) |
| **sistema** | ArchiMate Application Component (+Product opt-in) | app/herramienta; "con qué" | `proceso` |
| **objetivo** | ISO 9001 cl.6.2 · OKR (M21) | resultado deseado; su meta trimestral = KR `from→to` | `brecha` |
| **brecha** | Capability heatmap (M31) · COBIT (M15) | distancia AS-IS ↔ objetivo | `objetivo` |
| **capability / capacidad** | Business Capability (M31, sentido TOGAF) | QUÉ hace la empresa (estable) | `proceso` |
| **arnés** | REGISTRO por rol×proceso (D-20, M46) | registro del trabajo compilado de un puesto: procedencia, versión, vigencia, autonomía, supervisión | el CONTENIDO compilado (vive en Arnesia N15) |

### Conceptos DISUELTOS (se nombran, pero NO son cajas)

| Término | Por qué no es entidad | Dónde vive |
|---|---|---|
| **función** | = asignaciones de un rol (derivado RACI); guardarla duplica | wiring `actividad.carril = rol` |
| **manual** | el "cómo" es la pata método de la tortuga | `desc` de actividad + `criterios_control`; el PDF del cliente = fuente |

### Namespace vecino — método del consultor

**paso** = unidad del MÉTODO del consultor (`sistema/metodo/proceso/**`). Jamás nombra una unidad
del proceso del cliente (ahí: `actividad`/`tarea`) — y viceversa. Cero homónimos.

### Wiring proceso↔gente

**dueño/process owner** (ISO · RACI Accountable) = un `rol` · **carril/swimlane** (BPMN Lane) = el
`rol` que ejecuta. Cadena: `persona →(ocupa)→ puesto →(agrega)→ rol →(realiza)→ proceso/actividad`.

### Atributos (los "adjetivos")

| Atributo | Vive en | Valores |
|---|---|---|
| procedencia | `sistema` | propio · compartido · externo · terciarizado |
| sirve_a | `sistema` | interno · cliente-final (ex-`audiencia`, D-11) |
| digital | link `proceso→sistema` | manual · externo · integrado |

### Colisiones resueltas / abiertas
- `capability`: sentido TOGAF (no ISO 9000 3.6.12) — anotado.
- `audiencia`→`sirve_a` (D-11) · `sistema.rol` disuelto (D-10) · `rol`(cargo)→partido en
  `puesto`+`rol` (D-19).
- **harness/harnesses** (proceso de desarrollo) — sellado aparte en kernel `CLAUDE.md`; no es el
  "arnés" del producto.

---

## Operativa

- **Mockups y specs consultan §1 antes de escribir**; el schema y el código consultan §2.
- Término nuevo → fila `propuesto` → firma del operador → `firmado`. Sin firma no aparece en pantalla.
- El barrido del twin v13 con §1b se hace en el v14, tras la firma fila por fila.
- `docs/metodo/objeto/glosario.md` queda como puntero histórico a este archivo.
