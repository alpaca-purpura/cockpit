# arquitectura/ — la arquitectura BYOC del sistema

`ARCHITECTURE.md` (visión CTO) y `NODOS.md` (14 fichas de nodo, SSoT del detalle) describen el
ecosistema COMPLETO tal como se diseñó en el monorepo de origen y se **terminó aquí en CK-14**
(cierra BL-03): estados post-Stage-4 corregidos, App del Auditor incorporada al mapa.
[`despliegue.html`](./despliegue.html) es el diagrama visual (portado del legacy y actualizado en
CK-14; curado a mano, mismo evento que la decisión que lo cambia). Al leerlos, los nodos
relevantes para ESTE producto son:

- **N1 · Motor de Discovery/Levantamiento** — ★IP, no construido. El backend de razonamiento
  (ingesta multi-fuente, orquesta AS-IS→TO-BE→gaps). Stack candidato, endpoints y riesgos abiertos
  ya documentados — es la especificación más detallada que existe de la mitad de Cockpit que falta
  construir (`VISION.md` la llama Motor de Discovery). Campaña = BL-13.
- **N2 · Playbook + Metodología** — la base de conocimiento como dato versionado que N1
  compilaría en instrucciones — hoy vive en [`../metodo/`](../metodo/).
- **N4 · Plano Conversación** — entrevistas de levantamiento por voz.
- **N7 · Agentes de análisis/levantamiento** — trabajadores efímeros que leen sistemas del cliente
  y escriben AS-IS.
- **N9 / N11** — actores (Consultor, CEO/sponsor) con su RACI.
- **N12 · Depósito de fuentes** — landing zone de la ingesta multi-fuente.
- **N13 · Cockpit — Vista Negocio** — la mitad YA CONSTRUIDA: binario `directorio` + UI, en
  [`../../go/`](../../go/) y [`../../ui/`](../../ui/) de este repo (puerto 4100; expone
  `/api/portfolio`, `/api/negocio`, `/api/objeto`).
- **N14 · App del Auditor** — ★IP, no construido (CK-11/CK-14). La aplicación instalable del
  Consultor: opera el método (`../metodo/proceso/`) y publica el resultado al repo del cliente
  ("deploy de procesos", R16/R17). Definición de producto = BL-15..BL-17.

Los nodos **N3, N5, N8, N10** son mayormente de P2 — hoy **DevStudio** (`~/Proyectos/dev-studio`,
app de escritorio que reemplazó al server DevHub; re-fichado N5 en CK-16) — se mantienen en el
documento porque el mapa es del ecosistema, pero su evolución se gobierna en el ledger DH-NN de
ese repo. **N6** es compartido: el repo GitHub del cliente — SSoT que Cockpit lee y conector de
la orquestación de DevStudio. El contrato de datos CK-08 quedó **derogado** en CK-16 (se diseñó
contra el server que ya no existirá); la conexión DevStudio/GitHub→Cockpit se diseña con el
primer consumidor real (BL-18).

`ck-02-stage1-diagram.html` — diagrama de la extracción física Stage 1 (cómo convivían Cockpit y
DevHub en el mismo binario, antes de Stage 4). Histórico, útil para entender por qué el código
está estructurado como está.

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
