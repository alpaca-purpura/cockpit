# sistema/ — el producto as-code (fuente, no documentación)

Los artefactos que **definen el sistema mismo**, como dato versionado: SSoT hand-authored +
generadores + vistas generadas, validado todo por gates en `.githooks/pre-commit` (CK-17/CK-19).
Se llama "sistema" (no "app") porque tiene múltiples puntos de despliegue (ver
`arquitectura/NODOS.md`) en tres planos (CK-18): **Fabricante** (Arnesia, Repositorio Maestro,
distribución/licencias) · **Organización** (Cockpit, Repositorio Oficial, Data Lakehouse) ·
**Edge** (Consultio, Colab Studio, DevStudio sobre Claude Code).

Principio (CK-28, hexagonal): aquí vive SOLO lo que un gate valida, un generador lee/escribe o el
runtime carga. La lectura humana desacoplada vive en [`../docs/`](../docs/) (mapa:
[`docs/README.md`](../docs/README.md)).

- [`arquitectura/`](./arquitectura/) — eje as-code #1 (`.claude/rules/arquitectura-as-code.md`):
  `NODOS.md` (**16 fichas de nodo, SSoT** del ecosistema) + `arquitectura.yaml` (componentes de la
  célula) → `gen_arquitectura.py` → `nodos.data.js` + `arquitectura.html` (GENERADOS);
  `despliegue.html` curado a mano y VALIDADO por el gate. Visión CTO (histórica):
  [`docs/architecture/producto/ARCHITECTURE.md`](../docs/architecture/producto/ARCHITECTURE.md).
- [`metodo/`](./metodo/) — eje as-code #2 (`.claude/rules/metodologia-as-code.md`): el método del
  PRODUCTO (lo que Cockpit vende). Catálogo de M-cards (`methodologies.yaml`), proceso-como-dato
  ([`proceso/`](./metodo/proceso/) — m1 levantamiento · m2 mantenimiento · m3 espinazo), nichos
  ([`nichos/`](./metodo/nichos/)) → `gen_metodo.py` → `METODOLOGIA.md §4` + `GRAFO.md` +
  `NOTACIONES.html` (GENERADOS). Narrativas cableadas al cerebro `/metodo` (las rutea `GRAFO.md`):
  `M1-LEVANTAMIENTO.md` · `M3-ESPINAZO.md` · `PROCESS-AS-DATA.md` · `SERVICE-DESIGN.md`. Se
  empaqueta en arneses (Arnesia/N15) para las apps del edge — Consultio (N14) y Colab Studio (N17).
- [`schema/`](./schema/) — el contrato del objeto de negocio: `objeto.schema.yaml` (v2, 12 nodos,
  CK-26) + `verbos.yaml` (cargados por `go/objeto.go` → `/api/objeto`), gates `gen_schema.py` +
  cobertura `gen_cobertura.py`, fixture `ejemplo-vertice.yaml`, ADR `DECISIONES.md`.

Lecturas humanas relacionadas (fuera de aquí, CK-28): doctrina ISO y el book del objeto en
[`docs/metodo/`](../docs/metodo/) · visión CTO histórica en
[`docs/architecture/producto/`](../docs/architecture/producto/) · SOTA en
[`docs/research/`](../docs/research/).

Regla: cambiar algo aquí = decisión de sistema → ficha `CK-NN` en el mismo evento; el pre-commit
regenera las vistas y bloquea si la SSoT no valida.
