#!/usr/bin/env bash
# Suite de verificación del mockup — clicks con HIT-TESTING REAL (elementFromPoint), no element.click().
# Uso: ./verify.sh   → imprime V8SUITE :: OK ... | ERRS=[]  (19/19 esperado)
set -euo pipefail
cd "$(dirname "$0")"
TMP=$(mktemp -d)
cp index.html "$TMP/t.html"
cat >> "$TMP/t.html" <<'EOF'

<style>.world.anim{transition:none!important}</style>
<script>
window.addEventListener('error',e=>{(window.__ERRS=window.__ERRS||[]).push(e.message+' @'+e.lineno)});
function mclick(el,dbl){ el.scrollIntoView({block:'nearest'}); /* scroll = gesto real; el hit-test sigue */
  const r=el.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
  const t=document.elementFromPoint(x,y); if(!t) throw new Error('nada en el punto');
  if(!(t===el||el.contains(t)||t.contains(el))) throw new Error('intercepta: '+(t.className||t.tagName));
  t.dispatchEvent(new MouseEvent(dbl?'dblclick':'click',{bubbles:true,clientX:x,clientY:y})); }
/* poll hasta que el hit-testing responda (carrera con el primer layout bajo virtual-time) */
function whenReady(cb){ const o=document.querySelector('.obj-node');
  if(o){ const r=o.getBoundingClientRect();
    if(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)){ cb(); return; } }
  setTimeout(()=>whenReady(cb),250); }
window.addEventListener('load',()=>{whenReady(()=>{
  const R=[]; const t=(n,f)=>{try{f();R.push('OK '+n);}catch(e){R.push('FAIL '+n+' :: '+e.message);}};
  const A=(c,m)=>{if(!c)throw new Error(m)}; const eye=()=>document.getElementById('inEye').textContent;
  t('objetivo-hilo+ficha',()=>{ mclick(document.querySelector('.obj-node .nm')); A(state.activeObj,'sin hilo'); A(eye().includes('Objetivo'),eye()); });
  t('chevron-ficha',()=>{ mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta'))); A(eye().includes('Proceso'),eye()); });
  t('dblclick-cobranza-lienzo',()=>{ state.activeObj=null; render();
    mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Cobranza')),true); A(state.escala==='z2','escala='+state.escala); });
  t('volver+soporte-ficha',()=>{ mclick(document.getElementById('back')); mclick(document.querySelector('.soporte .nm')); A(eye().includes('Proceso'),eye()); });
  t('rolchip-rol',()=>{ mclick(document.querySelector('.rolchip')); A(eye().includes('Rol'),eye()); });
  t('sysplat-sistema',()=>{ mclick(document.querySelector('.sysplat')); A(eye().includes('Sistema'),eye()); });
  t('pin-brecha',()=>{ mclick(document.querySelector('.pin .body')); A(eye().includes('Brecha'),eye()); });
  t('piel-org+drill-area',()=>{ mclick(document.querySelector('[data-piel=org]'));
    mclick([...document.querySelectorAll('.area-node .nm')].find(x=>x.textContent==='Finanzas')); A(state.escala==='z1','escala='+state.escala); });
  t('capa-trabajo-valor',()=>{ mclick(document.getElementById('back')); mclick(document.querySelector('[data-piel=valor]'));
    mclick(document.querySelector('[data-capa=trabajo]'));
    const hb=[...document.querySelectorAll('.rolchip .harn[data-h]')].find(x=>{ const r=x.getBoundingClientRect();
      return r.top>0&&r.bottom<innerHeight&&r.left>0&&r.right<innerWidth&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); });
    A(hb,'sin arnés VISIBLE en gente'); mclick(hb); A(eye().includes('Arnés'),eye()); });
  t('salud-lente-conf',()=>{ const b=[...document.querySelectorAll('.sub-t')].find(x=>x.textContent.includes('Confianza')); mclick(b);
    A(state.sub==='conf','sub='+state.sub); const lg=document.querySelector('.sub-leg[data-leg=conf]'); A(lg&&lg.offsetParent,'leyenda conf no visible'); A(lg.textContent.includes('Sólido'),'leyenda vacía'); });
  t('ficha-sipoc+nav',()=>{ mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta')));
    const body=document.getElementById('inBody'); A(body.innerHTML.includes('SIPOC'),'sin SIPOC en ficha');
    const up=[...body.querySelectorAll('[data-proc]')].find(x=>x.textContent.includes('Campañas')); A(up,'sin proveedor navegable');
    mclick(up); A(document.getElementById('inTitle').textContent.includes('Campañas'),'nav SIPOC rota'); });
  t('lienzo-vta',()=>{ mclick([...document.querySelectorAll('.chev .nm')].find(x=>x.textContent.includes('Venta')),true);
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
  t('rolchip-headcount',()=>{ const rc=[...document.querySelectorAll('.rolchip .who')].find(x=>/\+\d/.test(x.textContent)); A(rc,'sin headcount ×N en gente'); });
  R.push('ERRS='+JSON.stringify(window.__ERRS||[]));
  document.title='V8SUITE :: '+R.join(' | ');
});});
</script>
EOF
google-chrome --headless=new --disable-gpu --user-data-dir="$TMP/profile" --window-size=1680,1050 \
  --virtual-time-budget=18000 --dump-dom "file://$TMP/t.html" 2>/dev/null | grep -o '<title>V8SUITE[^<]*' \
  || { echo "SIN RESULTADO — revisar errores JS"; exit 1; }
rm -rf "$TMP"
