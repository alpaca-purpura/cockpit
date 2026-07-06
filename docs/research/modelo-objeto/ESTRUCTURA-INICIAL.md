# Estructura inicial del modelo-objeto — síntesis de la investigación (4 subagentes)

> **Qué es:** la mejor estructura inicial (entidades · campos · relaciones · layout) para el dato de
> instancia del negocio del cliente, confrontando **TOGAF/ArchiMate · ISO 9001/9000 · APQC/BPMN/RACI/OKR ·
> DDD/normalización · y nuestras propias metodologías+schemas**. v0 — buena, no perfecta. Forks marcados `[D?]`.
> **Fecha:** 2026-06-30. Confronta con D-01..D-10 + `GLOSARIO.md`.

## 0. El hallazgo que reordena todo (auditoría interna)

1. **Ya existe `negocio.schema.yaml`** (L0): un `empresa/negocio.yaml` por compañía, leído+validado por el
   cockpit (`handlers_negocio.go::validateNegocio`). Tiene `objetivo·area·proceso·brecha` con FK-integrity
   al leer. → **es el prototipo de esta campaña; lo extendemos, no lo reemplazamos.**
2. **Backbone sellado `O1–O7 / T1–T3`** — la taxonomía canónica de entidades (METODOLOGIA §2/§3), a la que
   cross-walkean los 31 métodos + el cerebro de nichos. **Las entidades del modelo SON estos nodos.** No
   inventar taxonomía paralela.
   `O2`=Objetivo&Valor · `O3`=Proceso · `O4`=Personas&Autoridad · `O5`=Sistema&Capabilities · `O6`=Gap&Madurez ·
   `O7`=Contrato&Código · `T1`=Dato/Grounding (provenance).
3. **El patrón "un-archivo-por-entidad detrás de un puerto, leído por el cockpit" ya existe 3 veces**
   (negocio · capability/story/release · portfolio): files=SSoT en git → handler normaliza → valida FK al
   leer → SQLite proyección desechable. **Adoptamos ese puerto, no lo inventamos.**
4. **La cadena Hilo de Oro = la relación maestra** (ya es requisito de producto, dato de primera clase):
   `OBJETIVO→KR→PROCESO→PERSONA/ÁREA→SISTEMA→CAPABILITY→GAP→HISTORIA→CÓDIGO`. Hoy `negocio.yaml` realiza 3
   aristas como FK; el **schema de aristas (`hilo_edge`) está owed** (solo existe como tabla SQLite).

**Convergencia de los 4 frentes:** las mismas **8 entidades first-class** y los mismos aggregate-roots.
ArchiMate, ISO y DDD coinciden; la auditoría interna las ancla a O1–O7 y aporta los enums ya sellados.

## 1. Las 8 entidades (anclaje triple: O-code · ArchiMate · existente)

| Entidad | O-code | ArchiMate (`tipo`) | DDD | Estado |
|---|---|---|---|---|
| **empresa** | contexto (ISO cl.4) | Business Actor / Org Unit | **root/tenant** (= la carpeta) | extiende `negocio` root |
| **persona** | O4 | Business Actor | **root** | **NET-NEW** (hoy `actor.rol` = string libre) |
| **rol** | O4 | Business Role | **root** | **NET-NEW** (el corazón de la campaña) |
| **proceso** | O3 | Business Process | **root** + `actividades` inline | extiende `negocio.proceso` (delgado→tortuga) |
| **sistema** | O5 | Application Component (+ Product opt-in) | **root** + `producto` inline | extiende portfolio `sistemaMeta` |
| **objetivo** | O2 | Goal (+ Outcome) | **root** + `key_results` inline | extiende `negocio.objetivo` (**split KR**) |
| **capability** | O5 | Capability (sentido TOGAF) | **root** (hub chico) + `assessment` | NET-NEW a nivel negocio (≠ capability-ledger de producto) |
| **brecha/gap** | O6 | Assessment | **root** | unifica `negocio.brecha` (vista) + `objeto-gap` (real) |

*(⚠ **`área` REVERTIDO por D-12:** SÍ es entidad (Org Unit / Business Actor org.), **N:M** con proceso
(`proceso.areas_ref`, transversal) — un área CON líder no es un bucket. `función` = DISUELTA, D-09.
`KR` = embebido en objetivo pero nodo lógico del Hilo.)*

## 2. Campos por entidad (set mínimo auditable + provenance)

> Regla transversal (M23 · ISO 19011): **toda** entidad AS-IS lleva `fuente` (enum sellado:
> `repo|Sistema leído|Entrevista|Declarado|Inferido`) + `conf` (`alta|media|baja`) + `derivado_de`.
> ISO 19011: "el doc no siempre refleja la práctica" → la confianza es lo que lo hace verificable.

### empresa — Business Actor / tenant root
`id · razon_social · tax_id · tamaño · sede` · `contexto{external_issues[], internal_issues[],
interested_parties[]{party,needs,relevant}}` (ISO 4.1/4.2) · `scope` (ISO 4.3, doc mantenido) ·
`rubro → nichos` (ref por slug, I-39) · provenance. **No** guarda listas de hijos (descubrimiento por scan).

### persona — Business Actor [NET-NEW]
`id · nombre · contacto{} · antiguedad` · `roles[]{ref:rol, desde, dedicacion}` (owning side de persona↔rol) ·
`competence[]{skill, evidencia}` (ISO 7.2, registro retenido) · `reporta_a:per-id` (self-ref ascendente) · provenance.

### rol — Business Role [NET-NEW]
`id · nombre · descripcion` · `responsabilidades[]` (ISO 5.3, lo no-procesal) · `autoridad/nivel_autoridad`
(RACI tier) · `competence_required[]` (ISO 7.2) · `capabilities_ref[]` · `es_stakeholder:bool` (Stakeholder =
specialization de Role). **`función` NO existe** (D-09): la "función de un rol" = sus RACI en procesos (derivado).

### proceso — Business Process [extiende, → tortuga completa D-08]
ISO 9001 **cl.4.4.1 a–h** = el set obligatorio + tortuga + APQC:
`id · nombre · clasificacion(nº APQC L3) · proposito · disparador · frecuencia/ciclo · dueño_ref:rol` ·
`entradas[](+proveedor) · salidas[](+cliente)` (4.4.1a · SIPOC) · `secuencia[]:pr-id` (4.4.1b) ·
`criterios_control + kpis[]{metrica,target}` (4.4.1c) · `sistemas_ref[]` (4.4.1d · pata "con qué") ·
`riesgos[]` (4.4.1f) · `evaluacion/mejora` (4.4.1g-h) · `realiza_capabilities[]:cap-id` · `digital`(en el link
proceso→sistema: manual|externo|integrado) · provenance(`fuente·conf`).
**EMBEBE** `actividades[]{id:pr-x#aN · orden · carril:ref-rol · tipo(BPMN: humana|sistema|reunion|decision|espera) ·
titulo · desc(="el cómo"=manual disuelto) · inputs · outputs · sistemas_ref[] · raci{R[],A(1!),C[],I[]}}`.
`negocio.proceso` (delgado) = la **proyección** del cockpit.

### sistema — Application Component (+ Product opt-in) [extiende portfolio, D-10]
`id · nombre/slug · resource_type(ISO 7.1.3 ICT/infra) · procedencia(propio|compartido|externo|terciarizado) ·
audiencia(interno|cliente-final)[⚠colisión, D?] · ref/workspace · vendor/estado` · `capabilities_ref[]` ·
`integra_con[]:sis-id` (una sola vez, lado min-id) · provenance.
**EMBEBE (opcional)** `producto{vision, roadmap[]{id:sis-x#hN,hito,estado,fecha}, contrato?, value?}` = aspecto **Product**.

### objetivo — Goal + Outcome [extiende, → split KR]
ISO **6.2.1+6.2.2**: `id · texto · descripcion · horizonte · dueño_ref:rol · tipo · consistent_with_policy` ·
planning 6.2.2{`que · recursos[] · responsable · fecha · como_evaluado`} · `parent_ref:obj-id` (Hoshin cascade).
**EMBEBE** `key_results[]{id:obj-x#krN · descripcion · metrica · baseline(from) · target(to) · unidad · current ·
quarter · driver_refs[]:pr-id|cap-id}` (OKR · el driver_refs = arista descendente del Hilo).
**Split:** 1 objetivo → N KRs (negocio hoy lo funde 1:1 — no sobrevive multi-quarter/Hoshin).

### capability — Capability (TOGAF) [NET-NEW a nivel negocio]
`id · nombre · descripcion(la habilidad, independiente de org/cómo) · categoria(APQC L1?) · parent_ref:cap-id` ·
`assessment{nivel_actual, nivel_deseado, escala(COBIT 0-5), evaluado_por, fecha}` (M15/M31). Hub chico: **no**
guarda sus referrers (inverso por scan). ⚠ **Sentido TOGAF, no ISO 9000 3.6.12** (anotar en glosario).
⚠ **≠ capability-de-producto** (ledger `types.ts`): la de-negocio (qué sabe hacer la empresa) la **realiza** la
de-producto (feature del software) — distintas, enlazadas por `realizes`.

### brecha/gap — Assessment [unifica]
La entidad real (`objeto-gap` de M1): `id · nombre · descripcion · tipo(nonconformity|target_variance|
assessment_finding) · against_ref(capability|proceso|sistema|objetivo) · nivel_as_is · nivel_to_be · delta ·
severidad(=delta×criticidad-KR) · kr_ref[](bloquea) · prioridad(WSJF M28) · costo(FinOps M22) ·
estado(accionable|a-corroborar|off-thread) · evidencia · fuente · conf`.
`negocio.brecha` (`nombre·sub·tipo·obj·costo·prio`) = la **vista** de negocio del cockpit.

## 3. Relaciones — el Hilo de Oro como modelo de aristas

```
objetivo ──KR.driver_refs──▶ proceso ──actividad.raci──▶ rol ◀──persona.roles── persona
                               │
                               ├──sistemas_ref──▶ sistema ──capabilities_ref──▶ capability
                               └──realiza_capabilities──▶ capability
brecha ──against_ref──▶ {capability | proceso | objetivo}   ·   brecha ──kr_ref──▶ KR (bloquea)
empresa ──composition──▶ {persona, rol, proceso, sistema, objetivo, capability, brecha}  (= la carpeta)
```

**Reglas de wiring (DDD):** (R2) **un hecho, un lugar** — la arista se guarda en UN extremo; el inverso se
computa por scan (nunca ambos: drift garantizado). (R3) dueño = volátil→estable, concreto→abstracto, o el lado
cuyo invariante nombra la relación. (R4) **sin archivos-join**: la N:M = lista FK embebida en el dueño. (R7) lo
derivado (referrers, rollups, **el grafo Hilo entero**) NO se guarda — es un `hilo(desde_id)` que recorre.
(R6) integridad sin índice central: el adapter arma `id→file` en memoria; un FK colgante = fallo del gate
(igual que `gen_all --check`).

## 4. Layout de archivos (una empresa · forma dogfood Proyecto #0)

```
data/
  empresa.yaml                 # tenant root / ancla de identidad (sin listas de hijos)
  personas/   per-*.yaml       # contacto inline; roles[]{ref,desde,dedicacion}
  roles/      rol-*.yaml       # responsabilidades[]; autoridad; capabilities_ref[]
  procesos/   pr-*.yaml        # tortuga + actividades[] inline (pr-x#aN) + RACI
  sistemas/   sis-*.yaml       # App Component; producto{} opt-in (roadmap pr-x#hN)
  objetivos/  obj-*.yaml       # key_results[] inline (obj-x#krN)
  capabilities/ cap-*.yaml     # hub chico; assessment{} inline
  brechas/    gap-*.yaml       # against_ref + kr_ref; sin refs a historia/código
```
Las 8 carpetas = 8 tablas relacionales 1:1 si migra a DB. La carpeta = la partición (sin columna `empresa_id`).
Embebidos → tablas-hijo (FK + `#local` = PK compuesta). Inversos → vistas SQL. Hilo → CTE recursivo, nunca materializado.

## 5. Decisiones de reconciliación (los forks a confirmar)

- **[D?] A — Anclar a O1–O7.** Las 8 entidades SON los nodos O2/O3/O4/O5/O6 (+ contexto). No taxonomía nueva. *(rec: sí)*
- **[D?] B — Split objetivo/KR.** 1 objetivo → N `key_results` (hoy `negocio` los funde). ISO 6.2 + OKR + Hoshin lo piden. *(rec: sí)*
- **[D?] C — Unificar gap.** UNA entidad `gap` (la rica de M1); `negocio.brecha` = su vista. *(rec: sí)*
- **[D?] D — Persona/Rol net-new (O4).** El corazón: hoy no existe schema; lo construimos enchufado a RACI/`actor`/`area.lider`. *(rec: sí)*
- **[D?] E — ⚠ COLISIÓN `audiencia`.** Nuestro sentido (interno|cliente-final, D-02) **choca** con el sentido
  product-paradigm ya existente (`interna=copilot | externa=sales_agent`). Viola la regla de oro del glosario.
  → renombrar uno. *(rec: el nuestro = `sirve_a`; o el de producto queda con apellido)*. **Necesita tu call.**
- **[D?] F — `sistema` sobrecargado (4 sentidos).** "sistema que corre un proceso" (O5 leaf) vs "sistema =
  producto/workspace entregable" (portfolio). Reconciliar: UN `sistema` (App Component) + aspecto Product (D-10);
  el portfolio lo referencia. *(rec: sí, una entidad)*
- **[D?] G — capability negocio vs producto.** Distintas, enlazadas por `realizes` (cierra tu Pregunta 4). *(rec: sí)*

## 6. Net-new vs extiende
- **NET-NEW:** `persona`, `rol` (la capa O4 entera) + el **schema de aristas** del Hilo (`hilo_edge`).
- **EXTIENDE:** `proceso` (delgado→tortuga), `objetivo` (split KR), `sistema` (portfolio + Product), `brecha`
  (vista→entidad rica), `empresa` (contexto ISO).
- **REUSA tal cual:** enums `procedencia·digital·fuente·conf`, el patrón puerto-archivo, los invariantes FK de `negocio.schema`.
