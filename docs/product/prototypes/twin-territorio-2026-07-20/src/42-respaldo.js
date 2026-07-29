/* ===== v14.3 · capa RESPALDO DEL MÉTODO — cada panel cita la metodología que lo sostiene =====
   Espejo del `met:` que ya llevan el schema (222 campos) y los pasos del proceso: el panel declara
   sus fuentes igual que todo lo demás. SSoT real = sistema/metodo/methodologies.yaml (59 cartas).
   En superficie: nombre común de la fuente (cero jerga). El código M-NN = procedencia, SOLO en la ficha. */
const RESPALDO={
  'dir-varas':{ cita:'apetito · ambición', t:'Las varas del directorio', items:[
    {f:'Apetito de riesgo por categoría (ISO 31000 / COSO)', uso:'la gobernanza fija cuánto riesgo se acepta por categoría (liquidez · reputación · expansión); cada apuesta se contrasta contra esa vara — "excede" no es una opinión. Sin definir se MUESTRA sin definir, jamás se inventa.', m:'M52'},
    {f:'Portafolio de ambición (70/20/10)', uso:'todo esfuerzo se clasifica por novedad en tres bolsas — operar el hoy · expandir · apostar al futuro. La mezcla real se deriva al leer y se contrasta con la mezcla objetivo que este directorio firma; la mezcla ES el apetito hecho asignación. El ratio no es dogma: se ajusta por industria.', m:'M54'},
    {f:'Shape Up — el apetito de la apuesta', uso:'cuánto estamos dispuestos a gastar se fija ANTES de apostar: tiempo fijo, alcance variable, con "hasta aquí no" explícitos.', m:'M04'} ],
    gap:'Apetito por categoría ya es esquema real (D-23 · config_estrategia); la mezcla objetivo aún no tiene ficha de dato. La activación plena del marco de riesgo es horizonte gateado por demanda. El campo ambición también es esquema real (D-22).' },
  'dir-pulso':{ cita:'OKR · Hoshin', t:'¿Avanzan las apuestas?', items:[
    {f:'OKR — objetivos con meta del trimestre', uso:'una apuesta avanza solo si sus objetivos del ciclo se mueven hacia la meta; el punto de color resume el peor de ellos.', m:'M21'},
    {f:'Hoshin Kanri — despliegue de la estrategia', uso:'pocas apuestas del directorio bajan en cascada: plan a 3 años → año → trimestre.', m:'M26'},
    {f:'GPD (Falconi) — gestión por directrices', uso:'en modo anual o mixto el despliegue baja por niveles y ciertas metas pagan bono ★.', m:'M41'} ]},
  'dir-alertas':{ cita:'GPD · pares', t:'Alertas que escalaron', items:[
    {f:'GPD (Falconi) — tratamiento de anomalías', uso:'al directorio solo sube lo que quedó fuera de banda sin contramedida — la excepción, jamás el detalle.', m:'M41'},
    {f:'ISO 9001 — seguimiento y medición', uso:'qué es "fuera" lo decide la banda definida de cada indicador, no una opinión.', m:'M16'},
    {f:'Pares del sector (benchmark APQC · Hackett)', uso:'¿mi número es malo… comparado con quién? — el chip de pares dimensiona la alerta contra el rango externo, con fuente, segmento y vigencia (pasa el cursor).', m:'M48'},
    {f:'Procedencia del dato', uso:'sin fuente seria el rango de pares no se afirma — alerta sin benchmark serio va sin chip, jamás con uno inventado.', m:'M23'} ]},
  'dir-apuestas':{ cita:'Shape Up · FinOps', t:'Las apuestas', items:[
    {f:'Shape Up — apostar, no planear en exceso', uso:'pocas apuestas selladas, con riesgo y apetito explícitos: la ficha declara cuánto se apuesta (tiempo fijo · tope de gasto — "Apostamos"). Sellar es un acto con firma (paso 5 · etapa 0 del método).', m:'M04'},
    {f:'FinOps — valor cuantificado', uso:'cada apuesta declara el valor que persigue en dinero, no en adjetivos — la línea "persigue S/…" de la tarjeta, con el supuesto visible en la ficha.', m:'M22'} ]},
  'dir-rumbo':{ cita:'plan de 3 años', t:'El rumbo', items:[
    {f:'Hoshin Kanri — despliegue de la estrategia', uso:'visión a 3-5 años → breakthroughs del año → metas del trimestre: una sola cascada, 3 renglones. Cada meta baja con acuerdo ida-y-vuelta — la negociación pendiente vive como decisión en la bandeja, no aquí (management-by-exception: el header no carga detalle de gestión).', m:'M26'},
    {f:'Balanced Scorecard — perspectivas', uso:'chequeo de completitud silencioso: las 4 perspectivas se derivan de los objetivos vigentes cada vez que se lee. Si alguna queda sin meta, la brecha sube como alerta — no se re-narra aquí (una sola vez, un solo lugar). Es una lista de control, no un marco a implantar.', m:'M30'},
    {f:'GPD (Falconi)', uso:'en modo anual o mixto, el despliegue del año manda y ciertas metas pagan bono ★.', m:'M41'} ],
    gap:'El campo "acuerdo de bajada" (ida-y-vuelta por nivel) aún no existe en el esquema — la acción de cerrarlo ya vive en la bandeja del directorio, pero sigue siendo dato simulado (la apuesta y el apetito ya son D-23; este campo espera su ficha).' },
  'dir-madurez':{ cita:'escalera 1–5', t:'¿El sistema aguanta?', items:[
    {f:'Madurez del sistema de gestión (ISO 9004)', uso:'autoevaluación 1-5 por dimensión (liderazgo · estrategia · recursos · procesos · mejora): dónde estás vs dónde quieres estar. El nivel se DERIVA de evidencia con su confianza — jamás se declara a mano.', m:'M47'},
    {f:'COBIT — arbitraje de escaleras', uso:'el mapa por nodo se pinta con la escalera de gobierno/TI; esta gradúa el sistema de gestión completo (finanzas y personas incluidas) — dos varas, cada una en su cancha.', m:'M15'},
    {f:'Frontera persona ↔ twin', uso:'la madurez de "personas" se agrega por rol y área — jamás evaluación de una persona nombrada.', m:'M40'} ]},
  /* — v18: los panels de gobierno del directorio (resultado · caja · presupuesto · riesgos ·
       acuerdos · inversiones). Donde el catálogo AÚN no tiene carta, se declara en `gap` — el
       panel cita lo que puede y confiesa lo que le falta, jamás inventa una fuente. */
  'dir-resultado':{ cita:'revisión por la dirección · valor', t:'El resultado del periodo', items:[
    {f:'ISO 9001 — revisión por la dirección (§9.3)', uso:'la sesión arranca por el desempeño del periodo contra lo planificado: es una entrada obligatoria de la revisión, no un anexo.', m:'M16'},
    {f:'FinOps — valor cuantificado', uso:'las cifras se leen en dinero y contra una referencia (plan y año anterior); una cifra sin referencia no gobierna nada.', m:'M22'},
    {f:'Procedencia del dato', uso:'toda cifra declara su fuente, su confianza y su ESTADO DE CIERRE (preliminar · cerrado · auditado). Un número preliminar se muestra preliminar — jamás se pinta como cerrado.', m:'M23'},
    {f:'Reporte financiero como fuente — el marco contable', uso:'el marco que la empresa DECLARA fija qué significan sus cifras y su ciclo de cierre; Cockpit las LEE y las baja al proceso que las produce. No arma los estados financieros, no corre el cierre, no emite opinión: enlaza y cita.', m:'M55'} ],
    gap:'La carta ya existe (ingesta 2026-07-29). Lo que falta es la CONEXIÓN: hoy las cifras son dato canned del mockup; en la app entran por lectura del sistema contable con su estado de cierre (entidad `periodo`, ficha D-26).' },
  'dir-caja':{ cita:'liquidez · valor', t:'La caja', items:[
    {f:'FinOps — valor cuantificado', uso:'la caja es el único número que no admite adjetivos: saldo, proyección, líneas disponibles y deuda, en dinero.', m:'M22'},
    {f:'Procedencia del dato', uso:'la proyección declara quién la firma; acá NADIE la firma (jefatura vacante) y por eso su confianza es baja — la ausencia se muestra, no se maquilla.', m:'M23'},
    {f:'Liquidez — proyección de caja y límites del financiamiento', uso:'solvencia no es lo mismo que resultado: una empresa con margen puede quedarse sin caja, y se ve semanas antes mirando hacia adelante. El piso lo firma la gobernanza; romper un límite del banco puede obligar a pagar la deuda por adelantado.', m:'M56'} ],
    gap:'La carta ya existe (ingesta 2026-07-29) y la entidad también (ficha D-27). Falta el conector real al banco y al sistema contable: hoy la serie es dato canned.' },
  'dir-presupuesto':{ cita:'bolsas · valor', t:'El presupuesto y las facultades', items:[
    {f:'Portafolio de ambición (70/20/10)', uso:'la mezcla deja de ser un porcentaje abstracto: cada bolsa lleva plata asignada y plata comprometida. La mezcla ES el apetito hecho asignación — acá se ve en dinero.', m:'M54'},
    {f:'FinOps — valor cuantificado', uso:'lo comprometido contra lo asignado, por bolsa: se ve dónde se está gastando el futuro que se prometió comprar.', m:'M22'},
    {f:'Matriz de responsabilidades (RACI) — autoridad', uso:'los umbrales de facultades declaran qué monto obliga a que decida el directorio y qué queda en la gerencia.', m:'M25'},
    {f:'Presupuesto y control presupuestario', uso:'la mezcla en porcentaje es una intención; con plata asignada y comprometida por bolsa es una decisión con firma y con saldo. El futuro se compra cuando el dinero se compromete.', m:'M57'} ],
    gap:'Carta y entidades ya existen (fichas D-28 presupuesto · D-25 facultades en config_gobierno). Falta que el compromiso se descuente de verdad al sellar una apuesta o aprobar un proyecto — hoy los importes son canned.' },
  'dir-riesgos':{ cita:'ISO 31000', t:'Los riesgos', items:[
    {f:'Apetito de riesgo por categoría (ISO 31000 / COSO)', uso:'el apetito ya era la vara; el registro es la contraparte que faltaba: cada riesgo se contrasta contra el apetito de SU categoría — "por encima del apetito" es una derivación, no una opinión.', m:'M52'},
    {f:'ISO 9001 — riesgos y oportunidades (§6.1)', uso:'el riesgo vive pegado al proceso, la brecha o el área que lo produce: se navega al twin, no a un anexo suelto.', m:'M16'},
    {f:'Procedencia del dato', uso:'cada riesgo declara de dónde sale su evidencia y con qué confianza.', m:'M23'} ],
    gap:'La carta de apetito ya incorpora el REGISTRO (ingesta 2026-07-29) y la entidad `riesgo` existe (ficha D-24). Tensión abierta: el rol declarado de la carta sigue siendo "horizonte" (fuera del MVP) mientras el nivel 1 ya lo muestra como superficie de primera clase — la promoción espera firma del operador.' },
  'dir-acuerdos':{ cita:'ISO 9001 §9.3 · RACI', t:'Los acuerdos de la sesión anterior', items:[
    {f:'ISO 9001 — revisión por la dirección (§9.3)', uso:'el seguimiento de lo acordado en la revisión anterior es entrada obligatoria de la siguiente: es el punto que abre toda sesión.', m:'M16'},
    {f:'Matriz de responsabilidades (RACI)', uso:'un acuerdo sin responsable y sin plazo no es un acuerdo: es una conversación.', m:'M25'},
    {f:'ISO 9001 — registros', uso:'la sesión cierra generando el acta, y el acta queda versionada como cualquier otro dato del twin.', m:'M16'},
    {f:'Gobierno de la sesión — acuerdos, acta y facultades', uso:'la sesión es una entidad con entradas y salidas; el acuerdo lleva responsable y plazo; el acta se genera de lo decidido. Y el umbral por monto es lo que hace que la bandeja de decisiones no se vacíe nunca.', m:'M58'} ],
    gap:'Carta y entidades ya existen (`sesion` + `acuerdo`, ficha D-25). Lo que el twin NO hace ni hará: reemplazar la formalidad societaria de cada país (firmas, legalización, registro) — genera el acta de gestión y su traza.' },
  'dir-inversiones':{ cita:'portafolio · valor', t:'Las inversiones en curso', items:[
    {f:'P3M3 — madurez de portafolio, programas y proyectos', uso:'la inversión grande se gobierna como portafolio: avance, gasto contra presupuesto y compromiso, en una sola fila comparable entre inversiones.', m:'M50'},
    {f:'FinOps — valor cuantificado', uso:'las tres varas van en dinero (gasto · comprometido · margen proyectado contra plan), no en semáforos de sensación.', m:'M22'},
    {f:'Procedencia del dato', uso:'el avance DECLARADO y el avance REAL se muestran por separado: la diferencia entre ambos es exactamente lo que hace que lo construido quede mal valorizado en el libro.', m:'M23'},
    {f:'Valor ganado — el portafolio de inversiones', uso:'comparar el gasto contra el avance FÍSICO (no contra el calendario) muestra el sobrecosto antes de que llegue al resultado. La inversión de capital no es un proyecto de mejora: cierra con un activo entregado y su margen, no con un indicador movido.', m:'M59'} ],
    gap:'Carta y entidad ya existen (ficha D-29). En el MVP se guardan las cinco varas comparables, no los índices completos de valor ganado; cliente sin inversiones grandes: la banda no se dibuja.' },
  'bandeja':{ cita:'ISO 9001', t:'Espera tu decisión', items:[
    {f:'ISO 9001 — gestión de cambios', uso:'toda decisión que cambia la organización pasa por su aprobación y queda registrada en el historial.', m:'M16'},
    {f:'Matriz de responsabilidades (RACI) — autoridad', uso:'quién firma cada decisión está declarado por nivel: nada espera a la persona equivocada.', m:'M25'} ]},
  'dir-cambio30':{ cita:'ISO 9001 §9.3', t:'Qué cambió desde la última sesión', items:[
    {f:'ISO 9001 — revisión por la dirección (§9.3)', uso:'la sesión compara contra la anterior: qué se degradó, qué cerró con veredicto, qué espera firma.', m:'M16'} ]},
  'dir-portafolio':{ cita:'PDCA · costo de esperar', t:'Proyectos en curso', items:[
    {f:'Ciclo PDCA (ISO 9001 — mejora)', uso:'cada proyecto declara su fase y cierra con el cambio observado en el indicador, no con un acta.', m:'M16'},
    {f:'WSJF — costo de esperar', uso:'el orden del portafolio sale de cuánto cuesta NO hacer cada cosa por mes — el "esperar: S/…" de cada fila, heredado de la brecha que ataca; cerrado va al final.', m:'M28'},
    {f:'FinOps — valor cuantificado', uso:'el retorno esperado acompaña a cada proyecto; el real se escribe al cierre.', m:'M22'} ]},
  'sala-pulso':{ cita:'OKR', t:'Pulso del directorio', items:[
    {f:'OKR — objetivos con meta del trimestre', uso:'verde = la meta avanza dentro de su banda.', m:'M21'},
    {f:'Impact Mapping — trazar del objetivo al trabajo', uso:'tocar un objetivo enciende su cadena completa: objetivo → meta → indicador → proceso.', m:'M06'} ]},
  'sala-jugada':{ cita:'costo de esperar', t:'La apuesta · próximo paso', items:[
    {f:'WSJF — costo de esperar', uso:'la próxima jugada es la brecha que más cuesta por mes de espera — por eso es la ①.', m:'M28'},
    {f:'FinOps — valor cuantificado', uso:'la jugada declara cuánto cuesta y qué meta mueve.', m:'M22'},
    {f:'Pares del sector — la meta contra pares', uso:'la meta se valida contra lo que logran pares comparables: alcanzable no es un deseo. El benchmark jamás fija la meta solo — la firma el ciclo.', m:'M48'} ]},
  'sala-loop':{ cita:'PDCA', t:'Estado del loop', items:[
    {f:'Ciclo PDCA (ISO 9001 — mejora)', uso:'brecha → proyecto → indicador movido: el ciclo completo vive dentro del twin.', m:'M16'},
    {f:'COBIT — brecha de madurez', uso:'la distancia entre cómo estás y el objetivo se mide y se cierra por proyectos.', m:'M15'} ]},
  'sala-trabajo':{ cita:'arnés del puesto', t:'El twin compila trabajo', items:[
    {f:'Arnés por rol×proceso — el trabajo compilado', uso:'el twin compila el trabajo de cada puesto; cuando el twin cambia, el arnés se recompila — jamás se edita a mano.', m:'M46'},
    {f:'Frontera persona ↔ twin', uso:'se mide el rol y el puesto, jamás la persona.', m:'M40'} ]},
  'tac-metas':{ cita:'OKR · GPD', t:'Metas del ciclo', items:[
    {f:'OKR — metas del trimestre', uso:'cada compromiso del nivel declara a qué meta aporta.', m:'M21'},
    {f:'GPD (Falconi)', uso:'en modo anual las metas bajan en cascada y ★ marca las que pagan bono.', m:'M41'} ]},
  'tac-contramedida':{ cita:'GPD', t:'Regla de la reunión', items:[
    {f:'GPD (Falconi) — tratamiento de anomalías', uso:'indicador fuera de banda EXIGE contramedida comprometida; sin ella, escala sola al directorio.', m:'M41'},
    {f:'ISO 9001 — seguimiento y medición', uso:'la banda del indicador define qué es una anomalía.', m:'M16'} ]},
  'tac-brechas':{ cita:'costo de no actuar', t:'Aquí nacen los compromisos', items:[
    {f:'WSJF — costo de esperar', uso:'cada brecha lleva cuánto cuesta no actuar — ese número ordena qué se compromete primero.', m:'M28'},
    {f:'FinOps — valor cuantificado', uso:'toda brecha lleva su costo en dinero, no en adjetivos.', m:'M22'} ]},
  'ideas':{ cita:'kaizen', t:'Embudo de ideas', items:[
    {f:'Gestión de ideas (kaizen)', uso:'el personal propone; idea y proyecto viven separados; la evaluación siempre responde al autor.', m:'M44'},
    {f:'Frontera persona ↔ twin', uso:'la autoría se reconoce — jamás se usa para medir a la persona.', m:'M40'} ]},
  'mej-brechas':{ cita:'costo/ROI', t:'Brechas — el ranking', items:[
    {f:'WSJF — costo de esperar', uso:'las brechas se ordenan por costo de no hacer y retorno esperado.', m:'M28'},
    {f:'FinOps — valor cuantificado', uso:'toda brecha lleva su costo en dinero.', m:'M22'} ]},
  'mej-proyectos':{ cita:'PDCA', t:'Proyectos en curso', items:[
    {f:'Ciclo PDCA (ISO 9001 — mejora)', uso:'fases con vuelta atrás permitida — mejora real, no cascada.', m:'M16'},
    {f:'DMAIC / MASP — proyectos con caso formal', uso:'cuando el proyecto exige caso de negocio formal o cultura Falconi, el método trae las variantes.', m:'M42'} ]},
  'mej-kpimovido':{ cita:'dato real', t:'KPI movido — el veredicto', items:[
    {f:'FinOps — valor cuantificado', uso:'el veredicto (movió · parcial · no movió) se escribe contra la serie real del indicador.', m:'M22'},
    {f:'Procedencia del dato', uso:'todo dato del cierre lleva fuente y confianza declaradas.', m:'M23'} ]},
  /* — v14.4: el respaldo cubre TODOS los niveles — bandas del territorio (nivel 2) */
  'z0-estrategia':{ cita:'OKR · BSC', t:'Estrategia — la banda de objetivos', items:[
    {f:'Balanced Scorecard — perspectivas', uso:'las cuatro perspectivas (financiera · cliente · procesos · aprendizaje) ordenan la banda; las flechas dentro de la banda son causa → efecto.', m:'M30'},
    {f:'OKR — objetivos con meta del trimestre', uso:'cada objetivo carga su meta del ciclo; el semáforo es la banda de esa meta.', m:'M21'},
    {f:'Hoshin Kanri — despliegue de la estrategia', uso:'lo que aquí se ve baja del directorio y sigue bajando a áreas y equipos — una sola cascada.', m:'M26'} ]},
  'z0-cadena':{ cita:'VSM · APQC', t:'Cadena de valor', items:[
    {f:'Mapa de flujo de valor (VSM)', uso:'la cadena en el orden del negocio; cada proceso trae sus pasos y sus tiempos de toque y espera.', m:'M09'},
    {f:'Clasificación de procesos (APQC)', uso:'qué es proceso del negocio y qué es apoyo no es gusto: se clasifica contra un catálogo estándar.', m:'M12'},
    {f:'Descubrimiento por eventos del negocio', uso:'el AS-IS se levantó recorriendo los hechos con la gente, no copiando el organigrama.', m:'M07'} ]},
  'z0-apoyo':{ cita:'APQC', t:'Procesos de apoyo', items:[
    {f:'Clasificación de procesos (APQC)', uso:'apoyo = sostiene la cadena sin tocar al cliente; el ancho muestra cuántas áreas cruza.', m:'M12'} ]},
  'z0-gente':{ cita:'RACI · arnés', t:'Gente & arneses', items:[
    {f:'Matriz de responsabilidades (RACI)', uso:'dueño del proceso y carril que ejecuta son roles declarados — los pares rol×proceso se derivan, no se inventan.', m:'M25'},
    {f:'Frontera persona ↔ twin', uso:'la persona ocupa el puesto; se mide el puesto y el rol, jamás la persona.', m:'M40'},
    {f:'Arnés por rol×proceso', uso:'⛨ = el trabajo de ese puesto ya está compilado del twin (capa Trabajo).', m:'M46'} ]},
  'z0-sistemas':{ cita:'ArchiMate', t:'Sistemas', items:[
    {f:'Arquitectura de la empresa (ArchiMate/TOGAF)', uso:'cada sistema es un componente con procedencia y a quién sirve; el ancho = procesos que sirve.', m:'M13'},
    {f:'Mapa de sistemas documentado', uso:'el inventario se construye leyendo los sistemas reales, no por encuesta.', m:'M14'} ]},
  'org-estructura':{ cita:'TOGAF · RACI', t:'Organigrama — el plano de los puestos', items:[
    {f:'Arquitectura de la empresa (ArchiMate/TOGAF) — unidades', uso:'áreas y puestos como unidades organizativas; línea sólida = jerarquía, punteada = relación funcional.', m:'M13'},
    {f:'Matriz de responsabilidades (RACI)', uso:'el puesto agrega roles; la autoridad vive en el rol, la posición en el puesto.', m:'M25'},
    {f:'Frontera persona ↔ twin', uso:'la persona es ocupante del puesto — jamás un nodo medible.', m:'M40'} ]},
  /* — v14.4: nivel 4 (flujograma z2 + instrucción z3 + tu día) */
  'z2-flujograma':{ cita:'ISO 10013 · BPMN', t:'Flujograma del proceso', items:[
    {f:'ISO 10013 — pirámide documental', uso:'este nivel es el procedimiento (nivel 2 de la pirámide): quién hace qué, en qué orden.', m:'M38'},
    {f:'BPMN — carriles', uso:'cada carril es un rol; la actividad vive en el carril de quien la ejecuta.', m:'M11'},
    {f:'Mapa de flujo de valor (VSM)', uso:'cada actividad carga toque y espera; el total del proceso, arriba.', m:'M09'} ]},
  'z3-instruccion':{ cita:'ISO 10013 · APQC', t:'Instrucción de trabajo', items:[
    {f:'ISO 10013 — pirámide documental', uso:'este nivel es la instrucción (nivel 3): el "cómo" de UNA actividad, tarea por tarea.', m:'M38'},
    {f:'Clasificación APQC — nivel de tarea', uso:'las tareas son el último peldaño del catálogo — debajo ya no hay más zoom.', m:'M12'},
    {f:'Taxonomía de verbos', uso:'cada tarea empieza con un verbo controlado — así el triage puede leerla.', m:'M37'} ]},
  'z3-scores':{ cita:'ECRS · criterios', t:'Automatizabilidad — dos scores', items:[
    {f:'ECRS — antes de automatizar', uso:'primero eliminar, combinar, reordenar o simplificar; automatizar basura es basura más rápida.', m:'M35'},
    {f:'Criterios de automatizabilidad — dos miradas', uso:'un score para robot de reglas y otro para agente; se computan de los inputs visibles con la confianza propagada — jamás se guardan.', m:'M36'} ]},
  'z3-autoridad':{ cita:'RACI', t:'Autoridad y carga', items:[
    {f:'Matriz de responsabilidades (RACI)', uso:'quién ejecuta y quién responde, declarados por actividad.', m:'M25'},
    {f:'Carga de trabajo percibida (NASA-TLX)', uso:'se mide SOLO si el triage pre-flageó la actividad — jamás censal.', m:'M39'},
    {f:'Frontera persona ↔ twin', uso:'agregado por rol — jamás por persona.', m:'M40'} ]},
  'z3-procedencia':{ cita:'procedencia', t:'Sistemas · conocimiento · procedencia', items:[
    {f:'Procedencia del dato', uso:'todo dato del AS-IS lleva fuente y confianza — lo no corroborado se ve.', m:'M23'},
    {f:'Mapa de sistemas documentado', uso:'el "con qué" apunta al inventario real de sistemas.', m:'M14'} ]},
  'z4-tudia':{ cita:'arnés del puesto', t:'Tu día — operativo', items:[
    {f:'Arnés por rol×proceso', uso:'lo que te llega ya viene compilado del twin para tu puesto; tu parte incluye supervisar al agente y queda registrada.', m:'M46'},
    {f:'Frontera persona ↔ twin', uso:'tus pendientes salen del rol y del puesto — la medición jamás es sobre ti como persona.', m:'M40'} ]},
  /* — v14.4: módulos Método y Cambios */
  'met-vocab':{ cita:'ciclo · bolsas', t:'Los vocabularios — de dónde salen', items:[
    {f:'Shape Up — el ciclo de la apuesta', uso:'por sellar → sellada → cumplida | retirada; el sello es un gate humano de quien responde por la meta (paso 5 · etapa 0 del método); re-apostar re-versiona, jamás edita. Formalizado como entidad del twin (ficha D-23).', m:'M04'},
    {f:'Portafolio de ambición (70/20/10)', uso:'tres bolsas por novedad (mercado × oferta): operar el hoy · expandir · apostar al futuro. El ratio es objetivo configurable por industria; la mezcla real se deriva al leer, jamás se guarda.', m:'M54'},
    {f:'Apetito de riesgo por categoría', uso:'bajo · medio · alto por categoría (liquidez, reputación, expansión…); el contraste de cada apuesta contra la vara se deriva — categoría sin registro se muestra "sin definir".', m:'M52'} ]},
  'met-m1':{ cita:'procedencia · OKR', t:'M1 · Levantamiento', items:[
    {f:'Procedencia del dato', uso:'todo lo ingerido lleva fuente y confianza; el semáforo de provenance es exactamente eso.', m:'M23'},
    {f:'OKR — encuadre', uso:'el levantamiento arranca fijando objetivos y metas con el directorio.', m:'M21'},
    {f:'Clasificación de procesos (APQC)', uso:'cada proceso hallado se clasifica contra el catálogo.', m:'M12'} ]},
  'met-m3':{ cita:'Shape Up · valor', t:'M3 · Espinazo', items:[
    {f:'Impact Mapping — del objetivo al trabajo', uso:'el diagnóstico se ancla a dinero y a los objetivos — no a una lista de deseos.', m:'M06'},
    {f:'Shape Up — apostar', uso:'UNA apuesta con apetito y firma, no cincuenta iniciativas.', m:'M04'},
    {f:'FinOps — valor cuantificado', uso:'cada brecha con costo de no actuar; cada apuesta con el valor que persigue.', m:'M22'} ]},
  'met-m2':{ cita:'ISO 9001', t:'M2 · Mantenimiento', items:[
    {f:'ISO 9001 — el sistema vivo', uso:'revisiones periódicas, frescura de indicadores y mejora continua: el twin no se pudre.', m:'M16'},
    {f:'Procedencia del dato', uso:'un indicador vencido se ve — la frescura es parte del dato.', m:'M23'} ]},
  'cam-cola':{ cita:'ISO 9001', t:'Cambios sobre el twin', items:[
    {f:'ISO 9001 — gestión de cambios', uso:'cada cambio declara su tipo de aprobación (directa · revisión del responsable · comité) y queda trazado.', m:'M16'},
    {f:'Matriz de responsabilidades (RACI)', uso:'quién aprueba está declarado por tipo de cambio.', m:'M25'} ]},
  'cam-versiones':{ cita:'ISO 10013', t:'Versiones vigentes', items:[
    {f:'ISO 10013 — información documentada', uso:'todo documento del twin tiene versión y estado: borrador → vigente → obsoleto, por entorno.', m:'M38'} ]},
  'cam-historial':{ cita:'registros ISO', t:'Historial de la organización', items:[
    {f:'ISO 9001 — registros', uso:'toda acción queda como evidencia: quién, qué, con qué aprobación.', m:'M16'},
    {f:'Procedencia del dato', uso:'el historial es la traza que hace auditable cada cambio del twin.', m:'M23'} ]},
  /* — v14.5: respaldo DENTRO de las fichas de entidad (pie automático en openDrawer, por tipo) */
  'ent-empresa':{ cita:'ontología del twin', t:'Empresa — el twin completo', items:[
    {f:'Ontología del twin — semántica + acción', uso:'las 20 entidades y sus relaciones son una gramática declarada; cada cosa que ves es una instancia con su ficha.', m:'M32'},
    {f:'ISO 9001 — la organización y su contexto', uso:'la empresa como sistema: procesos, roles, objetivos y su mejora, bajo un mismo vocabulario.', m:'M16'} ]},
  'ent-objetivo':{ cita:'OKR · BSC', t:'Objetivo', items:[
    {f:'OKR — objetivos con meta del trimestre', uso:'el objetivo carga su meta del ciclo (de → a); el semáforo se lee contra esa banda.', m:'M21'},
    {f:'Balanced Scorecard — perspectivas', uso:'su perspectiva (financiera · cliente · procesos · aprendizaje) y las flechas causa → efecto entre objetivos.', m:'M30'},
    {f:'Impact Mapping — trazar del objetivo al trabajo', uso:'del objetivo se enciende el camino completo: meta → indicador → proceso que lo mueve.', m:'M06'} ]},
  'ent-kpi':{ cita:'ISO 9001 · procedencia', t:'Indicador', items:[
    {f:'ISO 9001 — seguimiento y medición', uso:'indicador con banda definida y responsable; fuera de banda exige contramedida comprometida.', m:'M16'},
    {f:'Procedencia del dato', uso:'cada medición lleva fuente, confianza y frescura — sin dato NO es rojo: es gris.', m:'M23'} ]},
  'ent-proceso':{ cita:'APQC · ISO 9001', t:'Proceso', items:[
    {f:'Clasificación de procesos (APQC)', uso:'clasificado contra el catálogo estándar — del negocio o de apoyo, con su código.', m:'M12'},
    {f:'ISO 9001 — caracterización', uso:'propósito, cuándo inicia y termina, criterios de control: la ficha 4.4 del proceso.', m:'M16'},
    {f:'Mapa de flujo de valor (VSM)', uso:'sus pasos y sus tiempos de toque y espera salen del mapa, no de memoria.', m:'M09'} ]},
  'ent-actividad':{ cita:'APQC · verbos', t:'Actividad', items:[
    {f:'Clasificación APQC — nivel de actividad', uso:'paso clave dentro del proceso; sus tareas son el último peldaño del catálogo.', m:'M12'},
    {f:'Taxonomía de verbos', uso:'cada actividad y tarea empieza con un verbo controlado — así el triage puede leerla.', m:'M37'},
    {f:'ECRS + criterios de automatizabilidad', uso:'la clasificación (eliminable · automatizable · humana) sale del triage con inputs visibles.', m:'M36'} ]},
  'ent-area':{ cita:'TOGAF', t:'Área', items:[
    {f:'Arquitectura de la empresa (ArchiMate/TOGAF) — unidades', uso:'unidad organizativa; un proceso puede cruzar varias áreas — la relación es muchos a muchos.', m:'M13'},
    {f:'Matriz de responsabilidades (RACI)', uso:'el área tiene líder; cada proceso tiene dueño — son responsabilidades distintas.', m:'M25'} ]},
  'ent-puesto':{ cita:'RACI · arnés', t:'Puesto', items:[
    {f:'Matriz de responsabilidades (RACI)', uso:'el puesto agrega roles; la autoridad vive en el rol, la posición en el puesto.', m:'M25'},
    {f:'Frontera persona ↔ twin', uso:'la persona ocupa el puesto — se mide el puesto y el rol, jamás la persona.', m:'M40'},
    {f:'Arnés por rol×proceso', uso:'su roster de arneses se ensambla de los pares rol×proceso que el puesto agrega.', m:'M46'} ]},
  'ent-rol':{ cita:'RACI · BPMN', t:'Rol', items:[
    {f:'Matriz de responsabilidades (RACI)', uso:'conjunto estable de responsabilidades: posee procesos (responde) o los ejecuta (carril).', m:'M25'},
    {f:'BPMN — carriles', uso:'en el flujograma, el rol es el carril donde viven sus actividades.', m:'M11'},
    {f:'Arnés por rol×proceso', uso:'el arnés se compila por rol×proceso — el rol es la unidad de compilación.', m:'M46'} ]},
  'ent-persona':{ cita:'frontera persona', t:'Persona', items:[
    {f:'Frontera persona ↔ twin', uso:'la persona es ocupante: ningún indicador, score o medición se le atribuye a ella.', m:'M40'},
    {f:'Arquitectura de la empresa (ArchiMate) — actor', uso:'individuo concreto que ocupa un puesto del organigrama.', m:'M13'} ]},
  'ent-brecha':{ cita:'costo de no actuar', t:'Brecha', items:[
    {f:'COBIT — brecha de madurez', uso:'distancia entre cómo estás y lo que el objetivo exige — se mide como madurez, no como opinión.', m:'M15'},
    {f:'WSJF — costo de esperar', uso:'cada brecha lleva cuánto cuesta por mes no actuar — ese número la ordena.', m:'M28'},
    {f:'FinOps — valor cuantificado', uso:'el costo se declara en dinero, con supuestos visibles.', m:'M22'} ]},
  'ent-capability':{ cita:'mapa de capacidades', t:'Capacidad', items:[
    {f:'Mapa de capacidades del negocio', uso:'QUÉ sabe hacer la empresa (estable) — distinto del proceso (CÓMO); el semáforo es madurez contra lo que los objetivos exigen.', m:'M31'},
    {f:'Mapa de evolución (Wardley)', uso:'cómo evoluciona cada capacidad (a medida → producto → commodity) informa el plan a 3 años.', m:'M27'} ]},
};
/* v14.5: tipo de ficha (primer término del eyebrow, sin acentos) → entrada de respaldo */
const RESP_TIPO={ empresa:'ent-empresa', objetivo:'ent-objetivo', kpi:'ent-kpi', proceso:'ent-proceso',
  actividad:'ent-actividad', area:'ent-area', puesto:'ent-puesto', rol:'ent-rol', persona:'ent-persona',
  sistema:'z0-sistemas', brecha:'ent-brecha', capability:'ent-capability', proyecto:'mej-proyectos',
  idea:'ideas', apuesta:'dir-apuestas', arnes:'sala-trabajo',
  /* v18 · gobierno del directorio */
  cifra:'dir-resultado', alcance:'dir-resultado', caja:'dir-caja', presupuesto:'dir-presupuesto',
  riesgo:'dir-riesgos', acuerdo:'dir-acuerdos', inversion:'dir-inversiones' };
/* v14.4: aplica en TODO el twin; onclick inline = funciona también en el lienzo ($nodes) sin wireLinks */
function respBadge(id){ const r=RESPALDO[id]; if(!r||!state.capas.has('respaldo')) return '';
  return `<button class="resp" data-resp="${id}" onclick="event.stopPropagation();openRespaldo('${id}')" title="Respaldo del método: ${r.items.map(i=>i.f).join(' · ')} — clic = la ficha">§ ${r.cita}</button>`; }
function openRespaldo(id){ const r=RESPALDO[id]; if(!r) return;
  openDrawer('Respaldo del método', r.t,
    `<div style="font-size:11px;color:var(--tx-faint);margin-bottom:4px">Lo que este panel muestra no es opinión: cada pieza baja de una metodología del catálogo del método. En superficie se cita por su nombre común; el código de carta (a la derecha) es la procedencia interna.</div>`
    + r.items.map(i=>`<div class="dgroup"><div class="gt">${i.f}<span class="mono" style="float:right;font-weight:400;font-size:9px;color:var(--tx-faint)">${i.m}</span></div>
        <div style="font-size:12px;color:var(--tx-mut);line-height:1.5">${i.uso}</div></div>`).join('')
    + (r.gap?`<div class="dgroup"><div class="gt" style="color:var(--warn)">Donde el respaldo aún es horizonte</div><div style="font-size:12px;color:var(--tx-mut);line-height:1.5">${r.gap}</div></div>`:'')
    + `<div style="font-size:11px;color:var(--tx-faint);border-top:1px solid var(--border);padding-top:8px;margin-top:4px">El método es dato versionado (59 cartas) — la misma fuente que respalda cada campo del twin y cada paso del engagement. <span class="plnk" onclick="state.mod='metodo';state.insp='home';render()">Ver la trazabilidad completa — módulo Método ›</span></div>`); }
