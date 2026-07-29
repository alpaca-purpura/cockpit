/* ============================================================
   ENGINE
   ============================================================ */
const world=document.getElementById('world'), stage=document.getElementById('stage');
const $nodes=document.getElementById('nodes'), $pins=document.getElementById('pins'),
      $edges=document.getElementById('edges'), $lienzo=document.getElementById('lienzo');
const NS='http://www.w3.org/2000/svg';
const byId=(a,id)=>a.find(o=>o.id===id);
const areaProcs=id=>DATA.procesos.filter(p=>p.areas.includes(id));
const digHealth=d=>d==='integrado'?'verde':d==='externo'?'ambar':'rojo';
const kids=id=>DATA.areas.filter(a=>a.parent===id);
function descendants(id){ const o=[id]; kids(id).forEach(c=>o.push(...descendants(c.id))); return o; }
function subtreeProcs(id){ const set=new Set(descendants(id)); return DATA.procesos.filter(p=>p.areas.some(a=>set.has(a))); }
const worstDig=procs=>procs.reduce((w,p)=>{const h=digHealth(p.digital);return (h==='rojo'||w==='rojo')?'rojo':((h==='ambar'||w==='ambar')?'ambar':'verde');},'verde');

/* motor de indicadores (derivado al leer, nunca persistido — doctrina cruce-estructura) */
const SEMC={verde:'var(--ok)',ambar:'var(--warn)',rojo:'var(--crit)',gris:'#5c6b68'};
const kcur=k=>k.mediciones.length?k.mediciones[k.mediciones.length-1].v:null;
function semaforo(k){ const c=kcur(k); if(c==null) return 'gris';           // sin dato = GRIS, nunca rojo
  const menor=k.banda.target<k.banda.rojo;
  if(menor){ if(c<=k.banda.target)return 'verde'; if(c>=k.banda.rojo)return 'rojo'; }
  else     { if(c>=k.banda.target)return 'verde'; if(c<=k.banda.rojo)return 'rojo'; }
  return 'ambar'; }
const kpisByProc=id=>DATA.kpis.filter(k=>k.proc===id);
const krowHTML=k=>{ const s=semaforo(k), c=kcur(k);
  return `<button class="krow" data-k="${k.id}"><span class="kd" style="background:${SEMC[s]}"></span><span class="kn">${k.nm}${k.stale?' ⌛':''}</span><span class="kv">${c==null?'s/d':c+(k.unidad||'')} → ${k.banda.target}${k.unidad||''}</span></button>`; };
/* lente personas: ocupante del rol por scan de líderes + extras (vacante = delatada, no inventada) */
/* ===== D-19 · puesto ≠ rol — PUESTOS se DERIVA de la nómina; los pares rol×proceso, del wiring =====
   persona ─ocupa→ PUESTO ─agrega→ ROL ─carril/RACI→ ACTIVIDAD ⊂ PROCESO (CK-30).
   "los procesos de un rol" = posee (dueño_ref) ∪ ejecuta (carril ∨ raci.R); C/I no genera. */
const coreNm=s=>String(s).replace(/\s*\(vacante\)/i,'');
const PUESTOS=(()=>{ const M=new Map();
  const get=(nm,area)=>{ const k=coreNm(nm); if(!M.has(k))M.set(k,{nm:k, area:area||null, lider:false, vac:false, reporta_a:null, pares:[]});
    const p=M.get(k); if(area&&!p.area)p.area=area; return p; };
  DATA.areas.forEach(a=>{ get(a.lider.split(' · ')[1],a.id).lider=true; });
  DATA.personasExtra.forEach(x=>get(x.puesto,x.area));
  DATA.procesos.forEach(pr=>{ const p=get(pr.dueno,pr.areas[0]); if(/vacante/i.test(pr.dueno))p.vac=true;
    p.pares.push({rol:coreNm(pr.dueno), proc:pr.id, via:'posee'}); });
  [DATA.flagship,...Object.values(DATA.lienzos)].forEach(l=>l.lanes.forEach(ln=>{ const p=get(ln.role);
    const ex=p.pares.find(x=>x.proc===l.proc);
    if(ex) ex.via='posee+ejecuta'; else p.pares.push({rol:coreNm(ln.role), proc:l.proc, via:'ejecuta'}); }));
  M.forEach(p=>{ const a=byId(DATA.areas,p.area); if(!a)return;
    if(p.lider){ const par=a.parent&&byId(DATA.areas,a.parent); p.reporta_a=par?par.lider.split(' · ')[1]:null; }
    else p.reporta_a=a.lider.split(' · ')[1]; });
  return [...M.values()];
})();
DATA.puestosTotal=PUESTOS.length;   // D-19: deja de ser constante — conteo AUDITABLE de la entidad puesto
const puestoByNm=nm=>PUESTOS.find(p=>p.nm===coreNm(nm));
const puestoOcupantes=nm=>{ const core=coreNm(nm); const out=[];
  DATA.areas.forEach(a=>{ const [q,r]=a.lider.split(' · '); if(r===core) out.push(q); });
  DATA.personasExtra.forEach(x=>{ if(x.puesto===core) out.push(x.nm); }); return out; };
const puestoOcupante=nm=>{ const p=puestoByNm(nm); const occs=puestoOcupantes(nm);
  return { nm:coreNm(nm), vac:!!(p&&p.vac)||/vacante/i.test(String(nm)), quien:occs[0]||null }; };
const sipocRefChip=r=>r.proc?`<span class="chip lk" data-proc="${r.proc}">${byId(DATA.procesos,r.proc).nm} ›</span>`:`<span class="chip" title="actor externo">${r.ext} · ext</span>`;

/* ===== CK-30/D-20 · arnés = REGISTRO por rol×proceso — estado/drift DERIVADOS del hash ===== */
const sisByName=n=>DATA.sistemas.find(s=>s.nm===n);
const TWIN_HASH=DATA.twinHash;
const arnesEstado=h=>h.suspendido?'suspendido':(h.hash_fuente!==TWIN_HASH?'desactualizado':'vigente');
const arnesDe=(rol,proc)=>DATA.arneses.find(h=>h.deriva_de.rol===coreNm(rol)&&h.deriva_de.proceso===proc);
const rosterDe=pu=>DATA.arneses.filter(h=>h.deriva_de.puesto===coreNm(pu));
const paresDe=pu=>{ const p=puestoByNm(pu); return p?p.pares:[]; };
const harnBadge=h=>h?`<span class="harn ${arnesEstado(h)==='desactualizado'?'stale':''}" data-h="${h.id}" title="arnés compilado del twin — ${arnesEstado(h)}">⛨ arnés ${h.v}${arnesEstado(h)==='desactualizado'?' ⚠':''}</span>`
  :`<span class="harn none" title="rol×proceso sin arnés — candidato Arnesia">sin arnés</span>`;
// roster del PUESTO (se ENSAMBLA por puesto — M46): 1 par → badge directo · N pares → ⛨ k/n abre la ficha del puesto
const rosterBadge=pu=>{ const pares=paresDe(pu), hs=rosterDe(pu);
  if(!pares.length) return `<span class="harn none" title="puesto sin proceso mapeado — sin carril declarado">sin mapa</span>`;
  if(!hs.length) return `<span class="harn none" title="ningún rol×proceso del puesto tiene arnés — candidato Arnesia">sin arnés</span>`;
  if(hs.length===1&&pares.length===1) return harnBadge(hs[0]);
  const stale=hs.some(h=>arnesEstado(h)==='desactualizado');
  return `<span class="harn ${stale?'stale':''}" data-pu="${coreNm(pu)}" title="roster del puesto: ${hs.length} de ${pares.length} rol×proceso con arnés">⛨ ${hs.length}/${pares.length}${stale?' ⚠':''}</span>`; };
function setPiel(p){ state.piel=p; document.querySelectorAll('.piel-toggle button').forEach(x=>x.classList.toggle('on',x.dataset.piel===p)); }
function conocimientoHTML(pid){ const c=pid&&DATA.conocimiento[pid];
  return `<div class="dgroup"><div class="gt">Conocimiento — dónde busca el arnés</div>
    ${c?`<div style="font-size:12px;line-height:1.5"><b class="mono" style="color:var(--brand-hi);font-size:10px">${c.n}</b> · ${c.d}</div>`
      :'<div style="font-size:12px;color:var(--tx-faint)">Know-how aún no capturado — brecha de conocimiento.</div>'}
    <div style="font-size:10px;color:var(--tx-faint)">conocimiento/&lt;proceso&gt;/&lt;rol&gt;/ en el repo oficial (N6) · el 3er cuerpo del cerebro — próximamente (F3)</div></div>`; }
/* ===== v14 · capa de ACCIÓN — catálogo kinético con autoridad + aprobación (del schema) =====
   acc: [nivel mínimo (4 dirección · 3 estratégico · 2 táctico · 1 operativo), aprobación, verbo para el historial] */
