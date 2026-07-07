# sistema/ — el sistema as-code

Zona SISTEMA de la tríada (CK-11): los artefactos que **definen el sistema mismo** — no son
documentación de features ni organización de trabajo. Se llama "sistema" (no "app") porque tiene
múltiples puntos de despliegue (ver `arquitectura/NODOS.md`, BYOC): Vista Negocio, Motor de
Discovery, App del Auditor, contrato de datos.

- [`arquitectura/`](./arquitectura/) — `arquitectura.yaml` (arquitectura-como-dato de la célula),
  `ARCHITECTURE.md` (BYOC, 4 capas), `NODOS.md` (13 nodos de despliegue, **falta terminar** —
  BL-03).
- [`metodo/`](./metodo/) — el método del servicio/auditor: catálogo de 31 metodologías
  (`methodologies.yaml` + `METODOLOGIA.md`), doctrina ISO (`ISO-9001-veredicto-I-05.md`),
  levantamiento (`M1-LEVANTAMIENTO.md`), espinazo/PDCA (`M3-ESPINAZO.md`), patrón
  plantilla/instancia (`PROCESS-AS-DATA.md`), conocimiento por nicho (`nichos/`), y
  [`proceso/`](./metodo/proceso/) — el proceso-como-dato (m1 levantamiento · m2 mantenimiento ·
  m3 espinazo). Esto se embebe en la App del Auditor (BL-16).
- [`schema/`](./schema/) — esquemas de datos del dominio: `objeto.schema.yaml` (el modelo de
  negocio normalizado, 9 entidades — SSoT declarado; su reconciliación con el código es BL-02).

Regla: cambiar algo aquí = decisión de sistema → ficha `CK-NN` en el mismo evento. Las otras dos
zonas: código + [`../docs/`](../docs/) (capabilities construidas) · [`../proyecto/`](../proyecto/)
(organización del trabajo).
