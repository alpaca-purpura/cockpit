# HANDOFF — continuar el mockup del twin (sesión 2026-07-24 → siguiente)

> **Para la sesión que continúa.** Leer esto + `00-story.md` de la historia
> (`docs/product/stories/cockpit/twin-territorio-mapa-zoomable/`) ANTES de tocar nada.
> **Objetivo de la próxima sesión (pedido del operador):** terminar el **mockup de la visión
> COMPLETA del cockpit, de inicio a fin** — el operador llega con VARIOS comentarios nuevos.

## Estado actual (v8.2 · publicado)

- **v8.2 (2026-07-24):** tuteo es-419 (voseo = 0) · clamp de zoom z2/z3 (`fitFlujo`, mín 0.6 anclado
  al inicio del flujo) · ficha **D-17 PROPUESTA** (`tarea` bajo `actividad`) en DECISIONES.md. Suite 19/19.
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

## ✔ RESUELTO (2026-07-24) — la deuda consciente de la sesión colgada, cerrada

Las 3 tareas ratificadas se ejecutaron y verificaron (v8.2):

1. **Voseo → tuteo neutro**: 8 instancias reemplazadas (`Tocá`→`Toca` ×4, `tocá`→`toca` ×3,
   `prendé`→`prende` ×1). Grep de verificación = 0 matches. Solo microcopy, datos intactos.
2. **Clamp de zoom z2/z3**: `fitFlujo()` (zoom mínimo 0.6, ancla izquierda si el lienzo no entra
   a lo ancho, arriba si no entra a lo alto) llamada desde `renderLienzo()` y `renderInstruccion()`;
   `refit()` rutea el botón fit y el resize por la variante correcta según `state.escala` (sin eso,
   un resize en z2/z3 deshacía el clamp). Verificado con ojos: p-perm abre a 60% (antes ~35-42%)
   con puertos S·I + primeras actividades legibles; z0 intacto (58%, sin clamp).
3. **Ficha D-17 PROPUESTA** en `sistema/schema/DECISIONES.md`: subesquema `tarea` bajo `actividad`
   (`{orden, verbo?, texto, sistemas_ref?}`, met ISO 10013 n3 · APQC L5), estado `en-discusión` —
   **pendiente ratificación del operador**. NO deroga D-08; solo docs, cero cambio a schema/Go.

Verificación: `./verify.sh` 19/19 + ERRS=[] (ojo: la suite es flaky en frío — un "SIN RESULTADO"
aislado se re-corre antes de diagnosticar) · screenshots headless z0/z2-perm/z3 revisados a ojo.

## Pendientes conocidos (visuales, menores)

- ~~`tareas[]` como campo tipado~~ → **RATIFICADA y MATERIALIZADA** (2026-07-24): D-17 `clavada`
  (`actividad.tareas[]` en `objeto.schema.yaml`) + D-18 `triage.yaml` (derivación de scores M36
  as-code, gate en `gen_schema.py`). Falta el wiring Go + render z3 desde dato real (refinamiento
  de la historia — z3 sigue canned en el mockup).

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
