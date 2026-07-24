# research/ — investigación de producto

Investigación **viva** del producto. Hoy hay una sola campaña activa; las heredadas del monorepo se
destilaron y se retiraron (ver nota al pie).

## [`rediseno-total/`](./rediseno-total/) — SOTA del rediseño CK-18 (2026-07-08)

Siete investigaciones state-of-the-art que informaron el rediseño de fondo (**Fábrica + Organización
instalada**): repositorio oficial (git/Forgejo), data lakehouse (dlt+DuckLake), knowledge DB
(files-first), distribución/licencias/telemetría (go-tuf v2 + Tauri + Ed25519 + OTLP), auth/RBAC
(embebida policy-as-data), gestión de cambios ISO, y proceso-como-arnés. Empieza por su
[`README.md`](./rediseno-total/README.md). Es el insumo de las fichas de nodo en
[`../../sistema/arquitectura/NODOS.md`](../../sistema/arquitectura/NODOS.md).

---

> **Nota (cierre BL-07):** las tres campañas heredadas del monorepo (`cockpit-negocio`,
> `modelo-objeto`, `service-design`) + `mockups/` se **destilaron a `sistema/` y se borraron** — para
> dejar el repo limpio, sin sesgo por herencia. Sus salidas de sistema viven ahora como as-code:
> - `objeto.schema.yaml` + `ejemplo-vertice.yaml` + `metodologia/` + `DECISIONES.md` →
>   [`../../sistema/schema/`](../../sistema/schema/)
> - `M1-LEVANTAMIENTO.md` / `M3-ESPINAZO.md` / `SERVICE-DESIGN.md` →
>   [`../../sistema/metodo/`](../../sistema/metodo/)
>
> La narrativa de proceso de esas campañas queda solo en la historia git.
