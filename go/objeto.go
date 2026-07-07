// objeto.go — GET /api/objeto (el objeto normalizado completo · BL-02 · CK-13).
//
// Convergencia del lado lectura TERMINADA: las 9 entidades de
// sistema/schema/objeto.schema.yaml (empresa · persona · rol · área · proceso ·
// sistema · objetivo · capability · brecha) leídas un-archivo-por-entidad del shell
// de la empresa (empresa/<tipo>/, layout plano — D-15; empresa.yaml = la raíz del
// tenant) y validadas JUNTAS al leer: las refs del Hilo de Oro cruzan entidades,
// así que el chokepoint necesita el objeto entero. Supersede /api/personas (CK-12)
// — mismo dato, ahora una rebanada del payload completo. negocio.yaml sigue aparte
// (D-13: proyección curada a mano hasta voltearla a generada → BL-19).
package cockpit

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// tiposObjeto: carpeta (plural, = la "tabla") → singular (para los warnings).
// El orden es el de objeto.schema.yaml; empresa va aparte (un archivo, no carpeta).
var tiposObjeto = []struct{ carpeta, singular string }{
	{"personas", "persona"},
	{"roles", "rol"},
	{"areas", "area"},
	{"procesos", "proceso"},
	{"sistemas", "sistema"},
	{"objetivos", "objetivo"},
	{"capabilities", "capability"},
	{"brechas", "brecha"},
}

// HandleObjeto — GET /api/objeto?empresa=.
func (d *Directorio) HandleObjeto(w http.ResponseWriter, r *http.Request) {
	empresa := r.URL.Query().Get("empresa")
	if empresa == "" {
		writeError(w, 400, "query param \"empresa\" requerido", nil)
		return
	}
	// Misma altitud que /api/negocio: la EMPRESA (registry), no el sistema.
	proj, ok := d.deps.ProjectByName(empresa)
	if !ok {
		writeError(w, 400, "empresa desconocida: "+empresa, nil)
		return
	}
	root := proj.Directorio.Repo
	if root == "" {
		root = proj.Path
	}
	base := filepath.Join(root, "empresa")

	warnings := []string{}

	// La raíz del tenant: empresa.yaml (ancla de identidad, sin listas de hijos).
	// Ausente → null (empty-state honesto, como negocio.yaml).
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
	warnings = append(warnings, validateObjeto(empresa, empresaDoc, t)...)

	writeJSON(w, 200, map[string]any{
		"empresa":      empresaDoc,
		"personas":     t["personas"],
		"roles":        t["roles"],
		"areas":        t["areas"],
		"procesos":     t["procesos"],
		"sistemas":     t["sistemas"],
		"objetivos":    t["objetivos"],
		"capabilities": t["capabilities"],
		"brechas":      t["brechas"],
		"path":         base,
		"warnings":     warnings,
	})
}

// readEntidades lee <base>/<tipo>/*.yaml (un archivo = una entidad, objeto.schema).
// Carpeta ausente = [] (la empresa aún no pobló ese tipo, no es error); un archivo
// ilegible/mal formado = warning y se sigue — nunca romper la respuesta entera por
// un archivo malo. os.ReadDir ya ordena por nombre → orden estable.
func readEntidades(base, tipo string, warnings *[]string) []map[string]any {
	out := []map[string]any{}
	dir := filepath.Join(base, tipo)
	entries, err := os.ReadDir(dir)
	if err != nil {
		if !os.IsNotExist(err) {
			*warnings = append(*warnings, fmt.Sprintf("%s/: %v", tipo, err))
		}
		return out
	}
	for _, e := range entries {
		name := e.Name()
		if e.IsDir() || (!strings.HasSuffix(name, ".yaml") && !strings.HasSuffix(name, ".yml")) {
			continue
		}
		raw, err := os.ReadFile(filepath.Join(dir, name))
		if err != nil {
			*warnings = append(*warnings, fmt.Sprintf("%s/%s: %v", tipo, name, err))
			continue
		}
		m, err := parseYAMLMap(raw)
		if err != nil {
			*warnings = append(*warnings, fmt.Sprintf("%s/%s: yaml inválido: %v", tipo, name, err))
			continue
		}
		out = append(out, m)
	}
	return out
}

// ---- helpers de forma (yaml.v3 → any) ----

func oStr(v any) string         { s, _ := v.(string); return s }
func oList(v any) []any         { l, _ := v.([]any); return l }
func oMap(v any) map[string]any { m, _ := v.(map[string]any); return m }

// enums de objeto.schema.yaml (espejo — el subconjunto que rompe silencioso).
var (
	objConfOK        = map[string]bool{"alta": true, "media": true, "baja": true}
	objPrioOK        = objConfOK // misma terna (M28)
	objFuenteOK      = map[string]bool{"repo": true, "Sistema leído": true, "Entrevista": true, "Declarado": true, "Inferido": true}
	objDigitalOK     = map[string]bool{"manual": true, "externo": true, "integrado": true}
	objProcedenciaOK = map[string]bool{"propio": true, "compartido": true, "externo": true, "terciarizado": true}
	objSirveAOK      = map[string]bool{"interno": true, "cliente-final": true}
	objTipoActOK     = map[string]bool{"humana": true, "sistema": true, "reunion": true, "decision": true, "espera": true}
	objGapTipoOK     = map[string]bool{"nonconformity": true, "target_variance": true, "assessment_finding": true}
)

// validateObjeto espeja los invariantes de sistema/schema/objeto.schema.yaml sobre
// el objeto ENTERO — el subconjunto que rompe silencioso en cualquier consumidor:
// ids únicos por tipo, toda ref (FK + ref local `#`) resuelve, enums válidos,
// key_results ≥ 1, RACI A exactamente 1, sin ciclos (reporta_a · area.parent_ref).
// Warnings no-fatales (patrón validateNegocio): el dato igual se sirve, delatado.
func validateObjeto(slug string, empresaDoc map[string]any, t map[string][]map[string]any) []string {
	w := []string{}

	// -- pase 1: ids por tipo + básicos (id único, nombre, conf/fuente) --
	ids := map[string]map[string]bool{} // singular → set de ids
	for _, tipo := range tiposObjeto {
		set := map[string]bool{}
		for i, m := range t[tipo.carpeta] {
			id := oStr(m["id"])
			if id == "" {
				w = append(w, fmt.Sprintf("%s #%d sin id", tipo.singular, i+1))
				continue
			}
			loc := fmt.Sprintf("%s %q", tipo.singular, id)
			if set[id] {
				w = append(w, loc+": id duplicado (vuelve ambiguas las refs)")
			}
			set[id] = true
			if oStr(m["nombre"]) == "" {
				w = append(w, loc+": sin nombre")
			}
			if c := oStr(m["conf"]); c != "" && !objConfOK[c] {
				w = append(w, fmt.Sprintf("%s: conf %q inválida (esperado alta|media|baja)", loc, c))
			}
			if f := oStr(m["fuente"]); f != "" && !objFuenteOK[f] {
				w = append(w, fmt.Sprintf("%s: fuente %q inválida (esperado repo|Sistema leído|Entrevista|Declarado|Inferido)", loc, f))
			}
		}
		ids[tipo.singular] = set
	}

	// key_results = weak-entity de objetivo; sus ids locales (obj-x#krN) son el
	// destino de brecha.kr_ref → se juntan acá antes de validar refs.
	krIDs := map[string]bool{}
	for _, o := range t["objetivos"] {
		for _, kr := range oList(o["key_results"]) {
			if id := oStr(oMap(kr)["id"]); id != "" {
				krIDs[id] = true
			}
		}
	}

	// ref chequea una FK simple contra uno o más tipos destino (para refs union
	// como brecha.against_ref → capability|proceso|sistema|objetivo).
	ref := func(loc, campo, refID string, destinos ...string) {
		if refID == "" {
			return
		}
		for _, d := range destinos {
			if ids[d][refID] {
				return
			}
		}
		w = append(w, fmt.Sprintf("%s: %s %q no existe en %s", loc, campo, refID, strings.Join(destinos, "|")))
	}
	refList := func(loc, campo string, v any, destinos ...string) {
		for _, item := range oList(v) {
			ref(loc, campo, oStr(item), destinos...)
		}
	}

	// -- empresa (la raíz del tenant) --
	if empresaDoc != nil {
		id := oStr(empresaDoc["id"])
		if id == "" {
			w = append(w, "empresa.yaml: sin id")
		} else if id != slug {
			w = append(w, fmt.Sprintf("empresa.yaml: id %q ≠ slug de la empresa %q (el id ES el ?empresa= del cockpit)", id, slug))
		}
		if oStr(empresaDoc["razon_social"]) == "" {
			w = append(w, "empresa.yaml: sin razon_social")
		}
		if c := oStr(empresaDoc["conf"]); c != "" && !objConfOK[c] {
			w = append(w, fmt.Sprintf("empresa.yaml: conf %q inválida", c))
		}
		if f := oStr(empresaDoc["fuente"]); f != "" && !objFuenteOK[f] {
			w = append(w, fmt.Sprintf("empresa.yaml: fuente %q inválida", f))
		}
	}

	// -- persona: roles[].rol → rol · reporta_a → persona (+ ciclo) --
	reportaA := map[string]string{}
	for _, p := range t["personas"] {
		id := oStr(p["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("persona %q", id)
		for _, rr := range oList(p["roles"]) {
			ref(loc, "rol", oStr(oMap(rr)["rol"]), "rol")
		}
		if r := oStr(p["reporta_a"]); r != "" {
			ref(loc, "reporta_a", r, "persona")
			if ids["persona"][r] {
				reportaA[id] = r
			}
		}
	}
	ciclos(&w, "persona", "reporta_a", "el organigrama debe ser ascendente", reportaA)

	// -- area: lider_ref → rol · parent_ref → area (+ ciclo, invariante D-12) --
	areaParent := map[string]string{}
	for _, a := range t["areas"] {
		id := oStr(a["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("area %q", id)
		ref(loc, "lider_ref", oStr(a["lider_ref"]), "rol")
		if p := oStr(a["parent_ref"]); p != "" {
			ref(loc, "parent_ref", p, "area")
			if ids["area"][p] {
				areaParent[id] = p
			}
		}
	}
	ciclos(&w, "area", "parent_ref", "la anidación organizativa termina en la empresa", areaParent)

	// -- proceso: el hub del Hilo — refs a rol/area/sistema/proceso/capability +
	//    actividades embebidas (id local único, carril, tipo, RACI A==1) --
	for _, p := range t["procesos"] {
		id := oStr(p["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("proceso %q", id)
		ref(loc, "dueño_ref", oStr(p["dueño_ref"]), "rol")
		refList(loc, "areas_ref", p["areas_ref"], "area")
		refList(loc, "sistemas_ref", p["sistemas_ref"], "sistema")
		refList(loc, "secuencia_ref", p["secuencia_ref"], "proceso")
		refList(loc, "realiza_capabilities", p["realiza_capabilities"], "capability")
		if d := oStr(p["digital"]); d != "" && !objDigitalOK[d] {
			w = append(w, fmt.Sprintf("%s: digital %q inválido (esperado manual|externo|integrado)", loc, d))
		}
		actIDs := map[string]bool{}
		for i, av := range oList(p["actividades"]) {
			a := oMap(av)
			aid := oStr(a["id"])
			aloc := fmt.Sprintf("%s actividad #%d", loc, i+1)
			if aid == "" {
				w = append(w, aloc+" sin id (local `"+id+"#aN`, direccionable por el grafo)")
			} else {
				aloc = fmt.Sprintf("%s actividad %q", loc, aid)
				if actIDs[aid] {
					w = append(w, aloc+": id local duplicado dentro del padre")
				}
				actIDs[aid] = true
			}
			ref(aloc, "carril_ref", oStr(a["carril_ref"]), "rol")
			refList(aloc, "sistemas_ref", a["sistemas_ref"], "sistema")
			if tp := oStr(a["tipo"]); tp != "" && !objTipoActOK[tp] {
				w = append(w, fmt.Sprintf("%s: tipo %q inválido (esperado humana|sistema|reunion|decision|espera)", aloc, tp))
			}
			if raci := oMap(a["raci"]); raci != nil {
				// A exactamente 1 (RACI, M25): un string no vacío — ni lista, ni ausente.
				if aRef := oStr(raci["A"]); aRef == "" {
					w = append(w, aloc+": raci.A debe ser exactamente 1 rol (string, no lista/ausente)")
				} else {
					ref(aloc, "raci.A", aRef, "rol")
				}
				for _, letra := range []string{"R", "C", "I"} {
					refList(aloc, "raci."+letra, raci[letra], "rol")
				}
			}
		}
	}

	// -- sistema: enums procedencia/sirve_a · refs capability/sistema --
	for _, s := range t["sistemas"] {
		id := oStr(s["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("sistema %q", id)
		if pr := oStr(s["procedencia"]); pr != "" && !objProcedenciaOK[pr] {
			w = append(w, fmt.Sprintf("%s: procedencia %q inválida (esperado propio|compartido|externo|terciarizado)", loc, pr))
		}
		if sv := oStr(s["sirve_a"]); sv != "" && !objSirveAOK[sv] {
			w = append(w, fmt.Sprintf("%s: sirve_a %q inválido (esperado interno|cliente-final)", loc, sv))
		}
		refList(loc, "capabilities_ref", s["capabilities_ref"], "capability")
		refList(loc, "integra_con_ref", s["integra_con_ref"], "sistema")
	}

	// -- objetivo: key_results ≥ 1 (invariante) · kr campos mínimos · driver_refs --
	for _, o := range t["objetivos"] {
		id := oStr(o["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("objetivo %q", id)
		ref(loc, "dueño_ref", oStr(o["dueño_ref"]), "rol")
		ref(loc, "parent_ref", oStr(o["parent_ref"]), "objetivo")
		krs := oList(o["key_results"])
		if len(krs) == 0 {
			w = append(w, loc+": key_results vacío (invariante: ≥ 1 — sin KR no hay Hilo)")
		}
		for i, krv := range krs {
			kr := oMap(krv)
			kloc := fmt.Sprintf("%s kr #%d", loc, i+1)
			if kid := oStr(kr["id"]); kid != "" {
				kloc = fmt.Sprintf("%s kr %q", loc, kid)
			}
			for _, campo := range []string{"descripcion", "metrica", "from", "to"} {
				if oStr(kr[campo]) == "" {
					w = append(w, fmt.Sprintf("%s: sin %s (OKR: el KR se mide o no es KR)", kloc, campo))
				}
			}
			refList(kloc, "driver_refs", kr["driver_refs"], "proceso", "capability")
		}
	}

	// -- capability: parent_ref → capability --
	for _, c := range t["capabilities"] {
		if id := oStr(c["id"]); id != "" {
			ref(fmt.Sprintf("capability %q", id), "parent_ref", oStr(c["parent_ref"]), "capability")
		}
	}

	// -- brecha: against_ref REQUERIDO (verificabilidad ISO 19011) · enums · kr_ref --
	for _, b := range t["brechas"] {
		id := oStr(b["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("brecha %q", id)
		if ag := oStr(b["against_ref"]); ag == "" {
			w = append(w, loc+": sin against_ref (requerido — una brecha apunta a lo deficiente)")
		} else {
			ref(loc, "against_ref", ag, "capability", "proceso", "sistema", "objetivo")
		}
		if tp := oStr(b["tipo"]); tp != "" && !objGapTipoOK[tp] {
			w = append(w, fmt.Sprintf("%s: tipo %q inválido (esperado nonconformity|target_variance|assessment_finding)", loc, tp))
		}
		if pr := oStr(b["prio"]); pr != "" && !objPrioOK[pr] {
			w = append(w, fmt.Sprintf("%s: prio %q inválida (esperado alta|media|baja)", loc, pr))
		}
		for _, krv := range oList(b["kr_ref"]) {
			if kid := oStr(krv); kid != "" && !krIDs[kid] {
				w = append(w, fmt.Sprintf("%s: kr_ref %q no existe en los key_results de objetivos/", loc, kid))
			}
		}
	}

	return w
}

// ciclos detecta ciclos en una self-ref (reporta_a, parent_ref): se avisa una vez
// por miembro del ciclo (la caminata vuelve al punto de partida). Keys ordenadas →
// warnings deterministas.
func ciclos(w *[]string, tipo, campo, porQue string, edges map[string]string) {
	starts := make([]string, 0, len(edges))
	for id := range edges {
		starts = append(starts, id)
	}
	sort.Strings(starts)
	for _, start := range starts {
		cur, steps := edges[start], 0
		for cur != "" && steps <= len(edges) {
			if cur == start {
				*w = append(*w, fmt.Sprintf("%s %q: %s forma un ciclo (%s)", tipo, start, campo, porQue))
				break
			}
			cur = edges[cur]
			steps++
		}
	}
}
