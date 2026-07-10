# Harness Backlog — captura sin fricción (HLP · carril L1 del CIL)

> Issue-tracker liviano del **harness** (no del producto). SSoT del ciclo `reported → triaged → ratified →
> applied → verified` (ver `harness-lifecycle.md` §2). Captura sin frenar el flujo: *"anotá al harness
> backlog: X"*. Severidad: 🔴 silent-killer · 🟡 quick-win · 🔵 decision · 🟣 wave.
> **Origen del archivo:** cableado del arnés CK-20 (2026-07-09).

| id | fecha | sev | qué (problema → causa) | acción de refuerzo | estado | ref |
|---|---|---|---|---|---|---|
| HB-C1 | 2026-07-09 | 🔵 | KIT 0.5.3 **no publica los role-skills** (`/pm · /dev-team · /auditor · /architect · /po · /po-ux · /harness-issue`) ni sus sub-agents (`auditor-*`, `builder-*`). Reglas + process-docs los nombran → el pipeline ejecutable no existe en el repo. | Operar el ciclo idea→done **a mano** (agente genérico leyendo reglas+templates). Esperar el "W8 lift-kit" upstream; al publicarse → `claude plugin update` + `/harness:bootstrap`. NO forkear (autoría propia = fork silencioso prohibido). | reported | CK-20 · README kit "role-skeletons = W8 lift-kit" |
| HB-C2 | 2026-07-09 | 🔵 | **13 reglas slim-stub** citan `docs/rules-detail/*` que el KIT no trae (project-layer / source-only). Refs colgantes al cargar detalle on-demand. | Materializar el detalle **solo cuando una regla se ejerza** y su detalle haga falta (autoría project-layer puntual, NO masiva). Hueco conocido. | reported | grep `docs/rules-detail` = 13 rules |
| HB-C3 | 2026-07-09 | 🔵 | Templates `03-arch / 04-validators / 06-tickets` citados por 3 reglas **no vienen en el KIT** (solo 00-story/01-spec/00-research/00-chris-input/story-ui). | Materializar al primer refinamiento que llegue a `/architect` (fase ready). Por ahora: hueco documentado. | reported | grep `docs/specs/templates` = 3 rules |
| HB-C4 | 2026-07-09 | 🔵 | Registry del plugin lista **entradas duplicadas** de `harness@prenter-marketplace` (0.5.2 ×2 + 0.5.3). Activa = 0.5.3; las 0.5.2 son stale. | Limpiar las 0.5.2 cuando toque mantenimiento de tooling. Cosmético, no bloquea. | reported | `claude plugin list` |
| HB-C5 | 2026-07-09 | 🔵 | Muchos `docs/process/*` citados por reglas (`capability-protocol · lifecycle · parallel-sessions-protocol · promotion-protocol/ · audits/` + ADRs) **no están en el KIT** (subset extractable). | Doctrina del producto-origen no extraída. Materializar/escribir project-layer solo si el ciclo lo pide. | reported | subset KIT 0.5.3 |
