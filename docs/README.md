# docs/ — investigación, mockups, arquitectura y metodología heredados

Material rescatado de la incubadora (`prenter-harness`) y de campañas efímeras en `~/Proyectos/`
al graduar Cockpit a repo propio (2026-07-06, CK-10). Objetivo: no re-gastar tokens
redescubriendo investigación ya hecha. Lee el `README.md` de cada subcarpeta antes de investigar
un tema a fondo — probablemente ya se investigó.

- [`research/`](./research/) — campañas de investigación y decisiones de producto (cockpit-negocio,
  modelo-objeto, service design).
- [`mockups/`](./mockups/) — vacío a propósito: ver nota abajo sobre Prospera.
- [`architecture/`](./architecture/) — arquitectura BYOC del ecosistema y el Motor de Discovery
  (N1) heredados del monorepo.
- [`methodology/`](./methodology/) — catálogo de metodologías (BPMN, APQC PCF, ISO 9001/30414,
  RACI, OKR, Hoshin Kanri, BSC, COBIT, TiSDD, etc.) y el precedente ISO (I-05).

## Lo que NO viajó, deliberadamente (doctrina "cero data de cliente")

El mockup visual real del deal Prospera (`mockup-cockpit-prospera.html`), su deck comercial y su
pricing siguen en el repo hermano `prenter/clientes/prospera/` (la EMPRESA, no el producto) —
consultar ahí para ver la referencia visual real de la Vista de Negocio. Tampoco viajaron
`prenter/marketing/source/{offerings/dashboard-directorio.md,pricing.yaml}` (posicionamiento y
precio del producto vendido) — son GTM de la empresa, no del motor. Lo que SÍ viajó es la versión
ya genérica/ficticia del mismo patrón (persona "Mateo Salas / Inmobiliaria Vértice" en
`research/service-design/`).
