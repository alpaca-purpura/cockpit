# docs/ — documentación de las capabilities construidas

Zona CAPABILITIES de la tríada (CK-11): documentation-as-code de lo **ya desarrollado y
funcional** (el código vive en `go/` y `ui/`).

- [`increment.yaml`](./increment.yaml) — **Product Increment** (SSoT, as-code): capabilities
  funcionales verificadas (`CAP-NN`), cada una cableada a los componentes `estado: activo` de
  `sistema/arquitectura/arquitectura.yaml`. Vista humana: [`INCREMENT.md`](./INCREMENT.md)
  (mismo evento). La puerta de entrada: nada figura aquí sin correr de verdad.
- Documentación por capability — a medida que crezcan (hoy el arranque está en el
  [`README.md`](../README.md) raíz: puertos, scripts, dev).

Las otras zonas: [`../sistema/`](../sistema/) (arquitectura, schemas, método — el sistema
as-code) · [`../proyecto/`](../proyecto/) (backlog, research — organización del trabajo).

> Nota histórica: hasta CK-11 este directorio contenía la herencia de la incubadora
> (architecture/methodology/research/mockups). Se redistribuyó en la tríada: architecture y
> methodology → `sistema/` · research y mockups → `proyecto/research/`. En BL-07 las campañas
> heredadas se destilaron a `sistema/` y se borraron; queda solo la investigación viva
> (`proyecto/research/rediseno-total/`).
