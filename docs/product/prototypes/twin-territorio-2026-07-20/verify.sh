#!/usr/bin/env bash
# Suite de verificación del mockup — clicks con HIT-TESTING REAL (elementFromPoint), no element.click().
# Uso: ./verify.sh   → imprime V8SUITE :: OK ... | ERRS=[]  (34/34 esperado — v18: +v18-directorio-agenda)
set -euo pipefail
cd "$(dirname "$0")"
# index.html es GENERADO desde src/ — se reconstruye antes de probar, así la suite
# jamás corre contra una versión rancia (ver build.py).
python3 build.py >/dev/null
TMP=$(mktemp -d)
cp index.html "$TMP/t.html"
cat >> "$TMP/t.html" <<'EOF'

<style>.world.anim{transition:none!important}</style>
<script>
window.addEventListener('error',e=>{(window.__ERRS=window.__ERRS||[]).push(e.message+' @'+e.lineno)});
function mclick(el,dbl){ if(!el) throw new Error('elemento no encontrado');
  el.scrollIntoView({block:'nearest'}); /* scroll = gesto real; el hit-test sigue */
  let r=el.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
  let t=document.elementFromPoint(x,y);
  const ok=q=>q&&(q===el||el.contains(q)||q.contains(el));
  if(!ok(t)){ /* retry 1: re-encuadrar (Chrome nuevo deja el zoom de la piel anterior) */
    try{ fit(false); }catch(e){} el.scrollIntoView({block:'center'});
    r=el.getBoundingClientRect(); x=r.left+r.width/2; y=r.top+r.height/2; t=document.elementFromPoint(x,y); }
  if(!t) throw new Error('nada en el punto');
  if(!ok(t)) throw new Error('intercepta: '+(t.className||t.tagName));
  t.dispatchEvent(new MouseEvent(dbl?'dblclick':'click',{bubbles:true,clientX:x,clientY:y})); }
/* poll hasta que el hit-testing responda (carrera con el primer layout bajo virtual-time).
   Chrome ≥138 bajo virtual-time corre el script ANTES del primer layout → fit() ve stage 0×0 y
   deja view.z negativo. Remedio: si el hit-test no responde, re-render+fit y seguir esperando. */
let wrTries=0;
function whenReady(cb){ const flush=stage.clientWidth; /* leerlo fuerza layout bajo virtual-time */
  const o=document.querySelector('.obj-node');
  if(o){ const r=o.getBoundingClientRect();
    if(r.width>4 && document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)){ cb(); return; } }
  if((++wrTries%3===0||wrTries>6) && flush>0){ try{ render(); fit(false); applyView(false); }catch(e){} }
  document.title='WARMUP::'+wrTries+' stage='+flush;   /* escribir el título bombea layout bajo virtual-time (Chrome ≥138) */
  setTimeout(()=>whenReady(cb),wrTries>6?400:250); }
window.addEventListener('load',()=>{whenReady(()=>{
  const R=[]; const t=(n,f)=>{try{f();R.push('OK '+n);}catch(e){R.push('FAIL '+n+' :: '+e.message);}};
  const A=(c,m)=>{if(!c)throw new Error(m)}; const eye=()=>document.getElementById('inEye').textContent;
  t('objetivo-hilo+ficha',()=>{ mclick(document.querySelector('.obj-node .nm')); A(state.activeObj,'sin hilo'); A(eye().includes('Objetivo'),eye()); });
  t('chevron-ficha',()=>{ mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta'))); A(eye().includes('Proceso'),eye()); });
  t('dblclick-cobranza-lienzo',()=>{ state.activeObj=null; render();
    mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Cobranza')),true); A(state.escala==='z2','escala='+state.escala); });
  t('volver+soporte-ficha',()=>{ mclick(document.getElementById('back')); mclick(document.querySelector('.soporte .nm')); A(eye().includes('Proceso'),eye()); });
  t('rolchip-puesto',()=>{ mclick(document.querySelector('.rolchip')); A(eye().includes('Puesto'),eye()); });
  t('sysplat-sistema',()=>{ mclick(document.querySelector('.sysplat')); A(eye().includes('Sistema'),eye()); });
  t('pin-brecha',()=>{ mclick(document.querySelector('.pin .body')); A(eye().includes('Brecha'),eye()); });
  t('piel-org+ficha-area',()=>{ mclick(document.querySelector('[data-piel=org]'));
    mclick([...document.querySelectorAll('.area-node .nm')].find(x=>x.textContent==='Finanzas')); A(eye().includes('Área'),eye()); A(state.escala==='z0','no debía drillear: '+state.escala); });
  t('org-dblclick-drill',()=>{ mclick([...document.querySelectorAll('.area-node .nm')].find(x=>x.textContent==='Finanzas'),true); A(state.escala==='z1','escala='+state.escala); });
  t('z1-foco-valor',()=>{ /* v13 firmado 2026-07-26: z1 = el MISMO mapa de valor con foco, no un mundo aparte */
    drillArea('a-tes'); A(state.escala==='z1','escala='+state.escala);
    A(document.querySelector('.chev'),'sin cadena en z1 (mundo aparte revivido?)');
    const lit=document.querySelectorAll('.node.foco,.soporte.foco'); A(lit.length>=3,'foco='+lit.length);
    A(document.querySelectorAll('.node.vecino').length>=1,'sin vecinos de cadena a media luz');
    A(document.querySelectorAll('.node.dim,.soporte.dim').length>=8,'el resto no es fantasma');
    const np=document.querySelectorAll('.pin').length; A(np>=1&&np<=5,'pins fuera de foco: '+np); });
  t('org-nivel4-puestos',()=>{ mclick(document.getElementById('back')); mclick(document.querySelector('[data-lod="4"]'));
    const pr=[...document.querySelectorAll('.prow')]; A(pr.length>=30,'prows='+pr.length);
    const one=pr.find(x=>{const r=x.getBoundingClientRect();return r.top>0&&r.bottom<innerHeight&&r.left>0&&r.right<innerWidth&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);});
    A(one,'sin prow visible'); mclick(one); A(eye().includes('Puesto'),eye());
    mclick(document.querySelector('[data-lod="3"]')); });
  t('capa-trabajo-valor',()=>{ state.escala='z0'; state.foco=null; state.lod=3; setPiel('valor'); render(); fit(false);
    mclick(document.querySelector('[data-capa=trabajo]'));
    const hb=[...document.querySelectorAll('.rolchip .harn[data-h]')].find(x=>{ const r=x.getBoundingClientRect();
      return r.top>0&&r.bottom<innerHeight&&r.left>0&&r.right<innerWidth&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); });
    A(hb,'sin arnés VISIBLE en gente'); mclick(hb); A(eye().includes('Arnés'),eye());
    A(document.getElementById('inBody').innerHTML.includes('deriva_de'),'registro sin deriva_de');
    A(document.getElementById('inBody').innerHTML.includes('mecanismo')||document.querySelector('#inBody .grchip'),'sin guardrails con mecanismo'); });
  t('roster-contador',()=>{ openPuesto('Contador General');
    const body=document.getElementById('inBody'); A(eye().includes('Puesto'),eye());
    A(body.querySelectorAll('.harn').length>=4,'roster corto: '+body.querySelectorAll('.harn').length);
    A(body.innerHTML.includes('sin arnés'),'el gap del roster no se ve'); });
  t('ficha-area-navegable',()=>{ openArea(byId(DATA.areas,'a-tes'));
    const body=document.getElementById('inBody'); A(eye().includes('Área'),eye());
    A(body.querySelectorAll('[data-pu]').length>=3,'sin puestos navegables');
    A(body.querySelectorAll('[data-proc]').length>=3,'sin procesos navegables'); });
  t('salud-lente-conf',()=>{ const b=[...document.querySelectorAll('.sub-t')].find(x=>x.textContent.includes('Confianza')); mclick(b);
    A(state.sub==='conf','sub='+state.sub); const lg=document.querySelector('.sub-leg[data-leg=conf]'); A(lg&&lg.offsetParent,'leyenda conf no visible'); A(lg.textContent.includes('Sólido'),'leyenda vacía'); });
  t('ficha-sipoc+nav',()=>{ state.escala='z0'; state.foco=null; setPiel('valor'); render(); fit(false);
    mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta')));
    const body=document.getElementById('inBody'); A(body.innerHTML.includes('SIPOC'),'sin SIPOC en ficha');
    const up=[...body.querySelectorAll('[data-proc]')].find(x=>x.textContent.includes('Campañas')); A(up,'sin proveedor navegable');
    mclick(up); A(document.getElementById('inTitle').textContent.includes('Campañas'),'nav SIPOC rota'); });
  t('lienzo-vta',()=>{ state.escala='z0'; setPiel('valor'); render(); fit(false);
    mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta')),true);
    A(state.escala==='z2'&&state.lienzo==='p-vta','lienzo='+state.lienzo); A(document.body.textContent.includes('caseta'),'sin carril caseta'); });
  t('lienzo-stub-honesto',()=>{ mclick(document.getElementById('back'));
    mclick([...document.querySelectorAll('.soporte')].find(x=>x.textContent.includes('Nómina')),true);
    A(state.escala==='z2'&&state.lienzo==='p-nom','lienzo='+state.lienzo); A(document.body.textContent.includes('SIN LEVANTAR'),'sin banner honesto'); });
  t('z2-puertos-sipoc',()=>{ mclick(document.getElementById('back'));
    mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Cobranza')),true);
    A(state.escala==='z2','escala='+state.escala); const pb=document.querySelectorAll('.portbox'); A(pb.length===2,'puertos='+pb.length);
    const up=[...document.querySelectorAll('.portbox [data-proc]')].find(x=>x.textContent.includes('Facturación')); A(up,'sin proveedor navegable');
    A(document.body.textContent.includes('Propósito'),'sin C1 en header'); });
  t('z3-instruccion',()=>{ const act3=[...document.querySelectorAll('.act')].find(x=>x.textContent.includes('Contactar')); A(act3,'sin act 03');
    mclick(act3,true); A(state.escala==='z3'&&state.act.ord===3,'act='+JSON.stringify(state.act));
    A(document.querySelectorAll('.tarea').length>=4,'tareas='+document.querySelectorAll('.tarea').length);
    A(document.querySelectorAll('.scorebar').length===2,'sin dos scores M36'); });
  t('z3-flujo-salta',()=>{ const fl=[...document.querySelectorAll('.z3card .loop-it')].find(x=>x.textContent.includes('mora dura')); A(fl,'sin flujo alterno');
    mclick(fl); A(state.escala==='z3'&&state.act.ord===4,'salto roto: '+JSON.stringify(state.act)); });
  t('z3-piso-arnes',()=>{ state.act={pid:'p-cob',ord:3}; render();
    const hb=document.querySelector('.piso-arnes .harn[data-h]'); A(hb,'piso sin arnés');
    mclick(hb); A(eye().includes('Arnés'),eye()); });
  t('z3-back-escalera',()=>{ mclick(document.getElementById('back')); A(state.escala==='z2','back z3→z2 roto: '+state.escala);
    mclick(document.getElementById('back')); A(state.escala==='z0','back z2→z0 roto: '+state.escala); });
  t('rolchip-headcount',()=>{ state.nivel=2; state.escala='z0'; state.act=null; setPiel('valor'); render(); fit(false); const rc=[...document.querySelectorAll('.rolchip .who')].find(x=>/\+\d/.test(x.textContent)); A(rc,'sin headcount ×N en gente'); });
  t('nivel1-directorio',()=>{ gotoNivel(1); A(document.body.textContent.includes('Sala del directorio'),'sin sala');
    A(document.querySelectorAll('.apcard').length>=4,'apuestas='+document.querySelectorAll('.apcard').length);
    A(document.body.textContent.includes('Espera tu decisión'),'sin bandeja'); });
  t('nivel1-varas',()=>{ /* v15: las varas del directorio — rumbo · mezcla de ambición · pares · contraste apetito · escalera
      · v16: rumbo = north-star de 3 renglones (NACD/exception-based reporting) — catchball migra a bandeja,
      dimensión ciega queda SOLO en Alertas (cero repetición del mismo hecho en 2 lugares) */
    gotoNivel(1);
    A(document.querySelector('.rumbo'),'sin banda rumbo');
    A(document.querySelectorAll('.rumbo .brk').length===2,'rumbo sin 2 breakthroughs (meter)');
    A(document.querySelectorAll('.rumbo .brk svg').length===2,'breakthroughs sin gráfico de progreso (meter SVG)');
    A(!document.querySelector('.rumbo').textContent.includes('bajada acordada'),'catchball no debería re-narrarse en rumbo (vive en bandeja)');
    A(document.body.textContent.includes('Cerrar la bajada acordada con Comercial'),'bajada pendiente sin acción en bandeja');
    A(document.body.textContent.includes('ninguna meta la mide'),'dimensión ciega desapareció (debe seguir en Alertas)');
    A(document.querySelectorAll('.mixbar .seg').length===3,'segs='+document.querySelectorAll('.mixbar .seg').length);
    A(document.querySelectorAll('.mixmark').length>=2,'sin marcas de mezcla objetivo');
    const peers=[...document.querySelectorAll('.peer')]; A(peers.length>=2,'chips pares='+peers.length);
    A(peers.every(p=>p.title.length>20),'chip de pares sin fuente+vigencia');
    const apx=document.querySelector('.apcards').textContent;
    A(/excede tu apetito/.test(apx),'sin contraste riesgo↔apetito en apuestas');
    A(/sin definir — fíjalo/.test(apx),'apetito sin definir no se muestra en la apuesta');
    A(/mezcla de ambición/i.test(document.body.textContent),'sin firma de mezcla en bandeja');
    const rail=document.getElementById('inBody');
    A(/aguanta la ambición/i.test(rail.textContent),'rail sin escalera de madurez');
    A(rail.querySelectorAll('.madrow').length===5,'madrow='+rail.querySelectorAll('.madrow').length);
    A(![...document.querySelectorAll('.rumbo,.dpane,.apcard')].some(e=>/\bM\d{2}\b/.test(e.textContent)),'token M-NN visible en nivel 1'); });
  t('nivel1-apuesta-plata',()=>{ /* v15.1 (auditoría del operador): la promesa FinOps del respaldo se CUMPLE en superficie */
    gotoNivel(1);
    A(/persigue .*S\//.test(document.querySelector('.apcards').textContent),'apuestas sin plata en tarjeta');
    openApuesta(DATA.apuestas[1]);
    const fb=document.getElementById('inBody').textContent;
    A(fb.includes('Valor que persigue'),'ficha sin valor en dinero');
    A(fb.includes('Supuesto visible'),'valor sin supuesto');
    A(/excede|al límite|dentro del apetito|sin definir/.test(fb),'ficha sin contraste riesgo↔apetito');
    A(fb.includes('Apostamos'),'ficha sin apetito de apuesta (tiempo·tope)');
    const pane=[...document.querySelectorAll('.dpane')].find(d=>d.textContent.includes('Proyectos en curso'));
    const rows=[...pane.querySelectorAll('.cambio-row')];
    A(rows.length===3,'portafolio filas='+rows.length);
    A(/esperar: S\//.test(rows[0].textContent),'portafolio sin costo de esperar');
    A(rows[0].textContent.includes('Marina')&&rows[2].textContent.includes('exprés'),'portafolio no ordenado por costo de esperar (cerrado al final)');
    state.insp='home'; inspectorHome(); });
  t('metodo-vocabularios',()=>{ /* v15.2 (D-23): el módulo Método explica los valores posibles y su significado */
    state.mod='metodo'; state.insp='home'; render();
    const tx=document.body.textContent;
    ['por sellar','sellada','cumplida','retirada','re-apostar','operar el hoy','expandir','apostar al futuro']
      .forEach(v=>A(tx.includes(v),'vocabulario sin valor: '+v));
    A(tx.includes('re-versionando')||tx.includes('re-versiona'),'re-apostar sin doctrina de re-versión');
    A(tx.includes('NOVEDAD'),'bolsas sin regla de clasificación por novedad');
    A(tx.includes('59 M-cards'),'conteo de cartas desincronizado del catálogo');
    A(tx.includes('20 entidades'),'conteo de entidades sin D-23 ni D-24..D-29');
    state.mod='territorio'; render(); });
  t('a4-a6-salud-prov',()=>{ /* v17.2: salud del objetivo DERIVADA (A4.1) + provenance en TODAS las fichas (A6 a+b) */
    A(DATA.objetivos.every(o=>o.kr.esperado!=null),'KR sin esperado');
    A(DATA.objetivos.every(o=>o.salud===saludKr(o.kr)),'salud no coincide con la derivación');
    const okN=DATA.objetivos.filter(o=>o.salud==='verde').length; A(okN===1,'narrativa cambió: verdes='+okN);
    openObjetivo(byId(DATA.objetivos,'o-caja'));
    A(document.getElementById('inBody').textContent.includes('Esperado a hoy'),'ficha objetivo sin esperado');
    [()=>openObjetivo(DATA.objetivos[0]),()=>openBrecha(byId(DATA.brechas,'g-dso')),()=>openProyecto(byId(DATA.proyectos,'pm-cie')),
     ()=>openRol('Jefe de Cobranza'),()=>openPersona('Lucía Cárdenas Vidal'),()=>openSistema(byId(DATA.sistemas,'s-exc')),
     ()=>openIdea(byId(DATA.ideas,'i-wsp')),()=>openCapability(byId(DATA.capabilities,'c-caja')),()=>openEmpresa()]
      .forEach((f,i)=>{ f(); A(document.getElementById('inBody').textContent.includes('Procedencia'),'ficha sin procedencia #'+i); });
    state.insp='home'; inspectorHome(); });
  t('ficha-objetivo-arriba',()=>{ /* v17.1: el hilo no se corta hacia arriba — ficha objetivo linkea su apuesta */
    openObjetivo(byId(DATA.objetivos,'o-cob'));
    let b=document.getElementById('inBody');
    A(b.textContent.includes('Hacia arriba'),'ficha sin grupo hacia arriba');
    const aplinks=b.querySelectorAll('[data-ap]'); A(aplinks.length===2,'o-cob debe linkear 2 apuestas: '+aplinks.length);
    mclick(aplinks[0]); A(eye().includes('Apuesta'),eye());
    openObjetivo(byId(DATA.objetivos,'o-eq'));
    A(document.getElementById('inBody').textContent.includes('ninguna apuesta'),'objetivo sin apuesta no lo dice (honestidad)');
    state.insp='home'; inspectorHome(); });
  t('nivel3-tactico',()=>{ gotoNivel(3); A(document.querySelectorAll('.tcol').length>=4,'cols='+document.querySelectorAll('.tcol').length);
    A(document.body.textContent.includes('contramedida'),'sin regla de contramedida');
    A(document.body.textContent.includes('Embudo de ideas'),'sin embudo'); gotoNivel(2); });
  t('respaldo-capa',()=>{ /* v14.3/.4: capa Respaldo del método — cita en cabecera + ficha, en TODOS los niveles */
    gotoNivel(1); mclick(document.querySelector('[data-capa=respaldo]'));
    const bs=document.querySelectorAll('[data-resp]'); A(bs.length>=9,'citas n1='+bs.length);
    openRespaldo('dir-cambio30'); A(eye().includes('Respaldo'),eye());
    A(document.getElementById('inBody').textContent.includes('revisión por la dirección'),'ficha sin fuente común');
    A(document.getElementById('inBody').innerHTML.includes('M16'),'ficha sin código de procedencia');
    gotoNivel(3); A(document.querySelectorAll('[data-resp]').length>=5,'nivel 3 sin citas');
    gotoNivel(2); A(document.querySelectorAll('[data-resp]').length>=5,'bandas nivel 2 sin citas');
    setPiel('org'); render(); A(document.querySelector('[data-resp="org-estructura"]'),'organigrama sin cita'); setPiel('valor');
    state.lienzo='p-cob'; state.escala='z2'; render(); A(document.querySelector('[data-resp="z2-flujograma"]'),'z2 sin cita');
    state.act={pid:'p-cob',ord:3}; state.escala='z3'; render();
    A(document.querySelectorAll('[data-resp]').length>=4,'z3 sin citas');
    A([...document.querySelectorAll('.z3card .gt,.piso-arnes')].every(c=>!/M2[35]|M39|M46/.test(c.textContent)),'token M-NN sigue visible en z3');
    state.mod='metodo'; state.insp='home'; render(); A(document.querySelectorAll('[data-resp]').length>=3,'Método sin citas');
    state.mod='cambios'; render(); A(document.querySelectorAll('[data-resp]').length>=3,'Cambios sin citas');
    state.mod='territorio'; state.escala='z0'; state.act=null; render();
    /* v14.5: pie de respaldo automático en TODA ficha de entidad (costura openDrawer) */
    openKpi(DATA.kpis[0]); A(document.querySelector('#inBody .resp-foot [data-resp]'),'ficha kpi sin pie de respaldo');
    openObjetivo(DATA.objetivos[0]); A(document.querySelector('#inBody .resp-foot [data-resp]'),'ficha objetivo sin pie');
    openPuesto('Contador General'); A(document.getElementById('inBody').querySelectorAll('[data-resp]').length>=2,'puesto: pie + roster esperados');
    mclick(document.querySelector('[data-capa=respaldo]'));
    openKpi(DATA.kpis[0]); A(!document.querySelector('#inBody [data-resp]'),'ficha apagada sigue citando');
    state.insp='home'; render();
    A(!document.querySelector('[data-resp]'),'apagada sigue pintando'); gotoNivel(2); });
  t('v17-auditoria-director',()=>{ /* v17: mejoras de la auditoría con ojos de director — jerga fuera de superficie,
      acciones que explican su destino, diff de corrida EN el lienzo, pulso clickeable, selector nivel 4 */
    state.mod='mejora'; state.insp='home'; render();
    const pv=document.querySelector('.pageview');
    ['funil','money shot','rankeadas','in-tool','en vuelo','tollgate'].forEach(w=>A(!pv.textContent.toLowerCase().includes(w),'jerga viva en Mejora: '+w));
    openProyecto(byId(DATA.proyectos,'pm-mar'));
    const fb=document.getElementById('inBody').textContent;
    A(!/tollgate|MASP/i.test(fb),'jerga viva en ficha proyecto');
    A(fb.includes('Avanzar de fase'),'sin acción avanzar de fase');
    A(fb.includes('ROI'),'ROI sin etiqueta en ficha');
    const n0=SOLICITUDES.length;
    ejecutarAccion({dataset:{acc:'avanzar-tollgate'},classList:{}});
    A(SOLICITUDES.length===n0+1,'la acción no creó solicitud');
    A(document.getElementById('toast').textContent.includes('responsable del proceso'),'toast genérica sin destino');
    A(document.querySelector('#toast .tlink'),'toast sin link a la cola de Cambios');
    state.mod='cambios'; state.insp='home'; render();
    A(document.body.textContent.includes('EN COLA · recién enviada'),'la solicitud no aparece en la cola de Cambios');
    state.mod='territorio'; state.nivel=2; state.escala='z0'; state.insp='home'; render();
    const dot=document.querySelector('.pulso-dots i[data-obj]'); A(dot,'pulso sin punto clickeable');
    A(dot.title.length>25&&dot.title.includes('meta'),'punto del pulso sin meta/valor en el title');
    state.corrida=true; drillLienzo('p-cob');
    A(document.querySelector('.act.ghost'),'corrida sin actividad fantasma en el lienzo');
    state.corrida=false;
    gotoNivel(4); A(document.getElementById('procSel'),'nivel 4 sin selector de proceso');
    gotoNivel(2);
    A(document.getElementById('back').title.length>10,'Big picture deshabilitado sin explicación');
    gotoNivel(1); A(document.querySelector('.search').title.length>10,'búsqueda deshabilitada sin explicación');
    gotoNivel(2); });
  t('v18-directorio-agenda',()=>{ /* v18: la sesión como agenda de 4 movimientos + los 3 bloques de gobierno
      (resultado/caja/inversiones · presupuesto/riesgos/acuerdos/valor cobrado · alcance contable) */
    gotoNivel(1);
    const pv=document.querySelector('.pageview');
    A(document.querySelectorAll('.secband').length===4,'movimientos='+document.querySelectorAll('.secband').length);
    ['¿Cómo nos fue?','¿A dónde vamos?','¿Qué puede impedirlo?','¿Qué decidimos?'].forEach(q=>A(pv.textContent.includes(q),'falta el movimiento: '+q));
    /* movimiento 1 — el resultado del periodo, con variación contra plan y contra el año pasado */
    const tiles=[...document.querySelectorAll('.ftile')]; A(tiles.length===6,'cifras='+tiles.length);
    A(tiles.every(x=>/vs plan/.test(x.textContent)&&/vs año pasado/.test(x.textContent)),'cifra sin referencia (plan/año pasado)');
    A(tiles.every(x=>/año: /.test(x.textContent)),'cifra sin acumulado del año');
    A(pv.textContent.includes('dato preliminar'),'las cifras no declaran su estado de cierre');
    mclick(tiles[0]); A(eye().includes('Cifra'),eye());
    A(document.getElementById('inBody').textContent.includes('reexpresa'),'la ficha de cifra no declara el alcance');
    /* la caja: proyección, piso y resguardos — y la confianza degradada por la vacante */
    A(document.querySelector('.cajasvg svg'),'sin proyección de caja');
    A(cajaBajoPiso()>0,'la casuística de caja bajo el piso se perdió');
    A(pv.textContent.includes('Tesorería está vacante'),'la caja no confiesa quién NO la firma');
    A(/no más de 1\.8|al menos 2\.5/.test(pv.textContent),'sin límites con el banco');
    /* movimiento 2 — la apuesta ya no sólo promete: rinde */
    const apx=document.querySelector('.apcards').textContent;
    A(/cobrado/.test(apx),'apuestas sin valor cobrado (promete y nunca rinde)');
    A(DATA.apuestas.every(a=>'cobrado' in a.valor),'apuesta sin campo de cobro');
    A(/aún no aplica/.test(apx),'la apuesta sin sellar no dice honestamente que no cobró nada');
    A(document.querySelectorAll('.budgrow').length===3,'presupuesto sin las tres bolsas');
    openPresupuesto(); A(eye().includes('Presupuesto'),eye());
    A(document.getElementById('inBody').textContent.includes('sobre S/ 500k'),'sin umbrales de facultades');
    /* movimiento 3 — riesgos contra el apetito · inversiones con avance real vs declarado */
    const rg=[...document.querySelectorAll('.rgrow')]; A(rg.length===6,'riesgos='+rg.length);
    A(rg.some(x=>/por encima del apetito/.test(x.textContent)),'ningún riesgo se contrasta contra la vara');
    openRiesgo(byId(DATA.riesgos,'r-caj'));
    A(eye().includes('Riesgo'),eye());
    A(document.getElementById('inBody').textContent.includes('probabilidad × impacto'),'nivel de riesgo sin derivación declarada');
    const iv=[...document.querySelectorAll('.invrow')]; A(iv.length===3,'inversiones='+iv.length);
    A(iv[0].textContent.includes('8 pts'),'el desvío avance real vs declarado no se ve');
    openInversion(byId(DATA.inversiones,'iv-mar'));
    A(/valoriza|inflado/.test(document.getElementById('inBody').textContent),'la inversión no conecta con la valorización contable');
    /* movimiento 4 — decisiones de plata (no sólo configurar el modelo) + acuerdos */
    state.insp='home'; render();
    const band=[...document.querySelectorAll('.dpane.solid .cambio-row')].map(x=>x.textContent).join(' ');
    A(/línea de capital de trabajo/.test(band),'la bandeja no tiene decisiones de plata');
    A(/presupuesto del año/.test(band),'la bandeja no pide aprobar el presupuesto');
    A(/límite de endeudamiento|límite de inversión/.test(band),'la decisión no dice por qué le llega al directorio');
    const acu=[...document.querySelectorAll('.acurow')]; A(acu.length===5,'acuerdos='+acu.length);
    A(acu.some(x=>x.textContent.includes('vencido')),'ningún acuerdo vencido — se pierde el punto que abre la sesión');
    openAcuerdo(byId(DATA.acuerdos,'ac-41')); A(eye().includes('Acuerdo'),eye());
    A(document.body.textContent.includes('generar el acta'),'la sesión no cierra en acta');
    /* bloque C — el alcance: enlazar, jamás reexpresar. La norma vive DENTRO de la ficha, nunca en pantalla */
    state.insp='home'; render();
    A(!/NIIF|NIC \d/.test(document.querySelector('.pageview').textContent),'código de norma contable visible en pantalla');
    openAlcanceContable(); const ab=document.getElementById('inBody').textContent;
    A(eye().includes('Alcance'),eye());
    A(/No arma el juego completo/.test(ab),'el alcance no declara lo que NO hace');
    A(/NIIF 15|NIIF 9/.test(ab),'el puente no cita la norma como procedencia');
    A(/avance REAL, no el declarado/.test(ab),'el puente no ancla la valorización al twin');
    /* paralelismo con cualquier industria — visible, no sólo prometido */
    state.insp='home'; render();
    const par=[...document.querySelectorAll('.pageview .paral')]; A(par.length>=6,'líneas de equivalencia='+par.length);
    A(par.filter(x=>/manufactura|retail|banca|servicios|industria/.test(x.textContent)).length>=5,'las equivalencias no nombran otras industrias');
    /* el inspector deja de repetir la página y pasa a ser el índice de la sesión */
    A(document.querySelectorAll('#inBody .loop-it.mov').length===4,'inspector sin índice de movimientos');
    A(!document.getElementById('inBody').textContent.includes('KRs en banda'),'el inspector sigue duplicando el pulso de la página');
    A(document.getElementById('inBody').textContent.includes('aguanta la ambición'),'se perdió la escalera de madurez');
    /* la página es un documento: la rueda RECORRE, no hace zoom.
       (el alto real del canvas lo fija el rAF de pageView — bajo virtual-time se fuerza a mano) */
    setCanvas(1360, document.querySelector('.pageview').offsetHeight+80); fitPagina(false);
    A(state.ch>1800,'la sesión dejó de ser una página larga: ch='+state.ch);
    const z0=view.z, y0=view.y;
    stage.dispatchEvent(new WheelEvent('wheel',{deltaY:400,bubbles:true,cancelable:true}));
    A(view.z===z0,'la rueda hizo zoom sobre un documento');
    A(view.y<y0,'la rueda no recorre la página');
    irMovimiento(3); A(view.y<0,'el salto a un movimiento no mueve la página');
    gotoNivel(2); });
  R.push('ERRS='+JSON.stringify(window.__ERRS||[]));
  document.title='V8SUITE :: '+R.join(' | ');
});});
</script>
EOF
# Reintento automático: el PRIMER arranque de Chrome con perfil nuevo pierde la carrera
# contra el primer layout bajo virtual-time (flaky en frío conocido). Antes había que
# re-correr a mano; ahora la suite lo absorbe — 3 intentos, perfil nuevo cada vez.
for intento in 1 2 3; do
  if google-chrome --headless=new --disable-gpu --user-data-dir="$TMP/profile-$intento" \
       --window-size=1680,1050 --virtual-time-budget=40000 --dump-dom "file://$TMP/t.html" 2>/dev/null \
       | grep -o '<title>V8SUITE[^<]*'; then
    rm -rf "$TMP"; exit 0
  fi
  [ "$intento" -lt 3 ] && echo "(intento $intento sin resultado — reintentando)" >&2
done
rm -rf "$TMP"
echo "SIN RESULTADO tras 3 intentos — revisar errores JS"; exit 1
