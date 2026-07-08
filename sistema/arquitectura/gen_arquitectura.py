#!/usr/bin/env python3
"""Renderiza la arquitectura-as-code de Cockpit (CK-15, cierra BL-08).

Dos SSoT → dos salidas GENERADAS (no editar a mano):
  · NODOS.md          → nodos.data.js      (drawer de despliegue.html: clic en nodo = ficha)
  · arquitectura.yaml → arquitectura.html  (vista de la célula: planos/componentes/relaciones)

Y el diente del gate (falla con exit 1 antes de escribir):
  · índice de NODOS.md ↔ fichas ## N# (ambos sentidos)
  · toda ref [R#] en fichas resuelve a la tabla del responsibility-walk
  · arquitectura.yaml: relaciones joinean (from/to existen) · tipo ∈ RELACION_TIPOS ·
    estado ∈ ESTADOS · plano/tipo declarados · rutas existen · toda ficha CK-NN resuelve
    en LEDGER.md (fichas de otros ledgers — I/DH/H/D-NN — son externas, no se verifican)
  · despliegue.html (curado a mano — se VALIDA, no se genera): todo nodo del índice tiene
    data-nodo en el diagrama y viceversa; la madurez de cada art coincide con NODOS.md (CK-17)

Heredero de gen_nodos.py + gen_arquitectura_cockpit.py del monorepo legacy (no portados en
CK-10); render propio self-contained porque el shell de harness-studio es otro producto (P4)
y copiarlo sería fork silencioso. Anti-drift: correr en el MISMO evento que edita las fuentes;
`--check` para gate.

Uso:  python3 sistema/arquitectura/gen_arquitectura.py            # valida + escribe
      python3 sistema/arquitectura/gen_arquitectura.py --check    # exit 1 si hay drift
"""
import json
import os
import re
import sys

import yaml

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
NODOS_MD = os.path.join(HERE, "NODOS.md")
MODELO = os.path.join(HERE, "arquitectura.yaml")
LEDGER = os.path.join(ROOT, "LEDGER.md")
OUT_NODOS = os.path.join(HERE, "nodos.data.js")
OUT_HTML = os.path.join(HERE, "arquitectura.html")

# Enums del contrato: el harness-descriptor.schema del legacy no se portó; estos son los
# vocabularios vigentes del modelo de célula (ampliarlos = decisión, ficha CK-NN).
RELACION_TIPOS = {"usa", "compone", "adapta", "alimenta", "gobierna"}
ESTADOS = {"activo", "declarado", "pendiente"}
FICHA_LOCAL = re.compile(r"^CK-(\d+)$")  # externas (I/DH/H/D-NN) no resuelven aquí
FROZEN_MAX = 9  # CK-01..CK-09 = historia congelada en el monorepo legacy; este LEDGER arranca en CK-10

ROW = re.compile(r"^\|\s*\*\*(N\d+)\*\*\s*\|(.+)$", re.M)
HEAD = re.compile(r"^## (N\d+) · (.+)$", re.M)
FIELD = re.compile(r"^- \*\*(.+?)\*\* — (.+)$", re.M)
RWALK = re.compile(r"^\|\s*\*\*(R\d+)\*\*\s*\|", re.M)
RREF = re.compile(r"\[(R\d+)\]")

errors = []


def err(msg):
    errors.append(msg)


# ---------- NODOS.md → nodos.data.js ----------

def parse_nodos(md):
    meta = {}
    for m in ROW.finditer(md):
        cols = [c.strip() for c in m.group(2).split("|")]
        if len(cols) < 5:
            continue
        meta[m.group(1)] = dict(titulo=cols[0], plano=cols[1], tipo=cols[2],
                                madurez=cols[3], marca=cols[4])
    nodos = {}
    parts = HEAD.split(md)  # [pre, id, header, body, ...]
    for i in range(1, len(parts), 3):
        nid, body = parts[i], parts[i + 2].split("\n# ")[0]
        campos = [[a.strip(), b.strip()] for a, b in FIELD.findall(body)]
        m = meta.get(nid, {})
        nodos[nid] = dict(titulo=m.get("titulo", parts[i + 1].strip()),
                          plano=m.get("plano", ""), tipo=m.get("tipo", ""),
                          madurez=m.get("madurez", ""), marca=m.get("marca", ""),
                          campos=campos)
    # gate: índice ↔ fichas, ambos sentidos
    for nid in meta:
        if nid not in nodos:
            err(f"NODOS.md: {nid} está en el índice pero no tiene ficha ## {nid}")
    for nid in nodos:
        if nid not in meta:
            err(f"NODOS.md: ficha ## {nid} sin fila en el índice")
    # gate: refs [R#] resuelven al responsibility-walk
    rwalk = set(RWALK.findall(md))
    for ref in set(RREF.findall(md)):
        if ref not in rwalk:
            err(f"NODOS.md: ref [{ref}] no resuelve en el responsibility-walk")
    return nodos


def render_nodos_js(nodos):
    body = json.dumps(nodos, ensure_ascii=False, indent=2)
    return ("// GENERADO desde NODOS.md por sistema/arquitectura/gen_arquitectura.py — NO editar a mano.\n"
            "window.NODOS = " + body + ";\n")


# ---------- despliegue.html: validación (curado a mano — se valida, no se genera) ----------

DESPLIEGUE = os.path.join(HERE, "despliegue.html")
ART = re.compile(r'<div class="art[^"]*" data-nodo="(N\d+)"><div class="as">(.*?)</div>', re.S)
DATA_NODO = re.compile(r'data-nodo="(N\d+)"')


def validar_despliegue(nodos):
    html = open(DESPLIEGUE, encoding="utf-8").read()
    en_diagrama = set(DATA_NODO.findall(html))
    for nid in nodos:
        if nid not in en_diagrama:
            err(f"despliegue.html: {nid} está en NODOS.md pero no aparece en el diagrama (data-nodo)")
    for nid in en_diagrama:
        if nid not in nodos:
            err(f"despliegue.html: data-nodo '{nid}' no existe en NODOS.md")
    # madurez de cada art sincronizada con el índice (los nodos-actor no llevan art con madurez)
    for nid, as_text in ART.findall(html):
        madurez = (nodos.get(nid) or {}).get("madurez", "")
        if not madurez:
            continue
        if madurez not in as_text:
            err(f"despliegue.html: art de {nid} dice otra madurez — NODOS.md dice '{madurez}'")
        elif madurez == "existe" and "existe (parcial)" in as_text:
            err(f"despliegue.html: art de {nid} dice 'existe (parcial)' — NODOS.md dice 'existe'")


# ---------- arquitectura.yaml → arquitectura.html ----------

def fichas_index():
    idx = set()
    for m in re.finditer(r"^### (CK-\d+) ·", open(LEDGER, encoding="utf-8").read(), re.M):
        idx.add(m.group(1))
    return idx

def validar_modelo(modelo):
    fichas_ok = fichas_index()
    planos = modelo.get("planos") or []
    tipos = {t["id"] for t in modelo.get("tipos") or []}
    comps = modelo.get("componentes") or []
    rels = modelo.get("relaciones") or []
    plano_ids = [p["id"] for p in planos]
    if len(set(plano_ids)) != len(plano_ids):
        err("arquitectura.yaml: planos con ids duplicados")
    comp_ids = set()
    for c in comps:
        cid = c.get("id") or "?"
        if cid in comp_ids:
            err(f"arquitectura.yaml: componente duplicado {cid}")
        comp_ids.add(cid)
        if c.get("tipo") not in tipos:
            err(f"{cid}: tipo '{c.get('tipo')}' no declarado en tipos[]")
        if c.get("plano") not in plano_ids:
            err(f"{cid}: plano '{c.get('plano')}' no declarado en planos[]")
        if c.get("estado") not in ESTADOS:
            err(f"{cid}: estado '{c.get('estado')}' ∉ {sorted(ESTADOS)}")
        if not c.get("fichas"):
            err(f"{cid}: sin fichas — elemento sin porqué no entra al modelo (I-73)")
        for f in c.get("fichas") or []:
            m = FICHA_LOCAL.match(f)
            if m and int(m.group(1)) > FROZEN_MAX and f not in fichas_ok:
                err(f"{cid}: ficha '{f}' no resuelve en LEDGER.md")
        ruta = c.get("ruta")
        if ruta and not ruta.startswith("~") and not os.path.exists(os.path.join(ROOT, ruta)):
            err(f"{cid}: ruta '{ruta}' no existe")
    for r in rels:
        if r.get("from") not in comp_ids:
            err(f"relación: from '{r.get('from')}' no existe")
        if r.get("to") not in comp_ids:
            err(f"relación: to '{r.get('to')}' no existe")
        if r.get("tipo") not in RELACION_TIPOS:
            err(f"relación {r.get('from')}→{r.get('to')}: tipo '{r.get('tipo')}' ∉ {sorted(RELACION_TIPOS)}")


HTML_TEMPLATE = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITULO__</title>
<!-- GENERADO por sistema/arquitectura/gen_arquitectura.py desde arquitectura.yaml — NO editar a mano (CK-15). -->
<style>
  :root{--bg:#0e1116;--panel:#161b22;--panel2:#1b212b;--line:#2b3340;--ink:#e6edf3;--dim:#8b949e;
    --activo:#3fb950;--declarado:#d29922;--pendiente:#f85149;--accent:#a371f7}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:13.5px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding-bottom:60px}
  header{padding:18px 26px;border-bottom:1px solid var(--line)}
  h1{margin:0 0 4px;font-size:20px}
  .sub{color:var(--dim);font-size:12.5px;max-width:1000px}
  .legend{display:flex;gap:14px 20px;flex-wrap:wrap;padding:10px 26px;font-size:11.5px;color:var(--dim);border-bottom:1px solid var(--line)}
  .legend .k{display:inline-flex;align-items:center;gap:5px}
  .sw{width:11px;height:11px;border-radius:3px;display:inline-block}
  .wrap{max-width:1180px;margin:18px auto;padding:0 18px}
  .plano{border:2px solid var(--line);border-radius:12px;padding:13px 15px;margin:0 0 14px}
  .ptitle{font-size:14px;font-weight:700;margin:0 0 2px}
  .psub{font-size:11px;color:var(--dim);margin-bottom:10px}
  .cards{display:flex;gap:10px;flex-wrap:wrap}
  .card{flex:1;min-width:230px;max-width:360px;background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--line);border-radius:8px;padding:9px 11px;cursor:pointer;transition:.12s}
  .card:hover{filter:brightness(1.2);outline:1px solid var(--ink);outline-offset:1px}
  .card.activo{border-left-color:var(--activo)}
  .card.declarado{border-left-color:var(--declarado)}
  .card.pendiente{border-left-color:var(--pendiente);border-style:solid solid solid dashed}
  .card .tp{font-size:9.5px;color:#6e7681;letter-spacing:.05em}
  .card .nm{font-weight:600;font-size:12.5px;margin:1px 0}
  .card .pp{color:var(--dim);font-size:11px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  .bdg{display:inline-block;font-size:9.5px;padding:1px 6px;border-radius:10px;margin:3px 4px 0 0}
  .bdg.activo{background:rgba(63,185,80,.15);color:var(--activo)}
  .bdg.declarado{background:rgba(210,153,34,.15);color:var(--declarado)}
  .bdg.pendiente{background:rgba(248,81,73,.15);color:var(--pendiente)}
  .bdg.ficha{background:rgba(163,113,247,.15);color:#c9aef9}
  h2.sec{font-size:14px;margin:24px 26px 8px;border-top:1px solid var(--line);padding-top:16px}
  table.rel{width:calc(100% - 52px);margin:0 26px;border-collapse:collapse;font-size:12px}
  table.rel th,table.rel td{border:1px solid var(--line);padding:6px 9px;text-align:left}
  table.rel th{background:var(--panel);color:var(--dim)}
  code{background:#0c0f14;padding:1px 5px;border-radius:4px;font-size:11px;color:#c9d4e0}
  #dOv{position:fixed;inset:0;background:rgba(0,0,0,.5);opacity:0;pointer-events:none;transition:.18s;z-index:40}
  #dOv.open{opacity:1;pointer-events:auto}
  #dDr{position:fixed;top:0;right:0;height:100vh;width:min(470px,93vw);background:var(--panel);border-left:1px solid var(--line);transform:translateX(100%);transition:transform .2s;z-index:50;overflow:auto;padding-bottom:40px}
  #dDr.open{transform:none}
  #dHd{position:sticky;top:0;background:var(--panel2);border-bottom:1px solid var(--line);padding:16px 18px}
  #dCl{position:absolute;top:11px;right:13px;cursor:pointer;color:var(--dim);font-size:18px;line-height:1;background:none;border:none}
  #dCl:hover{color:var(--ink)}
  #dTi{font-size:15px;font-weight:700;padding-right:24px}
  #dMe{font-size:11.5px;color:var(--dim);margin-top:4px}
  .df{padding:11px 18px;border-bottom:1px solid var(--line)}
  .dk{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#6e7681;margin-bottom:3px}
  .dv{font-size:12.5px;line-height:1.55}
</style>
</head>
<body>
<header>
  <h1>🧩 __TITULO__</h1>
  <div class="sub">__PROPOSITO__</div>
  <div class="sub" style="margin-top:6px">Generado desde <code>arquitectura.yaml</code> (SSoT) por <code>gen_arquitectura.py</code> · v__VERSION__ · el porqué de cada elemento = sus fichas (clic en una tarjeta). Vista ecosistema/despliegue = <code>despliegue.html</code>.</div>
</header>
<div class="legend">
  <span class="k"><span class="sw" style="background:var(--activo)"></span>activo (construido)</span>
  <span class="k"><span class="sw" style="background:var(--declarado)"></span>declarado (placeholder)</span>
  <span class="k"><span class="sw" style="background:var(--pendiente)"></span>pendiente (sin construir)</span>
  <span class="k"><span class="sw" style="background:var(--accent)"></span>ficha CK-NN (el porqué)</span>
</div>
<div class="wrap" id="planos"></div>
<h2 class="sec">Relaciones</h2>
<table class="rel" id="rels"><tr><th>De</th><th>tipo</th><th>A</th></tr></table>
<div id="dOv"></div>
<aside id="dDr" aria-hidden="true">
  <div id="dHd"><button id="dCl" title="Cerrar (Esc)">✕</button><div id="dTi"></div><div id="dMe"></div></div>
  <div id="dBo"></div>
</aside>
<script>
var MODELO = __DATA__;
(function(){
  var byId={}; MODELO.componentes.forEach(function(c){byId[c.id]=c});
  var cont=document.getElementById('planos');
  MODELO.planos.forEach(function(p){
    var sec=document.createElement('div'); sec.className='plano';
    sec.innerHTML='<div class="ptitle">'+p.nombre+'</div><div class="psub">'+(p.sub||'')+'</div>';
    var grid=document.createElement('div'); grid.className='cards';
    MODELO.componentes.filter(function(c){return c.plano===p.id}).forEach(function(c){
      var d=document.createElement('div'); d.className='card '+c.estado; d.dataset.id=c.id;
      d.innerHTML='<div class="tp">'+(MODELO.tipoLabel[c.tipo]||c.tipo)+'</div>'
        +'<div class="nm">'+c.nombre+'</div><div class="pp">'+(c.proposito||'')+'</div>'
        +'<div><span class="bdg '+c.estado+'">'+c.estado+'</span>'
        +(c.fichas||[]).map(function(f){return '<span class="bdg ficha">'+f+'</span>'}).join('')+'</div>';
      grid.appendChild(d);
    });
    sec.appendChild(grid); cont.appendChild(sec);
  });
  var tbl=document.getElementById('rels');
  MODELO.relaciones.forEach(function(r){
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+(byId[r.from]||{}).nombre+'</td><td><code>'+r.tipo+'</code></td><td>'+(byId[r.to]||{}).nombre+'</td>';
    tbl.appendChild(tr);
  });
  var ov=document.getElementById('dOv'),dr=document.getElementById('dDr'),
      ti=document.getElementById('dTi'),me=document.getElementById('dMe'),bo=document.getElementById('dBo');
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function open(id){
    var c=byId[id]; if(!c)return;
    ti.textContent=c.nombre;
    me.textContent=(MODELO.tipoLabel[c.tipo]||c.tipo)+' · '+c.estado+(c.ruta?(' · '+c.ruta):'');
    var html='<div class="df"><div class="dk">Propósito</div><div class="dv">'+esc(c.proposito||'')+'</div></div>';
    html+='<div class="df"><div class="dk">Fichas (el porqué — LEDGER)</div><div class="dv">'+(c.fichas||[]).join(' · ')+'</div></div>';
    var out=MODELO.relaciones.filter(function(r){return r.from===id}),
        inn=MODELO.relaciones.filter(function(r){return r.to===id});
    if(out.length)html+='<div class="df"><div class="dk">Sale (from)</div><div class="dv">'+out.map(function(r){return '<code>'+r.tipo+'</code> → '+esc((byId[r.to]||{}).nombre)}).join('<br>')+'</div></div>';
    if(inn.length)html+='<div class="df"><div class="dk">Entra (to)</div><div class="dv">'+inn.map(function(r){return esc((byId[r.from]||{}).nombre)+' → <code>'+r.tipo+'</code>'}).join('<br>')+'</div></div>';
    bo.innerHTML=html;
    dr.classList.add('open');ov.classList.add('open');dr.setAttribute('aria-hidden','false');dr.scrollTop=0;
  }
  function close(){dr.classList.remove('open');ov.classList.remove('open');dr.setAttribute('aria-hidden','true')}
  document.addEventListener('click',function(e){var t=e.target.closest('.card');if(t)open(t.dataset.id)});
  ov.addEventListener('click',close);
  document.getElementById('dCl').addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
</script>
</body>
</html>
"""


def render_html(modelo):
    data = {
        "planos": [{"id": p["id"], "nombre": p["nombre"], "sub": p.get("sub", "")}
                   for p in modelo.get("planos") or []],
        "tipoLabel": {t["id"]: t["label"] for t in modelo.get("tipos") or []},
        "componentes": [{k: c.get(k) for k in
                         ("id", "tipo", "plano", "nombre", "estado", "fichas", "ruta", "proposito")}
                        for c in modelo.get("componentes") or []],
        "relaciones": [{"from": r["from"], "to": r["to"], "tipo": r["tipo"]}
                       for r in modelo.get("relaciones") or []],
    }
    meta = modelo["meta"]
    proposito = re.sub(r"\s+", " ", meta.get("proposito", "")).strip()
    return (HTML_TEMPLATE
            .replace("__TITULO__", meta["nombre"])
            .replace("__PROPOSITO__", proposito)
            .replace("__VERSION__", str(meta.get("version", "")))
            .replace("__DATA__", json.dumps(data, ensure_ascii=False)))


def main():
    check = "--check" in sys.argv
    nodos = parse_nodos(open(NODOS_MD, encoding="utf-8").read())
    modelo = yaml.safe_load(open(MODELO, encoding="utf-8"))
    validar_modelo(modelo)
    validar_despliegue(nodos)
    if errors:
        for e in errors:
            print(f"  ERR   {e}")
        sys.exit(1)
    outs = [(OUT_NODOS, render_nodos_js(nodos)), (OUT_HTML, render_html(modelo))]
    if check:
        drift = False
        for path, new in outs:
            cur = open(path, encoding="utf-8").read() if os.path.exists(path) else None
            if new != cur:
                print(f"  DRIFT {os.path.relpath(path, ROOT)}: desincronizado → corre gen_arquitectura.py")
                drift = True
        sys.exit(1 if drift else 0)
    for path, new in outs:
        open(path, "w", encoding="utf-8").write(new)
    print(f"  OK    nodos.data.js — {len(nodos)} nodos · refs R# verificadas")
    print(f"  OK    arquitectura.html — {len(modelo.get('componentes') or [])} componentes · "
          f"{len(modelo.get('relaciones') or [])} relaciones · fichas CK-NN verificadas")


if __name__ == "__main__":
    main()
