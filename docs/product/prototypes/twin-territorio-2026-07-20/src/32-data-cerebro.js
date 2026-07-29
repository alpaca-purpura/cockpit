/* ---- DATA · el cerebro de la organización (CK-29) — personas · sistemas · capabilities ·
   arneses · conocimiento · ideas · causalidad BSC. Se cuelgan de DATA como asignaciones
   (mismo objeto, un archivo por tema — ver build.py). ---- */

/* ---- CK-29: el cerebro completo — personas · sistemas · capabilities · arneses · conocimiento · ideas ---- */
// ocupantes no-líderes (la persona OCUPA un puesto, D-19 · CK-24) — nómina completa Terranova.
// El twin MIDE puesto/rol/proceso/área; la persona es ocupante/autora, jamás nodo medible.
DATA.personasExtra =[
  {nm:'Lucía Cárdenas Vidal', puesto:'Asistente de Gerencia', area:'a-ger', vinculo:'empleado'},
  // Ventas (caseta por proyecto)
  ...['Katia Flores','Renato Aguilar','Fiorella Paz','Diego Salinas','Vanessa Ríos','Óscar Mamani']
    .map(nm=>({nm, puesto:'Asesor de Ventas', area:'a-ven', vinculo:'empleado'})),
  {nm:'Claudia Herrera Soto', puesto:'Coordinador de Sala de Ventas', area:'a-ven', vinculo:'empleado'},
  // Marketing
  ...['Bruno Espinoza','Camila Torres'].map(nm=>({nm, puesto:'Analista de Marketing', area:'a-mkt', vinculo:'empleado'})),
  {nm:'Sergio Luna Prado', puesto:'Diseñador Gráfico', area:'a-mkt', vinculo:'empleado'},
  // Postventa (bajo Comercial)
  {nm:'Patricia Vílchez Ramos', puesto:'Coordinador de Postventa', area:'a-com', vinculo:'empleado'},
  ...['Iván Quispe','Rosa Delgado','Pablo Chumpitaz'].map(nm=>({nm, puesto:'Técnico de Postventa', area:'a-com', vinculo:'empleado'})),
  // Desarrollo y Proyectos
  {nm:'Andrés Vega Rondón', puesto:'Analista de Cabida', area:'a-dev', vinculo:'empleado'},
  ...['Mariel Soto','Jorge Campos'].map(nm=>({nm, puesto:'Arquitecto de Proyecto', area:'a-dev', vinculo:'empleado'})),
  {nm:'Tania Beltrán Ugarte', puesto:'Jefe de Permisos', area:'a-dev', vinculo:'empleado'},
  {nm:'Milton Cruz Ayala', puesto:'Asistente de Permisos', area:'a-dev', vinculo:'empleado'},
  // Finanzas
  {nm:'Paola Guzmán Terry', puesto:'Analista Financiero', area:'a-fin', vinculo:'empleado'},
  // Contabilidad
  ...['Hugo Ponce','Silvia Aranda','Martín Cueva'].map(nm=>({nm, puesto:'Analista Contable', area:'a-con', vinculo:'empleado'})),
  ...['Leslie Ramos','Junior Palacios'].map(nm=>({nm, puesto:'Asistente Contable', area:'a-con', vinculo:'empleado'})),
  // Tesorería y Cobranza
  ...['Julio Paredes','Estefanía Gil','Ramiro Ccopa'].map(nm=>({nm, puesto:'Analista de Cobranza', area:'a-tes', vinculo:'empleado'})),
  ...['Carmen Rojas','Alexandra Bustos'].map(nm=>({nm, puesto:'Analista de Tesorería', area:'a-tes', vinculo:'empleado'})),
  ...['Nilo Huarcaya','Gladys Ttito'].map(nm=>({nm, puesto:'Gestor de Cobranza en Campo', area:'a-tes', vinculo:'empleado'})),
  // Gestión Humana
  {nm:'Daniela Farfán Ochoa', puesto:'Analista de Reclutamiento', area:'a-rh', vinculo:'empleado'},
  {nm:'Roberto Ñahui Ccama', puesto:'Analista de Nómina', area:'a-rh', vinculo:'empleado'},
  {nm:'Yolanda Cáceres Junco', puesto:'Trabajadora Social', area:'a-rh', vinculo:'empleado'},
  // Operaciones (staff central)
  {nm:'Víctor Sandoval Meza', puesto:'Jefe de Calidad y SSOMA', area:'a-ope', vinculo:'empleado'},
  ...['Elmer Julca','Karen Poma'].map(nm=>({nm, puesto:'Prevencionista', area:'a-ope', vinculo:'empleado'})),
  // Oficina Técnica
  ...['Freddy Condori','Alicia Zapata'].map(nm=>({nm, puesto:'Metrador', area:'a-oft', vinculo:'empleado'})),
  {nm:'Christian Neyra Palma', puesto:'Cadista', area:'a-oft', vinculo:'empleado'},
  // Logística de Obra
  ...['Norma Alvarado','Raúl Chirinos'].map(nm=>({nm, puesto:'Comprador', area:'a-log', vinculo:'empleado'})),
  ...['Simón Curo','Elvis Taipe','Rocío Ancco'].map(nm=>({nm, puesto:'Almacenero de Obra', area:'a-log', vinculo:'empleado'})),
  // Obras — 3 proyectos en ejecución (Marina 87 · Parque Central · Aires de Surco)
  ...['Patricia Oré','Manuel Zegarra'].map(nm=>({nm, puesto:'Residente de Obra', area:'a-obr', vinculo:'empleado'})),
  ...['Kevin Apaza','Lorena Mestas','Franco Bellido'].map(nm=>({nm, puesto:'Asistente de Residente', area:'a-obr', vinculo:'empleado'})),
  ...['Aurelio Puma','Sixto Villanueva','Edgar Huamaní','Rufino Ayvar','Teodoro Ccanto','Wilber Sulca']
    .map(nm=>({nm, puesto:'Capataz', area:'a-obr', vinculo:'empleado'})),
  ...['Pedro Yupanqui','Santos Quilca','Máximo Rimachi','Abel Curi','Nemesio Puclla','Faustino Ayma']
    .map(nm=>({nm, puesto:'Oficial de Obra', area:'a-obr', vinculo:'empleado'})),
  ...['Juan Ccahuana','Marcos Taco','Felipe Yauri','Ricardo Mollo','Esteban Pillco','Damián Choque','Guido Mamani','Cirilo Huanca',
      'Timoteo Apari','Basilio Ccorahua','Julián Quispe','Aniceto Vilca','Rómulo Chuquimia','Fidel Arotoma']
    .map(nm=>({nm, puesto:'Operario de Obra', area:'a-obr', vinculo:'empleado'})),
  ...['Eloy Huamán','Nicanor Sacsi','Porfirio Ttica','Zenón Curasi','Abdón Layme','Melquiades Puma','Gerardo Ancalle','Leoncio Raymi']
    .map(nm=>({nm, puesto:'Operario de Obra', area:'a-obr', vinculo:'subcontratado'})),
  // TI
  {nm:'Gino Salcedo Ruiz', puesto:'Analista de Soporte TI', area:'a-ti', vinculo:'empleado'},
];

DATA.sistemas =[  // pulso: cada sistema declara su conector al lakehouse (N16)
  {id:'s-nub', nm:'Nubecont ERP',    digital:'integrado', conector:'dlt → lakehouse · sync diaria 06:00 · 14 tablas', caps:['c-cobrar','c-cerrar'], fuente:'inventario TI + entrevistas de proceso', conf:'alta'},
  {id:'s-crm', nm:'CRM Vendo',       digital:'integrado', conector:'dlt → lakehouse · sync horaria (leads · visitas)', caps:['c-vender'], fuente:'inventario TI + entrevistas de proceso', conf:'alta'},
  {id:'s-exc', nm:'Excel caja obra', digital:'manual',    conector:'SIN conector — captura manual, rezago s/d', caps:['c-caja'], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
  {id:'s-val', nm:'ValorizApp',      digital:'integrado', conector:'dlt → lakehouse · sync semanal (valorizaciones)', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'alta'},
  {id:'s-ban', nm:'Banca Empresas',  digital:'externo',   conector:'extracto CSV manual · candidato a conector', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
  {id:'s-bim', nm:'BIM',             digital:'integrado', conector:'sin conector (documentos de diseño)', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'alta'},
  {id:'s-ose', nm:'OSE FacturaLima', digital:'externo',   conector:'API del OSE · CDR por comprobante', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
  {id:'s-meta',nm:'Meta Ads',        digital:'externo',   conector:'export CSV semanal — candidato a conector (CPL)', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
  {id:'s-por', nm:'Portal clientes', digital:'integrado', conector:'dlt → lakehouse · tickets postventa + NPS', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'alta'},
  {id:'s-mun', nm:'Portal municipal',digital:'externo',   conector:'SIN conector — seguimiento a mano por distrito (SM · PL · Surquillo)', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
  {id:'s-leg', nm:'Estudio legal',   digital:'externo',   conector:'proceso provisto externamente (ISO 8.4) — correo + expediente físico', caps:[], fuente:'inventario TI + entrevistas de proceso', conf:'media'},
];

DATA.capabilities =[  // qué SABE hacer la empresa (M31) — madurez COBIT
  {id:'c-cobrar', nm:'Cobrar cuotas',            madurez:3, via:['p-cob','s-nub'], fuente:'autoevaluación asistida (COBIT)', conf:'media'},
  {id:'c-vender', nm:'Vender inmuebles',         madurez:4, via:['p-vta','s-crm'], fuente:'autoevaluación asistida (COBIT)', conf:'media'},
  {id:'c-cerrar', nm:'Cerrar el mes financiero', madurez:4, via:['p-cierre','s-nub'], fuente:'autoevaluación asistida (COBIT)', conf:'media'},
  {id:'c-caja',   nm:'Ver la caja al día',       madurez:1, via:['p-caja','s-exc'], gap:'g-cvis', fuente:'autoevaluación asistida (COBIT)', conf:'media'},
];

// arneses — REGISTROS del twin (D-20 · CK-30): se COMPILA por rol×proceso · se ENSAMBLA por puesto ·
// se CORRE por persona. deriva_de = el campo que ningún registro del mercado tiene. estado/drift se
// DERIVAN comparando hash_fuente contra TWIN_HASH ("computa, jamás guarda"); versión, autonomía,
// supervisor, verificación y uso son hecho propio (guardados). Contenido = Arnesia N15 (arnes.l0.json).
DATA.twinHash ='tw:b21e77';

DATA.arneses =[
  {id:'h-cob-ancob', deriva_de:{puesto:'Analista de Cobranza', rol:'Analista de Cobranza', proceso:'p-cob'},
   v:'v3', canal:'estable', hash_fuente:'tw:b21e77',
   autonomia:'L2', autonomia_razon:'act.06 con mandato preventivo (cumplimiento) → techo L2 sin ratificación del directorio',
   supervisor:'Jefe de Cobranza',
   verificacion_humana:{que:['compromisos registrados vs convenios del ERP','tono de los recordatorios enviados'], evidencia:'muestra de 5 corridas/sem + log completo', tiempo:'20 min/sem'},
   supervision:{corridas_sem:34, anulaciones_sem:3, ultima:'hace 2 días'},
   guardrails:[{g:'no promete quitas ni refinanciamientos', mecanismo:'prompt'},
     {g:'no envía lote sin aprobación del supervisor', mecanismo:'hook'},
     {g:'solo lectura del ERP (scope del token)', mecanismo:'permiso'},
     {g:'sin acceso a nómina ni datos de RRHH', mecanismo:'sandbox'}],
   compilado:'2026-07-18 · desde: mapa Cobranza v1 + verbos + conocimiento/cobranza + hilo (k-dso · k-cob)',
   skills:['monitorear-cartera','clasificar-morosidad','preparar-recordatorios','registrar-compromisos'],
   uso:'34 corridas/sem · agregado por rol, jamás por persona', acts:[1,2,3,6,7], mueve:['k-dso','k-cob'], fuente:'Arnesia N15', conf:'alta'},
  {id:'h-cob-jef', deriva_de:{puesto:'Jefe de Cobranza', rol:'Jefe de Cobranza', proceso:'p-cob'},
   v:'v1', canal:'estable', hash_fuente:'tw:7c41d9',
   autonomia:'L1', autonomia_razon:'negociación humano-por-diseño (act.04): el agente solo prepara, jamás negocia',
   supervisor:'CFO',
   verificacion_humana:{que:['propuestas de refinanciamiento antes de ofrecerse'], evidencia:'cada propuesta con su sustento (política + historial)', tiempo:'15 min/día'},
   supervision:{corridas_sem:8, anulaciones_sem:0, semanas_sin_anular:9, ultima:'hace 5 días'},
   guardrails:[{g:'no cierra convenios fuera de política', mecanismo:'prompt'},
     {g:'fuera de política escala al CFO', mecanismo:'hook'}],
   compilado:'2026-06-02 · desde: mapa Cobranza v1',
   drift:'el twin cambió: verbo act.05 corregido (SC-11) + mapa v2 en dev (SC-12) → recompilar',
   skills:['priorizar-mora-dura','preparar-refinanciamientos'], uso:'8 corridas/sem · agregado por rol', acts:[4], mueve:['k-dso'], fuente:'Arnesia N15', conf:'alta'},
  {id:'h-cierre-cont', deriva_de:{puesto:'Contador General', rol:'Contador General', proceso:'p-cierre'},
   v:'v2', canal:'estable', hash_fuente:'tw:b21e77',
   autonomia:'L2', autonomia_razon:'cierre = mandato preventivo (act.03) → techo L2; corre asistido con checklist',
   supervisor:'CFO',
   verificacion_humana:{que:['checklist pre-cierre completo','asientos de provisión propuestos'], evidencia:'checklist firmado + diff de asientos', tiempo:'30 min/mes'},
   supervision:{corridas_sem:12, anulaciones_sem:1, ultima:'hace 1 día'},
   guardrails:[{g:'no postea asientos — solo los prepara', mecanismo:'permiso'},
     {g:'cierre requiere acuse del Contador', mecanismo:'hook'}],
   compilado:'2026-07-10 · RECOMPILADO al cerrar pm-cie (checklist pre-cierre estandarizado → skill)',
   skills:['checklist-pre-cierre','conciliar-intercompañías','preparar-eeff'], uso:'12 corridas/sem · agregado por rol', acts:[3], mueve:['k-cie'], fuente:'Arnesia N15', conf:'alta'},
  {id:'h-fact-cont', deriva_de:{puesto:'Contador General', rol:'Contador General', proceso:'p-fact'},
   v:'v1', canal:'estable', hash_fuente:'tw:b21e77',
   autonomia:'L2', autonomia_razon:'emisión con validación OSE — reglas estables, reversible hasta el envío',
   supervisor:'CFO',
   verificacion_humana:{que:['facturas emitidas vs hitos del cronograma'], evidencia:'reporte diario de emisión + rechazos OSE', tiempo:'10 min/día'},
   supervision:{corridas_sem:22, anulaciones_sem:2, ultima:'hoy'},
   guardrails:[{g:'no emite sobre hito no cumplido', mecanismo:'hook'},
     {g:'solo escribe en el módulo de facturación', mecanismo:'permiso'}],
   compilado:'2026-07-20 · desde: mapa Facturación v1 + calendario de hitos',
   skills:['preparar-emision','validar-datos-fiscales','registrar-cdr'], uso:'22 corridas/sem · agregado por rol', acts:[], mueve:[], fuente:'Arnesia N15', conf:'media'},
  {id:'h-val-metr', deriva_de:{puesto:'Metrador', rol:'Metrador', proceso:'p-val'},
   v:'v1', canal:'estable', hash_fuente:'tw:b21e77',
   autonomia:'L1', autonomia_razon:'metrados sustentan valorización (doble aprobación) — asistencia, no autonomía',
   supervisor:'Jefe de Oficina Técnica',
   verificacion_humana:{que:['metrados consolidados vs avance en campo'], evidencia:'contraste quincenal contra cronograma', tiempo:'1 h/quincena'},
   supervision:{corridas_sem:9, anulaciones_sem:1, ultima:'hace 3 días'},
   guardrails:[{g:'no aprueba valorizaciones — las prepara', mecanismo:'permiso'}],
   compilado:'2026-07-15 · desde: mapa Valorización v1 + verbos + hilo (desvío avance)',
   skills:['consolidar-metrados','contrastar-avance-vs-cronograma','preparar-valorizacion'], uso:'9 corridas/sem · agregado por rol', acts:[2], mueve:['k-avc'], fuente:'Arnesia N15', conf:'alta'},
];

DATA.conocimiento ={  // know-how anclado a proceso/rol — teaser F3 (conocimiento/<proceso>/<rol>/ en N6)
  'p-cob':   {n:'3 guías · 12 casos', d:'política de refinanciamiento · playbook de llamadas · casos de mora dura 2024-25'},
  'p-cierre':{n:'2 guías · 8 casos',  d:'checklist pre-cierre (estandarizado por el proyecto) · calendario de obligaciones'},
  'p-caja':  {n:'0 guías',            d:'el know-how vive en la cabeza del analista — brecha de conocimiento'},
  'p-vta':   {n:'2 guías · 6 casos',  d:'guion de visita a caseta · matriz de objeciones · casos de cierre 2025'},
  'p-perm':  {n:'0 guías',            d:'NO existe procedimiento escrito (g-doc) — el cómo por municipio vive en una persona (g-dep)'},
  'p-ejec':  {n:'1 guía · 4 casos',   d:'protocolo de corte quincenal de avance · lecciones Marina 87'},
  'p-post':  {n:'1 guía',             d:'catálogo de garantías por partida (borrador)'},
};

DATA.ideas =[  // funil kaizen (M44) — separación idea ↔ proyecto · autoría reconocida (RN-16)
  {id:'i-wsp',    nm:'Plantillas de WhatsApp para recordatorios de pago', prop:'Julio Paredes · Analista de Cobranza', estado:'promovida', a:'pm-cob', ambicion:'operar', nota:'reconocida — origen del alcance de Cobranza digital fase 1', fuente:'embudo de ideas — autor reconocido', conf:'alta'},
  {id:'i-agente', nm:'Agente que prepara el contacto de morosos (act. 03)', prop:'triage M36 → Jefe de Cobranza', estado:'en-evaluacion', origen:'triage', ambicion:'transformar', nota:'RTLX 71 + veredicto automatizable-agente → candidato a skill del arnés del puesto (Arnesia)', fuente:'embudo de ideas — autor reconocido', conf:'alta'},
  {id:'i-caja',   nm:'Foto diaria de caja desde Banca Empresas', prop:'Carmen Rojas · Analista de Tesorería', estado:'enviada', ambicion:'operar', nota:'ataca la ceguera de caja (g-cvis) sin esperar proyecto formal', fuente:'embudo de ideas — autor reconocido', conf:'alta'},
  {id:'i-mun',    nm:'Bitácora por municipio: registrar el porqué de cada observación', prop:'Milton Cruz Ayala · Asistente de Permisos', estado:'enviada', ambicion:'operar', nota:'ataca g-doc/g-dep — convierte el conocimiento de cabeza en corpus', fuente:'embudo de ideas — autor reconocido', conf:'alta'},
];

DATA.bscEdges =[ ['o-eq','o-cob'],['o-eq','o-vis'],['o-cob','o-caja'],['o-vis','o-mar'],['o-mar','o-lid'],['o-hog','o-lid'],['o-lid','o-caja'] ];
