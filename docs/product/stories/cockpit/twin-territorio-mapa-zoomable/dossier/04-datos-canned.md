# 04 · Los datos canned — Terranova completa y su casuística deliberada

> Parte del dossier. `const DATA` en `index.html` (~L581-1115). NADA es relleno: cada dataset
> existe para demostrar una capacidad del twin y cada anomalía es una casuística que el producto
> DEBE saber mostrar. Al construir la app real, esta casuística se traslada al golden fixture
> (historia `organizacion-ficticia-golden-fixture`, CK-23) — no se pierde.

## Datasets

| Dataset | Cardinalidad | Forma / claves |
|---|---|---|
| `empresa` | 1 | Desarrolladora Terranova S.A.C. — vivienda media Lima |
| `objetivos` | 7 | `{id,nm,persp BSC,kr{m,from,to,cur,u},salud}` + `bscEdges` ×7 (causalidad) |
| `areas` | 14 | `{id,nm,lider,parent,madurez,conf}` + `matrixEdges` (dotted-line al CFO) |
| `procesos` | 17 | `{id,nm,areas[],dueno,digital,sist[],sirve[],conf,flags}` |
| `brechas` | 8 | `{id,nm,sub,tipo,against,obj,costo,sev,prio,estado}` |
| `kpis` | 12 | `{id,nm,unidad,proc,dueno,obj,peso,banda{target,rojo},freq,conf,fuente,mediciones[]}` |
| `proyectos` | 3 | pm-mar (DO) · pm-cob (PLAN) · pm-cie (CERRADO con `resultado`) |
| `personasExtra` | 86 (+14 líderes = 100) | `{nm,rol,area,vinculo}` |
| `sistemas` | 11 | `{id,nm,digital,conector,caps[]}` — cada uno declara su conector a N16 |
| `capabilities` | 4 | M31 + madurez COBIT |
| `arneses` | 4 (de `puestosTotal: 40`) | `{id,rol,v,estado,compilado,skills[],uso,acts[],mueve[]}` |
| `conocimiento` | 7 procesos | `{n,d}` — teaser F3 (`conocimiento/<proceso>/<rol>/` en N6) |
| `ideas` | 4 | M44, autoría RN-16 |
| `cadena` + `pasosMini` | 8 misionales + 17 | orden Porter + verbos macro (fractal Arnesia) |
| `sipoc` + `sipocC1` | 17 + 17 | bordes derivados + `{prop,fin,apqc}` — "se DERIVA, jamás se edita" |
| `lienzos` | 11 plenos (+6 stub) | acts `{ord,lane,verbo,ttl,tipo,toque,espera,sist,triage\|mandato,rtlx?,conf,fte,raci?,note}` |
| `z3` | 14 instrucciones (`'pid:ord'`) | `{ins[],out,tareas[{v,t}],m36{7 inputs + rpa,agente},nota?}` |

Lienzos plenos: flagship **p-cob** (7 acts, 3 carriles, 2 flujos alternos "mora dura"/"sin
respuesta ×3") + p-vta, p-camp, p-dis, p-ejec, p-val, p-fact, p-post, p-cierre, p-pago, **p-perm**
(9 acts, espera ~85d — el P03 del SOMA vivo). Stub honesto: p-rec, p-nom, p-caja, p-conc, p-sop,
p-liq. Instrucciones z3: p-cob:1..7 · p-vta:1..5 · p-perm:6 · p-perm:7.

## La casuística deliberada (el catálogo de "cosas que el twin debe saber decir")

### Hilo de oro / KPIs
- **k-nps / p-post `star`** — "NPS 42→31 · ningún KR la mide" = brecha `sin-ancla-de-valor`
  (la joya del diagnóstico: dolor real INVISIBLE para el directorio).
- **k-vis `stale`** — frescura vencida ⌛, fuente "Declarado (caseta)" (conf degradada, jamás
  verde mentiroso).
- **k-caj `mediciones:[]`** — GRIS: la ausencia NUNCA pinta rojo.
- **k-obs** — "NO se mide por municipio (hallazgo)" (el hueco de medición como dato).
- **k-cie 9→4.5** — la serie mejorando = el loop CERRADO visible (pm-cie).
- **6 procesos huérfanos** (`sirve:[]`) — no suben a ningún objetivo.
- **o-caja verde** con DSO ya en 58 — no todo es rojo; el pulso distingue.

### Organización / frontera persona
- **a-tes vacante** — "jefatura Tesorería vacante" + conf baja + brecha g-tes; p-conc dueño
  "(vacante)". Vacante DELATADA por scan, jamás inventada.
- **8 operarios `subcontratado`** — vínculo visible (BPO/ISO 8.4).
- **Tania Beltrán (Jefe de Permisos)** — el bus-factor-1 encarnado (g-dep).
- Ideas con proponente nombrado (Julio Paredes, Carmen Rojas, Milton Cruz) — autoría reconocida
  (RN-16), jamás medición individual (CK-24).

### Brechas (8, una por tipo de historia)
g-avc `apuesta` (LA Apuesta WSJF ①) · g-post `sin-ancla-de-valor` (obj null) · g-tes (rol
vacante) · g-cvis `a-corroborar` + conf baja · g-mca `off-thread` (atenuada en el funil) ·
**g-dep** (bus-factor-1 en Permisos) · **g-doc** (cero procedimiento escrito) · g-mar ALTA.

### Triage / trabajo (CK-29)
- **p-cob:3 "contactar"** — agente 72 > RPA 34, RTLX 71 → candidata a skill → idea `i-agente`
  (`origen:'triage'`) — la cadena triage→funil ENTERA en un caso.
- **p-cob:7** — RPA 0, "ECRS: ELIMINABLE — M35 antes que M36" (hoja que nadie consulta).
- **p-cob:4 / p-vta:2** — humano-por-diseño (scores <25; negociar/aprobar).
- **p-cob act 5** — "verbo corregido por el consultor — el ingest propuso 'transportar' —
  auditado" (provenance anti-gaming RN-13, y origen de SC-11).
- **h-jefcob v1 `desactualizado` + drift** — SC-11+SC-12 pendientes → SC-14 recompilar (anti-drift
  twin→arnés). **h-cont v2** — "RECOMPILADO al cerrar pm-cie" (la mejora llegó al puesto).
- **4/40 puestos con arnés** — el gap agéntico como número de portada.
- p-caja y p-perm con **0 guías** de conocimiento (la brecha de conocimiento ↔ g-doc/g-dep).

### Sistemas / pulso
Nubecont (dlt diaria 06:00 · 14 tablas) · CRM (horaria) · **Excel caja "SIN conector"** · Banca
"CSV manual · candidato" · Meta "candidato (CPL)" · **Portal municipal "SIN conector — a mano por
distrito"** · Estudio legal "proceso provisto externamente (ISO 8.4)".

### Mejora / corrida
- pm-cie CERRADO: `resultado{delta_observado, veredicto:'movió', nota "checklist M16 → arnés"}`.
- Corrida demo: Tesorería Δ editado · +1 actividad "portal de pagos" en p-cob · impactos DSO
  91→75 · payback 5m · ROI 1.8× · gate a Cambios.
- SC-10..SC-14: los 3 niveles de aprobación (directa+acuse / revisión-dueño / comité) con SC-14 =
  recompilación de arnés por drift.

## Regla al portar

Cada fila de esta casuística responde a una pregunta de demo ("¿y si el KPI no se mide?", "¿y si
el rol está vacante?", "¿y si nadie escribió el procedimiento?"). Al construir el twin real sobre
el golden fixture: **verificar que cada caso siga teniendo un ejemplar** — perder la casuística =
perder el guion de venta.
