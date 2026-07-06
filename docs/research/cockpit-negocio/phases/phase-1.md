# Fase 1 — Selector = portfolio completo

**Meta:** el desplegable de **Empresa** lista TODAS las empresas (incl. perusaas, prenter), cada una con sus sistemas **navegables** en el desplegable de Sistema. (Odoo/no-navegables = Fase 2.)

> Borrador — planificar fino al arrancar. Confirmar con el operador antes de codear.

## Diagnóstico de origen (actualizado tras Fase 0)
- El **modelo ya está unificado** (`a39c429`): `/api/portfolio` devuelve TODAS las empresas (con `active`) + sus `sistemas[]` (cada uno `{procedencia, navegable, key}`; gaps incluidos). `/directorio` ya lo pinta. **Falta solo el SELECTOR.**
- El selector (BrandSwitcher + BrandProvider) aún se alimenta de **`/api/brands`** = solo activo+navegable → no muestra perusaas/prenter (inactivas) ni gaps. **Ese es el desacople a cerrar.**

## ⚠ Corrección de supuesto (Fase 0 lo cambió)
- **prenter ya NO tiene brand navegable.** En Fase 0 su `repo`/`cockpit.path` se re-mapeó a `~/Proyectos/prenter` (shell de empresa, SIN workspace cockpit-legible). Sus sistemas son **gaps** (`alpaca-harness`, `odoo`). Aparecerá en el selector de Empresa pero su desplegable de Sistema **no tendrá navegables** hasta Fase 3. → El selector debe tolerar "empresa sin sistema navegable" (no asumir ≥1).
- **perusaas:** verificar al arrancar si su repo tiene brand descubrible; puede estar en el mismo caso (solo gaps).

## Enfoque candidato
- Unificar: que el selector consuma `/api/portfolio` (fuente única) en vez de `/api/brands` → empresas completas; los sistemas `navegable:true` son seleccionables/clicables, los gaps se muestran no-navegables (la representación visual del gap en el SELECTOR puede diferir de `/directorio`).
- Decidir el rol de `active`: ¿el selector lista todas y `active` solo afecta estilo (badge "sin cockpit"), o se sigue filtrando? (Alinear con `/directorio`, que ya muestra inactivas.)
- Mantener `EmpresaDependencias` (badge) y `/directorio` consistentes con la nueva fuente.

## Riesgos / cuidar
- No romper **single-mode** (cliente BYOC, empresa "") ni el modo per-brand de luana.
- El **binario embebido puede estar stale** — rebuild UI+binario antes del smoke (ver STATE.md) para ver el modelo nuevo + prenter re-mapeado.
- Gap navegable=false: que el click no rompa; que la empresa sin navegables no deje el selector en estado inválido.

## Criterios de salida
- [ ] perusaas y prenter **aparecen** y son seleccionables como Empresa; sus sistemas navegables (si los hay) se ven y son clicables; los gaps se muestran sin romper.
- [ ] single-mode intacto; vitest/tsc/go test verdes; **smoke + screenshot** de `:4000` con el selector mostrando todas las empresas.
- [ ] Journal + State + NEXT-PROMPT (Fase 2).
