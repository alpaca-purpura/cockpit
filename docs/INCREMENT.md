# Product Increment — capabilities funcionales de Cockpit (vista humana de [`increment.yaml`](./increment.yaml))

> SSoT = `increment.yaml` (CAP-NN, as-code — cada capability referencia los componentes
> `estado: activo` de `sistema/arquitectura/arquitectura.yaml`). Esta vista se edita en el MISMO
> evento — si divergen, manda el YAML. Entra aquí solo lo que corre de verdad: un ítem del
> backlog llega acá al quedar `hecho` y verificado, en el mismo evento.

## Estado: verificado standalone 2026-07-06 (CK-10) — go build/vet/test + tsc/vitest + export estático

| ID | Capability | Qué hace | Dónde vive | Fichas |
|---|---|---|---|---|
| CAP-01 | **Runtime propio — binario `directorio`** | Servidor HTTP puerto 4100; sirve las APIs + la UI embebida (`go:embed`, export estático Next). Modos single-workspace y multi (registry `~/.cockpit/cockpit.yaml`). Solo lectura — sin auth, sin DB. | `go/cmd/directorio/` | CK-07, CK-08 |
| CAP-02 | **API portfolio** — `GET /api/portfolio` | Árbol Dueño→Empresa→Sistema; distingue sistemas navegables (instrumentados) vs gaps de digitalización (Odoo compartido/externo/terciarizado/propio sin instrumentar). Registry fresh por request. | `go/portfolio.go` | CK-02, CK-05 |
| CAP-03 | **API negocio** — `GET /api/negocio?empresa=` | Lee `empresa/negocio.yaml`, valida (warnings no fatales sobre enums/refs), sirve el diagnóstico: objetivos + áreas/procesos + brechas. Sin archivo → empty-state. | `go/negocio.go` | CK-05 |
| CAP-04 | **Vista de Negocio** (`/negocio`) | Objetivos del directorio (KR from→to) que tensan el Hilo de Oro sobre 3 sub-tabs: Mapa vivo (semáforo de digitalización) · Hilo de oro (cascada objetivo→procesos + huérfanos) · Brechas (caso de negocio + prioridad); drawer de drill-down por proceso (procedencia/confianza); banner de warnings. | `ui/components/negocio/NegocioView.tsx` | CK-06 |
| CAP-05 | **Shell por rol + selector de empresa** | Sidebar con selector de Empresa y nav por rol — Directorio vivo; Área/Consultor placeholders "próximamente". | `ui/components/shell/` | CK-06 |
| CAP-06 | **Modelo de portfolio** (TS puro) | Funciones/tipos de navegación Empresa→Sistema, deep-link URL. 25 tests vitest. | `ui/lib/portfolio.ts` | CK-02 |

## Lo que NO está construido (no confundir con lo de arriba)

Motor de Discovery (N1) · App del Auditor · contrato de datos DevHub→Cockpit · ingesta
multi-fuente As-Is/To-Be · roles Área/Consultor reales · auth · preparación-auditoría · modelo de
9 entidades en código. Todo eso vive en [`proyecto/backlog.yaml`](../proyecto/backlog.yaml).
