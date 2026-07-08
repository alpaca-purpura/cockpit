# metodo/ — el método del servicio/auditor as-code

El método con que se levanta, diagnostica y mejora una empresa cliente. Es SISTEMA (define qué
hace Cockpit), no documentación de features. Se embebe en la App del Auditor (BL-16). Completado
desde el legacy `prenter-harness/service/` en CK-11 (antes solo había catálogo + veredicto ISO).

## Doctrina y catálogo

`methodologies.yaml` es el catálogo COMPLETO (31 fichas, M01-M31) tal como vivía en el registry del
monorepo de origen — incluye metodologías de construcción de software (Dual Track, Shape Up, JTBD,
EARS, BDD, WSJF, Wardley) que son dominio de DevStudio/Kit, no de Cockpit. `METODOLOGIA.md` es la
narrativa completa generada de ese catálogo. Se dejaron íntegros (no se recortó el YAML) para no
perder contexto ni relaciones (`combina_con`) — pero las que aplican directo a los 4 pilares de
`VISION.md` son:

| Pilar | M-cards |
|---|---|
| Procesos | M07 Event Storming · M09 Value Stream Mapping · M10 Service Blueprint · M11 BPMN · M12 APQC PCF |
| Roles | M25 RACI |
| Objetivos | M15 COBIT 2019 · M21 OKR · M26 Hoshin Kanri · M30 Balanced Scorecard |
| Personas/puestos | M29 Process/Task Mining |
| Transversal | M13 ArchiMate/TOGAF · M16 ISO 9001 · M24 This Is Service Design Doing · M31 Business Capability Modeling |

`ISO-9001-veredicto-I-05.md` — el precedente que decide CUÁNTO de ISO 9001 se usa (ontología sí,
aparato de certificación no) y que `VISION.md §ISO` hereda y amplía (CK-10).

## El método operable

- [`M1-LEVANTAMIENTO.md`](./M1-LEVANTAMIENTO.md) — "Diagnóstico Digital": AS-IS de sistemas y
  procesos + gap analysis, 3 beats, consultant-first.
- [`M3-ESPINAZO.md`](./M3-ESPINAZO.md) — mejora continua idea→producción (PDCA / ISO 9001 cl.10),
  6 etapas.
- [`PROCESS-AS-DATA.md`](./PROCESS-AS-DATA.md) — el patrón plantilla(IP)/instancia(cliente) que
  vuelve el engagement dato estructurado.
- [`proceso/`](./proceso/) — el proceso-como-dato mismo (módulos→etapas→pasos, front-matter MD):
  `m1/` levantamiento · `m2/` mantenimiento · `m3/` espinazo. Poblado: m1/b1 (6 pasos) + m3/e0.
  Resto = esqueleto (BL-05). Fixture ficticia en `proceso/_sample/inmobiliaria-vertice.yaml`.

## Conocimiento por nicho

`nichos/` — el patrón "conocimiento por industria": `inmobiliario.yaml` (6 unidades, seed
anonimizado — categorías de rubro derivadas de un deck real pero SIN datos del cliente) +
`nicho.schema.yaml` (el contrato de forma). Incluye `N-IMM-06`, el mapeo explícito "ISO 9001 en
desarrollo inmobiliario" — ejemplo vivo de cómo el pilar ISO se especializa por vertical.
