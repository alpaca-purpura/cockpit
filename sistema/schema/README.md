# schema/ — esquemas de datos del dominio

Zona SISTEMA de la tríada (CK-11): el **contrato de forma** del objeto de negocio normalizado — qué
entidades existen, con qué campos e invariantes. Cambiar algo aquí = decisión de sistema.

| Archivo | Qué es |
|---|---|
| [`objeto.schema.yaml`](./objeto.schema.yaml) | El contrato: **9 entidades** (empresa · persona · rol · área · proceso · sistema · objetivo · capability · brecha) con campos, refs cruzadas del Hilo de Oro, enums e invariantes (RACI A==1, key_results ≥ 1, sin ciclos). SSoT declarado; lo lee/valida `/api/objeto` (CAP-08). Lleva la disciplina `met:` inline (norma/marco por campo). |
| [`ejemplo-vertice.yaml`](./ejemplo-vertice.yaml) | **Fixture de validación END-TO-END** del contrato: instancia ficticia (Inmobiliaria Vértice / Mateo Salas — NO el cliente real). Muestra el Hilo de Oro completo objetivo→KR→proceso→rol/persona→sistema→capability→brecha. Ilustrativo (todo junto; en producción = un-archivo-por-entidad, D-15). |
| [`metodologia/`](./metodologia/) | El **porqué** de cada casilla del schema: 5 docs temáticos (entidades, objetivos, procesos, brechas, glosario) que anclan cada campo a norma/marco. Es el marco de respaldo de la disciplina anti-invención (`met:`). |
| [`DECISIONES.md`](./DECISIONES.md) | **ADR del modelo**: el log D-01..D-16 detrás del contrato — cada campo `met:` del schema cita estos códigos inline. Decisiones PRE-CK-18 que produjeron el schema (con addendum donde CK-18 superseded, ver D-14). |

Procedencia: los cuatro salieron de la campaña `modelo-objeto` — el contrato se promovió en CK-11; el
fixture, `metodologia/` y `DECISIONES.md` al cerrar **BL-07**. La campaña se destiló y se borró: esto
ES el hogar del modelo, ya no hay carpeta heredada.

Deuda abierta: convergencia `objeto.schema` ↔ `negocio.schema` implementado (BL-02 cerrado; el último
tramo — volar `negocio.yaml` a proyección generada — es BL-19).
