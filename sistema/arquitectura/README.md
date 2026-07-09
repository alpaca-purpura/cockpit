# arquitectura/ — el sistema como Fábrica + Organización instalada (CK-18)

`ARCHITECTURE.md` (visión CTO — con banner: sus secciones Control/Data Plane son historia pre-CK-18)
y `NODOS.md` (**16 fichas de nodo, SSoT del detalle**) describen el ecosistema. Rediseñado de fondo en
**CK-18**: de "BYOC con motor server-side" a **Fábrica de software + Organización instalada + Edge**.
El método **se entrega al cliente** en arneses (deroga el límite de IP). [`despliegue.html`](./despliegue.html)
es el diagrama visual (curado a mano, mismo evento que la decisión). Los nodos por plano:

**Fabricante (nuestro):**
- **N15 · Arnesia** — fábrica de arneses por rol-en-proceso (`~/Proyectos/harness-studio`).
- **N2 · Repositorio Maestro** — método + arneses plantilla + código, SSoT nuestro (hoy `../metodo/`).
- **N3 · Distribución + telemetría + licencias** — releases firmadas + entitlements + telemetría opt-in.

**Organización (cliente):**
- **N6 · Repositorio Oficial** — git self-hosted confidencial (Forgejo), SSoT de la estructura (ya no GitHub).
- **N13 · Cockpit** — Visualización + Gestión de Cambios (ISO) + niveles de acceso; binario `directorio`
  + UI en [`../../go/`](../../go/) y [`../../ui/`](../../ui/) (puerto 4100; `/api/portfolio`, `/api/negocio`, `/api/objeto`).
- **N16 · Data Lakehouse** — dlt + DuckLake; reúne la operación (N18) y nutre a Cockpit.
- **N12 · Depósito de fuentes** — landing zone del crudo transitorio.
- **N18 · Sistemas operacionales** — SaaS/ERP/a medida/Excels: fuentes del lakehouse.

**Edge (apps sobre Claude Code local):**
- **N14 · Consultio** — App del Consultor (clon de DevStudio): construye el mapa completo y lo publica a N6.
- **N17 · Colab Studio** — app del trabajador operativo (arneses por puesto).
- **N5 · DevStudio** — app de desarrollo (P2, `~/Proyectos/dev-studio`, ledger DH-NN); también a devs del cliente.
- **N8** — Claude Code, motor común. **N9/N19/N10/N11** — actores (Consultor→Analista de Calidad, Developer, Usuarios 4 niveles).

**Muertos (CK-18):** N1 (Motor de Discovery server-side → arneses), N4 (voz, diferida), N7 (agentes efímeros).
El SOTA de cada pieza está en [`../../proyecto/research/rediseno-total/`](../../proyecto/research/rediseno-total/).

`ck-02-stage1-diagram.html` — diagrama de la extracción física Stage 1 (histórico, pre-Stage-4).

[`arquitectura.yaml`](./arquitectura.yaml) — el modelo de la arquitectura DE LA CÉLULA como dato
(NODOS.md = ecosistema; este YAML = qué posee/consume Cockpit).

## Render de la arquitectura-as-code (CK-15, cierra BL-08)

`gen_arquitectura.py` valida las dos SSoT y genera las vistas visuales:

```
python3 sistema/arquitectura/gen_arquitectura.py            # valida + regenera
python3 sistema/arquitectura/gen_arquitectura.py --check    # gate anti-drift (exit 1)
```

- `NODOS.md` → **`nodos.data.js`** — alimenta el drawer de `despliegue.html` (clic en un nodo =
  su ficha completa). GENERADO, no editar a mano.
- `arquitectura.yaml` → **`arquitectura.html`** — vista de la célula: planos como bandas,
  componentes como tarjetas coloreadas por estado, relaciones, drawer con fichas/relaciones por
  componente. GENERADO, no editar a mano.
- Gate: índice↔fichas de NODOS, refs `[R#]` resuelven al responsibility-walk, relaciones joinean,
  estados/tipos en vocabulario, rutas existen, fichas `CK-10+` resuelven en `LEDGER.md`
  (CK-01..CK-09 = historia congelada del monorepo, se aceptan sin verificar).
- `despliegue.html` (curado a mano) **se valida, no se genera** (CK-17): todo nodo del índice
  aparece en el diagrama (`data-nodo`) y viceversa, y la madurez de cada art coincide con
  NODOS.md — si divergen, el gate bloquea y el diagrama se corrige a mano en el mismo evento.

**Gate automático (CK-17):** hook versionado en [`.githooks/pre-commit`](../../.githooks/pre-commit)
— en cada commit valida todo lo anterior, regenera los derivados y los agrega al commit; si algo
no valida, bloquea. Activación por clone (una vez): `git config core.hooksPath .githooks`.

**Disciplina:** editar NODOS.md o arquitectura.yaml ⇒ el hook regenera y stagea solo; editar el
layout de despliegue.html sigue siendo curación manual (mismo evento que la decisión).
