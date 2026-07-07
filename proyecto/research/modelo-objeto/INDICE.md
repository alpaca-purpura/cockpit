# Índice de Macropasos

> **Se revisa al inicio de cada sesión.** Para cada paso pregúntate: ¿sigue siendo necesario?
> ¿cambió de alcance? Estados: `pendiente · en-curso · clavado · descartado`.
> Última revisión: **2026-06-29** (S2).

## M0 · Infra de plan multi-sesión — `en-curso`
Carpeta-plan + archivos sembrados. (Esta sesión.)

## M1 · Modelar el OBJETO (la entrevista) — `en-curso`
Clavar el modelo de datos de instancia. Sub-temas:
- [x] **Sistema** — eje `rol` (soporte|producto) + `audiencia` (interno|cliente-final) → `clavado` (D-02)
- [x] **Dato normalizado + puerto** — un-archivo-por-entidad, DB-shaped → `clavado` (D-03, D-04)
- [x] **Organización** — cadena persona→rol→funciones→proceso → `clavado` (D-05)
- [x] **Molde de proceso** — tortuga ISO 9001 cl.4.4 + actividades INLINE (composición) → `clavado` (D-08)
- [x] **Manual** — colapsa: NO es entidad, es la pata "cómo" del proceso → `clavado` (D-08, Pregunta 2)
- [x] **Wiring proceso→org** — = `rol`; `función` se DISUELVE → `clavado` (D-09)
- [x] **Glosario/nomenclatura** — lenguaje ubicuo anclado a norma (`GLOSARIO.md` v0, **vivo**) → `clavado` (base)
- [x] **Colisión `sistema.rol`** — RESUELTA: disuelve → App Component + bloque `producto` opt-in → `clavado` (D-10)
- [x] **Investigación 4-subagentes** (TOGAF · ISO/APQC · DDD · auditoría interna) → `clavado` → `ESTRUCTURA-INICIAL.md`
- [x] **Estructura inicial + forks A–G** — confirmados (incl. E `audiencia`→`sirve_a`) → `clavado` (D-11)
- [x] **MATERIALIZACIÓN v1** — `.claude/harness/schema/objeto.schema.yaml` (8 entidades · met por campo · Hilo · validado) → `clavado` (D-11)
- [x] **Molde `sistema`** — en el schema (App Component + `producto` opt-in) → `clavado`
- [x] **Personas/roles** — `persona.roles[]` N:M en el schema → `clavado`
- [x] **`area`** — entidad Org Unit (D-12), N:M con proceso (`proceso.areas_ref`), revierte §1 → `clavado`. **Modelo 8→9.**
- [x] **`negocio.yaml` = GENERADO** (D-13) — proyección, no poblado; población M1 → entidades → `clavado`

## M1 · ESTADO — **modelo clavado + materializado v1 · 9 entidades.** Elegido: **dogfood (M4) primero** → guía → ledger → cablear proyección (M5).
- [ ] **Objetivos / brechas** — confirmar normalización a archivo-por-entidad → `pendiente`
- [ ] **Empresa-root mínimo** — qué es "lo mínimo indispensable" → `pendiente`
- [ ] **Base mínima incremental** — piso útil día-1 en el cockpit → `pendiente`

## M2 · Separación CLASE/OBJETO + versionado — `pendiente`
El seam para prenter-harness; `data_version` por entidad + migración (expand-contract); la cerca in-repo.

## M3 · Holding / corporativo (selector) — `pendiente` (afirmado, falta clavar)
chris-corp = solo selector, sin objetivos propios. Confirmar: de-dup de compartidos muere; chris-corp-only.

## M4 · Dogfood: prenter-harness = Proyecto #0 — `en-curso` (ELEGIDO siguiente · conversación nueva)
**Plano-proyecto** (NO shell-empresa) propiedad de la cuenta `prenter` (sibling) por slug `cuenta_ref` (D-01/I-39).
Rebanada vertical del Hilo (9 cajas) ejercitando `producto{}`. Ubicación `empresa/data/<tipo>/<id>.yaml`. Ver `NEXT-PROMPT.md` (Pregunta 7).

## M5 · Build v1 — esquemas L0 + refactor del cockpit — `pendiente`
Materializar el modelo. El cockpit lee el dato por el **puerto** (deja de leer archivos directo).

## M6 · Visión estratégica macro→micro — `pendiente`
Capa de navegación: norte → cadenas de valor → capabilities → stories. Telescopio + microscopio.
