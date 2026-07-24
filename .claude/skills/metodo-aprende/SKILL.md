---
name: metodo-aprende
description: Protocolo de ingesta/aprendizaje del cerebro metodológico — agregar teoría nueva (p.ej. Teoría de la Coordinación, Redes de Petri), extender una card, reemplazarla (superseded) o descartarla, SIN contradicciones. Usar cuando el operador trae un texto/teoría/framework, pide "agregar X al método" o replantear dogma, o cuando detectás conocimiento faltante en methodologies.yaml/proceso/nichos. El cerebro no acumula: integra.
---

# /metodo-aprende — cómo aprende el cerebro (sin contradecirse)

Regla cardinal: **conocimiento nuevo NUNCA se agrega suelto** — se integra al grafo declarando su
relación con lo que ya existe (`combina_con`), su lugar (familia + objeto + twin) y, si desplaza
algo, el desplazamiento explícito (`estado: superseded` + `superseded_by` + `razon_estado`).
Una card reemplazada **no se borra**: queda como memoria con puntero al sucesor (el gate valida todo).

## Paso 0 — Scan de prior-art (obligatorio, ANTES de escribir)

```bash
# ¿ya existe / se solapa? — barrer nombre, autor y conceptos clave (ES + EN):
grep -in "<concepto1>\|<concepto2>\|<autor>" sistema/metodo/methodologies.yaml
grep -rin "<concepto1>" sistema/metodo/proceso/ sistema/metodo/nichos/ sistema/schema/objeto.schema.yaml
```
Leer `GRAFO.md` §1 (familia candidata) + §5 (objeto candidato) → identificar las 3-6 cards vecinas
y cargarlas completas (receta del skill `metodo`). Sin este scan = riesgo de card espejo.

## Paso 1 — Clasificar (árbol de decisión)

```
¿El catálogo ya cubre ≥80% del aporte?
├─ SÍ, misma tesis → NO se agrega. Enriquecer la card existente (que/aporte_unico/combina_con).
├─ SÍ, pero la teoría nueva EXPLICA/FORMALIZA mejor → EXTEND: card nueva + combina_con bidireccional
│    con la vecina ("X formaliza lo que Y hace operativo"). Ambas vigentes.
├─ NO, y CONTRADICE una card vigente → decisión de dogma:
│    ├─ la nueva gana → card nueva + la vieja pasa a estado: superseded + superseded_by + razon_estado;
│    │    re-cablear aristas entrantes (el gate WARNea cada arista vigente→superseded que quede).
│    └─ la vieja gana → la nueva entra como estado: descartada + razon_estado (memoria de por qué NO).
└─ NO, y es hueco real → card nueva (M<next>), familia/objeto/twin declarados.
```

## Paso 2 — Barrido de contradicciones (checklist)

Para cada card tocada, verificar contra sus vecinas (las de `combina_con` + mismas dimensiones twin):
- [ ] `cuando_si` de una no cae dentro del `cuando_no` de otra vigente sin arbitraje explícito
      (si ambas aplican al mismo caso, el `como` de la arista dice cuál manda y cuándo).
- [ ] Aristas `combina_con` actualizadas en **ambos** sentidos donde la relación es real
      (asimetrías son legales pero el generador las reporta — revisar el INFO).
- [ ] GRAFO §2: si la card superseded estaba citada por pasos/nichos → actualizar esos `metodologia:`/
      `combina_con` (el gate WARNea los que queden).
- [ ] `grep -n "met:.*M<NN>" sistema/schema/objeto.schema.yaml` — si el schema la cita, evaluar el `met:`.
- [ ] Dogma tocado (familia nueva, principio nuevo, dimensión twin nueva, matar una card `columna`,
      cambio de regla cardinal) → **ficha CK-NN en LEDGER.md + firma del operador ANTES de commitear**.
      Cambios mecánicos (card nueva bien integrada) no requieren ficha (memoria: ledger ligero).

## Paso 3 — Escribir (solo YAML, nunca los generados)

- Card nueva: siguiente `M<NN>` libre, schema completo (12 required + twin). `fuente.url` real del
  texto/obra aportada. Si viene de un texto del operador: `fuente.obra` = el texto, y el destilado
  va en `que`/`aporte_unico` (telegráfico); si el know-how operativo es largo, va a un paso de
  `proceso/**` o una narrativa — la card es la ficha, no el manual.
- Provenance no negociable: nicho sin `derivado_de`/`confianza` o card sin `fuente` = el gate lo rechaza.

## Paso 4 — Validar y regenerar (el gate ES el examen)

```bash
python3 sistema/metodo/gen_metodo.py            # regenera METODOLOGIA §4 + NOTACIONES + GRAFO
python3 sistema/metodo/gen_metodo.py --check    # anti-drift en sync
```
- 0 `ERR` obligatorio · cada `WARN` de coherencia (arista→superseded, paso citando reemplazada) se
  resuelve o se justifica en el commit body · el INFO de asimetrías se revisa (¿falta la recíproca?).
- Releer `GRAFO.md` §1-§2 y confirmar: la card nueva aparece, sus aristas también, nada quedó huérfano.

### Si el aprendizaje toca `sistema/schema/**` (audit 2026-07-24 — 4º gate schema-v2)

- **Gate adicional obligatorio:** `python3 sistema/schema/gen_schema.py` (valida `objeto.schema.yaml`
  v2 + `verbos.yaml` + `triage.yaml`; pre-commit lo corre como 4º gate — el skill nació antes de él).
- **Decisión del schema → ficha D-NN en `sistema/schema/DECISIONES.md`** (no LEDGER: CK-NN es solo
  dogma del método/producto; el log del contrato del objeto es DECISIONES.md).
- **Paridad schema↔Go:** `cd go && go test ./...` — `TestParidadSchema` lee el MISMO YAML; tocar
  enums/transiciones sin correrlo = rotura silenciosa.

## Paso 5 — Commit

Pathspec exacto (`methodologies.yaml` + generados que el hook re-agrega + lo tocado), mensaje
`feat(metodo): aprende <teoría> — <new|extend|supersede M<NN>>` con el porqué en el body.

## Ejemplo precableado — Teoría de la Coordinación + Redes de Petri (pendiente: texto del operador)

Dry-run del Paso 0 EJECUTADO (2026-07-22): `grep -in "coordinaci|petri"` → 1 hit real: **M33
DEMO/Enterprise Ontology (Dietz)** — "actor → coordinación → producción", rol twin
`horizonte[simulacion]`, gateado D9, `combina_con` M07 (Event Storming) y M34 (BPSim). Ergo NO es
terreno virgen: Coordination Theory (Malone/Crowston — dependencias entre actividades y mecanismos
de coordinación) y Redes de Petri (semántica formal de flujo — base matemática de BPMN M11 y de
BPSim M34) aterrizan como vecinas/extensiones del clúster M33-M34, y tocan `simulacion` = horizonte
gateado D9 → si el texto del operador apunta a activarlas YA, es decisión de dogma (ficha CK).
Alternativa no-dogma: entrar como cards `horizonte` bien cableadas (⇄M33, M11, M34, M25) sin activar
nada del MVP. Clasificación final espera el texto — correr el protocolo completo al recibirlo.
