# Twin como Territorio — mockup de concepto (2026-07-20)

Prototipo interactivo del **paradigma de visualización del twin** (N13): la organización como **un mapa
navegable** con **zoom semántico** (organización → área → proceso-lienzo → detalle) y **capas
conmutables** que se pintan encima (estructura · hilo de oro · salud · brechas · cinética).

## Qué hay

- **`index.html`** — mockup autocontenido (un solo archivo · vanilla JS/SVG · PRENTER dark/teal ·
  datos canned de terranova). Abrir en el navegador. No wirea Go/Next — es concepto, no la app real.
- **Artifact publicado (privado del operador):**
  https://claude.ai/code/artifact/20907d03-3979-42f2-b5c8-b33fa5e383f6

## Cómo iterar (conversación nueva)

1. Editar `index.html` (aplicar los comentarios visuales del operador).
2. Re-publicar con la tool Artifact pasando `url` = el artifact de arriba → mantiene el mismo link.
3. Verificar en navegador (chrome-devtools): emular tema claro para confirmar dark-only, revisar z0/z1/z2.

## Contexto

- **Historia (SSoT):** `docs/product/stories/cockpit/twin-territorio-mapa-zoomable/` (`state: idea`) —
  ahí está TODO el concepto, las decisiones, el anclaje metodológico, el veredicto técnico y los
  **ajustes PENDIENTES** del operador.
- **Inspiración de canvas:** `~/Proyectos/harness-studio` (repo hermano — Organigrama = React Flow;
  map-canvas swim-lane = HTML+SVG a mano).
- **Dato:** shell real `~/Proyectos/terranova`.
- **Design system:** PRENTER (`.claude/rules/ui-design-system.md`).
- Relacionado con la sesión previa: `../revision-ds-twin-2026-07-20/` (adopción PRENTER + twin visual CK-27).
