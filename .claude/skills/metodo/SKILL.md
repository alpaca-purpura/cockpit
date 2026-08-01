---
name: metodo
description: Cerebro metodológico de Cockpit — consulta inteligente del método del PRODUCTO (M-cards, proceso m1/m2/m3, nichos, backbone O1-O7/T1-T3, twin). Usar SIEMPRE que la tarea toque el método: refinar/diseñar historias de producto, indicadores/KPI/OKR, procesos/roles/brechas/triage, poblar pasos del proceso, construir arneses, citar o elegir una metodología (tokens M\d+), o conocimiento por vertical (inmobiliario/retail/manufactura). Carga dirigida vía GRAFO.md + grep — jamás cargar el catálogo entero.
---

# /metodo — consultar el cerebro sin sobrecargar contexto

El método del producto es un grafo: **45 M-cards** (eje transversal) × **pasos** de `proceso/**`
(operacionalización) × **unidades de nicho** (eje vertical) × **backbone** O1-O7/T1-T3 (ancla al
objeto de negocio). El mapa completo, GENERADO y siempre en sync (gate pre-commit), es
`sistema/metodo/GRAFO.md` (~160 líneas). Todo acceso empieza ahí.

## Protocolo (3 saltos, presupuesto ~2-4k tokens total)

1. **Mapa** — `Read sistema/metodo/GRAFO.md` (una vez por conversación; si ya está en contexto, no re-leer).
2. **Ruteo** — elegí los nodos por la línea `usar:` + objeto + rol twin. Regla: **≤6 cards** por tarea.
   Si "necesitás" más, la tarea está mal recortada — volvé al mapa.
   **Primer filtro = el NIVEL (GRAFO §6 · CK-33):** ¿la pregunta es de Directorio, Estratégico,
   Táctico u Operativo? Filtrá por ese piso ANTES de mirar objeto/twin — corta el catálogo a ~1/4
   y evita el error clásico de contestar una pregunta de directorio con una herramienta de piso
   (o al revés). El `ancla` del piso es la respuesta primaria; `también se usa` es el vecindario.
3. **Carga dirigida** — solo los nodos elegidos:
   - Card (~24 líneas): `grep -n "^M37:" sistema/metodo/methodologies.yaml` → `Read offset=<línea> limit=26`
   - Paso: id→ruta directa: `m1.b1.p4` → `Read sistema/metodo/proceso/m1/b1/p4.md`
   - Unidad de nicho: `grep -n "^N-IMM-02:" sistema/metodo/nichos/inmobiliario.yaml` → `Read offset limit=14`
   - Dónde se usa una card: **GRAFO §2** (grafo inverso, ya resuelto).
   - `met:` del schema (qué metodología respalda un campo/entidad):
     `grep -n "met: .*M30" sistema/schema/objeto.schema.yaml`

## Ruteo por tipo de tarea (atajos)

| Tarea toca… | Entrada al grafo |
|---|---|
| **Sesión/agenda de directorio, plata, riesgo, acuerdos** | **GRAFO §6 nivel 1** (ancla): M52, M55, M56, M57, M58, M59, M22, M54, M30, M41 |
| **Bajar la estrategia a áreas/gerencias** | **GRAFO §6 nivel 2** (ancla) + la arista de cascada: M21, M26, M31, M47, M48 |
| **Gestionar procesos/proyectos de mejora del día a día** | **GRAFO §6 nivel 3** (ancla): M12, M16, M25, M28, M42, M43, M51 |
| **Actividades, tareas, automatización, arneses** | **GRAFO §6 nivel 4** (ancla): M23, M35, M36, M37, M38, M44, M46 |
| Objetivos/OKR/KPI/estrategia | GRAFO §5 → O2 (+ twin `estrategia`): M06, M15, M21, M26, M30 |
| Procesos/flujo/AS-IS | O3 + twin `procesos-flujo`/`procesos-clasificacion`: M07, M09, M11, M12 |
| Roles/autoridad/personas | O4: M25 (RACI), M40 (frontera persona, CK-24) |
| Brechas/madurez/ROI | O6 + twin `madurez-brecha`: M15, M31 |
| Triage automatización/arneses | familia I completa (GRAFO §1-I): M35-M45 |
| Provenance/anti-alucinación | T1: M23 · invariantes de `nichos/nicho.schema.yaml` |
| Vertical del cliente | GRAFO §4 → `nichos/<vertical>.yaml` |
| Escribir/poblar un paso del proceso | paso vecino poblado como plantilla (§3) + sus `met:` + `PROCESS-AS-DATA.md` |

## Prohibido (anti-patterns)

- ❌ `Read` completo de `methodologies.yaml` (1.100 líneas) o `METODOLOGIA.md` (640) — el mapa existe para no hacerlo.
- ❌ Citar un token `M\d+` sin verificar contra GRAFO §1 que existe y está `vigente` (⛔/🗑 = no citar; usar su sucesor).
- ❌ Responder sobre el método "de memoria" del modelo — el catálogo local SIEMPRE manda (tiene decisiones propias: Bloom descartada, ALM descriptivo, etc.).
- ❌ Inventar rangos/benchmarks de nicho — si la unidad dice `conf:baja/hipotesis`, se declara así.

## Escritura

Este skill es de LECTURA. Para agregar/extender/reemplazar conocimiento → skill **`metodo-aprende`**
(protocolo anti-contradicción). Editar `GRAFO.md`/`METODOLOGIA.md §4`/`NOTACIONES.html` a mano = prohibido (generados).
