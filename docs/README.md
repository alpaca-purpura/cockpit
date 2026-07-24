# docs/ — el conocimiento del proyecto (mapa)

Todo el conocimiento de Cockpit vive aquí, separado por naturaleza (reorganización **CK-28**,
2026-07-23 — principio hexagonal: la FUENTE as-code que validan gates/generadores/runtime vive en
[`../sistema/`](../sistema/), `go/` y `ui/`; aquí vive lo que se LEE).

```
docs/
├── product/        SSoT del QUÉ se construye (arnés CK-19): historias, capabilities,
│   │               releases, módulos, roadmap. Punto de arranque de toda sesión.
│   ├── stories/    historias por módulo (lifecycle idea → … → done)
│   ├── capabilities/  lo construido y verificado (YAML por capability)
│   ├── releases/   F0..F3 + ROADMAP.md (GENERADO por gen_roadmap.py, gate pre-commit)
│   ├── modules/    fichas de módulo (cockpit, consultio, fabricante, …)
│   ├── prototypes/ mockups y prototipos HTML/imágenes (evidencia visual, por fecha)
│   ├── plans/      planes de ejecución puntuales (p.ej. consultio-studio-core)
│   ├── MAPEO.md    correspondencia lossless legacy → arnés (CK-19)
│   └── _archive/   registro histórico congelado (backlog BL-NN + increment CAP-NN pre-arnés)
├── research/       SOTA vivo que informa decisiones: organization-as-code (37 capacidades
│                   TO-BE), rediseno-total (CK-18), cerebro-conocimiento (memoria agéntica)
├── metodo/         lecturas humanas del método del producto: veredicto ISO-9001 + book
│                   metodológico del objeto (el porqué de cada campo del schema)
├── architecture/   lecturas humanas de arquitectura: forma-de-trabajo (operador) +
│                   producto (visión CTO histórica). La vigente es as-code → sistema/arquitectura/
└── process/        proceso de DESARROLLO (arnés prenter):
    ├── harness/    doctrina estática del arnés (lifecycle, spec-mapa-funcional, ticket-states,
    │               permissions)
    └── (raíz)      registros VIVOS que las reglas CORE referencian: learnings.md ·
                    tech-debt.md (L3) · continuous-improvement.md (CIL) · harness-backlog.md
```

Reglas de ubicación (para no volver a mezclar):

1. **¿Un gate lo valida, un generador lo lee/escribe o el runtime lo carga?** → `sistema/` (o
   `go/`/`ui/`). Nunca aquí.
2. **¿Define qué se construye (historia/capability/release)?** → `docs/product/` (SSoT del arnés).
3. **¿Es investigación/SOTA?** → `docs/research/`. **¿Narrativa de método desacoplada?** →
   `docs/metodo/`. **¿Lectura de arquitectura?** → `docs/architecture/`.
4. **¿Es proceso de desarrollo?** → `docs/process/` (doctrina en `harness/`, registros vivos en
   la raíz — los paths de la raíz los citan reglas CORE, no moverlos).
5. **¿Quedó obsoleto pero es historia?** → `_archive/` con banner, nunca borrar.

Los dos "métodos" no se confunden: `docs/process/` = cómo NOSOTROS construimos (arnés);
`sistema/metodo/` + `docs/metodo/` = lo que Cockpit VENDE (método del consultor) — ver
`.claude/rules/metodologia-as-code.md`.

> Nota histórica: hasta CK-11 este directorio contenía la herencia de la incubadora; la "tríada"
> `sistema/`·`docs/`·`proyecto/` (CK-11) se disolvió en CK-28 — `proyecto/` desapareció (research →
> `docs/research/`, prototypes/plans → `docs/product/`, backlog congelado → `docs/product/_archive/`).
