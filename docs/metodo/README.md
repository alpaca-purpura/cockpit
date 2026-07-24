# docs/metodo/ — lecturas humanas del método del producto

Narrativa y doctrina del método **desacoplada del SSoT as-code** (principio hexagonal, CK-28):
nada de aquí lo valida un gate ni lo lee un generador. La fuente del método vive en
[`sistema/metodo/`](../../sistema/metodo/) (M-cards, proceso-como-dato, nichos, GRAFO) y el
contrato del objeto en [`sistema/schema/`](../../sistema/schema/).

| Qué | Dónde |
|---|---|
| [`ISO-9001-veredicto-I-05.md`](./ISO-9001-veredicto-I-05.md) | El precedente que decide CUÁNTO de ISO 9001 se usa (ontología sí, aparato de certificación no) — `VISION.md §ISO` lo hereda y amplía. |
| [`objeto/`](./objeto/) | El **book metodológico del objeto**: el *porqué* (norma/marco) de cada casilla del `objeto.schema.yaml` — entidades, objetivos, kpis, procesos, brechas, mejoras, glosario. Las citas `met:`/`§` del schema apuntan a estos capítulos. |

Las narrativas del método que SÍ están cableadas al cerebro `/metodo` (ruteadas por `GRAFO.md` y
citadas en `ref:` de los pasos) permanecen en `sistema/metodo/`: `M1-LEVANTAMIENTO.md` ·
`M3-ESPINAZO.md` · `PROCESS-AS-DATA.md` · `SERVICE-DESIGN.md`.

Acceso al método en conversación: skills `/metodo` (consulta vía GRAFO) y `/metodo-aprende`
(ingesta) — ver `.claude/rules/metodologia-as-code.md`.
