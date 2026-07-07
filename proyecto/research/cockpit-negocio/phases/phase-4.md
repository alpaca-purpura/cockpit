# Fase 4 — Cockpit = herramienta de negocio (estrategia + modelo)

**Meta:** evolucionar el cockpit de visor SDD a **monitor de negocio**: modelar por empresa sus **procesos · objetivos · indicadores · gaps de digitalización**, no solo stories de software. Producir una **ficha I-NN** en `alpaca-harness/tooling/strategy/PRODUCT-VISION.md` + un primer slice de la vista de negocio.

> Borrador — es producto/estrategia, no parche. Conversar el destino con el operador antes de codear. Probablemente se sub-divide en su propia mini-campaña.

## Anclas (no inventar desde cero)
- Visión original: monitorear procesos/personas/sistemas vs objetivos; mostrar gaps de digitalización y cuellos de botella.
- `products/docs/architecture/NODOS.md` (BYOC, 12 nodos) y el M1·Levantamiento (`service/`) ya modelan parte de esto.
- Mockup Prospera (`clients/prospera/.../mockup-cockpit-prospera.html`): organigrama navegable + semáforo de digitalización (manual/externo/integrado) + meta→puesto + indicadores del directorio. Es la referencia visual del cockpit-de-negocio.
- Capabilities / SYSTEM-MAP existentes en cockpit — ¿reusar o extender?

## Preguntas grandes
- ¿El modelo de "proceso" y "objetivo/indicador" es nuevo o extiende capabilities? ¿dónde vive el dato (frontmatter del workspace)?
- ¿Cómo se relaciona con la lente de finanzas (Odoo)? (la capa Dueño es donde convergen).
- ¿Esto es producto para CLIENTES (cada cliente ve su negocio) además del portfolio propio? (sí — es la visión comercial; ver positioning).

## Criterios de salida
- [ ] Ficha I-NN ratificada con el modelo y el roadmap.
- [ ] Primer slice navegable (ej. vista de procesos/gaps de una empresa).
- [ ] Journal + State. Cierre de campaña o spin-off.
