# Metodología-as-code — el método del cliente como dato + gate (project-layer · EJE NUEVO)

> **project-layer · SÍ se edita.** **Extensión #2** del arnés para Cockpit (CK-19). El CORE **no tiene**
> este eje. **Origen:** CK-11 (método migrado del legacy) · re-forjado as-code CK-19.

## Desambiguación cardinal (dos "metodologías" — no confundir)

- **Metodología del PROCESO DE DESARROLLO** = el arnés prenter (CORE): cómo *nosotros* construimos software
  (idea→done, gates, TDD, roles). Vive en `.claude/rules/` + `docs/process/harness/`.
- **Metodología del PRODUCTO** = lo que Cockpit *vende*: el método del consultor con que se **levanta,
  diagnostica y mejora** una empresa cliente (M1 Levantamiento · M2 Mantenimiento · M3 Espinazo). **Esto**
  es el eje as-code de esta regla. SSoT en `sistema/metodo/`. Se empaqueta en **arneses** (N15 Arnesia)
  para las apps edge (Consultio N14). Es SISTEMA (define qué hace Cockpit), no doc de features.

## Regla cardinal

El método es **datos, no prosa** — misma disciplina que `[[arquitectura-as-code]]`: SSoT hand-authored →
vista GENERADA → **gate anti-drift** en cada commit.

| Rol | Archivo | Autoría |
|---|---|---|
| SSoT · catálogo de 31 metodologías (M-cards) | `sistema/metodo/methodologies.yaml` | a mano |
| SSoT · Definición del engagement (plantilla) | `sistema/metodo/proceso/**` (`_modulo.md`·`_etapa.md`·`<paso>.md`, front-matter) | a mano |
| SSoT · objeto de negocio normalizado (12 entidades) | `sistema/schema/objeto.schema.yaml` | a mano |
| SSoT · verticales (nichos) | `sistema/metodo/nichos/*.yaml` (conforman `nicho.schema.yaml`) | a mano |
| Contrato (la forma) | `sistema/metodo/methodology.schema.yaml` | a mano |
| Vista · §4 catálogo | `sistema/metodo/METODOLOGIA.md` (bloques `GEN:indice`/`GEN:cards`/`GEN:tabla`) | **GENERADO** (NO editar) |
| Vista · índice-grafo de acceso (mapa del cerebro) | `sistema/metodo/GRAFO.md` | **GENERADO** (NO editar) |
| Generador + gate | `sistema/metodo/gen_metodo.py` | — |

## Activación en conversación (2026-07-22 — cierra el hueco "conocimiento sin cargador")

El método NO se carga entero ni se cita de memoria. Dos skills project-layer:
- **`/metodo`** (consulta): `GRAFO.md` (mapa ~160 líneas) → ruteo → grep+Read dirigido de ≤6 nodos.
  Disparar siempre que una tarea toque método/indicadores/procesos/roles/nichos/tokens `M\d+`.
- **`/metodo-aprende`** (ingesta): teoría nueva / replantear dogma → prior-art scan → clasificar
  (new/extend/supersede/descartar) → barrido de contradicciones → gate. El ciclo de vida vive en el
  schema v3 (`estado: vigente|superseded|descartada` + `superseded_by` + `razon_estado`) — una card
  reemplazada queda como memoria con puntero, nunca se borra ni se contradice en silencio.

## Disciplina

- **Editar el YAML, no el .md.** El §4 de `METODOLOGIA.md` se GENERA de `methodologies.yaml`; editarlo a
  mano lo pisa el gate. La prosa §1–§3/§5-narrativa sí es a mano (fuera de los bloques GEN).
- **Backbone = el objeto** (O1-O7 hilo · T1-T3 transversal). Cada M-card ancla a un objeto; `combina_con[]`
  es el grafo de composición; `principios[]` tags. Cada campo del objeto lleva `met:` (su metodología).
- **Provenance obligatorio** en los datos del método: cada dato AS-IS lleva `fuente`+`conf` (M23/grounding);
  cada unidad de nicho lleva `confianza`+`derivado_de`+`condiciones` (anti-alucinación + anti-contaminación
  cross-cliente). Un paso referencia metodologías por token `M\d+` (deben resolver al catálogo).
- **Plantilla vs instancia.** `proceso/**` es la Definición (nuestra IP). El estado por cliente (Engagement /
  PasoRun) es la Instancia → vive en el repo del cliente (N6), no acá. Conectan en los **gates** (`gate: G1`
  entra al ciclo SDD del arnés — ahí engancha con el CORE).

## El gate (CK-19 · pre-commit)

`.githooks/pre-commit` corre `gen_metodo.py`: valida `methodologies.yaml` contra `methodology.schema.yaml`
(campos/enums/refs `combina_con` · ciclo de vida `estado`/`superseded_by` v3) + el árbol `proceso/`
(frontmatter required · id==ruta · refs módulo/etapa · tokens `M\d+` resuelven) + `nichos/*.yaml`
(contra `nicho.schema.yaml`: provenance/`derivado_ref`/refs) + coherencia del grafo (WARN arista
vigente→superseded · INFO asimetrías), y regenera `METODOLOGIA.md §4` + `NOTACIONES.html` + `GRAFO.md`;
falla → **bloquea el commit**. Manual: `python3 sistema/metodo/gen_metodo.py` (regenera) · `--check` (solo valida).

## Wiring con el lifecycle del arnés

- Una historia que **construye el motor del método** (p.ej. `sistema/poblar-metodo-m1-m3`,
  `consultio/operar-metodo-construir-mapa-completo`) referencia esta SSoT en su `01-spec` y su `node`.
- El árbol `proceso/` está **parcialmente poblado** (m1/b1 + m3/e0; resto skeleton) — completarlo = historia
  `sistema/poblar-metodo-m1-m3` (ex BL-05). El gate valida lo que exista, tolera skeletons.
- El objeto normalizado ya está cableado a runtime: `objeto.schema.yaml` → `go/objeto.go` → `/api/objeto`
  (CAP-08). `negocio.yaml` a proyección generada = historia `sistema/negocio-yaml-proyeccion-generada` (BL-19).

## Anti-patterns

- ❌ Editar `METODOLOGIA.md §4` a mano (es generado — editá `methodologies.yaml`).
- ❌ Confundir este eje con el proceso de desarrollo del arnés (CORE) — son dos metodologías distintas.
- ❌ Dato del método sin provenance (`fuente`/`conf` en AS-IS · `confianza`/`derivado_de` en nichos).
- ❌ Meter la Instancia (estado por cliente) en la Definición (`proceso/**` es plantilla, IP).

## Referencias

- `sistema/metodo/README.md` · `PROCESS-AS-DATA.md` (modelo) · `METODOLOGIA.md` (compendio) · `M1-LEVANTAMIENTO.md` · `M3-ESPINAZO.md`.
- `sistema/schema/` (objeto de negocio · `DECISIONES.md` D-NN).
- `[[arquitectura-as-code]]` (eje gemelo) · `[[cockpit-stack]]`.
