# Campaña · Modelo del OBJETO + Norte de Producto

> Carpeta-plan **efímera** (hermana del repo `prenter-harness`, fuera del gate). Coordina un trabajo
> **multi-sesión**. El **contenido** que produzca esta campaña es **producto** y *gradúa* hacia
> `prenter-harness` cuando construyamos. Esto es el andamio; el edificio es el producto.

## El norte (por qué existe esta campaña)

Hacer que **el sistema sea coherente con lo que mide**: separar de forma confiable la **CLASE**
(el contenido de los harnesses — la maquinaria agnóstica que se instala) del **OBJETO** (la estructura
de archivos YML — los datos de una instancia concreta). De forma que, al entrar al **cockpit-multi**, el
operador vea **qué ha avanzado en su producto** (capabilities en el mapa del producto) y pueda **crear
historias de usuario** para seguir creciéndolo.

Caso piloto = **dogfood**: `prenter-harness` se vuelve el **Proyecto #0** del cockpit — una instancia de
su propio kit. La flota de pruebas = el portafolio propio del operador (prenter, perusaas, vitalia,
nicolify, comunify), que usa el sistema mientras se construye.

## Los 3 movimientos (end-state)

1. **Modelar el objeto** (la entrevista, en curso) — clavar el modelo de datos de instancia.
2. **Primera versión** (build) — materializar: esquemas L0, cerca in-repo, prenter-harness = Proyecto #0.
3. **Visión estratégica macro→micro** — telescopio + microscopio: norte → cadenas de valor → capabilities → stories.

## Rol de cada archivo

| Archivo | Qué es | Cuándo se toca |
|---|---|---|
| `README.md` | Este norte + cómo retomar | Rara vez |
| `INDICE.md` | Macropasos con estado; **se revisa cada sesión** (¿sigue siendo necesario?) | Cada sesión |
| `DECISIONES.md` | Decisiones mapeadas (pre-ledger; gradúan a fichas I-NN) | Al cerrar cada decisión |
| `MODELO.md` | La sustancia: el modelo de datos que vamos clavando | Cada vez que clavamos algo |
| `NEXT-PROMPT.md` | **Punto de entrada de la próxima sesión** | Al cerrar cada sesión |
| `checkpoints/` | Snapshot por sesión (no recargar todo el contexto) | Al cerrar cada sesión |

## Cómo retomar (próxima sesión)

1. Lee **`NEXT-PROMPT.md`** (te dice dónde estamos y la próxima pregunta).
2. Ojea `INDICE.md` + `DECISIONES.md` + `MODELO.md`. **No** recargues el repo entero.
3. Continúa la entrevista desde la pregunta marcada.

## Disciplina

- Entrevista **una pregunta a la vez**. El operador puede decir de más; eso se **banca**, no se descarta.
- Registro CTO→CEO (detallado, conceptual, con analogías + ejemplo).
- **Nada de código** hasta cerrar el modelo. Primero clavar, después construir.
