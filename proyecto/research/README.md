# research/ — investigación de producto

Campañas de investigación. Lee el `README.md`/`INDICE.md` de cada una antes de retomar — es probable
que ya exista una decisión o un aprendizaje capturado.

## [`rediseno-total/`](./rediseno-total/) — SOTA del rediseño CK-18 (2026-07-08)
Siete investigaciones state-of-the-art que informaron el rediseño de fondo (Fábrica + Organización
instalada): repositorio oficial (git/Forgejo), data lakehouse (dlt+DuckLake), knowledge DB
(files-first), distribución/licencias/telemetría (go-tuf v2 + Tauri + Ed25519 + OTLP), auth/RBAC
(embebida policy-as-data), gestión de cambios ISO, y proceso-como-arnés. Empieza por su `README.md`.

## Campañas heredadas del monorepo — ⚠ CONGELADAS / PRE-CK-18

Tres campañas rescatadas. **Son históricas: anteriores al rediseño CK-18 (2026-07-08) y pueden
contradecir el modelo vigente** (SSoT = [`../../sistema/arquitectura/NODOS.md`](../../sistema/arquitectura/NODOS.md)).
No citarlas como verdad actual — su valor es narrativa/aprendizaje. Salidas de sistema ya destiladas:
`objeto.schema.yaml` → [`sistema/schema/`](../../sistema/schema/), M1/M3 + método →
[`sistema/metodo/`](../../sistema/metodo/) (BL-07). Lee el `README.md`/`NEXT-PROMPT.md`/`INDICE.md` de
cada una antes de retomar — es probable que ya exista una decisión o un aprendizaje capturado.

## [`cockpit-negocio/`](./cockpit-negocio/)
Campaña que llevó a Cockpit de "visor SDD" a "herramienta de negocio" (Fases 0-5). Empieza por
`README.md` (protocolo + estado de fases) y `MASTER-PLAN.md` (decisiones firmes, ids de ledger
`I-40..I-47` — esos ids son del monorepo de origen, no de este repo). `JOURNAL.md` acumula
aprendizajes/trampas de cada fase; `STATE.md` es el snapshot de realidad al momento de cerrar la
campaña. `phases/phase-4.md` es el que linkea el mockup Prospera como referencia visual (ver
`../mockups/README.md`).

## [`modelo-objeto/`](./modelo-objeto/)
El modelo de datos detrás de la Vista de Negocio: 9 entidades (empresa · persona · rol · área ·
proceso · sistema · objetivo · capability · brecha). Empieza por `INDICE.md` y `DECISIONES.md`
(D-01..D-16). El contrato de forma (`objeto.schema.yaml`) se promovió a
[`sistema/schema/`](../../sistema/schema/objeto.schema.yaml) en CK-11 — aquí queda la campaña que
lo produjo. También se promovieron a `sistema/schema/` en el cierre de BL-07: `ejemplo-vertice.yaml`
(fixture END-TO-END del schema — Inmobiliaria Vértice ficticia, no Prospera real) y `metodologia/`
(5 docs del *porqué* de cada campo: brechas, objetivos, entidades, glosario, procesos). Lo que queda
aquí es narrativa de campaña.

## [`service-design/`](./service-design/)
Cómo Cockpit se diseña a sí mismo con This Is Service Design Doing (mapa de actores → persona →
journey map → service blueprint → interfaces). `SERVICE-DESIGN.md` es el documento más avanzado
del monorepo de origen — persona ficticia "Mateo Salas, dueño Inmobiliaria Vértice" (no confundir
con la Prospera real). El diseño del módulo de levantamiento con el motor de gap analysis
(`M1-LEVANTAMIENTO.md`) y la fixture Vértice se promovieron a
[`sistema/metodo/`](../../sistema/metodo/) en CK-11 (método as-code). Este conjunto es la base
directa de la mecánica As-Is→To-Be→brecha de `VISION.md`.
