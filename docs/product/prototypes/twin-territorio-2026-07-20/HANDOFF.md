# HANDOFF — continuar el mockup del twin (sesión 2026-07-26 → siguiente)

> **Para la sesión que continúa.** ARRANCAR por el **dossier consolidado**:
> `docs/product/stories/cockpit/twin-territorio-mapa-zoomable/dossier/README.md` (visión, mockup
> elemento-por-elemento, decisiones+porqués, datos, construcción real, pendientes) + el tablero de
> deuda `dossier/07-auditoria-hallazgos.md`. Este HANDOFF = OPERATIVA de sesión + estado v12.
> **Objetivo de la próxima sesión:** el operador llega con MÁS COMENTARIOS sobre el Artifact
> (continuación de la tarea 2 — iterar/verificar/republicar). El plan v12 ya fue FIRMADO y ejecutado.

## Estado actual (v12.1 · publicado · commits `fa55acc` + `df09384`)

**v12 (2026-07-26) = CK-30/D-19/D-20/M46 aplicados al mockup** — plan firmado por el operador:

- **puesto ≠ rol (D-19)**: `PUESTOS` se **DERIVA** de la nómina en runtime (IIFE tras DATA) —
  **46 puestos** (14 líderes + plantilla + dueños vacantes), 27 operan la cadena. `puestosTotal`
  ya NO es constante. `personasExtra[].rol` → renombrado `.puesto`. Cadena:
  `persona ─ocupa→ PUESTO ─agrega→ ROL ─carril/RACI→ ACTIVIDAD ⊂ PROCESO`.
  Pares rol×proceso derivados del wiring: **posee** (dueño) ∪ **ejecuta** (carril) — D-19 §regla.
- **Las dos pieles = los dos planos**: Mapa de valor = plano del ROL (banda Gente = 27 puestos
  que operan la cadena, chips → `openPuesto`, link "los 46 → Organigrama ›") · **Organigrama =
  plano del PUESTO**: click = `openArea` (ficha) · dblclick = z1 · **NIVEL 4 = la nómina completa**
  (stack de puestos por área, filas → `openPuesto`, roster badge) · counter área "⛨ arneses/puestos"
  consistente (mismo set: subtree si plegada, directo si no) · crumb "Territorio" clickable.
- **arnés = REGISTRO por rol×proceso (D-20)**: `DATA.arneses` = 5 registros con
  `deriva_de{puesto,rol,proceso}` · `hash_fuente` vs `DATA.twinHash` → **estado/drift DERIVADOS**
  (`arnesEstado()`, jamás guardado) · `autonomia` L0-L5 + `autonomia_razon` · `supervisor` ·
  `verificacion_humana{que,evidencia,tiempo}` · `supervision{corridas_sem,anulaciones_sem,…}` —
  0 anulaciones ×9 semanas → warn "supervisión no ejercida = candidata a brecha" (CK-30 §2, en
  ficha, NO en DATA.brechas — decisión firmada) · `guardrails[{g,mecanismo}]` — `prompt` se pinta
  punteado/débil, `hook|permiso|sandbox` sólidos (CK-30 §8) · acciones recompilar / **suspender
  (kill-switch)** / **ratificar-autonomia** (D-20).
- **Roster del Contador General = showcase del ensamblaje**: 4 pares (p-cierre·p-pago·p-fact·p-liq),
  2 compilados (h-cierre-cont v2 = el recompilado de pm-cie · h-fact-cont v1) + **2 sin arnés** —
  el gap agéntico DENTRO del roster. Ids nuevos: `h-cob-ancob · h-cob-jef(desactualizado) ·
  h-cierre-cont · h-fact-cont · h-val-metr` (refs en pm-cie.recompila y notas de acts actualizadas).
- **Fichas**: `openPuesto` (roles+procesos · roster · dia-card CK-30 "supervisar, no ejecutar" con
  el contrato qué/evidencia/tiempo) · `openRol` re-significado (carril/posee/lo-agregan/RACI ·
  "C/I no genera skills") · `openArea` (cierra **A3**; puestos+procesos+KPIs+brechas+entrar-z1) ·
  `openArnes` = registro completo · `openPersona` ("Ocupa el puesto", área link, roster).
- **Helpers nuevos** (anchor `D-19 · puesto ≠ rol`): `coreNm · PUESTOS · puestoByNm ·
  puestoOcupante(s) · arnesDe(rol,proc) · rosterDe · paresDe · arnesEstado · rosterBadge ·
  setPiel` (dedup del toggle — usar SIEMPRE setPiel, nunca state.piel a mano). MUERTOS:
  `arnesDeRol · rolOcupante(s)` (cero refs). Badges pair-exact en cadena/apoyo/z1/z2-carril/
  z2-act/z3/openProceso/openKpi (antes eran ambiguos por nombre).
- **TICO**: +`puesto` (busto en marco) +`arnes` (escudo+check); openDrawer normaliza acentos
  (Área→area, Arnés→arnes). wireLinks: +`data-pu` +`data-area`. CSS nuevo: `.prows/.prow` (stack
  org) · `.grchip[.prompt]` (guardrails).
- **v12.1 (pulido tras pasada visual con ojos propios)**: counter área consistente · pin de brecha
  levantado proporcional al stack en lod4 · nodo área 190px en lod4 (nombres legibles) · copy z3
  inspector CK-29→"rol×proceso (M46 · CK-30)" · `›` sin huérfano en botones.

**Verificación hecha:** Node stub (46/27/roster) · `verify.sh` **23/23** (4 tests nuevos:
piel-org+ficha-area · org-dblclick-drill · org-nivel4-puestos · roster-contador +
capa-trabajo-valor ahora exige `deriva_de`+guardrails) · pasada visual completa con claude-in-chrome
(org-lod4 zoom, las 4 fichas nuevas, ficha arnés entera, banda gente 105%, z2 carriles, z3 piso).

## Deuda del tablero (dossier/07) — estado tras v12

- **A3 (área sin ficha): CERRADA en el mockup** (openArea + data-area + 3 textos planos → links).
- **B5 (4/40 sin denominador): CERRADA** (46 derivado; portada "4/46 · 5 arneses"; los 46 dibujados
  en Organigrama nivel 4). **B3 mejorada** (Arnés ya tiene ícono; Actividad sigue subesquema).
- **A6 avanzada** solo en ficha arnés (`fuente/conf` del registro). Resto de A6 abierto.
- **ABIERTOS sin tocar**: A2 (hilo ancla a objetivo, no KR) · A4 (salud/madurez/conector
  visual-only) · A5 (4 acciones que cierran el loop sin superficie; las 3 de arnés ya declaradas
  vía D-20) · B1 · B2 · B4 · D3 (state:idea sin 01-spec).
- **PENDIENTE: sync del dossier** (02 conteos v12, 07 marcar A3/B5 resueltas con commit) — se hace
  DESPUÉS de la firma visual del operador sobre v12 (decisión de esta sesión; no adelantarse).

## OPERATIVA de sesión (aprendida a golpes — NO regresionar)

- Fuente: `index.html` (este dir, single-file vanilla). **Artifact MISMO URL siempre**:
  `https://claude.ai/code/artifact/20907d03-3979-42f2-b5c8-b33fa5e383f6`. Si el tool Artifact
  rechaza con "hasn't viewed the latest version" → WebFetch del URL primero, luego publicar con
  `url:` (así se hizo esta sesión). Favicon estable: 🗺️.
- Servir local: envolver con `<!doctype><head><meta charset>` (el raw no trae charset) →
  `python3 -m http.server 8777` en scratchpad. **El scratchpad se limpia entre turnos** — re-crear
  dir y re-levantar server si curl da 000.
- claude-in-chrome: la extensión SE DESCONECTA a veces (reintentar `tabs_context_mcp
  createIfEmpty` más tarde — esta sesión volvió sola). Screenshots timeoutean ~30s tras renders
  pesados → wait 3-8s y reintentar (pasó ~8 veces, siempre salió). NO usar el crop de región
  (zoom action) — cuelga. Zoom interno: `view.z=…; view.x/y=…; applyView(false)`. Fichas por JS:
  `openPuesto('Contador General')` etc — son globales. `element.click()` MIENTE →
  `elementFromPoint`.
- **verify.sh (reparado esta sesión — Chrome ≥138 rompió el arnés bajo `--virtual-time-budget`)**:
  el script corre ANTES del primer layout → `fit()` veía stage 0×0 → z negativo → whenReady jamás
  disparaba. Remedios YA en el script: layout-pump (leer `stage.clientWidth` + escribir
  `document.title` por poll) · re-render+fit en reintentos · mclick con retry+re-fit · resets
  programáticos de estado en tests legacy · budget 40000. **Sigue flaky EN FRÍO**: "SIN RESULTADO"
  aislado = re-correr (hasta 3-4 veces); cuando arranca → 23/23 estable. No diagnosticar sin
  re-correr. Esperado: **23/23**.
- Auditar DATA sin navegador: `new Function('document','window',…, <script>)` con Proxy-stub que
  se devuelve a sí mismo en todo get (receta dossier/07 § Recetas) — así se midió 46/27/roster.
- Ciclo: editar → verify.sh → screenshots → ojos propios (¡las fichas por dentro, no solo z0!) →
  commit por pathspec → republicar Artifact → avisar Ctrl+Shift+R (CDN tarda minutos).

## Mapa del código (anchors v12 en index.html, ~2560 líneas)

| Qué | Anchor |
|---|---|
| Registros de arnés (5, D-20) + twinHash | `arneses — REGISTROS del twin` |
| Derivación PUESTOS + helpers D-19 | `D-19 · puesto ≠ rol` |
| Helpers arnés (arnesDe/rosterDe/arnesEstado/rosterBadge/setPiel) | `CK-30/D-20 · arnés = REGISTRO` |
| Banda Gente (27 chips puesto) | `banda 4 · GENTE & ARNESES` |
| Organigrama (click=ficha · dblclick=z1 · lod4 stacks) | `function renderOrganigrama` |
| lod4 rowH/slotW | `function treeLayout` |
| Fichas nuevas | `function openPuesto` / `openRol` / `openArea` / `openArnes` / `openPersona` |
| Guardrails CSS | `.grchip` · stack org: `.prows` |
| Íconos nuevos | `TICO` → `puesto:` / `arnes:` |
| z3 piso rol×proceso | `EL PISO (CK-30)` |

## Contexto de visión (no re-derivar — ya firmado)

- **CK-30** (LEDGER): puesto≠rol · el arnés se COMPILA por rol×proceso, se ENSAMBLA por puesto
  (roster), se CORRE por persona · las personas SUPERVISAN a los agentes y la supervisión se
  especifica Y se mide · autonomía CSA derivada del riesgo (default L1-L2) · guardrail sin
  mecanismo NO es guardrail. Fichas D-19/D-20/D-21 en `sistema/schema/DECISIONES.md` · M46 en el
  método. CK-29 sigue vigente salvo donde CK-30 invierte el sujeto ("orquesta"→"supervisa").
- Doctrina PRENTER: teal único acento; color RESERVADO a salud/severidad (mecanismo de guardrail
  se distinguió por borde punteado/sólido, NO por color). Persona = ocupante, jamás nodo medible
  (CK-24/M40). Nada visual-only sin campo/entidad detrás.
- Decisiones de sesión firmadas: banda Gente queda en 27 (rol-plane) y los 46 van al Organigrama ·
  click área=ficha, dblclick=drill · roles homónimos al puesto (cardinalidad N enseñada vía
  rol×proceso del Contador, cero renombres de carriles) · "supervisión no ejercida" = warn en
  ficha, no brecha en DATA (promoverla = decisión futura del operador).
- Memoria del agente: `vision-unificada-guardian` · `twin-mockup-estado`.
