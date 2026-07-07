# HANDOFF — Desacople de alpaca-harness (LÍNEA SDD) vs prenter (EMPRESA)

> Sesión nueva, a propósito (evitar context rot). Decisión ya tomada y registrada: **ficha I-38** en `alpaca-harness/tooling/strategy/PRODUCT-VISION.md` (`decidida`). Este doc destila la investigación (7 subagentes, 2026-06-27) para NO re-investigar. Memoria: [[repo-decomposition-scheme]], [[portfolio-holding-model]], [[cockpit-business-tool-campaign]].

## Prompt para arrancar la sesión nueva (pegar en `cd ~/Proyectos/alpaca-harness && claude`)

> Ejecuto la decisión I-38 (descomposición de repos). Lee primero: `tooling/strategy/PRODUCT-VISION.md` ficha **I-38**, y `~/Proyectos/campaign-cockpit-negocio/HANDOFF-desacople-alpaca.md` (hallazgos distilados). Tarea: **auditar alpaca-harness y desacoplar lo que no corresponda a la LÍNEA SDD**, ejecutando los 3 movimientos en el orden seguro de abajo. Háblame como CTO a CEO. Confirma cada movimiento antes de tocar archivos; gates verdes antes de cada commit.

## La decisión (qué es qué)

- **alpaca-harness = la LÍNEA SDD completa** (un agregado cohesivo, NO solo software): producto (`core-harness`/cockpit) + método (`service/`, 31 M-cards) + cerebro `nichos/` (moat) + ejecución de engagements + el flywheel entero. La costura producto↔servicio es interna (gate-handoff G1–G8).
- **prenter = la EMPRESA** (anillo de propiedad): depende hacia adentro de la línea vía puertos (IDs estables, no rutas).
- **Insight clave (red-team):** el purismo "mover método+cerebro+clientes a prenter" es un ERROR DE CATEGORÍA — confunde acoplamiento de PROPIEDAD (se parte limpio) con acoplamiento de CONOCIMIENTO (NO se parte; cableado en 1 skill/validador/gate/cwd). Mover el knot SUBE el acoplamiento (~13-16 refs cross-repo; el gate no corre partido).

## SE MUEVE a prenter (hojas — cero conocimiento-acoplado)

1. **`marketing/` capa comercial** (positioning, icp, messaging-house, pricing, brand-guidelines, founder, collateral, offerings, ledger de deals) + la skill `.claude/skills/crear-pieza-comercial/` + `marketing/methods/`. Mata la deuda del drift 3× ([[marketing-skill-portability-debt]]): la skill canónica pasa a prenter; los shells SaaS la referencian/heredan.
2. **Shell de CUENTA** de cada cliente → `prenter/clientes/<x>/`: `cuenta.yaml`, `contactos.yaml`, `relacion.md`, `contrato-marco/`, y el `CLAUDE.md` de cuenta.
3. **Nuevo `prenter/clientes/registry.yaml`** — cuenta→proyecto `{slug, tipo, ref}`, espejo de `chris-corp/portfolio/registry.yaml`. `tipo` ∈ {sdd-alpaca-harness, a-medida, advisory}; `ref` = dónde ejecuta el proyecto (ruta a alpaca-harness, o repo propio del proyecto a-medida, o null).

## SE QUEDA en alpaca-harness (el knot de conocimiento)

- `service/` (método, 31 M-cards, proceso-como-dato) · cerebro `.claude/harness/registry/nichos/` + schema + `validate_schema.py` · el **flywheel completo** (`grill` modo B, puerto `extraer_conocimiento_nicho`).
- El **PROYECTO-engagement** de cada cliente: `clients/<x>/proyectos/<x>/` (`proyecto.yaml`, `proceso.yaml`, `discovery/`, `comercial/`, `entregables/`, `sow/`). El `clients/<x>/CLAUDE.md` se reemplaza por un stub: "la cuenta vive en `prenter/clientes/<x>`; esto = ejecución del engagement".
- El dominio `clients/` de alpaca-harness se re-enmarca como "engagements SDD que ejecutamos" (no CRM).

## Hallazgos críticos (file:line) — por qué el flywheel NO se rompe

- El flywheel vive 100% a nivel **proyecto** (se queda). La ruta hardcodeada de `grill` (`.claude/skills/grill/SKILL.md:18`, `ports.yaml:68`) = `clients/<x>/proyectos/<x>/discovery/**` → **sigue válida** tras mover solo el shell-de-cuenta.
- `derivado_ref` (provenance del moat, `nichos/inmobiliario.yaml:81`) es un **slug** (`prospera`), NO una ruta → la traza cruza repos sin romperse. Mitigación recomendada: al capturar en `discovery/`, **snapshotear** el firmográfico (rubro/champion) en vez de linkear `cuenta.yaml` (mejor para inmutabilidad de provenance; hoy `discovery/README.md:44-49` lo lee de cuenta).
- `methodologies.yaml` (31 fichas) NO se parte: interconectadas por `combina_con`; el validador camina el grafo entero (`validate_schema.py:165`); los nichos referencian M-cards. Queda íntegro en alpaca.
- El deck bespoke (`comercial/`) se queda con el proyecto: su pipeline (skill `crear-pieza-comercial` + `marketing/source` + ledger + render Claude Design) está en alpaca-harness. ⚠ Tras mover marketing, este pipeline cruza a prenter → revisar: o el `comercial/` del proyecto también referencia la skill-en-prenter por contrato, o se decide que la autoría comercial corre desde prenter. **Punto a resolver en la ejecución.**

## Orden seguro de ejecución

1. **`prenter/clientes/` + registry** (nuevo dominio en prenter; `prenter/CLAUDE.md` ya dice "estructura = SEMILLA, refínala"). Mecánico, cero gate. Crear `prenter/clientes/<cuenta>/` con el shell + `prenter/clientes/registry.yaml`.
2. **Mover el shell-de-cuenta** de `alpaca-harness/clients/<x>/` (cuenta.yaml, contactos, relacion, contrato-marco) → prenter; dejar stub en alpaca. Conmutar los ~5 breadcrumbs de path (`proyecto.yaml:9`, `discovery/README.md:48,103`, `relacion.md:8`) a slug/snapshot.
3. **Mover `marketing/`** comercial + skill a prenter. Convertir rutas→IDs (los 4 hard-links `../../service|products` de `messaging-house.md:60,93,119` + `pricing.md:8`; `oferta_ref`/`icp_match` a IDs). Resolver el seam del `comercial/` (punto ⚠ arriba).
4. **Actualizar framings (mismo commit, regla de oro):** `chris-corp/CLAUDE.md` ("CLIENTE vive en alpaca-harness/clients/" → ahora cuenta en prenter), `prenter/CLAUDE.md` (agregar dominio `clientes/` + `marketing/`; corregir línea 19), `alpaca-harness/clients/CLAUDE.md` (re-enmarcar como ejecución), `repo-map.yaml` (zonas + `link_scan_dirs`), `AGENTS.md`, kernel `CLAUDE.md` (5→4 dominios), `marketing/CLAUDE.md`.
5. **Enseñar a `orientacion`** (`.claude/skills/orientacion/SKILL.md:16,24,25`) que cuenta+marketing viven cross-repo.
6. **Gates verdes** (`gen_all --check` en alpaca; gate registry en chris-corp/prenter) + smoke. Commit por repo.
7. **Auditar el resto:** barrer alpaca-harness por CUALQUIER otra cosa que no sea la LÍNEA SDD y no corresponda (no solo marketing/clients) — el pedido del operador es desacoplar "lo que haya quedado allí y no corresponda".

## Lo que NO hacer

- NO mover `service/`, `nichos/`, el flywheel, ni los `proyectos/` de cliente (rompe gate + flywheel + cwd; refutado por evidencia, ver I-38).
- NO partir `methodologies.yaml`.
- NO duplicar (driftan); referenciar por ID/contrato.

## Futuro diferido (YAGNI, no ahora)

Si Prenter gana un **2º producto que use SDD** → extraer `service/`+`nichos/` a su propio repo "SDD-method" compartido. Es el único refactor de crecimiento previsto; pequeño y bien-definido.
