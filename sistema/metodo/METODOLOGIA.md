# Metodología — Cockpit · Compendio de referencia

> **Propósito:** catálogo navegable de TODAS las metodologías que sostienen el producto, con
> fuentes y links, para profundizar cualquier tema conforme avanzamos. Principio rector:
> *framework + fuente, con sustancia (cómo lo usamos), no adorno.*
>
> **Documentos hermanos:** [`VISION.md`](../../VISION.md) = el norte del producto ·
> [`LEDGER.md`](../../LEDGER.md) = el registro de decisiones CK-NN. **Este** = el "cómo metodológico", referencia estable.
> El rol de cada estándar en el **Organization Twin** (cuándo sí / cuándo no / cuándo propio) vive en
> [`NOTACIONES.html`](./NOTACIONES.html) (§5).
>
> **Última actualización:** 2026-07-17 (CK-21 · twin + familia I)

---

## 0. Índice de búsqueda rápida

**¿Qué necesito? → dónde ir**

| Necesito… | Ve a |
|---|---|
| El flujo completo de punta a punta (hola → done) | [§1](#1-la-metodología-base-de-punta-a-punta-hola--done) |
| Cómo se alinean gaps ↔ objetivos ↔ procesos ↔ OKRs | [§2 · El Hilo de Oro](#2-el-hilo-de-oro--cadena-de-alineación) |
| Las 5 capas del sistema | [§3](#3-las-capas-del-sistema-referencia-rápida) |
| Una metodología puntual (ficha con fuente + cómo) | [§4 · Catálogo](#4-catálogo-de-metodologías-fichas) |
| Qué estándar usa el twin, en qué rol, cuándo sí/no | [§5 · Notaciones del twin](#5-notaciones-del-twin) |
| Qué metodología aplica en qué punto del mapa | [§6 · Tabla cruzada](#6-mapa-metodología--dónde-se-usa) |
| Todos los links | [Fuentes](#fuentes) |

**Catálogo por familia** (saltar a la ficha):

<!-- GEN:indice -->
- **A · Descubrimiento & Producto:** [Dual Track Agile](#m01) · [Continuous Discovery](#m02) · [Product Operating Model](#m03) · [Shape Up](#m04) · [Jobs-to-be-Done](#m05) · [Impact Mapping](#m06)
- **B · Dominio & Proceso:** [Event Storming](#m07) · [Domain-Driven Design](#m08) · [Value Stream Mapping](#m09) · [Service Blueprint](#m10) · [BPMN](#m11) · [APQC Process Classification Framework](#m12) · [Process / Task Mining](#m29)
- **C · Arquitectura & Sistemas:** [ArchiMate](#m13) · [SYSTEM-MAP + document-project](#m14) · [Business Capability Modeling](#m31)
- **D · Gobierno, Calidad & Madurez:** [COBIT 2019](#m15) · [ISO 9001](#m16) · [ITIL 4](#m17) · [RACI](#m25) · [ISO 10013](#m38)
- **E · Especificación & Construcción:** [Spec-Driven Development](#m18) · [EARS](#m19) · [Specification by Example](#m20)
- **F · Valor, Costo & Alineación:** [OKR](#m21) · [FinOps — Quantify Business Value](#m22) · [Hoshin Kanri](#m26) · [Wardley Mapping](#m27) · [WSJF](#m28) · [Balanced Scorecard](#m30)
- **G · IA: Grounding & Anti-alucinación:** [Grounding](#m23)
- **H · Diseño de Servicio & Experiencia:** [This Is Service Design Doing](#m24)
- **I · Twin & automatización del trabajo:** [Ontología Palantir](#m32) · [DEMO](#m33) · [BPSim](#m34) · [ECRS](#m35) · [Criterios RPA + agente](#m36) · [Taxonomía de verbos](#m37) · [NASA-TLX](#m39) · [Métricas de persona](#m40)
<!-- /GEN:indice -->

---

## 1. La metodología base de punta a punta (hola → done)

El engagement completo, con el framework que respalda cada paso. Módulos: **M1** Levantamiento ·
**M2** Mantenimiento · **M3** Mejora continua (ver [`M1-LEVANTAMIENTO.md`](./M1-LEVANTAMIENTO.md) ·
[`M3-ESPINAZO.md`](./M3-ESPINAZO.md) · [`PROCESS-AS-DATA.md`](./PROCESS-AS-DATA.md)).

| # | Paso | Módulo | Framework(s) | Salida |
|---|---|---|---|---|
| 1 | **Hola / Encuadre** | M1 | Contexto org [ISO 9001 cl.4](#m16) · objetivos [OKR](#m21)+[COBIT cascade](#m15) · autoridad RACI | objetivos + stakeholders + autoridad |
| 2 | **Ingesta + Triage** del dump (~1GB) | M1 | [Grounding/Provenance](#m23) | artefactos clasificados (tipo·fecha·autoridad·confianza) |
| 3 | **AS-IS de sistemas** | M1 | [document-project](#m14) · [ArchiMate](#m13) (cuáles digitales) · bot código↔docs (drift) | SYSTEM-MAP + capability ledger |
| 4 | **AS-IS de procesos** | M1 | [APQC PCF](#m12) (taxonomía) · [Event Storming](#m07)/[VSM](#m09) · [Service Blueprint](#m10) · entrevistas (doc-vs-real) | mapa de procesos actual + dolores |
| 5 | **Alineación (Hilo de Oro)** | M1 | [COBIT goals cascade](#m15) · [OKR](#m21) · [Impact Mapping](#m06) | objetivo→KR→proceso→persona→sistema |
| 6 | **Gap Analysis** | M1 | AS-IS vs estándar deseado (objetivos + madurez + readiness) | semáforo + brechas (proceso/sistema), **cada una atada a un objetivo** |
| 7 | **Diagnóstico** (entregable vendible) | M1 | síntesis | mapa + brechas + plan priorizado + proyección valor/costo |
| 8 | **Apuesta** | M3 | [Shape Up](#m04) (appetite/no-gos) · [OST](#m02) | outcome + appetite + no-gos |
| 9 | **Contrato (spec ratificado)** | M3 | [Spec-Driven Dev](#m18) · [EARS](#m19) · chequeo de contradicciones | spec = contrato (gate G1) |
| 10 | **Construcción** | M3 | Claude Code + gates SDD · [BDD](#m20) | código + tests |
| 11 | **Aceptación + Valor** | M3 | [FinOps Quantify Value](#m22) · [Impact Mapping](#m06) | aporte por capability **sube al KR** |
| 12 | **Mantenimiento (loop)** | M2 | [ISO 9001 PDCA](#m16) · contexto vivo · aprobar/rechazar | baseline vivo → re-prioriza |

El corte **Discovery/Delivery** ([Dual Track](#m01)) cae en el paso 9 (G1). El loop de valor
(paso 11→1) cierra el ciclo.

---

## 2. El Hilo de Oro — cadena de alineación

> El eslabón que faltaba: **todo gap debe rastrear hacia arriba a un objetivo de negocio, y todo
> objetivo hacia abajo a las capabilities que lo mueven.** Trazabilidad bidireccional y auditable.
> **Lo SOPORTA el sistema** (estructura de datos en la capa de contexto + visual en el cockpit),
> no solo el consultor.

```
PLAN A 3 AÑOS → PLAN ANUAL   (Hoshin — el mapa; capas 0-5 de objetivos.md §6)
   └─▶ OBJETIVO DE NEGOCIO  (ISO 9001 cl.6.2 · COBIT enterprise goal — del directorio)
         └─▶ KR TRIMESTRAL  (OKR — el indicador que se propone mover este trimestre)
               └─▶ KPI  (del PROCESO, con dueño = ROL o ÁREA — APQC PCF · Value Stream)
                     └─▶ ACTIVIDAD (verbo — M37; la persona entra como OCUPANTE del rol, CK-24)
                           └─▶ SISTEMA(S)   (SYSTEM-MAP · ArchiMate)
                                 └─▶ CAPABILITY   (capability ledger)
                                       └─▶ GAP   (brecha detectada)
                                             └─▶ HISTORIA → CÓDIGO   (SDD · EARS)
```
> **Cascada canónica ÚNICA** (re-fichado 2026-07-17, spec `arquitectura-refichado-ck21`): ésta es LA
> definición del hilo — reconcilia las tres variantes que convivían en el repo. La PERSONA no es
> eslabón de medición: el KPI ancla a rol/proceso/área y la persona lo hereda como ocupante
> (frontera **CK-24**; atribución actividad→KPI = N:M vía rol).

**Hacia arriba (auditoría):** un gap/historia siempre responde "¿qué objetivo mueve y qué KR?".
**Hacia abajo (priorización):** un objetivo siempre muestra "¿qué capabilities/gaps lo sirven y cuánto aportan?".

Frameworks que lo fundan: [COBIT goals cascade](#m15) (objetivo de empresa → objetivo de IT),
[OKR](#m21) (objetivo → key results por trimestre), [Impact Mapping](#m06)
(Goal→Actor→Impact→Deliverable), y el **capability ledger** propio (cap → historia → código).

**Requisito de producto:** la capa de contexto guarda esta cadena como dato de primera clase; el
cockpit la visualiza (de objetivo a gap y de vuelta); el loop de valor hace *roll-up* del aporte
real de cada capability hasta el KR.

---

## 3. Las capas del sistema (referencia rápida)

Modelo vigente CK-18/CK-21 (arquitectura: [`sistema/arquitectura/NODOS.md`](../arquitectura/NODOS.md)).
1. **Actores** — Cliente (sponsor·ops·trabajadores) · Consultor (usuario primario, rol transferible al Analista de Calidad) · Máquina (arneses).
2. **3 módulos** — M1 Levantamiento → M2 Mantenimiento ⇄ M3 Mejora continua.
3. **3 planos de runtime** — Edge (arneses del método sobre Claude Code: Consultio N14 / DevStudio N5 — sin voz ni motor conversacional server-side, muertos CK-18) · Organización (Cockpit N13 + Repositorio Oficial N6 + Lakehouse N16) · Fabricante (Arnesia N15 + distribución N3); seam = git/filesystem.
4. **Capa de contexto viva** — objetivos·personas·procesos·sistemas·brechas, con provenance+confianza; git = sync.
5. **Espinazo de frameworks** — este documento (§4) + el Hilo de Oro (§2) + las notaciones del twin (§5).
6. **Loop de valor** — costo + ahorro + aporte por capability.

---

## 4. Catálogo de metodologías (fichas)

> Formato (generado desde [`methodologies.yaml`](./methodologies.yaml)): **Qué** · **Fuente** · **Objeto** · **Aporte único** · **Cuándo** · **Combina** · **Principios**.

<!-- GEN:cards -->
### Familia A · Descubrimiento & Producto


<a id="m01"></a>**M01 · Dual Track Agile**
- **Qué:** separa discovery (qué vale construir) de delivery (construirlo bien)
- **Fuente:** Sy/Miller; pop. Cagan & Patton — Dual Track Agile (2007/2012). [https://productschool.com/blog/product-fundamentals/dual-track-agile](https://productschool.com/blog/product-fundamentals/dual-track-agile)
- **Objeto:** O1 Oportunidad / Apuesta · sec: O7
- **Aporte único:** el CORTE discovery/delivery — cuándo dejar de explorar y empezar a construir (=G1)
- **Cuándo:** decidir el límite entre exploración y construcción
- **Combina:** M02 (el discovery alimenta el delivery) · M18 (delivery = SDD tras el gate G1)
- **Principios:** P1, P7

<a id="m02"></a>**M02 · Continuous Discovery / Opportunity Solution Tree (OST)**
- **Qué:** árbol Outcome→Oportunidades→Soluciones→Assumption Tests
- **Fuente:** Teresa Torres — Continuous Discovery Habits (2021). [https://www.producttalk.org/](https://www.producttalk.org/)
- **Objeto:** O1 Oportunidad / Apuesta · sec: O2
- **Aporte único:** el ÁRBOL que estructura la exploración de valor y conecta solución↔outcome
- **Cuándo:** etapa 1 — exploración de valor; artefacto central del cockpit
- **Combina:** M05 (JTBD ancla la oportunidad en el trabajo real) · M06 (impact mapping da la cadena de valor)
- **Principios:** P1, P2

<a id="m03"></a>**M03 · Product Operating Model**
- **Qué:** modelo operativo: discovery + delivery + equipos empoderados; outcomes > outputs
- **Fuente:** Marty Cagan / SVPG — Transformed (2024). [https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/](https://www.svpg.com/books/transformed-moving-to-the-product-operating-model/)
- **Objeto:** T3 Gobierno / Loop · sec: O1
- **Aporte único:** el PARAGUAS que justifica equipos-por-outcome (IA + consultor = el 'equipo')
- **Cuándo:** encuadre del modus operandi de M3
- **Combina:** M02 (su discovery es continuo) · M04 (su delivery apuesta con appetite)
- **Principios:** P1

<a id="m04"></a>**M04 · Shape Up**
- **Qué:** shaping (solución a grueso), appetite (tiempo fijo), no-gos, betting, ciclos
- **Fuente:** Ryan Singer / Basecamp — Shape Up (2019). [https://basecamp.com/shapeup](https://basecamp.com/shapeup)
- **Objeto:** O1 Oportunidad / Apuesta · sec: O6
- **Aporte único:** el APPETITE — tiempo fijo / alcance variable, y los no-gos de la apuesta
- **Cuándo:** etapa 0/3 — apostar y dar forma al pitch
- **Combina:** M02 (la oportunidad a apostar sale del OST) · M21 (el appetite se ata a mover un KR)
- **Principios:** P1, P7

<a id="m05"></a>**M05 · Jobs-to-be-Done (JTBD)**
- **Qué:** enmarca la necesidad como el 'trabajo' que el usuario contrata, no como feature
- **Fuente:** Clayton Christensen — Know Your Customers' Jobs to Be Done (HBR 2016). [https://hbr.org/2016/09/know-your-customers-jobs-to-be-done](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)
- **Objeto:** O1 Oportunidad / Apuesta · sec: T2, O2
- **Aporte único:** el TRABAJO (job, no feature) — evita soluciones disfrazadas de problema
- **Cuándo:** etapa 1, junto al OST, para anclar la oportunidad
- **Combina:** M02 (alimenta el árbol de oportunidades) · M24 (el job informa persona y journey)
- **Principios:** P1

<a id="m06"></a>**M06 · Impact Mapping**
- **Qué:** mapa Goal → Actor → Impact → Deliverable
- **Fuente:** Gojko Adzic — Impact Mapping. [https://www.impactmapping.org/](https://www.impactmapping.org/)
- **Objeto:** O2 Objetivo & Valor · sec: O1
- **Aporte único:** la CADENA Goal→Deliverable que permite atribuir aporte por capability
- **Cuándo:** Hilo de Oro; etapa 1; loop de valor
- **Combina:** M21 (el impact aterriza en KR trimestral) · M15 (comparte el goals cascade) · M22 (atribuye el aporte por capability)
- **Principios:** P1, P2

### Familia B · Dominio & Proceso


<a id="m07"></a>**M07 · Event Storming**
- **Qué:** taller: eventos de dominio → comandos → actores → políticas → agregados
- **Fuente:** Alberto Brandolini — Event Storming. [https://www.eventstorming.com/](https://www.eventstorming.com/)
- **Objeto:** O3 Proceso · sec: O5
- **Aporte único:** los EVENTOS de dominio → bounded contexts (rompe en multi-sistema)
- **Cuándo:** AS-IS de procesos (paso 4) y descomposición (etapa 3)
- **Combina:** M08 (los eventos revelan los bounded contexts) · M09 (el flujo de eventos es el value stream)
- **Principios:** P3, P4

<a id="m08"></a>**M08 · Domain-Driven Design (DDD)**
- **Qué:** modelado del dominio; bounded contexts; lenguaje ubicuo
- **Fuente:** Eric Evans — Domain-Driven Design (2003). [https://www.domainlanguage.com/](https://www.domainlanguage.com/)
- **Objeto:** O5 Sistema & Capabilities · sec: O3
- **Aporte único:** los BOUNDED CONTEXTS + lenguaje ubicuo — dónde están las costuras de integración
- **Cuándo:** etapa 3; arquitectura de sistemas
- **Combina:** M07 (del event storming salen los contexts) · M13 (los contexts mapean a aplicaciones)
- **Principios:** P4

<a id="m09"></a>**M09 · Value Stream Mapping (VSM)**
- **Qué:** técnica lean: visualiza flujo de valor y desperdicio; future-state map
- **Fuente:** Rother & Shook — Learning to See (LEI). [https://www.lean.org/](https://www.lean.org/)
- **Objeto:** O3 Proceso · sec: O6
- **Aporte único:** el FUTURE-STATE del FLUJO + el desperdicio visible (toque vs espera) — vende el ahorro a nivel de flujo; el veredicto por actividad es del triage ECRS (M35)
- **Cuándo:** AS-IS de procesos y modelado de future-state (etapa 3)
- **Combina:** M10 (el blueprint dice dónde duele; VSM optimiza el proceso detrás) · M07 (comparten el flujo de valor) · M35 (VSM revela el flujo; ECRS ordena el veredicto por actividad)
- **Principios:** P3, P1

<a id="m10"></a>**M10 · Service Blueprint**
- **Qué:** mapea la experiencia del cliente contra los procesos internos (inside-out)
- **Fuente:** Nielsen Norman Group — Service Blueprints. [https://www.nngroup.com/articles/service-blueprints-definition/](https://www.nngroup.com/articles/service-blueprints-definition/)
- **Objeto:** O3 Proceso · sec: T2
- **Aporte único:** el INSIDE-OUT (experiencia ↔ proceso) — revela dónde duele
- **Cuándo:** AS-IS de procesos (paso 4)
- **Combina:** M09 (tras el dolor, VSM optimiza el proceso detrás) · M24 (TiSDD lo extiende a frontstage/backstage + interfaces)
- **Principios:** P3, P4

<a id="m11"></a>**M11 · BPMN**
- **Qué:** notación estándar para modelar procesos de negocio
- **Fuente:** Object Management Group — BPMN 2.0. [https://www.bpmn.org/](https://www.bpmn.org/)
- **Objeto:** O3 Proceso
- **Aporte único:** la NOTACIÓN común cuando un proceso necesita formalizarse con rigor
- **Cuándo:** documentación de procesos (M1/M2); opcional sobre Event Storming/VSM
- **Combina:** M07 (formaliza lo que emergió en el storming) · M09 (notación sobre el value stream)
- **Principios:** P4

<a id="m12"></a>**M12 · APQC Process Classification Framework (PCF)**
- **Qué:** taxonomía universal de procesos (12 categorías, ~1000 procesos), open standard
- **Fuente:** APQC — Process Classification Framework. [https://www.apqc.org/process-frameworks](https://www.apqc.org/process-frameworks)
- **Objeto:** O3 Proceso
- **Aporte único:** la TAXONOMÍA universal — el esqueleto para no perderse en el 1GB + cobertura
- **Cuándo:** AS-IS de procesos — clasificar cada proceso hallado
- **Combina:** M07 (esqueleto donde cuelgan los eventos) · M10 (clasifica los procesos del blueprint)
- **Principios:** P4

<a id="m29"></a>**M29 · Process / Task Mining**
- **Qué:** descubre el proceso REAL desde logs de sistemas y clicks de escritorio; halla desviaciones, cuellos de botella y oportunidades de automatización
- **Fuente:** Wil van der Aalst (process mining) · Celonis (líder Gartner MQ 2025) — Process & Task Mining — descubrimiento desde datos. [https://www.celonis.com/process-mining/what-is-process-mining/](https://www.celonis.com/process-mining/what-is-process-mining/)
- **Objeto:** T1 Dato / Grounding · sec: O3, O6
- **Aporte único:** el AS-IS REAL desde DATOS (no declarado) + dónde automatizar — los 'agentes' que recorren sistemas para mapear de verdad
- **Cuándo:** etapa 1 (mapeo automático del AS-IS) + etapa 3 (detectar puestos/tareas automatizables con IA)
- **Combina:** M12 (clasifica los procesos hallados en la taxonomía APQC) · M09 (VSM optimiza el flujo que el mining reveló) · M14 (alimenta el SYSTEM-MAP con uso real) · M23 (el dato minado lleva fuente·confianza (grounding)) · M36 (alimenta volumen/%excepciones de los dos scores del triage)
- **Principios:** P5, P3

### Familia C · Arquitectura & Sistemas


<a id="m13"></a>**M13 · ArchiMate / TOGAF**
- **Qué:** lenguaje y framework de arquitectura empresarial; capas negocio/aplicación/tecnología
- **Fuente:** The Open Group — ArchiMate / TOGAF. [https://www.opengroup.org/](https://www.opengroup.org/)
- **Objeto:** O5 Sistema & Capabilities · sec: O3
- **Aporte único:** el MAPEO negocio↔aplicación — responde cuáles procesos son digitales
- **Cuándo:** AS-IS de sistemas (paso 3)
- **Combina:** M14 (da el marco que el SYSTEM-MAP puebla) · M08 (capa-aplicación ↔ bounded contexts)
- **Principios:** P4, P2

<a id="m14"></a>**M14 · SYSTEM-MAP + document-project (propio)**
- **Qué:** mapa vivo de sistemas + capabilities, leyendo el código real (reverse-engineer)
- **Fuente:** prenter-harness (propio); insp. BMAD document-project — SYSTEM-MAP. [https://github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
- **Objeto:** O5 Sistema & Capabilities · sec: T1
- **Aporte único:** el MAPA VIVO desde el código + drift código↔docs
- **Cuándo:** AS-IS de sistemas (paso 3); plano Análisis
- **Combina:** M13 (ArchiMate da el marco; el bot lo puebla) · M23 (cada dato del mapa lleva fuente + confianza)
- **Principios:** P5, P3

<a id="m31"></a>**M31 · Business Capability Modeling**
- **Qué:** modela QUÉ hace la empresa (capacidades, no cómo) en un mapa; aplica heatmap de madurez/desempeño/dolor para ubicar gaps
- **Fuente:** The Open Group (TOGAF Business Architecture) · práctica LeanIX — Business Capability Map + heatmap de gaps. [https://pubs.opengroup.org/togaf-standard/business-architecture/business-capabilities.html](https://pubs.opengroup.org/togaf-standard/business-architecture/business-capabilities.html)
- **Objeto:** O5 Sistema & Capabilities · sec: O3, O6
- **Aporte único:** el MAPA DE CAPACIDADES con HEATMAP — dónde están los gaps/dolores y dónde conviene invertir, estable frente al cómo
- **Cuándo:** etapa 1 — el mapa de la organización + heatmap de gaps alineado a los objetivos
- **Combina:** M13 (vive en la capa-negocio de ArchiMate/TOGAF) · M12 (las capacidades se sostienen en procesos APQC) · M27 (Wardley pone evolución a cada capacidad) · M15 (el heatmap usa niveles de madurez COBIT)
- **Principios:** P4, P3

### Familia D · Gobierno, Calidad & Madurez


<a id="m15"></a>**M15 · COBIT 2019**
- **Qué:** gobierno de IT; goals cascade (empresa→IT); niveles de capability/madurez
- **Fuente:** ISACA — COBIT 2019. [https://www.isaca.org/resources/cobit](https://www.isaca.org/resources/cobit)
- **Objeto:** O6 Gap & Madurez · sec: O2
- **Aporte único:** el GOALS CASCADE + niveles de madurez (el semáforo del gap)
- **Cuándo:** Hilo de Oro + Gap Analysis (madurez digital). Modo lite, sin certificación
- **Combina:** M21 (cascade + OKR = el hilo hacia arriba) · M06 (comparten la cadena objetivo→valor)
- **Principios:** P2, P3

<a id="m16"></a>**M16 · ISO 9001**
- **Qué:** gestión de calidad; enfoque a procesos; PDCA (cl.10); contexto (cl.4); objetivos (cl.6.2); autoridad (cl.5.3)
- **Fuente:** ISO — ISO 9001:2015. [https://www.iso.org/iso-9001-quality-management.html](https://www.iso.org/iso-9001-quality-management.html)
- **Objeto:** T3 Gobierno / Loop · sec: O4
- **Aporte único:** la ONTOLOGÍA de contexto (cl.4) + el ciclo PDCA — robamos ontología, rechazamos aparato
- **Cuándo:** capa de contexto (vocabulario) y M2/M3 (mejora continua)
- **Combina:** M21 (objetivos cl.6.2 se expresan como OKR) · M25 (roles/autoridad cl.5.3 = RACI) · M38 (cl.7.5 información documentada = pirámide ISO 10013)
- **Principios:** P4, P7

<a id="m17"></a>**M17 · ITIL 4**
- **Qué:** gestión de servicios IT; Service Value System; value streams de servicio
- **Fuente:** Axelos / PeopleCert — ITIL 4. [https://www.peoplecert.org/](https://www.peoplecert.org/)
- **Objeto:** T3 Gobierno / Loop
- **Aporte único:** la rebanada para operar servicios IT que ya corren (helpdesk/incidentes/cambios)
- **Cuándo:** situacional — solo si el cliente opera servicios IT. NO es la columna
- **Combina:** M16 (service value system sobre el ciclo PDCA)
- **Principios:** P7

<a id="m25"></a>**M25 · RACI (Responsibility Assignment Matrix)**
- **Qué:** matriz de asignación de responsabilidad: Responsible · Accountable · Consulted · Informed
- **Fuente:** PMI — PMBOK Guide — Responsibility Assignment Matrix. [https://www.pmi.org/](https://www.pmi.org/)
- **Objeto:** O4 Personas & Autoridad · sec: T3
- **Aporte único:** la AUTORIDAD explícita — quién es Accountable habilita y ejecuta cada gate humano
- **Cuándo:** encuadre (autoridad) y en cada gate (quién ratifica/apuesta/acepta)
- **Combina:** M16 (formaliza roles/autoridad ISO cl.5.3) · M15 (el Accountable del KR ejecuta el gate) · M24 (alimenta el stakeholder map) · M36 (humano-por-diseño ancla a la A (accountability, firma, responsabilidad legal))
- **Principios:** P7, P2

<a id="m38"></a>**M38 · ISO 10013:2021 — pirámide documental (QMS)**
- **Qué:** pirámide documental del QMS: manual → procedimientos → instrucciones de trabajo → registros, alineada a ISO 9001 cl.7.5
- **Fuente:** ISO — ISO 10013:2021 — Guidance for documented information. [https://www.iso.org/standard/70936.html](https://www.iso.org/standard/70936.html)
- **Objeto:** T3 Gobierno / Loop · sec: O3
- **Aporte único:** la PIRÁMIDE que clasifica el corpus documental del CLIENTE — cada documento sabe su nivel y a qué proceso sirve
- **Cuándo:** clasificar manuales/procedimientos/instrucciones/registros del cliente en el levantamiento y su mantenimiento
- **Combina:** M16 (instancia cl.7.5 (información documentada) del paraguas ISO 9001) · M12 (el documento clasificado ancla al proceso APQC que gobierna)
- **Principios:** P4, P7

### Familia E · Especificación & Construcción


<a id="m18"></a>**M18 · Spec-Driven Development (SDD)**
- **Qué:** el spec/intent es la fuente de verdad; el código es la última milla
- **Fuente:** GitHub Spec Kit · Amazon Kiro · BMAD — Spec-Driven Development. [https://github.com/github/spec-kit](https://github.com/github/spec-kit)
- **Objeto:** O7 Contrato & Código · sec: O2
- **Aporte único:** el SPEC=CONTRATO — gates validan el código contra el spec en cada commit
- **Cuándo:** etapas 4–5 (contrato → construcción); núcleo del harness
- **Combina:** M19 (los criterios EARS pueblan el spec) · M20 (los ejemplos BDD prueban el spec)
- **Principios:** P6, P2

<a id="m19"></a>**M19 · EARS (Easy Approach to Requirements Syntax)**
- **Qué:** sintaxis de criterios atómicos testeables: WHEN [cond] THE SYSTEM SHALL [comportamiento]
- **Fuente:** Alistair Mavin / Rolls-Royce — EARS (2009). [https://alistairmavin.com/ears/](https://alistairmavin.com/ears/)
- **Objeto:** O7 Contrato & Código
- **Aporte único:** la SINTAXIS sin ambigüedad, directamente testeable (NASA/Airbus)
- **Cuándo:** etapa 4 — escribir criterios de aceptación
- **Combina:** M18 (puebla el contrato/spec) · M20 (EARS + ejemplo = criterio vivo)
- **Principios:** P6

<a id="m20"></a>**M20 · Specification by Example / BDD**
- **Qué:** ejemplos concretos acordados se vuelven pruebas de aceptación ejecutables
- **Fuente:** Gojko Adzic — Specification by Example (2011). [https://gojko.net/books/specification-by-example/](https://gojko.net/books/specification-by-example/)
- **Objeto:** O7 Contrato & Código
- **Aporte único:** los EJEMPLOS ejecutables — documentan y prueban a la vez
- **Cuándo:** etapas 4–5; complementa EARS
- **Combina:** M19 (ejemplos sobre los criterios EARS) · M18 (tests de aceptación del spec)
- **Principios:** P6

### Familia F · Valor, Costo & Alineación


<a id="m21"></a>**M21 · OKR (Objectives & Key Results)**
- **Qué:** objetivo cualitativo + key results medibles por trimestre
- **Fuente:** John Doerr; Christina Wodtke — Measure What Matters / Radical Focus. [https://www.whatmatters.com/](https://www.whatmatters.com/)
- **Objeto:** O2 Objetivo & Valor
- **Aporte único:** el KR TRIMESTRAL — el indicador a mover, target de etapa 0 y destino del roll-up
- **Cuándo:** encuadre (paso 1) + Hilo de Oro
- **Combina:** M15 (el KR baja del goals cascade) · M22 (el roll-up sube el aporte real al KR) · M06 (impact conecta KR ↔ deliverable)
- **Principios:** P1, P2

<a id="m22"></a>**M22 · FinOps — Quantify Business Value**
- **Qué:** empareja gasto tecnológico con valor de negocio; unit economics; atribución
- **Fuente:** FinOps Foundation — Quantify Business Value. [https://www.finops.org/framework/domains/quantify-business-value/](https://www.finops.org/framework/domains/quantify-business-value/)
- **Objeto:** O2 Objetivo & Valor · sec: T3
- **Aporte único:** el UNIT ECONOMICS — costo real + ahorro contrafactual (vs devs) + aporte por capability
- **Cuándo:** loop de valor (aceptación, paso 11)
- **Combina:** M21 (el aporte sube al KR) · M06 (atribución por capability)
- **Principios:** P1, P2

<a id="m26"></a>**M26 · Hoshin Kanri (Strategy Deployment)**
- **Qué:** traduce la visión a 3-5 años → breakthrough anual → prioridades → métricas, en cascada por niveles con catchball (ida y vuelta)
- **Fuente:** Yoji Akao (orígenes) · práctica Lean/Toyota — Hoshin Kanri — Policy Deployment (X-matrix · catchball). [https://blog.i-nexus.com/hoshin-kanri-x-matrix-explained](https://blog.i-nexus.com/hoshin-kanri-x-matrix-explained)
- **Objeto:** O2 Objetivo & Valor · sec: O4, T3
- **Aporte único:** la CASCADA estrategia→toda-la-org — baja las metas del directorio hasta el último peldaño, con acuerdo bidireccional (catchball)
- **Cuándo:** etapa 1 — alinear el TO-BE a los objetivos del directorio; plan a 3 años → slice anual → OKR trimestral
- **Combina:** M21 (Hoshin da la dirección multi-año; OKR ejecuta el trimestre dentro de ella) · M15 (comparte el goals cascade (empresa→IT)) · M30 (BSC traduce cada nivel a KPIs por perspectiva)
- **Principios:** P1, P2

<a id="m27"></a>**M27 · Wardley Mapping**
- **Qué:** mapea la cadena de valor contra la evolución de cada componente (génesis→custom→producto→commodity); situational awareness
- **Fuente:** Simon Wardley — Wardley Maps (value chain × evolución · CC-BY-SA). [https://www.wardleymaps.com/glossary/evolution-stages](https://www.wardleymaps.com/glossary/evolution-stages)
- **Objeto:** O5 Sistema & Capabilities · sec: O2, O6
- **Aporte único:** la EVOLUCIÓN de cada componente en el tiempo → qué construir (génesis), qué comprar (producto), qué tercerizar (commodity)
- **Cuándo:** etapa 1 — el plan a 3 años; cómo la 'maquinaria' (procesos·sistemas) evoluciona según los objetivos
- **Combina:** M31 (el mapa de capacidades alimenta la cadena de valor) · M13 (ArchiMate da las capas; Wardley les pone evolución) · M15 (la madurez COBIT informa la posición evolutiva)
- **Principios:** P3, P2

<a id="m28"></a>**M28 · WSJF / Cost of Delay**
- **Qué:** priorización económica: costo de retraso (valor + criticidad-tiempo + reducción-riesgo) ÷ tamaño del trabajo
- **Fuente:** Don Reinertsen (Cost of Delay) · SAFe (WSJF) — Weighted Shortest Job First = CoD ÷ tamaño. [https://framework.scaledagile.com/wsjf](https://framework.scaledagile.com/wsjf)
- **Objeto:** O6 Gap & Madurez · sec: O1, O2
- **Aporte único:** la PRIORIZACIÓN económica de los gaps — qué atacar primero por retorno/urgencia ÷ esfuerzo (vs orden por capricho)
- **Cuándo:** etapa 2 — priorizar los gaps detectados antes de pasarlos a discovery/delivery
- **Combina:** M22 (FinOps cuantifica el valor/ahorro que entra al CoD) · M04 (el appetite de Shape Up acota el tamaño del trabajo) · M06 (Impact Mapping da el valor de negocio del numerador)
- **Principios:** P1

<a id="m30"></a>**M30 · Balanced Scorecard**
- **Qué:** traduce la estrategia a objetivos+métricas ligados en 4 perspectivas (financiera · cliente · procesos · aprendizaje), vía un strategy map
- **Fuente:** Robert Kaplan & David Norton — The Balanced Scorecard (HBR 1992 · libro 1996). [https://balancedscorecard.org/bsc-basics-overview/](https://balancedscorecard.org/bsc-basics-overview/)
- **Objeto:** O2 Objetivo & Valor · sec: T3
- **Aporte único:** el STRATEGY MAP — liga aprendizaje→procesos→cliente→finanzas y cascada a unidades/personas (el 'por qué' detrás de cada KPI)
- **Cuándo:** etapa 1 — traducir la estrategia del directorio a KPIs por perspectiva; complementa OKR/Hoshin
- **Combina:** M26 (Hoshin despliega la estrategia; BSC la mide por perspectiva) · M21 (los KR se anclan a los objetivos del scorecard) · M06 (Impact conecta objetivo→entregable)
- **Principios:** P1, P2

### Familia G · IA: Grounding & Anti-alucinación


<a id="m23"></a>**M23 · Grounding / RAG + Provenance**
- **Qué:** funda las salidas del LLM en fuentes reales (RAG, citas, juez en runtime)
- **Fuente:** investigación 2026 (Braintrust) — Grounding / RAG + Provenance. [https://www.braintrust.dev/articles/best-hallucination-detection-tools-2026](https://www.braintrust.dev/articles/best-hallucination-detection-tools-2026)
- **Objeto:** T1 Dato / Grounding
- **Aporte único:** FUENTE + CONFIANZA + FRESCURA por dato — el grounding anula lo que lo contradiga
- **Cuándo:** todo el AS-IS (paso 2) y como regla transversal
- **Combina:** M14 (el drift código↔docs es una señal de confianza) · M40 (gemela transversal: provenance del dato ↔ gobernanza del dato de persona)
- **Principios:** P5

### Familia H · Diseño de Servicio & Experiencia


<a id="m24"></a>**M24 · This Is Service Design Doing (TiSDD)**
- **Qué:** manual práctico del service design; toolkit personas/journey/stakeholder/blueprint
- **Fuente:** Stickdorn, Hormess, Lawrence, Schneider — This Is Service Design Doing (O'Reilly 2018). [https://www.thisisservicedesigndoing.com/](https://www.thisisservicedesigndoing.com/)
- **Objeto:** T2 Experiencia / Servicio · sec: O3, O4
- **Aporte único:** el TOOLKIT que revela qué pantallas existen, quién las usa y qué procesos las sostienen
- **Cuándo:** productizar cada etapa (interfaces frontend + actores + experiencia del sponsor)
- **Combina:** M10 (extiende el service blueprint a frontstage/backstage) · M05 (el job ancla persona y journey) · M25 (el stakeholder map se cruza con RACI)
- **Principios:** P3, P4, P1

### Familia I · Twin & automatización del trabajo


<a id="m32"></a>**M32 · Doctrina de ontología Palantir (semántica + kinética)**
- **Qué:** la GRAMÁTICA del objeto.schema: semántica (entidades + relaciones) + kinética (acciones/cambio) + provenance structs + principio open/closed (extensible sin fork)
- **Fuente:** Palantir — Foundry Ontology — best practices (adoptada CK-21). [https://www.palantir.com/docs/foundry/ontology/](https://www.palantir.com/docs/foundry/ontology/)
- **Objeto:** O7 Contrato & Código · sec: T1
- **Aporte único:** el METAMODELO PROPIO as-code en git — entidad-primero (no notation-first), con provenance y extensión por cliente como propiedades de la gramática
- **Cuándo:** siempre — es la gramática de las 9 entidades del twin; toda evolución del schema la respeta
- **Combina:** M23 (los provenance structs (fuente+conf) son parte de la gramática) · M13 (ArchiMate presta tipos como vocabulario DENTRO del metamodelo propio)
- **Principios:** P4, P5

<a id="m33"></a>**M33 · DEMO / Enterprise Ontology (Dietz)**
- **Qué:** base formal de la organización como red de transacciones comunicativas (actor → coordinación → producción)
- **Fuente:** Jan Dietz — Enterprise Ontology — the DEMO methodology. [https://ee-institute.org/](https://ee-institute.org/)
- **Objeto:** O3 Proceso · sec: O4
- **Aporte único:** la BASE FORMAL de transacciones — si algún día formalizamos la ontología comunicativa del twin
- **Cuándo:** todavía no — horizonte D9; se activa solo con la decisión de formalizar transacciones
- **Combina:** M07 (los eventos del storming son la semilla informal de sus transacciones) · M34 (una base formal haría simulable/verificable el modelo (BPSim))
- **Principios:** P4

<a id="m34"></a>**M34 · BPSim (Business Process Simulation)**
- **Qué:** parametriza modelos BPMN para simulación (tiempos, recursos, colas, escenarios what-if)
- **Fuente:** WfMC / OMG — BPSim — Business Process Simulation Interchange. [https://www.bpsim.org/](https://www.bpsim.org/)
- **Objeto:** O3 Proceso · sec: O6
- **Aporte único:** el WHAT-IF estándar sobre el proceso — simular el TO-BE antes de construirlo, sin inventar formato propio
- **Cuándo:** todavía no — horizonte D9; requiere twin base + datos de operación + demanda real
- **Combina:** M11 (parametriza el modelo BPMN-lite ya existente) · M29 (los parámetros (tiempos/volúmenes) salen del mining, no de estimaciones)
- **Principios:** P3, P4

<a id="m35"></a>**M35 · ECRS (Eliminar · Combinar · Reordenar · Simplificar)**
- **Qué:** el ORDEN del triage por actividad: Eliminar → Combinar → Reordenar → Simplificar, ANTES de cualquier automatización
- **Fuente:** ingeniería de métodos clásica (Barnes) — Motion and Time Study — cuestionario ECRS. [https://en.wikipedia.org/wiki/Methods_engineering](https://en.wikipedia.org/wiki/Methods_engineering)
- **Objeto:** O3 Proceso · sec: O6
- **Aporte único:** el ORDEN — no se automatiza el desperdicio: primero eliminar/combinar/reordenar/simplificar, recién después puntuar automatización
- **Cuándo:** triage de actividades (diagnóstico M1 y mejora M3), antes de correr los scores
- **Combina:** M09 (VSM revela el flujo/desperdicio; ECRS ordena el veredicto por actividad) · M36 (lo que sobrevive a ECRS recién se puntúa (RPA/agente)) · M29 (la evidencia minada sostiene el 'eliminar' con datos)
- **Principios:** P1, P3

<a id="m36"></a>**M36 · Criterios de automatizabilidad — RPA + agente-LLM (dos scores)**
- **Qué:** DOS scores DERIVADOS por actividad: score-RPA = f(datos estructurados, reglas estables, volumen, %excepciones) · score-agente = f(dato no estructurado, criterio expresable en prompt/policy, tolerancia a revisión humana, riesgo de error)
- **Fuente:** Lacity & Willcocks (criterios RPA) · práctica agéntica 2025-26 · propia (scores) — RPA suitability + criterios agente-LLM — dos scores derivados (spec CK-21). [https://en.wikipedia.org/wiki/Robotic_process_automation](https://en.wikipedia.org/wiki/Robotic_process_automation)
- **Objeto:** O3 Proceso · sec: O6, O4
- **Aporte único:** los DOS SCORES con conf propagada + el VEREDICTO enum (eliminable · automatizable-RPA · automatizable-agente · aumentable · humano-por-diseño) — se calculan, jamás se etiquetan a mano
- **Cuándo:** triage de actividades tras ECRS: puntuar candidatos y emitir veredicto con incertidumbre visible
- **Combina:** M37 (la clase ALM×MGI del verbo es input de ambos scores) · M29 (mining alimenta volumen/%excepciones con evidencia observada) · M35 (solo se puntúa lo que sobrevivió al orden ECRS) · M25 (humano-por-diseño ancla a accountability (RACI A, firma, responsabilidad legal))
- **Principios:** P3, P5, P7

<a id="m37"></a>**M37 · Taxonomía de verbos & automatizabilidad (propia, ALM×MGI)**
- **Qué:** vocabulario controlado: cada actividad narra con UN verbo canónico (+ sinónimos es-419); cada verbo clasifica en 2 ejes — clase de tarea ALM (rutinaria/no-rutinaria × manual/cognitiva-analítica/interpersonal) × capacidad requerida MGI (recolectar/procesar datos · físico predecible/impredecible · interfaz-stakeholder · experticia/decisión · gestión de personas)
- **Fuente:** propia (Cockpit) · marcos: Autor-Levy-Murnane (2003) + McKinsey Global Institute — Vocabulario controlado de verbos — clase ALM × capacidad MGI (supersede cand. Bloom). [https://doi.org/10.1162/003355303322552801](https://doi.org/10.1162/003355303322552801)
- **Objeto:** O3 Proceso · sec: O4, T1
- **Aporte único:** el ESTÁNDAR PROPIO que vuelve comparable la narrativa: 1 verbo = 1 actividad (los compuestos se PARTEN en el ingest), verbo con provenance (el ingest propone con conf, el consultor corrige, auditado)
- **Cuándo:** narrativa de actividades (el nivel más bajo del twin) — levantamiento y mantenimiento
- **Combina:** M36 (la clase ALM×MGI alimenta los dos scores) · M23 (el verbo lleva conf del ingest — sin provenance el score es gameable eligiendo verbos 'suaves') · M35 (la narrativa normalizada es lo que ECRS ordena)
- **Principios:** P4, P5

<a id="m39"></a>**M39 · NASA-TLX / RTLX (carga cognitiva medida)**
- **Qué:** instrumento de carga de trabajo percibida en 6 escalas; RTLX = promedio simple sin comparaciones pareadas
- **Fuente:** Sandra Hart & Lowell Staveland (NASA Ames) — NASA Task Load Index — variante RTLX (sin comparaciones pareadas). [https://humansystems.arc.nasa.gov/groups/tlx/](https://humansystems.arc.nasa.gov/groups/tlx/)
- **Objeto:** O4 Personas & Autoridad · sec: O3
- **Aporte único:** el DESGASTE MEDIDO con humanos (no estimado) — dónde la carga cognitiva justifica aumentar o rediseñar antes que exprimir
- **Cuándo:** SOLO actividades pre-flageadas por el triage (densidad de espera/decisión, %excepciones alto, queja espontánea en entrevista) — jamás censal
- **Combina:** M36 (el triage pre-flagea qué actividades medir (gatillo explícito)) · M40 (el resultado se agrega por rol/proceso — jamás registro individual)
- **Principios:** P3, P5

<a id="m40"></a>**M40 · Métricas de persona — frontera twin ↔ individuo (CK-24)**
- **Qué:** gobernanza de toda métrica que toque personas: el twin mide roles/procesos/áreas por defecto; la vista persona-nombrada existe SOLO con opt-in de nivel Gobernanza + consentimiento declarado
- **Fuente:** propia (Cockpit, CK-24) · marco: GDPR art.22 / AI Act — Frontera twin ↔ evaluación individual — agregación mínima · acceso por nivel · consentimiento · retención. [https://gdpr-info.eu/art-22-gdpr/](https://gdpr-info.eu/art-22-gdpr/)
- **Objeto:** O4 Personas & Autoridad · sec: T1, T3
- **Aporte único:** la FRONTERA — gemela transversal de M23: como todo dato lleva fuente+conf, toda métrica de persona lleva agregación mínima + acceso por nivel + consentimiento + retención
- **Cuándo:** transversal — cada vez que un indicador, score o medición pueda atribuirse a una persona nombrada
- **Combina:** M23 (gemela transversal: provenance del dato ↔ gobernanza del dato de persona) · M39 (TLX/desgaste se agrega por rol/proceso bajo esta frontera) · M25 (el acceso sigue los niveles (Gobernanza > Estratégico > Táctico > Operativo))
- **Principios:** P7, P5
<!-- /GEN:cards -->

---

## 5. Notaciones del twin

El rol de cada estándar en el **Organization Twin** — por dimensión: qué estándar, en qué rol
(metamodelo-propio · ancla · proyección · intercambio · horizonte · descartada · fuera-del-twin),
cuándo sí, cuándo no y cuándo hacemos estándar propio — vive como dato en el bloque `twin:` de cada
M-card ([`methodologies.yaml`](./methodologies.yaml)) y se lee en la vista canónica generada
**[`NOTACIONES.html`](./NOTACIONES.html)** (regla cardinal + matriz por dimensión + triage
eliminar/automatizar/aumentar + descartados con porqué). No se duplica la matriz aquí: editar el
YAML, regenerar con `gen_metodo.py` (gate anti-drift en pre-commit).

---

## 6. Mapa metodología → dónde se usa

<!-- GEN:tabla -->
| Metodología | M1 Levant. | M2 Mant. | M3 Mejora | Capa de contexto |
|---|:-:|:-:|:-:|:-:|
| Dual Track Agile (M01) |  |  | ● |  |
| Continuous Discovery (M02) | ● |  | ● |  |
| Product Operating Model (M03) |  |  | ● |  |
| Shape Up (M04) |  |  | ● |  |
| Jobs-to-be-Done (M05) | ● |  | ● |  |
| Impact Mapping (M06) | ● |  | ● | ● |
| Event Storming (M07) | ● |  | ● | ● |
| Domain-Driven Design (M08) | ● |  | ● | ● |
| Value Stream Mapping (M09) | ● | ● |  | ● |
| Service Blueprint (M10) | ● |  |  | ● |
| BPMN (M11) | ● | ● |  | ● |
| APQC Process Classification Framework (M12) | ● | ● |  | ● |
| ArchiMate (M13) | ● | ● |  | ● |
| SYSTEM-MAP + document-project (M14) | ● | ● | ● | ● |
| COBIT 2019 (M15) | ● |  |  | ● |
| ISO 9001 (M16) | ● | ● | ● | ● |
| ITIL 4 (M17) | ○ | ○ |  |  |
| Spec-Driven Development (M18) |  |  | ● |  |
| EARS (M19) |  |  | ● |  |
| Specification by Example (M20) |  |  | ● |  |
| OKR (M21) | ● | ● | ● | ● |
| FinOps — Quantify Business Value (M22) |  | ● | ● | ● |
| Grounding (M23) | ● | ● | ● | ● |
| This Is Service Design Doing (M24) | ● |  | ● |  |
| RACI (M25) | ● | ● | ● | ● |
| Hoshin Kanri (M26) | ● |  |  | ● |
| Wardley Mapping (M27) | ● | ● |  | ● |
| WSJF (M28) |  |  | ● |  |
| Process / Task Mining (M29) | ● | ● | ● | ● |
| Balanced Scorecard (M30) | ● | ● |  | ● |
| Business Capability Modeling (M31) | ● |  |  | ● |
| Ontología Palantir (M32) | ● | ● | ● | ● |
| DEMO (M33) |  |  |  |  |
| BPSim (M34) |  |  |  |  |
| ECRS (M35) | ● |  | ● | ● |
| Criterios RPA + agente (M36) | ● |  | ● | ● |
| Taxonomía de verbos (M37) | ● | ● |  | ● |
| ISO 10013 (M38) | ● | ● |  | ● |
| NASA-TLX (M39) | ○ |  |  | ○ |
| Métricas de persona (M40) | ● | ● | ● | ● |
<!-- /GEN:tabla -->

---

## Fuentes

Todos los links están en cada ficha (§4). Sitios oficiales de referencia rápida:
Dual Track · [Product Talk (Torres)](https://www.producttalk.org/) · [SVPG (Cagan)](https://www.svpg.com/) ·
[Shape Up (Basecamp)](https://basecamp.com/shapeup) · [Impact Mapping](https://www.impactmapping.org/) ·
[Event Storming](https://www.eventstorming.com/) · [DDD (domainlanguage)](https://www.domainlanguage.com/) ·
[Lean.org (VSM)](https://www.lean.org/) · [NN/g (Service Blueprint)](https://www.nngroup.com/articles/service-blueprints-definition/) ·
[BPMN/OMG](https://www.bpmn.org/) · [APQC](https://www.apqc.org/process-frameworks) ·
[The Open Group (ArchiMate/TOGAF)](https://www.opengroup.org/) · [ISACA (COBIT)](https://www.isaca.org/resources/cobit) ·
[ISO 9001](https://www.iso.org/iso-9001-quality-management.html) · [PeopleCert (ITIL)](https://www.peoplecert.org/) ·
[GitHub Spec Kit](https://github.com/github/spec-kit) · [Kiro](https://kiro.dev/) · [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) ·
[EARS (Mavin)](https://alistairmavin.com/ears/) · [What Matters (OKR)](https://www.whatmatters.com/) ·
[FinOps Foundation](https://www.finops.org/framework/domains/quantify-business-value/)
