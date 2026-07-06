# Decisiones Mapeadas (pre-ledger)

> Estas decisiones **gradúan a fichas I-NN** en `tooling/strategy/PRODUCT-VISION.md` cuando construyamos.
> Estados: `clavada · en-discusión · diferida`.

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

## D-07 · Holding / corporativo — `en-discusión`
chris-corp = **solo un selector** (desplegable de empresas) con **cero dato propio** (sin objetivos, sin
rollup). Afirmado por el operador. *Falta confirmar:* de-dup de sistemas compartidos queda **muerta**;
corporativo es **chris-corp-only** (clientes: techo = empresa).

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
Materializado el modelo normalizado en `.claude/harness/schema/objeto.schema.yaml` (L0), **ADITIVO**: NO toca
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

---

## Micro-opens bancados (no frenan; se resuelven al construir)
- **actividad:** ✅ RESUELTO (D-08) → embebida inline en el proceso, id estable; archivo solo si se comparte/automatiza.
- **función:** ✅ RESUELTO (D-09) → se **DISUELVE** (no entidad): = RACI derivado del wiring; lo no-procesal → campo en `rol`.
- **wiring proceso→org:** ✅ RESUELTO (D-09) → `dueño`/`carril` = `rol`.
- **colisión `sistema.rol`:** ✅ RESUELTO (D-10) → se disuelve: App Component (soporte) + bloque `producto` opt-in (Product); sin renombre.
- **colisión `audiencia`:** ✅ RESUELTO (D-11, fork E) → el de negocio = **`sirve_a`** (interno|cliente-final); el `audiencia` product-paradigm queda con su sentido.
- **persona:rol:** ✅ habilitado (D-11) → `persona.roles[]` es lista (N:M soportado: una persona, varios roles — caso Criscore).
- **audiencia ambos:** ¿un sistema sirve a interno *y* cliente-final a la vez (CRM + portal)? → ¿primario o ambos?

## Futuros bancados (dichos de pasada, guardados)
- **Analytics de producto** (adopción/uso de usuarios) = tercera medida futura sobre la lente `producto`.
- Vitalia/Comunify automatizan **solo venta+pagos** internamente (registro·cobranza·facturación) → insumo para "base mínima".
