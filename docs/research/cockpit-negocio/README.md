# Campaña · Cockpit como herramienta de negocio

Carpeta de trabajo **temporal** (no es un repo de producto; bórrala al cerrar la campaña). Permite ejecutar un plan grande en **varias conversaciones** sin context rot: cada fase se planifica acá, se ejecuta en una sesión nueva, y deja su aprendizaje antes de pasar a la siguiente.

## Objetivo de la campaña
Evolucionar el Cockpit de **visor de desarrollo (SDD)** a **herramienta de negocio**: que mapee todas las empresas del operador, todos sus sistemas (incluidos los que NO son proyectos de software, como Odoo), y eventualmente procesos · objetivos · gaps de digitalización. Disparada por un pedido concreto (perusaas/prenter y Odoo en el desplegable) que destapó la evolución del producto.

## Cómo se usa (protocolo de cada sesión)
1. **Leer** (en orden): `STATE.md` (realidad actual) → `MASTER-PLAN.md` (mapa de fases) → `phases/phase-N.md` (la fase a ejecutar) → `JOURNAL.md` (aprendizajes acumulados).
2. **Planear fino** la fase si el doc de fase está en borrador (confirmar con el operador antes de tocar código, regla de la casa).
3. **Ejecutar** la fase. Verificar (gates verdes, tests, smoke).
4. **Cerrar:** apuntar aprendizajes en `JOURNAL.md`, actualizar `STATE.md` (qué quedó hecho/commiteado), marcar la fase ✅ en `MASTER-PLAN.md`, y **escribir el prompt de arranque de la fase siguiente** en `NEXT-PROMPT.md` + entregárselo al operador.

## Estado de la campaña
- Fases ✅: 0 (repos), 1 (selector=portfolio, I-40), 2 (sistemas no-dev + overview, I-41), 3 (workspace externo cross-repo + rename brand→sistema, I-42/43), 4 (vista "Evolución" / lente Ledger para sistemas no-SDD, I-45). **Siguiente: Fase 5** (Vista de Negocio empresa-level — el titular: objetivos·procesos·gaps + semáforo, modelo Prospera) — o los carve-outs 3b (Odoo) / 3c (rename del kit). Prompt en `NEXT-PROMPT.md`.
- Decisiones del operador ya tomadas: ver `MASTER-PLAN.md §Decisiones`.

## Regla de oro
Una conversación = una fase. No arrastrar la ejecución de varias fases en un solo contexto. El operador aprueba paso a paso.
