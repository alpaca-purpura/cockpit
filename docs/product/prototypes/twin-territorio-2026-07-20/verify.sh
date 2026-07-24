#!/usr/bin/env bash
# Suite de verificación del mockup — clicks con HIT-TESTING REAL (elementFromPoint), no element.click().
# Uso: ./verify.sh   → imprime V7SUITE :: OK ... | ERRS=[]  (13/13 esperado)
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
  R.push('ERRS='+JSON.stringify(window.__ERRS||[]));
  document.title='V7SUITE :: '+R.join(' | ');
});});
</script>
EOF
google-chrome --headless=new --disable-gpu --user-data-dir="$TMP/profile" --window-size=1680,1050 \
  --virtual-time-budget=14000 --dump-dom "file://$TMP/t.html" 2>/dev/null | grep -o '<title>V7SUITE[^<]*' \
  || { echo "SIN RESULTADO — revisar errores JS"; exit 1; }
rm -rf "$TMP"
