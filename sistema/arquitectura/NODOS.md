# Nodos del diagrama de despliegue — fichas de arquitectura

> **Qué es:** la definición a nivel arquitecto de cada **nodo** del diagrama de despliegue
> ([`despliegue.html`](./despliegue.html)). Cada ficha permite un *drilldown* para entender el sistema
> antes de bajar a funcionalidades. Insumo para volver al diseño de servicio (backstage/endpoints) con
> los límites ya claros.
> **Docs base:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) · `PRODUCT-VISION.md` (legacy `prenter-harness/tooling/strategy/`) · [`METODOLOGIA.md`](../metodo/METODOLOGIA.md)
> **Última actualización:** 2026-07-07 (**CK-16**) — **N5 re-fichado: DevHub server → DevStudio** (P2, app de escritorio por usuario, `~/Proyectos/dev-studio`; el punto compartido pasa al repo GitHub = N6); **contrato de datos CK-08 derogado** (era Pull API contra el server que ya no existirá — mecanismo TBD con el primer consumidor real, BL-18); N6 re-fichado como repo GitHub del cliente (matiz BYOC: "sus datos viven en SU GitHub, no en infra nuestra"). Histórico mismo día (**CK-14**, cierra BL-03): N14 App del Auditor al mapa (R16/R17), estados post-Stage-4 corregidos, `despliegue.html` portado. Histórico 2026-07-02: post-I-69, N5 quedó acotado a Delivery (P2) y nació N13 (P1) — ver `I-74`/`CK-07`.

---

## Cómo leer este documento

**"Nodo"** = cada elemento fichado del diagrama. Convención UML: el campo **`tipo`** lleva la precisión
(en UML estricto un "nodo" es el ≪device≫/≪execution environment≫ y lo que corre encima es ≪artifact≫;
acá usamos "nodo" como término de trabajo y `tipo` desambigua).

**Campos por tipo** (distinto tipo, distinto drilldown):
- **Núcleo común** (todo nodo): `objetivo` · `resumen` · `plano·tipo·madurez` · `responsabilidades/no_objetivos` · `comunicacion` · `depende_de/consumido_por` · `riesgos_abiertos`
- **servicio / exec-env:** + `stack` · `expone` · `estado+persistencia` · `escala+disponibilidad` · `integraciones_externas` · `seguridad` · `nfr/cumplimiento_progresivo`
- **artefacto / dato:** + `formato` · `propietario+clasificacion` · `residencia+retencion` · `versionado` · `quién_escribe/quién_lee`
- **agente efímero:** + `runtime` · `disparador+ciclo_de_vida` · `lee/escribe` · `metodo_inyectado` · `aislamiento+seguridad`
- **runtime edge:** + `runtime+licencia` · `qué_construye/contra_qué` · `local_vs_remoto` · `seguridad`
- **actor:** + `objetivo_del_actor` · `permisos/RACI` · `interfaces_que_usa` · `momentos`

**Madurez:** `existe` · `parcial` · `no-construido`.

---

## Índice de nodos

| # | Nodo | Plano | Tipo | Madurez | Marca |
|---|---|---|---|---|---|
| **N1** | Motor de Discovery / Levantamiento | Control | servicio | no-construido | ★IP |
| **N2** | Playbook + Metodología | Control | artefacto/dato | existe (parcial) | ★IP |
| **N3** | Servicio de distribución + telemetría | Control | servicio | no-construido | — |
| **N4** | Plano Conversación | Control (hosted) | servicio | no-construido | — |
| **N5** | DevStudio — app de escritorio de desarrollo (P2) | Edge (máquina del usuario) | runtime edge / exec-env | existe (parcial) | — |
| **N6** | Repo del cliente (GitHub) | Data | artefacto/dato | existe | ★datos |
| **N7** | Agentes de análisis / levantamiento | Data | agente efímero | no-construido | — |
| **N12** | Depósito de fuentes (landing zone) | Data | artefacto/dato | no-construido | ★datos |
| **N13** | Cockpit — Vista Negocio (binario `directorio`, propio) | Data | servicio/exec-env | existe | — |
| **N8** | Runtime de Delivery (Claude Code) | Edge (laptop) | runtime edge | existe | — |
| **N14** | App del Auditor (app instalable del Consultor) | Edge (máquina del consultor) | runtime edge / exec-env | no-construido | ★IP |
| **N9** | Consultor | Edge | actor | existe | — |
| **N10** | Developer | Edge | actor | existe | — |
| **N11** | CEO / sponsor | Edge (thin) | actor | existe | — |

---

## Responsabilidades del sistema — R1–R17 (el responsibility-walk)

> El flujo de la data **objetivo → producción**, una responsabilidad por eslabón, con su nodo dueño.
> Es **cómo se asignó cada nodo** (recorrer el flujo, no ir nodo-por-nodo). Cada `[R#]` en las fichas
> de abajo **resuelve a esta tabla** (lo valida `gen_arquitectura.py`, ref-check — no más punteros
> colgantes). Etapas: E1 = Levantamiento (M1) · E2 = Ejecución (M3) · E3 = Mantenimiento (M2).

| R | Responsabilidad | Nodo(s) dueño | Etapa |
|---|---|---|---|
| **R1** | Bajar objetivos/OKR del directorio + autoridad (RACI) — el encuadre | N11→N9 | E1 |
| **R2** | Recolectar y curar las fuentes crudas → depositar | N9→N12 | E1 |
| **R3** | Aterrizar / retener / **destruir** el crudo (landing zone) | N12 | E1 |
| **R4** | Capturar el AS-IS de las personas (entrevistas) → transcripción | N4 | E1 |
| **R5** | Dar acceso a los sistemas vivos (config + credenciales JIT) | N9→N7 | E1 |
| **R6** | Compilar el método en instrucciones + orquestar el levantamiento | N1 | E1 |
| **R7** | Procesar las fuentes (crudo + sistemas) con el método inyectado | N7 | E1 |
| **R8** | Reconciliar documentado-vs-vivido + poblar el mapa AS-IS/gaps | N1+N7 | E1 |
| **R9** | Calcular el gap (TO-BE − AS-IS) + severidad (δ×criticidad-KR) | N1 | E1 |
| **R10** | Validar / **ratificar** el AS-IS y el SPEC (gate humano) | N9 | E1/E2 |
| **R11** | Priorizar los gaps + armar la apuesta (WSJF/appetite) | N9+N11 | E2 |
| **R12** | Proteger el método/IP (inyección efímera + teardown) | N1→N7 | E1/E2 |
| **R13** | Discovery: guiar el diseño de la solución → spec | N1 | E2 |
| **R14** | Producir el SPEC "comidito" + despacharlo al data plane | N1 | E2 |
| **R15** | Construir historias → tests → producción | N8/N10 | E2 |
| **R16** | Operar el método del engagement (m1 levantamiento · m2 mantenimiento · m3 espinazo) como flujo con carriles/provenance | N14 | E1/E3 |
| **R17** | Publicar el resultado (procesos/roles/objetivos/personas) al repo del cliente — "deploy de procesos" | N14→N6 | E1/E3 |

---

# CONTROL PLANE — nuestro (★IP aquí)

## N1 · Motor de Discovery / Levantamiento — la "fábrica" como servicio ★IP

- **objetivo** — **Cerebro server-side** que convierte el conocimiento de la empresa (docs + sistemas) en el **mapa vivo (AS-IS)** y el **SPEC**, protegiendo el **método (IP)** en el control plane y **sin traer el crudo del cliente a nuestras bases**. Existe porque el *método* de levantar/diseñar es el activo: se versiona central y mejora para todos los clientes sin redesplegar en sus redes; el *dato* se queda del lado del cliente. Piensa, diseña y orquesta — **no ejecuta, no habla, no toca el crudo**.
- **resumen** — Orquestador de agentes LLM multi-tenant, server-side, que conduce la interfaz conversacional de Discovery (diseña el SPEC) y orquesta el levantamiento AS-IS→TO-BE→gaps, razonando sobre la API frontier de Anthropic.
- **plano · tipo · madurez** — Control · servicio · **no-construido**. Hoy el método existe como documentos + skills locales (`disena-etapa`, `cargar-metodologia`, `orientacion`); NO existe el servidor multi-tenant que lo ejecute server-side vía API. El salto pendiente: de "skills en el Claude Code del operador" → "servicio que corre el razonamiento con la API y sirve a N clientes".
- **responsabilidades** — Compila el método (N2) en **instrucciones de levantamiento** (qué escanear, cómo mapear, a qué esquema-destino) y de **Discovery** (cómo diseñar el SPEC) **[R6]** · orquesta el levantamiento en sus **2 modos** — documental (el crudo de N12) y sistemas vivos (lo que lee N7) — como grafo reanudable **[R6]** · conduce el **contenido** de la conversación de Discovery (la voz la pone N4) **[R13]** · reconcilia **hallazgos derivados** (no crudos) → puebla el mapa (org, trabajadores, MOF, sistemas, gaps) **[R8]** · calcula el gap (TO-BE − AS-IS) + severidad **[R9]** · produce el SPEC "comidito" **[R14]** · protege el método/IP vía inyección efímera a N7 **[R12]** · aísla por tenant · estado durable (checkpoints).
- **no_objetivos** — NO almacena los archivos crudos (eso es **N12**, data plane) · NO ejecuta el escaneo que toca el crudo (eso es **N7**, data plane) · NO razona sobre dumps crudos, **solo sobre derivados/extractos** · NO persiste el "cómo" en el cliente (baja *instrucciones de un paso*, no el método completo) · NO habla por voz (N4) · NO construye Delivery (N8+N7) · NO multiplexa la suscripción de Claude Code (ToS).
- **stack** — **Python + FastAPI + LangGraph sobre el Anthropic SDK (API Messages).** LangGraph = runtime de orquestación más probado jun 2026 (durable execution, checkpointing en Postgres, human-in-the-loop, reanudación tras caída) — Discovery es exactamente un grafo de estados de larga duración con pausas para el humano. SDK directo (no gateway) para control total de `prompt caching` (5-10× menos costo en el loop) y context editing. FastAPI por consistencia con el resto del ecosistema Python. *Descartado:* Claude Agent SDK / Managed Agents (metería nuestra IP en infra de Anthropic y reduce el control del aislamiento multi-tenant — justo lo que vendemos); framework propio sin librería (reinventar checkpointing durable = sobreingeniería). **El razonamiento que toca dato crudo del cliente se delega al data plane (N7);** N1 razona solo sobre lo derivado.
- **expone** — HTTPS/REST + SSE: `POST /discovery/sessions`, `POST /discovery/sessions/{id}/turns` (SSE), `GET /discovery/sessions/{id}/spec`. Endpoint de despacho que el **data plane jala** (no hay inbound en el cliente). Internamente consume la API de Anthropic.
- **estado + persistencia** — Stateful, pero el estado vive en el control plane. Postgres como checkpointer de LangGraph (estado del grafo por sesión, reanudable) + memoria de engagement por tenant; object storage para artefactos del SPEC. El playbook NO se persiste como estado del cliente: se resuelve en runtime desde N2 y se inyecta efímero.
- **escala + disponibilidad** — A nuestra escala basta **1-2 réplicas detrás de un LB + Postgres gestionado**. Nada de K8s/autoscaling (sobreingeniería). El cuello real es la API de Anthropic, no la CPU. **Si cae:** por BYOC el cliente NO se rompe (control plane fuera del request path); se pausan *nuevos* engagements; al volver, los checkpoints de LangGraph reanudan donde quedó.
- **integraciones_externas** — API de Anthropic (crítica) · Postgres + object storage del control plane · (opcional) IdP para tenant resolution.
- **seguridad** — OIDC/JWT; `tenant_id` derivado del token **antes** de resolver contexto (orden auth→tenant→sesión→contexto; romperlo = fuga cross-tenant). Multi-tenant **pool con guardrails** (silo sería sobreingeniería a pocos clientes); aislamiento en toda capa + **presupuesto de tokens por tenant verificado ANTES de despachar a la API**. API key de Anthropic solo en el control plane, nunca baja al cliente. Targets de acción resueltos desde config, no desde salida cruda del LLM (anti prompt-injection).
- **nfr / cumplimiento progresivo** — *Ahora (PyME):* TLS 1.3 · AES-256 at-rest (en data plane) · ZDR/efímero en control plane (no persiste crudo) · audit log de accesos · aislamiento por tenant · NDA + DPA con cláusula no-retención/destrucción. *Después (regulado):* SOC 2 Type II · ISO 27001 · BYOK/CMK (llave del cliente, revocable) · cómputo-al-dato · confidential computing + atestación · data residency · derecho de auditoría. → [Seguridad, cumplimiento y contratos](#seg-cumpl).
- **comunicacion** — UI de Discovery ↔ nodo: HTTPS/SSE (inicia la UI). Nodo → Anthropic: HTTPS (inicia el nodo). Nodo ↔ data plane: **PULL** (el data plane jala el paso compilado por TLS saliente; el nodo nunca disca al cliente).
- **depende_de / consumido_por** — depende_de: N2, API Anthropic, Postgres/storage. consumido_por: UI de Discovery (N9, N11) y **N7** (jala los pasos compilados). Alimenta el SPEC que usa Delivery.
- **riesgos_abiertos** — (1) **Granularidad del despacho:** ¿cuánto método baja por paso? Fino = lento; grueso = filtra IP. Falta el contrato "instrucción de paso" mínimo. (2) **¿Dónde corre el razonamiento de pasos que tocan datos del cliente?** → ver [Chequeo de consistencia: el hallazgo rojo](#hallazgo-rojo). (3) Una API key del vendor para todos vs workspace por tenant. (4) LangGraph como dependencia de IP → mantener el método en datos/prompts (N2), no en código de grafo, para poder portar.
- **fuentes** — [Pinecone BYOC](https://docs.pinecone.io/guides/production/bring-your-own-cloud) · [LangGraph](https://www.langchain.com/langgraph) · [Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)

---

## N2 · Playbook + Metodología ★IP

- **objetivo** — Centralizar el "cómo" (el método que vendemos) como **dato versionado** en el control plane: protegerlo (no vive en el cliente), mejorarlo para todos sin redesplegar, y dejar que N1 lo compile en instrucciones de paso. Es el activo más valioso de la empresa.
- **resumen** — La base de conocimiento/IP: `process/` (proceso como dato), 31 M-cards (`methodologies.yaml`), schemas L0, skills/agentes = el CÓMO.
- **plano · tipo · madurez** — Control · artefacto/dato · **existe (parcial)**. Existen `process/` (m1.b1, 6 fases con flujo), `methodologies.yaml` (31 fichas), schemas (process/methodology/ledger), skills. Falta: que se *sirva* server-side vía N1 (hoy corre como skills en el Claude Code del operador).
- **responsabilidades** — Ser SSoT del método · versionado y auditable · legible por N1 (compilable a instrucciones de paso) y por humanos · evolucionable con anti-drift.
- **no_objetivos** — NO se entrega al cliente (a lo sumo un `OPERATING-MANUAL` sanitizado) · NO ejecuta (es dato; N1 lo ejecuta) · NO contiene datos de cliente.
- **formato** — Markdown (narrativa de metodología) + YAML (`methodologies.yaml`, `process/` como dato, schemas L0). git.
- **propietario + clasificacion** — **Nuestro (Prenter).** ★IP/know-how — la pieza más sensible del sistema.
- **residencia + retencion** — Repo factory (`prenter-harness`), control plane. Persiste con nosotros, **NUNCA con el cliente**. Se inyecta efímero a N1/N7 en runtime.
- **versionado** — git + `KIT_VERSION`; schema = contrato (bajo acoplamiento); gate anti-drift (`gen_all.py --check` en pre-commit) garantiza que los generados no driften.
- **quién_escribe / quién_lee** — Escribe: nosotros (consultor/factory, vía `disena-etapa`, `ledger`). Lee: N1 (lo compila), N7 (método inyectado), humanos (el "detrás de cada paso").
- **comunicacion** — No es servicio: N1 lo lee; se inyecta efímero al data plane.
- **depende_de / consumido_por** — depende_de: schemas L0. consumido_por: N1, N7.
- **riesgos_abiertos** — Granularidad de qué baja por paso sin revelar el playbook completo (espejo del riesgo 1 de N1) · el método inyectado en memoria es "fuerte por arquitectura" pero no es DRM (ver N7).

---

## N3 · Servicio de distribución + telemetría

- **objetivo** — El binario del data plane (N13 `directorio`) corre en la red del cliente y debe actualizarse sin que nadie abra puertos hacia el cliente y sin que el vendor empuje nada por sorpresa. A la vez, necesitamos saber si la flota está sana **sin** exfiltrar datos (eso rompería el BYOC). Este nodo publica releases firmadas que el data plane *jala*, y recibe telemetría agregada opt-in.
- **resumen** — Servicio que publica releases firmadas del binario cockpit (pull/self-update) y recolecta telemetría agregada de salud/uso, nunca datos crudos.
- **plano · tipo · madurez** — Control · servicio · **no-construido**. Las piezas son madurísimas (`go-tuf`, OpenTelemetry, patrón pull à la Tailscale/Teleport) — **el nodo de menor riesgo técnico del sistema**.
- **responsabilidades** — Publica releases (artefacto + metadata firmada) en repo TUF · sirve por HTTPS para que el data plane jale y verifique hash+firma · recibe endpoint OTLP de telemetría agregada, la valida (scrubbing) y la guarda para dashboards de flota · soporta rollback y canales (stable/canary).
- **no_objetivos** — NO empuja updates (no inbound; el cliente decide cuándo jala) · NO recibe ni almacena datos crudos (ni specs ni PII) · NO es APM ni data warehouse · NO es el canal de despacho del método (eso es N1; aquí solo binarios + números agregados).
- **stack** — **Go + go-tuf (TUF) + OpenTelemetry Collector + store de métricas.** TUF = estándar de updates por pull (graduado CNCF; Docker/AWS/automoción): firma M-of-N, metadata versionada, anti-rollback, resiste *incluso repo comprometido*. OTel trae los processors de redacción en el Collector (scrubbing = config, no código). *Descartado:* Omaha (más pesado, seguridad más débil que TUF); paquetes del SO (asume permisos del cliente, sin canales/rollback propios); SaaS APM tipo Datadog (sobreingeniería + riesgo de privacidad).
- **expone** — `GET` HTTPS del repo TUF (`root/timestamp/snapshot/targets.json` + artefactos) · endpoint OTLP/HTTP (`/v1/metrics`, `/v1/traces`, mTLS) · API interna para dashboards.
- **estado + persistencia** — Stateful ligero. Repo TUF = archivos firmados en object storage + CDN; claves de firma en HSM/KMS (root/targets idealmente offline, firma con umbral). Telemetría = time-series (Prometheus o Postgres/Timescale a esta escala), retención corta. No guarda nada por-cliente salvo "tenant X corre versión Y, salud Z".
- **escala + disponibilidad** — Trivial: object storage + CDN para releases, un Collector + store pequeño para telemetría. Nada de K8s. **Si cae: cero impacto en el cliente** — el cockpit sigue con su versión y reintenta luego; la telemetría se bufferea/descarta. El nodo más tolerante a fallos.
- **integraciones_externas** — Object storage + CDN · KMS/HSM (firma TUF) · (opcional) Grafana. Ninguna API de terceros en el request path.
- **seguridad** — Integridad por TUF (firma M-of-N, anti-rollback) · telemetría con mTLS por tenant (cert + UUID, patrón Teleport) · minimización en origen + scrubbing en el Collector (segunda barrera) + opt-in · cliente solo abre conexiones **salientes**.
- **comunicacion** — Data plane → nodo (releases): **PULL HTTPS, lo inicia el cliente.** Data plane → nodo (telemetría): **push saliente del cliente, OTLP/mTLS** (originado en el cliente hacia afuera; el vendor nunca disca al cliente).
- **depende_de / consumido_por** — depende_de: object storage/CDN + KMS + pipeline de build del binario. consumido_por: **N13** (el binario del data plane). La distribución de DevStudio (N5, instalables de escritorio) la gobierna P2 — si reusa este nodo se decide allá (CK-16).
- **riesgos_abiertos** — (1) Lista blanca exacta de métricas permitidas + política de consentimiento por contrato. (2) Gestión de claves TUF (custodia, rotación, ceremonia) = sobrecarga real para equipo chico → dimensionar (¿umbral 2-of-3? ¿firma manual por release?). (3) Política de auto-update (¿auto o con aprobación? default sugerido: opt-in stable + notificación).
- **fuentes** — [TUF](https://theupdateframework.io/) · [Foundries.io — self-update Go + go-tuf](https://www.foundries.io/insights/blog/fioctl-updater/) · [OTel — handling sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/) · [Teleport — agent architecture (outbound-only)](https://goteleport.com/docs/reference/architecture/agents/)

---

## N4 · Plano Conversación — entrevistas de levantamiento por voz

- **objetivo** — Conducir las entrevistas de la Etapa 1 que capturan el AS-IS *de las personas*: cómo trabajan de verdad, qué sistemas tocan, dónde están los gaps "documentado-vs-real". Es la sonda de la señal más valiosa del Hilo de Oro (la brecha entre proceso escrito y vivido), que ningún análisis de docs/código obtiene solo. Resuelve la fricción del stakeholder no-técnico: conversación natural en vez de formulario.
- **resumen** — Servicio hosted, bajo volumen, que ejecuta entrevistas guiadas por método (control plane) con voz natural y entrega la transcripción al data plane sin retenerla de nuestro lado.
- **plano · tipo · madurez** — Control (hosted) · servicio · **no-construido**. El vision (I-14) ya recomienda arrancar **texto-primero** y meter voz como v2 — esta ficha respeta ese gradiente.
- **responsabilidades** — Gestionar el turno de voz de alta calidad (STT/TTS, fin de turno, barge-in) · poner la **capa de voz/transporte**; el **contenido/método de la entrevista lo pone N1** (el cerebro LangGraph, vía Custom LLM) · entregar transcripción + datos estructurados al data plane **[R4]** · mantener el estado del diálogo durante la sesión.
- **no_objetivos** — NO es telefonía masiva/call-center · NO persiste el AS-IS (eso es N6) · NO razona sobre gaps (eso es N1) · NO almacena la transcripción de nuestro lado.
- **stack** — **ElevenLabs Agents (voz) + LangGraph como "Custom LLM" (método) + Claude API detrás (razonamiento) + web widget embebido.** El *seam* clave: ElevenLabs Agents acepta un **Custom LLM vía endpoint OpenAI-compatible (SSE)**, y LangGraph publica exactamente eso. Reparto: ElevenLabs posee la **voz** (commodity: STT/TTS/turn-taking/barge-in, WebRTC, latencia <300-600ms); LangGraph posee la **lógica de entrevista** (★IP nuestra: guion con estado, extracción Pydantic) — el "cómo preguntar" nunca sale al cliente; Claude API razona. *Descartado:* ElevenLabs LLM bundled (mete el método en su config, fuera de nuestro control); Vapi/Retell (capa gestionada redundante + premium por minuto a bajo volumen); LiveKit/Pipecat self-host (solo paga >50K min/mes — Plan B si crece o hay requisito de residencia de la conversación); **SIP/telefonía (no en v1**, el entrevistado es interno, basta link de navegador).
- **expone** — Web widget de voz embebido (React SDK ElevenLabs, WebRTC) servido por el cockpit; agente **privado** con *signed URL* de corta vida (no widget público) · hacia LangGraph: endpoint OpenAI Chat-Completions-compatible (SSE) · hacia el data plane: **post-call webhook firmado (HMAC)** con la transcripción.
- **estado + persistencia** — Estado del diálogo en LangGraph (checkpoints, control plane, **efímero**). **Transcripción (dato del cliente): zero-retention de nuestro lado** — configurar el agente con audio-saving off + retención 0; la transcripción sale por webhook → relay efímero (verifica HMAC, no persiste a disco) que el data plane **jala por TLS**, o endpoint del cockpit del cliente. La transcripción no toca almacenamiento persistente nuestro en ningún punto, destino = N6.
- **escala + disponibilidad** — Bajo volumen, sin autoscaling/cola/telefonía. **Si ElevenLabs cae:** no hay entrevista ese rato, el resto del sistema sigue (BYOC). Fallback a costo cero: **texto-primero** (la misma LangGraph sin voz). Como las entrevistas se agendan, una caída transitoria se reprograma.
- **integraciones_externas** — ElevenLabs (voz, webhook) · Anthropic/Claude API (razonamiento) · (futuro opcional) SIP solo si aparece caso telefónico real.
- **seguridad** — Voz = PII. Mitigaciones: audio-saving off + retención 0 (ElevenLabs no guarda tras procesar) · transcripción persiste solo en N6 · agente privado con signed URL efímero · webhook firmado HMAC · si el cliente exige residencia/HIPAA → regiones + Zero Retention Mode (Enterprise, BAA). El método (LangGraph) nunca se entrega: corre en control plane, solo cruza el QUÉ (transcripción).
- **comunicacion** — Usuario ⇄ ElevenLabs: WebRTC (navegador). ElevenLabs → LangGraph: HTTPS/SSE por turno. ElevenLabs → nosotros: webhook HTTPS firmado. Nosotros → data plane: pull TLS. LangGraph → Claude API: HTTPS.
- **depende_de / consumido_por** — depende_de: ElevenLabs, Claude API, N6 (destino), método/guion (N2). consumido_por: **N1** (consume transcripción + extracción para reconciliar documentado-vs-real y poblar gaps), **N13** (Vista Negocio/CEO).
- **riesgos_abiertos** — (1) Routing del webhook a una red cliente cerrada (relay efímero vs cockpit con firewall). (2) Procesamiento fuera de región aun con residencia salvo ZRM → cliente regulado podría bloquear (ahí Pipecat self-host). (3) Latencia p95 del Custom LLM (round-trip extra). (4) Calidad de turn-taking en español LatAm/acentos → validar antes de comprometer voz. (5) ¿Mismo nodo en modo Etapa-1 vs Discovery Etapa-2, o separados? (diferido).
- **fuentes** — [ElevenLabs — Custom LLM](https://elevenlabs.io/docs/conversational-ai/customization/llm/custom-llm) · [ElevenLabs — post-call webhooks](https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks) · [Choosing a voice agent platform 2026](https://softcery.com/lab/choosing-the-right-voice-agent-platform-in-2026)

---

# DATA PLANE — del cliente (★datos aquí)


## N6 · Repo del cliente (SSoT git — GitHub) ★datos

> Re-fichado CK-16: el repo vive en **GitHub (org/tenant del cliente)** — es además el **conector**
> de la orquestación de DevStudio (N5): PM prioriza → developers reciben, todo canalizado por aquí.

- **objetivo** — Ser la **única fuente de verdad** del cliente: AS-IS, gaps, specs (SDD), código, OKRs, journey, capacidades, releases, procesos/roles/objetivos publicados. Repositorio git versionado, legible por humanos Y agentes, del que todo lo demás (la DB del cockpit) es proyección desechable. Desde CK-16 también: **punto de encuentro** de los usuarios de DevStudio (GitHub como canalizador).
- **resumen** — "Git como base de datos + vista materializada": datos como `markdown` (prosa) + `yaml`/`json` (estructura). Git aporta versionado, autoría, historia, branch/merge, diffs revisables; GitHub aporta el multi-usuario (org, permisos, API).
- **plano · tipo · madurez** — Data · artefacto/dato · **existe** (el cockpit ya lo trata como única fuente; `workspace.go` resuelve root vía `git rev-parse`).
- **responsabilidades** — Contener y versionar todo el conocimiento/artefactos del proyecto · legible/editable por personas (IDE), agentes Claude y cockpit · proveer historia, autoría y reversibilidad.
- **no_objetivos** — NO es DB transaccional ni de queries agregadas en caliente (eso es la proyección de N5) · NO almacena blobs grandes ni datos high-churn (git diffea mal eso) · **NO es el landing del crudo de entrada (eso es N12); guarda solo la verdad derivada/curada** · NO sale nunca de la red del cliente.
- **formato** — Markdown (humano-primero: specs, checkpoints, operator-input, learnings) · YAML/JSON (estructura: `capabilities/*.yaml`, `releases/*.yaml`, `project.config.yaml`, frontmatter) · código fuente. Convención (estado del arte): **prosa en markdown, datos estructurados en yaml/json** — no embeber tablas en markdown (diffea/parsea mal). El repo ya respeta esto.
- **propietario + clasificacion** — Cliente (la PyME). El consultor/agente escribe, el cliente posee. ★ datos del cliente, confidencial. **Matiz BYOC (CK-16):** la promesa pasa de "nunca sale de su red" a **"sus datos viven en SU GitHub (org propia), no en infra nuestra"** — mismo espíritu (soberanía: el cliente posee, controla acceso y puede revocar), residencia explícita en la nube de GitHub. Cliente regulado que prohíba cloud → GitLab/git self-hosted como opción documentada (espejo del "LLM on-premise: opción futura").
- **residencia + retencion** — **GitHub, organización del cliente** + clones locales (laptops, data plane). Retención indefinida vía historia git (es el valor: trazabilidad objetivo→producción). Sin TTL; el repo ES el archivo histórico.
- **versionado** — Git (commits, branches, tags, blame, diff). **Límite del patrón:** git degrada con archivos enormes, alta frecuencia de escritura, o merges concurrentes con semántica de fila (ahí brillan Dolt/lakeFS, **innecesarios a esta escala** = sobreingeniería). Para decenas-cientos de historias en md/yaml con equipo 3-30, git plano es el ajuste correcto.
- **quién_escribe / quién_lee** — Escriben: agentes de levantamiento/diseño (N7: AS-IS, gaps, specs), devs (N10: código + spec), DevStudio (N5: proceso/historias/priorización — el PM refina, los devs reciben), Cockpit (N13: transiciones de Vista Negocio), **App del Auditor (N14: publica procesos/roles/objetivos ratificados — "deploy de procesos" [R17])**. Leen: N5 y N13 (ambos proyectan), agentes Claude, humanos. **Concurrencia:** el flujo multi-usuario lo media GitHub (branches/PRs/permisos); escrituras locales con git + write-temp-then-rename.
- **comunicacion** — No es servicio nuestro: protocolo git + API de GitHub. DevStudio (N5) lo usa como conector; N13 lee su clon/checkout local; los agentes como archivos.
- **depende_de / consumido_por** — depende_de: git, filesystem. consumido_por: N5, agentes Claude (N7/N8), herramientas dev.
- **riesgos_abiertos** — Escritura concurrente (disciplina de commits + escritura atómica) · drift de formato yaml/frontmatter sin validación (los gates SDD apuntan a esto) · tentación de meter high-churn/binarios (degrada el patrón) · rebuild de la proyección depende de repo parseable → parsing tolerante a errores, no fallo total · **residencia GitHub-cloud (CK-16):** la tensión con el discurso BYOC queda documentada — para el material más sensible el crudo sigue en N12 (data plane, nunca GitHub); revisar la frase de venta con el primer cliente regulado.
- **fuentes** — [Git for Data — DoltHub](https://www.dolthub.com/blog/2020-03-06-so-you-want-git-for-data/) · [Git for Data — lakeFS](https://lakefs.io/blog/git-for-data/)

---

## N7 · Agentes de análisis / levantamiento

- **objetivo** — Construir el AS-IS leyendo los sistemas internos del cliente (APIs, DBs, file systems) **desde dentro de su red**, razonando vía API frontier, y escribiendo el resultado a N6 — **sin que el método (la IP del cómo) quede en el cliente**.
- **resumen** — Trabajadores efímeros (un job = un sandbox limpio, destruido al terminar) que el control plane dispara dentro del data plane. Protección de IP **por arquitectura, no por confianza**: persiste el *output* (el AS-IS, del cliente), no el *playbook* (nuestro).
- **plano · tipo · madurez** — Data · agente efímero (stateless, one-shot) · **no-construido**. Patrón "ephemeral sandbox + workload identity + outbound-only" = estado del arte consolidado jun 2026; herramientas single-executable (tipo `smolvm`, cold start <200ms) bajaron la barrera para equipos chicos.
- **responsabilidades** — Procesar las fuentes en sus **2 modos** — **documental** (lee el crudo de N12) y **sistemas vivos** (lee APIs/DBs/FS read-only) — ejecutando la metodología inyectada: extraer entidades, mapear relaciones, **reconciliar documentado-vs-vivido** **[R7, R8]** · escribir el **mapa AS-IS + gaps** (derivado) a N6 · auto-destruirse dejando cero rastro del método. Operado/validado por N9 (atendido) u orquestado por N1 (desatendido).
- **no_objetivos** — NO modifica sistemas del cliente (read-only estricto; el delivery lo hace N8) · NO persiste el método/playbook · NO exfiltra contenido al control plane (solo estado/telemetría) · NO mantiene estado entre corridas.
- **runtime** — **Híbrido, se elige por fuente:** *atendido* = Claude Code con la **suscripción del consultor**, en una máquina del data plane (modo documental, barato, ToS-OK, lo opera N9); *desatendido* = **API frontier** en microVM (modo sistemas vivos, escalado, lo dispara N1). **Reside en el servidor/nube del cliente (data plane)**; la laptop del consultor como host = *fallback degradado* (el crudo aterriza en equipo nuestro). **Sandbox = microVM por invocación** (Firecracker o single-executable tipo smolvm), NO contenedor plano. Consenso jun 2026: Docker/runc (kernel compartido) es insuficiente para código que un LLM genera/ejecuta; gVisor es el medio aceptable para compute-heavy con poco I/O, pero N7 hace I/O intensivo contra sistemas sensibles **en red ajena** → el límite debe ser kernel-por-job. Para PyME NO es sobreingeniería (single-executable microVM, carga operativa modesta). Razonamiento vía API frontier (key comercial; ver N8 para por qué aquí SÍ y en delivery NO).
- **disparador + ciclo_de_vida** — (1) control plane encola job → runner del data plane lo recoge por **poll outbound (443)**; (2) microVM limpio + método inyectado en memoria/tmpfs + credenciales JIT least-privilege vía OIDC; (3) lee sistemas, razona, construye AS-IS; (4) commit a N6; (5) teardown: microVM destruido, credenciales expiran (TTL 5-30min), método desaparece con el sandbox. Estilo JIT runner (`--once`).
- **lee / escribe** — Lee (read-only): el **crudo de N12** (modo documental) + APIs/DBs/FS internos (modo sistemas vivos) — todo en el data plane. Escribe: **mapa AS-IS + gaps → N6** (derivado, único que persiste; del cliente). **Deja tras teardown: NADA del método** (sin secretos en disco, sin playbook, sin caché del prompt de metodología).
- **metodo_inyectado** — El "cómo" vive en control plane; en cada job se entrega al sandbox **en memoria/tmpfs** (no en volumen persistente del cliente). **Por qué no persiste:** al teardown del microVM su memoria y filesystem se destruyen → el método nunca toca almacenamiento durable del cliente. IP protegida por el **ciclo de vida del compute**, no por acuerdo legal ni ofuscación.
- **aislamiento + seguridad** — **Credenciales (no-negociable): secretless / workload identity federation.** **[R5]** El sandbox NO lleva secretos de larga vida; presenta token OIDC → broker (IAM/STS del cliente o mini-broker) emite credenciales **scoped + corta vida** (TTL 5-30min, DB read-only, endpoints específicos). Least-privilege concreto: rol DB read-only, allowlist de sistemas, sin escritura salvo a N6. Egress del sandbox por allowlist (solo: sistemas a leer + endpoint Anthropic + N6). MCP como capa de *policy* (declarar tools → derivar firewall/mounts), no como el límite de aislamiento.
- **comunicacion** — Hacia control plane: outbound-only 443, pull (poll de jobs + report de estado). Hacia Anthropic: API key (server-side). Hacia sistemas del cliente: dentro del data plane, credenciales JIT. Salida: commit a N6.
- **depende_de / consumido_por** — depende_de: control plane (cola, playbook N2, API key o suscripción Claude Code del consultor), broker de identidad del cliente, **N12 (crudo, modo documental)**, sistemas internos, N6. consumido_por: N6 (recibe el mapa); N1 (reconcilia); aguas abajo N8 (construye contra ese AS-IS).
- **riesgos_abiertos** — (1) **Datos del cliente al endpoint de Anthropic** (el razonamiento server-side saca fragmentos sensibles a la API) → ver [hallazgo rojo](#hallazgo-rojo). (2) Broker de identidad en el data plane: si reusamos su IAM, bien; si no, desplegar mini-broker (punto de confianza a auditar). (3) Método en memoria ≠ inviolable: root en el hipervisor podría inspeccionar RAM — "fuerte por arquitectura" pero no DRM; para PyME es proporcionado, documentar el límite del modelo de amenaza. (4) Elegir single-executable (smolvm) sobre operar Firecracker a mano.
- **fuentes** — [Sandboxing AI agents 2026 (Firecracker/gVisor)](https://manveerc.substack.com/p/ai-agent-sandboxing-guide) · [Ephemeral CI secrets: OIDC + workload identity](https://yoo.be/ephemeral-ci-secrets-oidc-short-lived-credentials-workload-identity/) · [BYOC control/data plane (Nuon)](https://nuon.co/blog/byoc-control-plane-data-plane-architectures)

---

## N12 · Depósito de fuentes (landing zone) ★datos

- **objetivo** — Ser el área donde **aterriza el crudo de entrada** del levantamiento (manuales, MOF, organigramas, inventarios, exports, dumps de USB/correo) para que N7 lo procese. Existe separado de la verdad curada (N6) porque el crudo es **transitorio, voluminoso/binario y el de mayor riesgo de retención** — aislarlo permite **destruirlo** apenas el mapa está hecho. **[R3]**
- **resumen** — Zona de aterrizaje del crudo en el data plane: N9 deposita, N7 consume, se retiene poco y se destruye.
- **plano · tipo · madurez** — Data · artefacto/dato · **no-construido**.
- **responsabilidades** — Recibir lo que deposita N9 (la carpeta-depósito) · servir el crudo a N7 para procesar · **aplicar retención/destrucción** (borrar el crudo tras generar el mapa) · registrar quién depositó qué (audit) **[R3]**.
- **no_objetivos** — NO es el SSoT (eso es N6) · NO guarda la verdad curada (mapa/specs) · NO sale del data plane · NO es de larga vida (el crudo se destruye; lo derivado vive en N6).
- **formato** — Object store o carpeta de archivos (PDF, Word, Excel, imágenes, exports) — **NO git** (binarios/voluminoso diffean mal).
- **propietario + clasificacion** — Cliente (la PyME). ★ datos del cliente — **el material más sensible** (el crudo sin curar). Confidencial.
- **residencia + retencion** — **Servidor/nube del cliente (data plane).** Retención **corta** + **destrucción post-procesamiento** por política (la cláusula de no-retención del DPA se materializa aquí). Para PyME sin servidor: laptop gestionada del consultor bajo contrato = *fallback degradado*.
- **versionado** — Ninguno (no es histórico; es staging transitorio). El histórico vive en N6.
- **quién_escribe / quién_lee** — Escribe: N9 (deposita). Lee: N7 (procesa). Nadie más.
- **comunicacion** — No es servicio: filesystem/object store en el data plane. N9 escribe, N7 lee.
- **depende_de / consumido_por** — depende_de: almacenamiento del data plane. consumido_por: **N7** (lo procesa).
- **riesgos_abiertos** — (1) Política de retención exacta (¿el crudo se destruye tras el mapa o tras ratificar el AS-IS?) · (2) Cifrado at-rest (AES-256, barato, por default) · (3) ¿Object store del cliente vs carpeta simple? según su infra.
- **fuentes** — [BYOC landing zone (Nuon)](https://nuon.co/blog/byoc-control-plane-data-plane-architectures) · [GDPR DPA Art. 28 — devolución/destrucción](https://gdpr.eu/data-processing-agreement/)

---

## N13 · Cockpit — Vista Negocio (binario `directorio`, propio)

> Nodo nuevo (2026-07-02, I-74/CK-07) — antes vivía indiferenciado dentro de N5. Es el binario de **P1 Cockpit**: sirve la Vista Negocio/Directorio construida (Stage 1-4 ejecutados; repo propio `~/Proyectos/cockpit` desde la graduación CK-09/CK-10, 2026-07-06); a futuro absorbe el Motor de Discovery (N1) cuando ese se construya — N13 es la mitad *data-plane* de P1, N1 es su mitad *control-plane*, ambas son el mismo producto (P1), no productos distintos.

- **objetivo** — Binario Go propio que sirve la Vista Negocio/Directorio (Hilo de Oro, Brechas, mapa Empresa→Sistema, roles Directorio·Área·Consultor) al CEO/directorio en la red del cliente, con mantenimiento de datos propio de organización/áreas/procesos — independiente de los productos de desarrollo (DevStudio, N5). Cero npm/python/Docker en el cliente. **Único binario del data plane desde CK-16** (el server DevHub murió sin desplegarse; DevStudio es app de escritorio).
- **resumen** — Binario `directorio` (`go/cmd/directorio`, puerto 4100 por defecto): `package cockpit` (handlers, CK-05/CK-12/CK-13) + UI propia (`CockpitShell`/`NegocioView`, CK-06) embebida como export estático vía `go:embed`. El andamiaje transicional que lo ataba a N5 (`Deps` struct, route-group adapter, alias npm, symlink) quedó **desmontado en Stage 4 (CK-07, ejecutado)**; código migrado y verificado standalone en el repo propio (CK-10).
- **plano · tipo · madurez** — Data · servicio/exec-env · **existe** — Vista Negocio construida y verificada standalone (Go build/vet/test + UI tsc/vitest/export estático); lo no-construido de P1 (Motor de Discovery) es N1, nodo aparte.
- **responsabilidades** — Servir la SPA embebida (`go:embed` + fallback SPA) · API JSON de Vista Negocio (`/api/portfolio`, `/api/negocio`, `/api/objeto` — contratos vigentes, dueño = esta célula) · leer y validar el **objeto normalizado completo** (9 entidades de `objeto.schema`, CK-13) · **(futuro)** consumir datos de delivery de DevStudio/GitHub — mecanismo TBD, se diseña con el primer consumidor real (BL-18; el contrato CK-08 quedó derogado en CK-16) · **(futuro, campaña aparte)** absorber el Motor de Discovery (N1: ingesta multi-fuente, As-Is/To-Be, gaps) como su propio backend de razonamiento (BL-13).
- **no_objetivos** — NO sirve el ciclo de desarrollo (repos/historias/priorización — eso es DevStudio, N5, producto aparte) · NO es el SSoT de los datos de delivery (los consumirá, no los posee) · NO multiplexa Claude Code (si/cuando construya N1, hereda las mismas restricciones de N1: API frontier, no suscripción).
- **stack** — `net/http` stdlib · `go:embed all:ui` + fallback SPA · Next.js static-export hoy — **deuda Go/Next heredada** (playbook: migrar a Vite SPA + React Router, Go como único backend — BL-20). **(futuro)** proyección propia si la Vista Negocio necesita agregaciones (roll-up de OKRs por área) — introducir cuando duela, no antes.
- **expone** — HTTP/JSON: `/api/portfolio` (árbol Empresa→Sistema, CK-05), `/api/negocio` (Hilo de Oro + Brechas, CK-05), `/api/objeto` (el objeto normalizado completo — 9 entidades validadas juntas, CK-12/CK-13) · estáticos SPA (`CockpitShell`) · **(futuro)** el lado consumidor de datos de delivery (mecanismo TBD, BL-18).
- **estado + persistencia** — Verdad: repo git (N6; instancias del objeto en `empresa/<tipo>/` del shell — D-15) + datos de delivery que lleguen de DevStudio/GitHub (futuro, TBD). Sin DB propia hoy.
- **escala + disponibilidad** — 1 empresa/despliegue. Proceso único, launcher propio (`directorio -workspace … -port 4100`); crash → restart sin estado que perder.
- **integraciones_externas** — `git` (resuelve root) · DevStudio/GitHub (datos de delivery, futuro) · N1 (cuando exista, mismo producto P1).
- **seguridad** — Vive en la red del cliente. La conexión a datos de delivery definirá su auth cuando se diseñe el mecanismo (BL-18); endurecimiento propio: bind local por default, token simple si se expone en LAN.
- **comunicacion** — Binario independiente — cero import de código de/hacia otros productos (el in-process `Deps` de CK-05 fue transicional, desmontado). **Datos de delivery: SIN mecanismo firmado** — el contrato Pull API de CK-08 quedó derogado (CK-16, el server contra el que se diseñó ya no existirá); se diseña con el primer consumidor real (BL-18, disciplina anti-código-especulativo), probablemente vía GitHub.
- **depende_de / consumido_por** — depende_de: N6 (repo) · DevStudio/GitHub (datos de delivery, futuro, TBD) · N1 (razonamiento, cuando exista). consumido_por: **N11** (CEO/sponsor, Vista Negocio) · **N9** (Consultor, vista consultor) · **N14** (App del Auditor: lo que publica al repo, N13 lo renderiza).
- **riesgos_abiertos** — (1) Conexión a datos de delivery sin mecanismo (CK-08 derogado) — diseñar con el primer consumidor real (BL-18). (2) Deuda Go/Next propia (BL-20). (3) Cuándo/si absorbe N1 — campaña aparte, sin fecha (BL-13). (4) Sin auth/roles reales todavía (BL-12) — gate para despliegue multi-usuario.
- **fuentes** — Mismas que N5 (SPA en binario Go, Vite vs Next) · Strangler Fig (Fowler, vía CK-07) · Bounded Context/Conway's Law (vía I-74).

---

# EDGE — laptop / dispositivo

## N5 · DevStudio — app de escritorio de desarrollo (P2)

> ⚠ **Re-fichado 2026-07-07 (CK-16):** este nodo era "DevHub — Delivery (server Go + UI embebida
> en el data plane del cliente)". P2 lo superseded: **DevStudio** (repo `~/Proyectos/dev-studio`,
> mismo ledger DH-NN, graduación DH-12) es una **app de escritorio por usuario** — el punto
> compartido pasa del server-en-la-red-del-cliente al **repo GitHub (N6)**. El server DevHub
> nunca pasó de parcial y no se despliega; su historia queda en las fichas del monorepo congelado.
> Esta ficha fija solo la **frontera con Cockpit** — el detalle lo gobierna P2 (`VISION`/`LEDGER`
> de su repo).

- **objetivo** — Darle a cada usuario del ciclo de desarrollo (CTO · developer · devops · product owner) su consola **instalable** para construir y mantener software basado en **proceso, arquitectura y documentación as-code**, trabajando orquestados sobre el repo GitHub como punto de encuentro.
- **resumen** — App de escritorio multiplataforma (binario Go + UI embebida `go:embed`; instalador = el binario). Cada developer tiene a la mano **sus repositorios y sus historias**; la **versión Product Manager (en construcción)** concentra refinamiento y priorización — los developers ven "qué les tocó" en su propia app, con **GitHub como canalizador**.
- **plano · tipo · madurez** — Edge (máquina de cada usuario) · runtime edge / exec-env (app instalable) · **existe (parcial)** — esqueleto F1 + dogfooding (DH-13..DH-17).
- **responsabilidades** — Operar el ciclo de desarrollo como proceso-as-code (estados/gates/dueños/transiciones) **[R15 junto a N8/N10]** · orquestar sesiones de Claude Code vía **driver CLI-nativo** (spawnea el `claude` del propio usuario, stdin/stdout stream-json, **BYO licencia** — DH-10) · leer/escribir el repo GitHub del cliente (N6) · (PM, en construcción) refinamiento + priorización → historias asignadas visibles en la app de cada dev.
- **no_objetivos** — NO es server compartido en el data plane (ese modelo murió con el re-fichado) · NO toca credenciales de Anthropic (BYO licencia — hereda la doctrina ToS de N8) · NO es fuente de datos de Cockpit por API en vivo (el contrato CK-08 quedó **derogado**, ver comunicación) · NO lo gobierna este repo (célula P2, ledger DH-NN).
- **comunicacion** — App ⇄ **GitHub (N6)**: git + API de GitHub — el conector de la orquestación multi-usuario. App → **Claude Code (N8)**: stdin/stdout (stream-json), bajo la licencia del propio usuario. **Cockpit ⇄ DevStudio: SIN mecanismo firmado** — el contrato Pull API de CK-08 (diseñado contra el server que ya no existirá) quedó derogado en CK-16; la conexión se diseña cuando exista el primer consumidor real (BL-18), probablemente vía GitHub.
- **depende_de / consumido_por** — depende_de: N6 (GitHub), N8 (Claude Code del usuario). consumido_por: N10 (developer) y los demás roles del ciclo (CTO/devops/PO) · a futuro **N13** como consumidor de datos de delivery (mecanismo TBD, BL-18).
- **riesgos_abiertos** — (1) Conexión DevStudio/GitHub→Cockpit sin diseñar (BL-18 redefinido en CK-16). (2) Modelo de organización/sync multi-usuario vía GitHub — TBD de P2. (3) Distribución/updates de instalables de escritorio: N3 se diseñó para binarios del data plane; si aplica a DevStudio lo decide P2.
- **fuentes** — `~/Proyectos/dev-studio` (`VISION.md` · `LEDGER.md` DH-12..DH-17) · DH-10 (driver CLI-nativo, BYO licencia).

---

## N8 · Runtime de Delivery (Claude Code)

- **objetivo** — Construir las N historias → testing → producción contra N6, usando Claude Code con la **suscripción del developer humano**. Es la mitad "local" del runtime híbrido; complementa a N7 (server-side, API).
- **resumen** — Cada dev corre Claude Code (Pro/Max) en su laptop contra el repo del cliente. Local-por-dev **por restricción de licencia, no por preferencia técnica**. Desde CK-16, DevStudio (N5) lo orquesta vía driver CLI-nativo (spawnea el `claude` del propio dev, stdin/stdout) — sigue siendo la licencia del humano firmado, coherente con esta ficha.
- **plano · tipo · madurez** — Edge (laptop) · runtime edge (interactivo humano-en-el-loop, headless `claude -p` opcional) · **existe** (producto maduro first-party). La incertidumbre no era técnica sino de licenciamiento — aclarada feb-jun 2026.
- **responsabilidades** — Implementar historias, escribir/correr tests, llevar a prod contra N6, bajo gobierno humano **[R15]**.
- **no_objetivos** — NO se ejecuta server-side como servicio compartido · NO se multiplexa una suscripción entre varios devs/usuarios · NO sustituye a N7.
- **runtime + licencia (restricción ToS — sección crítica)** — **Confirmado jun 2026: NO se puede multiplexar la suscripción de Claude Code server-side como backend SaaS. Cada dev usa su propia suscripción. Sí se permite headless (`claude -p`) bajo la cuenta del propio dev.** Cadena: (1) *Consumer Terms §3.7* permite automatización solo vía API key o donde se permita explícitamente — el CLI oficial es esa excepción, en la máquina del propio usuario. (2) Actualización feb 2026: *usar OAuth tokens de Free/Pro/Max en cualquier otro producto — incluido el Agent SDK — no está permitido*. El Agent SDK exige API key. (3) Postura oficial (portavoz, abr 2026): *usar suscripciones con herramientas de terceros no está permitido*. (4) Reinstauración jun 2026 con candado: créditos "Agent SDK" por suscriptor — desde el **15 jun 2026** el headless `claude -p` bajo suscripción consume el crédito Agent SDK **de la cuenta firmada**, luego tarifa API; sigue atado a un humano firmado, dimensionado para "ordinary individual usage", **no habilita pooling server-side**. **Conclusión que firma la arquitectura:** delivery = **por-dev-en-su-laptop**; cualquier compute server-side (N7) usa **API key comercial**. Es exactamente el split del runtime híbrido — no una preferencia, una obligación de términos (enforcement real: caso OpenClaw, abr 2026).
- **qué_construye / contra_qué** — Construye historias, tests, releases · contra N6 (que ya tiene el AS-IS de N7 + el "qué").
- **local_vs_remoto** — Local: runtime (Claude Code, ejecución de tools, git) en la laptop. Remoto: inferencia vía suscripción. El método de delivery se inyecta desde el control plane (skills/reglas del harness), pero la ejecución es humano-gobernada. Frontera con N7: N7 = server-side/efímero/API en el data plane; N8 = edge/sesión/suscripción en la laptop.
- **seguridad** — Credenciales de suscripción del dev, en su laptop, vía CLI oficial — NO se extraen ni centralizan (extraerlas = violación ToS). Acceso a N6/sistemas con credenciales propias least-privilege. **CI:** si se quiere delivery automatizado server-side, usar **API key**, no suscripción.
- **comunicacion** — Laptop ↔ Anthropic (suscripción, inferencia) · laptop ↔ N6 (git) · laptop ↔ control plane (skills/método de delivery). Humano gobierna las transiciones.
- **depende_de / consumido_por** — depende_de: suscripción del dev, N6 (con AS-IS de N7), control plane (método/skills), sistemas del cliente para test/deploy. consumido_por: el cliente (software en prod); el proceso/cockpit (evidencia de gates).
- **riesgos_abiertos** — (1) Tentación de multiplexar (violación + baneo; política firme: server-side=API key, suscripción=un humano una laptop). (2) **Deriva de términos** (Anthropic cambió 3× en H1-2026) → tratar el licenciamiento como **configurable**, revisar por release. (3) Límite "ordinary individual usage" → modelar costo por dev, suscripción ≠ ilimitado. (4) Frontera de costo N7/N8 (qué va a API vs suscripción) = decisión económica + de cumplimiento.
- **fuentes** — [The Register — ban on third-party access (feb 2026)](https://www.theregister.com/software/2026/02/20/anthropic-clarifies-ban-on-third-party-tool-access-to-claude/5014546) · [VentureBeat — reinstates with a catch (jun 2026)](https://venturebeat.com/technology/anthropic-reinstates-openclaw-and-third-party-agent-usage-on-claude-subscriptions-with-a-catch) · [Microsoft Security — Claude Code GitHub Action (jun 2026)](https://www.microsoft.com/en-us/security/blog/2026/06/05/securing-ci-cd-in-agentic-world-claude-code-github-action-case/)

---

## N14 · App del Auditor — aplicación instalable del Consultor ★IP

> Nodo nuevo (2026-07-07, CK-11/CK-14) — el subsistema declarado en CK-11 ("App del Auditor"),
> incorporado al mapa de despliegue al terminar la arquitectura (BL-03). Definición de producto
> pendiente (BL-15) — esta ficha fija los **límites arquitectónicos** que esa definición debe respetar.

- **objetivo** — Darle al Consultor (N9) su herramienta de trabajo propia: una aplicación **instalable en su máquina** (patrón harness-studio/dev-studio) que **opera el método del servicio** (`sistema/metodo/proceso/` — m1 levantamiento · m2 mantenimiento · m3 espinazo) durante el engagement y **publica el resultado al repositorio de la empresa cliente (N6)** — "deploy de procesos": como un programador que carga código a producción, pero el artefacto son procesos/roles/objetivos/personas que Cockpit (N13) entiende y renderiza.
- **resumen** — El "IDE del auditor": el proceso-como-dato de `sistema/metodo/proceso/` ejecutable como flujo operable (carriles consultor/cliente/sistema, provenance por dato, AS-IS sellado) + publicación git al repo del cliente. Método **embebido en la app** (CK-11: "las cosas de servicio estarán embebidas en la aplicación del auditor").
- **plano · tipo · madurez** — Edge (máquina del consultor) · runtime edge / exec-env (app instalable) · **no-construido** (declarada CK-11; producto por definir — BL-15).
- **responsabilidades** — Embeber el método como flujo operable: guiar el engagement paso a paso, carriles por actor, provenance de cada dato, AS-IS sellado **[R16]** (BL-16) · producir/editar las instancias del **objeto normalizado** (`objeto.schema`, 9 entidades — el formato que N13 valida y renderiza) · **publicar** procesos/roles/objetivos ratificados al repo del cliente (N6) vía git — commits revisables, "deploy de procesos" **[R17]** (BL-17) · ser la superficie del consultor para las operaciones de levantamiento que hoy son manuales (depositar crudo en N12 **[R2]**, operar/validar N7 **[R7]/[R10]**) cuando el Motor (N1) exista.
- **no_objetivos** — NO publica el MÉTODO al cliente — solo el resultado: cruza el QUÉ, jamás el CÓMO (mismo límite de IP que N2/N7) · NO es multi-usuario/SaaS (una instalación por consultor, como N8 es una suscripción por dev) · NO reemplaza a N1 (la app opera y edita; el razonamiento server-side multi-tenant es N1) · NO renderiza la Vista Negocio (eso es N13 — la app produce lo que N13 muestra) · NO retiene crudo del cliente en la máquina del consultor (el crudo aterriza en N12, mismo límite que N9).
- **runtime + licencia** — App local instalable (patrón harness-studio/dev-studio, P4 del ecosistema). Stack por decidir en BL-15. Si incorpora agentes LLM: interactivo bajo la suscripción del consultor firmado (reglas de N8) o API key comercial si algo corre desatendido — hereda la doctrina ToS del sistema, decisión exacta en BL-15.
- **qué_construye / contra_qué** — Construye/edita instancias del objeto normalizado (`empresa/<tipo>/` del shell, D-15) + artefactos del método (actas, AS-IS sellado, provenance); contra el repo del cliente (N6), vía git.
- **local_vs_remoto** — Local: la app, el método embebido, el trabajo en curso del engagement. Remoto: el repo del cliente (push git) · (futuro) N1 para razonamiento server-side · (futuro) canal de actualización de la app (¿N3? — abierto).
- **seguridad** — El método embebido viaja en la app del consultor (persona nuestra, perímetro nuestro) — NO queda en infra del cliente; al cliente solo llegan commits con el resultado. Credenciales git least-privilege contra N6. Crudo del cliente fuera de la app (va a N12). Actualización de la app firmada (si se distribuye vía N3, hereda TUF).
- **comunicacion** — App → N6: git (push de procesos/roles/objetivos — el "deploy"). App → N12: depósito de crudo (operación de N9). App ↔ N1: HTTPS (futuro, cuando N1 exista). App → N3: pull de releases (futuro, si se distribuye por ahí).
- **depende_de / consumido_por** — depende_de: `sistema/metodo/` (embebido en build — el repo Cockpit es su fuente), N6 (destino del deploy), N1 (futuro, razonamiento). consumido_por: **N9** (su único operador) · aguas abajo **N13** (renderiza lo publicado) y el cliente (procesos vivos en su repo).
- **riesgos_abiertos** — (1) Definición de producto sin arrancar — alcance/stack/patrón exacto (BL-15). (2) Cadencia de actualización del método embebido: ¿la app se actualiza vía N3 como los binarios del data plane, o por reinstalación? (3) Frontera con N1: qué opera la app localmente vs qué razona el motor server-side — se resuelve al diseñar ambos. (4) Modelo de publicación al repo cliente: ¿push directo o PR con review del cliente? (BL-17). (5) Método embebido en app instalable = más expuesto que en control plane — dimensionar cuánto método baja al binario vs se sirve en runtime (espejo del riesgo de granularidad de N1/N2).
- **fuentes** — CK-11 (declaración del subsistema) · BL-15..BL-17 (backlog) · patrón harness-studio/dev-studio (P4, `~/Proyectos/harness-studio`).

---

## N9 · Consultor — actor

- **objetivo_del_actor** — Conducir el levantamiento y el diseño del spec; operar el Discovery desde el control plane. Lleva el método al cliente.
- **resumen** — El experto (Prenter) que opera Discovery + levantamiento.
- **plano · tipo · madurez** — Edge (su máquina) · actor · existe.
- **responsabilidades / no_objetivos** — **Recolecta y cura las fuentes crudas** (correo/USB/empresa) → las deposita en **N12 [R2]** · **opera** N7 (dispara el procesamiento y lo supervisa) **sin que el crudo toque su laptop** (lo corre en la máquina del data plane) **[R7]** · **valida y corrige** el mapa que produce N7 · **ratifica** el AS-IS y el SPEC **[R10]** · conduce/acompaña las entrevistas (la voz la pone N4) · aporta contexto político/estratégico. **NO procesa él mismo** (procesa N7; él opera y valida) · NO construye (N10) · NO posee los datos (del cliente).
- **permisos / RACI** — Máxima autoridad del **método** (A/R en Discovery/levantamiento). Opera N1, N4 y N7; deposita en N12; **su herramienta propia es N14** (App del Auditor — opera el método y publica el resultado [R16]/[R17]).
- **interfaces_que_usa** — **N14 (App del Auditor — su aplicación propia, futura)**, N1 (Discovery), N4 (entrevistas), **N7 (lo opera)**, **N12 (deposita el crudo)**, **N13** (Cockpit, vista consultor).
- **momentos** — Etapa 1 (levantamiento) + Etapa 2 (Discovery).
- **comunicacion** — HTTPS al control plane.
- **riesgos_abiertos** — Dependencia del consultor experto = límite de escala; el producto busca reducirla con el **método como dato** (N2) — cuánto se logra es una pregunta abierta del modelo de negocio.

---

## N10 · Developer — actor

- **objetivo_del_actor** — Construir las historias → testing → prod contra el repo del cliente, gobernando a Claude Code (N8).
- **resumen** — El humano que implementa, con N8 como copiloto.
- **plano · tipo · madurez** — Edge (laptop) · actor · existe.
- **responsabilidades / no_objetivos** — Implementa, testea, lleva a prod, revisa el trabajo del agente. NO diseña el spec (eso es Discovery/N9) · NO decide prioridades de negocio (eso es N11).
- **permisos / RACI** — R en Delivery. Credenciales propias least-privilege contra N6 y entornos del cliente. Su propia suscripción Claude Code (N8, ToS).
- **interfaces_que_usa** — N5 (DevStudio, su app de escritorio: sus repos + sus historias asignadas), N8 (Claude Code, orquestado desde N5), N6 (repo GitHub vía git).
- **momentos** — Etapa 2 (Delivery).
- **comunicacion** — git/SSH + HTTPS al data plane; suscripción a Anthropic.
- **riesgos_abiertos** — **¿El dev es del cliente o nuestro?** (define quién paga la suscripción y dónde corre la laptop respecto al data plane) — decisión abierta del modelo de entrega.

---

## N11 · CEO / sponsor — actor

- **objetivo_del_actor** — Ver su organización viva (mapa, OKRs, gaps), diseñar funcionalidad vía Discovery conversacional, y mover KPIs. Es el destinatario final de valor.
- **resumen** — La máxima autoridad del negocio; usuario thin (solo navegador).
- **plano · tipo · madurez** — Edge (thin browser) · actor · existe.
- **responsabilidades / no_objetivos** — Da contexto/objetivos (directorio) **[R1]**, ratifica prioridades **[R11]**, consume la vista CEO. NO opera el método · NO construye · NO instala nada.
- **permisos / RACI** — Sponsor = máxima autoridad del negocio (A en objetivos/prioridades), coherente con `service-design-doing` (el sponsor es el dueño/GM/CEO).
- **interfaces_que_usa** — **N13** vista CEO/Negocio (thin browser), N4/Discovery conversacional.
- **momentos** — Etapa 1 (objetivos), Etapa 3 (cockpit vivo, continuo).
- **comunicacion** — HTTPS (navegador) al data plane.
- **riesgos_abiertos** — Ninguno técnico; es el usuario de valor cuya experiencia define el éxito del producto.

---

# Chequeos de consistencia (el pago del esquema)

Las fichas no son solo docs: permiten verificar las 3 decisiones de arquitectura ya tomadas.

### 1 · IP protegida ← `clasificacion_dato` + `residencia_retencion` + `plano`
✅ Coherente. El ★IP (N1, N2) vive solo en el control plane y se **inyecta efímero** a N7 (memoria/tmpfs, destruido al teardown). Ningún nodo del data plane tiene `clasificacion=IP-nuestra` con `retencion=persiste`. **N14 (nuevo, CK-14) no rompe el chequeo:** el método embebido reside en la máquina del consultor (persona nuestra, plano edge — no infra del cliente); al repo del cliente (N6) solo cruza el **resultado** (procesos/roles/objetivos), nunca el método [R17]. Riesgo residual documentado en su ficha (cuánto método baja al binario instalable — espejo de la granularidad N1/N2).

### 2 · BYOC (el dato no sale) ← `plano` + `comunicacion`
✅ Coherente en el camino del dato persistente. Toda comunicación cliente↔nosotros es **outbound del cliente / PULL** (N3 releases+telemetría, N1 despacho, N4 webhook→pull). El control plane nunca disca a la red del cliente; ningún arco control→data está en el camino del dato. **Matiz firmado (CK-16):** N6 vive en **GitHub (org del cliente)** — la promesa precisa es "sus datos viven en SU GitHub y sus sistemas, no en infra nuestra"; el crudo más sensible (N12) sigue sin tocar GitHub. Cliente que prohíba cloud → git self-hosted, opción documentada en N6.

### 3 · No casado a Claude Code ← `stack` + `runtime`
✅ Coherente y **forzado por ToS**. API frontier para todo lo server-side (N1, N7); suscripción Claude Code solo para el dev humano (N8). El split híbrido es obligación de términos, no preferencia.

<a name="hallazgo-rojo"></a>
### 🟢 Decidido (2026-06-21) — "los datos no persisten, pero transitan"

La promesa BYOC precisa: **los datos del cliente NO persisten fuera de su red, pero SÍ transitan.** N1, N4 y N7 razonan vía la API de Anthropic → fragmentos del dato **transitan** al endpoint de Anthropic durante la inferencia; con zero-retention se procesan y descartan, **no se almacenan** afuera. La frase exacta hacia el cliente: **"transitan, no persisten."**

**Decisión:**
- **Marco por defecto (todos los clientes hoy):** *"tus datos no **persisten** fuera de tu red; **transitan** con zero-data-retention contractual + minimización de payload."* Se usa **Claude frontier** (la calidad que vende el producto).
- **LLM on-premise / en el perímetro del cliente: NO ahora.** Queda como **opción futura** para un cliente regulado que prohíba incluso el tránsito (mayor costo/complejidad, peor modelo — se evalúa cuando aparezca, no por defecto).

Aplica a todo nodo que llama al modelo (N1, N4, N7). "Transitan, no persisten" es la frase estándar.

---

<a name="seg-cumpl"></a>
# Seguridad, cumplimiento y contratos (roadmap progresivo)

> Base para hacer las cosas bien a futuro: certificaciones, moldes de contrato y controles que cubriremos progresivamente. Investigado sobre prácticas de McKinsey/BCG/Big4 (jun 2026). Referenciado desde el campo `nfr` de los nodos servicio (N1…).

**Principio (de la investigación):** el **contrato es el piso** (recurso, no prevención); la **prevención** es organizacional + técnica. Incidentes que lo probaron: Gupta/McKinsey (info de directorio → cárcel), PwC Australia (tax leaks), KPMG (murallas chinas que fallaron). Un directorio sofisticado **no se conforma con el NDA** — exige evidencia técnica.

### Espectro "no quedarse copia" (de simple a fuerte)
1. **NDA + cláusula de no-retención** (DPA). Solo contractual.
2. **VDR / view-only** + DRM + watermark dinámico + audit log + expiración (revisión documental; remote-shred revoca lo descargado).
3. **Zero Data Retention / efímero** — stateless, en memoria, logs sin crudo, persistir solo resultados.
4. **BYOK / CMK** — el cliente tiene y revoca la llave; zero-knowledge (no podemos descifrar).
5. **Cómputo-al-dato / data clean room** — el crudo no se mueve; solo salen agregados.
6. **Confidential computing / TEE + atestación** (y **HYOK**) — ni el operador ve el crudo; verificable por hardware. Lo más fuerte.

Nuestra arquitectura (BYOC + data plane + N7 efímero + N12 con destrucción) ya nos para en niveles **3–5 por diseño**; 4 y 6 se agregan para clientes regulados.

### Certificaciones (cubrir progresivamente)
- **Ahora / corto plazo:** equivalente funcional de SOC 2 respondible en un **DDQ** (security questionnaire) — controles de acceso, cifrado TLS 1.3 + AES-256, audit trail, data residency declarada.
- **Cuando el cliente lo exija:** **SOC 2 Type II** e **ISO 27001** formales; por sector, PCI DSS / HIPAA / PSD2.

### Moldes de contrato a tener listos
- **NDA** (pre-engagement).
- **DPA** tipo procesador (GDPR Art. 28): instrucciones documentadas, medidas técnicas, sub-procesadores, **devolución/destrucción al cierre**, derecho de auditoría.
- **Clean Team Agreement** (cuando haya info competitivamente sensible / múltiples partes).
- Cláusula explícita de **no-retención + destrucción certificada** + prohibición de almacenar en dispositivos personales.

### Qué exige el cliente sofisticado (anticipar)
DDQ / security questionnaire · certificaciones · **data residency** · **derecho de auditoría** · **no-copia / destrucción** verificable · **vetting** del personal con acceso.

### Cómo el consultor (N9) procesa info sensible — estándar de industria
NO traer el dato a equipo/bases nuestras: **operar dentro del entorno del cliente** (identidad en su tenant) o vía **VDI/RBI** (el dato no baja al endpoint, solo píxeles), con **clean team** (segregación, need-to-know), audit trail y destrucción al cierre. Coherente con N9 operando N7 en el data plane sin que el crudo toque su laptop.

### Fuentes
[McKinsey — clean teams](https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/deal-delays-are-the-new-normal-clean-teams-are-the-fix) · [GDPR DPA Art. 28](https://gdpr.eu/data-processing-agreement/) · [SOC 2 vs security questionnaires](https://secureframe.com/blog/soc-2-vs-security-questionnaires) · [Citrix VDI](https://www.citrix.com/glossary/what-is-a-virtual-desktop.html) · [Zscaler RBI / third-party access](https://www.zscaler.com/products-and-solutions/byod-with-ztna) · [AWS Clean Rooms](https://docs.aws.amazon.com/clean-rooms/latest/userguide/what-is.html) · [BYOK (IronCore)](https://ironcorelabs.com/byok/) · [AWS Nitro Enclaves](https://aws.amazon.com/ec2/nitro/nitro-enclaves/)

---

# Pendientes consolidados (narrativa de arquitectura — el tracking vive en el backlog)

> **Disciplina (CK-11/CK-14):** el pendiente de Cockpit se trackea en `proyecto/backlog.yaml` (BL-NN),
> única fuente de la verdad. Esta lista queda como narrativa del ecosistema: qué está decidido, qué
> sigue abierto y dónde se trackea. Lo que es de DevHub (P2) se gobierna en su repo/ledger (DH-NN).

1. ✅ **Decidido (2026-06-21):** "datos no persisten, transitan" (zero-retention + minimización; Claude frontier). LLM on-premise = opción futura, no ahora.
2. **Contrato del handoff Discovery→Delivery (el SPEC "comidito")** — qué cruza exactamente del control plane al data plane (gaps priorizados → spec ratificado → backlog); donde la protección de IP se vuelve tangible (granularidad del despacho de N1/N2). Se resuelve al diseñar N1 (BL-13).
3. **Resolver la deuda Go/Next de N13** (matar el doble backend → Vite SPA + Go único) = **BL-20**. Decidir antes de construir vistas nuevas. (El lado DevHub de esta deuda murió con el server — DevStudio es otra base de código, gobernada en P2.)
4. **¿El developer (N10) es del cliente o nuestro?** — define modelo de entrega + quién paga N8. Decisión de modelo de negocio, sin BL (no es trabajo de sistema todavía).
5. **Diferidos:** SQLite en N13 (cuando el roadmap/OKR-rollup duela) · voz en N4 (v2, tras texto-primero) · modo Etapa-1 vs Etapa-2 del plano conversación.
6. **Decidido en dos tiempos:** (2026-07-02→06, I-74/CK-07/CK-08) dos binarios independientes + contrato Pull API diseñado. **(2026-07-07, CK-16) superseded:** el server DevHub murió sin desplegarse — P2 es ahora **DevStudio** (app de escritorio por usuario, GitHub como conector) y el contrato CK-08 quedó **derogado** (se diseñó contra un host que no existirá). La conexión DevStudio/GitHub→Cockpit se diseña con el primer consumidor real (**BL-18**, redefinido).
7. **Definir la App del Auditor (N14)** — alcance, stack, cómo embebe el método, modelo de publicación al repo cliente (**BL-15 · BL-16 · BL-17**). Los límites arquitectónicos ya están fijados en su ficha.
