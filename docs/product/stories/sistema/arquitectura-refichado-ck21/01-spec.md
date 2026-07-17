# 01-spec.md — arquitectura-refichado-ck21

---
story_id: arquitectura-refichado-ck21
type: service-story
module: sistema
capability: sistema/arquitectura-refichado-ck21
po_version: 2
last_modified: 2026-07-17
ratified_by_chris: true   # 2026-07-17 — "Apruebo todo" + acotación triage automatización/narrativa (v2 la incorpora)
links:
  story_yaml: story.yaml
  story_md: 00-story.md
  ledger: CK-21 · CK-22 · CK-23
---

## Resumen ejecutivo

Bajar CK-21 completo a los dos ejes as-code (arquitectura + metodología) para que las historias
funcionales del MVP construyan sobre un mapa sin contradicciones con el norte **Organization as Code
→ Organization Twin**. Cinco frentes de trabajo (WS1-WS5): pase fino de NODOS.md, delta del R-walk,
despliegue.html curado, arquitectura.yaml re-fichado, y — alcance ampliado en refinamiento
(2026-07-17, operador) — **el mapa de notaciones/estándares del twin cementado as-code** con vista
HTML generada: qué estándar usamos para qué dimensión, cuándo sí, cuándo no, cuándo estándar propio
y por qué.

## § Dónde vive

- **node:** transversal (toca NODOS.md/despliegue/arquitectura.yaml = mapa de los 16 nodos, y
  `sistema/metodo/` + `sistema/schema/` = eje metodología).
- Historia **docs-as-code**: no toca runtime Go/UI. Live-verify del seam (API :4100) = N/A
  (`not_applicable_reason: "historia docs-as-code — el artefacto ejecutable son los gates + vistas generadas"`).

## Doctrina que esta historia cementa (la decisión de fondo — FIRMA del operador)

> Base: research `proyecto/research/organization-as-code/` (04 doctrina Palantir · 05 SOTA §base
> teórica · 06 Gartner DTO features · 07 TO-BE 37 capacidades) + estado real de
> `sistema/schema/objeto.schema.yaml` y `sistema/metodo/methodologies.yaml` (31 M-cards).

**Regla cardinal: estándares como vocabulario · schema propio como metamodelo · git como motor ·
notación = proyección generada, nunca SSoT.**

Un estándar/metodología puede jugar exactamente UNO de estos roles frente al twin (por dimensión):

1. **Ancla semántica (vocabulario):** el estándar presta ontología/taxonomía/estructura y se embebe
   como dato (`archimate:`, `met:`, enums) en el schema. No hay diagrama fuente. Ej.: tipos
   ArchiMate, cláusulas ISO 9001, APQC PCF, letras RACI, estructura OKR, niveles COBIT.
2. **Proyección (vista generada):** la notación se usa para RENDERIZAR el dato (swimlane BPMN-lite,
   organigrama, strategy map, tortuga ISO). Se genera con `.py`, jamás se edita a mano.
3. **Intercambio (frontera):** formato estándar para importar/exportar contra herramientas del
   cliente (BPMN 2.0 XML, ArchiMate Model Exchange). No-MVP; se declara para no cerrar la puerta.
4. **Horizonte (gateado D9/CK-21):** estándar reservado para una fase futura ya decidida. BPSim
   (simulación de procesos — "no inventar") · DEMO/Dietz (base formal de transacciones si algún día
   formalizamos la ontología comunicativa).
5. **Descartado (con porqué):** lo que conscientemente NO adoptamos. ArchiMate como METAMODELO
   completo (notation-first = lock-in; Ardoq y Palantir validan entidad-primero) · BPMN como editor
   de diagramas fuente (el proceso es dato con provenance; el diagrama es vista) · UML/C4/CMMN/DMN
   (sin caso hoy) · **Bloom como eje de automatizabilidad** (taxonomía de objetivos de aprendizaje —
   pedagógica; la reemplaza la taxonomía de verbos propia ALM×MGI, ver acotación abajo).

### Acotación del operador (ratificación 2026-07-17) — triage automatización/eliminación + narrativa

Al nivel más bajo (diagramación/narrativa de actividades), el paquete metodológico DEBE permitir
detectar qué procesos/actividades son candidatos a **automatizar** y cuáles a **eliminar**, con la
narrativa como vehículo. Decisión:

- **Vocabulario controlado de verbos (estándar PROPIO):** cada actividad narra con un verbo del
  enum; cada verbo del vocabulario se clasifica en 2 ejes — **clase de tarea ALM**
  (rutinaria/no-rutinaria × manual/cognitiva-analítica/interpersonal; Autor-Levy-Murnane, el marco
  estándar de automatizabilidad) × **capacidad requerida MGI** (recolectar datos · procesar datos ·
  físico predecible · físico impredecible · interfaz-stakeholder · experticia/decisión · gestión de
  personas). Supersede la candidatura Bloom anotada en `objeto.schema.yaml` (`actividad.verbo`).
- **Score de automatizabilidad DERIVADO, nunca SSoT:** f(clase del verbo, datos estructurados s/n,
  reglas estables s/n, volumen/frecuencia, % excepciones — criterios RPA-suitability por
  actividad). Anti-drift: se calcula, no se etiqueta.
- **Eliminar antes de automatizar:** triage ECRS (Eliminar→Combinar→Reordenar→Simplificar) +
  desperdicio lean (empalma con VSM/M09) — no se automatiza el desperdicio.
- **Desgaste/carga cognitiva medida:** NASA-TLX como instrumento situacional (entrevistas M1).
- **SGC/QMS explícito:** nuestros "estándares de manuales/procesos/funciones" anclan a la pirámide
  documental **ISO 10013:2021** (manual → procedimientos → instrucciones → registros) + ISO 9001
  cl.7.5; el mecanismo de ACTUALIZACIÓN de procesos = PDCA + Gestión de Cambios (D5/D8: el
  pipeline dev→UAT→prod ES la gestión de cambios ISO).
- **Cascada hasta la acción diaria:** actividad (verbo) → KPI de la persona → KPI del área → OKR →
  objetivo del directorio → plan anual / plan a 3 años. El hilo de oro ya modela
  objetivo→OKR→KPI→proceso→rol→persona; el eslabón **actividad→KPI-persona** + el enum de verbos
  se MATERIALIZAN en `schema-v2-hilo-de-oro-kinetica` (esta historia le deja la decisión cementada
  como insumo — ver Fuera de alcance).

**Cuándo estándar PROPIO:** cuando el diferenciador queda fuera de todo estándar — y Gartner lo
confirma (hilo de oro medido + arneses por puesto + as-code están FUERA de su lista DTO):
el **meta-metamodelo = `objeto.schema.yaml` as-code en git** (9 entidades, doctrina Palantir:
semántica + kinética + provenance structs + open/closed), extensible por cliente sin fork; a futuro
formalizable como contrato de entidad publicable estilo Backstage (`apiVersion/kind/spec`).

### Matriz dimensión → estándar (la tabla que se vuelve dato en WS5)

| Dimensión del twin | Estándar(es) | Rol | Cuándo NO / límite |
|---|---|---|---|
| Metamodelo (9 entidades + relaciones + kinética) | **propio** (doctrina Palantir como gramática) | metamodelo as-code | ArchiMate-como-metamodelo descartado |
| Vocabulario de arquitectura | ArchiMate 3.2 (tipos por entidad/relación) | ancla | sin diagramas fuente; sin capas completas |
| Procesos — clasificación | APQC PCF + tortuga ISO 4.4 | ancla | — |
| Procesos — flujo | BPMN 2.0 (subset "BPMN-lite": lane/tipo/disparador) | ancla + proyección swimlane | editor de diagramas NO; export XML = intercambio V2 |
| Organización (personas/roles/áreas) | RACI + ISO 9001 cl.5.3 + TOGAF org decomposition | ancla + proyección organigrama | no es suite RRHH |
| Estrategia (objetivos→OKR→KPI) | OKR + Hoshin (cascada) + BSC (perspectivas) | ancla + proyección strategy-map | X-matrix ceremonial NO |
| Madurez y brecha | COBIT niveles 0-5 + ISO 19011 (evidencia) + WSJF + FinOps | ancla | — |
| Calidad / loop de mejora | ISO 9001 (ontología cl.4 + PDCA) | paraguas | sin aparato de certificación (VISION §ISO) |
| Provenance (todo dato AS-IS) | struct `fuente`+`conf` (M23, patrón Palantir) | transversal obligatorio | — |
| Narrativa de actividades (nivel más bajo) | **vocabulario controlado de verbos PROPIO** (clase ALM × capacidad MGI) | ancla + insumo del triage | Bloom descartada como eje (pedagógica — mide aprendizaje, no automatizabilidad) |
| Triage automatizar/eliminar | ECRS (Eliminar→Combinar→Reordenar→Simplificar) + desperdicio lean (M09) + criterios RPA-suitability | ancla + proyección (heatmap de candidatos) | el score se DERIVA (verbo+datos+reglas+volumen+excepciones), jamás se etiqueta a mano |
| Carga cognitiva medida (desgaste) | NASA-TLX | situacional (medir con humanos en M1, no estimar) | — |
| Documentación QMS (manuales/procedimientos/instrucciones/funciones) | ISO 10013:2021 (pirámide documental) + ISO 9001 cl.7.5 | ancla | actualización de procesos = PDCA + Gestión de Cambios (el pipeline dev→UAT→prod ES el mecanismo — D5/D8) |
| Simulación | BPSim + DEMO | horizonte (D9) | nada antes del twin base + demanda |
| Contrato de entidad publicable | patrón Backstage | propio-publicable (V2) | — |

## Alcance — 5 workstreams

### WS1 · NODOS.md pase fino
- Chequeo 2 en profundidad: residencia del dato POR TIER (hosteado default / self-hosted
  enterprise-regulados) reflejada en las fichas de N6/N13/N16/N12 (hoy solo el chequeo la narra).
- TODAS las fichas coherentes con: default hosteado single-tenant (D3) · twin = deseado(N6) ×
  real(N16) × brecha continua(N13) · Consultio v0 = arneses sin shell (D7) · Gestión de Cambios en
  MVP (D8).
- `# Pendientes consolidados` refrescado (referencias a historias vigentes del roadmap CK-22/23).

### WS2 · R-walk delta (propuesta a firmar — pedido "ya de una vez")
- **R9 se parte:** R9 queda = canal técnico (releases firmadas + telemetría agregada, N3).
  **R16 nueva** = puerta comercial: login, cobro, gestión usuarios/asientos, entitlements/licencias
  (N3, E1-E3). Razón: D4 — el Portal ya no es solo canal; dos responsabilidades distintas con
  distinto stack y riesgo.
- **R17 nueva** = medir el hilo de oro y mantener la brecha continua + ciclo brecha→proyecto→KPI
  movido (N13, E3). Razón: D1/D2 — es EL diferenciador; hoy ningún R lo posee (R6 = brecha puntual
  del engagement en N14/E2; R11 = cruce y servido por niveles). R6 y R11 se re-redactan para no
  solapar (R6 → "brecha inicial del engagement"; R11 → "cruzar y servir" sin absorber el loop).
- Fichas N3/N13/N14 actualizan sus `[R#]`; biyección validada por el gate.

### WS3 · despliegue.html (curado a mano)
- N3 pintado como Portal pleno (login/cobro/asientos/fingerprint compuesto/descargas + canal).
- Las DOS modalidades de la Organización: hosteada por nosotros (default) / en red del cliente
  (tier enterprise-regulados) — misma celda, dos residencias.
- El twin como narrativa del flujo (deseado × real × brecha) en la leyenda/lectura del diagrama.
- Validación de madurez contra NODOS.md (gate existente).

### WS4 · arquitectura.yaml re-fichado
- `meta.proposito` + comentarios de cabecera reescritos al framing CK-21 (hoy: "binario en la red
  del cliente" como default y "Consultio = clon de DevStudio" — contradicen D3/D7).
- Componentes nuevos con `fichas: [CK-21]`, `estado: declarado`, sin `ruta:` (aún sin código):
  `motor-de-indicadores` (hilo de oro N13) · `brecha-proyecto` (ciclo brecha→proyecto N13) ·
  `portal` (frontera con N3 — plano ecosistema).
- Planos/relaciones revisados contra el twin (¿banda "fuentes" nombra deseado vs real?).

### WS5 · Mapa de notaciones as-code (alcance nuevo — el pedido del operador)
- **SSoT:** extender `sistema/metodo/methodologies.yaml` — bloque `twin:` por M-card:
  `rol: ancla|proyeccion|intercambio|horizonte|descartada|propio` · `dimensiones: [...]` ·
  `cuando_si:` · `cuando_no:` (1-línea cada uno). NO se forkea la taxonomía (regla
  anti-duplicación: mismo catálogo, dimensión nueva).
- **M-cards nuevas:** doctrina de ontología Palantir (la gramática del metamodelo — hoy adoptada
  por CK-21 pero invisible en el catálogo) · DEMO (Dietz) y BPSim como cards `horizonte` ·
  **taxonomía de verbos & automatizabilidad** (propia, ALM×MGI — supersede cand. Bloom) · **ECRS**
  · **criterios RPA-suitability** · **ISO 10013** (pirámide documental QMS) · **NASA-TLX**
  (situacional). Ajuste de cards existentes cuyo uso cambió con la visión madura (remapeo).
- **Contrato:** `methodology.schema.yaml` valida el bloque `twin:` (enums de rol + dimensiones
  contra una lista canónica de dimensiones del twin).
- **Generador + vista:** `gen_metodo.py` extendido (o `gen_notaciones.py` hermano) produce
  **`sistema/metodo/NOTACIONES.html`**: mapa de decisión navegable — por dimensión del twin, qué
  estándar, en qué rol, cuándo sí/no, por qué, con la regla cardinal arriba. Correr `python3 ...`
  → abrir el HTML → entenderlo sin leer YAML. Gate anti-drift en pre-commit (mismo patrón CK-17).
- **Prosa:** §5 nuevo en `METODOLOGIA.md` (bloque GEN) o sección en `PROCESS-AS-DATA.md` con la
  regla cardinal (para humanos y arneses).

## Criterios de aceptación (Gherkin-lite)

- **SC-1** Dado el repo tras el merge, cuando corro `gen_arquitectura.py --check` +
  `gen_metodo.py --check` + `gen_roadmap.py --check`, entonces los tres salen 0.
- **SC-2** Dado NODOS.md, cuando busco "clon de DevStudio como precondición", "soberanía como
  dogma", "N3 solo-canal" o residencia sin tier, entonces no queda ninguna ficha con el framing
  viejo.
- **SC-3** Dado el R-walk, cuando recorro R1-R17, entonces R16 (puerta comercial) y R17 (brecha
  continua/hilo de oro) existen con nodo dueño, y todo `[R#]` de las fichas resuelve (gate).
- **SC-4** Dado `arquitectura.yaml`, cuando lo valido, entonces existen `motor-de-indicadores`,
  `brecha-proyecto` y `portal` con `fichas:` que resuelven en LEDGER, y `meta.proposito` narra el
  modelo CK-21 (hosteado default + twin).
- **SC-5** Dado `methodologies.yaml`, cuando lo valido, entonces TODA M-card tiene bloque `twin:`
  válido, existen las cards de doctrina Palantir + DEMO + BPSim + taxonomía de verbos (ALM×MGI) +
  ECRS + RPA-suitability + ISO 10013 + NASA-TLX, y `NOTACIONES.html` regenerado está en sync
  (anti-drift).
- **SC-8** Dado `NOTACIONES.html`, cuando el operador busca "¿esta actividad se automatiza o se
  elimina?", entonces encuentra el triage completo (ECRS → verbos ALM×MGI → criterios
  RPA-suitability → score derivado) y el porqué del descarte de Bloom. (G Chris-verify.)
- **SC-6** Dado `NOTACIONES.html` abierto en navegador, cuando el operador lo lee, entonces puede
  responder para cualquier dimensión del twin: qué estándar usamos, en qué rol, cuándo sí, cuándo
  no y cuándo hacemos estándar propio — sin abrir el YAML. (Se verifica en G Chris-verify.)
- **SC-7** Dado `despliegue.html` abierto, cuando el operador lo lee, entonces ve N3-Portal pleno,
  las dos modalidades de residencia y el twin como narrativa. (G Chris-verify.)

## DoD (docs-as-code — ratificado en refinamiento)

Gates verdes (SC-1) + revisión del operador en G (Chris-verify): render de `despliegue.html`,
`arquitectura.html` y `NOTACIONES.html` (SC-6/SC-7). Sin live-verify de API (N/A declarado).

## Fuera de alcance

- Construir motor-de-indicadores / brecha-proyecto / portal (solo se DECLARAN; construcción =
  historias F1.1/F2).
- Cambios a `objeto.schema.yaml` (eso es `schema-v2-hilo-de-oro-kinetica`, siguiente en F1.0 —
  esta historia le deja la doctrina cementada como insumo). Incluye: el ENUM de verbos en
  `actividad.verbo`, los campos RPA-suitability por actividad, el score derivado y el eslabón
  actividad→KPI-persona de la cascada.
- Export BPMN XML / ArchiMate exchange (rol intercambio declarado, no implementado).
- Poblar `proceso/**` (historia `poblar-metodo-m1-m3`).

## Prior art scan (refinamiento 2026-07-17)

- Barrido research: corpus organization-as-code ya recomienda entidad-primero/Palantir y "BPSim/DEMO
  no inventar" (04:5 · 05:26-27 · 06:43 · 07:9-15). Sin CMMN/DMN en corpus.
- Barrido método: `objeto.schema.yaml` YA ancla ArchiMate + `met:` por campo; `methodologies.yaml`
  ya cataloga BPMN(M11)/APQC(M12)/ArchiMate(M13)/COBIT(M15)/ISO(M16)/RACI(M25)/OKR(M21)/
  Hoshin(M26)/BSC(M30). El WS5 AGREGA la dimensión de decisión (rol/cuándo), no recrea catálogo.
- Historia `terminar-arquitectura-despliegue` (done) cerró el mapa CK-14/18; ésta baja el delta
  CK-21. Sin duplicación.
