/* ---- v14 · NIVEL 1 — apuestas + apetito (D-23: entidad `apuesta` = 13º nodo + apetito en config_estrategia
   pendiente vía /metodo-aprende; acá viven como dato del mockup, ancladas a objetivos reales) ---- */
DATA.apuestas=[  // valor = FinOps (dinero + supuesto visible) · apuesta_de = apetito Shape Up (tiempo fijo · tope) — v15.1
  {id:'ap-lid', nm:'Liderazgo en vivienda media', objetivos:['o-lid','o-hog'], riesgo:'medio', riesgo_cat:'expansion', ambicion:'expandir', estado:'sellada',
    valor:{s:'+S/ 3.1M/año de margen', supuesto:'margen 14→18% sobre venta de ~S/ 78M/año'}, apuesta_de:{t:'4 trimestres', tope:'S/ 250k'}},
  {id:'ap-caja',nm:'Caja sana en todos los proyectos', objetivos:['o-caja','o-cob'], riesgo:'alto', riesgo_cat:'liquidez', ambicion:'operar', estado:'sellada',
    valor:{s:'~S/ 6.0M de caja liberada', supuesto:'DSO 88→60 días sobre venta de ~S/ 78M/año (una vez) + S/ 180k/año de mora evitada'}, apuesta_de:{t:'2 trimestres', tope:'S/ 150k'}},
  {id:'ap-mar', nm:'Reactivar Marina', objetivos:['o-mar','o-vis'], riesgo:'alto', riesgo_cat:'reputacion', ambicion:'operar', estado:'sellada',
    valor:{s:'S/ 8.4M de stock que vuelve a rotar', supuesto:'24 unidades paradas × ticket ~S/ 350k'}, apuesta_de:{t:'2 trimestres', tope:'S/ 420k (obra + comercial)'}},
  {id:'ap-cob', nm:'Digitalizar la cobranza', objetivos:['o-cob'], riesgo:'medio', riesgo_cat:'liquidez', ambicion:'operar', estado:'por-sellar',
    valor:{s:'S/ 180k/año de mora evitada', supuesto:'la mora de Marina (alerta) cae al llevar el 60% de la cobranza a canal digital'}, apuesta_de:{t:'1 trimestre · fase 1', tope:'S/ 60k'}},
];
DATA.apetito={ liquidez:'media', reputacion:'baja', expansion:'alta — sin definir por el directorio' };
/* ---- v15 · «Las varas del directorio» — rumbo (plan 3 años) · mezcla de ambición · escalera de
   madurez · rangos de pares. ⚠ dato simulado — rumbo/madurez/peers aún sin ficha (apuestas/apetito ya son D-23)
   (el campo `ambicion` SÍ es esquema real, D-22). Los derivados (mezcla real, contraste
   riesgo↔apetito, estado de apuesta) se computan AL LEER — jamás se guardan. ---- */
DATA.rumbo={
  vision:{h:'2029', t:'Líder en vivienda media del Perú'},
  anio:['o-caja','o-mar'],   // refs → DATA.objetivos (v16: id real, no string duplicado — cero drift si el objetivo cambia de nombre)
  bajada:{acordadas:3, de:4, pendiente:'Comercial'},   // acuerdo ida-y-vuelta al bajar cada meta
};
DATA.mezclaObjetivo={ operar:70, expandir:20, transformar:10, fijada:false };  // default industria — POR FIJAR
DATA.madurez={ dims:[   // escalera 1-5 del sistema de gestión — actual vs deseado (derivado de evidencia)
  {d:'liderazgo',  actual:3, deseado:4}, {d:'estrategia', actual:3, deseado:3},
  {d:'recursos',   actual:2, deseado:3}, {d:'procesos',   actual:2, deseado:4, frena:true},
  {d:'mejora',     actual:2, deseado:3} ]};
DATA.peers={  // rangos externos con fuente+segmento+vigencia — sin fuente seria, el rango NO se afirma
  'g-dso':      {r:'pares 45–60 d', src:'Benchmark abierto de procesos (APQC) · cobranza · constructoras LATAM · 2025'},
  'g-post':     {r:'pares 50+',     src:'Benchmark sectorial de satisfacción de propietarios · desarrolladores residenciales · 2024'},
  'meta-margen':{r:'pares 15–22%',  src:'Benchmark de márgenes · vivienda media Perú/LATAM · 2025'} };
const AMBICION={operar:'operar el hoy', expandir:'expandir', transformar:'apostar al futuro'};
/* contraste riesgo↔apetito por categoría (derivado al leer) — lo usan tarjeta Y ficha (v15.1) */
const CATNM={liquidez:'liquidez', reputacion:'reputación', expansion:'expansión'};
const NIVR={baja:0,bajo:0,media:1,medio:1,alta:2,alto:2};
function contraste(a){ const raw=DATA.apetito[a.riesgo_cat]||'';
  if(/sin definir/.test(raw)||!(raw.split(' ')[0] in NIVR)) return {t:`apetito de ${CATNM[a.riesgo_cat]} sin definir — fíjalo ⚠`, c:'var(--warn)'};
  const ap=raw.split(' ')[0], d=NIVR[a.riesgo]-NIVR[ap];
  return d>0? {t:`excede tu apetito de ${CATNM[a.riesgo_cat]} (${ap})`, c:'var(--crit)'}
       : d===0? {t:`al límite del apetito de ${CATNM[a.riesgo_cat]} (${ap})`, c:'var(--warn)'}
       : {t:`dentro del apetito de ${CATNM[a.riesgo_cat]} (${ap})`, c:'var(--tx-mut)'}; }
/* progreso de un KR hacia su meta (0-1, clamp) — domain [from,to], funciona en ambas direcciones
   (meta mayor o menor que el origen); usado por el meter del rumbo (dataviz skill: "ratio contra límite") */
function krProg(o){ const {from,to,cur}=o.kr, span=to-from; if(!span) return 0;
  return Math.max(0,Math.min(1,(cur-from)/span)); }
/* v17.2 (A4.1) · salud del objetivo DERIVADA del KR — avance real vs esperado a hoy ("se computa,
   jamás se guarda", mismo principio que semaforo() para KPI y que los scores M36). En la app el
   esperado cae del plan de hitos del trimestre; acá es dato canned del KR. */
function saludKr(kr){ if(kr.esperado==null) return 'gris';
  const dir=kr.to>=kr.from?1:-1, av=(kr.cur-kr.from)*dir, esp=(kr.esperado-kr.from)*dir;
  if(esp<=0) return 'gris'; const r=av/esp;
  return r>=0.95?'verde':r>=0.75?'ambar':'rojo'; }
DATA.objetivos.forEach(o=>o.salud=saludKr(o.kr));
/* costo de esperar de un proyecto — heredado de la brecha que ataca, normalizado a S/ k/mes */
function codMes(pm){ const g=pm.brecha&&byId(DATA.brechas,pm.brecha); if(!g||!g.costo) return null;
  const m=g.costo.match(/S\/\s*([\d.]+)k\/(mes|año)/); if(!m) return null;
  return {mes:m[2]==='mes'?+m[1]:Math.round(+m[1]/12), raw:g.costo}; }
function mezclaReal(){  // rollup al leer: apuestas + proyectos + ideas etiquetadas — jamás persistido
  const pool=[...DATA.apuestas,...DATA.proyectos,...DATA.ideas].filter(x=>x.ambicion);
  const n={operar:0,expandir:0,transformar:0}; pool.forEach(x=>n[x.ambicion]++);
  const t=pool.length||1;
  return {operar:Math.round(n.operar*100/t), expandir:Math.round(n.expandir*100/t),
          transformar:Math.round(n.transformar*100/t), n:t}; }
DATA.objetivos.find(o=>o.id==='o-lid').bono=true;    // ★ solo pinta en modo GPD/mixto (RN-14)
DATA.objetivos.find(o=>o.id==='o-caja').bono=true;
/* historial de la organización — toda acción, versionada (semilla = las ya aplicadas de la cola) */
DATA.historial=[
  'hace 2 días · <b>Consultor</b> · corrigió el verbo de la actividad 05 ("transportar" → "visitar") · directa + acuse',
  'hace 3 días · <b>Jefe de Cobranza</b> · registró la medición "DSO Marina" julio: 91 días · directa',
  'hace 2 sem · <b>Contador General</b> · cerró "Cierre contable exprés" — veredicto: movió (9 → 4.5 días) · gestión-de-cambios',
];

