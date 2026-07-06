# architecture/ — arquitectura BYOC heredada

`ARCHITECTURE.md` y `NODOS.md` describen el ecosistema COMPLETO tal como se diseñó en el monorepo
de origen (Cockpit + DevHub, antes de que DevHub se graduara a su propio repo) — no son
exclusivos de Cockpit. Al leerlos, los nodos relevantes para ESTE producto son:

- **N1 · Motor de Discovery/Levantamiento** — ★IP, no construido. El backend de razonamiento
  (ingesta multi-fuente, orquesta AS-IS→TO-BE→gaps). Stack candidato, endpoints y riesgos abiertos
  ya documentados — es la especificación más detallada que existe de la mitad de Cockpit que falta
  construir (`VISION.md` la llama Motor de Discovery).
- **N2 · Playbook + Metodología** — la base de conocimiento como dato versionado que N1
  compilaría en instrucciones — hoy vive en [`../methodology/`](../methodology/).
- **N4 · Plano Conversación** — entrevistas de levantamiento por voz.
- **N7 · Agentes de análisis/levantamiento** — trabajadores efímeros que leen sistemas del cliente
  y escriben AS-IS.
- **N9 / N11** — actores (Consultor, CEO/sponsor) con su RACI.
- **N12 · Depósito de fuentes** — landing zone de la ingesta multi-fuente.
- **N13 · Cockpit — Vista Negocio** — la mitad YA CONSTRUIDA (binario `directorio` + UI, en
  `../../go/` y `../../ui/` de este repo).

Los nodos **N3, N5, N6, N8, N10** son mayormente de DevHub (ya graduado, repo propio
`~/Proyectos/devhub`) — se dejaron en el documento por contexto histórico, no son responsabilidad
de este repo.

`ck-02-stage1-diagram.html` — diagrama de la extracción física Stage 1 (cómo convivían Cockpit y
DevHub en el mismo binario, antes de Stage 4). Histórico, útil para entender por qué el código
está estructurado como está.

`../../arquitectura.yaml` (raíz del repo) — el modelo de la arquitectura de Cockpit como dato,
heredado de la disciplina "arquitectura-como-dato" del monorepo. Sus `fichas:` (CK-NN) referencian
todavía la historia congelada (CK-01..CK-08) — el generador que lo validaba/renderizaba
(`gen_arquitectura_cockpit.py`) no se portó; queda como documentación curada a mano hasta decidir
si vale la pena un render propio en este repo (deuda declarada en `LEDGER.md` CK-10).
