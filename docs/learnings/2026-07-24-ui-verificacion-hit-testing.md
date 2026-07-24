---
date: 2026-07-24
slug: ui-verificacion-hit-testing
applied: applied            # ya cableado en verify.sh del prototipo twin-territorio
promotable: sí              # candidato a regla project-layer (test-design-doctrine § UI)
origen: mockup twin-territorio v5.0 — el operador reportó "click en cualquier área y no entra"
---

# Verificación de UI = hit-testing, no dispatch

## El caso

La capa de pins del mockup (`.layer.pins`, div transparente full-cover, z-index sobre los nodos)
se tragaba **todos** los clicks reales del mouse desde el shell v2 (4 días). Ninguna verificación lo
detectó: todas usaban `element.click()` o `dispatchEvent` directo sobre el elemento — que **saltan el
hit-testing** del navegador. El primer click humano honesto (el operador) lo encontró en segundos.

## La regla

1. **`element.click()` es un MOCK del mouse.** Verificar interacción = preguntar primero
   `document.elementFromPoint(x,y)` — qué elemento recibe REALMENTE el puntero en ese punto — y
   fallar si algo intercepta. (Es la misma doctrina seam-testing de HB-94: colaborador real, no mock;
   aquí el colaborador es el pipeline de hit-testing.)
2. **Todo overlay full-cover nace con `pointer-events:none`** + `> * { pointer-events:auto }` para
   sus hijos. Un div transparente intercepta clicks aunque no pinte nada.
3. En headless con `--virtual-time-budget`, esperar ≥1.2s antes del primer hit-test (carrera con el
   primer layout: `elementFromPoint` devuelve null pre-paint).
4. La inyección CDP (extensiones/devtools) sobre iframes cross-origin cae con offset de escala — para
   verificar un artifact embebido: instrumentar la página con logger on-screen de eventos, o clickear
   por posición visible en screenshot fresco y confirmar el EFECTO.

## Aplicación

- `docs/product/prototypes/twin-territorio-2026-07-20/verify.sh` — suite hit-tested reutilizable.
- Al construir la UI real de N13: los tests de componente/E2E deben usar interacción con hit-testing
  (Playwright real clicks, no `.click()` de JSDOM) — cablear en `test_construction_plan` del architect.
