# Arquitectura — prenter-harness como solución insertada en la organización

> **Qué es:** la arquitectura de sistema (visión CTO) de la solución que construimos. No es un SaaS
> monitor — es una **solución que se inserta en la organización y ejecuta el proceso de desarrollo
> completo** (de empresa desconocida → empresa monitoreada con todos sus gaps → cockpit que mueve KPIs).
> **Docs base:** `VISION-DESARROLLOS.md` (§17 planos, §12 contexto, §19 mapa) y `PRODUCT-VISION.md` (legacy, monorepo `prenter-harness/tooling/strategy/` — congelado) ·
> [`SERVICE-DESIGN.md`](../../proyecto/research/service-design/SERVICE-DESIGN.md) · [`METODOLOGIA.md`](../metodo/METODOLOGIA.md) · **[`NODOS.md`](./NODOS.md) (14 nodos a nivel arquitecto, SSoT de fichas) · [`despliegue.html`](./despliegue.html) (diagrama visual, portado y actualizado en CK-14)**.
> **Decisiones de arquitectura:** este repo → [`LEDGER.md`](../../LEDGER.md) (fichas **CK-NN**) · historia previa → ledgers **I-NN** (producto) y **H-NN** (fábrica) del monorepo legacy `prenter-harness` (congelado). *No hay ADRs en formato MADR; los ledgers son el equivalente (append-only).*
> **Última actualización:** 2026-07-07 (**CK-14**, cierra BL-03) — N14 App del Auditor al mapa; dos binarios en el data plane (Stage 4 ejecutado); contrato de datos diseñado (CK-08); despliegue.html portado.

---

## Modelo mental (una frase)
**UN sistema en TRES etapas (Levantamiento · Ejecución · Cockpit-CEO) · DOS planos de despliegue
(Control Plane nuestro = Discovery/IP · Data Plane del cliente = Delivery+CEO/datos · patrón BYOC) · UN SSoT ·
el know-how protegido por arquitectura · runtime de agentes HÍBRIDO (API server-side + Claude Code en laptop dev).**

Las **3 etapas** (= los módulos M1·M3·M2, ver [PRODUCT-VISION §1.2](../../../tooling/strategy/PRODUCT-VISION.md)) son el QUÉ.
El **split de despliegue** es el CÓMO se lleva a la realidad: el **Discovery** (levantamiento + diseño del
spec) corre **con el consultor** y guarda el know-how; el **Delivery** (construcción) corre **en la red del
cliente**. El **handoff** entre ambos es el **SPEC "comidito"** — el QUÉ, nunca el CÓMO.

Resuelve las tensiones de CTO: **no múltiples sistemas** (uno, dos partes por dónde-corre) · **no sobrecargar
al cliente** (Discovery es overlay nuestro) · **SSoT en archivos** · **IP protegida sin candado** (separación
física Discovery/Delivery, no ofuscación).

---

## Principios de arquitectura (decididos · AskUserQuestion 2026-06-19)
1. **SSoT = archivos en git; la base de datos es una proyección.** Archivos mandan, SQLite acelera.
2. **Un solo sistema, dos vistas por rol.** El visual/metodología vive **dentro del cockpit**, no en una superficie aparte.
3. **Next.js ahora → binario Go (SPA embebida) como destino de distribución.** No reescribir aún.

---

## Capa 1 · SSoT — archivos en git (la verdad)
- **Markdown** (narrativa, metodología, specs) + **YAML/JSON** (contexto-org, gaps, journey-state, KRs).
- **Verdad ratificada por humanos y leíble por agentes** — Claude Code lee/escribe archivos nativo.
- **git = audit trail + sync gratis**, portable, sin infra. Coherente con el seam `project.config.yaml`.
- **Dos repos** (propiedad, ver abajo): repo **factory** (nuestro) + repo **cliente** (su data).

## Capa 2 · Proyección — SQLite embebida (la velocidad)
- **Derivada de los archivos** (el cockpit la reconstruye vía watcher). **Nunca es la fuente** — si se borra, se regenera desde los archivos.
- Sirve lo que los archivos hacen mal: **queries, el grafo del Hilo de Oro, rollups de aporte, vistas en tiempo real**.
- Patrón: *git como base de datos + vista materializada*. State-of-the-art jun 2026 para agent-native + local-first.

## Capa 3 · Control plane — el cockpit (dos vistas por rol)
Un mismo cockpit, una superficie por rol sobre los **mismos datos**:
- **Vista Consultor:** el **playbook paso-a-paso** (qué hacer en cada cliente) · la **metodología detrás de cada paso** (drill-down para prepararse) · el dispatch a los agentes. Todo visual.
- **Vista Cliente:** **su** journey — pasos que se **desbloquean** · logros conseguidos · **visibilidad CEO** (empresa monitoreada + gaps que aún no tiene = lo que falta desarrollar para mover KPIs).
- El **proceso de implementación (nuestro)** es un **overlay solo-consultor**; al cliente nunca le llega crudo.

## Capa 4 · Tres planos de ejecución (hace acciones, no monitorea) — §17
- **Conversación** (LangGraph + voz ElevenLabs, hosted, bajo volumen) — entrevistas.
- **Análisis** (Claude Code local) — gaps, SYSTEM-MAP, contexto.
- **Construcción** (Claude Code local) — construye.
- **Seam = filesystem.** Lo que nos separa de Linear: ejecutamos el proceso de desarrollo completo, insertados en la org.

---

## El proceso COMO dato (un modelo, dos experiencias) — mata "múltiples sistemas"
Las **etapas/pasos se definen una sola vez** como datos estructurados:
```
paso → { qué hacer · link a metodología · gate · quién (RACI) · artefacto · estado/desbloqueo }
```
De ese único modelo se **renderiza la vista consultor Y la vista cliente**. La metodología `.md` es el
**"detrás de cada paso"** (drill-down). La idea del sitio visual (Starlight) **no es un sistema aparte**:
se vuelve una **capa del cockpit** (los `.md` siguen SSoT, el cockpit los renderiza visual — journey con
curva emocional, blueprint como swimlanes).

---

## Propiedad — lo nuestro vs lo del cliente
| | Qué | Dónde queda |
|---|---|---|
| **Proceso de implementación** (nuestro) | metodología + playbook + kit + skills factory | repo **`prenter-harness`** (NUESTRA IP) |
| **Producto** (del cliente) | binario cockpit + kit `core-harness` + su repo de datos | con el **cliente** (su empresa monitoreada, sus gaps, su proceso de dev) |

El código del cockpit es compartido (un producto); el **playbook interno** (nuestro paso-a-paso) es una
capa de datos solo-consultor que **no se entrega** (a lo sumo un `OPERATING-MANUAL` sanitizado).

---

## Modelo de despliegue (decidido — cómo se distribuye el sistema)

**Patrón = BYOC · Control Plane / Data Plane** (el estándar B2B para "el vendor opera, los datos del cliente
no salen de su red"; cómo lo hacen Snowflake/Databricks/Pinecone). Resuelve **IP protegida + soberanía de
datos** con la misma decisión. Diagrama visual: [`despliegue.html`](./despliegue.html). Decidido 2026-06-20
(AskUserQuestion): BYOC · runtime híbrido · data plane configurable.

```
☁️  CONTROL PLANE — nuestra nube (lo operamos)                        ★ IP aquí
   ≪exec env≫ Motor de Discovery/Levantamiento N1 (la "fábrica", como servicio)
   ≪artifact≫ Playbook + metodología N2 (sistema/metodo/ · proceso m1·m2·m3) = el CÓMO
   ≪artifact≫ Distribución N3: releases de LOS DOS binarios · telemetría agregada (NO crudos)
   ⚙ razonamiento server-side = API frontier        🎙 Plano Conversación N4 (voz, hosted)
        ▲ HTTPS (consultor opera)                            ▲ entrevistas (etapa 1)
   ───────────────────────────────────────────────────────────────────────────────────
        ⇵  PULL por TLS — el data plane JALA: SPEC "comidito" · updates · config
           (el cliente NO abre puertos · el control plane NO está en el camino del dato)
   ───────────────────────────────────────────────────────────────────────────────────
🏢  DATA PLANE — red del cliente (on-prem O su nube · CONFIGURABLE)   ★ datos aquí
   ≪exec env≫ Cockpit N13 (binario `directorio`, P1): Vista Negocio · objeto completo (9 ent.)
   ≪exec env≫ DevHub  N5  (binario `cockpit`, P2):    Delivery · watcher+SSE — binarios
              INDEPENDIENTES (I-74/CK-07); N13→N5 = Pull API diseñada CK-08, sin código (BL-18)
   ≪artifact≫ Repo del cliente N6: AS-IS · gaps · specs · código · OKRs (SSoT, NUNCA sale)
   ≪exec env≫ Agentes N7 — API frontier, efímeros, método inyectado (no-construido)
        ↙ git/SSH + HTTPS               ↘ HTTPS (navegador)          ↖ git push "deploy de procesos"
   💻 LAPTOP DEV: DevHub UI + Claude Code N8 (suscripción) → construye N historias
   🖥️ USUARIO NEGOCIO (CEO/sponsor N11): thin, navegador → Vista Negocio / Discovery conversacional
   🧑 CONSULTOR N9: App del Auditor N14 (instalable, método embebido ★IP) → publica a N6 [R17]
```

**Decisiones (2026-06-20, ampliadas hasta CK-14):**
1. **BYOC** — control plane (nuestro, IP, opera) + data plane (cliente, datos, pull-TLS). No estamos en el camino del dato; si nuestra nube cae, el cliente sigue.
2. **Runtime híbrido** — **API frontier** para lo server-side (Discovery/levantamiento/análisis) porque Claude
   Code suscripción **no se puede multiplexar server-side (ToS)**; **Claude Code suscripción** para el dev
   humano que construye en su laptop. *No casados a un solo runtime.*
3. **Data plane configurable** — mismo artefacto se despliega on-prem (su servidor) o en su nube.
4. **Dos binarios independientes en el data plane** (I-74/CK-07, Stage 4 ejecutado) — DevHub (P2) y Cockpit
   (P1) no comparten proceso ni importan código; N13→N5 vía Pull API versionada (diseñada CK-08, BL-18).
5. **App del Auditor = subsistema propio (N14, CK-11/CK-14)** — app instalable del consultor con el método
   embebido; al repo del cliente solo cruza el **resultado** ("deploy de procesos", R17), jamás el método.

**Protección de IP por arquitectura (no por candado):** el motor de Discovery, el playbook y los agentes
*como método* viven en el control plane; al data plane se le **inyecta** el método para correr el levantamiento
(efímero) pero el CÓMO **no persiste** con el cliente. El cliente recibe el **QUÉ** (spec + su mapa + backlog).
Coherente con el negocio **híbrido** (producto Delivery/CEO + acompañamiento Discovery).

**Pendiente (tracking = `proyecto/backlog.yaml`):** contrato del handoff (SPEC "comidito" — con N1, BL-13) · deuda Go/Next (lo que no corre en el binario no cuenta — BL-20 lado Cockpit) · definir N14 (BL-15..17).

---

## Stack tecnológico (decisiones que caen de la arquitectura)
> Resumen. **Detalle por nodo (stack + por qué + descartados) = [`NODOS.md`](./NODOS.md)** campo `stack` (SSoT).

| Capa | Tech | Por qué |
|---|---|---|
| Cockpit backend | **Go** (1 binario, `embed` SPA) · *destino* | "se inserta en la org": dropas 1 binario, cero npm/python en cliente; watcher+SSE+SQLite+dispatch. (Roadmap ya lo pedía → skills `samber/cc-skills-golang`.) |
| Cockpit UI | **React + Tailwind** (frontend-design + Stitch) | ya existe (`devhub/ui`, Next.js 16/React 19/Tailwind 4); se compila y **embebe** en el binario. *Ahora Next.js; destino: SPA estática embebida.* |
| SSoT | **Markdown + YAML/JSON en git** | verdad humana+agente, audit/sync gratis, portable |
| Proyección | **SQLite embebida** | grafo Hilo de Oro, rollups, tiempo real; reconstruible; cero infra |
| Ejecución | **Claude Code local** (suscripción) | costo plano, hace acciones; planos Análisis+Construcción |
| Conversación | **LangGraph + ElevenLabs** (hosted) | entrevistas, bajo volumen, UX especial; único hosted |
| Sync/audit | **git** | multi-máquina + trazabilidad |

---

## Por qué le ganamos a Linear (recordatorio)
Linear = SaaS, plano de control de agentes que **otros** corren; **monitorea/coordina**. Nosotros =
**solución insertada que ejecuta** (los 3 planos), **local-first / costo plano**, con el **proceso de
implementación como IP** y el **producto en manos del cliente**. No es "Jira bonito con agentes": es el
**proceso de desarrollo completo, de idea a producción**, con el CEO viendo toda su empresa y sus gaps.

---

## Pendientes / próximos (la arquitectura, cimentada — CK-14 cerró BL-03)

**Cerrado** (detalle a nivel arquitecto en [`NODOS.md`](./NODOS.md) — 14 nodos):
- Patrón de despliegue = **BYOC** (I-31) · runtime **híbrido** · data plane **configurable**.
- **14 nodos** con responsabilidades R1–R17 — modelo **cerebro/manos**: N1 piensa, N7 ejecuta, N9 opera/valida
  desde su app (N14), N12 deposita el crudo, N13/N5 sirven (binarios independientes).
- **Datos "no persisten, transitan"** (I-32) — cerrada la grieta de inferencia del BYOC.
- **Stage 4 ejecutado + contrato de datos diseñado** (I-74/CK-07/CK-08) — la frontera P1/P2 es física.
- **App del Auditor en el mapa** (N14, CK-11/CK-14) — límites arquitectónicos fijados; producto por definir.

**Abierto — cerrar antes de pasar a diseño de servicio:**
1. **Contrato del handoff Discovery→Delivery = el SPEC "comidito"** — el corte clave: qué cruza control→data
   plane (gaps priorizados → spec ratificado → backlog), el QUÉ sin el CÓMO. Donde la IP se vuelve tangible.
   **Es el último corte de arquitectura** — se resuelve al diseñar N1 (BL-13).

**Abierto — no bloquea el diseño de servicio:** deuda Go/Next (BL-20 lado Cockpit; N5 en su repo) · retención
de N12 · ¿developer del cliente o nuestro? (N10) · diferidos (SQLite/voz/modo conversación). **El tracking del
pendiente de Cockpit = `proyecto/backlog.yaml` (BL-NN)**; la narrativa de ecosistema vive en
[`NODOS.md` → «Pendientes consolidados»](./NODOS.md) — no se re-numera aquí (evita el drift).

> Cerrado el **handoff/SPEC**, la arquitectura queda cimentada → siguiente nivel: **diseño de servicio**
> (volver al blueprint con los límites ya claros), luego los **specs del sistema**.
