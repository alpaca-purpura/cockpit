# El Modelo del OBJETO (la sustancia)

> ⚠ **SUPERSEDED — documento histórico (pre-materialización).** La SSoT del modelo hoy es
> **`.claude/harness/schema/objeto.schema.yaml`** (D-11) + el book **`metodologia/`**. Este archivo quedó como
> borrador previo y **NO refleja el schema vigente** (usa ids viejos `r-*/p-*/s-*`, `audiencia` en vez de
> `sirve_a`, `funciones` ya disueltas, sistema-como-carpeta). Consérvese como historia; **no citar como verdad actual.**

> _(original, histórico)_ Lo que vamos clavando del modelo de datos de instancia. Se actualiza cada vez que cerramos algo.
> Lo `[TBD]` está pendiente en la entrevista.

## Entidades (normalizadas, un-archivo-por-entidad)

```
<empresa-shell>/empresa/
  empresa.yaml          # identidad MÍNIMA (slug, nombre) — el ancla, nada más
  objetivos/o-*.yaml    # un objetivo por archivo  (KR from→to)            [confirmar normalización]
  roles/r-*.yaml        # un rol por archivo + sus funciones (con id)      ← ancla organizacional
  personas/p-*.yaml     # una persona por archivo → llena un rol (ref id)
  sistemas/s-*/         # un sistema por CARPETA (= ArchiMate Application Component):
    s-*.yaml            #   metadata: audiencia, procedencia, ref (+ bloque `producto` opt-in)
    product/…           #   si lleva bloque `producto` (Product) → capabilities/stories (ya normalizados hoy)
  procesos/pr-*.yaml    # un proceso por archivo = "tortuga" ISO 9001 cl.4.4 + actividades INLINE (id estable)
  brechas/b-*.yaml      # una brecha por archivo (§15 Gap)                 [confirmar normalización]
  # SIN entidad "manual": el "cómo" colapsa → desc de cada actividad + criterios del proceso (D-08)
```

**Wiring:** por `id` (FK en la entidad que posee la relación; el reverso lo arma el cockpit al leer; sin
archivos-join). **Descubrimiento:** por scan (sueltas un archivo → aparece). **Sin índice central.**

## Sistema — la forma (D-10 · ArchiMate)

Todo `sistema` = **Application Component** (lente soporte). Si es oferta → + bloque `producto` opt-in (Product).

| campo / eje | valores | qué decide | norma |
|---|---|---|---|
| (base) | — | App Component: lente **soporte** (semáforo digitalización) | ArchiMate App Component |
| `producto` (opt-in) | bloque presente / ausente | aspecto **Product**: roadmap/capabilities/releases | ArchiMate Product |
| `audiencia` | `interno` \| `cliente-final` | a quién sirve (relativo a la empresa dueña) | — |
| `procedencia` | `propio` \| `compartido` \| `externo`(tercero) \| `terciarizado` | ownership | coinage nuestro |
| `digital` (en link proceso→sistema) | `manual` \| `externo` \| `integrado` | nivel de digitalización | — |

Ejemplos: Odoo = App Component / interno · App banco = App Component / cliente-final (procedencia externo) ·
prenter-harness = App Component + `producto` / interno · Vitalia = App Component + `producto` / cliente-final
(+ su billing = App Component soporte / interno).

## Organización — la cadena (D-09 · ver `GLOSARIO.md`)

```
persona  ──cumple──▶  rol  ──realiza──▶  proceso / actividad
```
- `rol` = ancla **estable** (ArchiMate Business Role). 1 rol → N personas. Es el `carril`/`dueño`.
- `persona` = individuo concreto (Business Actor); *cumple* un rol (datos + ref al rol).
- **`función` se disuelve** (D-09): "lo que hace el rol" = sus asignaciones a procesos/actividades (RACI
  **derivado** del wiring). Deberes no-procesales / autoridad → campo `responsabilidades[]`/`autoridad` en `rol`.
  Agrupar por competencia → `capability` (M31), aparte.
- Los **procesos los realiza un `rol`** (carril = rol; BPMN/RACI/ArchiMate/ISO cl.5.3).

## Versionado (tentativo — D-06)
Cada entidad lleva `data_version`. Migraciones por-tipo-de-entidad, no-destructivas (expand-contract).
Mecanismo exacto (bilingüe vs migrate) = por confirmar.

## Puerto (D-04)
El cockpit lee el negocio por un **puerto de repositorio**. Adaptador hoy = archivos normalizados;
mañana = DB. Diseñar los archivos DB-shaped desde ya.

## Proceso — el molde (la "tortuga" + actividades) · D-08

**Encuadre (S2):** modelamos el PRODUCTO (los moldes); el AS-IS lo vierte la **ingesta del SERVICIO** (m1),
no una entrevista. El TO-BE es del cliente, diferido. Fuentes confrontadas: **ISO 9001 cl.4.4** (qué exige) ·
**Turtle/SIPOC** (cómo se captura) · **APQC PCF** (jerarquía L1..L5) · **ISO 19011** (qué revisa el auditor:
doc vs realidad → confianza) · y lo nuestro (M11 BPMN · M12 APQC · M16 ISO · M09 VSM · M25 RACI · M29 mining · M23).

**Normalización (DB-de-archivos):** `proceso` = **entidad fuerte** (archivo, nodo del Hilo de Oro).
`actividad` = **entidad débil** (existence-dependent) → **lista embebida e id-estable** dentro del proceso
(`pr-cobranza#a3`), NO archivo suelto. Promoción a archivo propio **solo** si la actividad gana identidad
(se comparte entre procesos, o se vuelve blanco de automatización = gap/historia). Regla 3NF: depende solo
del proceso → embeber; referenciada aparte → extraer. (Mismo patrón que nuestras `tareas` inline hoy.)

### `proceso/pr-*.yaml` — el header (tortuga + SIPOC + ISO 4.4)
| campo | de dónde |
|---|---|
| `id` · `nombre` | — |
| `clasificacion` (nº APQC) | M12 — cobertura/taxonomía |
| `dueño` → ref `rol` | ISO 5.3 · RACI (M25) Accountable · pata "con quién" (D-09) |
| `proposito` | ISO 4.4 |
| `entradas[]` (+proveedor) · `salidas[]` (+cliente) | ISO 4.4 · SIPOC (bordes) |
| `sistemas[]` → ref sistema | pata "con qué" |
| `criterios_control` | ISO 4.4 |
| `metricas[]` (KPI → ref objetivo/brecha) | ISO 4.4 · VSM (M09) |
| `riesgos[]` | ISO 4.4 |
| `confianza` + `derivado_de` | M23 · ISO 19011 (declarado vs real) — *excede la norma* |
| `actividades[]` | INLINE — BPMN (M11) · APQC L4 |

### `actividades[]` — flujo BPMN-lite (embebido, id estable)
`{ id · orden · carril(ref `rol`) · tipo: humana|sistema|decision|espera · titulo · desc(="el cómo") · sistema(ref) · entrada/salida }`

## Manual — RESUELTO (Pregunta 2 · D-08)
**NO es entidad.** La tortuga lo zanja: "cómo/métodos" es una **pata** del proceso, no otro animal; APQC no
tiene nivel "manual". → colapsa en el `desc` de cada actividad (cómo paso-a-paso) + `criterios_control` a
nivel proceso. Cero caja nueva. El "Manual de Procedimientos.pdf" del cliente = **fuente de la ingesta**
(provenance), no entidad. (Se evapora el choque de nombre con `digital: manual`.)
