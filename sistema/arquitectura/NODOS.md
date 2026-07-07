# Nodos del diagrama de despliegue — fichas de arquitectura

> **Qué es:** la definición a nivel arquitecto de cada **nodo** del diagrama de despliegue
> ([`despliegue.html`](./despliegue.html)). Cada ficha permite un *drilldown* para entender el sistema
> antes de bajar a funcionalidades. Insumo para volver al diseño de servicio (backstage/endpoints) con
> los límites ya claros.
> **Docs base:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) · `PRODUCT-VISION.md` (legacy `prenter-harness/tooling/strategy/`) · [`METODOLOGIA.md`](../metodo/METODOLOGIA.md)
> **Última actualización:** 2026-07-02 — corregido post-I-69: N5 predataba la partición en células P1(Cockpit)/P2(DevHub) y describía "el Cockpit completo" como un solo binario. **N5 ahora = DevHub/Delivery (P2) exclusivamente; N13 (nuevo) = Cockpit/Vista-Negocio (P1).** Ver `I-74`/`CK-07` (`products/cockpit/LEDGER.md`) — dos binarios independientes, DevHub llega a Cockpit vía contrato de datos, no import de código.

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
| **N5** | DevHub — Delivery (server Go + UI embebida) | Data | servicio/exec-env | existe (parcial) | — |
| **N6** | Repo del cliente | Data | artefacto/dato | existe | ★datos |
| **N7** | Agentes de análisis / levantamiento | Data | agente efímero | no-construido | — |
| **N12** | Depósito de fuentes (landing zone) | Data | artefacto/dato | no-construido | ★datos |
| **N13** | Cockpit — Vista Negocio (server Go + UI embebida, propio) | Data | servicio/exec-env | existe (parcial) | — |
| **N8** | Runtime de Delivery (Claude Code) | Edge (laptop) | runtime edge | existe | — |
| **N9** | Consultor | Edge | actor | existe | — |
| **N10** | Developer | Edge | actor | existe | — |
| **N11** | CEO / sponsor | Edge (thin) | actor | existe | — |

---

## Responsabilidades del sistema — R1–R15 (el responsibility-walk)

> El flujo de la data **objetivo → producción**, una responsabilidad por eslabón, con su nodo dueño.
> Es **cómo se asignó cada nodo** (recorrer el flujo, no ir nodo-por-nodo). Cada `[R#]` en las fichas
> de abajo **resuelve a esta tabla** (lo valida `scripts/validate_schema.py`, ref-check — no más punteros
> colgantes). Etapas: E1 = Levantamiento (M1) · E2 = Ejecución (M3).

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

- **objetivo** — El cockpit (N5) corre en la red del cliente y debe actualizarse sin que nadie abra puertos hacia el cliente y sin que el vendor empuje nada por sorpresa. A la vez, necesitamos saber si la flota está sana **sin** exfiltrar datos (eso rompería el BYOC). Este nodo publica releases firmadas que el data plane *jala*, y recibe telemetría agregada opt-in.
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
- **depende_de / consumido_por** — depende_de: object storage/CDN + KMS + pipeline de build del binario. consumido_por: **N5** y **N13** en cada data plane (dos binarios que actualizar por separado).
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

## N5 · DevHub — Delivery (server Go + UI embebida)

> ⚠ **Corregido 2026-07-02 (I-74/CK-07):** esta ficha predataba I-69 (partición P1 Cockpit / P2 DevHub) y describía "el Cockpit completo" (Delivery + Vista CEO) como un binario único. Vista Negocio/CEO ahora es **N13** (binario propio de Cockpit) — DevHub llega a Cockpit como fuente de datos vía contrato explícito (a diseñar, CK-07), no como el mismo proceso. N5 queda acotado a Delivery.

- **objetivo** — Un binario Go que se "dropa" en la red del cliente y sirve **Delivery** (tablero SDD 10 estados, mapa de capabilities, roadmap, releases — vistas que varían **por ROL**: CTO ve/edita todo, developer una rebanada), leyendo el repo git (N6) como SSoT y reflejando cambios en tiempo real. Cero npm/python/Docker en el cliente.
- **resumen** — HTTP server `net/http` que: embebe la SPA (`go:embed`), expone APIs JSON que leen/escriben el repo, y corre un watcher (`fsnotify`) que hace push por SSE a los navegadores. Módulo Go `cockpit` (P1, `products/cockpit/go`) hoy vive embebido aquí vía `require`+`replace` (CK-05) — **a desmontar en Stage 4** (CK-07) hacia el contrato de datos con N13.
- **plano · tipo · madurez** — Data · servicio/exec-env · **existe (parcial)**. Binario Go funcional; fsnotify+SSE implementados. **Corrección de premisa: SQLite NO existe hoy** — el binario lee el filesystem directo en cada request. Deuda Go/Next confirmada (abajo). Vistas por-rol: NO construidas (hoy sin auth, todo visible) — trabajo propio de P2, independiente de la extracción de N13.
- **responsabilidades** — Servir la SPA embebida con fallback de client-side routing · API JSON de Delivery (stories/capabilities/releases/roadmap) · watcher filesystem → SSE en tiempo real (ya existe: debounce 200ms, docType, filtro por brand) · (futuro) proyección SQLite reconstruible · (futuro) resolución de vista por ROL.
- **no_objetivos** — NO es el SSoT (lo es N6; su DB es desechable) · NO multi-tenant hyperscale (1 PyME/despliegue) · NO hace SSR/SEO (herramienta interna tras login → SPA pura) · NO orquesta agentes (lee/escribe el mismo repo) · NO sirve la Vista Negocio/CEO (eso es N13, aplicación separada).
- **stack** — `net/http` stdlib (basta a esta escala; chi/gin sería gold-plating) · `go:embed all:ui` + fallback SPA · `fsnotify` v1.8 (no recursivo → camina subdirs) · **SSE** (no WebSocket: unidireccional server→cliente, reconexión automática, atraviesa proxies; añadir keep-alive `:ping` cada ~25s + cleanup vía `r.Context().Done()`) · **proyección: SQLite con `modernc.org/sqlite` (pure-Go, sin cgo)** para preservar el single-binary y cross-compile (cgo rompe Alpine/cross/`-race`); `journal_mode=WAL` + `busy_timeout`; DB 100% derivada → si falta/corrupta/cambió versión, se reproyecta recorriendo el repo. Introducir "cuando duela" (agregaciones de roadmap/coverage), no antes.
- **expone** — HTTP/JSON ~24 rutas (paridad con las `route.ts`): `/api/stories`, `/api/capabilities/*`, `/api/releases`, `/api/transition`, `/api/system-map`, `/api/value-stream`, `/api/file`, `/api/open`, etc. · **(a diseñar, CK-07) el contrato de datos que N13 consumirá** — capabilities/sistemas/estado del tablero, versionado. · SSE: `GET /api/watch?brand=…` · estáticos SPA shell + assets.
- **estado + persistencia** — Verdad: archivos en N6 (lectura/escritura al filesystem). Derivado (futuro): SQLite WAL local, reconstruible, desechable. Memoria: clientes SSE, caché de workspace root, brands.
- **escala + disponibilidad** — 1 empresa, 3-30 devs, decenas-cientos de historias, pocos concurrentes. Proceso único con daemon (ya hay `daemon_unix/windows.go` + PID files); crash → restart sin estado que perder. **Sobreingeniería a evitar:** réplicas, LB, Redis pub/sub, colas, K8s.
- **integraciones_externas** — `git` (resuelve root vía `git rev-parse`) · editor del SO (`/api/open`).
- **seguridad** — Vive en la red del cliente. Riesgo: server con lectura/escritura al filesystem. **Endurecer:** validar/normalizar paths (`filepath.Clean` + verificar dentro de `WORKSPACE_ROOT`) en `/api/file` y `/api/open` (anti path-traversal); bind por defecto a `127.0.0.1`; si se expone en LAN, token simple. **Pendiente (P2):** auth/permisos por rol (CTO vs developer) — hoy no existe.
- **comunicacion** — Request/response JSON (CRUD) · SSE (server→cliente) · fsnotify (eventos internos) · **(futuro) el contrato de datos hacia N13** — dirección/mecanismo (N13 jala vía API, o N5 exporta) a diseñar en Stage 4.
- **depende_de / consumido_por** — depende_de: N6, `git`, filesystem. consumido_por: navegadores de devs/operadores (Delivery, por rol) · **N13** (jala datos de capabilities/sistemas, futuro).
- **🔧 RECOMENDACIÓN (deuda Go/Next)** — **Matar el doble backend. Migrar la UI de Next.js static-export → SPA pura con Vite + React 19 + React Router, embebida con `go:embed`. Go queda como único backend.** Razones: hoy `build-ui.sh` esconde `app/api` en `.api-stash` porque `output:'export'` prohíbe API routes → mantienes ~24 `route.ts` (dev) + 10 handlers Go (prod) "sin sync"; la regla "lo que no corre en el binario Go no cuenta" ya hace muertas las `route.ts` en prod; DevHub es el caso de libro de Vite SPA (interna, tras login, sin SSR). **Plan:** Vite+React 19+Router reusando componentes (Tailwind 4 se mantiene) → dev con `vite` proxy `/api`→`:4000` (un solo backend desde día 1) → borrar `devhub/ui/app/api/**` → simplificar `build-ui.sh` (`vite build` → `cp dist`) → handler embed con fallback SPA estándar. *Auditar las 24 `route.ts` vs los 10 handlers Go antes de borrar.* Misma deuda existe en paralelo en N13 (hereda el mismo patrón Next static-export) — resolución independiente, mismo playbook.
- **riesgos_abiertos** — Migración Next→Vite (re-cablear routing/data-fetch; auditar paridad antes de borrar) · SQLite (disparador de rebuild por versión de esquema; invalidación incremental consistente) · SSE (falta keep-alive/ping + re-watch robusto de dirs nuevos) · path traversal (ver seguridad) · **contrato de datos hacia N13 sin diseñar todavía** (CK-07) · vistas por-rol sin auth (P2, abierto).
- **fuentes** — [SPA en binario Go](https://dev.to/aryaprakasa/serving-single-page-application-in-a-single-binary-file-with-go-12ij) · [SQLite WAL](https://sqlite.org/wal.html) · [pure-Go SQLite](https://github.com/gogs/gogs/issues/7882) · [Vite vs Next 2026](https://techsy.io/en/blog/nextjs-vs-react-vite)

---

## N6 · Repo del cliente (SSoT git) ★datos

- **objetivo** — Ser la **única fuente de verdad** del cliente: AS-IS, gaps, specs (SDD), código, OKRs, journey, capacidades, releases. Repositorio git versionado, legible por humanos Y agentes, del que todo lo demás (la DB del cockpit) es proyección desechable.
- **resumen** — "Git como base de datos + vista materializada": datos como `markdown` (prosa) + `yaml`/`json` (estructura). Git aporta versionado, autoría, historia, branch/merge, diffs revisables.
- **plano · tipo · madurez** — Data · artefacto/dato · **existe** (el cockpit ya lo trata como única fuente; `workspace.go` resuelve root vía `git rev-parse`).
- **responsabilidades** — Contener y versionar todo el conocimiento/artefactos del proyecto · legible/editable por personas (IDE), agentes Claude y cockpit · proveer historia, autoría y reversibilidad.
- **no_objetivos** — NO es DB transaccional ni de queries agregadas en caliente (eso es la proyección de N5) · NO almacena blobs grandes ni datos high-churn (git diffea mal eso) · **NO es el landing del crudo de entrada (eso es N12); guarda solo la verdad derivada/curada** · NO sale nunca de la red del cliente.
- **formato** — Markdown (humano-primero: specs, checkpoints, operator-input, learnings) · YAML/JSON (estructura: `capabilities/*.yaml`, `releases/*.yaml`, `project.config.yaml`, frontmatter) · código fuente. Convención (estado del arte): **prosa en markdown, datos estructurados en yaml/json** — no embeber tablas en markdown (diffea/parsea mal). El repo ya respeta esto.
- **propietario + clasificacion** — Cliente (la PyME). El consultor/agente escribe, el cliente posee. ★ datos del cliente, confidencial, **nunca sale de su red**.
- **residencia + retencion** — Red/infra del cliente (su git server, o local-first). Retención indefinida vía historia git (es el valor: trazabilidad objetivo→producción). Sin TTL; el repo ES el archivo histórico.
- **versionado** — Git (commits, branches, tags, blame, diff). **Límite del patrón:** git degrada con archivos enormes, alta frecuencia de escritura, o merges concurrentes con semántica de fila (ahí brillan Dolt/lakeFS, **innecesarios a esta escala** = sobreingeniería). Para decenas-cientos de historias en md/yaml con equipo 3-30, git plano es el ajuste correcto.
- **quién_escribe / quién_lee** — Escriben: agentes de levantamiento/diseño (N7: AS-IS, gaps, specs), devs (N10: código + spec), DevHub (N5: transiciones de Delivery), Cockpit (N13: transiciones de Vista Negocio). Leen: N5 y N13 (ambos proyectan), agentes Claude, humanos. **Concurrencia:** mismo archivo por agente+dev+N5+N13 → resolver con git + escrituras atómicas (write-temp-then-rename) en cada binario.
- **comunicacion** — No es servicio: filesystem + protocolo git. N5 lo lee/escribe directo; los agentes como archivos.
- **depende_de / consumido_por** — depende_de: git, filesystem. consumido_por: N5, agentes Claude (N7/N8), herramientas dev.
- **riesgos_abiertos** — Escritura concurrente (disciplina de commits + escritura atómica) · drift de formato yaml/frontmatter sin validación (los gates SDD apuntan a esto) · tentación de meter high-churn/binarios (degrada el patrón) · rebuild de la proyección depende de repo parseable → parsing tolerante a errores, no fallo total.
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

## N13 · Cockpit — Vista Negocio (server Go + UI embebida, propio)

> Nodo nuevo (2026-07-02, I-74/CK-07) — antes vivía indiferenciado dentro de N5. Es el binario de **P1 Cockpit**: hoy sirve la Vista Negocio/Directorio construida (Stage 1-3, CK-02/05/06); a futuro absorbe el Motor de Discovery (N1) cuando ese se construya — N13 es la mitad *data-plane* de P1, N1 es su mitad *control-plane*, ambas son el mismo producto (P1), no productos distintos.

- **objetivo** — Binario Go propio que sirve la Vista Negocio/Directorio (Hilo de Oro, Brechas, mapa Empresa→Sistema, roles Directorio·Área·Consultor) al CEO/directorio en la red del cliente, con mantenimiento de datos propio de organización/áreas/procesos — independiente del binario de Delivery (N5). Cero npm/python/Docker en el cliente (mismo principio que N5).
- **resumen** — Hoy: el módulo `products/cockpit/go` (`package cockpit`, `Deps` struct, CK-05) + la UI `products/cockpit/ui` (`CockpitShell`/`NegocioView`, CK-06) — código YA escrito, pero embebido dentro del binario `cockpit` de N5/DevHub vía `require`+`replace`. Stage 4 (CK-07) le da su propio `cmd/` + launcher + puerto, y reemplaza el import de Go por un contrato de datos explícito hacia N5.
- **plano · tipo · madurez** — Data · servicio/exec-env · **existe (parcial), embebido en N5** — código construido (CK-02/05/06), runtime propio NO construido (Stage 4, CK-07 — pendiente).
- **responsabilidades** — Servir la SPA embebida (misma técnica que N5: `go:embed` + fallback SPA) · API JSON de Vista Negocio (`/api/portfolio`, `/api/negocio` — contrato ya vigente desde CK-05, dueño = esta célula) · **(futuro, Stage 4)** consumir el contrato de datos de N5 (capabilities/sistemas/estado del tablero de Delivery) en vez de leerlo vía import de Go · **(futuro, campaña aparte)** absorber el Motor de Discovery (N1: ingesta multi-fuente, As-Is/To-Be, gaps) como su propio backend de razonamiento.
- **no_objetivos** — NO sirve Delivery (tablero SDD/capabilities/releases — eso es N5, aplicación separada) · NO es el SSoT de datos de DevHub (los consume, no los posee) · NO multiplexa Claude Code (si/cuando construya N1, hereda las mismas restricciones de N1: API frontier, no suscripción).
- **stack** — Misma resolución que N5 (mismo linaje de código, CK-05/06): `net/http` stdlib · `go:embed all:ui` + fallback SPA · Next.js static-export hoy (misma deuda Go/Next que N5, resolución independiente vía el mismo playbook Vite). **(futuro)** proyección propia si la Vista Negocio necesita agregaciones (roll-up de OKRs por área) — introducir cuando duela, no antes.
- **expone** — HTTP/JSON: `/api/portfolio` (árbol Empresa→Sistema), `/api/negocio` (Hilo de Oro + Brechas) — contrato ya vigente (CK-05) · estáticos SPA (`CockpitShell`) · **(a diseñar, Stage 4)** el lado consumidor del contrato de datos de N5.
- **estado + persistencia** — Verdad: repo git (N6, mismo patrón que N5) + lo que N5 exponga vía el contrato de datos (futuro). Sin DB propia hoy.
- **escala + disponibilidad** — Misma escala que N5 (1 empresa/despliegue). Proceso único; **sin daemon propio todavía** (hereda el de N5 hasta Stage 4).
- **integraciones_externas** — `git` (resuelve root, mismo patrón que N5) · N5 (contrato de datos, futuro) · N1 (cuando exista, mismo producto P1).
- **seguridad** — Vive en la red del cliente, mismo perímetro que N5. Superficie nueva a evaluar en Stage 4: el contrato de datos hacia N5 (¿mismo proceso/host, o red? define si aplica auth).
- **comunicacion** — Hoy: llamada de función in-process (`Deps`, CK-05) — cero red, cero serialización. **Objetivo (Stage 4):** contrato de datos explícito con N5 (API que N13 consume, o export versionado) — mecanismo exacto a diseñar en Plan mode.
- **depende_de / consumido_por** — depende_de: N6 (repo) · N5 (datos de Delivery, futuro) · N1 (razonamiento, cuando exista). consumido_por: **N11** (CEO/sponsor, Vista Negocio) · **N9** (Consultor, vista consultor).
- **riesgos_abiertos** — (1) El contrato de datos con N5 sin diseñar — mecanismo (pull API vs export), formato, versionado, autenticación si cruza red (CK-07, siguiente). (2) Migración fuera de `Deps`/require-replace sin romper `/api/portfolio`+`/api/negocio` en vivo (Strangler Fig — CK-05 sigue funcionando mientras se construye el reemplazo). (3) Deuda Go/Next propia (ver nota en N5). (4) Cuándo/si absorbe N1 — campaña aparte, sin fecha.
- **fuentes** — Mismas que N5 (SPA en binario Go, Vite vs Next) · Strangler Fig (Fowler, vía CK-07) · Bounded Context/Conway's Law (vía I-74).

---

# EDGE — laptop / dispositivo

## N8 · Runtime de Delivery (Claude Code)

- **objetivo** — Construir las N historias → testing → producción contra N6, usando Claude Code con la **suscripción del developer humano**. Es la mitad "local" del runtime híbrido; complementa a N7 (server-side, API).
- **resumen** — Cada dev corre Claude Code (Pro/Max) en su laptop contra el repo del cliente. Local-por-dev **por restricción de licencia, no por preferencia técnica**.
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

## N9 · Consultor — actor

- **objetivo_del_actor** — Conducir el levantamiento y el diseño del spec; operar el Discovery desde el control plane. Lleva el método al cliente.
- **resumen** — El experto (Prenter) que opera Discovery + levantamiento.
- **plano · tipo · madurez** — Edge (su máquina) · actor · existe.
- **responsabilidades / no_objetivos** — **Recolecta y cura las fuentes crudas** (correo/USB/empresa) → las deposita en **N12 [R2]** · **opera** N7 (dispara el procesamiento y lo supervisa) **sin que el crudo toque su laptop** (lo corre en la máquina del data plane) **[R7]** · **valida y corrige** el mapa que produce N7 · **ratifica** el AS-IS y el SPEC **[R10]** · conduce/acompaña las entrevistas (la voz la pone N4) · aporta contexto político/estratégico. **NO procesa él mismo** (procesa N7; él opera y valida) · NO construye (N10) · NO posee los datos (del cliente).
- **permisos / RACI** — Máxima autoridad del **método** (A/R en Discovery/levantamiento). Opera N1, N4 y N7; deposita en N12.
- **interfaces_que_usa** — N1 (Discovery), N4 (entrevistas), **N7 (lo opera)**, **N12 (deposita el crudo)**, **N13** (Cockpit, vista consultor).
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
- **interfaces_que_usa** — N8 (Claude Code), N5 (cockpit UI), N6 (repo vía git).
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
✅ Coherente. El ★IP (N1, N2) vive solo en el control plane y se **inyecta efímero** a N7 (memoria/tmpfs, destruido al teardown). Ningún nodo del data plane tiene `clasificacion=IP-nuestra` con `retencion=persiste`.

### 2 · BYOC (el dato no sale) ← `plano` + `comunicacion`
✅ Coherente en el camino del dato persistente. Toda comunicación cliente↔nosotros es **outbound del cliente / PULL** (N3 releases+telemetría, N1 despacho, N4 webhook→pull). El control plane nunca disca a la red del cliente; ningún arco control→data está en el camino del dato.

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

# Pendientes consolidados (orden sugerido)

1. ✅ **Decidido (2026-06-21):** "datos no persisten, transitan" (zero-retention + minimización; Claude frontier). LLM on-premise = opción futura, no ahora.
2. **Contrato del handoff Discovery→Delivery (el SPEC "comidito")** — qué cruza exactamente del control plane al data plane (gaps priorizados → spec ratificado → backlog); donde la protección de IP se vuelve tangible (granularidad del despacho de N1/N2).
3. **Resolver la deuda Go/Next de N5 y N13** (matar el doble backend → Vite SPA + Go único, mismo playbook en ambos binarios, independiente uno del otro). Decidir antes de construir vistas nuevas.
4. **¿El developer (N10) es del cliente o nuestro?** — define modelo de entrega + quién paga N8.
5. **Diferidos:** SQLite en N5/N13 (cuando el roadmap/OKR-rollup duela) · voz en N4 (v2, tras texto-primero) · modo Etapa-1 vs Etapa-2 del plano conversación.
6. **✅ Decidido (2026-07-02, I-74/CK-07):** N5 (DevHub/Delivery) y N13 (Cockpit/Vista-Negocio) son binarios independientes — el runtime único de antes era transicional (Stage 1-3), no destino. **Pendiente:** diseñar el contrato de datos N5→N13 (mecanismo, formato, versionado) — Plan mode, próxima sesión de célula.
