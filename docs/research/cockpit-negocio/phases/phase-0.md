# Fase 0 — Baseline: commit + repos

**Meta:** dejar todos los repos con estado git limpio y commiteado; crear y pushear a GitHub `chris-corp` y `prenter`. Es mecánica y de bajo riesgo, pero hay mucho trabajo sin commitear — se hace con cuidado y verificando gates ANTES de cada commit.

## Pre-requisitos
- Leer `STATE.md` (qué está sin commitear por repo + toolchain + gates).
- `gh` autenticado como `alpacapurpura` (confirmado). go en `~/.local/go/bin`.

## Tareas (en orden)

### 0.1 — Verificar gates antes de tocar git
```bash
export PATH="$HOME/.local/go/bin:$PATH"
cd ~/Proyectos/alpaca-harness && python3 tooling/scripts/gen_all.py --check
cd ~/Proyectos/alpaca-harness/products/cockpit-ui && npx vitest run && npx tsc --noEmit
cd ~/Proyectos/chris-corp && python3 harnesses/scripts/gen_cockpit_registry.py --check
```
Si algo falla, NO commitear — arreglar primero.

### 0.2 — Commitear alpaca-harness (main)
Revisar `git status`/`git diff`. Commit del Cockpit I-36 (Increments 1-3) + ficha I-36. Mensaje sugerido:
`feat(cockpit): vista de directorio I-36 — selector 2-niveles, /api/portfolio, /directorio rollup`
Ojo: el binario `products/cockpit-go/cockpit` y `products/cockpit-go/ui/` ¿se versionan? Revisar `.gitignore` del repo; si el binario estaba trackeado antes, commitear; si no, dejar como estaba (no forzar).

### 0.3 — Commitear luana-platform (main)
Fix del binario. Mensaje: `fix(cockpit): ruta del binario alpaca → products/cockpit-go (post-realineo)`.
Nota en el commit: las ramas `wip/*` necesitan el mismo fix (pendiente, no en esta fase).

### 0.4 — Commitear PeruSaaS (main)
Mensaje: `docs(odoo): seam de integración al Odoo del holding + reconciliación pendiente`.

### 0.5 — chris-corp → commit + GitHub + push
```bash
cd ~/Proyectos/chris-corp
# revisar que el gate pasa y el doctor está verde
git add -A
git commit -m "feat: scaffold capa dueño (holding) — finanzas/Odoo, portfolio/registry, legal, harnesses"
gh repo create alpacapurpura/chris-corp --private --source=. --remote=origin --push
```
Verificar que pushó (`git remote -v`, `gh repo view`).

### 0.6 — Crear `prenter` (carpeta + repo + scaffold base + GitHub)
Decisión del operador: Prenter es una empresa; `alpaca-harness` es un **sistema** suyo; su cockpit debe ver la evolución de alpaca-harness.
- Scaffold con el installer: `~/Proyectos/alpaca-harness/products/installer/new-project.sh ~/Proyectos/prenter` (sin `--starter` o el que aplique; Prenter-empresa no es un solo producto). Luego adaptar a la convención de dominios como hizo chris-corp/PeruSaaS (revisar esos como molde).
- CLAUDE.md kernel: Prenter = empresa (línea de desarrollo + outsourcing + producto). Sus **sistemas**: alpaca-harness (la fábrica/cockpit+kit), y los que vengan. La instrumentación cockpit (que prenter "vea" alpaca-harness) **NO se resuelve acá** — es Fase 3 (requiere decidir cómo un workspace referencia un repo externo como sistema). En Fase 0 solo: carpeta, repo, scaffold base, CLAUDE, push.
```bash
git -C ~/Proyectos/prenter init && git -C ~/Proyectos/prenter add -A
git -C ~/Proyectos/prenter commit -m "feat: scaffold inicial Prenter (empresa)"
cd ~/Proyectos/prenter && gh repo create alpacapurpura/prenter --private --source=. --remote=origin --push
```

### 0.7 — Registrar prenter en el portfolio
En `chris-corp/portfolio/registry.yaml`: actualizar la entrada `prenter` para que su `repo` apunte a `~/Proyectos/prenter` (hoy apunta a alpaca-harness). Decidir: ¿el `cockpit.path` de prenter es su propio repo, y alpaca-harness pasa a ser un SISTEMA de prenter? (Probablemente sí — pero la instrumentación real es Fase 3.) Regenerar `~/.cockpit/cockpit.yaml`, gate verde. Commitear chris-corp.

## Criterios de salida
- [ ] Los 3 repos existentes commiteados, gates verdes, `git status` limpio.
- [ ] `chris-corp` y `prenter` en GitHub (alpacapurpura), pusheados.
- [ ] registry regenerado y consistente.
- [ ] `STATE.md` actualizado, `JOURNAL.md` con aprendizajes, `MASTER-PLAN.md` Fase 0 = ✅.
- [ ] `NEXT-PROMPT.md` reescrito con el prompt de **Fase 1**, entregado al operador.

## Decisiones a confirmar con el operador en la sesión
- ¿`prenter` lleva algún `--starter`? (recomendación: ninguno; es una empresa multi-sistema, no un solo producto).
- ¿`alpaca-harness` se re-mapea como sistema de prenter ya en el registry (sin instrumentar aún), o se deja para Fase 3?
