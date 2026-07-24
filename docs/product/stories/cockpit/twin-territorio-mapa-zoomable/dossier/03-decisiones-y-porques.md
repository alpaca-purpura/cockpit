# 03 · Las decisiones ratificadas y sus porqués

> Parte del dossier. Las 17 decisiones del mockup (ratificadas por el operador entre 2026-07-20 y
> 2026-07-24) + las 2 del schema (D-17/D-18). Cada una: QUÉ se decidió · POR QUÉ · qué reemplazó.
> Fuente: `00-story.md` + LEDGER + conversaciones 2026-07-20/24. **Ninguna se re-litiga sin el operador.**

## Del concepto (sesión 2026-07-20)

1. **Twin = territorio; zoom semántico + capas** (vs 4 tabs planas). Por qué: el director no ve la
   organización como un todo en tabs; el grafo del schema ya ES navegable por refs (`hilo(desde_id)`,
   expansión progresiva — el zoom semántico es el modelo de datos, no un efecto).
2. **z0 con dos pieles toggle** (Territorio ↔ BSC). *Superseded parcial por decisión 15:* la piel
   BSC muere absorbida por la banda Estrategia; el organigrama queda como piel-lente secundaria.
3. **Organigrama COMPLETO desde z0** (13 áreas, no solo gerencial) — pedido explícito. Trade-off
   aceptado: fit ~57%, texto chico; colores/estructura se leen a cualquier zoom, nombres con
   zoom/drill. *Resuelto después con LOD (decisión 7).* Mismo trade-off que luego justifica el
   clamp de z2/z3 (v8.2).
4. **Cards sin relleno "plomo"** — borde hairline sobre negro transparente, no gradiente gris.
5. **Dark-only robusto** — `color-scheme: dark` + fondos opacos (bug real: viewer en tema claro
   filtraba blanco a los `<button>`).
6. **Deliverable = mockup HTML interactivo** (no la app) — datos canned, zoom+capas reales, PRENTER.
7. **Shell v2** (tras investigación DTO/process-mining/org-design/canvas con fuentes,
   `research-shell-ui.md`): izquierda = qué existe (capas con leyenda inline pegada, estilo Felt) ·
   derecha = inspector contextual (sin selección = sala de mando) · arriba = identidad + chips +
   contador + ⌘K · abajo-izq = zoom/fit + **LOD Niveles 1/2/3** (la legibilidad se resuelve
   plegando con rollup honesto, no con tipografía) · abajo-der = minimapa.
8. **Corridas what-if = escenario-objeto, JAMÁS toggle** (patrón unánime de la investigación):
   rama con nombre + Draft→Review→Merged + diff coloreado + gate explícito. Mapeo natural: corrida
   = rama sobre N6 (git), aplicar = PR. En el mockup: demo funcional + teaser; el eje = historia futura.

## Del producto completo (sesión 2, 2026-07-20)

9. **La sección "Escala" del rail SE ELIMINA** (challenge del operador): la escala es *estado de
   drill* (se entra por doble-click, se lee en breadcrumb), nunca menú lateral — ningún producto
   investigado tiene "menú de niveles". El rail navega MÓDULOS.
10. **El mockup es el PRODUCTO COMPLETO** ("asume que este mockup es el de todo el DTO"): rail =
    Territorio · Mejora (funil brecha→proyecto→KPI movido con veredicto) · Método (M1/M3/M2 con
    gates + traza "cada capa ← una M-card") · Cambios (ISO, 3 niveles de aprobación, versiones
    dev→UAT→prod, git invisible). + corrida demo funcional con gate a la cola de Cambios.

## Porqués transversales del viaje CK-29 (de la conversación, no estaban en docs)

- **Capa Trabajo pinta el GRIS**: *"puestos sin arnés = la brecha de la era agéntica, y NADIE la
  pinta hoy."* Argumento competitivo de la auditoría: sin arneses/viaje/triage-que-cierra, el
  mockup era *"un DTO bonito más, compitiendo contra Mavim/Ardoq en SU cancha. Los arneses son la
  cancha donde no tienen equipo"* — *"un comprador viendo este mockup jamás adivinaría que los
  arneses existen."*
- **El triage tenía que cerrar la cadena** (decisión 13): era *"un callejón sin salida — 'Contactar
  a compradores morosos' marcada automatizable-agente con RTLX 71… y esa etiqueta no lleva a NADA.
  En la visión ese veredicto es el input de Arnesia."*
- **Nodos hoja NO tienen territorio** (límite deliberado): persona/sistema/KPI son fichas, no
  territorios — *"nodos hoja del grafo, no contenedores"*; el doble-click "entrar" solo existe
  donde hay interior real. (Ofrecimiento abierto: mini-mapa por rol si el operador lo pide.)
- **Tensión reportería ↔ volante** (lectura honesta pedida por el operador): lo construido es el
  extremo reportería; *"el riesgo real es quedarse cómodo ahí: cada sprint de visualización se
  siente progreso y ninguno acerca al diferenciador. El moat entero está en los WRITES: sellar,
  aprobar, promover, ciclo de proyecto."* Identidad propuesta: no Grafana, no VS Code — **ArgoCD /
  torre de control**.
- **Contrato operativo guardián** (mandato verbatim, base de CK-29): *"quiero que no tengamos por
  término diferentes visiones, tiene que ser todo unificado"* · *"si pido algo y se va de la
  visión, tú me digas… Yo siempre voy a tener la última palabra, pero necesito que tú tengas esta
  visión clarísima y me lleves a ella."*

## Del viaje CK-29 (2026-07-24 — "repiensa todo desde nuestra visión, no te sesgues")

11. **Gramática de ficha universal** — TODA entidad (las 12) abre ficha con las MISMAS secciones:
    qué-es · hilo (arriba/abajo, links navegables — el viaje nunca se corta) · pulso · conocimiento
    (teaser F3) · acciones (capa kinética del schema, con nivel + aprobación; toda acción no-directa
    aterriza en Cambios). Por qué: auditoría contra CK-29 halló el mockup CK-21-completo pero
    CK-29-ausente (cero arneses, cero conocimiento, triage como etiqueta muerta).
12. **Capa Trabajo (N15·N17)** — badge ⛨ por puesto (vigente / ⚠ desactualizado / gris sin arnés =
    el gap VISIBLE). Ficha rol = la joya: arnés compilado-de + skills + uso agregado por rol (CK-24)
    + "el día del ocupante — orquestar, no ejecutar". Ficha arnés declara la doctrina: vista
    GENERADA, se recompila jamás se edita.
13. **La cadena triage→Arnesia CIERRA** — veredicto M36 deja de ser etiqueta: `automatizable-agente`/
    `aumentable` → candidato a skill del arnés → funil de ideas (M44, columna 0 en Mejora, autoría
    reconocida RN-16) → proyecto → al cerrar, la mejora se RECOMPILA al arnés. Anti-drift
    twin→arnés en Cambios (SC-14).
14. **Fixes de dato:** 9→12 entidades (CK-26) · 31→45 M-cards · pins con title completo.

## De la geografía (v6 — "sal de la caja y proponme algo mejor")

15. **La geografía deja de ser el organigrama → MAPA DE VALOR** (5 bandas: Estrategia · Cadena de
    valor · Apoyo · Gente & arneses · Sistemas). Por qué (crítica verbatim del operador): "los
    procesos usualmente son con pasos… debería verlos similar [a los mapas de Arnesia]… hay procesos
    transversales… el BSC así no le encuentro sentido… no veo objetivos ni KPIs ni personas — se ven
    cuadrados y bloques pero no un sistema interconectado". Respuesta: ISO 9001 (enfoque a procesos)
    × cadena Porter × strategy map en UN lienzo; hilo de oro = edges VERTICALES reales (tenues
    siempre; click en objetivo → su hilo completo se enciende); transversales = ANCHO (el ancho
    dice cuántas áreas cruzan); procesos con mini-pasos (lenguaje fractal Arnesia); organigrama
    degradado a piel-lente ("la estructura como lente").

    **El porqué fino (de la conversación, no estaba en docs):**
    - Autocrítica conceptual que gatilló el giro: *"ISO 9001 manda enfoque a procesos: la empresa
      ES sus procesos; la jerarquía es solo quién responde por ellos. Puse la estructura como
      geografía y los procesos como habitantes — es al revés."*
    - Argumento de venta: *"defendible ante cualquier directorio: mapa de procesos ISO + cadena
      Porter + strategy map — tres imágenes que un gerente LATAM ya tiene en la cabeza, fusionadas
      en una sola con datos vivos."*
    - Mini-chevrons fractales: en Arnesia un arnés SE DIBUJA como mapa de proceso; que el proceso
      de la empresa fuera un rectángulo mudo era *"mismo objeto, dos idiomas: inconsistencia real"*.
      Un arnés es *"literalmente un fragmento de este mapa (los pasos de un rol). El twin y la
      fábrica se ven igual porque SON lo mismo."* Lenguaje heredado del map-canvas de
      harness-studio: geografía fija de bandas · gutters de handoff · edges encima.
    - BSC como piel aparte, muerto: *"otro mundo flotante — cuadros sin conexión con nada de
      abajo"*; la causalidad BSC = arcos DENTRO de la banda Estrategia.
    - Tabs por tipo de entidad ("Procesos"/"Indicadores"/"Personas"), rechazadas: *"taxonomía de
      base de datos, no de decisión."*

## De la escalera (v7-v8)

16. **La escalera de zoom se ancla a método** — APQC L1-L5 × pirámide ISO 10013 (M38): z0 = el
    "manual" (L1-L2) → z2 = el "procedimiento" CARACTERIZADO (L3-L4: header C1 identidad ISO 4.4.1
    + puertos SIPOC como GEOGRAFÍA, S·I izquierda / O·C derecha, navegables) → z3 = la "instrucción
    de trabajo" (L5: tareas + dos scores M36 con inputs visibles + RACI/RTLX + flujos saltables) →
    **piso = el arnés del puesto** (CK-29). Los "registros" ISO = pulso, transversal. Clave: el
    SIPOC de 11 capas del SOMA fue ABSORBIDO capa por capa por el schema (C1→propósito/disparador ·
    C2-C6→bordes · C7→sistema · C8→rol/RACI · C9→documentos · C10→kpi · C11→brecha · IAA→M36 ·
    Bloom→M37) — la tabla-documento NO vuelve; cada capa es entidad viva navegable.
17. **Empresa demo completa (~100 personas)** — nómina entera (14 líderes + 86 ocupantes, Obras con
    3 proyectos), 27 puestos ×N, 40 roles, 17 SIPOC, 11 lienzos plenos (incl. Permisos = el P03 del
    SOMA vivo), 14 instrucciones z3, 11 sistemas, 12 KPIs. Por qué: la casuística REAL (vacante,
    sin-arnés, desactualizado, KPI stale, sin-ancla, mandato protegido, eliminable, RTLX alto,
    subcontratados, provisto externamente) debe ser VISIBLE, no teórica.

## Del schema (2026-07-24, esta sesión — ratificadas)

- **D-17 `clavada`** — `actividad.tareas[]` subesquema `tarea {orden, verbo?, texto, sistemas_ref?}`
  (ISO 10013 n3 · APQC L5). `desc` NARRA, `tareas[]` ESTRUCTURA; la instrucción z3 se GENERA — D-08
  (manual disuelto) intacta. Habilita triage con granularidad L5.
- **D-18 `clavada`** — derivación del triage as-code (`sistema/schema/triage.yaml`): base por
  capacidad MGI → ajuste ALM → modificadores → clamp; conf propagada; cortes previos (ECRS →
  mandato → accountability); umbrales del veredicto PROPUESTO (el motor propone, el consultor
  ratifica). Pesos `conf: baja` = hipótesis calibrable (M29 + loop KPI-movido). Scores se computan
  al leer, JAMÁS se persisten. Motor = pendiente (programación, no método).

## Micro-decisiones v8.1-v8.2 (pulido, también ratificadas)

- Barrido visual v8.1: 6 fixes cazados con ojos (la suite no ve solapes) — p.ej. banda Gente vs
  label SISTEMAS (ySis dinámico), pin z1 colgando DEBAJO de la card (`.pin.down`).
- v8.2: tuteo es-419 (voseo = 0) · clamp `fitFlujo()` z2/z3 (mín 0.6, ancla al inicio del flujo —
  puertos S·I legibles; el resto por pan/minimapa; `refit()` rutea botón fit y resize por escala).
- Salud como **lentes color-by de radio** (v7): una métrica a la vez, leyenda pegada al lente activo
  con alcance+pregunta+conteo — mata los "puntos-semáforo" falsos.
- **Lienzo universal** (v7): dblclick en CUALQUIER proceso abre lienzo; sin actividades = banner
  honesto "SIN LEVANTAR (M1)" — disable/estado honesto como principio transversal.
