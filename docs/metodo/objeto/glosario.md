# Glosario / Nomenclatura — el lenguaje ubicuo del modelo-objeto

> **Propósito:** un solo nombre por concepto, **anclado a la norma** (no la norma a nuestro nombre). Mata las
> colisiones (rol/función, manual/digital, actividad/tarea). **SSoT del vocabulario** del modelo de instancia.
> **Práctica:** DDD *Ubiquitous Language* (M08). **Autoridades de término:** ISO 9000:2015 (vocabulario) ·
> ArchiMate/TOGAF (M13, metamodelo) · BPMN (M11) · APQC PCF (M12) · ISO 9001:2015 (M16) · RACI (M25).
> **Estado:** v0 (journal). Gradúa a `GLOSARIO.md` repo-root (referenciado por el kernel `CLAUDE.md`) al materializar.

## Regla de oro
Si un término nuestro choca con la norma → **gana la norma**, renombramos. Si dos conceptos comparten nombre
→ **desambiguamos o renombramos**. **Cero homónimos** en el modelo.

## Entidades (los "sustantivos" — cajas del modelo)

| Nuestro término | Norma / fuente | Qué es | NO confundir con | Ejemplo (Vértice) |
|---|---|---|---|---|
| **empresa** | ISO 9001 cl.4 (organización) | la organización; identidad-ancla (`empresa.yaml`) | un `sistema` | Inmobiliaria Vértice |
| **persona** | ArchiMate **Business Actor** | individuo concreto; *cumple* un rol | `rol` (concreto vs abstracto) | Mateo Salas |
| **rol** | ArchiMate **Business Role** · ISO cl.5.3 · BPMN lane · RACI | conjunto **estable** de responsabilidades; *realiza* procesos | `persona`; `función`; `sistema.rol`(⚠) | analista de cobranza |
| **area** | ArchiMate **Business Actor** (organizational) · TOGAF **Org Unit** (D-12) | unidad organizativa / departamento; *empresa anidada*; la encabeza un `rol` (`lider_ref`). **N:M** con proceso (`proceso.areas_ref` — transversal) | `capability` (org-box vs qué-sabe-hacer); `rol` (unidad vs cargo) | Finanzas; Comercial |
| **proceso** | ArchiMate **Business Process** · ISO cl.4.4 · APQC **L3** | secuencia de actividades que produce valor (la "tortuga") | `capability` (cómo vs qué) | cobranza |
| **actividad** | APQC **L4** · BPMN Task | paso clave dentro de un proceso (inline, id estable) | `tarea` (L5, más fina) | "llamar al deudor" |
| **tarea** | APQC **L5** | unidad de trabajo dentro de una actividad (profundidad opcional — **diferida**: hoy el schema materializa hasta L4) | `actividad`; `paso` (namespace del método) | "marcar el teléfono" |
| **sistema** | ArchiMate **Application Component** (+ aspecto **Product** opt-in) · ISO "recursos" | app/herramienta; pata "con qué". Soporte = App Component (siempre); si es oferta → lleva bloque `producto` (Product) | `proceso` | Odoo (App Comp) · Vitalia (App Comp + Product) |
| **objetivo** | ISO 9001 cl.6.2 · OKR (M21) | resultado deseado; KR `from→to` | `brecha` | días de cobro 45→30 |
| **brecha (gap)** | Capability heatmap (M31) · COBIT madurez (M15) | distancia AS-IS ↔ objetivo | `objetivo` | "sin recordatorio automático" |
| **capability** | **Business Capability** (M31) · ArchiMate **Business Function** (sentido competencia) | **QUÉ** hace la empresa (estable, no el cómo) | `proceso` (qué vs cómo) | "Gestión de cobranzas" |

## Conceptos DISUELTOS (nómbralos, pero NO son cajas)

| Término | Por qué NO es entidad | Dónde vive de verdad |
|---|---|---|
| **función** | coloquial de "lo que hace un rol" = sus asignaciones a procesos/actividades (RACI, **derivado**). Guardarla = duplicar la asignación (anomalía 3NF). | derivado del wiring `actividad.carril = rol`; competencia-grupo → `capability` |
| **manual** | el "cómo" es la pata *método* de la tortuga (ISO/ArchiMate procedure); APQC no tiene nivel "manual" | `desc` de cada `actividad` + `criterios_control` del proceso. El PDF del cliente = **fuente** (provenance) |

## Namespace vecino — el método del consultor (desambiguación)

| Término | Namespace | Qué es | NO confundir con |
|---|---|---|---|
| **paso** | Definición del engagement (`sistema/metodo/proceso/**`) | unidad del MÉTODO del consultor — cómo trabajamos NOSOTROS el engagement (`<paso>.md` bajo módulo/etapa) | `actividad` (APQC L4) y `tarea` (L5): unidades del proceso del CLIENTE en el `objeto` |

Regla de cero homónimos aplicada: "paso" NUNCA nombra una unidad del proceso del cliente — ahí se dice
`actividad`/`tarea`; y una unidad del método del consultor NUNCA se llama `actividad` — ahí se dice `paso`.

## Wiring proceso↔gente

| Nuestro término | Norma | = qué entidad |
|---|---|---|
| **dueño / process owner** | ISO 9001 (process owner) · RACI **Accountable** | un `rol` |
| **carril / swimlane** | BPMN **Lane** | un `rol` (el que ejecuta) |

Cadena (ArchiMate, literal): **`persona` →(cumple)→ `rol` →(realiza)→ `proceso`/`actividad`.**

## Atributos / ejes (los "adjetivos" — viven EN una entidad, no son cajas)

| Atributo | Vive en | Valores | Significado |
|---|---|---|---|
| **procedencia** | `sistema` | propio · compartido · externo · terciarizado | ownership |
| **audiencia** | `sistema` | interno · cliente-final | a quién sirve |
| **digital** | link `proceso→sistema` | manual · externo · integrado | nivel de digitalización |

> El antiguo eje `sistema.rol: soporte|producto` **ya no existe** (D-10): todo `sistema` es **Application
> Component** (lente soporte); si es oferta lleva un bloque **`producto`** opt-in (aspecto **Product**).

## ⚠ Colisiones abiertas
- **`capability`**: ISO 9000 3.6.12 (conformidad-de-output de un objeto) vs TOGAF (lo-que-la-org-puede-hacer).
  → usamos **sentido TOGAF** para la entidad de negocio; anotado. Además: capability-de-negocio ≠
  capability-de-producto (ledger) — distintas, enlazadas por `realizes`.

## Colisiones resueltas
- **`audiencia`** chocaba: negocio (`interno|cliente-final`, D-02) vs product-paradigm (`interna=copilot |
  externa=sales_agent`). **RESUELTO (D-11, fork E):** el de negocio se renombra a **`sirve_a`**; el de
  producto conserva su sentido. (Materializado en `objeto.schema.yaml` enum `sirve_a`.)
- **`rol`** chocaba: (1) **Business Role** (persona, D-09) vs (2) el eje `soporte|producto` del `sistema`
  (D-02). **RESUELTO (D-10):** el campo del sistema **se disuelve** — `sistema` = **Application Component**
  siempre (lente soporte) **+** bloque `producto` opt-in (aspecto **Product**). Sin renombre, **sin invento**
  (la norma nombra los conceptos, no un campo). `rol` queda solo para Business Role.

## Sellados aparte (no redefinir aquí)
- **harness / harnesses** — ver kernel `CLAUDE.md` (sellado 2026-06-25).
