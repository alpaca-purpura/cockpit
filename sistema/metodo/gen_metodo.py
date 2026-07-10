#!/usr/bin/env python3
"""gen_metodo.py — metodología-as-code: valida + regenera (CK-19).

Gemelo de `sistema/arquitectura/gen_arquitectura.py`, para el eje METODOLOGÍA:

  SSoT de datos:  methodologies.yaml (M-cards) + proceso/** (Definición: módulos→etapas→pasos)
  Contrato:       methodology.schema.yaml
  Vista generada: METODOLOGIA.md §4  — bloques  <!-- GEN:indice --> / GEN:cards / GEN:tabla

Qué hace en cada corrida:
  1. Valida methodologies.yaml contra el schema (campos, enums, refs combina_con).
  2. Valida el árbol proceso/ (frontmatter required, id==ruta, refs de módulo/etapa,
     tokens M\\d+ de `metodologia:` resuelven al catálogo).
  3. Renderiza los 3 bloques GEN de METODOLOGIA.md desde methodologies.yaml.
  4. Si algo no valida → imprime `ERR …`, sale 1 (no escribe nada).
  5. `--check`: compara el render vs disco; si difiere imprime `DRIFT …`, sale 1. No escribe.
  6. Normal: escribe METODOLOGIA.md (bloques GEN) + imprime `OK`.

Única dependencia no-stdlib: pyyaml.  Wired al gate: `.githooks/pre-commit` (CK-19).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

BASE = Path(__file__).resolve().parent          # sistema/metodo/
MET_YAML = BASE / "methodologies.yaml"
MET_MD = BASE / "METODOLOGIA.md"
SCHEMA_YAML = BASE / "methodology.schema.yaml"
PROCESO = BASE / "proceso"

MID_RE = re.compile(r"^M[0-9]{2}$")
MREF_RE = re.compile(r"^M[0-9]+$")               # tokens M\d+ dentro de metodologia:[]
STEPREF_RE = re.compile(r"\bm[0-9]+\.[a-z0-9]+\.[a-z0-9]+\b")


# ─────────────────────────── carga ───────────────────────────
def load_yaml(path: Path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def cards(met: dict) -> dict:
    """Las claves MNN (todo menos _meta), en orden numérico."""
    ks = [k for k in met if k != "_meta"]
    return {k: met[k] for k in sorted(ks, key=lambda k: int(k[1:]))}


# ─────────────────────── validación M-cards ───────────────────────
def validar_metodologias(met: dict, schema: dict, errors: list[str]) -> None:
    en = schema["enums"]
    req = schema["card"]["required"]
    C = cards(met)

    meta = met.get("_meta") or {}
    if meta.get("total") != len(C):
        errors.append(f"_meta.total={meta.get('total')} != {len(C)} M-cards presentes")
    for lbl in ("familias", "backbone_labels"):
        if not isinstance(meta.get(lbl), dict):
            errors.append(f"_meta.{lbl} ausente o no es dict (lo necesita el generador)")

    for mid, c in C.items():
        w = f"{mid}"
        if not MID_RE.match(mid):
            errors.append(f"{w}: id no cumple ^M[0-9]{{2}}$")
        if not isinstance(c, dict):
            errors.append(f"{w}: no es un mapa")
            continue
        for f in req:
            if f not in c:
                errors.append(f"{w}: falta campo requerido `{f}`")
        if c.get("familia") not in en["familia"]:
            errors.append(f"{w}: familia `{c.get('familia')}` ∉ {en['familia']}")
        if c.get("modo") not in en["modo"]:
            errors.append(f"{w}: modo `{c.get('modo')}` ∉ {en['modo']}")
        if c.get("objeto_primario") not in en["objeto"]:
            errors.append(f"{w}: objeto_primario `{c.get('objeto_primario')}` ∉ enums.objeto")
        for s in c.get("objetos_secundarios") or []:
            if s not in en["objeto"]:
                errors.append(f"{w}: objeto_secundario `{s}` ∉ enums.objeto")
        ps = c.get("principios") or []
        if not ps:
            errors.append(f"{w}: principios vacío")
        for p in ps:
            if p not in en["principio"]:
                errors.append(f"{w}: principio `{p}` ∉ enums.principio")
        fu = c.get("fuente") or {}
        for f in ("autor", "obra", "url"):
            if not fu.get(f):
                errors.append(f"{w}: fuente.{f} ausente")
        for comb in c.get("combina_con") or []:
            m = comb.get("m")
            if m not in C:
                errors.append(f"{w}: combina_con.m `{m}` no resuelve a una M-card")
            if not comb.get("como"):
                errors.append(f"{w}: combina_con[{m}] sin `como`")
        donde = c.get("donde") or {}
        for mod in donde.get("modulos") or []:
            if mod not in en["modulo"]:
                errors.append(f"{w}: donde.modulos `{mod}` ∉ enums.modulo")


# ─────────────────────── validación proceso/ ───────────────────────
FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def frontmatter(path: Path):
    m = FM_RE.match(path.read_text(encoding="utf-8"))
    if not m:
        return None
    return yaml.safe_load(m.group(1))


def validar_proceso(met: dict, schema: dict, errors: list[str], warnings: list[str]) -> None:
    if not PROCESO.is_dir():
        warnings.append("proceso/ ausente — se omite la validación del árbol")
        return
    sp = schema["proceso"]
    mid_keys = set(cards(met))
    modulos: dict[str, dict] = {}
    etapas: dict[str, dict] = {}
    pasos: dict[str, dict] = {}

    # módulos
    for mfile in sorted(PROCESO.glob("*/_modulo.md")):
        fm = frontmatter(mfile)
        rel = mfile.parent.name
        if not fm:
            errors.append(f"{mfile}: sin frontmatter")
            continue
        for f in sp["modulo"]["required"]:
            if f not in fm:
                errors.append(f"{mfile}: falta `{f}`")
        if fm.get("id") != rel:
            errors.append(f"{mfile}: id `{fm.get('id')}` != carpeta `{rel}`")
        modulos[fm.get("id")] = fm

    # etapas
    for efile in sorted(PROCESO.glob("*/*/_etapa.md")):
        fm = frontmatter(efile)
        exp = f"{efile.parent.parent.name}.{efile.parent.name}"
        if not fm:
            errors.append(f"{efile}: sin frontmatter")
            continue
        for f in sp["etapa"]["required"]:
            if f not in fm:
                errors.append(f"{efile}: falta `{f}`")
        if fm.get("id") != exp:
            errors.append(f"{efile}: id `{fm.get('id')}` != ruta `{exp}`")
        if fm.get("modulo") not in modulos:
            errors.append(f"{efile}: modulo `{fm.get('modulo')}` no resuelve")
        etapas[fm.get("id")] = fm

    # pasos
    for pfile in sorted(PROCESO.glob("*/*/*.md")):
        if pfile.name in ("_modulo.md", "_etapa.md"):
            continue
        fm = frontmatter(pfile)
        stem = pfile.stem
        exp = f"{pfile.parent.parent.name}.{pfile.parent.name}.{stem}"
        if not fm:
            errors.append(f"{pfile}: sin frontmatter")
            continue
        for f in sp["paso"]["required"]:
            if f not in fm:
                errors.append(f"{pfile}: falta `{f}`")
        if fm.get("id") != exp:
            errors.append(f"{pfile}: id `{fm.get('id')}` != ruta `{exp}`")
        if fm.get("modulo") not in modulos:
            errors.append(f"{pfile}: modulo `{fm.get('modulo')}` no resuelve")
        if fm.get("etapa") not in etapas:
            errors.append(f"{pfile}: etapa `{fm.get('etapa')}` no resuelve")
        for tok in fm.get("metodologia") or []:
            if MREF_RE.match(str(tok)) and tok not in mid_keys:
                errors.append(f"{pfile}: metodologia `{tok}` no resuelve a una M-card")
        pasos[fm.get("id")] = fm

    # refs de desbloqueo a pasos (parcial → warning, el árbol está a medio poblar)
    for pid, fm in pasos.items():
        for ref in STEPREF_RE.findall(str(fm.get("desbloqueo") or "")):
            if ref not in pasos:
                warnings.append(f"{pid}: desbloqueo referencia paso inexistente `{ref}`")


# ─────────────────────── render (SSoT → §4) ───────────────────────
def short_name(nombre: str) -> str:
    return nombre.split(" / ")[0].split(" (")[0].strip()


def by_family(met: dict) -> dict:
    """{letra: [MNN…]} en orden de familia (A..H) y numérico dentro de cada una."""
    out: dict[str, list[str]] = {}
    for mid, c in cards(met).items():
        out.setdefault(c["familia"], []).append(mid)
    return {L: out[L] for L in sorted(out)}


def render_indice(met: dict) -> str:
    fam = met["_meta"]["familias"]
    lines = []
    for L, mids in by_family(met).items():
        links = " · ".join(f"[{short_name(met[m]['nombre'])}](#{m.lower()})" for m in mids)
        lines.append(f"- **{L} · {fam[L]}:** {links}")
    return "\n".join(lines)


def render_cards(met: dict) -> str:
    fam = met["_meta"]["familias"]
    obj = met["_meta"]["backbone_labels"]
    out: list[str] = []
    for L, mids in by_family(met).items():
        out.append(f"### Familia {L} · {fam[L]}\n")
        blocks = []
        for m in mids:
            c = met[m]
            fu = c["fuente"]
            objeto = f"{c['objeto_primario']} {obj[c['objeto_primario']]}"
            sec = c.get("objetos_secundarios") or []
            if sec:
                objeto += " · sec: " + ", ".join(sec)
            combina = " · ".join(f"{x['m']} ({x['como']})" for x in c["combina_con"])
            blocks.append(
                f'<a id="{m.lower()}"></a>**{m} · {c["nombre"]}**\n'
                f"- **Qué:** {c['que']}\n"
                f"- **Fuente:** {fu['autor']} — {fu['obra']}. [{fu['url']}]({fu['url']})\n"
                f"- **Objeto:** {objeto}\n"
                f"- **Aporte único:** {c['aporte_unico']}\n"
                f"- **Cuándo:** {c['cuando_usar']}\n"
                f"- **Combina:** {combina}\n"
                f"- **Principios:** {', '.join(c['principios'])}"
            )
        out.append("\n\n".join(blocks))
    return "\n\n".join(out)


def render_tabla(met: dict) -> str:
    rows = [
        "| Metodología | M1 Levant. | M2 Mant. | M3 Mejora | Capa de contexto |",
        "|---|:-:|:-:|:-:|:-:|",
    ]
    for m, c in cards(met).items():
        mark = "○" if c["modo"] == "situacional" else "●"
        d = c.get("donde") or {}
        mods = d.get("modulos") or []
        cols = [mark if x in mods else "" for x in ("m1", "m2", "m3")]
        ctx = mark if d.get("capa_contexto") else ""
        label = f"{short_name(c['nombre'])} ({m})"
        rows.append(f"| {label} | {cols[0]} | {cols[1]} | {cols[2]} | {ctx} |")
    return "\n".join(rows)


def replace_block(text: str, tag: str, body: str) -> str:
    pat = re.compile(rf"(<!-- GEN:{tag} -->\n).*?(\n<!-- /GEN:{tag} -->)", re.DOTALL)
    if not pat.search(text):
        raise SystemExit(f"ERR: no encontré el bloque <!-- GEN:{tag} --> en METODOLOGIA.md")
    return pat.sub(lambda _m: _m.group(1) + body + _m.group(2), text)


# ─────────────────────────── main ───────────────────────────
def main(argv: list[str]) -> int:
    check = "--check" in argv
    met = load_yaml(MET_YAML)
    schema = load_yaml(SCHEMA_YAML)

    errors: list[str] = []
    warnings: list[str] = []
    validar_metodologias(met, schema, errors)
    validar_proceso(met, schema, errors, warnings)

    if errors:
        for e in errors:
            print(f"ERR  {e}")
        return 1

    md = MET_MD.read_text(encoding="utf-8")
    new = replace_block(md, "indice", render_indice(met))
    new = replace_block(new, "cards", render_cards(met))
    new = replace_block(new, "tabla", render_tabla(met))

    for wmsg in warnings:
        print(f"WARN {wmsg}")

    n = len(cards(met))
    if check:
        if new != md:
            print("DRIFT METODOLOGIA.md §4 desincronizado de methodologies.yaml — corré gen_metodo.py")
            return 1
        print(f"OK --check · {n} M-cards · proceso/ válido · METODOLOGIA.md §4 en sync")
        return 0

    MET_MD.write_text(new, encoding="utf-8")
    print(f"OK · {n} M-cards validadas · proceso/ válido · METODOLOGIA.md §4 regenerado")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
