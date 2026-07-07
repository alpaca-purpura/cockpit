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

Los nodos **N3, N5, N6, N8, N10** son mayormente de DevHub (ya graduado, repo propio
`~/Proyectos/devhub`) — se mantienen en el documento porque el mapa es del ecosistema; sus hechos
cruzados (Stage 4, contrato de datos CK-08) se corrigieron en CK-14, pero su evolución se gobierna
en el ledger de DevHub (DH-NN).

`ck-02-stage1-diagram.html` — diagrama de la extracción física Stage 1 (cómo convivían Cockpit y
DevHub en el mismo binario, antes de Stage 4). Histórico, útil para entender por qué el código
está estructurado como está.

[`arquitectura.yaml`](./arquitectura.yaml) — el modelo de la arquitectura DE LA CÉLULA como dato
(NODOS.md = ecosistema; este YAML = qué posee/consume Cockpit). El generador que lo
validaba/renderizaba (`gen_arquitectura_cockpit.py`) no se portó; queda como documentación curada
a mano hasta decidir si vale un render propio (BL-08).
