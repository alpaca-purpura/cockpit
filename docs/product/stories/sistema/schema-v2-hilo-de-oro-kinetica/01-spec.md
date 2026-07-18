# 01-spec.md — objeto.schema v2: hilo de oro medible + capa kinética

---
story_id: schema-v2-hilo-de-oro-kinetica
type: service-story
module: sistema
capability: cockpit/api-objeto
cap_change_type: extend
po_version: 1
last_modified: 2026-07-17
ratified_by_chris: false          # RONDA 1 — Chris cierra § Dudas abiertas y firma antes de architect
links:
  story_yaml: story.yaml
  story_md: 00-story.md
  ledger: CK-21 (D6) · CK-23 · CK-24
  registro_heredado: ../arquitectura-refichado-ck21/01-spec.md § Insumos cementados (1-11)
---

## Resumen ejecutivo

Evolucionar `sistema/schema/objeto.schema.yaml` de v1 (9 entidades, CK-12/CK-13) a **v2**: (a) el
**hilo de oro se vuelve medible en el dato** — KPI y Proyecto de mejora entran como entidades de
primera clase, `objetivo` se completa como entidad OKR plena (horizonte, estado, perspectiva), y la
cascada canónica única (`plan 3a → anual → objetivo → KR → KPI → actividad`) queda recorrible por
aristas; (b) nace la **capa kinética** — acciones válidas por entidad declaradas como dato (quién,
con qué aprobación, con qué efecto), contrato que la Gestión de Cambios (BL-24) ejecutará y
`auth-niveles` gobernará; (c) la **doctrina Palantir** (CK-21/D6) se aplica de forma auditable:
naming navegable, anti-patterns vigilados, provenance extendida, y los 11 insumos cementados por la
auditoría adversarial del refichado se implementan o descartan con razón escrita. El consumidor
vivo `/api/objeto` (CAP-08) asciende a v2: sirve y valida las 11 entidades juntas, retrocompatible
con shells v1 (expand-contract, D-06).

## § Dónde vive

- **node:** `transversal` (SSoT `sistema/schema/` — eje metodología-as-code) con consumidor en
  **N13** (`go/objeto.go` → `/api/objeto`, CAP-08).
- Historia **schema + servicio**: toca el contrato YAML, el book (`sistema/schema/metodologia/`),
  dos SSoT nuevos (`verbos.yaml`, capa kinética) y el validador Go. Sin superficie UI nueva.
- Live-verify (seam): `GET /api/objeto?empresa=<id>` ejercido de verdad — contra el shell real
  `prenter` (regresión cero) y contra un mini-fixture de test v2 (entidades nuevas ejercidas). El
  fixture COMPLETO es la historia siguiente (`organizacion-ficticia-golden-fixture`, CK-23).

## Doctrina heredada (no se re-decide aquí — se implementa)

| Fuente | Qué manda |
|---|---|
| Cascada canónica ÚNICA (refichado WS5 · METODOLOGIA.md §2) | `plan 3 años → plan anual → objetivo (directorio) → KR (OKR trimestral) → KPI (de proceso, dueño = ROL o área) → actividad (verbo)` |
| **CK-24** (frontera persona) | KPI ancla a rol/proceso/área; la persona = **ocupante del rol**, jamás eslabón de medición. TLX agregado por rol/proceso, nunca registro individual. |
| **D-07** (unidad de ejecución) | Proceso definido UNA vez, medido POR unidad: `unidad_ref` en la MEDICIÓN del KPI; SPV legal = `entidad_legal_ref` (atributo, no partición). |
| `objetivos.md §8` | Rol = KR ownership, **no OKR individual** → NO nace entidad `okr`: el OKR ES `objetivo` + `key_results` embebidos. "Primera clase" se cumple completando `objetivo`. |
| Doctrina Palantir (research 04 · CK-21/D6) | Semántica + kinética; identidad ≠ observación (KPI ≠ medición); acciones = operaciones de negocio (anti Action Sprawl); naming navegable (anti Misnomer); provenance structs; open/closed. |
| Triage automatización (refichado · ratificado) | Verbos = vocabulario controlado PROPIO (clase ALM × capacidad MGI); DOS scores (RPA + agente) **derivados con `conf` propagada**, jamás etiquetados; veredicto = enum de 5. |

## § Mapa funcional (capa humana — ratifica Chris ANTES de architect)

### 1. Happy path (el camino dorado, narrado)

1. El consultor (o el fixture) escribe en el shell de la empresa archivos `kpis/kpi-*.yaml` y
   `proyectos/pry-*.yaml` junto a las 9 entidades v1, siguiendo `objeto.schema.yaml` v2.
2. Cada KPI declara su ancla (`proceso_ref`), su dueño (`dueño_ref → rol|area`), a qué KR
   contribuye (`contribuye_a`), y sus mediciones con provenance (declarado y/u observado,
   `unidad_ref` opcional).
3. Cada proyecto de mejora nace de brechas (`origen_brecha_refs`), lleva caso de negocio
   (costo/beneficio/ROI) y compromete qué KPI/KR mueve (`mueve_refs`); su `estado` recorre el ciclo
   de vida PDCA.
4. `GET /api/objeto?empresa=<id>` lee las **11 entidades juntas**, valida refs/enums/invariantes v2
   y responde el objeto completo; el hilo es recorrible en el dato: actividad → KPI → KR → objetivo
   (y de vuelta), con la persona entrando solo como ocupante del rol.
5. El pre-commit valida los SSoT nuevos (vocabulario de verbos, catálogo de acciones kinéticas)
   igual que hoy valida arquitectura y método — drift bloqueado.

### 2. Bifurcaciones (árbol de decisión)

```
Happy path
├─ Bif-1 · ¿shell v1 sin entidades nuevas (prenter hoy)?
│   ├─ sí → valida OK; warnings SOLO de deprecación (proceso.kpis embebido)   → SC-2
│   └─ no → valida el conjunto v2 completo                                     → SC-1
├─ Bif-2 · ¿kpi.dueño_ref apunta a persona?         → rechazo explícito citando CK-24 → SC-3
├─ Bif-3 · ¿ref del hilo colgante (contribuye_a / alimenta_kpi_refs /
│          origen_brecha_refs / mueve_refs / unidad_ref)?  → warning por ref  → SC-4
├─ Bif-4 · ¿actividad.verbo fuera del vocabulario?
│   ├─ sinónimo conocido → warning + sugerencia de normalización               → SC-5
│   └─ desconocido       → warning "verbo sin clasificar"                      → SC-5
├─ Bif-5 · ¿verbo nuevo en verbos.yaml sin clase ALM×MGI completa? → gate pre-commit FALLA → SC-5
├─ Bif-6 · ¿acción kinética malformada (entidad inexistente · nivel inválido ·
│          id estilo "set-campo")?                    → gate pre-commit FALLA  → SC-6
├─ Bif-7 · ¿medición con declarado ≠ observado?      → estado `divergente` DERIVADO al leer
│                                                      (se pinta, no se guarda) → SC-7
├─ Bif-8 · ¿objetivo sin key_results?                → warning `sin-ancla-de-valor`
│                                                      (ya no error — RN-4 se relaja) → SC-8
└─ Bif-9 · ¿actividad con verbo corregido sin provenance? → warning (score gameable) → SC-9
```

### 3. Reglas de negocio (RN — se reflejan en la cap `cockpit/api-objeto`)

- **RN-8** — `kpi.dueño_ref` resuelve a rol o área, **nunca** a persona (CK-24).
- **RN-9** — toda medición lleva `fuente`+`conf`; el estado `divergente` (declarado vs observado)
  se DERIVA al leer, jamás se persiste (el motor pinta el gaming, no lo consagra).
- **RN-10** — las acciones kinéticas son operaciones de negocio (`aprobar-proyecto`,
  `registrar-medicion`), nunca "set-campo"; catálogo validado por gate (anti Action Sprawl).
- **RN-11** — `actividad.verbo` pertenece al vocabulario controlado (o normaliza por sinónimo);
  verbo nuevo entra solo por PR que declara su clase ALM×MGI (gate).
- **RN-12** — `proyecto.estado` transita solo vía acción kinética (declarativo en v2; la Gestión
  de Cambios BL-24 será el motor que lo ejecute).
- **RN-13** — los scores RPA/agente y el rollup del semáforo son DERIVADOS de campos declarados
  (`rollup:` es función declarada, no resultado guardado) — un-hecho-un-lugar.
- **RN-4′** (modifica RN-4 de la cap) — `objetivo.key_results` pasa a opcional; su ausencia genera
  warning `sin-ancla-de-valor`, distinto de `off-thread` (cliente sin OKR no vacía el diagnóstico).

### 4. Criterios de aceptación (AC — checklist de cierre)

- [ ] **AC-1** — `objeto.schema.yaml` `meta.version: 2`: 11 entidades (9 + `kpi` + `proyecto`),
  aristas nuevas del hilo en `relaciones:`, invariantes v2, backbone extendido (estrato O7 Mejora).
- [ ] **AC-2** — `/api/objeto` sirve y valida el objeto v2 ENTERO; shell `prenter` v1 responde sin
  regresión (cero errores nuevos); mini-fixture v2 ejercita cada entidad/arista nueva en vivo.
- [ ] **AC-3** — `sistema/schema/verbos.yaml` (SSoT nuevo): seed inicial clasificado ALM×MGI +
  `sinonimos[]` es-419 + gate de completitud en pre-commit.
- [ ] **AC-4** — capa kinética declarada como dato: contrato (meta-schema de acción) + catálogo
  seed para las entidades del loop (kpi · proyecto · brecha · objetivo · proceso), gate verde.
- [ ] **AC-5** — deuda saldada: ref muerta `process.schema` (línea 49) resuelta; enum `fuente`
  incorpora `Observado`; `from/to/current` numéricos.
- [ ] **AC-6** — **tabla de trazabilidad de los 11 insumos heredados** (abajo) con cada uno
  `implementado` o `descartado + razón` — cero insumos silenciosamente ignorados.
- [ ] **AC-7** — book coherente: `README §1` (backbone + O7), capítulos breves `kpis.md` y
  `proyectos.md` (patrón `objetivos.md`), invariantes y glosario al día.

## § Diseño del schema v2 (el corazón — para ratificar forma antes de architect)

### A · Entidad nueva `kpi` — `kpis/kpi-*.yaml` (o_code O2 · ArchiMate Outcome/Metric, Motivation)

Identidad (la definición) separada de observación (las mediciones) — Palantir P1:

- `id` · `nombre` (calificado, anti-Misnomer: `rotacion-personal-pct`, no `valor`) · `descripcion`
- `tipologia: enum [kpi, dpi, kri]` (adoptado del demo SOMA) · `tipo: enum [lead, lag]`
- `proceso_ref → proceso` (ancla de la cascada; opcional con warning "hilo incompleto")
- `dueño_ref → rol|area` **requerido** (RN-8/CK-24)
- `unidad_medida` · `meta {target, umbral_amarillo?, umbral_rojo?}` (numéricos)
- `frecuencia: enum [diaria, semanal, mensual, trimestral]` (refresco esperado — frescura)
- `contribuye_a: list {kr_ref → key_result, peso?}` — la arista KPI→KR del hilo (N:M)
- `en_tension_con: list ref → kpi` (counter-metric — lado min-id, un-hecho-un-lugar)
- `rollup: enum [peor-hijo, promedio, ponderado]` (función DECLARADA del semáforo)
- `mediciones: list` subesquema `medicion` (weak-entity `kpi-x#mN`): `fecha` ·
  `valor_declarado?` · `valor_observado? {valor, query_ref}` · `unidad_ref? → empresa#uN` (D-07) ·
  `fuente` · `conf` — estado `divergente` = derivado al leer (RN-9)
- `fuente` · `conf`

### B · Entidad nueva `proyecto` — `proyectos/pry-*.yaml` (o_code O7 · ArchiMate Work Package)

El ciclo brecha→proyecto→ejecución→KPI movido DENTRO del dato (TO-BE #12-13):

- `id` · `nombre` · `descripcion` · `dueño_ref → rol`
- `origen_brecha_refs: list ref → brecha` (vacío = warning "proyecto sin diagnóstico")
- `caso_negocio {costo_estimado, beneficio_estimado, roi, supuestos}` (M22 FinOps — numéricos)
- `prio: enum prio` (M28 WSJF)
- `mueve_refs: list {ref → kpi|key_result, delta_esperado?}` — el compromiso de medición
- `estado: enum [propuesto, aprobado, en-ejecucion, en-verificacion, cerrado, cancelado]` (PDCA;
  transiciones = acciones kinéticas, RN-12)
- `hitos: list` weak-entity `pry-x#hN {nombre, fecha, estado}`
- `resultado? {fecha_cierre, delta_observado, veredicto: enum [movio, parcial, no-movio],
  aprendizaje}` — cierra el loop
- `fuente` · `conf`

Backbone: estrato nuevo **O7 · Mejora** ("¿qué hacemos al respecto?") en `README §1` — el
diagnóstico (O6) deja de ser el final de la columna.

### C · Capa kinética — sección `acciones:` nueva en el schema (CK-21/D6)

Contrato + catálogo como DATO (no prosa). Meta-schema de acción:

```yaml
acciones:
  niveles: [gobernanza, estrategico, tactico, operativo]      # N13 — auth-niveles los gobierna
  aprobacion: [directa, revision-dueño, gestion-cambios]      # BL-24 = motor que ejecuta
  catalogo:
    - id: registrar-medicion-kpi        # verbo-objeto, operación de negocio (RN-10)
      entidad: kpi
      nivel_min: operativo
      aprobacion: directa
      efecto: "agrega una medición con provenance al KPI"
      validaciones: [fuente-y-conf-presentes]
    - id: aprobar-proyecto
      entidad: proyecto
      nivel_min: estrategico
      aprobacion: gestion-cambios
      efecto: "estado propuesto → aprobado"
      validaciones: [caso-negocio-completo, origen-brecha-resuelve]
    # …seed: abrir-proyecto · cerrar-proyecto · cerrar-brecha · aprobar-version-objetivo ·
    #        publicar-mapa-proceso · corregir-verbo-actividad (auditado)
```

Gate valida: `entidad` existe en `nodos:` · `nivel_min ∈ niveles` · id no es "set-campo" · ≤ ~10
acciones por entidad (detección Action Sprawl). v2 DECLARA el contrato; ejecutarlo es de
`modulo-gestion-cambios-iso` y gobernarlo de `auth-niveles-acceso-policy-as-data` (sin duplicar).

### D · Vocabulario de verbos — SSoT nuevo `sistema/schema/verbos.yaml`

- Por verbo: `verbo` (canónico es-419) · `clase_alm {rutina: rutinaria|no-rutinaria, tipo:
  manual|cognitiva-analitica|interpersonal}` · `capacidad_mgi: enum [recolectar-datos,
  procesar-datos, fisico-predecible, fisico-impredecible, interfaz-stakeholder,
  experticia-decision, gestion-personas]` · `sinonimos[]`.
- `actividad.verbo` valida contra él (Bif-4); gobernanza = RN-11; seed ~30 verbos destilados del
  shell prenter + la M-card taxonomía de verbos (refichado WS5).
- Los DOS scores (RPA · agente) y el veredicto del triage (`eliminable · automatizable-RPA ·
  automatizable-agente · aumentable · humano-por-diseño`) se DERIVAN — el schema solo guarda los
  INPUTS declarados (ver E) y, opcionalmente, el veredicto RATIFICADO con provenance (duda D-3).

### E · Ajustes a entidades existentes (insumos 3-8 — expand-contract, D-06)

| Entidad | Cambio v2 |
|---|---|
| `objetivo` | `horizonte: enum [proposito, 3a, anual, trimestre]` · `cadencia_revision` · `estado {vigente|deprecado, superseded_by?, vigencia?}` · `perspectiva?` (BSC — habilita strategy-map como proyección) · `key_results` pasa a `requerido: false` (RN-4′) |
| `key_result` | `from/to/current` → numéricos (`unit` aparte); coerción con warning para instancias v1 |
| `actividad` | `fuente`+`conf` o `evidencia_ref` (hoy viola el principio cardinal del propio schema) · `flujos_alternos: list {cuando, secuencia[ref local]}` (portado de PROCESS-AS-DATA; `orden` lineal no narra "si X entonces Y") · `tiempos {toque, espera}` (VSM; `tiempo` v1 queda deprecado) · `mandato?: enum [regulatorio, preventivo, habilitante]` (protege compliance del triage) · `automatizacion? {volumen, excepciones_pct, datos: estructurados|no-estructurados|mixtos, reglas: estables|cambiantes, criterio_promptable, tolerancia_revision, riesgo_error}` (inputs de los scores) · `tlx? {puntaje_rtlx, fecha, fuente}` (solo pre-flageadas — jamás censal; agrega por rol/proceso, CK-24) · `alimenta_kpi_refs: list {kpi_ref, peso?}` (atribución actividad→KPI N:M vía rol) |
| `persona` | `reporta_a` → `list {ref, tipo: jerarquico|funcional}` (matricial; forma v1 = ref simple se lee como `jerarquico` con warning) · `vinculo: enum [empleado, contratista, tercero]` + `tercero_ref?` (BPO) · `sin_kpi? {razon}` (ausencia honesta) |
| `proceso` | `provisto_por? {nombre, tipo: bpo|outsourcing|proveedor, contrato_ref?}` (ISO 9001 cl.8.4 — hoy ausente de todo `met:`) · `riesgos[]` tipado `{desc, prob: enum, impacto: enum, mitigacion?}` (cl.6.1; hoy strings libres) · `kpis` embebido queda **DEPRECADO** (warning; migra a entidad `kpi` con `proceso_ref` — duda D-2) |
| `empresa` | `unidades[]` weak-entity `empresa#uN {nombre, tipo: proyecto|obra|sucursal|franquicia, entidad_legal_ref?}` + `entidades_legales[]` weak `{razon_social, tax_id}` (D-07: unidad de ejecución + SPV como atributo) |
| `brecha` | `estado` se formaliza a enum `[accionable, a-corroborar, off-thread, sin-ancla-de-valor]` (insumo 3) |
| enums | `fuente` + **`Observado`** (drift método↔schema: M1 lo promete, el enum no lo tiene) |
| housekeeping | ref muerta `process.schema` (línea 49) → re-anclada al frontmatter de `proceso/**` · candidatura Bloom en `actividad.verbo` → reemplazada por el vocabulario propio |

### F · Relaciones nuevas (sección `relaciones:` — el hilo completo)

| de | a | tipo | dueño (owning side) |
|---|---|---|---|
| kpi | proceso | association | `kpi.proceso_ref` |
| kpi | rol\|area | assignment | `kpi.dueño_ref` |
| kpi | key_result | influence | `kpi.contribuye_a` |
| kpi | kpi | association (tensión) | `kpi.en_tension_con` (lado min-id) |
| actividad | kpi | influence | `actividad.alimenta_kpi_refs` |
| proyecto | brecha | association (origen) | `proyecto.origen_brecha_refs` |
| proyecto | kpi\|key_result | influence (compromiso) | `proyecto.mueve_refs` |
| medicion | empresa#uN | association (corte) | `medicion.unidad_ref` |

Invariantes v2 (además de las v1): RN-8 · toda ref nueva resuelve · `rollup` declarado si el KPI
tiene hijos/ponderación · `proyecto.estado ∈ enum` · acciones válidas contra el meta-schema ·
persona jamás en arista de medición.

### G · Extensión por cliente (insumo 9 — open/closed)

Propuesta (duda D-1): mecanismo MÍNIMO ahora — bloque `ext:` permitido en toda entidad, el
validador lo **ignora-y-preserva** (forma libre, sin validación semántica); política de validación
de extensiones = V2. Barato hoy, cumple la promesa open/closed sin construir maquinaria.

## Tabla de trazabilidad — registro heredado (AC-6)

| # | Insumo (refichado § Insumos cementados) | Resolución en esta spec |
|---|---|---|
| 1 | KPI = entidad (id, dueño, lead/lag, KPI/DPI/KRI, frecuencia, declarado vs observado + divergente) | § A — completo |
| 2 | `kpi.contribuye_a → key_result` N:M + atribución actividad→KPI vía rol | § A + § E actividad |
| 3 | `objetivo`: horizonte/cadencia/estado/perspectiva · KRs opcionales · gap `sin-ancla-de-valor` | § E objetivo + brecha |
| 4 | `actividad`: provenance · flujos_alternos · {toque,espera} · mandato · inputs score · TLX opcional | § E actividad |
| 5 | Enum de verbos + sinónimos + gobernanza PR | § D |
| 6 | `persona`: reporta_a matricial · vinculo/BPO · sin_kpi honesto | § E persona |
| 7 | `proceso`: provisto_por (cl.8.4) · riesgos tipados (cl.6.1) | § E proceso |
| 8 | `fuente`+Observado · `en_tension_con` · rollup declarado · from/to/current numéricos | § E enums + § A |
| 9 | Extensión por cliente: mecanismo mínimo o V2 | § G (duda D-1) |
| 10 | Umbral acumulación de hallazgos + formulario 4 campos + vista before/after | **DESCARTADO aquí** — es mecánica del MOTOR (m2/ingesta + Gestión de Cambios BL-24), no forma del schema; se re-hereda a esas historias |
| 11 | `unidad_ref` en la medición + `entidad_legal_ref` (D-07) | § A mediciones + § E empresa |

## § Pantallas

N/A — service-story sin superficie UI nueva (las lentes del cockpit consumen `/api/objeto` sin
cambio de contrato para lo v1; pintar KPI/proyecto/semáforo = `cruce-indicadores` y
`brecha-proyecto`, F1.1).

## § Dudas abiertas (RONDA 1 · Chris cierra ANTES de architect)

- [ ] **D-1 · `ext:` ahora o V2** — recomendación: mínimo ahora (ignore-and-preserve, § G).
- [ ] **D-2 · `proceso.kpis` embebido** — recomendación: deprecar-con-warning (expand-contract) y
  migrar el shell prenter en la historia del fixture; alternativa: migrar y borrar ya (breaking).
- [ ] **D-3 · Veredicto del triage** — recomendación: derivado + ratificable (`triage {veredicto,
  fuente, conf}` opcional — el agente propone, el consultor corrige, auditado); alternativa:
  100% derivado sin persistencia.
- [ ] **D-4 · Alcance Go** — recomendación: `/api/objeto` v2 EN esta historia (anti-orphan: el
  schema sin consumidor es isla); alternativa: schema-only y el Go va con el fixture.
- [ ] **D-5 · Seed de verbos** — ¿~30 verbos del corpus prenter bastan para v2, o pedimos lista
  curada del operador?

## Acceptance Criteria (Gherkin — service-story)

### SC-1 — `objeto-v2-completo` (`type: happy`)
**Covers:** Bif-1(no), AC-1, AC-2
**Given:** mini-fixture de shell con las 11 entidades y todas las aristas nuevas pobladas
**When:** `GET /api/objeto?empresa=<fixture>`
**Then:** responde las 11 entidades juntas · cero warnings · el hilo es recorrible en ambos
sentidos (actividad→KPI→KR→objetivo y de vuelta) en el dato devuelto
**playwright_required:** false
**Graders:** go test integración + live-verify runtime-logs

### SC-2 — `retrocompat-v1` (`type: edge`)
**Covers:** Bif-1(sí), AC-2, RN-4′
**Given:** el shell real `prenter` (v1, sin entidades nuevas)
**When:** `GET /api/objeto?empresa=prenter`
**Then:** valida OK · cero errores nuevos · solo warnings de deprecación esperados
(`proceso.kpis` embebido, `tiempo` v1, `reporta_a` forma simple)
**playwright_required:** false
**Graders:** go test regresión contra fixture snapshot prenter

### SC-3 — `kpi-dueño-persona` (`type: negative`)
**Covers:** Bif-2, RN-8
**Given:** un `kpi` cuyo `dueño_ref` apunta a una persona
**When:** se lee el objeto
**Then:** rechazo explícito citando CK-24 · el resto del objeto sigue validando · sin estado a medias
**playwright_required:** false
**Graders:** go test unitario del validador

### SC-4 — `refs-colgantes-hilo` (`type: negative`)
**Covers:** Bif-3
**Given:** `contribuye_a`, `alimenta_kpi_refs`, `origen_brecha_refs`, `mueve_refs` y `unidad_ref`
con refs inexistentes (un caso cada una)
**When:** se lee el objeto
**Then:** un warning por ref colgante, nombrando campo y ref (integridad sin índice central)
**playwright_required:** false
**Graders:** go test tabla-driven

### SC-5 — `verbos-vocabulario` (`type: negative`)
**Covers:** Bif-4, Bif-5, RN-11, AC-3
**Given:** actividad con verbo sinónimo ("chequear"→"revisar") · actividad con verbo desconocido ·
`verbos.yaml` con verbo sin `clase_alm` completa
**When:** lectura del objeto · lectura · pre-commit
**Then:** warning + sugerencia de normalización · warning "sin clasificar" · gate FALLA
**playwright_required:** false
**Graders:** go test + ejecución real del hook pre-commit (test negativo, patrón CK-17)

### SC-6 — `kinetica-malformada` (`type: negative`)
**Covers:** Bif-6, RN-10, AC-4
**Given:** acción con `entidad` inexistente · `nivel_min` fuera del enum · id `set-nombre-kpi`
**When:** pre-commit
**Then:** gate FALLA nombrando la acción y la regla violada
**playwright_required:** false
**Graders:** ejecución real del hook (test negativo)

### SC-7 — `divergencia-derivada` (`type: edge`)
**Covers:** Bif-7, RN-9
**Given:** medición con `valor_declarado: 12` y `valor_observado: {valor: 7, query_ref}`
**When:** se lee el objeto
**Then:** la medición sale marcada `divergente` en la RESPUESTA · el YAML de instancia NO se
modifica (derivado, no persistido)
**playwright_required:** false
**Graders:** go test + diff del archivo de instancia intacto

### SC-8 — `sin-ancla-de-valor` (`type: edge`)
**Covers:** Bif-8, RN-4′
**Given:** objetivo sin `key_results`
**When:** se lee el objeto
**Then:** warning `sin-ancla-de-valor` (no error) · una brecha puede tipificarse con ese estado
**playwright_required:** false
**Graders:** go test

### SC-9 — `provenance-anti-gaming` (`type: adversarial`)
**Covers:** Bif-9, RN-13
**Given:** actividad cuyo verbo fue corregido a uno "suave" sin `fuente`/`conf`/`evidencia_ref`
**When:** se lee el objeto
**Then:** warning "verbo sin provenance" (el score aguas abajo hereda `conf` baja — el gaming
queda visible, nunca silencioso)
**playwright_required:** false
**Graders:** go test

### Sub-categorías v4.1 — N/A ratificables
`race-condition` · `concurrent-users` · `network-failure` · `empty-state` · `large-dataset` ·
`accessibility` · `i18n` → `not_applicable_reason: "single-tenant · binario read-only sin auth ni
DB (cockpit-stack) · sin superficie FE nueva"`. `large-dataset` se cubre como NFR (abajo).

## § Matriz de cobertura (sembrada — dev-team la mantiene viva)

| Ítem (Mapa funcional) | Tipo | estado | Cubierto por | Verificación REAL |
|---|---|---|---|---|
| Bif-1 · shell v1 vs v2 | branch | ⬜ pendiente | SC-1, SC-2 | GET real a ambos shells + logs + respuesta completa |
| Bif-2 · dueño persona | branch | ⬜ pendiente | SC-3 | lectura real → rechazo citando CK-24 |
| Bif-3 · refs colgantes | branch | ⬜ pendiente | SC-4 | lectura real → warnings nombrados |
| Bif-4/5 · verbos | branch | ⬜ pendiente | SC-5 | lectura + hook pre-commit ejecutado de verdad |
| Bif-6 · kinética malformada | branch | ⬜ pendiente | SC-6 | hook ejecutado de verdad → FALLA |
| Bif-7 · divergencia | branch | ⬜ pendiente | SC-7 | respuesta pinta divergente + instancia intacta |
| Bif-8 · sin KRs | branch | ⬜ pendiente | SC-8 | lectura real → warning tipificado |
| Bif-9 · verbo sin provenance | branch | ⬜ pendiente | SC-9 | lectura real → warning |
| RN-8 · CK-24 | rule | ⬜ pendiente | SC-3 | — |
| RN-9 · divergencia derivada | rule | ⬜ pendiente | SC-7 | — |
| RN-10 · anti Action Sprawl | rule | ⬜ pendiente | SC-6 | — |
| RN-11 · gobernanza verbos | rule | ⬜ pendiente | SC-5 | — |
| RN-4′ · KRs opcionales | rule | ⬜ pendiente | SC-8 | — |
| AC-1..AC-7 | accept | ⬜ pendiente | SC-1..SC-9 + revisión | gates verdes + live-verify + tabla AC-6 completa |

**Huecos detectados:** ninguno · **SC huérfanos:** ninguno · **Diferido:** ninguno (se decide en G)

## Non-functional requirements

| Categoría | Requisito | Verificador |
|---|---|---|
| Latencia | `GET /api/objeto` con shell de ~500 archivos < 1s (p95, lectura fría) | go test benchmark con fixture sintético |
| Retrocompat | shell v1 válido en v1 → válido en v2 (cero errores nuevos) | SC-2 |
| Anti-drift | SSoT nuevos (verbos, acciones) gateados en pre-commit igual que arquitectura/método | SC-5, SC-6 |
| i18n | vocabulario y enums en español neutro es-419, sin voseo | revisión + lint |

## Constraints técnicos heredados

- `.claude/rules/metodologia-as-code.md` — el método es datos; editar YAML, no vistas; gate.
- `.claude/rules/cockpit-stack.md` — binario read-only, sin auth/DB; tenant-scenarios N/A.
- `sistema/schema/DECISIONES.md` — D-04 (puerto), D-06 (aditivo/proyección), D-07, D-08, D-09,
  D-12, D-15 siguen mandando; v2 no las revierte.
- TDD obligatorio: validadores nuevos nacen con test RED primero (tabla-driven, patrón go/objeto).

## Cross-module impact

- **Lee de:** — (es la SSoT).
- **Es leído por:** `go/objeto.go` (N13) hoy; downstream directo: `organizacion-ficticia-golden-fixture`
  (dep dura), `cruce-indicadores`, `brecha-proyecto`, `captura-manual-kpis`,
  `modulo-gestion-cambios-iso` (ejecuta las acciones), `auth-niveles-acceso-policy-as-data`
  (gobierna `niveles`), `metodo-como-arnes-v0` (el método produce instancias v2).
- **Eventos:** N/A (sin bus).

## Prior art applied (anti-duplication-refining)

- Scan del 00-story vigente y re-verificado: `reconciliar-objeto-schema-9-entidades` (done) —
  v2 EXTIENDE, no recrea · `persona-puesto-primera-clase` (done) — patrón entidad-de-primera-clase
  reusado para kpi/proyecto · `modulo-gestion-cambios-iso` — motor de las acciones: aquí SOLO se
  declaran (frontera explícita § C) · `cockpit/captura-manual-kpis` — consumirá `mediciones` con
  `fuente: Declarado`; el subesquema de § A es su contrato, no lo duplica · `auth-niveles` — los
  `niveles` del § C son su enum de entrada, no su policy.
- El grafo del hilo, RACI, provenance y el patrón weak-entity (`#suf`) se REUSAN del v1 — cero
  estructura paralela nueva para lo que ya existe.

## Próximo paso

`type: service-story` → skip UX → Chris cierra § Dudas abiertas + FIRMA 1 → `/architect` produce
03-arch + 04-validators + 06-tickets (`refined → ready`).

## Changelog

- v1 2026-07-17 — draft inicial del refinamiento (RONDA 1): diseño v2 completo + trazabilidad de
  los 11 insumos heredados + 5 dudas abiertas para Chris.
