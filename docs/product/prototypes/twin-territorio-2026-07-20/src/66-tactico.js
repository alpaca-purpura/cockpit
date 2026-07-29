/* ---------- v14 · NIVEL 3 — el compromiso entre áreas (reunión de resultados) ---------- */
function renderTactico(){
  const tops=DATA.areas.filter(a=>a.parent==='a-ger');
  const kTop=k=>topArea(byId(DATA.procesos,k.proc).areas[0]).id;
  const pmTop=pm=>topArea(pm.area).id;
  const ciclo=state.ciclo==='okr'?'del trimestre':state.ciclo==='gpd'?'del año':'del ciclo';
  const bandeja=[
    {t:'Avanzar el hito de "Recuperación de avance Marina"', d:'en ejecución (DO) — corte quincenal listo', apr:'revisión-dueño', go:'data-pm="pm-mar" data-pm2="pm-mar"'},
    {t:'Evaluar 2 ideas del embudo', d:'"Foto diaria de caja" · "Bitácora por municipio" — con respuesta al autor', apr:'revisión-dueño', go:'data-idea="i-caja"'},
    {t:'Promover "Agente que prepara el contacto de morosos"', d:'nació del triage — candidata a skill del arnés', apr:'gestión-de-cambios', go:'data-idea="i-agente"'},
  ];
  sinContraKpis().forEach(k=>bandeja.push({t:`"${k.nm}" fuera de banda y sin contramedida`, d:'anomalía exige respuesta comprometida — no excusa verbal', apr:'—', warn:true, go:`data-k="${k.id}"`}));
  const pv=pageView(`
    <div class="pv-hd"><span class="eyebrow">Nivel 3 · Táctico — el compromiso entre áreas · reunión de resultados</span>
      <h2>Compromisos e indicadores por área</h2>
      <div class="sub">Regla de la reunión: indicador fuera de banda EXIGE contramedida comprometida — la anomalía sin respuesta es alerta, no excusa. Los compromisos nacen de brechas o de ideas, jamás de la nada.${state.ciclo!=='okr'?' · ★ = meta atada a bono (modo anual)':''}${respBadge('tac-contramedida')}</div></div>
    <span class="eyebrow">Metas ${ciclo} a las que se aporta (contexto)${respBadge('tac-metas')}</span>
    <div class="chips" style="margin:8px 0 4px">${DATA.objetivos.map(o=>`<span class="chip lk" data-obj="${o.id}"><span class="health-dot" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${health[o.salud]};margin-right:4px"></span>${o.kr.m}: ${o.kr.from} → ${o.kr.to}${state.ciclo!=='okr'&&o.bono?' <b style="color:var(--warn)">★</b>':''}</span>`).join('')}</div>
    <div class="dirgrid" style="margin-top:10px">
      <div class="dpane solid" style="max-width:520px"><div class="pt">Espera tu decisión · ${bandeja.length}${respBadge('bandeja')}</div>${bandejaRows(bandeja)}</div>
      <div class="dpane"><div class="pt">Aquí NACEN los compromisos — brechas sin respuesta${respBadge('tac-brechas')}</div>
        ${DATA.brechas.filter(g=>!DATA.proyectos.some(pm=>pm.brecha===g.id)&&g.estado!=='off-thread').map(g=>`<button class="cambio-row" data-g="${g.id}" data-g2="${g.id}"><span class="sc" style="color:${g.sev==='alta'?'var(--crit)':'var(--warn)'}">▲</span><div><div class="tt">${g.nm.length>62?g.nm.slice(0,60)+'…':g.nm}</div></div><span class="ap">${g.costo}</span></button>`).join('')}</div>
    </div>
    <div class="tcols">
      ${tops.map(a=>{ const pms=DATA.proyectos.filter(pm=>pmTop(pm)===a.id);
        const ks=DATA.kpis.filter(k=>kTop(k)===a.id);
        if(!pms.length&&!ks.length) return '';
        return `<div class="tcol"><div class="th" data-area="${a.id}">${a.nm} ›</div>
          ${pms.map(pm=>`<button class="cambio-row" data-pm="${pm.id}" data-pm2="${pm.id}"><span class="sc">${pm.pdca}</span><div><div class="tt">${pm.nm}</div><div class="ap">${pm.estado} · mueve ${byId(DATA.kpis,pm.mueve).nm}</div></div><span class="ap" style="color:var(--brand-hi)" title="retorno del caso: lo que devuelve sobre lo que cuesta">ROI ${pm.roi}</span></button>`).join('')}
          ${ks.map(k=>krowHTML(k)+(sinContra(k)?`<div class="ncm">▲ sin contramedida comprometida · <span class="plnk" data-acc="comprometer-contramedida">comprometer ›</span></div>`:'')).join('')}
        </div>`; }).join('')}
      <div class="tcol"><div class="th">Embudo de ideas — participación del personal${respBadge('ideas')}</div>
        ${DATA.ideas.map(i=>`<button class="cambio-row" data-idea="${i.id}"><span class="sc">💡</span><div><div class="tt">${i.nm}</div><div class="ap">${i.prop} · ${i.estado}</div></div></button>`).join('')}</div>
    </div>`);
  wireLinks(pv);
  counter(`${DATA.proyectos.length} compromisos · ${sinContraKpis().length} sin contramedida · ${DATA.ideas.filter(i=>i.estado==='enviada').length} ideas por evaluar`);
}

