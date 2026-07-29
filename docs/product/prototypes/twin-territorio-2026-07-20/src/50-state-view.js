let state={ mod:'territorio', nivel:2, ciclo:'okr', verComo:'', corrida:false, escala:'z0', foco:null, piel:'valor', lienzo:'p-cob', activeObj:null,
  capas:new Set(['estructura','hilo','salud','brechas']), sub:'digital',
  lod:3, search:'', insp:'home', cw:1440, ch:900 };
let view={x:0,y:0,z:1};
let MM_PTS=[]; // puntos del minimapa (se llenan en cada render)

/* tree layout desde parent (reporta_a) — solo áreas visibles según LOD */
function treeLayout(){
  const rowH=state.lod>=4?318:192, topY=150, slotW=state.lod>=4?208:178, x0=120;   // nivel 4: aire para el stack de puestos
  let slot=0;
  (function walk(a,d){
    const ch=kids(a.id).filter(isVis);
    if(!ch.length){ a.x=x0+slot*slotW; slot++; }
    else { ch.forEach(c=>walk(c,d+1)); a.x=(ch[0].x+ch[ch.length-1].x)/2; }
    a.y=topY+d*rowH;
  })(DATA.areas.find(a=>!a.parent),0);
  const depths=DATA.areas.filter(isVis).map(depth), maxD=Math.max(...depths);
  return { w:x0+Math.max(slot-1,1)*slotW+150, h:topY+maxD*rowH+160 };
}

function setCanvas(w,h){ state.cw=w; state.ch=h; world.style.width=w+'px'; world.style.height=h+'px';
  $edges.setAttribute('width',w); $edges.setAttribute('height',h); $edges.setAttribute('viewBox',`0 0 ${w} ${h}`); }

function applyView(anim=true){ world.classList.toggle('anim',anim);
  world.style.transform=`translate(${view.x}px,${view.y}px) scale(${view.z})`;
  document.getElementById('zlevel').textContent=Math.round(view.z*100)+'%'; mmView(); }
function fit(anim=true){ const vw=stage.clientWidth, vh=stage.clientHeight;
  const z=Math.min((vw-56)/state.cw,(vh-90)/state.ch,1.08);
  view.z=z; view.x=(vw-state.cw*z)/2; view.y=(vh-state.ch*z)/2 + (state.escala==='z2'?0:14); applyView(anim); }
// v13 · cámara del foco de área: encuadra los puntos del set enfocado (no el canvas entero)
function fitPts(pts,anim=true){ if(!pts||!pts.length){ fit(anim); return; }
  const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
  const x0=Math.min(...xs)-200, x1=Math.max(...xs)+200, y0=Math.min(...ys)-170, y1=Math.max(...ys)+190;
  const vw=stage.clientWidth, vh=stage.clientHeight;
  const z=Math.max(.45, Math.min((vw-40)/(x1-x0), (vh-70)/(y1-y0), 1.02));
  view.z=z; view.x=(vw-(x0+x1)*z)/2; view.y=(vh-(y0+y1)*z)/2; applyView(anim); }
// z2/z3: zoom mínimo 0.6 anclado al INICIO del flujo (puertos S·I + primeras actividades legibles);
// el resto del lienzo se alcanza con pan/rueda + minimapa (mismo trade-off que z0, decisión 3 + LOD)
function fitFlujo(anim=true){ const vw=stage.clientWidth, vh=stage.clientHeight;
  const z=Math.max(0.6, Math.min((vw-56)/state.cw,(vh-90)/state.ch,1.08));
  view.z=z;
  view.x = state.cw*z<=vw-56 ? (vw-state.cw*z)/2 : 28;
  view.y = state.ch*z<=vh-90 ? (vh-state.ch*z)/2 : 24;
  applyView(anim); }
/* v17 · primera carga: encuadre LEGIBLE sobre estrategia + cadena (lo que un director lee primero);
   el resto del mapa se alcanza con rueda/pan/minimapa o el botón Encajar ⤢ */
let firstLoad=true;
function fitEncuadre(){ const vw=stage.clientWidth, vh=stage.clientHeight;
  const y0=26, y1=650;   // bandas Estrategia (obj+KR) y Cadena (con sus KPIs/pins)
  const z=Math.min((vw-56)/state.cw,(vh-70)/(y1-y0),1.02);
  view.z=z; view.x=(vw-state.cw*z)/2; view.y=-y0*z+16; applyView(false); }
/* v18 · una vista de módulo/tablero es un DOCUMENTO, no un mapa: se encaja al ANCHO y se ancla
   arriba; si es más alto que la pantalla se recorre con la rueda (abajo), jamás se achica hasta
   ser ilegible. Antes `fit()` metía toda la página en el alto → cada panel nuevo encogía la letra
   de todos los demás, y eso era el techo real del tablero del directorio. */
function fitPagina(anim=false){ const vw=stage.clientWidth, vh=stage.clientHeight;
  const z=Math.min((vw-56)/state.cw,1.08);
  view.z=z; view.x=(vw-state.cw*z)/2;
  view.y=(state.ch*z<=vh-40)?(vh-state.ch*z)/2:14; applyView(anim); }
const enPagina=()=>!!document.querySelector('.pageview');
/* límites del recorrido vertical de la página (deja un respiro arriba y abajo) */
function clampPagina(){ const vh=stage.clientHeight, alto=state.ch*view.z;
  if(alto<=vh-40){ view.y=(vh-alto)/2; return; }
  view.y=Math.min(14,Math.max(vh-alto-24,view.y)); }
const refit=(anim=true)=>enPagina()?fitPagina(anim):(state.escala==='z2'||state.escala==='z3')?fitFlujo(anim):fit(anim);
document.getElementById('zin').onclick =()=>{view.z=Math.min(2,view.z+0.12); applyView();};
document.getElementById('zout').onclick=()=>{view.z=Math.max(0.3,view.z-0.12); applyView();};
document.getElementById('zfit').onclick=()=>refit();

let drag=null;
stage.addEventListener('mousedown',e=>{ if(e.target.closest('.area-node,.obj-node,.proc-node,.pin,.kin,.act,.btn,.chev,.soporte,.rolchip,.sysplat'))return;
  drag={sx:e.clientX,sy:e.clientY,ox:view.x,oy:view.y}; stage.classList.add('drag'); });
window.addEventListener('mousemove',e=>{ if(!drag)return; view.x=drag.ox+(e.clientX-drag.sx); view.y=drag.oy+(e.clientY-drag.sy); applyView(false); });
window.addEventListener('mouseup',()=>{ drag=null; stage.classList.remove('drag'); });
stage.addEventListener('wheel',e=>{ e.preventDefault();
  /* en una página (tablero o módulo) la rueda RECORRE — hacer zoom sobre un documento es el gesto
     equivocado. Para acercar/alejar quedan los botones de zoom y ⌘/Ctrl + rueda. */
  if(enPagina()&&!e.ctrlKey&&!e.metaKey){ view.y-=e.deltaY; clampPagina(); applyView(false); return; }
  const f=e.deltaY<0?1.1:0.9; const nz=Math.max(0.3,Math.min(2,view.z*f));
  const r=stage.getBoundingClientRect(), mx=e.clientX-r.left, my=e.clientY-r.top;
  view.x=mx-(mx-view.x)*(nz/view.z); view.y=my-(my-view.y)*(nz/view.z); view.z=nz; applyView(false); },{passive:false});

function el(t,c,h){ const n=document.createElement(t); if(c)n.className=c; if(h!=null)n.innerHTML=h; return n; }
function pathEl(d,stroke,w,op,dash){ const p=document.createElementNS(NS,'path'); p.setAttribute('d',d);
  p.setAttribute('stroke',stroke); p.setAttribute('stroke-width',w); p.setAttribute('opacity',op); if(dash)p.setAttribute('stroke-dasharray',dash);
  $edges.appendChild(p); }
const curve=(x1,y1,x2,y2)=>{ const dx=(x2-x1)*0.45; return `M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`; };
const vcurve=(x1,y1,x2,y2)=>{ const dy=(y2-y1)*0.5; return `M${x1},${y1} C${x1},${y1+dy} ${x2},${y2-dy} ${x2},${y2}`; };

/* búsqueda — spotlight (atenúa lo no-matcheado; no recorta) */
const q=()=>state.search.trim().toLowerCase();
function areaMatch(a){ const s=q(); if(!s) return true;
  if((a.nm+' '+a.lider).toLowerCase().includes(s)) return true;
  return subtreeProcs(a.id).some(p=>p.nm.toLowerCase().includes(s)); }
const procMatch=p=>{ const s=q(); return !s || p.nm.toLowerCase().includes(s) || p.dueno.toLowerCase().includes(s); };

