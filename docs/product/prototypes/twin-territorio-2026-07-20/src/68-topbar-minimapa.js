/* ---------- topbar: chips de filtro + contador de subset ---------- */
function counter(t){ document.getElementById('count').textContent=t; }
function chips(){ const c=document.getElementById('chips'); c.innerHTML='';
  if(state.activeObj){ const o=byId(DATA.objetivos,state.activeObj);
    const ch=el('span','fchip',`<span class="t">hilo · ${o.nm}</span><button title="Quitar">✕</button>`);
    ch.querySelector('button').onclick=()=>{ state.activeObj=null; render(); }; c.appendChild(ch); }
}
function subLegend(){
  // cada lente lleva su leyenda PEGADA (visible solo bajo el lente activo, CSS .sub-t.on + .sub-leg) + conteo por estado
  const cnt={ digital:['integrado','externo','manual'].map(v=>DATA.procesos.filter(p=>p.digital===v).length),
    conf:['alta','media','baja'].map(v=>[...DATA.areas,...DATA.procesos].filter(x=>x.conf===v).length),
    madurez:['verde','ambar','rojo'].map(v=>DATA.areas.filter(a=>a.madurez===v).length) };
  const sets={ digital:[['Integrado al stack',S.ok],['Tercero / externo',S.warn],['Manual / Excel',S.crit]],
    conf:[['Sólido — sistema leído',S.ok],['Inferido — entrevista',S.warn],['Hueco / a corroborar',S.crit]],
    madurez:[['Listo (COBIT 4-5)',S.ok],['Parcial (2-3)',S.warn],['No listo (0-1)',S.crit]] };
  document.querySelectorAll('.sub-leg').forEach(L=>{ const k=L.dataset.leg;
    L.innerHTML=(sets[k]||[]).map(([t,c],i)=>`<div class="row"><span class="d" style="background:${c}"></span>${t}<span class="n">${cnt[k][i]}</span></div>`).join(''); }); }

/* ---------- minimapa (abajo-derecha, convención node-graph) ---------- */
const MM_W=158, MM_H=100;
function mmScale(){ const s=Math.min((MM_W-10)/state.cw,(MM_H-10)/state.ch);
  return { s, ox:(MM_W-state.cw*s)/2, oy:(MM_H-state.ch*s)/2 }; }
function mmDots(){ const d=document.getElementById('mmdots'); d.innerHTML='';
  const {s,ox,oy}=mmScale();
  MM_PTS.forEach(p=>{ const i=document.createElement('i'); i.style.left=(ox+p.x*s-2)+'px'; i.style.top=(oy+p.y*s-2)+'px'; d.appendChild(i); }); }
function mmView(){ const v=document.getElementById('mmview'); if(!v)return; const {s,ox,oy}=mmScale();
  const wx=-view.x/view.z, wy=-view.y/view.z, ww=stage.clientWidth/view.z, wh=stage.clientHeight/view.z;
  v.style.left=(ox+wx*s)+'px'; v.style.top=(oy+wy*s)+'px'; v.style.width=Math.max(8,ww*s)+'px'; v.style.height=Math.max(6,wh*s)+'px'; }
document.getElementById('minimap').addEventListener('click',e=>{
  const r=e.currentTarget.getBoundingClientRect(), {s,ox,oy}=mmScale();
  const wx=(e.clientX-r.left-ox)/s, wy=(e.clientY-r.top-oy)/s;
  view.x=stage.clientWidth/2-wx*view.z; view.y=stage.clientHeight/2-wy*view.z; applyView(); });

