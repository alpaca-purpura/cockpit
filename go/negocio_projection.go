// negocio_projection.go — proyección objeto → Negocio (D-13 · CK-27).
//
// D-13: `negocio.yaml` NO es fuente de verdad, es una PROYECCIÓN del objeto
// normalizado. RN-9: lo derivado se computa al leer, jamás se persiste (misma
// doctrina que derivaDivergente/derivaSemaforo). Cuando una empresa no tiene
// `empresa/negocio.yaml` curado, /api/negocio deriva el shape que consumen los
// lentes Mapa vivo / Hilo de oro / Brechas del objeto (objetivos + áreas/procesos +
// brechas). El frontend no cambia: mismo contrato, mismo tipo `Negocio`.
package cockpit

import (
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

// cargarObjeto lee el objeto normalizado del shell de una empresa: empresa.yaml +
// todas las entidades (tiposObjeto). Único loader — lo comparten HandleObjeto y la
// proyección de HandleNegocio (anti-duplicación).
func cargarObjeto(base string) (map[string]any, map[string][]map[string]any, []string) {
	warnings := []string{}
	var empresaDoc map[string]any
	if raw, err := os.ReadFile(filepath.Join(base, "empresa.yaml")); err == nil {
		if m, perr := parseYAMLMap(raw); perr != nil {
			warnings = append(warnings, "empresa.yaml: yaml inválido: "+perr.Error())
		} else {
			empresaDoc = m
		}
	} else if !os.IsNotExist(err) {
		warnings = append(warnings, "empresa.yaml: "+err.Error())
	}
	t := map[string][]map[string]any{}
	for _, tipo := range tiposObjeto {
		t[tipo.carpeta] = readEntidades(base, tipo.carpeta, &warnings)
	}
	return empresaDoc, t, warnings
}

// proyectarNegocio deriva el shape `Negocio` (objetivos + áreas/procesos con semáforo
// de digitalización + brechas atadas a objetivo) del objeto normalizado. Devuelve nil
// si el objeto no tiene nada que proyectar → empty-state honesto, igual que sin
// negocio.yaml.
func proyectarNegocio(empresaDoc map[string]any, t map[string][]map[string]any) map[string]any {
	objetivos := t["objetivos"]
	areas := t["areas"]
	procesos := t["procesos"]
	brechas := t["brechas"]
	kpis := t["kpis"]
	roles := t["roles"]

	if len(objetivos) == 0 && len(areas) == 0 && len(procesos) == 0 && len(brechas) == 0 {
		return nil
	}

	// ── lookups ──
	rolNombre := map[string]string{}
	for _, r := range roles {
		rolNombre[oStr(r["id"])] = oStr(r["nombre"])
	}
	// KR id → objetivo id (para resolver el hilo y las brechas).
	krToObj := map[string]string{}
	for _, o := range objetivos {
		oid := oStr(o["id"])
		for _, krv := range keyResults(o) {
			if kid := oStr(oMap(krv)["id"]); kid != "" {
				krToObj[kid] = oid
			}
		}
	}
	// proceso id → set de objetivo ids (vía sus kpis: kpi.proceso_ref → contribuye_a.kr_ref → objetivo).
	procObjs := map[string]map[string]bool{}
	for _, k := range kpis {
		prid := oStr(k["proceso_ref"])
		if prid == "" {
			continue
		}
		for _, cv := range oList(k["contribuye_a"]) {
			krRef := oStr(oMap(cv)["kr_ref"])
			if krRef == "" {
				continue
			}
			oid := krToObj[krRef]
			if oid == "" {
				oid = objetivoDeKR(krRef)
			}
			if oid == "" {
				continue
			}
			if procObjs[prid] == nil {
				procObjs[prid] = map[string]bool{}
			}
			procObjs[prid][oid] = true
		}
	}

	// ── objetivos (vigentes; el KR representativo teje el hilo) ──
	projObjetivos := []map[string]any{}
	for _, o := range objetivos {
		if oStr(oMap(o["estado"])["estado"]) == "deprecado" {
			continue
		}
		po := map[string]any{"id": oStr(o["id"]), "nombre": oStr(o["nombre"])}
		var kr map[string]any
		for _, krv := range keyResults(o) {
			m := oMap(krv)
			if kr == nil {
				kr = m
			}
			if oStr(m["kpi_ref"]) != "" { // preferí el KR anclado a un KPI (serie real)
				kr = m
				break
			}
		}
		if kr != nil {
			po["kr"] = firstStr(kr["descripcion"], kr["metrica"])
			po["from"] = numToStr(kr["from"])
			po["to"] = numToStr(kr["to"])
			po["unit"] = oStr(kr["unit"])
		}
		projObjetivos = append(projObjetivos, po)
	}

	// ── áreas + procesos (N:M por areas_ref; huérfanos a un área sintética) ──
	procShape := func(p map[string]any) map[string]any {
		prid := oStr(p["id"])
		objs := []string{}
		for oid := range procObjs[prid] {
			objs = append(objs, oid)
		}
		sort.Strings(objs)
		dig := oStr(p["digital"])
		if dig == "" {
			dig = "manual"
		}
		return map[string]any{
			"id":      prid,
			"nombre":  oStr(p["nombre"]),
			"sistema": oStr(oMap(p["provisto_por"])["nombre"]),
			"digital": dig,
			"obj":     objs,
			"puesto":  rolNombre[oStr(p["dueño_ref"])],
			"fuente":  oStr(p["fuente"]),
			"conf":    oStr(p["conf"]),
			"ciclo":   oStr(p["ciclo"]),
		}
	}
	procsPorArea := map[string][]map[string]any{}
	huerfanos := []map[string]any{}
	for _, p := range procesos {
		refs := oList(p["areas_ref"])
		if len(refs) == 0 {
			huerfanos = append(huerfanos, procShape(p))
			continue
		}
		shape := procShape(p)
		for _, av := range refs {
			if aid := oStr(av); aid != "" {
				procsPorArea[aid] = append(procsPorArea[aid], shape)
			}
		}
	}
	projAreas := []map[string]any{}
	for _, a := range areas {
		aid := oStr(a["id"])
		pl := procsPorArea[aid]
		if pl == nil {
			pl = []map[string]any{}
		}
		projAreas = append(projAreas, map[string]any{
			"id":       aid,
			"nombre":   oStr(a["nombre"]),
			"lider":    rolNombre[oStr(a["dueño_ref"])],
			"procesos": pl,
		})
	}
	if len(huerfanos) > 0 {
		projAreas = append(projAreas, map[string]any{
			"id": "_sin-area", "nombre": "(sin área asignada)", "procesos": huerfanos,
		})
	}

	// ── brechas (atadas a objetivo vía kr_ref) ──
	tipoLbl := map[string]string{
		"target_variance":    "Sistema",
		"nonconformity":      "Proceso",
		"assessment_finding": "Proceso",
	}
	projBrechas := []map[string]any{}
	for _, b := range brechas {
		pb := map[string]any{
			"nombre": oStr(b["nombre"]),
			"sub":    oStr(b["sub"]),
			"costo":  oStr(b["costo"]),
			"prio":   defStr(oStr(b["prio"]), "baja"),
		}
		gt := oStr(b["tipo"])
		if lbl, ok := tipoLbl[gt]; ok {
			pb["tipo"] = lbl
		} else {
			pb["tipo"] = gt
		}
		var obj string
		for _, kv := range oList(b["kr_ref"]) {
			krid := oStr(kv)
			if o := krToObj[krid]; o != "" {
				obj = o
				break
			}
			if o := objetivoDeKR(krid); o != "" {
				obj = o
				break
			}
		}
		if obj != "" {
			pb["obj"] = obj
		} else {
			pb["obj"] = nil
		}
		if sev := oStr(b["severidad"]); sev != "" {
			pb["costoLbl"] = "severidad " + sev
		}
		projBrechas = append(projBrechas, pb)
	}

	titulo := firstStr(empresaDoc["razon_social"], empresaDoc["nombre"], empresaDoc["id"])
	if titulo == "" {
		titulo = "Diagnóstico de negocio"
	}

	return map[string]any{
		"empresa":   oStr(empresaDoc["id"]),
		"titulo":    titulo,
		"nota":      "Proyección automática del objeto normalizado (D-13 · RN-9). Para override, curá empresa/negocio.yaml.",
		"objetivos": projObjetivos,
		"areas":     projAreas,
		"brechas":   projBrechas,
	}
}

// ── helpers ──

// keyResults tolera ambas formas del campo (plural `key_results` en los datos,
// singular `key_result` en el schema).
func keyResults(o map[string]any) []any {
	if kr := oList(o["key_results"]); len(kr) > 0 {
		return kr
	}
	return oList(o["key_result"])
}

// objetivoDeKR extrae el id de objetivo de un id de KR ("obj-x#kr1" → "obj-x").
func objetivoDeKR(krRef string) string {
	if i := strings.Index(krRef, "#"); i > 0 {
		return krRef[:i]
	}
	return ""
}

// numToStr lleva los numéricos del objeto (v2) al string que espera el tipo Negocio
// del frontend; conserva strings tal cual (formas legacy "semanas"/"días").
func numToStr(v any) string {
	if s, ok := v.(string); ok {
		return s
	}
	if n, ok := oNum(v); ok {
		if n == float64(int64(n)) {
			return strconv.FormatInt(int64(n), 10)
		}
		return strconv.FormatFloat(n, 'f', -1, 64)
	}
	return ""
}

func firstStr(vs ...any) string {
	for _, v := range vs {
		if s := oStr(v); s != "" {
			return s
		}
	}
	return ""
}

func defStr(s, def string) string {
	if s == "" {
		return def
	}
	return s
}
