# sistema/ — el sistema as-code

Zona SISTEMA de la tríada (CK-11): los artefactos que **definen el sistema mismo** — no son
documentación de features ni organización de trabajo. Se llama "sistema" (no "app") porque tiene
múltiples puntos de despliegue (ver `arquitectura/NODOS.md`) en tres planos (CK-18): **Fabricante**
(Arnesia, Repositorio Maestro, distribución/licencias) · **Organización** (Cockpit, Repositorio
Oficial, Data Lakehouse) · **Edge** (Consultio, Colab Studio, DevStudio sobre Claude Code).

- [`arquitectura/`](./arquitectura/) — `arquitectura.yaml` (arquitectura-como-dato de la célula),
  `ARCHITECTURE.md` (visión CTO — su cuerpo Control/Data Plane es historia pre-CK-18, ver su banner),
  `NODOS.md` (**16 fichas de nodo, SSoT** — Fabricante/Organización/Edge, CK-18) + `despliegue.html`.
- [`metodo/`](./metodo/) — el método del servicio/auditor: catálogo de 31 metodologías
  (`methodologies.yaml` + `METODOLOGIA.md`), doctrina ISO (`ISO-9001-veredicto-I-05.md`),
  levantamiento (`M1-LEVANTAMIENTO.md`), espinazo/PDCA (`M3-ESPINAZO.md`), patrón
  plantilla/instancia (`PROCESS-AS-DATA.md`), conocimiento por nicho (`nichos/`), y
  [`proceso/`](./metodo/proceso/) — el proceso-como-dato (m1 levantamiento · m2 mantenimiento ·
  m3 espinazo). Esto se empaqueta en arneses (Arnesia/N15) que cargan las apps del edge — Consultio
  (N14, ex App del Auditor) y Colab Studio (N17) (BL-15/16/26).
- [`schema/`](./schema/) — esquemas de datos del dominio: `objeto.schema.yaml` (el modelo de
  negocio normalizado, 9 entidades — SSoT declarado; su reconciliación con el código es BL-02),
  `ejemplo-vertice.yaml` (fixture de validación END-TO-END del contrato), `metodologia/` (el *porqué*
  de cada campo — norma/marco, 5 docs) y `DECISIONES.md` (ADR del modelo, D-01..D-16). Destilados de la
  campaña `modelo-objeto` al cerrar BL-07 (la campaña se borró; esto es el hogar del modelo).

Regla: cambiar algo aquí = decisión de sistema → ficha `CK-NN` en el mismo evento. Las otras dos
zonas: código + [`../docs/`](../docs/) (capabilities construidas) · [`../proyecto/`](../proyecto/)
(organización del trabajo).
