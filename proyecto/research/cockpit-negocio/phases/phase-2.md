# Fase 2 — Sistemas no-dev de primera clase (la bisagra)

**Meta:** un sistema sin backlog SDD (Odoo, externo, terciarizado) es **elegible** en el desplegable de Sistema y, al seleccionarlo, muestra una **vista "overview"** (procedencia · estado · dueño · ref · "sin telemetría aún") en vez de romper las vistas brand-scoped. Odoo aparece en el desplegable de cada empresa.

> Borrador — **es la fase de mayor riesgo** (toca el supuesto de que todo sistema = proyecto de software). Diseñar a fondo y confirmar ANTES de codear. Es el primer ladrillo del cockpit-de-negocio.

## Down-payment que dejó Fase 1 (I-40 · arrancar desde acá)
- **El árbol ya está en el cliente:** el `BrandProvider` expone `tree: PortfolioTree` (de `/api/portfolio`) + `empresa`/`setEmpresa` (`components/providers/BrandProvider.tsx`). No hace falta otro fetch; el árbol trae `procedencia`, `ref`, `navegable` por sistema.
- **Ya existe un placeholder de overview (a nivel EMPRESA):** `NoSystemPlaceholder` en `AppShell.tsx` se muestra cuando la empresa seleccionada no tiene sistema navegable (prenter). Fase 2 = el **gemelo a nivel SISTEMA** (seleccionar el gap Odoo bajo una empresa navegable → overview de ESE sistema). Reusar/generalizar el patrón, no inventar de cero.
- **Los gaps ya se ven, falta hacerlos elegibles:** hoy son `<option disabled>` en el dropdown Sistema (`BrandSwitcher.tsx`). Fase 2 = quitarles `disabled`, darles una key (ej. `empresa/odoo`), y que `setBrand` a esa key NO rompa las vistas brand-scoped (router → overview).
- **El helper `empresaHasNavegable` ya distingue** instrumentada de solo-gaps; Fase 2 necesita el equivalente a nivel sistema (`sistemaNavegable(key)`), o derivar del árbol directo.
- **Cuidado (lección Fase 1):** las rutas `/api/*` viven SOLO en el binario Go (no hay `app/api/portfolio/route.ts`). Un endpoint nuevo de "system overview" = handler Go + (si se quiere dev) su route TS. Y `resolveBrand`/`brandPath` fallan para no-workspaces → el router debe interceptar ANTES de que las vistas fetcheen.

## El problema de fondo
Todas las vistas (Board, Mapa, Roadmap…) asumen `docs/product/stories|capabilities`. Odoo no es un workspace-brand → `resolveBrand`/`brandPath` fallan. Hacerlo elegible exige que el cockpit sepa representar un sistema que NO es proyecto de dev.

## Enfoque candidato (a validar)
- Modelo: un sistema lleva su `navegable` (ya está en `/api/portfolio`). El selector incluye los no-navegables con key tipo `empresa/odoo`.
- Backend: endpoint/payload de "system overview" para no-navegables (procedencia, ref, estado de digitalización, dueño del servicio compartido).
- UI: vista `Overview` que renderiza cuando el sistema no es navegable; las vistas brand-scoped muestran "no aplica / sin datos" en vez de error.
- Coherencia con `/directorio` (que ya muestra gaps).

## Preguntas a resolver
- ¿`active`/`navegable` cómo interactúan con el resto de vistas? ¿router redirige a /overview si no-navegable?
- ¿La vista overview es por-empresa (Odoo scoped a su company) o global? (Scoped — ver modelo.)
- ¿Qué "estado de digitalización" mostramos hoy? (semáforo manual/externo/integrado del mockup Prospera = primitivo a reusar.)

## Criterios de salida
- [ ] Seleccionar Odoo bajo Vitalia → overview con procedencia + "no instrumentado"; nada se rompe.
- [ ] gates/tests verdes; smoke + screenshot.
- [ ] Journal + State + NEXT-PROMPT (Fase 3).
