# HANDOFF — continuar el mockup del twin (sesión 2026-07-24 → siguiente)

> **Para la sesión que continúa.** Leer esto + `00-story.md` de la historia
> (`docs/product/stories/cockpit/twin-territorio-mapa-zoomable/`) ANTES de tocar nada.
> **Objetivo de la próxima sesión (pedido del operador):** terminar el **mockup de la visión
> COMPLETA del cockpit, de inicio a fin** — el operador llega con VARIOS comentarios nuevos.

## Estado actual (v8 · publicado)

- **v8 (2026-07-24, decisiones 16-17):** escalera completa z0→z2→z3→arnés (APQC L1-L5 × ISO 10013) —
  z2 CARACTERIZADO (header C1 ISO 4.4.1 + puertos SIPOC como geografía) · z3 instrucción de trabajo
  (tareas + M36 dos scores con inputs + RACI/RTLX + flujos saltables + piso arnés CK-29) · empresa
  entera ~100 personas (nómina en `personasExtra`, 27 puestos ×N, 40 roles) · 11 lienzos plenos
  (`DATA.lienzos` — incluye Permisos = P03 del SOMA con g-dep/g-doc) · 14 instrucciones (`DATA.z3`,
  key `'pid:ord'`) · SIPOC 17 (`DATA.sipoc` + `sipocC1`) · Salud = lentes color-by. Suite 19/19.
- **Archivo único:** `index.html` (este directorio) — autocontenido, vanilla JS/SVG, PRENTER dark/teal,
  datos canned de Terranova. ~2300 líneas.
- **Artifact (mismo URL siempre):** `https://claude.ai/code/artifact/20907d03-3979-42f2-b5c8-b33fa5e383f6`
  → republicar con tool Artifact pasando `url` (desde otra conversación) o mismo file_path (misma).
  **El CDN tarda minutos en propagar** → tras publicar, verificar con WebFetch (busca un marcador del
  cambio en el HTML servido) y avisar al operador que haga Ctrl+Shift+R.
- **Territorio (z0) = El Mapa de Valor** (decisión 15, ratificada): 5 bandas — Estrategia (objetivos
  por perspectiva BSC, causalidad = arcos internos) · Cadena de valor (8 misionales con mini-pasos =
  lenguaje fractal Arnesia) · Apoyo (transversales anchos) · Gente & arneses (15 puestos, ⛨) ·
  Sistemas (ancho = procesos servidos). **Hilo de oro = edges verticales**: tenues siempre, click en
  objetivo → su hilo se enciende cruzando bandas. Organigrama = piel secundaria ("estructura como lente").
- **Resto:** z1 área (piel org → drill) · z2 lienzo Cobranza (carriles+flujos alternos) · módulos
  Mejora (funil ideas→brechas→proyectos→KPI movido) · Método (M1/M2/M3) · Cambios (ISO + SC-14
  recompilación de arnés) · corrida what-if · fichas universales de las 12 entidades (viaje CK-29)
  · capa Trabajo (arneses por puesto).

## Mapa del código (grep anchors en index.html)

| Qué | Anchor |
|---|---|
| Datos (empresa/objetivos/áreas/procesos/brechas/KPIs/proyectos) | `const DATA` |
| Datos CK-29 (personasExtra/sistemas/capabilities/arneses/conocimiento/ideas) | `CK-29: el cerebro completo` |
| Cadena de valor + pasos mini | `v6 · Mapa de Valor: la cadena misional` |
| Motor semáforo KPI | `function semaforo` |
| Helpers arneses + wireLinks (viaje universal) | `CK-29: arneses por puesto — helpers` |
| Mapa de Valor (z0 default) | `function renderValor` |
| Organigrama (piel lente) | `function renderOrganigrama` |
| z1 / z2 | `function renderArea` / `function renderLienzo` |
| Módulos | `function renderMejora` / `renderMetodo` / `renderCambios` |
| Sala de mando + fichas | `function inspectorHome` / `openProceso|openRol|openArnes|…` |
| Capas por vista | `CAPAS_APLICAN` |

## Doctrina de VERIFICACIÓN (aprendida a golpes — NO regresionar)

1. **`element.click()` MIENTE** — salta el hit-testing. Verificar SIEMPRE con
   `document.elementFromPoint(x,y)` + dispatch con coordenadas (ver `verify.sh`, suite 9/9).
2. **Todo overlay full-cover nace con `pointer-events:none`** (+ `> * {auto}`). El bug v5.0: la capa
   de pins se tragaba TODOS los clicks del mouse y ningún test lo vio.
3. En headless con `--virtual-time-budget`, esperar ≥1200ms antes de tocar (carrera con primer layout).
4. Chrome-devtools MCP se rompe con este WM (maximiza ventanas → `Browser.setContentsSize` falla) y
   con perfil compartido (HB-73: `export HARNESS_LANE=<lane>` ANTES de lanzar claude). Fallbacks que
   SÍ funcionan: (a) headless CLI + suite inyectada, (b) **claude-in-chrome** (Chrome real del
   operador, logueado en claude.ai — sirve para probar el artifact REAL). Ojo claude-in-chrome: la
   inyección CDP en iframes cross-origin cae con offset de escala — clickear por elemento visible en
   screenshot fresco y confirmar el efecto, o instrumentar la página con un logger on-screen de eventos.
5. Iterar → correr `./verify.sh` → screenshot headless de los estados tocados → commit → republicar.

Anchors v8: `function renderInstruccion` (z3) · `drillActividad` · `DATA.z3` · `sipoc:{`/`sipocC1:{` ·
`lienzos:{` · `.portbox`/`.c1row`/`.z3card`/`.piso-arnes` (CSS). Back = escalera de a un peldaño.

## ⚠ EN CURSO — deuda consciente ratificada "resuelve todo de una vez" (sesión colgada 2026-07-24)

Estado git: TODO commiteado hasta `4a9a365` (v8.1) · artifact publicado v8.1 · working tree limpio.
Las 3 tareas ratificadas quedaron SIN EMPEZAR (solo inventario del voseo hecho):

1. **Barrido voseo → tuteo neutro (es-419, `[[cockpit-stack]]`)** en `index.html`. Inventario
   (líneas drifean — re-grepear): 8 instancias — `tocá` ×3, `Tocá` ×4, `prendé` ×1. Grep verbatim:
   `grep -n "Tocá\|tocá\|prendé\|Volvé\|volvé" index.html` → reemplazar por Toca/toca/prende/Vuelve.
   Meta: grep = 0. OJO: solo microcopy; no tocar datos/nombres.
2. **Clamp de zoom en fit() de z2 y z3**: zoom mínimo ~0.6, anclado al INICIO del flujo
   (izquierda — puertos S·I y primeras actividades legibles); el resto se alcanza con pan/rueda +
   minimapa. Hoy `fit()` encoge a 35-42% en lienzos de 9 actividades (p-perm). Implementación:
   variante de fit con clamp llamada solo desde `renderLienzo()` y `renderInstruccion()` (~10 líneas).
   Mismo trade-off ya ratificado en z0 (decisión 3 + LOD).
3. **Ficha D-NN PROPUESTA en `sistema/schema/DECISIONES.md`**: subesquema `tarea` bajo `actividad`
   — `{orden, verbo?, texto, sistemas_ref?}`, `met: "ISO 10013 nivel 3 · APQC L5"`. NO deroga D-08
   (manual disuelto): `desc` narra, `tareas[]` estructura; la instrucción z3 se GENERA de ahí.
   Marcarla **PROPUESTA — pendiente ratificación del operador**; solo docs (cero cambio a
   `objeto.schema.yaml`/Go — eso aterriza con el refinamiento de la historia). Antes: leer el
   formato de fichas existentes en DECISIONES.md + grep anti-contradicción (`desc`, D-08) +
   pre-commit valida.

Al terminar: `./verify.sh` (19/19) → screenshot headless de un lienzo largo (clamp visible) →
commit+push → republicar mismo artifact (`url` de arriba) → WebFetch check → avisar Ctrl+Shift+R →
marcar esta sección como resuelta.

## Pendientes conocidos (visuales, menores)

- Voseo pre-existente en microcopy ("Tocá…") viola es-419 sin voseo del stack — barrido pendiente.
- `tareas[]` como campo tipado del schema = evolución pendiente (hoy `desc` D-08; z3 lo rinde canned).

- ~~Banda Gente roza label SISTEMAS~~ → resuelto v8 (ySis dinámico tras wrap de gente).
- ~~Pin z1 roza la card de arriba~~ → resuelto v8 (`.pin.down`: cuelga DEBAJO de la card).
- Artifact temporal de debug `a6b775ae-…` en la galería del operador — borrable.
- z1 (drill de área) solo accesible vía piel Organigrama — decidir si el Mapa de Valor necesita su
  propio drill intermedio o basta chevron→ficha→lienzo.

## Contexto de visión (no re-derivar — ya firmado)

- **CK-29** (LEDGER): el twin es un cerebro (estructura × conocimiento × pulso) que **compila
  arneses** (Arnesia N15 → Colab Studio N17); colaborador = orquestador; una sola doctrina a tres
  escalas; el arnés = vista GENERADA del twin para un puesto.
- Memoria del agente: `vision-unificada-guardian` (rol: avisar si un pedido se desvía de la visión).
- El mockup ES "el producto completo" (decisión 10) — módulos + corrida + viaje de 12 entidades.
