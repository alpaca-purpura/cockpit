// negocio.go — GET /api/negocio (Vista de Negocio empresa-level · I-46 · Fase 5).
// Movido de devhub/go (handlers_negocio.go) en CK-02 Stage 2; lógica intacta.
//
// Altitud NUEVA: el resto del cockpit es sistema-scoped (?sistema=); esta vista cuelga
// de la EMPRESA (?empresa=). Materializa el diagnóstico M1 — objetivos del directorio +
// áreas/procesos con semáforo de digitalización + el Hilo de Oro (§19) — curado a mano
// en el SHELL de la empresa (<repo>/empresa/negocio.yaml), NO en el board/worktree
// (regla "identidad ≠ worktree desechable"). El generador de chris-corp proyecta `repo`
// a cockpit.yaml; aquí se lee de ahí (fallback a Path si no se proyectó). Sin archivo →
// negocio:null 200 = empty-state honesto (espeja /api/ledger, I-45).
package cockpit

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

// HandleNegocio — GET /api/negocio?empresa=.
func (d *Directorio) HandleNegocio(w http.ResponseWriter, r *http.Request) {
	empresa := r.URL.Query().Get("empresa")
	if empresa == "" {
		writeError(w, 400, "query param \"empresa\" requerido", nil)
		return
	}
	// La altitud es la EMPRESA → se valida contra el registry (nombres de empresa),
	// no contra los sistemas. En single-mode no hay empresas → desconocida.
	proj, ok := d.deps.ProjectByName(empresa)
	if !ok {
		writeError(w, 400, "empresa desconocida: "+empresa, nil)
		return
	}

	// El negocio vive en el shell de la empresa (Repo); fallback al board (Path) si
	// `repo` no se proyectó (cockpit.yaml viejo). Para prenter Repo==Path.
	root := proj.Directorio.Repo
	if root == "" {
		root = proj.Path
	}
	yamlPath := filepath.Join(root, "empresa", "negocio.yaml")
	raw, err := os.ReadFile(yamlPath)
	if err != nil {
		if os.IsNotExist(err) {
			// D-13: `negocio.yaml` = proyección del objeto, no fuente de verdad. Sin
			// archivo curado → derivamos el diagnóstico del objeto normalizado al leer
			// (RN-9, misma doctrina que derivaDivergente). Objeto vacío → negocio:null.
			base := filepath.Join(root, "empresa")
			empresaDoc, t, warns := cargarObjeto(base)
			if neg := proyectarNegocio(empresaDoc, t); neg != nil {
				neg["empresa"] = empresa
				writeJSON(w, 200, map[string]any{"negocio": neg, "path": yamlPath, "warnings": warns, "generated": true})
				return
			}
			writeJSON(w, 200, map[string]any{"negocio": nil, "path": yamlPath})
			return
		}
		writeError(w, 500, "error leyendo negocio.yaml: "+errnoMessage(err, yamlPath), nil)
		return
	}
	data, err := parseYAMLMap(raw)
	if err != nil {
		writeError(w, 500, "error leyendo negocio.yaml: "+err.Error(), nil)
		return
	}
	// Validación al leer (cockpit = agregador, único chokepoint de todo negocio.yaml):
	// warnings NO-fatales del subconjunto que rompe SILENCIOSO en la UI. La Vista de
	// Negocio los muestra en un banner. Contrato: .claude/harness/schema/negocio.schema.yaml.
	writeJSON(w, 200, map[string]any{"negocio": data, "path": yamlPath, "warnings": validateNegocio(data)})
}

// validateNegocio espeja .claude/harness/schema/negocio.schema.yaml. Hace cumplir SOLO
// el subconjunto que rompe silencioso en la Vista de Negocio: los enums caen a un default
// y MIENTEN (digital→manual/rojo, conf→gris, prio→baja), y un `obj` que apunta a un objetivo
// inexistente nunca resalta. El resto de campos son texto libre que la UI renderiza tal cual.
// Devuelve warnings (nunca nil): el negocio igual se sirve; el cockpit los surface, no rompe.
func validateNegocio(data map[string]any) []string {
	w := []string{}
	asList := func(v any) []any { l, _ := v.([]any); return l }
	asStr := func(v any) string { s, _ := v.(string); return s }

	// objetivos[].id: set para integridad referencial + detección de duplicados.
	objIDs := map[string]bool{}
	for i, o := range asList(data["objetivos"]) {
		m, ok := o.(map[string]any)
		if !ok {
			continue
		}
		id := asStr(m["id"])
		if id == "" {
			w = append(w, fmt.Sprintf("objetivo #%d sin id", i+1))
			continue
		}
		if objIDs[id] {
			w = append(w, fmt.Sprintf("objetivo id duplicado: %q (vuelve ambiguas las refs)", id))
		}
		objIDs[id] = true
	}
	if len(objIDs) == 0 {
		w = append(w, "no hay objetivos[] con id — el Hilo de Oro no puede tejerse")
	}

	digitalOK := map[string]bool{"manual": true, "externo": true, "integrado": true}
	enumOK := map[string]bool{"alta": true, "media": true, "baja": true} // conf y prio

	// procesos bajo areas[]: digital (req), conf (opt), obj[] (refs).
	for _, a := range asList(data["areas"]) {
		am, ok := a.(map[string]any)
		if !ok {
			continue
		}
		area := asStr(am["nombre"])
		for _, p := range asList(am["procesos"]) {
			pm, ok := p.(map[string]any)
			if !ok {
				continue
			}
			loc := fmt.Sprintf("proceso %q (área %q)", asStr(pm["nombre"]), area)
			if dig := asStr(pm["digital"]); !digitalOK[dig] {
				w = append(w, fmt.Sprintf("%s: digital %q inválido (esperado manual|externo|integrado)", loc, dig))
			}
			if c := asStr(pm["conf"]); c != "" && !enumOK[c] {
				w = append(w, fmt.Sprintf("%s: conf %q inválida (esperado alta|media|baja)", loc, c))
			}
			for _, ref := range asList(pm["obj"]) {
				if id := asStr(ref); id != "" && !objIDs[id] {
					w = append(w, fmt.Sprintf("%s: obj %q no existe en objetivos[]", loc, id))
				}
			}
		}
	}

	// brechas[]: prio (req), obj (ref opcional, null/ausente = huérfana válida).
	for i, b := range asList(data["brechas"]) {
		bm, ok := b.(map[string]any)
		if !ok {
			continue
		}
		loc := fmt.Sprintf("brecha %q", asStr(bm["nombre"]))
		if asStr(bm["nombre"]) == "" {
			loc = fmt.Sprintf("brecha #%d", i+1)
		}
		if pr := asStr(bm["prio"]); !enumOK[pr] {
			w = append(w, fmt.Sprintf("%s: prio %q inválida (esperado alta|media|baja)", loc, pr))
		}
		if raw, present := bm["obj"]; present && raw != nil {
			if id := asStr(raw); id != "" && !objIDs[id] {
				w = append(w, fmt.Sprintf("%s: obj %q no existe en objetivos[]", loc, id))
			}
		}
	}

	return w
}
