# Fase 5c — Seed `negocio.yaml` real de Vitalia

> **cwd de ejecución: `~/Proyectos/vitalia`** (el SHELL de la empresa, NO el worktree `luana-vitalia/vitalia`).
> Una conversación = un cwd. Este doc se escribe desde chris-corp (home base, orientación); la ejecución
> va en una sesión nueva parada en el shell de Vitalia.

## Qué es
Llenar `~/Proyectos/vitalia/empresa/negocio.yaml` (hoy NO existe → cockpit muestra `negocio:null`,
empty-state honesto). Es la **Vista de Negocio** de Vitalia en el cockpit (I-46/47): el Hilo de Oro
objetivo → KR → proceso → puesto → sistema → semáforo de digitalización + tabla de Brechas.
Ejercita el caso **shell≠worktree** con dato real (registry: `repo=~/Proyectos/vitalia`,
`cockpit.path=~/Proyectos/luana-vitalia/vitalia`).

## Lo conocido (verificado 2026-06-29 — NO inventar más allá de esto)
- `kind=own`. Sistemas (registry SSoT, `chris-corp/portfolio/registry.yaml`):
  - `vitalia-app` · procedencia `propio` · "SaaS salud sobre el motor luana core/" · board = worktree luana.
  - `odoo` · procedencia `compartido` · `ref: odoo#company=Vitalia` · **sin levantar aún** (gap del holding).
- `ruc: PENDIENTE`.
- **Inputs M1 = TODOS stubs `FILL`:** `empresa/objetivos.md`, `empresa/socios.md`,
  `marketing/source/{positioning.md, icp.yaml, pricing.yaml, messaging-house.md, founder.md}` están vacíos.
  ⇒ **NO hay dato M1 real todavía.** El seed arranca en la misma bifurcación que prenter.

## Bifurcación (resolver con el operador, AskUserQuestion, ANTES de escribir)
- **(A) M1 primero, luego seed real.** Llenar `empresa/objetivos.md` + `marketing/source/*` con el operador
  (entrevista) → derivar `negocio.yaml` con `conf: alta/media` donde haya dato. Más caro, da diagnóstico de verdad.
- **(B) Seed-hipótesis `conf: baja` (como prenter).** Escribir `negocio.yaml` con objetivos/procesos/brechas
  como hipótesis del CTO marcadas `conf: baja` + `fuente: Inferido`, "a validar con el directorio". Prende
  la Vista de Negocio ya; el dato real llega después. (Prenter se sembró así — es patrón legítimo.)
- Recomendación: **(B)** para no bloquear el cockpit, con nota explícita de que es hipótesis. M1 real = su propio ciclo.

## Esquema (copiar la forma de `~/Proyectos/prenter/empresa/negocio.yaml` — plantilla canónica)
```yaml
empresa: vitalia
titulo: "Vitalia — diagnóstico de negocio"
nota: "Seed <hipótesis conf:baja | M1 real>. <una línea honesta>."

objetivos:                 # los drivers que mira el directorio
  - { id: <slug>, nombre: "<...>", kr: "<indicador>", from: "<...>", to: "<...>", unit: "<...>" }

areas:                     # áreas → procesos
  - id: <slug>
    nombre: "<Área>"
    lider: "<puesto/equipo>"
    procesos:
      - { id: <slug>, nombre: "<proceso>", sistema: "<sistema que lo corre>",
          digital: <manual|externo|integrado>, obj: [<ids de objetivo>], puesto: "<...>",
          ciclo: "<etapa>", fuente: <repo|Sistema leído|Entrevista|Declarado|Inferido>, conf: <alta|media|baja> }

brechas:                   # Gap Analysis: cada una atada a un objetivo (o null = huérfana)
  - nombre: "<...>"
    sub: "<el detalle del gap>"
    tipo: "<Sistema|Proceso>"
    obj: <id objetivo | null>
    costo: "<cuánto cuesta el gap>"
    costoLbl: "<la etiqueta legible>"
    prio: <alta|media|baja>
```

### Pistas Vitalia-específicas (para no arrancar de cero — son guías, validar)
- Sistemas a mapear: **vitalia-app** (procedencia `propio`, `digital: integrado` donde está construido) ·
  **odoo** (`compartido`, `digital: externo` — sin levantar → brecha `caja`/finanzas, igual que prenter).
- Áreas plausibles de un SaaS salud micro-B2B: Producto (vitalia-app sobre luana) · Go-to-market/Marketing ·
  Ventas/CRM · Onboarding de clínica/paciente · Soporte · Finanzas (Odoo sin levantar) · Gobierno.
- Reusar las brechas transversales del holding: "Odoo del holding sin levantar" (obj caja) · "RUC PENDIENTE".

## Gates (I-49 — el cockpit valida al leer, chokepoint único)
- Enums duros: `digital ∈ {manual,externo,integrado}` · `conf ∈ {alta,media,baja}` · `prio ∈ {alta,media,baja}`.
- Refs: cada `proceso.obj[]` y `brecha.obj` debe existir en `objetivos[].id` (o `obj: []`/`null` = huérfano honesto).
- Violación → `warnings[]` no-fatal + banner en la Vista de Negocio (no rompe, pero lo verás).

## Verificar en vivo
1. Desde chris-corp: `make cockpit-up` (multi · :4000).
2. Navegar `?empresa=vitalia` → la Vista de Negocio debe pintar objetivos + áreas + brechas (ya no empty-state).
   Marcador de página: `"diagnóstico de negocio"`. Sin banner de warnings = enums/refs OK.
3. (Si el MCP chrome-devtools no está: fallback CDP headless, ver `JOURNAL.md`.)

## Cerrar
- Commit en `~/Proyectos/vitalia` por pathspec: `git add empresa/negocio.yaml` → `feat(empresa): seed negocio.yaml ...`.
- Actualizar `STATE.md` (E·Fase 5c → hecho/avanzado + HEAD vitalia) + `JOURNAL.md` (trampas) en la carpeta de campaña.
- Replicar el patrón a comunify/nicolify/PeruSaaS (cada uno su micro-ciclo en su cwd) cuando toque.

---

## Prompt paste-ready (pegá esto en una sesión nueva con cwd = ~/Proyectos/vitalia)

```
Seed del negocio.yaml de Vitalia (Fase 5c del campaign-cockpit-negocio). cwd = ~/Proyectos/vitalia (el SHELL
de la empresa, NO el worktree luana). Orientame primero: confirmá cwd + HEAD (git log -1), y RE-VERIFICÁ el
estado real (la foto puede estar vieja). Háblame como CTO a su CEO. NO toques código sin confirmar conmigo
(AskUserQuestion) ANTES.

OBJETIVO: crear ~/Proyectos/vitalia/empresa/negocio.yaml (hoy NO existe → el cockpit muestra negocio:null).
Es la Vista de Negocio de Vitalia en el cockpit (I-46/47): Hilo de Oro objetivo→KR→proceso→puesto→sistema→
semáforo (manual|externo|integrado) + tabla de Brechas atadas a objetivo.

PLANTILLA CANÓNICA: copiá la FORMA de ~/Proyectos/prenter/empresa/negocio.yaml (objetivos[] · areas[].procesos[]
· brechas[]). El detalle del esquema, los gates I-49 y las pistas Vitalia están en
~/Proyectos/campaign-cockpit-negocio/phases/phase-5c.md — leelo entero primero.

HALLAZGO CLAVE (verificalo): los inputs M1 de Vitalia (empresa/objetivos.md, marketing/source/{positioning,icp,
pricing,messaging-house,founder}) están TODOS en stub FILL → no hay dato M1 real. Por eso, ANTES de escribir,
decidí conmigo por AskUserQuestion: (A) hacemos M1 real primero (llenamos objetivos.md + source/ por entrevista)
y de ahí derivás el negocio.yaml con conf alta/media; o (B) seed-hipótesis conf:baja + fuente:Inferido "a validar"
(como se sembró prenter) para prender ya la Vista de Negocio. Recomendá una.

GATES (I-49, el cockpit valida al leer): digital∈{manual,externo,integrado} · conf∈{alta,media,baja} ·
prio∈{alta,media,baja}; cada proceso.obj[] y brecha.obj debe existir en objetivos[].id (o []/null = huérfano).
NO inventes más allá de lo conocido: kind=own; sistemas = vitalia-app (propio, SaaS salud sobre luana core/) +
odoo (compartido, company=Vitalia, SIN levantar); ruc PENDIENTE.

VERIFICAR en vivo: make -C ~/Proyectos/chris-corp cockpit-up → navegar ?empresa=vitalia → debe pintar la Vista
de Negocio (marcador "diagnóstico de negocio"), sin banner de warnings.

CERRAR: commit por pathspec en vitalia (git add empresa/negocio.yaml; NUNCA git add .) →
feat(empresa): seed negocio.yaml de Vitalia. Actualizá STATE.md + JOURNAL.md del campaign-cockpit-negocio.
Próximo: replicar a comunify/nicolify/PeruSaaS (cada uno su micro-ciclo).

HEADs reales (verificá con git log -1): vitalia 4f56b18 · chris-corp 6b4da38 · prenter-harness a826f6f.
```
