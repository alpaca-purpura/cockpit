# Arquitectura-as-code — SSoT del mapa + gate anti-drift (project-layer · SUPERSEDE paradigm-arquitectura)

> **project-layer · SÍ se edita.** **Extensión #1** del arnés para Cockpit (CK-19). El CORE trae
> `paradigm-arquitectura.md` (modelo 3-planos Sistema/Acción/Trabajadores + zonas/cajas Valeria/Lisa,
> específico del producto de origen). **Para Cockpit ese archivo queda SUPERSEDIDO por esta regla:** la
> arquitectura de Cockpit es **otra** y vive **as-code** (SSoT versionado → vista generada → gate),
> disciplina que el CORE no tiene. **Origen:** CK-11/CK-14/CK-15/CK-17/CK-18 · re-cableado CK-19.

## Regla cardinal

La arquitectura de Cockpit es **datos, no prosa**: dos SSoT hand-authored + dos vistas GENERADAS + un
**gate anti-drift** en cada commit. Nadie edita a mano un generado; nadie describe la arquitectura fuera
de la SSoT.

| Rol | Archivo | Autoría |
|---|---|---|
| **SSoT · nodos del ecosistema** | `sistema/arquitectura/NODOS.md` (16 nodos N-NN, 3 planos) | a mano |
| **SSoT · celda Cockpit (componentes)** | `sistema/arquitectura/arquitectura.yaml` (20 componentes + relaciones) | a mano |
| Vista · drawer de despliegue | `sistema/arquitectura/nodos.data.js` | **GENERADO** (NO editar) |
| Vista · celda de componentes | `sistema/arquitectura/arquitectura.html` | **GENERADO** (NO editar) |
| Diagrama de despliegue curado | `sistema/arquitectura/despliegue.html` | a mano (VALIDADO) |
| Generador + gate | `sistema/arquitectura/gen_arquitectura.py` | — |

## Los 3 planos de Cockpit (NO los del CORE)

`Fabricante` (nuestro: N15 Arnesia · N2 Repo Maestro · N3 distribución/licencias) · `Organización`
(cliente: N6 Repo Oficial · N13 Cockpit · N16 Lakehouse · N12 Depósito · N18 sistemas op.) · `Edge`
(apps sobre Claude Code local: N14 Consultio · N17 Colab · N5 DevStudio · N8 runtime · actores N9/N19/N10/N11).
Muertos CK-18: N1/N4/N7 (registrados en el changelog de NODOS.md, no re-vividos).

## "§ Dónde vive" de una historia → ancla a un NODO (reemplaza zona/caja)

Donde el CORE (`spec-mapa-funcional.md`, `01-spec-template.md`) pide zona/caja del árbol Valeria/Lisa, en
Cockpit la historia declara **`node: N-NN`** (el nodo de `NODOS.md` que construye/toca) desde `idea`. El
`module` del backlog == la columna == su nodo primario (ver `domain_modules` en el seam). Sin `node` válido
una historia no pasa de `idea`. Un componente nuevo entra a `arquitectura.yaml` con su `fichas:` (por qué
existe — si no, el gate lo rechaza, I-73) y su `ruta:` (que debe existir en disco).

## El gate (CK-17 · pre-commit)

`.githooks/pre-commit` corre `gen_arquitectura.py`: valida (biyección índice↔ficha en NODOS.md · refs R# ·
enums/refs/rutas de `arquitectura.yaml` · madurez de `despliegue.html`) y regenera `nodos.data.js` +
`arquitectura.html`; falla → **bloquea el commit**. Manual: `python3 sistema/arquitectura/gen_arquitectura.py`
(regenera) · `--check` (solo valida, para CI/gate). Activación por clone: `git config core.hooksPath .githooks`.

## Anti-patterns

- ❌ Editar `nodos.data.js` o `arquitectura.html` a mano (son generados — editá la SSoT y regenerá).
- ❌ Describir la arquitectura en prosa nueva fuera de `NODOS.md`/`arquitectura.yaml` (drift invisible).
- ❌ Un componente en `arquitectura.yaml` sin `fichas:` (por qué) o con `ruta:` inexistente.
- ❌ Aplicar el modelo zonas/cajas del CORE (Valeria/Lisa) — en Cockpit se ancla a `N-NN`.
- ❌ Re-vivir N1/N4/N7 sin una ficha CK-NN que lo decida.

## Referencias

- `sistema/arquitectura/README.md` · `ARCHITECTURE.md` (vision CTO) · `NODOS.md` (SSoT).
- `.claude/rules/paradigm-arquitectura.md` — CORE, **supersedido acá** (se conserva para integridad de refs del CORE).
- `[[metodologia-as-code]]` (el eje gemelo) · `[[cockpit-stack]]`.
