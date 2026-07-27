# Decisiones del modelo del objeto — ADR de `objeto.schema.yaml`

> **Log de decisiones D-NN detrás del contrato** [`objeto.schema.yaml`](./objeto.schema.yaml): los campos
> `met:` del schema citan estos códigos inline (~30 refs). Promovido a `sistema/schema/` desde la campaña
> `modelo-objeto` (destilada, cierre BL-07). Son decisiones **PRE-CK-18 que produjeron el schema** —
> históricas por naturaleza (ADR); donde una quedó superseded por CK-18 lleva addendum (ver **D-14**).
> Estados: `clavada · en-discusión · diferida`. Menciones a `checkpoints`/`cp-NN`/`ESTRUCTURA-INICIAL`/
> `NEXT-PROMPT` en el cuerpo son de la campaña original (ya borrada) — contexto histórico, no enlaces.

## D-01 · Ubicación del objeto de prenter-harness — `clavada`
El plano-objeto de prenter-harness-sobre-sí-mismo vive **in-repo, enrejado** (no en `prenter`, no en repo
separado). `prenter` (la empresa) lo **posee vía el registry** (arista por slug, I-39 cross-repo por
contrato). Razón: el código del producto vive en prenter-harness; co-locar código+specs = dogfood fiel
(es lo que corre un cliente) + gate atómico + `verified_real` alcanza el código. La pureza de lo
*enviado* la garantiza el installer (solo copia `core-harness/`).

## D-02 · Doble eje de "sistema" — `clavada`
Un sistema lleva **dos ejes ortogonales**:
- **`rol`** (cómo lo mido): `soporte` (nodo · semáforo digitalización + procedencia) | `producto` (roadmap ·
  capabilities/stories/releases). **Dual opt-in**: un sistema puede llevar ambas lentes (caso Vitalia:
  producto + su cobranza/facturación como soporte interno), pero solo cuando hace falta.
- **`audiencia`** (a quién sirve, relativo a la empresa dueña): `interno` (staff) | `cliente-final`
  ("el cliente de mi cliente" / end-user).

Correcciones: "externo" NO se usa para audiencia (ya significa *tercero* en `procedencia`).
**frontstage/backstage NO es tipo de sistema** — es capa de arquitectura dentro de una app (UI vs
integraciones); se queda en los carriles del service blueprint.
⚠ **AJUSTADO por D-10:** el eje `rol` (soporte|producto) **se disuelve** → `sistema` = Application Component
(soporte, siempre) + bloque `producto` opt-in (Product). `audiencia` sigue igual.

## D-03 · Dato de instancia normalizado — `clavada`
Romper el `negocio.yaml` monolítico → **un-archivo-por-entidad**, wired por `id`, **descubrimiento por
scan** (sin índice central que mantener). `empresa.yaml` = **pura identidad** (el ancla); todo lo demás
(roles, personas, sistemas, procesos, objetivos, brechas) cuelga por referencia. Alta cohesión / bajo
acoplamiento. Escala de "solo yo" a empresa grande sin un mega-YAML. Simetría: el lado-producto
(capabilities/stories) **ya** es per-archivo; traemos el lado-negocio a esa misma granularidad.

## D-04 · Puerto de repositorio + archivos-vs-DB — `clavada` (dirección) / `diferida` (mecanismo)
El negocio se lee detrás de un **puerto de repositorio** (hexagonal). Archivos hoy, DB mañana = **swap de
adaptador**; el cockpit/dominio nunca se entera. Por eso la decisión **archivos-vs-DB se difiere** al final
de la entrevista. **Ahora:** diseñar los archivos *como si* ya estuvieran detrás del puerto (ids estables,
cero duplicación, todo por referencia). El **puerto se formaliza** cuando se decida la DB. Consecuencia
marcada: ese día el cockpit deja de leer archivos directo (refactor de su capa de datos).

## D-05 · Cadena organizacional — `clavada`
`persona → rol → funciones → proceso / actividad`. El **rol** es el ancla estable (no la persona): *tiene*
funciones; las funciones se asocian a procesos o a actividades dentro de un proceso. La **persona** ejecuta
un rol. Cardinalidad: **un rol → varias personas**. Los **procesos cablean a *funciones***, no a personas.
⚠ **CORREGIDO por D-09:** metodológicamente el proceso lo **realiza un `rol`** (ArchiMate/BPMN/RACI/ISO cl.5.3);
`función` se disuelve (= RACI derivado). Cadena final: `persona →cumple→ rol →realiza→ proceso/actividad`.

## D-06 · Versionado de datos — `en-discusión`
Generalizar el patrón expand-contract (hoy solo en el seam, I-52) a **todo dato de instancia**. Cada
entidad lleva su `data_version` → migraciones **por-tipo-de-entidad**, no-destructivas. *Falta confirmar:*
¿bilingüe en runtime (leer ambas versiones) y/o `migrate` (subir old→new una vez)?

## D-07 · Holding / corporativo — `clavada` (ratificada operador 2026-07-17 · refinamiento arquitectura-refichado-ck21 · CK-24 mismo evento)
**Techo = empresa.** El holding/"grupo" = **agrupador puro** (selector de empresas) con **cero dato
propio** (sin objetivos, sin rollup, sin de-dup de sistemas compartidos). No se vende a grupos *como
grupo* en el MVP.

**Patrón "grupo inmobiliario" (caso cliente probable) — el proyecto NO es una empresa:** el operador
propuso "cada empresa sería un proyecto"; se decide lo contrario tras análisis. Un proyecto/obra/
sucursal es una **unidad de ejecución**: los procesos se definen UNA vez en la empresa OPERATIVA (la
inmobiliaria) y se ejecutan/miden POR unidad — el KPI corta por `unidad_ref` (dimensión de la
MEDICIÓN, insumo schema-v2), no por partición del twin. Razones: (1) empresa-por-proyecto duplica
los procesos N veces → drift asegurado (viola un-hecho-un-lugar) y deja twins de 3 personas sin
organización real; (2) el SPV legal por proyecto (práctica normal inmobiliaria) es un **atributo
legal** (`entidad_legal_ref` en la instancia), no una organización — el twin modela la organización
que OPERA, no el cascarón jurídico; (3) el mismo patrón resuelve franquicia/multi-sucursal
(plantilla de proceso + medición por unidad), hueco detectado por la auditoría 2026-07-17.

**Cuándo SÍ es otra empresa bajo el agrupador:** negocios genuinamente distintos con procesos
propios (inmobiliaria + constructora + administradora de edificios) — cada uno su twin; el selector
los agrupa.

## D-08 · Molde de proceso (la "tortuga") + el manual colapsa — `clavada`
El `proceso` se modela como la **tortuga ISO 9001 cl.4.4**: header con entradas/salidas (+proveedor/cliente
SIPOC) · `dueño` · `sistemas` ("con qué") · `criterios_control` · `metricas`/KPI · `riesgos` ·
`confianza`/provenance (M23) — y las **actividades EMBEBIDAS** (lista ordenada, id estable `pr-x#aN`), **no**
archivos sueltos. **Composición por defecto** (actividad = entidad débil, existence-dependent); promoción a
archivo propio solo si la actividad se **comparte** entre procesos o se vuelve **blanco de automatización**
(gap/historia) — regla 3NF. Espejo de nuestras `tareas` inline. **El "manual" NO es entidad**: el "cómo" =
`desc` de cada actividad + `criterios_control` del proceso (la pata "cómo" de la tortuga; APQC no tiene
nivel "manual"; el PDF del cliente = fuente de la ingesta). Fuentes confrontadas: ISO 9001 cl.4.4 ·
Turtle/SIPOC · APQC PCF (L1..L5) · ISO 19011 · M11·M12·M16·M09·M25·M29·M23.

## D-09 · Wiring proceso→organización = `rol`; `función` se disuelve — `clavada`
El `dueño` del proceso y el `carril` de cada actividad apuntan a un **`rol`** (ArchiMate: "construye sobre
**roles, no actores**"; BPMN lane = rol; RACI rows = rol; ISO 9001 cl.5.3 roles+autoridad). Cadena:
**`persona` →cumple→ `rol` →realiza→ `proceso`/`actividad`**. **`función` NO es entidad**: "las funciones de un
rol" = sus asignaciones a procesos/actividades = **RACI derivado** del wiring (guardarla = anomalía 3NF). Lo
no-procesal del rol (deberes permanentes, autoridad) → campo `responsabilidades[]`/`autoridad` en `rol` (ISO
cl.5.3). La "función de competencia" (agrupar por skill) = `capability` (M31), nivel-org, otra caja. Carga
metodológica: M13 ArchiMate · M11 BPMN · M25 RACI · M16 ISO cl.5.3. **Corrige D-05.**

## D-10 · `sistema` = Application Component + aspecto Product (disuelve `rol`) — `clavada`
El eje `rol: soporte|producto` de D-02 **se disuelve** (chocaba con Business Role). Modelado por la norma
(ArchiMate): todo `sistema` es un **Application Component** (lente soporte: semáforo digitalización +
`procedencia`); si además es una oferta, lleva un bloque **`producto`** opt-in = aspecto **Product**
(roadmap/capabilities/releases). La norma dice "un Product está **soportado por** varios Application
Components" → **dual nativo** (Vitalia, prenter-harness = App Component + Product). **Sin campo `rol`, sin
palabra inventada** (la norma nombra los conceptos, no el campo). Pace-Layering (Gartner:
Record/Differentiation/Innovation) parqueado = otro eje (evolución/ritmo), por si luego. Carga metodológica:
M13 ArchiMate (App Component / Product). **Ajusta D-02.**

## D-11 · Materialización v1 — `objeto.schema.yaml` (aditivo) — `clavada`
Materializado el modelo normalizado en [`objeto.schema.yaml`](./objeto.schema.yaml) (L0 — hoy en `sistema/schema/`), **ADITIVO**: NO toca
el `negocio.yaml` vivo del cockpit (bajo acoplamiento) — `negocio` se vuelve su **proyección** (D-06). 8 nodos
(empresa·persona·rol·proceso·sistema·objetivo·capability·brecha) anclados a **O1-O7 + ArchiMate**; `met:`
(metodología) por campo; provenance `fuente·conf` (M23) obligatorio; Hilo de Oro = 8 relaciones (un-extremo +
inverso por scan); invariantes FK. **Aplica forks A-G** (ESTRUCTURA-INICIAL §5): A anclar O1-O7 · B split
objetivo/KR · C unificar gap (negocio.brecha=vista) · D persona/rol net-new · **E `audiencia`→`sirve_a`** ·
F sistema=una App Component(+Product) · G capability-negocio≠producto. **+ adopciones SOMA:** actividad lleva
`verbo`(Bloom)+`tiempo`; proceso lleva `documentos`. **Validado end-to-end** (`ejemplo-vertice.yaml`: parse +
integridad de refs + RACI A==1). Principios: alta cohesión (1 archivo=1 aggregate) / bajo acoplamiento (FK,
nunca embeber root; inverso por scan). **Bloom = candidato M32** (ficha al ledger). v1 para iterar rápido.

## D-12 · `area` = entidad (Organization Unit); N:M con proceso — `clavada` (revierte ESTRUCTURA §1)
`area` (departamento/unidad) **SÍ es entidad** — revierte ESTRUCTURA §1 ("agrupador funcional, no entidad propia").
Razón: un área **con líder** no es un bucket anémico; es una **Unidad Organizativa** = ArchiMate **Business Actor
(organizational)** / TOGAF **Org Unit** — el MISMO arquetipo que `empresa`, anidado (`parent_ref`, tope=empresa). O4.
Campos: `id·nombre·proposito·lider_ref→rol`(ISO 9001 cl.5.3)·`parent_ref→area`·provenance; **hub chico** (inverso por scan).
**Relación `area`↔`proceso` = N:M** (guía del operador: un área tiene muchos procesos **y** un proceso es **transversal**
entre áreas): owning side = **`proceso.areas_ref[]`** (lado volátil→estable, consistente con sus otras ref-lists).
**Niveles** (transversal en L2/L3 APQC, aterriza en L4): ya los dan `proceso.clasificacion` + `actividad.carril_ref→rol`
— **sin campo nuevo**. **NO** se añade `rol.area_ref` (**YAGNI**: ningún consumidor lo pide; se agrega cuando lo necesite).
`negocio.yaml` "áreas→procesos" = **derivado** (scan de `proceso.areas_ref`); un proceso transversal aparece bajo varias
áreas (correcto). Cierra el hueco `area` del mapa generado-vs-poblado. Carga: M13 ArchiMate · M16 ISO cl.5.3 · M12 APQC.
**El modelo pasa de 8 → 9 entidades** (ajusta el conteo de D-11). Materializado en `objeto.schema.yaml` + `ejemplo-vertice.yaml`.

## D-13 · `negocio.yaml` = GENERADO (proyección), no poblado — `clavada`
`negocio.yaml` **NO es fuente de verdad**: es una **vista/proyección generada** del `objeto`, no un archivo con data propia
(decisión del operador). Prueba: el mapa campo-por-campo `negocio.schema → objeto` deriva ~90% limpio; los `proceso.obj`,
`proceso.puesto`, `brecha.tipo`, `brecha.obj` = **inversos-FK / Hilo** (computados). **Consecuencia:** la población a-mano del
**M1** (juicio humano, no derivable de código — razón de I-46) **se mueve upstream a las entidades del `objeto`**;
`negocio.yaml` deja de poblarse. *"Data propia"* = las entidades · *"ayuda del sistema"* = `negocio.yaml`. El **mecanismo**
(archivo generado vs join-en-vivo en el cockpit) = **diferido a D-04** (ambos son "generado"). El **único hueco** del mapa
(`area`) se cierra con **D-12**. No rompe nada hoy (D-11 aditivo): `negocio.yaml` sigue curado a mano hasta que el `objeto`
esté poblado; recién ahí se voltea a generado.

## D-14 · El schema se ancla al RESULTADO FINAL (data-plane), no al layout del dogfood — `clavada`
**Disuelve el falso-open `cuenta_ref`** (que cp-06/NEXT-PROMPT habían planteado como "seam cross-repo"). El
objeto modela el **estado final en el repo del cliente, en su servidor** (data plane, patrón BYOC —
`products/docs/architecture/ARCHITECTURE.md`): **autocontenido · un tenant · scan sin bordes**. El "borde de
repo donde muere el scan" **sólo existe en la laptop del operador** (`prenter` + `prenter-harness` hermanos) =
**artefacto de dogfood, NO arquitectura**. La relación **cuenta→proyecto** es **contabilidad del control
plane** (el registry, I-39); meterla como campo `cuenta_ref` en el objeto sería **exportar nuestra contabilidad
al servidor de cada cliente**. **D-01 ya lo había resuelto** (propiedad vía registry, arista por slug); el open
se reabrió por **drift de handoff**, no por un hueco real. **Consecuencias:** (1) **CERO `cuenta_ref`, cero
cambio al schema**; (2) el dogfood se escribe **como un cliente normal** — raíz `empresa: prenter` **delgada**,
autocontenida; (3) la propiedad queda **intacta en el registry**; (4) el objeto **NO** absorbe el org-structure
rico de Prenter (socios/legal/holding/líneas = control plane, curado). **Guardrails de método** (anti-recaída):
**(a) Test de norma** — todo campo/estructura pasa "¿lo necesitaría el resultado final desplegado de un
cliente?"; si sólo existe por cómo está armado el dogfood/laptop → contaminación **objeto→clase**, se rechaza.
**(b) Disciplina de planos** — control-plane (registry/IP/playbook) **nunca** entra al objeto (data-plane).
**(c) Orden de autoridad** — un *open* informal de checkpoint **no** supera una decisión clavada; re-derivar
todo open heredado contra el ledger antes de actuar. Carga: ARCHITECTURE.md (BYOC) · I-39 · D-01.

**Addendum CK-18 (2026-07-08):** el rótulo *«en su servidor, patrón BYOC»* quedó **superseded** — el modelo
vigente es «Organización instalada» con el **Repositorio Oficial (N6) = git self-hosted confidencial
(Forgejo)**, ya no GitHub. La **decisión de fondo sigue intacta**: objeto autocontenido, un tenant, sin
`cuenta_ref`.

## D-15 · Topología del objeto: prenter-harness = SISTEMA, prenter = EMPRESA — `clavada` (corrige mi sobre-aplicación de D-01)
**prenter-harness es un SISTEMA** (producto), NO la empresa. **prenter (sibling) = la EMPRESA**, dueña de su objeto de
negocio. Homes: **(1)** objeto de negocio de Prenter (`empresa·objetivo·rol·persona·area·proceso·brecha`) →
`prenter/empresa/<tipo>/<id>.yaml`, **layout PLANO** (los `archivo:` de cada nodo; `meta.aplica_a` con `data/` = desajuste
interno del schema a reconciliar). **(2)** data del sistema (`sistema: prenter-harness` + `producto{}`, sus capabilities)
→ repo **prenter-harness**, referenciado desde los procesos de Prenter **por slug** (I-39, cross-repo por ownership —
legítimo, distinto del `cuenta_ref` que D-14 mató). **(3)** el `negocio.yaml` que regenera = el de prenter. **D-01 sólo
hablaba de la data del SISTEMA** (que sí vive con el código); yo la estiré al objeto de negocio entero → corregido.
**Fresh start ejecutado:** `prenter/empresa/{empresa.yaml,negocio.yaml}` viejos → `_deprecated/` (git mv, reversible);
`CLAUDE.md`+`decisiones.md` intactos; nueva raíz delgada `empresa.yaml` escrita; `objetivos/` vacío (placeholders de
hipótesis borrados).

## D-16 · Método de llenado del objeto: operador VUELCA → Claude CARTOGRAFÍA → operador CORRIGE → itera — `clavada`
El objeto NO lo llena Claude derivando del repo. **El operador vuelca todo lo que sabe** (texto plano largo, crudo);
**Claude lo estructura** en las 9 entidades (no inventa, no deriva); **el operador corrige**; se itera; los huecos se
preguntan. Provenance = `Declarado` (dato del dueño), no `Inferido`. **Los objetivos se crean JUNTOS** (verdad de
negocio), no se heredan hipótesis. Fuente = SOLO el volcado + `empresa.yaml` (identidad); `_deprecated/negocio.yaml` =
referencia/backup, no autoritativo; **marketing FUERA**. Es el dogfood del flujo real del m1 (cliente vuelca → mapeamos).

## D-17 · Subesquema `tarea` bajo `actividad` (el L5 estructurado) — `clavada` (ratificada operador 2026-07-24)
Formaliza las tareas de una actividad como dato tipado: `actividad.tareas[]`, subesquema
`tarea = { orden, verbo?, texto, sistemas_ref? }`, `met: "ISO 10013 nivel 3 · APQC L5"`. El `verbo?`
usa el MISMO vocabulario controlado que `actividad.verbo` (`sistema/schema/verbos.yaml`, refichado WS5 —
fuera de vocabulario = warning) → habilita **triage con granularidad L5** (skill de arnés candidateado
por tarea, no por actividad entera). **NO deroga D-08** (el manual sigue disuelto): `desc` NARRA el cómo
(narrativa original como evidencia), `tareas[]` lo ESTRUCTURA en pasos ordenados; la **instrucción de
trabajo (z3) se GENERA** de `tareas[]` + la tortuga del proceso — el "manual"/instrucción sigue siendo
**proyección, NO entidad** (misma doctrina que `documentos`, línea D-08). Origen: mockup del twin
(historia `cockpit/twin-territorio-mapa-zoomable`, decisiones 16-17 — la escalera z0→z3 ancla z3 a
ISO 10013 nivel 3 × APQC L5). **Materializada en `objeto.schema.yaml`** (2026-07-24, mismo evento que
la ratificación); el wiring Go (`go/objeto.go` → `/api/objeto`) y el render z3 desde dato real =
refinamiento de la historia.

## D-18 · Derivación del triage as-code — `sistema/schema/triage.yaml` — `clavada` (ratificada operador 2026-07-24)
La FÓRMULA de los dos scores de automatizabilidad (M36) deja de ser doctrina-en-prosa y se
**materializa como dato**: `triage.yaml` = SSoT de la derivación (base por `capacidad_mgi` del verbo →
ajuste por `clase_alm` → modificadores por inputs de `actividad.automatizacion` → clamp 0-100), la
**propagación de conf** (input ausente → conf baja VISIBLE), los **cortes previos** en orden doctrinal
(1 ECRS/M35: `eliminable` jamás sale de los scores · 2 `mandato` protege compliance · 3 accountability/M25:
aprobar/firmar → `humano-por-diseño` sin importar scores) y los **umbrales del veredicto propuesto**
(el motor PROPONE, el consultor RATIFICA — `triage.veredicto` con provenance). Invariantes intactas:
los scores se **COMPUTAN al leer, jamás se persisten** (identidad_vs_observacion); mismo patrón de
gobernanza que `verbos.yaml` (RN-11: cambiar un peso = PR; `gen_schema.py` valida coherencia de claves
contra MGI/ALM/enums y la presencia de los 3 cortes). **Provenance de los pesos: `conf: baja` —
HIPÓTESIS CALIBRABLE** (Lacity & Willcocks + práctica agéntica + juicio propio; se calibran con
evidencia M29 y el loop de proyectos cerrados con veredicto KPI-movido). El **motor** que ejecuta esta
derivación = historia futura (los scores del mockup siguen canned hasta entonces).

## D-19 · `puesto` ≠ `rol` — se parte el Misnomer (M32) — `clavada` (ratificada operador 2026-07-25 · CK-30)
Hasta hoy `rol.nombre` declaraba `met: "= cargo (SOMA C8)"` — es decir, **`rol` significaba lo que el
negocio llama PUESTO**, y `actividad.carril_ref → rol` usaba ese mismo objeto como **carril BPMN**. Dos
conceptos de dos planos distintos bajo una palabra = **Misnomer M32**. Se parten:

- **`puesto`** (entidad nueva · O4 · ArchiMate *Business Actor (organizational position)*) — la posición
  del organigrama: lo que se contrata, se ocupa, se **vacanta** y **reporta**. Campos previstos:
  `id · nombre · descripcion? · area_ref → area · roles_ref[] → rol · reporta_a_ref? → puesto ·
  competencias_req[]? · autoridad? · fuente · conf`. **Owning side de puesto↔rol = `puesto.roles_ref[]`**
  (el `rol` sigue siendo hub chico: no guarda referrers).
- **`rol`** (existente, RE-SIGNIFICADO) — el **papel dentro de un proceso**: el carril BPMN, la fila
  RACI. Es la definición estricta de ArchiMate *Business Role*, la que `carril_ref`/`raci` siempre
  quisieron decir. Se le quita el `met: "= cargo"`.
- **`persona.roles[]` → `persona.puestos[]`** — la ocupación pasa a colgar del puesto (`{puesto, desde,
  hasta?, dedicacion}`); los roles de la persona se **DERIVAN** por `puesto.roles_ref[]` (un-hecho-un-lugar).
  Cardinalidades: **N personas por puesto · N roles por puesto · un rol puede vivir en N puestos**.
- **`puestosTotal` deja de ser ambiguo**: = conteo de `puesto`. (Era una constante de mockup sin campo
  detrás; el denominador de "4/40 con arnés" pasa a ser auditable.)

**Regla de derivación que esta ficha CIERRA (era ambigua, y cada lectura daba un arnés distinto):**
*"los procesos de un rol"* = **posee** (`proceso.dueño_ref`) ∪ **ejecuta** (`actividad.carril_ref` ∨
`actividad.raci.R`). **`raci.C` / `raci.I` = contexto de lectura, NO generan skills.**

**NO deroga D-09:** `función` sigue disuelta. `puesto` es **agregador de contratación**, no función —
lo procesal se sigue derivando del wiring (RACI), y `rol.responsabilidades[]`/`rol.autoridad` siguen
siendo lo no-procesal. **Frontera CK-24 intacta:** el twin mide `puesto`, `rol`, `proceso`, `area` —
todas no-persona; `persona` sigue siendo ocupante y autora, jamás eslabón de medición.

**Origen:** el modelo ya era la doctrina declarada del ecosistema (`NODOS.md` N17 "cada puesto ejecuta
N roles" · N15 "skill=procedimiento, plugin=rol" · `docs/research/rediseno-total/07-proceso-como-arnes.md`
· visión firmada de harness-studio "rol × proceso"); el schema era la pieza desfasada. **Migración:** los
`rol-*.yaml` del fixture son hoy puestos → se dividen (puesto + sus roles-en-proceso). Materialización en
`objeto.schema.yaml` + Go + fixture = historia, no esta ficha.

## D-20 · `arnes` = entidad REGISTRO del twin (el contenido vive en N15) — `clavada` (ratificada operador 2026-07-25 · CK-30)
El arnés era la tesis del producto (CK-29) **sin SSoT**: `grep arnes objeto.schema.yaml` → cero entidad,
y `recompilar-arnes` no estaba en `acciones.catalogo` pese a existir como acción en el mockup y como
SC-14 en Gestión de Cambios. Se resuelve **partiendo registro y contenido**:

- **El TWIN guarda el REGISTRO** (entidad `arnes`, O7-adyacente): `id · deriva_de{puesto_ref, rol_ref,
  proceso_ref} · version (semver) · hash_fuente · estado{vigente|desactualizado|suspendido|deprecado} ·
  autonomia (L0-L5) · supervisor_ref → puesto · verificacion_humana{que[], evidencia[], tiempo_estimado} ·
  indicadores_ref[] → kpi · modelo_base + modelo_version · distribucion{marketplace, canal} ·
  uso_agregado (por rol — CK-24) · fuente · conf`.
- **ARNESIA (N15) produce el CONTENIDO** — skills, subagentes, hooks, `permissions`, sandbox, MCP —
  contra el contrato **`arnes.l0.json` que YA EXISTE** en harness-studio (`required: [id, rol, proceso,
  reporta_a]` + `empresa` + `fases[]` + `spine{estados,transiciones}`; 10 clases × 7 bandas × 3 ejes
  ortogonales clase⊥banda⊥perfil_harness). **No se inventa formato de salida.**

**Por qué entidad y no proyección pura:** `estado`/`drift` SÍ se derivan (comparar `hash_fuente` contra
el twin actual — coherente con "computa, jamás guarda"), pero versión, telemetría de uso, autonomía y
supervisor **no se derivan de nada**: son hecho propio del arnés instalado. **`deriva_de` es el campo
que ningún registro de agentes del mercado tiene** (Workday ASOR, SAP LeanIX AI Agent Hub y CSA Agent
Registry v1 tienen `ownerEmail`, ninguno apunta al elemento organizacional que justifica al agente) —
es el diferenciador, y habilita la pregunta bidireccional rol↔arnés y el análisis de impacto ante
rediseño.

**Acciones kinéticas que entran a `acciones.catalogo`:** `recompilar-arnes` (entidad `arnes`,
`nivel_min: tactico`, `aprobacion: revision-dueño`) · `suspender-arnes` (kill-switch,
`nivel_min: tactico`, `aprobacion: directa`) · `ratificar-autonomia-arnes` (`nivel_min: gobernanza`,
`aprobacion: gestion-cambios`, validación `autonomia > L2 requiere ratificación`).

**Invariantes de gate previstas:** (1) `hash_fuente` divergente del twin ⇒ `estado: desactualizado`
(anti-drift, mismo patrón que `gen_arquitectura.py --check`); (2) `autonomia >= L3` con todos los
guardrails de `mecanismo: prompt` ⇒ **ERROR** (guardrail en prosa no es guardrail — *"Permission rules
are enforced by Claude Code, not by the model"*); (3) `identidad.modo` **no admite `impersonation`**
como valor (consenso Okta/Gartner/CyberArk: el agente tiene identidad propia y actúa *en nombre de*
la persona, RFC 8693 claim `act`); (4) `auditoria.retencion_dias >= 180` (EU AI Act Art. 26(6)).

## D-21 · `tarea` direccionable — el L5 que D-17 prometió (D-17-bis) — `clavada` (ratificada operador 2026-07-25 · CK-30)
D-17 declaró `actividad.tareas[]` y prometió *"triage con granularidad L5 (skill de arnés candidateado
**por tarea**, no por actividad entera)"*; `triage.yaml` repite la promesa. **Es hoy imposible:** el
subesquema `tarea` sólo tiene `{orden, verbo?, texto, sistemas_ref?}` — **sin `id`** (un arnés no puede
apuntar a un paso), **sin `carril_ref`** (dos roles no pueden repartirse los pasos de una actividad),
**sin `triage`/`mandato`** (no hay dónde guardar el veredicto ni el corte de compliance) y **sin
`fuente`/`conf`** (rompe el principio cardinal de provenance que `actividad` sí respeta desde el insumo 4).

Se agregan a `tarea`: **`id`** (local `pr-x#aN.tM`, estable y direccionable — requerido) ·
**`carril_ref?` → rol** (default: hereda el de la actividad; presente sólo si difiere) ·
**`triage?`** (mismo `{veredicto, fuente, conf}` que actividad) · **`mandato?`** ·
**`fuente`/`conf`**. `automatizacion{}` (los 7 inputs) **NO baja a tarea**: se hereda de la actividad —
partir los inputs por paso sería precisión falsa; lo que baja es el **verbo** (que ya está) y el
veredicto ratificable.

**Doctrina de granularidad que esta ficha fija:** el **piso operable hoy** para un skill de arnés es la
**ACTIVIDAD** (`skill = procedimiento ≈ actividad`, patrón `skill=procedimiento / plugin=rol` de N15);
la **tarea** es el piso *fino*, y sólo se candidatea cuando tiene `id` y (si difiere) carril propio.
Mientras el dato de una tarea no exista, el triage **declara honestamente** que corre a nivel actividad
— jamás se simula precisión L5 sobre dato L4.

---

## D-22 · `ambicion` — el color del esfuerzo (portafolio 70/20/10) — `clavada` (ratificada operador 2026-07-27 · M54)
El twin ya tiene TODAS las entidades del esfuerzo (idea · proyecto_mejora · key_result) pero ninguna
dice **de qué tipo de apuesta es**: imposible responder "¿cuánto de nuestro esfuerzo opera el hoy vs
asegura el futuro?" — la pregunta del operador que motivó la ingesta M54 (matriz de ambición, Nagji &
Tuff HBR 2012).

Se agrega: **enum compartido `ambicion: [operar, expandir, transformar]`** (bolsa por NOVEDAD
mercado×oferta — jamás por plazo, corrección Blank 2019) + campo **opcional** en `idea` (el comité
etiqueta en el triaje), `proyecto_mejora` (hereda de la idea promovida o se etiqueta en el charter) y
`key_result` (colorea la cascada canónica). En `empresa.config_estrategia` entra
**`mezcla_objetivo: {operar, expandir, transformar}`** (default 70/20/10; suma 100; varía por
industria — HBR: industrial ≈70/20/10 · consumo masivo ≈80/18/2 · tech media ≈45/40/15).

**Doctrina que esta ficha fija:** (1) la **mezcla real es DERIVADA** — el motor la computa al leer
(rollup por rol/área/unidad/empresa vs mezcla_objetivo), jamás se persiste (misma regla que
`divergente`/RN-9); (2) **sin cuota por persona** — la mezcla se agrega por rol/área (CK-24: la
persona no es eslabón de medición; la evidencia de ambidestreza dice que explore se concentra y se
protege, no se reparte parejo); (3) **WSJF ordena DENTRO de la bolsa, jamás entre bolsas** (si
operar y transformar compiten en una sola cola, operar devora siempre); (4) campo **opcional** —
portafolio sin etiquetar se MUESTRA "sin clasificar", no se inventa (anti-alucinación M23).

---

## D-23 · `apuesta` — la apuesta del directorio como entidad (ciclo de vida + varas) — `clavada` (ratificada operador 2026-07-27 · M04/M22/M52/M54)
El nivel 1 del twin (mockup v14→v15.1, firmado por el operador) muestra las apuestas del directorio
como dato de mockup con ⚠ declarado; la auditoría del operador (2026-07-27) cerró valor/apetito/
contraste en superficie y dejó UNA deuda: el **ciclo de vida formal**. Esta ficha lo clava.

Se agrega: **entidad `apuesta`** (aggregate root, `apuestas/ap-*.yaml`, ArchiMate Course of Action,
materialización de O1 "Oportunidad / Apuesta") + **enum `estado_apuesta: [por-sellar, sellada,
cumplida, retirada]`** + **enum `nivel_riesgo: [bajo, medio, alto]`** + en
`empresa.config_estrategia` entra **`apetito_riesgo: [{categoria, nivel}]`** (M52 — la vara del
directorio, por categoría abierta por cliente).

Campos: `estado` · `objetivos_ref[]` (≥1 — la apuesta se sostiene en objetivos del ciclo) ·
`valor{monto, supuesto}` (M22 — dinero, no adjetivos; sin supuesto no se afirma) · `apetito{tiempo,
tope}` (M04 appetite — se fija ANTES de apostar) · `riesgo{nivel, categoria}` (M52) · `ambicion`
(M54/D-22) · `sello{por_ref, autoridad_ref, fecha}` (m3.e0.p5 — gate humano-irreducible, registro
inmutable) · `resultado{veredicto, nota, fecha}` (cierre con evidencia).

**Doctrina que esta ficha fija:** (1) **re-apostar NO es estado** — es acción kinética que
RE-VERSIONA la apuesta sellada (git la versiona, mismo patrón que el arnés D-20); cambiar meta o
riesgo jamás edita en silencio. (2) **cumplida/retirada cierran con evidencia** (veredicto contra
sus objetivos — mismo patrón `proyecto_mejora.resultado`); nada se borra: retirada queda en el
historial. (3) **Todo lo contrastable es DERIVADO al leer** — avance/salud (de sus objetivos),
contraste riesgo↔apetito (dentro | al límite | excede | sin vara) y mezcla real de ambición: el twin
los pinta, jamás los persiste. (4) **Apetito sin registro se MUESTRA "sin definir"** — nunca se
inventa (anti-alucinación M23); fijarlo es firma del directorio (gestión-de-cambios). (5) **El sello
es humano-irreducible**: solo el accountable, con gesto de peso, y queda quién/cuándo/qué (m3.e0.p5).

**M04 extendida** (mismo commit): `rol_ancla: fuera-del-twin → ancla[estrategia]` con arbitraje
explícito — el betting del ENGAGEMENT (cómo apostamos nosotros) sigue fuera del twin; al twin entra
la apuesta del CLIENTE sellada por su directorio. Recíprocas M04⇄M52/M22/M54 cableadas.

---

## Micro-opens bancados (no frenan; se resuelven al construir)
- **actividad:** ✅ RESUELTO (D-08) → embebida inline en el proceso, id estable; archivo solo si se comparte/automatiza.
- **función:** ✅ RESUELTO (D-09) → se **DISUELVE** (no entidad): = RACI derivado del wiring; lo no-procesal → campo en `rol`.
- **wiring proceso→org:** ✅ RESUELTO (D-09) → `dueño`/`carril` = `rol`.
- **colisión `sistema.rol`:** ✅ RESUELTO (D-10) → se disuelve: App Component (soporte) + bloque `producto` opt-in (Product); sin renombre.
- **colisión `audiencia`:** ✅ RESUELTO (D-11, fork E) → el de negocio = **`sirve_a`** (interno|cliente-final); el `audiencia` product-paradigm queda con su sentido.
- **persona:rol:** ✅ habilitado (D-11) → lista N:M. **★ RE-CABLEADO por D-19:** la ocupación pasa a `persona.puestos[]`; los roles se DERIVAN por `puesto.roles_ref[]` (un-hecho-un-lugar).
- **puesto vs rol:** ✅ RESUELTO (D-19) → se parten: `puesto` = posición de organigrama (contratación) · `rol` = papel en un proceso (carril BPMN/RACI). No revive `función` (D-09 intacta).
- **"los procesos de un rol":** ✅ RESUELTO (D-19) → posee (`dueño_ref`) ∪ ejecuta (`carril_ref` ∨ `raci.R`); `C`/`I` = contexto de lectura, no generan skills.
- **arnés:** ✅ RESUELTO (D-20) → entidad REGISTRO en el twin (`deriva_de` + versión + drift + autonomía + supervisor); el CONTENIDO lo compila N15 contra `arnes.l0.json`.
- **granularidad del triage:** ✅ RESUELTO (D-21) → piso operable = actividad; tarea sólo cuando tenga `id` (+ carril si difiere). Nunca simular precisión L5 sobre dato L4.
- **audiencia ambos:** ¿un sistema sirve a interno *y* cliente-final a la vez (CRM + portal)? → ¿primario o ambos?

## Futuros bancados (dichos de pasada, guardados)
- **Analytics de producto** (adopción/uso de usuarios) = tercera medida futura sobre la lente `producto`.
- Vitalia/Comunify automatizan **solo venta+pagos** internamente (registro·cobranza·facturación) → insumo para "base mínima".
