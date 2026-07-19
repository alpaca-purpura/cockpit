# Tech-Debt Register — carril L3 del CIL

> **Estado:** registro vivo · **Owner:** dev-team + `/auditor` capturan · `/pm-{platform}` homologa. **Carril L3** del CIL (`continuous-improvement.md`). **Origen:** proceso v5 §5.7, 2026-06-05.
>
> Deuda de **código/infra pura** (no proceso → L1 harness-backlog · no producto/arq → L2 learnings · no cap stale → L4 auto-detect). Append-only; cada entrada CARGA el aprendizaje. Se revisa en el stop semanal `/harnesses-improvement`.

## Formato

```
| TD-N | fecha | severidad | qué (problema → causa raíz) | acción de refuerzo | estado | ref |
```
severidad: 🔴 bloquea-pronto · 🟡 fricción · 🔵 mejora · estado: reported|triaged|applied|verified|deferred.

## Registro

| ID | fecha | sev | deuda (problema → causa raíz → refuerzo) | estado | ref |
|---|---|---|---|---|---|
| TD-1 | 2026-07-18 | media | `TestParidadSchema` cubre 6/31 enums (25 maps `obj*OK` sin `igual()`) → el próximo enum nuevo puede driftear schema↔Go en silencio → convertir a loop tabla nombre→map sobre los 31 | abierta | audit B golden-fixture · go/objeto_v2_test.go |
| TD-2 | 2026-07-18 | baja | `nichos/*.yaml` sin validador (header cita `tooling/scripts/validate_schema.py` inexistente; gen_metodo no los toca) → conformidad hoy por inspección → sumar chequeo de nichos a gen_metodo o crear el script citado | abierta | audit B golden-fixture · sistema/metodo/nichos/ |
| TD-3 | 2026-07-18 | baja | `objeto.schema.yaml` inconsistente consigo mismo: relación brecha→`capability\|proceso\|objetivo` (L469) vs campo `against_ref` que agrega `sistema` (L401) → alinear la relación al campo (el campo es el contrato que valida Go) | abierta | audit B golden-fixture · sistema/schema/objeto.schema.yaml |

## Referencias

- `docs/process/continuous-improvement.md` — CIL (este = carril L3)
- `docs/process/harness-backlog.md` — L1 (proceso/tooling)
- `.claude/rules/learning-capture.md` — L2 (producto/arq)
