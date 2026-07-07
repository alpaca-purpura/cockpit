# research/ — investigación de producto heredada

Tres campañas rescatadas. Lee el `README.md`/`NEXT-PROMPT.md`/`INDICE.md` de cada una antes de
retomar una investigación — es probable que ya exista una decisión o un aprendizaje capturado.

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
lo produjo. `ejemplo-vertice.yaml` es fixture ficticia (Inmobiliaria Vértice, no Prospera real).
`metodologia/` tiene 5 documentos temáticos (brechas, objetivos, entidades, glosario, procesos).

## [`service-design/`](./service-design/)
Cómo Cockpit se diseña a sí mismo con This Is Service Design Doing (mapa de actores → persona →
journey map → service blueprint → interfaces). `SERVICE-DESIGN.md` es el documento más avanzado
del monorepo de origen — persona ficticia "Mateo Salas, dueño Inmobiliaria Vértice" (no confundir
con la Prospera real). El diseño del módulo de levantamiento con el motor de gap analysis
(`M1-LEVANTAMIENTO.md`) y la fixture Vértice se promovieron a
[`sistema/metodo/`](../../sistema/metodo/) en CK-11 (método as-code). Este conjunto es la base
directa de la mecánica As-Is→To-Be→brecha de `VISION.md`.
