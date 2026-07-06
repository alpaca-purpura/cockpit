# methodology/ — catálogo de metodologías heredado

`methodologies.yaml` es el catálogo COMPLETO (31 fichas, M01-M31) tal como vivía en el registry del
monorepo de origen — incluye metodologías de construcción de software (Dual Track, Shape Up, JTBD,
EARS, BDD, WSJF, Wardley) que son dominio de DevHub/Kit, no de Cockpit. `METODOLOGIA.md` es la
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

`nichos/` — el patrón "conocimiento por industria": `inmobiliario.yaml` (6 unidades, seed
anonimizado — categorías de rubro derivadas de un deck real pero SIN datos del cliente) +
`nicho.schema.yaml` (el contrato de forma). Incluye `N-IMM-06`, el mapeo explícito "ISO 9001 en
desarrollo inmobiliario" — ejemplo vivo de cómo el pilar ISO se especializa por vertical.
