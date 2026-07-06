# Fase 3 — Instrumentar los sistemas reales

**Meta:** que los sistemas dejen de ser placeholders y tengan cockpit real.
- **chris-corp/Odoo:** desarrollable + navegable — instalar starter `odoo-v19` (los "harnesses para productos Odoo") + instrumentación cockpit (`docs/product` seed) en el path del sistema Odoo. Entrar con `claude` a la carpeta y construir addons desde el cockpit.
- **prenter:** su cockpit muestra **la evolución de alpaca-harness** — registrar alpaca-harness como SISTEMA de prenter; resolver cómo un workspace "ve" un repo externo (board/roadmap de alpaca-harness).
- **perusaas:** instrumentar su `product/` como sistema navegable.

> Borrador — depende del diseño de Fase 2. Planificar fino al arrancar.

## Decisiones / preguntas
- ¿El starter `odoo-v19` se instala dentro de `chris-corp/finanzas/odoo` o el Odoo es su propio sub-repo? (revisar `products/starters/odoo-v19` y `products/installer/new-project.sh --starter odoo-v19`).
- prenter↔alpaca-harness: ¿el `cockpit.path` de un sistema puede ser un repo externo? ¿el registry mapea sistema→ruta de repo? (probablemente el registry de portfolio gana un nivel: empresa→sistemas[]→{path, navegable}). Esto puede requerir tocar `/api/portfolio` y `resolveBrand` para multi-sistema real.
- Coherencia: chris-corp/Odoo como dev-project (navegable) vs el nodo Odoo consumido por vitalia (overview de Fase 2) — mismo sistema, dos vistas.

## Criterios de salida
- [ ] chris-corp/Odoo navegable + developable desde el cockpit (entrar con claude, ver su board).
- [ ] prenter muestra la evolución de alpaca-harness.
- [ ] perusaas con su sistema instrumentado.
- [ ] gates/tests verdes; smoke. Journal + State + NEXT-PROMPT (Fase 4).
