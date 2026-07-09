# Prompt maestro — continuar los pendientes (post-campaña)

> ⚠ **CONGELADO — PRE-CK-18.** Los pendientes de abajo son de la época del monorepo `prenter-harness`;
> el tracking vigente es `../../backlog.yaml`. No leer como trabajo activo.

> 🎉 La campaña Cockpit→Negocio está CERRADA (Fase 5 completa) y la Limpieza de fábrica también.
> Lo que sigue son **pendientes sueltos repartidos en VARIOS repos**. Regla dura: **una conversación = un dominio/cwd** (abrir Claude en otro cwd rompe el aislamiento). Por eso este prompt **orienta y deja elegir**; arrancá UNO por conversación, en su cwd.
>
> Abrí una conversación nueva, `cd` al repo del pendiente que elijas, y pegá el bloque de abajo.

---

## ▶ ACTIVO — Fase 5c · seed `negocio.yaml` de Vitalia (orientado 2026-06-29 desde chris-corp home base)

> El operador eligió arrancar por **Diagnóstico de negocio (5c)**, empresa **Vitalia** primero.
> Plan fino + prompt paste-ready: **`phases/phase-5c.md`** (cwd de ejecución = `~/Proyectos/vitalia`).
> Hallazgo: los inputs M1 de Vitalia son stubs `FILL` → el seed arranca en bifurcación (M1 real vs
> seed-hipótesis `conf:baja`, como prenter). El esquema del `negocio.yaml` + gates I-49 están aterrizados ahí.
> Luego: replicar a comunify/nicolify/PeruSaaS (cada uno su micro-ciclo en su cwd).

---

## ✅ C-resto-(b) CERRADO (2026-06-28 · luana main `ab32aa01`, pusheado)

> Prosa stale del launcher reconciliada con la realidad post-I-48. Decisión del operador: full reconcile §Cockpit + folding de TODA la deuda adyacente (alpaca→prenter · `COCKPIT_BIN` · rename `cockpit-alpaca-boundary.md`→`cockpit-boundary.md`). 9 archivos en main, grounded contra la interfaz real de chris-corp. Sync completo: main→origin + wip/{vitalia,comunify,nicolify} (legacy intacto). Detalle en `STATE.md § C` + trampas en `JOURNAL.md`.
> **Residual ✅ cerrado (main `3143f843`):** `harness-architecture-guide.md §8` reescrito (cockpit = Prenter multi-:4000 desde chris-corp) + `ADR-003` sellado SUPERSEDED (histórico conservado).

---

## ✅ D CERRADO — `crear-pieza-comercial` unificada (2026-06-28 · H-04 · chris-corp `6b4da38` + prenter `d4678bb`)

> SSoT = **chris-corp** (skill de marketing del HOLDING, NO el kit que vendemos); núcleo agnóstico de empresa; overlay per-empresa por el **seam** (`marketing:` block) + `marketing/source/`; técnicas inline; `make sync-skills [ONLY=x]`. prenter reconciliado como consumidor. Detalle en `STATE.md § D` + trampas en `JOURNAL.md` + memoria [[marketing-skill-portability-debt]].
> **Lo que QUEDA (deuda de rollout, cada una su micro-ciclo, cwd = el repo de la empresa):** sincronizar + configurar el seam `marketing:` de **vitalia · comunify · nicolify · PeruSaaS** — cada una con SU PROPIO design system (⚠ jamás el de prenter) + su `bespoke_home` según su modelo de venta (comunify B2C · vitalia/nicolify micro-B2B≈directo · PeruSaaS B2B; **preguntar al operador**).
>
> _(El bloque siguiente es el prompt original que se usó — histórico, ya ejecutado.)_

```
D: unificar la skill `crear-pieza-comercial` — está copy-pasteada en 5 repos de negocio SEPARADOS y diverge. cwd = ~/Proyectos/prenter. Es una DECISIÓN DE EMPRESA: fuente única + cómo la consume cada shell de negocio, sin aplanar la voz/branding legítima de cada una. Orientame primero: confirmá cwd + HEAD (`git log -1`), RE-VERIFICÁ el estado real (la foto de abajo puede estar vieja — corré el find + diff vos mismo, no me creas a ciegas), proponé el enfoque y confirmá conmigo por AskUserQuestion ANTES de tocar nada. Háblame como CTO a su CEO (conceptual, analogía + ejemplo). Cada cambio = su micro-ciclo; si algo crece más de lo dicho, FRENÁ y re-preguntá.

QUÉ ES: `crear-pieza-comercial` genera piezas comerciales (deck / one-pager / propuesta / lead-magnet / origin-story) escribiendo `copy.md` derivado de `marketing/source/` (SSoT de palabras); render vía subagente Claude Design MCP (git = dueño del `.dc.html`, H-12; Claude Design = espejo); registra en `ledger.yaml`. El header del copy de prenter dice "Herramienta interna de la empresa Prenter (no parte del kit que vendemos)". Se copió a cada empresa y driftó.

FOTO verificada 2026-06-28 (re-corré para confirmar):
  find ~/Proyectos -maxdepth 7 -type d -iname crear-pieza-comercial
- 5 copias (1 archivo c/u = `SKILL.md`), en repos git distintos:
  - ~/Proyectos/prenter/.claude/skills/crear-pieza-comercial      ← SSoT candidato (tool interna de Prenter)
  - ~/Proyectos/vitalia/.claude/skills/crear-pieza-comercial      ← ~17 líneas drift vs prenter
  - ~/Proyectos/comunify/.claude/skills/crear-pieza-comercial     ← ~17 líneas drift
  - ~/Proyectos/nicolify/.claude/skills/crear-pieza-comercial     ← ~17 líneas drift
  - ~/Proyectos/PeruSaaS/.claude/skills/crear-pieza-comercial     ← ~257 líneas drift (MUY divergida — ¿vieja o customizada? confirmá)
  diff: `diff ~/Proyectos/prenter/.claude/skills/crear-pieza-comercial/SKILL.md ~/Proyectos/<empresa>/.claude/skills/crear-pieza-comercial/SKILL.md`
  (OJO: son ~/Proyectos/{vitalia,comunify,nicolify} STANDALONE = repos "empresa kind=own", NO los brand-folders de luana-platform.)

ANTES de decidir: cuantificá QUÉ de las 17/257 líneas es customización LEGÍTIMA (voz/branding por-empresa) vs drift ACCIDENTAL (bugfix que solo llegó a una copia, versión vieja). Eso define cuánto se unifica y cuánto se preserva como overlay.

LO QUE HAY QUE DECIDIR (AskUserQuestion · decisión de EMPRESA):
1. FUENTE ÚNICA: ¿prenter (dueño del skill + dominio marketing)? Confirmá.
2. MECANISMO de consumo de cada shell. Opciones a sopesar:
   (a) Promover al KIT (prenter-harness) → se distribuye a cada empresa vía el installer del kit (como cualquier skill compartida); lo customizable por-empresa va al SEAM, no al copy. ⚠ El skill HOY se declara "no parte del kit que vendemos" → elegir (a) CAMBIA esa premisa: ratificalo explícito.
   (b) prenter = SSoT + script de propagación (sync/symlink) a los consumidores.
   (c) shared-core (skill genérica) + overlay por-empresa (la parte voz/branding) — para no perder lo legítimamente distinto.
   Regla: lo común se unifica; lo distinto legítimo NO se aplana.

CONSTRAINTS:
- NO romper la cadena `marketing/source/` → `copy.md` → render (git dueño del `.dc.html`, H-12; Claude Design = espejo).
- Cross-repo: una conversación = un cwd (prenter). Si la ejecución toca los repos consumidores, hacelo por-empresa con cuidado o deferí cada consumidor a su propio micro-ciclo.
- Commitear por pathspec; NUNCA `git add .` / `-A` / `--no-verify`.
- Decisión no derivable del código → al registro del repo que corresponda (si promovés al kit → ledger de prenter-harness, I-NN; confirmá próximo libre con el skill `ledger`).

AL TERMINAR: actualizá ~/Proyectos/campaign-cockpit-negocio/STATE.md (D cerrado/avanzado) + JOURNAL.md (trampas) + NEXT-PROMPT.md (queda resto de E); memoria [[marketing-skill-portability-debt]] (NO existe aún — creala si la decisión lo amerita).

HEADs reales (verificá con git log -1): prenter `6634372` · prenter-harness `a826f6f` · chris-corp `6255db4` · luana `3143f843` · vitalia `4f56b18` · comunify `10e4734` · nicolify `6a68e1a` · PeruSaaS `3a74e58`.
```

---

## Prompt maestro genérico (si preferís elegir otro pendiente — D o resto de E)

Retomo pendientes sueltos tras la campaña Cockpit→Negocio + la Limpieza de fábrica. Están repartidos en varios repos; **una conversación = un dominio (cwd)**. Orientame primero: confirmá en qué cwd estoy parado, decime qué pendientes viven acá, proponé el mejor enfoque y confirmá conmigo (AskUserQuestion) ANTES de tocar código. NO ejecutes a ciegas. Cada pendiente = su micro-ciclo: investigá el código real, propené, confirmá, ejecutá chico, gates verdes, verificá en vivo si toca el cockpit, y COMMIT INDEPENDIENTE. Si algo crece más de lo dicho, FRENÁ y re-preguntá.

Háblame como CTO a su CEO (ingeniero que ya no programa): detallado, conceptual, con analogía + ejemplo. Decisión no derivable del código → al ledger (skill `ledger`; I-NN producto / H-NN fábrica). Próximo id libre: **I-53** (verificá contra §3 — la última ficha REAL es I-52; el `grep` pega I-53/I-54 en el comentario placeholder).

**PASO 0 — contexto (leé en orden, con ojo crítico; el handoff es FOTO, verificá contra `git log -1` + el código real):**
1. `~/Proyectos/campaign-cockpit-negocio/STATE.md` → sección **"PENDIENTES CONSOLIDADOS (agrupados por cwd)"** + **"🚚 Launcher movido"** + **"🧹 Limpieza de fábrica"**.
2. `~/Proyectos/campaign-cockpit-negocio/JOURNAL.md` → bloque **"Limpieza de fábrica"** (las trampas ya pagadas).
3. Memorias: `[[cockpit-business-tool-campaign]]`, `[[portfolio-holding-model]]`, `[[harness-factory-architecture]]`, `[[marketing-skill-portability-debt]]`. Ledger `prenter-harness/tooling/strategy/PRODUCT-VISION.md`: **I-48** (chris-corp home base), **I-49** (negocio.yaml blindado), **I-40** (fuente única `?sistema=`); fábrica `.claude/harness/DECISIONS.md`: **H-17**.

**LOS PENDIENTES (cada uno con su cwd — el STATE tiene el detalle):**

- **A · FÁBRICA — ✅ CERRADO (2026-06-28, ledger I-50, prenter-harness `9560154`, pusheado).** Deep-link por URL: la navegación viaja como **dos params** `?empresa=<slug>&sistema=<slug>` (no el `?sistema=` compuesto del plan original — el operador eligió dos por AskUserQuestion: URL = SSoT total, round-trips board/gap-overview/Negocio). URL gana sobre localStorage; selector reescribe con `router.replace` (sync bidireccional). Solo `lib/portfolio.ts` (helpers puros) + `SistemaProvider` (lee `window.location.search`, **no** `useSearchParams` → evita boundary `<Suspense>` en output:'export'; guard `applyingIntentRef`). Cero Go. Verificado 5/5 `:4000` por **smoke CDP headless** (ver JOURNAL: el MCP chrome-devtools cayó).

- **B · chris-corp — ✅ CERRADO (2026-06-28 · I-48 ejecutada · `978c0c3`, pusheado).** Home base: `CLAUDE.md` (§ Home base + § Cockpit — ya existía, se ACTUALIZÓ) + skill `/orientacion-portfolio` (gemelo holding de `orientar()`: registry→cockpit.yaml + `negocio.yaml` cross-repo + ledgers F/H/L + estado del cockpit). Launcher rematado por AskUserQuestion: **multi-only** (poda `cockpit-up.sh` + branch single + per-worktree + gate `COCKPIT_MULTI`), **Makefile** (`make cockpit-up/down/status/restart`), branding **Prenter Cockpit** (env `COCKPIT_BIN`). Mecánica interna → **H-03** (`harnesses/DECISIONS.md`). + de-stale alpaca→prenter del repo (sweep completo). NO consumió I-NN de fábrica → **I-51 sigue libre**.

- **C · tab "Negocio" / nav — RE-DIAGNOSTICADO (probablemente ya NO es de luana; cwd según dónde arranques el daemon).** Hallazgo verificado en el cierre de A (código, no handoff): el `nav:` allowlist en multi-mode es **GLOBAL y depende del cwd del daemon** — `handleNavConfig` lee `getWorkspaceRoot()/cockpit.config.yaml`, y en multi (`env -u WORKSPACE_ROOT`) `getWorkspaceRoot()` cae a `git rev-parse --show-toplevel` desde el cwd de arranque. Con el launcher en chris-corp: si arrancás el daemon parado en chris-corp (o en prenter-harness) → su git-root **no tiene** `cockpit.config.yaml` → `nav:null` → **set default completo → el tab Negocio YA se muestra**. El `cockpit.config.yaml` de luana solo gobierna si arrancás el daemon **desde dentro del repo luana**. → C ya NO es "editar el nav de luana". (a) **✅ CERRADO (2026-06-28, ledger I-51, prenter-harness `4ee76db`, pusheado):** el nav-allowlist multi es **per-board** — el front pasa `?sistema=<key>`, `resolveSistema` lo lleva a la raíz del repo del board (cross-repo vía `systemWorkspaces`) y lee su `cockpit.config.yaml`; transversales (Negocio/Harness) **always-on** en multi; single-mode intacto. (b) **PENDIENTE (cwd luana, bloquea main):** limpiar refs prosa stale a `make cockpit-up`/`cockpit-daemon.sh`/`cockpit-multi` en luana (`CLAUDE.md`/`docs/process/*`/`.claude/skills/pm-luana/SKILL.md`/`vitalia/CLAUDE.md`) — eso sí vive en luana.

- **D · prenter — ✅ CERRADO (2026-06-28 · H-04 · chris-corp `6b4da38` + prenter `d4678bb`).** `crear-pieza-comercial` unificada: SSoT = **chris-corp** (skill de marketing del holding, NO el kit que vendemos), núcleo agnóstico de empresa, overlay per-empresa por el **seam** (`marketing:`) + `source/`, técnicas inline, `make sync-skills`. prenter = consumidor. **Queda el rollout** a vitalia/comunify/nicolify/PeruSaaS (cada una su micro-ciclo: sync + su `marketing:` con su PROPIO design system + `bespoke_home` según su modelo de venta). Ver [[marketing-skill-portability-debt]].

- **E · Deferidos viejos:** Fase 5c (seed vitalia real) · 3b (chris-corp/Odoo developable) · ~~3c (rename kit)~~ **✅ CERRADO 2026-06-28 (ledger I-52)** — kit brand→sistema NO-breaking vía compat-shim bidireccional; kit completo (core-harness+starters dist/+installer) + 3 seams hermanos migrados (prenter/chris-corp/PeruSaaS); luana queda en `brands:` por diseño; preservado dominio (`brand_audit`)+voz; ver [[kit-consumo-versionado]] · Odoo/RUCs/seam prenter. (Cada uno su sesión.)

**ORDEN SUGERIDO (mi recomendación, confirmá):** A ✅ · B ✅ · C-resto-(a) ✅ (per-board nav, I-51) · E·Fase 3c ✅ (rename kit, I-52) · C-resto-(b) ✅ (prosa launcher + residual guía/ADR, luana main `3143f843`) · **D ✅ (crear-pieza-comercial unificada, H-04)**. Quedan: → **rollout** del skill de marketing a vitalia/comunify/nicolify/PeruSaaS (cada una su micro-ciclo, en su cwd: sync + su `marketing:` con su PROPIO design system + `bespoke_home` según su modelo de venta) → **resto de E** (vitalia `negocio.yaml` real · chris-corp Odoo developable · levantar Odoo+RUCs+ratificar PeruSaaS+seam prenter+`/harness:bootstrap`). Pero vos decidís por cuál arrancamos.

**DISCIPLINA / TOOLCHAIN:**
- `export PATH="$HOME/.local/go/bin:$PATH"` primero. pnpm NO está → UI con `next` local + **trap que restaura `app/api` ANTES del `cd` a cockpit-go** (ruta absoluta). Rebuild UI+binario + `cockpit-daemon.sh restart`.
- **Prender el multi-cockpit (post-B):** desde chris-corp `make cockpit-up` (multi-only · :4000 · `make cockpit-down/status/restart`). Delega a `harnesses/scripts/cockpit-daemon.sh` (ya NO `COCKPIT_MULTI=1 bash …`; single-mode podado). **OJO cwd:** el daemon hace `getWorkspaceRoot()=git rev-parse` desde su cwd → fija de qué repo lee `cockpit.config.yaml` `nav:` (pendiente C) y dónde crea `.cockpit/` (gitignored en chris-corp). Arrancado desde chris-corp → nav default completo (tab Negocio visible).
- **Smoke en vivo — MCP chrome-devtools O fallback CDP.** ⚠ **NUNCA mates el server MCP** (`npm exec chrome-devtools-mcp`): si está wedge, matá SOLO el árbol del browser (PID con `--user-data-dir=...<lane>`) + `rm -rf` el profile. En A maté el server por error con un `pkill` cuyo patrón se incluía a sí mismo → el MCP se desconectó de la sesión y NO vuelve. **Fallback que funcionó (cero deps, contra el binario real):** Chrome headless + DevTools Protocol por `WebSocket` global (Node ≥21) — script `scratchpad/cdp-smoke.mjs` (Target.createTarget/attachToTarget flatten → Page/Runtime; `Runtime.evaluate` para leer `location.search`/selectores/innerText). Marcadores: overview=`"sin telemetría aún"`, Negocio=`"diagnóstico de negocio"`. Selector React-compatible: native value setter + `dispatchEvent('change')`.
- Gates verdes por commit: fábrica `python3 tooling/scripts/gen_all.py --check` (corre go test) + UI `cd products/cockpit-ui && npx vitest run && npx tsc --noEmit`; chris-corp `python3 harnesses/scripts/gen_cockpit_registry.py --check`; cada shell su `check.py`.
- `ui/` embebida + binario `cockpit` gitignored; `tsconfig.tsbuildinfo` + `ledger.yaml` trackeados. gh = alpacapurpura. Cuando todo verde, **pushea** (flota en sync).

**HEADs reales al arrancar (verificá con `git log -1`):** tras D/H-04 (2026-06-28). prenter-harness `a826f6f` (kit rename+shim) · **prenter `d4678bb` (consume el skill del holding)** · **chris-corp `6b4da38` (SSoT del skill + `make sync-skills` + H-04)** · PeruSaaS `3a74e58` (seam→`sistemas:`, **skill aún sin sincronizar** — rollout pendiente) · **luana `32af60ae` (queda en `brands:` por diseño — el shim lo puentea)** · vitalia/nicolify/comunify sin cambios (**skill aún sin sincronizar** — rollout pendiente).

**AL TERMINAR cada pendiente:** actualizá `STATE.md` (HEADs + qué se cerró) + `JOURNAL.md` (trampas nuevas) + este `NEXT-PROMPT.md`. Cuando NO queden pendientes, registrá el cierre en memoria y borrá la carpeta `~/Proyectos/campaign-cockpit-negocio/` (es temporal).
