# System Backlog — Cockpit (vista humana de [`backlog.yaml`](./backlog.yaml))

> SSoT = `backlog.yaml`. Esta vista se edita en el MISMO evento — si divergen, manda el YAML.
> Prioridades = propuesta de la auditoría CK-11; las firma el operador.

## Panorama

| Columna | Pendiente | En curso | Lo más urgente |
|---|---|---|---|
| **Sistema (transversal)** | 6 | 1 | BL-04 design system · BL-05 poblar método |
| **Vista Negocio (N13)** | 3 | — | BL-11 rol Área · BL-12 auth |
| **Motor Discovery (N1 ★IP)** | 2 | — | BL-13 campaña (decidir arranque) |
| **App del Auditor** | 3 | — | BL-15 definir producto |
| **Contrato datos DevHub→Cockpit** | 1 | — | BL-18 (gatillo: consumidor real) |

## Sistema (transversal)

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-01 | Persona/puesto como entidad de primera clase | alta | **hecho** (CK-12 · CAP-07) |
| BL-02 | Reconciliar objeto.schema (9 entidades) ↔ negocio.schema (4) | alta | **hecho** (CK-13 · CAP-08) |
| BL-03 | Terminar arquitectura / diagrama de despliegue (incluir App Auditor) | alta | **hecho** (CK-14) |
| BL-04 | Design system + atomic design + Storybook as-code | media | pendiente |
| BL-05 | Poblar método: M1 beats 2-3 · M3 etapas 1-5 | media | pendiente |
| BL-06 | negocio.schema: decidir SSoT (plugin vs repo) | media | pendiente |
| BL-07 | Destilar research (sistema vs campaña) | media | en-curso |
| BL-08 | Render de arquitectura.yaml (generador no portado) | baja | **hecho** (CK-15) |
| BL-09 | Borrar carpetas campaign-* originales | baja | pendiente |
| BL-10 | Comprador/pricing/éxito-12-meses | baja | pendiente |
| BL-19 | Voltear negocio.yaml a proyección GENERADA del objeto (D-13/D-04; gatillo: objetivos+brechas poblados) | media | pendiente |

## Vista Negocio (N13) — construida, en evolución

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-11 | Rol Área real (hoy placeholder) | media | pendiente |
| BL-12 | Auth / roles reales | media | pendiente |
| BL-20 | Deuda Go/Next: UI → Vite SPA (consolidada de NODOS en CK-14; conecta BL-04) | media | pendiente |

## Motor de Discovery (N1 ★IP) — sin construir

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-13 | Campaña N1: diseño → construcción | tbd | pendiente |
| BL-14 | Capability "preparación para auditoría" (gatillo: demanda real) | tbd | pendiente |

## App del Auditor — declarada CK-11, sin construir

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-15 | Definir el producto (alcance, stack, patrón instalable) | alta | pendiente |
| BL-16 | Embeber el método como flujo operable (← BL-15) | alta | pendiente |
| BL-17 | Publicación al repo del cliente — "deploy de procesos" (← BL-15) | alta | pendiente |

## Contrato de datos DevHub→Cockpit — diseñado CK-08

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-18 | Implementar Pull API + devhubclient.go (gatillo: consumidor real) | tbd | pendiente |
