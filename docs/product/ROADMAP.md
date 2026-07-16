# ROADMAP — hacia el Organization Twin vendible

> **Vista humana curada (CK-22, 2026-07-16).** SSoT = `releases/*.yaml` + `story.yaml` de cada
> historia — esta vista se actualiza en el MISMO evento que su fuente (disciplina CK-11). Estados
> y prioridades los firma el operador. Norte: VISION.md §Organization as Code → Organization Twin
> (CK-21) · TO-BE completo: `proyecto/research/organization-as-code/07-capability-list-tobe.md`.

## El mapa en una línea

**F0 done** (fundación standalone) → **F1 en-curso** (Terreno + MVP Twin vendible, 16 historias en
4 fases + carril de negocio) → **F2** (Comercial: Portal + deuda técnica + conectores) → **F3**
(Edge completo + escala) → horizontes gateados (simulación · multitenant).

## F1 · Terreno + MVP Twin vendible — el camino crítico

```
F1.0 TERRENO            F1.1 MÉTODO OPERABLE        F1.2 ORGANIZACIÓN VIVA           F1.3 EL TWIN MIDE
─────────────            ────────────────────        ──────────────────────           ─────────────────
arquitectura-refichado → schema-v2 ─┬─→ metodo-como-arnes-v0 → operar-metodo
        (LA PRIMERA)                │         ↑ poblar-metodo-m1-m3
                                    │         · deposito-fuentes (liviano)
                                    │
                                    ├─→ forgejo ─┬─→ hosteado-single-tenant
                                    │            ├─→ gestion-cambios-iso ←─ publicacion-deploy-procesos
                                    │            └─→ auth-niveles
                                    │
                                    └─→ construir-lakehouse → cruce-indicadores → brecha-proyecto
                                                                (hilo de oro)      (el diferenciador)
PARALELO (negocio): comprador-pricing-exito-12-meses
```

| Fase | Historia | Nodo | Prio | Por qué aquí |
|---|---|---|---|---|
| **F1.0** | `sistema/arquitectura-refichado-ck21` | transversal | alta | **Primera del roadmap (operador, CK-22):** el terreno — bajar CK-21 fino a NODOS/despliegue/arquitectura.yaml antes de anclar lo funcional |
| F1.0 | `sistema/schema-v2-hilo-de-oro-kinetica` | transversal | alta | OKR/KPI/Proyecto + capa kinética — TODO lo funcional consume este schema |
| F1.0 | `sistema/negocio-schema-ssot-plugin-vs-repo` | transversal | media | Reconciliación de SSoT del schema (BL-06) — cierra junto al v2 |
| **F1.1** | `sistema/poblar-metodo-m1-m3` | N2 | alta | El contenido del método ES el insumo de los arneses (hoy parcial: m1/b1 + m3/e0) |
| F1.1 | `consultio/metodo-como-arnes-v0` | N14 | alta | La apuesta principal (CK-21/D7): arneses sobre Claude Code pelado, sin app shell |
| F1.1 | `consultio/operar-metodo-construir-mapa-completo` | N14 | alta | El engagement completo operado con el v0 (dep re-apuntada: ya NO espera al clon DevStudio) |
| F1.1 | `repositorio-oficial/deposito-fuentes-retencion-dpa` | N12 | media | v0 liviano (carpeta cifrada + política de retención/destrucción) — lo exige el primer engagement |
| **F1.2** | `repositorio-oficial/forgejo-self-hosted-bd-vs-archivos` | N6 | alta | La instancia git (idéntica hosteada o self-hosted) con entornos dev→UAT→prod |
| F1.2 | `cockpit/hosteado-single-tenant` | N13 | alta | El default comercial CK-21/D3 (incluye DPA + reescritura fina chequeo 2) |
| F1.2 | `cockpit/modulo-gestion-cambios-iso` | N13 | alta | Subió al MVP (CK-21/D8): es el gate UAT→prod que evita mapas basura |
| F1.2 | `consultio/publicacion-repo-oficial-deploy-procesos` | N14 | alta | El "deploy de procesos" (dep re-apuntada a metodo-v0 + forgejo) |
| F1.2 | `cockpit/auth-niveles-acceso-policy-as-data` | N13 | alta | Gate multi-usuario; policy-as-data derivada de N6 |
| **F1.3** | `lakehouse/construir-lakehouse-dlt-ducklake` | N16 | alta | v0: Excel primera clase + 1 conector real del primer cliente |
| F1.3 | `cockpit/cruce-estructura-operacion-indicadores` | N13 | alta | **El hilo de oro medido** — absorbe el delta CK-21 (KPI→OKR→objetivo, semáforo, drill-down) |
| F1.3 | `cockpit/brecha-proyecto-ciclo-vida` | N13 | alta | **El diferenciador:** brechas con costo/ROI → proyecto → KPI movido, dentro de Cockpit |
| F1.x | `sistema/comprador-pricing-exito-12-meses` | transversal | alta | Carril de negocio paralelo — sin pricing no hay venta del MVP |

**Exit F1:** demo del loop completo contra organización real (dogfood prenter o cliente 1) — ver
`releases/F1-terreno-mvp-twin.yaml::exit_criteria`.

## F2 · Comercial — negocio repetible

`distribucion-telemetria-licencias-n3` (canal técnico) → `portal-cloud-licencias` (el producto de
entrada, dep del canal) · `deuda-go-next-n13-vite-spa` + `design-system-atomic-storybook` (**pagar
la deuda de UI ANTES de crecer más superficie** — deuda aceptada conscientemente en F1, precedente
CK-12) · `rol-area-real` · `negocio-yaml-proyeccion-generada` (gatillo BL-19: objeto poblado con
objetivos/brechas — ocurre en F1 con el cliente real) · `conectores-ingesta-por-sistema` (catálogo
por arquetipo).

## F3 · Edge completo + escala

`construir-consultio-clon-devstudio` (el shell — el v0 ya operó en F1; prio baja a media) ·
`colab-studio-app-trabajador` · `arnesia-pipeline-arnes-por-rol` (en F1/F2 los arneses se fabrican
a mano en Arnesia) · `mcp-server-twin` · `crowdsourcing-frescura` · `knowledge-database-files-first`
(D5, por demanda) · `capability-preparacion-auditoria` (CK-10, por demanda) ·
`borrar-carpetas-campaign-originales` (housekeeping).

## Horizontes gateados (post-F3, nunca antes de demanda)

Simulación del TO-BE (what-if por branch → BPSim/DEMO → agentes LLM corriendo los arneses,
CK-21/D9) · multitenant real (>10-20 clientes, CK-21/D3).

## Decisiones de secuencia tomadas en CK-22 (revisables por el operador)

1. **Deuda de UI se acepta en F1, se paga arrancando F2** — el MVP gana velocidad construyendo
   hilo de oro + brecha→proyecto sobre el stack Next existente; la migración Vite + design system
   se hace ANTES de crecer más superficie en F2. (Alternativa descartada: migrar primero =
   semanas sin valor de cliente.)
2. **`construir-consultio-clon-devstudio` baja de alta a media y se va a F3** — el v0 de arneses
   (F1.1) es el camino crítico; el shell es experiencia, no capacidad.
3. **`portal-cloud-licencias` y `distribucion-telemetria-licencias-n3` NO se fusionan** — son dos
   capas del mismo nodo N3 (producto vs canal técnico); el portal depende del canal. Ambas F2.
4. **`cruce-estructura-operacion-indicadores` absorbe el "motor de indicadores"** (CK-21) — el
   delta KPI→OKR→objetivo se pliega en su refinamiento, no como historia espejo (anti-duplicación).
5. **`deposito-fuentes-retencion-dpa` se queda en F1 como v0 liviano** — carpeta + política, sin
   infra; lo demanda el primer engagement real.
