# Núcleo del arnés (harness@prenter-marketplace) — NO EDITAR

Los archivos de reglas de esta carpeta **sin sufijo de proyecto** son copia **byte-idéntica**
del CORE del arnés `harness@prenter-marketplace` **KIT_VERSION=0.5.3** (canal estable).

- **Fuente:** `~/.claude/plugins/.../harness/0.5.3/rules/*.md`
- **Por qué copiados y no symlink:** el manifest always-on del plugin está vacío (scaffold),
  así que `.claude/rules/` es el ÚNICO canal always-on. La caché del plugin es versionada/volátil
  → copia commiteada = repo portable + reproducible.
- **Regla de oro:** NUNCA se editan a mano. Se re-generan corriendo `/harness:bootstrap`
  (o `cp` desde el plugin) tras un `claude plugin update`. Migraciones entre versiones: CHANGELOG del kit.
- **Extensiones de Cockpit** (project-layer, SÍ se editan): `arquitectura-as-code.md`,
  `metodologia-as-code.md`, `cockpit-stack.md`. Éstas SUPERSEDEN / extienden el core donde se declara.

Adopción: ficha **CK-19** (LEDGER.md).
