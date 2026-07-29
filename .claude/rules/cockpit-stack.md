# Cockpit — stack + adaptaciones al CORE (project-layer)

> **project-layer · SÍ se edita** (a diferencia del CORE del arnés, byte-idéntico · ver `_HARNESS-CORE.md`).
> Adapta los supuestos del CORE (forjado para un SaaS multitenant con agentes-producto) a lo que Cockpit
> **es**. El seam (`project.config.yaml`) tiene los valores; esta regla fija las **doctrinas** que el CORE
> no puede inferir. **Origen:** CK-19 (adopción del arnés, 2026-07-09).

## Qué es Cockpit (contra los supuestos del CORE)

- **No es SaaS multitenant.** Es un **binario `directorio`** (`go/cmd/directorio`, HTTP :4100) con la UI
  Next.js **exportada estática y embebida** (`go:embed` · `build-ui.sh`), read-only, **sin auth ni DB hoy**.
  → Los escenarios del CORE sobre *tenant isolation / cross-tenant leak / X-Tenant-ID* son **N/A** por
  defecto (declararlos `not_applicable_reason: "single-tenant · binario read-only"`), hasta que exista
  auth+niveles de acceso (historia `cockpit/auth-niveles-acceso-policy-as-data`).
- **No hay agentes-producto** tipo Valeria/Lisa dentro de este repo. Los "trabajadores" del producto son
  los **arneses** que la Fábrica entrega al cliente (N15 Arnesia); acá se construyen con el arnés, no se
  hospeda un engine agéntico. → `type: agentic-story` es raro; la mayoría del backlog es `service-story`.
- **Design system = PRENTER** (adoptado CK-27 · `design_system_ref.status: adopted`). Toda UI se construye
  contra el banco atómico: tokens en `ui/app/globals.css`, átomos en `ui/components/ds/`, catálogo vivo
  embebido en `/design-system`. Doctrina enforce-able: **`[[ui-design-system]]`** (DRY, un solo acento teal,
  atomic design, "Storybook" = ruta embebida no Storybook.js). El § Mockup del CORE se piensa con átomos
  PRENTER existentes. Migración de los organismos legacy (`ui/components/{negocio,shell}/` aún en Tailwind
  ad-hoc, ya re-tematizados a teal por los tokens) a `ds/` = follow-up de `sistema/design-system-atomic-storybook`.

## Toolchain (verbatim en el seam · `toolchain.*`)

- Go 1.23 · módulo `github.com/alpacapurpura/cockpit` — `go vet ./...` · `gofmt` · `go test ./...` · `go build ./...` (todo desde `go/`).
- UI `cockpit-ui` (Next.js) — `npm run lint` · `npm run typecheck` (tsc) · `npm run test` (vitest) · `npm run build`; export estático embebido = `./build-ui.sh`.
- **Gates as-code** (pre-commit · `.githooks/pre-commit`): `gen_arquitectura.py --check` + `gen_metodo.py --check`.

## Live-verify (DoD) — `live_verify_infra`

`cd go && go run ./cmd/directorio` (o `./start.sh`) → ejercer **de verdad** (no "GET 200"):
`GET /api/portfolio` · `GET /api/negocio?empresa=<id>` · `GET /api/objeto?empresa=<id>` (las 20 entidades juntas — D-23 · D-24..D-29).
Evidencia = runtime-logs + el efecto observado en la respuesta/UI.

## Idioma

**Español neutro LATAM** (`locale: es-419`), **sin voseo**. Aplica a copy de producto, microcopy y docs.
(Los archivos del CORE quedan en su redacción original — no se editan.)

## Modelo de dominio

El objeto de negocio normalizado (20 entidades — CK-26 + `apuesta` D-23 + el gobierno del directorio D-24..D-29: `riesgo`·`sesion`·`acuerdo`·`periodo`·`proyeccion_caja`·`presupuesto`·`inversion`; +`puesto`/`arnes` al materializar D-19/D-20) es **`sistema/schema/objeto.schema.yaml`** (SSoT), servido por
`go/objeto.go` → `/api/objeto`. `negocio.yaml` es proyección curada a mano hoy (D-13; voltear a generado = historia
`sistema/negocio-yaml-proyeccion-generada`). Ver `[[metodologia-as-code]]`.

## Los dos ejes as-code propios (lo que el CORE no trae)

Cockpit **amplía** el arnés con dos disciplinas as-code que el CORE no modela — cada una con SSoT + vista
generada + gate anti-drift, gemelas entre sí:
- **Arquitectura** → `.claude/rules/arquitectura-as-code.md` (supersede `paradigm-arquitectura.md`).
- **Metodología** → `.claude/rules/metodologia-as-code.md` (eje nuevo, sin equivalente en el CORE).

## Referencias

- `project.config.yaml` — el seam (todos los valores concretos).
- `.claude/rules/_HARNESS-CORE.md` — qué es CORE (no editar) vs project-layer.
- `VISION.md` · `LEDGER.md` (CK-NN) · `docs/product/` (SSoT de historias/capabilities).
