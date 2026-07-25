# 06 · Pendientes abiertos + ideas mencionadas y NO aterrizadas

> Parte del dossier. Minado del transcript de la conversación "Analizar visión y metodología del
> cockpit" (2026-07-24) + estado v8.2. Esto es lo que una sesión nueva NO encontraría en ningún
> otro doc. Nada de aquí está ratificado como decisión — son insumos.

## ✓ Deuda abierta #1 — CERRADA en la sesión 2026-07-25

07:26 de la sesión 2026-07-24, verbatim: *"Tengo muchos comentarios… Quiero terminar la próxima
sesión con el mockup de la visión completa de cómo quiero que quede el cockpit, de inicio a fin."*
Esos comentarios no se habían dado en v7-v8.2. **En la sesión 2026-07-25 sí se dieron, en vivo**
(el operador entró al mockup con su propio Chrome vía claude-in-chrome): encoding roto al servir
local, 2 bugs reales de interacción (ver `03-decisiones-y-porques.md` decisiones 19-20), y 3
iteraciones de la notación por tipo hasta la v3 con íconos dibujados (decisión 18). Detalle completo
del código: `02-mockup-guia-completa.md § 0.1`.

## ⚠ Pendiente nuevo — de la sesión 2026-07-25

- **Republicar al Artifact** — el link publicado (`claude.ai/code/artifact/20907d03-…`) sigue
  mostrando la versión PRE-sesión; el HTML del repo ya tiene todo (notación v3 + los 2 fixes).
  Republicar pasando `url` al mismo artifact cuando el operador confirme que quiere verlo ahí.
- **Sin commitear** — los cambios están en el working tree, no en un commit. Incluye ahora
  (sesión 2026-07-25 cont.) la **decisión 22 · materiales por capa ArchiMate** horneada en
  `index.html` (tokens `--mat-*` + bloque CSS antes de `</style>`) — ratificada "me gusta V2".
- **QA visual no exhaustivo** de los 3 íconos del funnel Mejora (idea/brecha/proyecto) y de kpi
  (barras) — se verificaron con crops reales pero no en TODAS las vistas donde aparecen (drawer,
  ficha). Revisar si aparece algo roto al seguir iterando.
- **La v3 (íconos) está construida pero el operador todavía NO dio el "me gusta" final** — falta su
  confirmación explícita antes de tratarla como ratificada/decisión de fondo (CK-NN o D-19).
- **capability, empresa, persona sin badge propio** — no tienen contenedor dedicado en el mapa
  (persona vive dentro del chip de `rol`). Si el operador los quiere en el mapa, es una superficie
  nueva, no un ícono suelto — evaluar en el refinamiento.
- **Fase 3 (descartada por ahora, no pedida):** acento de borde por capa ArchiMate (Business/
  Application/Motivation/Strategy/Implementation) — se ofreció como escalón siguiente si el ícono
  solo no alcanzaba; con la v3 (pictograma) no hizo falta. Queda anotada por si se revive.

## Ideas propuestas en conversación, sin destino escrito (evaluar en refinamiento)

1. **Bandeja de decisiones (inbox, no dashboard)** — propuesta como "segunda superficie" y
   probable **centro de gravedad del uso diario**: apuestas por sellar, cambios dev→UAT→prod por
   aprobar, KPIs que cruzaron umbral, brechas con business case listo. Hoy NO existe en mockup ni
   docs (grep = 0). Conecta con la tesis "el moat está en los WRITES".
2. **Home por nivel de acceso** — "el hilo de oro ES la navegación, no una vista más": el sponsor
   toca poco y con peso (momentos rituales, casi-reportería); analista de calidad/jefaturas viven
   adentro a diario. Los edges v6 materializan el hilo; el home-por-rol NO. Conecta con
   `auth-niveles-acceso-policy-as-data`.
3. **Identidad de producto: "no Grafana, no VS Code — es ArgoCD / torre de control"** — analogía
   que quedó solo en conversación; útil para pitch y docs de visión.
4. **Territorio propio para nodos hoja** — ofrecimiento abierto sin respuesta del operador: hoy
   persona/sistema/KPI son fichas (nodos hoja, no contenedores — límite deliberado v5); si el
   operador quiere mini-mapa por rol, se itera.
5. **Las 8 familias doctrinales** — síntesis del dogma hecha en conversación (epistemología ·
   ontología-Palantir · autoridad · anti-especulación · anti-entropía · frontera ética · economía
   de contexto · dos planos) sin destino escrito. Candidata a `docs/metodo/` o VISION.
6. **Riesgo "doctrina por delante de sustancia"** — señalado con números: 12/~60 pasos del proceso
   poblados, 35/45 M-cards sin operacionalizar. El antídoto nombrado: poblar (R1) y **compilar el
   primer arnés REAL desde la SSoT** (R4) — donde la doctrina se vuelve producto.

## Tensión de fondo a resolver en el refinamiento

**Reportería ↔ volante.** Lectura honesta pedida por el operador: lo construido es el extremo
reportería; *"el riesgo real es quedarse cómodo ahí: cada sprint de visualización se siente
progreso y ninguno acerca al diferenciador. El moat entero está en los WRITES: sellar, aprobar,
promover, ciclo de proyecto."* El mockup ya insinúa los writes (acciones kinéticas → cola de
Cambios); la app real debe priorizarlos, no dejarlos de adorno.

## Menores sin trackear (verificar en v8.2 antes de construir)

- **z1 con mucho espacio muerto abajo** — hallazgo A#15 de la auditoría de esa sesión; los otros
  dos menores de la lista se arreglaron, este quedó sin verificar.
- Artifact temporal de debug `a6b775ae-…` en la galería del operador — borrable.
- z1 solo accesible vía piel Organigrama — ¿el Mapa de Valor necesita drill intermedio propio o
  basta chevron→ficha→lienzo? (pendiente conocido del HANDOFF).

## Deuda de programación ya fichada (detalle en `05-construccion-real.md`)

Wiring Go de `tareas[]` (D-17) · motor de triage que ejecute `triage.yaml` (D-18) · shell
territorio en `cockpit-ui` (migración lente-por-lente desde las 4 tabs).

## Guiones de demo implícitos (no perderlos)

- **Hilo**: click "Caja sana en todos los proyectos" → baja hasta Nubecont/Banca pasando por
  Cobranza y el arnés v1⚠ del Jefe de Cobranza.
- **Triage→fábrica**: p-cob:3 (agente 72, RTLX 71) → "candidato a skill" → idea i-agente →
  funil → (futuro) recompilar arnés.
- **Loop cerrado**: pm-cie → delta observado → veredicto "movió" → h-cont v2 recompilado.
- **Gap agéntico**: capa Trabajo ON → grises por todos lados → "4/40 puestos".
- **Corrida**: idmenu → what-if → diff → impactos → gate → cola de Cambios.
