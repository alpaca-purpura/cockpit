/* ---------- módulo Mejora: el loop brecha → proyecto → KPI movido ---------- */
/* ---------- v14 · NIVEL 1 — sala del directorio como tablero (la sala de mando, promovida) ---------- */
function bandejaRows(items){ return items.map(r=>`<button class="cambio-row${r.warn?' warnrow':''}" ${r.go||''}>
    <span class="sc">${r.warn?'▲':'·'}</span><div><div class="tt">${r.t}</div>${r.d?`<div class="ap">${r.d}</div>`:''}</div>
    <span class="ap">${r.apr}</span></button>`).join(''); }
function renderDirectorio(){
  const objOf=id=>byId(DATA.objetivos,id);
  const stAp=a=>{ const ss=a.objetivos.map(id=>objOf(id).salud); return ss.includes('rojo')?'rojo':ss.includes('ambar')?'ambar':'verde'; };
  const sts=DATA.apuestas.map(stAp), nG=sts.filter(s=>s==='verde').length, nA=sts.filter(s=>s==='ambar').length, nR=sts.filter(s=>s==='rojo').length;
  const ciclo=state.ciclo==='okr'?'este trimestre':state.ciclo==='gpd'?'este año':'trimestre + año';
  /* v15 · las varas: mezcla real (rollup al leer); contraste/codMes ahora globales (v15.1 — los usa también la ficha) */
  const mx=mezclaReal(), mo=DATA.mezclaObjetivo, rb=DATA.rumbo;
  const bandeja=[
    {t:'Sellar la apuesta "Digitalizar la cobranza"', d:'apuesta nueva — su objetivo va en rojo', apr:'gestión-de-cambios', go:'data-ap="ap-cob"'},
    {t:'Aprobar el acta de "Cobranza digital · fase 1"', d:'doble firma: patrocinador ✓ · finanzas pendiente', apr:'gestión-de-cambios', go:'data-pm="pm-cob" data-pm2="pm-cob"'},
    {t:'Fijar el apetito de riesgo de expansión (sin definir)', apr:'gestión-de-cambios', go:'data-acc="fijar-apetito"'},
    {t:'Fijar la mezcla de ambición del año', d:`hoy corre el default de industria ${mo.operar}/${mo.expandir}/${mo.transformar} — la mezcla es apetito hecho asignación`, apr:'gestión-de-cambios', go:'data-acc="fijar-mezcla"'},
  ];
  if(rb.bajada.pendiente){ const ga=DATA.areas.find(x=>x.nm===rb.bajada.pendiente);
    bandeja.push({t:`Cerrar la bajada acordada con ${rb.bajada.pendiente}`, d:`acuerdo ida-y-vuelta cerrado con ${rb.bajada.acordadas}/${rb.bajada.de} gerencias — falta negociar factibilidad con esta`, apr:'gestión-de-cambios', go:ga?`data-area="${ga.id}"`:''}); }
  if(state.ciclo!=='okr') bandeja.push({t:'Decidir qué metas pagan bono este año ★', d:'acople compensación — solo en modo anual/mixto (RN-14)', apr:'gestión-de-cambios', go:'data-acc="convocar-cuentas"'});
  /* v16 · rumbo: cada breakthrough = meter (dataviz skill, "ratio contra límite") coloreado por salud + contraste
     riesgo↔apetito en el title (progressive disclosure, no ruido en superficie) — cero dato nuevo, todo derivado */
  const brkHTML=rb.anio.map(oid=>{ const o=objOf(oid), ap=DATA.apuestas.find(a=>a.objetivos.includes(oid)),
      ct=ap?contraste(ap):null, p=krProg(o);
    return `<button class="brk" data-obj="${oid}"${ct?` title="${ct.t.replace(/"/g,'&quot;')}"`:''}>
      <span class="brknm">${o.nm}${o.bono?' <b style="color:var(--warn)">★</b>':''}</span>
      <svg width="88" height="8" viewBox="0 0 88 8" aria-hidden="true">
        <rect x="0" y="2" width="88" height="4" rx="2" fill="var(--border)"/>
        <rect x="0" y="2" width="${(p*88).toFixed(1)}" height="4" rx="2" fill="${health[o.salud]}"/>
      </svg>
      <span class="mtrlab">${o.kr.cur}${o.kr.u} <span style="color:var(--tx-faint)">/</span> ${o.kr.to}${o.kr.u}</span></button>`; }).join('');
  const pv=pageView(`
    <div class="pv-hd"><span class="eyebrow">Nivel 1 · Directorio — la apuesta y el riesgo · sesión mensual</span>
      <h2>Sala del directorio</h2>
      <div class="sub">Pocas apuestas, el riesgo contra el apetito y solo las excepciones que escalaron. El directorio no navega el detalle: decide — y cada decisión queda en el historial de la organización.</div></div>
    <div class="rumbo"><div class="pt">El rumbo — lo que este directorio prometió${respBadge('dir-rumbo')}</div>
      <div class="rrow"><span class="k">Visión ${rb.vision.h}</span>«${rb.vision.t}»</div>
      <div class="rrow brks"><span class="k">Este año</span>${brkHTML}</div>
      <div class="rrow"><span class="k">Este trimestre</span>${DATA.apuestas.length} apuestas · ${DATA.objetivos.length} metas</div>
    </div>
    <span class="eyebrow">Las apuestas — clic = ficha y acciones · lo que las sostiene vive en el nivel 2${respBadge('dir-apuestas')}</span>
    <div class="apcards" style="margin-top:8px">${DATA.apuestas.map((a,i)=>{ const objs=a.objetivos.map(objOf), ct=contraste(a);
      return `<button class="apcard" data-ap="${a.id}"><span class="un">apuesta ${a.estado==='por-sellar'?'· <b style="color:var(--warn)">por sellar</b>':'· '+a.estado} · ${AMBICION[a.ambicion]}</span>
        <span class="nm">${a.nm}</span>
        <span class="mt" style="color:var(--brand-hi)" title="Supuesto: ${a.valor.supuesto}">persigue ${a.valor.s}</span>
        <span class="mt"><span class="health-dot" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${health[sts[i]]};margin-right:5px"></span>${objs.map(o=>o.kr.m).join(' · ')}</span>
        <span class="mt">riesgo <b style="color:${a.riesgo==='alto'?'var(--crit)':'var(--warn)'}">${a.riesgo}</b> · sostiene ${objs.length} objetivo${objs.length>1?'s':''}</span>
        <span class="mt" style="color:${ct.c}">${ct.t}</span></button>`; }).join('')}</div>
    <div class="dirgrid">
      <div class="dpane"><div class="pt">Las varas del directorio — riesgo que toleras · futuro que compras${respBadge('dir-varas')}</div>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--tx-mut)">apetito: liquidez <b style="color:var(--warn)">${DATA.apetito.liquidez}</b> · reputación <b style="color:var(--ok)">${DATA.apetito.reputacion}</b> · expansión <b style="color:var(--crit)">${DATA.apetito.expansion}</b></span>
        <div class="mixwrap">
          <span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--tx-faint)">Ambición del portafolio — apuestas + proyectos + ideas (${mx.n})</span>
          <div class="mixbar">
            <div class="seg s-op" style="width:${mx.operar}%" title="operar el hoy — ${mx.operar}% real"></div>
            <div class="seg s-ex" style="width:${mx.expandir}%" title="expandir — ${mx.expandir}% real"></div>
            <div class="seg s-tr" style="width:${mx.transformar}%" title="apostar al futuro — ${mx.transformar}% real"></div>
            <div class="mixmark" style="left:${mo.operar}%" title="mezcla objetivo: hasta aquí operar el hoy (${mo.operar})"><i>▽${mo.operar}</i></div>
            <div class="mixmark" style="left:${mo.operar+mo.expandir}%" title="mezcla objetivo: hasta aquí expandir (+${mo.expandir})"><i>▽${mo.operar+mo.expandir}</i></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--tx-mut)"><b style="color:var(--brand-hi)">${mx.operar}</b> operar el hoy · <b>${mx.expandir}</b> expandir · <b>${mx.transformar}</b> apostar al futuro — objetivo ${mo.operar}/${mo.expandir}/${mo.transformar} <b style="color:var(--warn)">por fijar</b></span>
        </div></div>
      <div class="dpane" title="Cada punto = una apuesta: ¿sus objetivos del ciclo avanzan hacia la meta?"><div class="pt">¿Avanzan las apuestas? (${ciclo})${respBadge('dir-pulso')}</div>
        <div class="pulso-dots">${DATA.apuestas.map((a,i)=>{ const lbl={verde:'en meta',ambar:'cerca',rojo:'fuera de meta'}[sts[i]];
          return `<i data-ap="${a.id}" style="background:${health[sts[i]]}" title="${a.nm} — ${lbl} · clic = ficha de la apuesta"></i>`; }).join('')}</div>
        <span style="font-family:var(--font-mono);font-size:10.5px;color:var(--tx-mut)">${nG} en meta · ${nA} cerca · ${nR} fuera</span></div>
      <div class="dpane"><div class="pt">Alertas que escalaron — solo lo que subió solo${respBadge('dir-alertas')}</div>
        <button class="cambio-row" data-g="g-avc" data-g2="g-avc"><span class="sc">▲</span><div><div class="tt">Avance de Marina: 87% real vs 95% declarado</div></div><span class="ap" style="color:var(--crit)">S/ 35k/mes</span></button>
        <button class="cambio-row" data-g="g-dso" data-g2="g-dso"><span class="sc">▲</span><div><div class="tt">Cobranza de Marina: 91 días bloquea la caja</div></div><span class="peer" title="${DATA.peers['g-dso'].src}">${DATA.peers['g-dso'].r}</span><span class="ap" style="color:var(--crit)">S/ 180k/año</span></button>
        <button class="cambio-row" data-g="g-post" data-g2="g-post"><span class="sc">▲</span><div><div class="tt">La postventa se deteriora y ninguna meta la mide</div></div><span class="peer" title="${DATA.peers['g-post'].src}">${DATA.peers['g-post'].r}</span><span class="ap" style="color:var(--warn)">42 → 31</span></button>
        <button class="cambio-row" data-area="a-tes"><span class="sc">▲</span><div><div class="tt">Jefatura de Tesorería vacante hace 5 meses</div></div><span class="ap" style="color:var(--warn)">sin persona</span></button></div>
    </div>
    <div class="dirgrid">
      <div class="dpane solid"><div class="pt">Espera tu decisión · ${bandeja.length}${respBadge('bandeja')}</div>${bandejaRows(bandeja)}</div>
      <div class="dpane"><div class="pt">Qué cambió desde la última sesión (hace 30 días)${respBadge('dir-cambio30')}</div>
        <div style="font-size:12px;color:var(--tx-mut);line-height:1.8">· cobranza Marina: 90 → 91 días (se degrada)<br>· "Cierre exprés" CERRÓ con veredicto: <b style="color:var(--ok)">movió</b> (9 → 4.5 días)<br>· satisfacción de propietarios 35 → 31 — sigue sin meta que la mida<br>· ${bandeja.length} decisiones esperan tu firma</div></div>
      <div class="dpane"><div class="pt">Proyectos en curso — el portafolio · orden: lo que más cuesta esperar${respBadge('dir-portafolio')}</div>
        ${[...DATA.proyectos].sort((x,y)=>((codMes(y)||{mes:-1}).mes)-((codMes(x)||{mes:-1}).mes)).map(pm=>{ const cod=codMes(pm);
          return `<button class="cambio-row" data-pm="${pm.id}" data-pm2="${pm.id}"><span class="sc">${pm.pdca}</span><div><div class="tt">${pm.nm}</div><div class="ap" style="white-space:normal">${pm.estado} · ${pm.delta} · ${AMBICION[pm.ambicion]}${cod?` · <b style="color:var(--crit)">esperar: ${cod.raw}</b>`:''}</div></div><span class="ap" style="color:var(--brand-hi)" title="retorno del caso: lo que devuelve sobre lo que cuesta">ROI ${pm.roi}</span></button>`; }).join('')}
        <div style="font-family:var(--font-mono);font-size:9.5px;color:var(--tx-faint);margin-top:6px;border-top:1px solid var(--border);padding-top:5px">mezcla real ${mx.operar}/${mx.expandir}/${mx.transformar} — la vara, arriba ↑ · la prioridad se ordena DENTRO de cada bolsa, jamás entre bolsas</div></div>
    </div>`);
  wireLinks(pv);
  counter(`${DATA.apuestas.length} apuestas · ${nR} fuera de meta · ${bandeja.length} decisiones esperan firma`);
}

