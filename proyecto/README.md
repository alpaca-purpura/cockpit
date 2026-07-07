# proyecto/ — cómo nos organizamos para construir (NO es parte del sistema)

Zona PROYECTO de la tríada (CK-11): aquí vive la organización del trabajo — qué falta, qué
viene, y la historia de cómo se investigó. Nada de aquí se embebe ni se entrega; es el andamio,
no el edificio.

- [`backlog.yaml`](./backlog.yaml) — **System Backlog** (SSoT, as-code): trabajo pendiente por
  subsistema. [`BACKLOG.md`](./BACKLOG.md) es su vista humana (mismo evento de edición, jamás
  divergen).
- [`research/`](./research/) — campañas de investigación heredadas (cockpit-negocio,
  modelo-objeto, service-design) + mockups. Leer índices antes de investigar desde cero.

Los otros dos documentos de proyecto viven en la raíz por convención del arnés:
[`../VISION.md`](../VISION.md) (norte) y [`../LEDGER.md`](../LEDGER.md) (decisiones `CK-NN`).

## El ciclo ("nacemos ordenados")

1. **Idea/necesidad nueva** → ítem en `backlog.yaml` PRIMERO. Se construye después.
2. **Decisión de alcance/arquitectura/visión** → ficha `CK-NN` en `LEDGER.md`; el ítem la
   referencia. Los artefactos as-code afectados (`sistema/…`, backlog) se editan en el MISMO
   evento.
3. **Construir** → ítem `en-curso`. Toda capability se construye contra el sistema as-code
   (`sistema/arquitectura/`, `sistema/schema/`, design system cuando exista — BL-04).
4. **Terminado Y verificado** → ítem `hecho` + entrada en [`../docs/INCREMENT.md`](../docs/INCREMENT.md)
   si es capability funcional.

La prioridad la firma el operador — el agente propone, no decide.
