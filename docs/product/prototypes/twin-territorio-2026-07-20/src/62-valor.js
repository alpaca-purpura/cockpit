/* ---------- z0 · piel MAPA DE VALOR (default) — 5 bandas, un sistema interconectado ----------
   Geografía: ISO 9001 enfoque a procesos (estratégico/misional/apoyo) × cadena de valor Porter ×
   strategy map absorbido en la banda Estrategia. El hilo de oro = edges VERTICALES reales.
   Mismo ADN de bandas que harness-studio (map-canvas): fractal con el arnés. Decisión v6 (2026-07-24). */
function renderValor(){
  const W=1840, Y={est:170, cad:480, apo:770, gen:965, sis:1150}; setCanvas(W, 1300);
  const searching=!!q();
  const act=state.activeObj;
  const hiloOn=state.capas.has('hilo');
  /* — v13 · FOCO DE ÁREA (firmado 2026-07-26): z1 no es un mundo aparte — es este mismo mapa
     con el área como lente. Sus procesos se encienden EN SU LUGAR (banda/orden intactos),
     los vecinos inmediatos de cadena quedan a media luz (fronteras del área), el resto es
     fantasma. Pins, cinética e hilo se restringen al set enfocado. — */
  const focoA = state.escala==='z1' ? byId(DATA.areas, state.foco) : null;
  const focoSet = focoA ? new Set(descendants(focoA.id)) : null;
  const focoProcs = focoA ? new Set(subtreeProcs(focoA.id).map(p=>p.id)) : null;
  const enFoco = pid => !!(focoProcs && focoProcs.has(pid));
  const vecinos = new Set();
  if(focoA) DATA.cadena.forEach((pid,i)=>{ if(enFoco(pid))
    [DATA.cadena[i-1],DATA.cadena[i+1]].forEach(v=>{ if(v&&!enFoco(v)) vecinos.add(v); }); });
  const focoCls = pid => !focoA ? '' : (enFoco(pid) ? 'foco' : vecinos.has(pid) ? 'vecino' : 'dim');
  const focoObjs = new Set();
  if(focoA) DATA.procesos.forEach(p=>{ if(enFoco(p.id)) p.sirve.forEach(o=>focoObjs.add(o)); });
  const focoPts = [];
  // el conjunto encendido: objetivo activo + sus drivers + roles + sistemas (spine del hilo)
  const drivers=act?DATA.procesos.filter(p=>p.sirve.includes(act)).map(p=>p.id):null;
  const hotProc=id=>drivers&&drivers.includes(id);
  const hotRol=new Set(), hotSis=new Set();
  if(drivers) drivers.forEach(id=>{ const p=byId(DATA.procesos,id);
    hotRol.add(p.dueno.replace(/\s*\(vacante\)/i,'')); p.sist.forEach(s=>{const x=sisByName(s); if(x)hotSis.add(x.id);}); });
  const dimIf=c=>act&&!c?'dim':'';

  const bandLab=(y,t,sub)=>{ const l=el('div','grouplab'); l.style.left='30px'; l.style.top=(y-60)+'px';
    l.innerHTML=`<span class="eyebrow">${t}</span>${sub?`<div style="font-size:9.5px;color:var(--tx-faint);margin-top:2px">${sub}</div>`:''}`;
    $nodes.appendChild(l); pathEl(`M24,${y-72} L${W-24},${y-72}`,'#243330',1,.95); };

  /* — banda 1 · ESTRATEGIA (objetivos por perspectiva; causalidad BSC = arcos DENTRO de la banda) — */
  bandLab(Y.est,'Estrategia — objetivos del directorio · KR del trimestre'+respBadge('z0-estrategia'),'perspectivas BSC como orden, no como piel: financiera · cliente · procesos · aprendizaje');
  const PERSP=['financiera','cliente','procesos','aprendizaje'];
  const oPos={}; let ox=120;
  PERSP.forEach(pk=>{
    const objs=DATA.objetivos.filter(o=>o.persp===pk); if(!objs.length)return;
    const lab=el('div','grouplab'); lab.style.left=ox+'px'; lab.style.top=(Y.est-14)+'px';
    lab.innerHTML=`<span class="persp-lab">${pk}</span>`; $nodes.appendChild(lab);
    objs.forEach(o=>{ oPos[o.id]={x:ox+92,y:Y.est+54}; ox+=204; }); ox+=34;
  });
  DATA.bscEdges.forEach(([a,b])=>{ const A=oPos[a],B=oPos[b]; if(!A||!B)return;
    pathEl(`M${A.x},${A.y-34} C${A.x},${A.y-72} ${B.x},${B.y-72} ${B.x},${B.y-34}`,'var(--teal-700)',1.1, act?( [a,b].includes(act)?.6:.08 ):.22); });
  DATA.objetivos.forEach(o=>{ const p=oPos[o.id]; if(!p)return;
    const n=el('button','node '+dimIf(act===o.id)); n.style.left=p.x+'px'; n.style.top=p.y+'px';
    MM_PTS.push(p);
    if(searching && !(o.nm+' '+o.kr.m).toLowerCase().includes(q())) n.classList.add('dim');
    if(focoA){ if(!focoObjs.has(o.id)) n.classList.add('dim'); else focoPts.push(p); }   // v13: foco — solo objetivos que el área sostiene
    n.innerHTML=`<div class="obj-node ${act===o.id?'hot':''}" style="width:188px">
      <span class="health-dot" style="background:${health[o.salud]};float:right;margin-top:2px"></span>
      <div class="nm" style="font-size:11.5px">${tbadge('objetivo','objetivo · Goal/Outcome (M13 ArchiMate, Motivation)')}${o.nm}</div>
      <div class="kr"><span class="m">${o.kr.m}</span><span class="from">${o.kr.from}</span><span class="ar">→</span><span class="cur">${o.kr.cur}</span><span class="ar">→</span><span class="to">${o.kr.to}</span><span class="u">${o.kr.u}</span></div>
    </div>`;
    n.querySelector('.obj-node').onclick=()=>{ state.activeObj=act===o.id?null:o.id; render(); if(state.activeObj===o.id) openObjetivo(o); };
    $nodes.appendChild(n);
  });

  /* — banda 2 · CADENA DE VALOR (misionales, izq→der; cada proceso = mini-mapa de pasos) — */
  bandLab(Y.cad,'Cadena de valor — los procesos misionales, en el orden del negocio'+respBadge('z0-cadena'),'cada proceso es un mini-mapa: sus pasos como micro-chevrons · doble-click = lienzo (mismo lenguaje que un arnés en Arnesia)');
  const cPos={}; const cx0=120, cw=192, cgap=32;
  DATA.cadena.forEach((pid,i)=>{
    const p=byId(DATA.procesos,pid); const x=cx0+i*(cw+cgap)+cw/2, y=Y.cad+64; cPos[pid]={x,y};
    MM_PTS.push({x,y});
    if(i<DATA.cadena.length-1){ const dimArrow=focoA&&!(enFoco(pid)||enFoco(DATA.cadena[i+1]));
      const a=el('div','chev-arrow'+(dimArrow?' dim':''),'▸'); a.style.left=(x+cw/2+cgap/2)+'px'; a.style.top=y+'px'; $pins.appendChild(a); }
    const ks=state.capas.has('hilo')?kpisByProc(pid):[];
    const ld=lienzoData(pid);
    const steps=ld?ld.acts.map(a2=>({v:a2.verbo,t:a2.triage})):(DATA.pasosMini[pid]||[]).map(v=>({v}));
    const dc=state.capas.has('salud')?(state.sub==='conf'?confCol(p.conf):health[digHealth(p.digital)]):'#2a3733';
    const hot=hotProc(pid);
    const n=el('button','node '+(hot?'hot':dimIf(false||hot))); if(act&&!hot)n.classList.add('dim');
    if(focoA){ n.classList.remove('dim'); const fc=focoCls(pid); if(fc)n.classList.add(fc); if(enFoco(pid))focoPts.push({x,y}); }
    if(searching&&!procMatch(p))n.classList.add('dim');
    n.style.left=x+'px'; n.style.top=y+'px';
    n.innerHTML=`<div class="chev">
      <div style="display:flex;gap:7px;align-items:flex-start"><span class="health-dot" style="background:${dc}"></span><div class="nm">${tbadge('proceso','proceso · Business Process (M13 ArchiMate)')}${p.nm}</div></div>
      <div class="dueno"><span class="plnk" data-rol="${p.dueno}">${p.dueno}</span> · <span style="color:var(--brand-hi)" title="doble-click abre el flujograma">lienzo ›</span></div>
      <div class="mini-pasos">${steps.map(s=>`<i title="${s.v}${s.t?' · '+s.t:''}" class="${s.t?('t-'+(s.t.includes('rpa')?'rpa':s.t.includes('agente')?'agente':s.t==='eliminable'?'elim':'hum')):''}"></i>`).join('')}</div>
      ${ks.length?`<div class="kpis-mini">${ks.map(krowHTML).join('')}</div>`:''}
      ${state.capas.has('trabajo')?`<div style="margin-top:6px">${harnBadge(arnesDe(p.dueno,p.id))}</div>`:''}
    </div>`;
    const card=n.querySelector('.chev');
    if(state.corrida && pid==='p-cob'){ n.classList.add('diff');   // v17: el diff de la corrida se ve EN el mapa, no solo en el panel
      card.insertAdjacentHTML('beforeend','<span class="dtag" title="La simulación propone +1 actividad (portal de pagos) — doble-click y la ves punteada en el lienzo">Δ +1 actividad</span>'); }
    card.onclick=()=>openProceso(p);
    card.ondblclick=()=>drillLienzo(p.id);
    n.querySelectorAll('.krow').forEach(b=>b.onclick=e=>{ e.stopPropagation(); openKpi(byId(DATA.kpis,b.dataset.k)); });
    wireLinks(n);
    $nodes.appendChild(n);
  });

  /* — banda 3 · APOYO (transversales ANCHOS: el ancho dice cuánto cruzan) — */
  bandLab(Y.apo,'Procesos de apoyo — sostienen la cadena'+respBadge('z0-apoyo'),'transversal = más ancho: cruza más áreas · mismo click = ficha');
  const apoyo=DATA.procesos.filter(p=>!DATA.cadena.includes(p.id)).sort((a,b)=>b.areas.length-a.areas.length);
  const aPos={}; let ax=120, ay=Y.apo+8, row=0;
  apoyo.forEach(p=>{
    const wPx=118+p.areas.length*62;
    if(ax+wPx>W-60){ ax=120; ay+=58; row++; }
    aPos[p.id]={x:ax+wPx/2,y:ay};
    const dc=state.capas.has('salud')?(state.sub==='conf'?confCol(p.conf):health[digHealth(p.digital)]):'#2a3733';
    const hot=hotProc(p.id);
    const s=el('button','soporte '+(hot?'hot':'')); if(act&&!hot)s.classList.add('dim');
    if(focoA){ s.classList.remove('dim'); const fc=focoCls(p.id); if(fc)s.classList.add(fc); if(enFoco(p.id))focoPts.push(aPos[p.id]); }
    if(searching&&!procMatch(p))s.classList.add('dim');
    s.style.left=ax+'px'; s.style.top=ay+'px'; s.style.width=wPx+'px';
    s.innerHTML=`<div style="display:flex;gap:7px;align-items:center"><span class="health-dot" style="width:7px;height:7px;background:${dc}"></span><span class="nm">${tbadge('proceso','proceso · Business Process (M13 ArchiMate)')}${p.nm}</span>${p.areas.length>1?`<span class="tag" style="margin-left:auto">cruza ${p.areas.length}</span>`:''}</div>
      <div class="meta">${p.dueno}${state.capas.has('trabajo')?' '+harnBadge(arnesDe(p.dueno,p.id)):''}</div>`;
    s.onclick=()=>openProceso(p); s.ondblclick=()=>drillLienzo(p.id); wireLinks(s);
    MM_PTS.push(aPos[p.id]);
    $nodes.appendChild(s); ax+=wPx+18;
  });

  /* — banda 4 · GENTE & ARNESES — PUESTOS que operan la cadena (D-19; la nómina completa vive en el Organigrama) — */
  const cadenaPuestos=PUESTOS.filter(p=>p.pares.length);
  bandLab(Y.gen+row*58,'Gente & arneses — quién opera la cadena'+respBadge('z0-gente'),
    `puesto = posición (se ocupa, reporta) · agrega N roles (carriles) · ⛨ = roster compilado del twin (capa Trabajo) · métricas por puesto/rol, jamás por persona · <span class="plnk" onclick="setPiel('org');render()" title="la estructura completa — el plano de los puestos">los ${PUESTOS.length} puestos de la nómina → Organigrama ›</span>`);
  const gy=Y.gen+row*58+6;
  const rPos={}; let rx=120, ry=gy;
  cadenaPuestos.forEach(pu=>{ const r=pu.nm;
    const occ=puestoOcupante(r);
    const hot=hotRol.has(r);
    const c=el('button','rolchip '+(hot?'hot':'')); if(act&&!hot)c.classList.add('dim');
    if(focoA){ c.classList.remove('dim');
      if(!(pu.pares.some(x=>focoProcs.has(x.proc))||focoSet.has(pu.area))) c.classList.add('dim'); }
    const nOcc=puestoOcupantes(r).length;
    c.innerHTML=`${tbadge('puesto','puesto · posición del organigrama (D-19 · ArchiMate Business Actor)')}${r}<span class="who">${occ.vac||!nOcc?'—':(occ.quien.split(' ')[0]+(nOcc>1?' +'+(nOcc-1):''))}</span>${state.capas.has('trabajo')?rosterBadge(r):''}`;
    $nodes.appendChild(c);
    const wCh=c.offsetWidth||(r.length*6.4+70);
    if(rx+wCh>W-60){ rx=120; ry+=46; }              // wrap REAL: nueva fila, no encima
    c.style.left=rx+'px'; c.style.top=ry+'px';
    c.onclick=()=>openPuesto(r); wireLinks(c);
    rPos[r]={x:rx+wCh/2,y:ry}; rx+=wCh+14;
    if(focoA && !c.classList.contains('dim')) focoPts.push(rPos[r]);   // v13: la gente del área entra al encuadre
  });

  /* — banda 5 · SISTEMAS (plataformas: ancho = cuántos procesos sirven · pulso al lakehouse) — */
  const ySis=Math.max(Y.sis+row*58, ry+86);   // la banda Gente creció (nómina completa) → Sistemas cede, no se solapa
  bandLab(ySis,'Sistemas — sobre qué corre todo'+respBadge('z0-sistemas'),'ancho = procesos que sirve · el lakehouse (N16) los observa: ese es el pulso del twin');
  let sy2=ySis+4, sx=120; const sPos={};
  DATA.sistemas.forEach(s2=>{
    const served=DATA.procesos.filter(p=>p.sist.includes(s2.nm)).length;
    const wPx=96+served*34;
    if(sx+wPx>W-60){ sx=120; sy2+=44; }          // wrap real (11 sistemas ya no caben en una fila)
    const hot=hotSis.has(s2.id);
    const b=el('button','sysplat '+(hot?'hot':'')); if(act&&!hot)b.classList.add('dim');
    if(focoA && !DATA.procesos.some(p=>enFoco(p.id)&&p.sist.includes(s2.nm))) b.classList.add('dim');
    b.style.left=sx+'px'; b.style.top=sy2+'px'; b.style.width=wPx+'px';
    b.innerHTML=`${tbadge('sistema','sistema · Application Component (M13 ArchiMate)')}<span class="health-dot" style="width:7px;height:7px;background:${health[digHealth(s2.digital)]}"></span>${s2.nm}<span style="margin-left:auto;font-size:8.5px;color:var(--tx-faint)">${served} proc</span>`;
    b.onclick=()=>openSistema(s2);
    sPos[s2.id]={x:sx+wPx/2,y:sy2};
    $nodes.appendChild(b); sx+=wPx+16;
  });
  setCanvas(W, Math.max(920, sy2+130));

  /* — capas Brechas + Cinética sobre la geografía de valor (pin/token sobre SU proceso) — */
  if(state.capas.has('brechas')) DATA.brechas.forEach(g=>{
    if(act&&g.obj!==act)return;
    if(focoA&&!enFoco(g.against))return;   // v13: en foco, solo las brechas del área
    const P=cPos[g.against]||aPos[g.against]; if(!P)return;
    const pin=el('div','pin '+(g.sev==='alta'?'':g.sev==='media'?'med':'low'));
    pin.style.left=(P.x+56)+'px'; pin.style.top=(P.y-58)+'px';
    pin.innerHTML=`<div class="body" style="white-space:nowrap">▲ ${g.sev} · ${g.costo}</div><div class="stem"></div><div class="head"></div>`;
    pin.title=g.nm; pin.onclick=()=>openBrecha(g); $pins.appendChild(pin);
  });
  if(state.capas.has('cinetica')) DATA.proyectos.filter(pm=>pm.estado!=='cerrado').forEach(pm=>{
    const g=byId(DATA.brechas,pm.brecha), pr=g&&byId(DATA.procesos,g.against), P=pr&&(cPos[pr.id]||aPos[pr.id]); if(!P)return;
    if(focoA&&!enFoco(pr.id))return;   // v13: en foco, solo la cinética del área
    const k=el('div','kin'); k.style.left=P.x+'px'; k.style.top=(P.y+92)+'px';
    k.innerHTML=`${iico('proyecto','proyecto de mejora · Work Package (M13 ArchiMate)')}<span class="spark"></span><span class="pdca">${pm.pdca}</span>${pm.nm} · ROI ${pm.roi}`;
    k.onclick=()=>openProyecto(pm); $pins.appendChild(k);
  });

  /* — EL HILO: edges verticales cruzando las bandas (tenues siempre; encendidos con el objetivo activo) — */
  const eop=(on)=>focoA?(on?.6:.04):act?(on?.75:.05):(hiloOn?.13:.05);   // v13: en foco, el hilo del área
  DATA.objetivos.forEach(o=>{ const A=oPos[o.id]; if(!A)return;
    DATA.procesos.filter(p=>p.sirve.includes(o.id)).forEach(p=>{
      const B=cPos[p.id]||aPos[p.id]; if(!B)return;
      pathEl(vcurve(A.x,A.y+40,B.x,B.y-46),'var(--teal-500)',1.2,eop(focoA?enFoco(p.id):act===o.id)); });
  });
  DATA.procesos.forEach(p=>{ const A=cPos[p.id]||aPos[p.id]; if(!A)return;
    const core=p.dueno.replace(/\s*\(vacante\)/i,''); const R=rPos[core];
    if(R) pathEl(vcurve(A.x,A.y+52,R.x,R.y-16),'#3d4f4a',1,eop(focoA?enFoco(p.id):hotProc(p.id)));
    p.sist.forEach(sn=>{ const s2=sisByName(sn); const S=s2&&sPos[s2.id]; if(!S)return;
      pathEl(vcurve(A.x,A.y+52,S.x,S.y-14),'#33413e',0.9,eop(focoA?enFoco(p.id):hotProc(p.id))*0.8); });
  });

  if(focoA){
    const ng=DATA.brechas.filter(g=>enFoco(g.against)).length;
    counter(`Foco: ${focoA.nm} · ${focoProcs.size} procesos en su lugar del mapa · ${ng} brechas · Territorio ‹ sale del foco`);
    fitPts(focoPts);
  } else {
    counter(`${DATA.cadena.length} misionales · ${apoyo.length} apoyo · ${cadenaPuestos.length}/${PUESTOS.length} puestos · ${DATA.sistemas.length} sistemas`);
    if(firstLoad){ firstLoad=false; fitEncuadre(); } else fit();
  }
}

/* ---------- z1 área = FOCO del mapa de valor (v13 — renderArea MURIÓ, decisión firmada 2026-07-26):
   drillArea solo fija el lente; renderValor pinta el mismo territorio con el área encendida ---------- */
function drillArea(id){ state.nivel=2; state.escala='z1'; state.foco=id; state.insp='home'; render(); }

