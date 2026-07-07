# System Backlog — Cockpit (vista humana de [`backlog.yaml`](./backlog.yaml))

> SSoT = `backlog.yaml`. Esta vista se edita en el MISMO evento — si divergen, manda el YAML.
> Prioridades = propuesta de la auditoría CK-11; las firma el operador.

## Panorama

| Columna | Pendiente | En curso | Lo más urgente |
|---|---|---|---|
| **Sistema (transversal)** | 9 | 1 | BL-01 persona/puesto · BL-02 schemas · BL-03 arquitectura |
| **Vista Negocio (N13)** | 2 | — | BL-11 rol Área · BL-12 auth |
| **Motor Discovery (N1 ★IP)** | 2 | — | BL-13 campaña (decidir arranque) |
| **App del Auditor** | 3 | — | BL-15 definir producto |
| **Contrato datos DevHub→Cockpit** | 1 | — | BL-18 (gatillo: consumidor real) |

## Sistema (transversal)

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-01 | Persona/puesto como entidad de primera clase | alta | pendiente |
| BL-02 | Reconciliar objeto.schema (9 entidades) ↔ negocio.schema (4) | alta | pendiente |
| BL-03 | Terminar arquitectura / diagrama de despliegue (incluir App Auditor) | alta | pendiente |
| BL-04 | Design system + atomic design + Storybook as-code | media | pendiente |
| BL-05 | Poblar método: M1 beats 2-3 · M3 etapas 1-5 | media | pendiente |
| BL-06 | negocio.schema: decidir SSoT (plugin vs repo) | media | pendiente |
| BL-07 | Destilar research (sistema vs campaña) | media | en-curso |
| BL-08 | Render de arquitectura.yaml (generador no portado) | baja | pendiente |
| BL-09 | Borrar carpetas campaign-* originales | baja | pendiente |
| BL-10 | Comprador/pricing/éxito-12-meses | baja | pendiente |

## Vista Negocio (N13) — construida, en evolución

| ID | Ítem | Prioridad | Estado |
|---|---|---|---|
| BL-11 | Rol Área real (hoy placeholder) | media | pendiente |
| BL-12 | Auth / roles reales | media | pendiente |

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
