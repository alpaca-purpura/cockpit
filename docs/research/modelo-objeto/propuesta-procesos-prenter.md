# Propuesta formal — Arquitectura de procesos de Prenter

> **Estado:** BORRADOR para validación (no escrito aún al objeto). Cuando lo apruebes, se materializa en
> `prenter/empresa/procesos/pr-*.yaml` (tortugas ISO 9001 cl.4.4).
> **Origen:** síntesis de 3 investigaciones con subagentes (servicios/delivery B2B · SDLC de producto ·
> ops/APQC) — fuentes al final.

## Base metodológica
Enfoque a procesos **ISO 9001 cl.4.4** · taxonomía **APQC PCF** · patrones de agencia B2B (dual-track,
fractional-CTO) · continuous discovery + **Spec-Driven Development** · ops **automation-first**.
**Filosofía:** el agente *prepara*, el humano *aprueba* en los puntos de **dinero, marca y ley**.

**Convención:** ⭐ = núcleo (arranca aquí) · resto = adopción incremental. `Auto` = potencial de
automatización (agentes / Nicolify / Odoo). Columna **Validación** para que marques: `ok` · `quitar` ·
`mover a <área>` · `fundir con <proceso>` · nota.

---

## 1 · Gobierno (dueño: Director General) — envuelve todo

| Proceso | Disparador | Sistemas | APQC | Auto | Validación |
|---|---|---|---|---|---|
| Estrategia, objetivos y planeación (OKR) | ciclo trimestral / revisión KPIs | Framework SDLC, git | 1.0 | Medio | |
| ⭐ Calidad y mejora continua (SGC ISO 9001) | cierre de proyecto / auditoría / queja | **Cockpit**, KPIs | 13.3 | Medio | |

> *El Cockpit ES tu tablero del SGC — proceso meta: el producto que vendes monitorea tu propia calidad.*

## 2 · Comercial & Marketing (dueño: Líder Comercial) — motor **Nicolify**

| Proceso | Disparador | Sistemas | APQC | Auto | Validación |
|---|---|---|---|---|---|
| Marketing y generación de demanda | calendario / nueva fuente de lead | Nicolify, web, LinkedIn | 3.3 | **Alto** | |
| ⭐ Captación, calificación, agendamiento y nurture (CRM) | nuevo lead entra | **Nicolify** | 3.5.1 + 6.0 | **Alto** | |
| ⭐ Venta consultiva, propuesta y scoping | cita agendada | Nicolify, Claude Code | 3.5.1 | Medio | |
| ⭐ Contratación (SOW + firma) | propuesta aceptada | Odoo, e-firma | 3.5.3 | Medio | |
| Gestión de cuenta y upsell | QBR / señal de expansión | Nicolify, Odoo | 3.5.2 | Medio | |

## 3 · Producto (dueño: Owner de Producto) — motor **Framework SDLC** (cadena interna, paralela)

| Proceso | Disparador | Sistemas | APQC | Auto | Validación |
|---|---|---|---|---|---|
| Gestión de producto: visión, roadmap y objetivos | ciclo / señal de mercado | Framework SDLC, git | 2.1 | Medio | |
| Discovery continuo de producto | cadencia / nueva hipótesis | entrevistas, CRM | 2.2.1 | **Alto** | |
| ⭐ Especificación (spec authoring — SDD) | oportunidad → spec | repo, Claude Code | 2.2.4 | **Alto** | |
| Analítica de producto y adopción *(futuro)* | feature en prod | analytics | 2.1 | **Alto** | |

## 4 · Delivery / Desarrollo (dueño: Líder de Delivery · ejecuta: Desarrollador) — **GitHub · Claude Code · Framework SDLC**

*Motor de ingeniería compartido: construye software de cliente **y** tu propia IP.*

| Proceso | Disparador | Sistemas | APQC | Auto | Realiza capability | Validación |
|---|---|---|---|---|---|---|
| ⭐ Discovery y requerimientos (kick-off) | contrato firmado | Claude Code, GitHub | 5.3.1 | Alto | `consultoria-sdd` | |
| ⭐ Construcción de software (SDLC agéntico) | spec aprobada | GitHub, Claude Code, gate | 2.3 / 5.3 | **Alto** | `desarrollo-agentico` · `fabrica-software` · `langraph` | |
| Implementación y personalización Odoo | contrato Odoo | Odoo, GitHub | 5.3 | Medio | `implementacion-odoo` | |
| ⭐ QA / aseguramiento de calidad | cada commit / pre-release | CI, gate anti-drift | 2.3.1 / 5.4 | **Alto** | — | |
| Release / despliegue | PR verde en trunk | CI/CD, feature flags | 2.3.3 | **Alto** | — | |

## 5 · Servicio / Proyectos (dueño: Líder de Servicio)

*Aquí ramifican tus **dos modalidades** — mismo trunk, distinto mecanismo de control:*

| Proceso | Disparador | Control | APQC | Auto | Validación |
|---|---|---|---|---|---|
| ⭐ Entrega llave-en-mano (fixed-bid) | requerimientos congelados | baseline + control de cambios + **aceptación por hitos** | 5.3 | Medio | |
| ⭐ Entrega CTO/Área-TI-as-a-Service (retainer) | retainer activo | **cadencia** (sprint/OKR mensual), sin gate de aceptación | 5.2 / 5.3 | Medio | |
| ⭐ Handover y aceptación | hito/entregable completo | acta + runbook + transferencia de accesos | 5.4 | Alto | |
| Adopción y éxito del cliente | go-live | señales de uso, QBR | 6.2 | Medio | |
| Soporte y mantenimiento (SLA) | ticket / incidente | triage + MTTR/SLA | 6.0 / 8.0 | **Alto** | |

## 6 · Administración & Finanzas (dueño: Responsable A&F = **chris-corp compartido**) — **Odoo**

| Proceso | Disparador | Sistemas | APQC | Auto | Validación |
|---|---|---|---|---|---|
| ⭐ Facturación y cobranza | hito cumplido / ciclo mensual | **Odoo** | 9.2 | **Alto** | |
| Contabilidad y conciliación | movimiento bancario / cierre | Odoo | 9.3 | **Alto** | |
| Cuentas por pagar, gastos y caja | factura proveedor / corte | Odoo | 9.6 / 9.7 | Medio | |

## 7 · Habilitantes (dueño: Director General) — Tier 2, adopción incremental

| Proceso | APQC | Nota | Validación |
|---|---|---|---|
| Personas y gobierno de agentes | 7.0 / 11.0 | trata a tus agentes IA como fuerza laboral gobernada | |
| TI y gestión del conocimiento | 8.0 / 13.4 | | |
| Legal y contratos | 12.4 | *candidato a fundirse con Contratación* | |
| Riesgo, cumplimiento y datos | 11.0 | | |
| Compras y proveedores | 4.2 | | |

---

## Cómo interactúan (el flujo ISO 4.4)

```
COMERCIAL ─────────────▶ SERVICIO ⇄ DELIVERY ─────────▶ ADMIN
demanda→CRM→venta→        entrega(fixed│retainer)         facturación
contratación             ↑ discovery→construcción→QA      →cobranza→
                         →release→handover→adopción→sop.   contabilidad

PRODUCTO (paralelo, interno):  gestión→discovery→spec→[construcción]→analítica
GOBIERNO (envuelve): estrategia/OKR + calidad ── el Cockpit lo monitorea
```

Un hito de **Servicio** dispara la **Facturación** de Admin — la "secuencia e interacción de procesos" que
exige ISO 4.4, y el contrato que un agente necesita para operar sin drift.

## El Hilo de Oro (tus 5 capabilities se realizan)

`desarrollo-agentico` · `fabrica-software` · `langraph` → **Construcción** · `implementacion-odoo` →
**Implementación Odoo** · `consultoria-sdd` → **Discovery/requerimientos** (+ el Framework SDLC).

## Orden de automatización (empieza angosto, mide ROI, expande)

1. **Nicolify → Captación/calificación/nurture** (repetitivo, medible, bajo riesgo)
2. **Odoo → Facturación/cobranza** (flujo de caja)
3. **Delivery → Construcción + QA** (SDLC agéntico — ya lo haces)
4. luego soporte, discovery, contabilidad. Estrategia/legal/riesgo al final (juicio humano).

---

## Preguntas de validación (respóndelas o anota en las tablas)

1. **¿El mapa te representa?** ¿Sobra/falta algún proceso? ¿Reasignar de área?
2. **Granularidad:** ¿fundir candidatos? (Legal→Contratación · Marketing+Captación · las 3 de Admin en "Gestión financiera").
3. **Alcance de escritura:** ¿escribo **solo los 12 ⭐ núcleo** como tortugas completas primero, o los ~24 en stub?

*Total: ~24 procesos (12 ⭐ núcleo + resto incremental).*

---

## Fuentes (provenance de la propuesta)

**Marco / taxonomía**
- APQC — Introduction to the PCF · Understanding the PCF Elements · "Giving Services their Proper Place (5.0)" · "Where does PCF fit: Software as a Service?"
- ISO 9001 Clause 4.4 (ISMS.online · Core Business Solutions)

**Servicios / delivery B2B**
- Lead qualification (Highspot · Smartlead BANT/MEDDIC) · Scoping (Consulting Quest · Paolo Tagliaferri)
- Fractional-CTO engagement (Irfan.build · Martin Sandhu · Solidmatics · TheFractionalCTO)
- SOW & contratos (ProjectManager · STX Next fixed-price vs T&M) · Milestone billing (BQE)
- Handover (UX Collective) · Customer Success (Planhat · Onramp) · SLA/incidentes (TOPdesk · ManageEngine)
- Account mgmt / upsell (DemandFarm · Salesmotion · Miller Heiman LAMP)

**SDLC de producto (lean + agentic)**
- Continuous discovery (Teresa Torres / Product Talk · Product School) · Opportunity Solution Trees
- Spec-Driven Development (Towards Data Science · DataCamp · Claude Code sub-agents docs)
- SDLC best practices (Waydev · Leanware) · Feature flags (DesignRevision) · Release mgmt (Octopus) · Trunk-based (DeployHQ)
- Solo-founder ops (Velprove outage playbook · SaaSify support tools) · Métricas (ProductPlan pyramid · UserGuiding North Star)

**Ops / automatización con agentes**
- AI agents for small business (Paxrel · Intuit QuickBooks · 75way) · Accounting/billing agents (AIMultiple · Flexpoint)
- APQC finance automation benchmarks

*Nota de confianza (de los research): los números L1 (1.0–13.0) y varios L2 están verificados contra APQC;
los IDs L3 numéricos exactos (5 dígitos) conviene confirmarlos contra el Excel oficial del PCF v8.0 antes de
sellarlos en el schema.*
