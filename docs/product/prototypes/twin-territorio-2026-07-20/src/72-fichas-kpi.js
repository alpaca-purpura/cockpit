/* ---------- drawer KPI: semáforo grande + sparkline + cadena kpi→KR→objetivo ---------- */
function sparkSVG(k){ const ms=k.mediciones; if(ms.length<2) return '';
  const W=300,H=54,P=9; const vs=ms.map(m=>m.v).concat([k.banda.target]);
  const mn=Math.min(...vs), mx=Math.max(...vs), sp=(mx-mn)||1;
  const X=i=>P+i*(W-2*P)/(ms.length-1), Y=v=>(H-14)-((v-mn)*(H-14-P)/sp);
  const pts=ms.map((m,i)=>`${X(i).toFixed(1)},${Y(m.v).toFixed(1)}`).join(' ');
  const ty=Y(k.banda.target).toFixed(1), lc=SEMC[semaforo(k)];
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="max-width:100%" role="img" aria-label="serie de mediciones">
    <line x1="${P}" y1="${ty}" x2="${W-P}" y2="${ty}" stroke="rgba(255,255,255,.22)" stroke-dasharray="4 4" stroke-width="1"/>
    <polyline points="${pts}" fill="none" stroke="var(--teal-400)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${X(ms.length-1).toFixed(1)}" cy="${Y(ms[ms.length-1].v).toFixed(1)}" r="3.5" fill="${lc}" stroke="var(--panel)" stroke-width="1.5"/>
    <text x="${P}" y="${H-2}" font-size="8" fill="rgba(255,255,255,.34)">${ms[0].f}</text>
    <text x="${W-P}" y="${H-2}" text-anchor="end" font-size="8" fill="rgba(255,255,255,.34)">banda ┄ ${k.banda.target}${k.unidad||''} · últ. ${ms[ms.length-1].f}</text>
  </svg>`; }
function openKpi(k){ const s=semaforo(k), c=kcur(k), o=k.obj?byId(DATA.objetivos,k.obj):null, p=byId(DATA.procesos,k.proc);
  const menor=k.banda.target<k.banda.rojo;
  openDrawer('KPI · '+(p?p.nm:''), k.nm,
   `<div class="dgroup">
      <div class="sembig"><span class="d" style="background:${SEMC[s]}"></span>
        <span class="v" style="color:${s==='gris'?'var(--tx-mut)':SEMC[s]}">${c==null?'—':c}</span>
        <span class="u">${k.unidad||''} · banda <b style="color:${SEMC[s]}">${s.toUpperCase()}</b>${k.stale?' · ⌛ frescura vencida':''}</span></div>
      ${sparkSVG(k)}
      <div class="drow"><dt>Banda</dt><dd class="mono">verde ${menor?'≤':'≥'} ${k.banda.target}${k.unidad||''} · rojo ${menor?'≥':'≤'} ${k.banda.rojo}${k.unidad||''}</dd></div>
      <div class="drow"><dt>Dueño (rol)</dt><dd><span class="plnk" data-rol="${k.dueno}">${k.dueno}</span> ${harnBadge(arnesDe(k.dueno,k.proc))}</dd></div>
      <div class="drow"><dt>Frecuencia</dt><dd>${k.freq}${k.stale?'<br><span style="color:var(--warn);font-size:11px">última medición vieja — el semáforo se degrada, jamás verde mentiroso</span>':''}</dd></div></div>
    <div class="dgroup"><div class="gt">Cadena del hilo — KPI → KR → objetivo</div>
      ${o?`<div style="font-size:12.5px;line-height:1.55">mueve el KR <b>${o.kr.m}</b> (peso ${k.peso}) →<br><span class="chip teal lk" data-obj="${o.id}" style="margin-top:4px">${o.nm}</span><br>
        <span class="mono" style="font-size:10.5px;color:var(--tx-faint)">KR: ${o.kr.from} → <span style="color:var(--brand-hi)">${o.kr.cur}</span> → ${o.kr.to} ${o.kr.u}</span></div>`
      :`<span style="color:var(--warn);font-size:12.5px">⚠ Sin ancla de valor — ningún KR del ciclo mide este KPI. La brecha es real pero invisible para el directorio.</span>`}</div>
    <div class="dgroup"><div class="gt">Mediciones${k.mediciones.length?'':' — sin dato'}</div>
      ${k.mediciones.length?`<div class="medlist">${k.mediciones.slice(-6).map(m=>`<div class="r"><span>${m.f}</span><span>${m.v}${k.unidad||''}</span></div>`).join('')}</div>`
      :'<span style="font-size:12px;color:var(--tx-faint)">Gris = sin dato (regla del motor: la ausencia NUNCA pinta rojo). Este dato hoy se arma a mano entre cierres.</span>'}</div>
    ${prov(k.fuente,k.conf)}
    <div class="dgroup"><div class="gt">Acciones (kinética — quién puede, con qué aprobación)</div>
      <button class="btn" data-acc="registrar-medicion-kpi">Registrar medición › <span class="mono" style="font-size:9px;color:var(--tx-faint)">operativo · directa</span></button>
      <button class="btn" data-acc="ajustar-banda-kpi">Ajustar banda › <span class="mono" style="font-size:9px;color:var(--tx-faint)">táctico · revisión-dueño</span></button>
      ${s==='rojo'?'<button class="btn" data-acc="promover-kpi-a-kr">Promover a KR del ciclo › <span class="mono" style="font-size:9px;color:var(--tx-faint)">estratégico · gestión-de-cambios</span></button>':''}</div>`); }

