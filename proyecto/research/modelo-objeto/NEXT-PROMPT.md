# ▶ Punto de entrada — próxima sesión

> ⚠ **CONGELADO — campaña cerrada, PRE-CK-18.** El schema vive hoy en
> `../../../sistema/schema/objeto.schema.yaml` (ya NO `.claude/harness/schema/`). No leer como sesión
> activa; SSoT = `../../../sistema/schema/` + `../../../sistema/arquitectura/NODOS.md`.

> Arranca leyendo ESTE archivo. Luego, según necesites: `DECISIONES.md` (D-01..D-16) · `MODELO.md` · `GLOSARIO.md`.
> Contrato: `.claude/harness/schema/objeto.schema.yaml` (en el repo prenter-harness). **NO recargues el repo entero.**
> ⚠ Este folder vive en `~/Documentos/campaign-modelo-objeto/` (se movió de `~/Proyectos/` el 2026-06-30).

## Dónde estamos
- **Macropaso:** **M4 · Dogfood EN CURSO** — poblar el objeto de **Prenter** con data real para probar el modelo v1.
- **Modelo:** M1 clavado + materializado v1 = **9 entidades** (`empresa·persona·rol·area·proceso·sistema·objetivo·capability·brecha`). Schema en `.claude/harness/schema/objeto.schema.yaml`.
- **Registro CTO→CEO** (detallado, conceptual, analogía+ejemplo). **UN concern a la vez** — marketing FUERA del objeto.
- **Clavadas relevantes:** D-13 (negocio.yaml=generado), **D-14** (objeto autocontenido, sin `cuenta_ref`; guardrails), **D-15** (topología), **D-16** (método de llenado).

## Topología CLAVADA (D-15) — LEER, es donde casi nos desviamos 3 veces
- **prenter-harness = un SISTEMA**, NO la empresa. **prenter (sibling) = la EMPRESA** → dueña del objeto de negocio.
- **Objeto de negocio de Prenter** → `prenter/empresa/<tipo>/<id>.yaml` (layout **PLANO**, no `data/`).
- **Data del sistema** (`sistema: prenter-harness` + `producto{}`) → repo prenter-harness; ref por **slug** (I-39).
- **Objeto = autocontenido** (D-14): SIN `cuenta_ref`. Control-plane (registry) y **marketing** NUNCA entran al objeto.
- **negocio.yaml = GENERADO** (D-13): cuando el objeto esté poblado, se **regenera** de las entidades = la prueba del dogfood.

## Ejecutado esta sesión (repo prenter, git, reversible)
- Deprecados (`git mv`): `prenter/empresa/{empresa.yaml,negocio.yaml}` → `prenter/empresa/_deprecated/` (+ DEPRECATED.md). `CLAUDE.md`+`decisiones.md` intactos.
- **Escrito:** `prenter/empresa/empresa.yaml` NUEVO — raíz delgada (`id: prenter`, Lima, razon_social "Prenter", tax_id PENDIENTE, fuente repo/conf alta).
- `prenter/empresa/objetivos/` creado y **VACÍO** (los 4 placeholder de hipótesis se borraron — los objetivos se crean con el operador).

## Método de llenado CLAVADO (D-16) — así trabajamos
1. **El operador VUELCA todo** lo que sabe de Prenter en texto plano largo (crudo, desordenado, de una).
2. **Claude CARTOGRAFÍA** ese volcado a las 9 entidades (NO inventa, NO deriva del repo — estructura lo dado). Provenance = `Declarado`.
3. **El operador CORRIGE.** Iteramos; los huecos se preguntan.
- **Objetivos = se crean JUNTOS** (verdad de negocio), no se heredan hipótesis. Fuente = SOLO el volcado + `empresa.yaml`. `_deprecated/negocio.yaml` = referencia, no autoritativo. **Marketing fuera.**

## PRÓXIMO PASO (retomar aquí)
**El operador va a pegar el volcado de Prenter (texto plano).** Al recibirlo: mapearlo a las 9 entidades en `prenter/empresa/<tipo>/`, en orden de dependencia (`areas→roles→personas→sistemas→capabilities→procesos→objetivos→brechas`), mostrar el dibujo, iterar. **Cierre del dogfood = regenerar `negocio.yaml` de las entidades** (prueba del flip D-13). Estado: `empresa` ✅ · faltan 8 tipos.

## Cola de fondo (no frena)
D-06 versionado · D-07 holding · reconciliar `meta.aplica_a` del schema (dice `data/<tipo>/`; usamos plano `<tipo>/`) · M6 visión macro→micro · graduar `GLOSARIO.md` a repo-root.

## Al cerrar la sesión
1. `DECISIONES.md` + `MODELO.md` con lo clavado. 2. Revisa `INDICE.md`. 3. Checkpoint `checkpoints/cp-NN-*.md`. 4. Reescribe "PRÓXIMO PASO" aquí.
