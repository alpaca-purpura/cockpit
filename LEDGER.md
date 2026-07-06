# Ledger — Cockpit (fichas CK-NN)

> Continuidad: este repo nació de la graduación de la célula P1 del monorepo `prenter-harness`
> (2026-07-06). CK-01..CK-08 (fundación + extracción Stage 1-4) y CK-09 (la ficha de graduación)
> quedan allá, en `products/cockpit/LEDGER.md`, congelados como historia. Aquí arranca **CK-10** —
> misma numeración, sin romper identidad (a diferencia de otras graduaciones del mismo ecosistema
> que sí rompieron prefijo; decisión explícita del operador, ver CK-10).

## Fichas

### CK-10 · Fundación del repo propio — graduación de P1 con visión ampliada — `decidida` · `vig:vigente`

*Cruda (operador, 2026-07-06):* "Promueve el producto cockpit a una carpeta propia con un
repositorio propio... el proyecto se llamará Cockpit y su visión es la de ser un sistema para el
levantamiento, diseño, creación, propagación/adopción, monitoreo y mejora continua de procesos /
roles / objetivos / personas (puestos) basados en las buenas prácticas ISO... a este repositorio
traslada de forma ordenada todo lo avanzado con la lógica que tenemos de producto y servicio... y
que los mockups/investigaciones no se pierdan, que queden cableados para revisarlos cuando se
pida investigar."

*Desarrollo:* graduación ejecutada tras auditoría de 4 subagentes (metodología ya existente en el
monorepo · inventario de investigación/mockups dispersos · plantilla de las 3 graduaciones previas
del mismo ecosistema — DevHub/Kit/Harness Studio · relevancia de skills). Repo `~/Proyectos/cockpit`
(remote `alpacapurpura/cockpit`, privado) nacido con: código migrado byte-a-byte desde
`products/cockpit/` (Go module renombrado `github.com/alpacapurpura/cockpit`, UI renombrada
`cockpit-ui`) y **verificado standalone** (go build/vet/test + UI tsc/vitest + export estático
real — cero dependencia del monorepo de origen); VISION.md ampliada (identidad = 4 pilares
procesos/roles/objetivos/personas, marco ISO intermedio — ver fork abajo); LEDGER propio
continuando `CK-NN`; `docs/{research,mockups,architecture,methodology}/` con el material heredado
curado (campañas cockpit-negocio y modelo-objeto, subset de NODOS.md/ARCHITECTURE.md, M-cards de
gestión empresarial del catálogo de 31 metodologías); kit dev instalado como plugin
(`harness@prenter-marketplace`, canal estable, scope project).

**Forks firmados por AskUserQuestion:**
- **Alcance ISO = "marco entre ambos"** — ontología+PDCA como columna vertebral (hereda el
  veredicto I-05 del monorepo, "roba la ontología, rechaza el aparato") MÁS una capability futura
  declarada (no construida) de "preparación para auditoría" — gap-checklist vs. norma, sin aparato
  de certificación. Ver VISION.md §ISO.
- **Prefijo del ledger = continuar `CK-NN`** (no romper a uno nuevo, a diferencia del precedente de
  Harness Studio) — la identidad "Cockpit" no muta, solo se amplía.

**Deudas declaradas:**
- Persona/puesto sin modelo de dato propio (`negocio.schema` lo trata como texto libre) — hueco
  más grande identificado por la auditoría de metodología, candidato a CK-11.
- El mockup real y el pricing del deal Prospera NO viajaron (doctrina I-39 "cero data de cliente")
  — quedan en `prenter/clientes/prospera/`, solo referenciados desde `docs/research/`.
- `arquitectura.yaml` (heredado) sigue apuntando a fichas CK-01..CK-08 y a un generador
  (`gen_arquitectura_cockpit.py`) que vivía en el monorepo — no se portó el generador; el YAML
  queda como documentación curada a mano hasta que se decida si vale la pena un render propio.
- La campaña `~/Proyectos/campaign-cockpit-negocio/` estaba marcada "temporal, bórrala al cierre"
  en el monorepo de origen — su contenido fue rescatado a `docs/research/`, pero la carpeta
  original NO fue borrada (decisión del operador, no de esta sesión).

*Conecta:* ficha ecosistema en `tooling/strategy/LEDGER.md` del monorepo (graduación de P1, 4/4
productos graduados) · CK-09 (la ficha de graduación, lado viejo) · I-39 (cero data de cliente) ·
I-78/I-79/I-80 (precedentes DevHub/Kit/Harness Studio, mecánica replicada) · I-05 (veredicto ISO
heredado y ampliado aquí).

*Siguiente:* modelar persona/puesto como entidad de primera clase (CK-11) · decidir si el Motor de
Discovery (N1) arranca campaña propia.

<!-- Próximas: CK-11, … -->

## Log

| Fecha | Decisión | Fichas |
|---|---|---|
| 2026-07-06 | Graduación de P1 con visión ampliada (4 pilares: procesos/roles/objetivos/personas, marco ISO intermedio); código migrado y verificado standalone; investigación/mockups heredados curados en `docs/`; kit dev como plugin. | CK-10 |
