// personas.go — GET /api/personas (pilar Personas · BL-01 · CK-12).
//
// Primera rebanada del objeto normalizado (sistema/schema/objeto.schema.yaml): lee
// persona + rol un-archivo-por-entidad del SHELL de la empresa (empresa/<tipo>/,
// layout plano — D-15) y los sirve juntos. negocio.yaml NO se toca (D-13: es una
// proyección; el pilar Personas vive upstream, en las entidades). Carpetas ausentes →
// listas vacías = empty-state honesto (espeja /api/negocio).
package cockpit

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// HandlePersonas — GET /api/personas?empresa=.
func (d *Directorio) HandlePersonas(w http.ResponseWriter, r *http.Request) {
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
	personas := readEntidades(base, "personas", &warnings)
	roles := readEntidades(base, "roles", &warnings)
	warnings = append(warnings, validatePersonas(personas, roles)...)
	writeJSON(w, 200, map[string]any{
		"personas": personas,
		"roles":    roles,
		"path":     base,
		"warnings": warnings,
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

// validatePersonas espeja los invariantes de sistema/schema/objeto.schema.yaml para
// persona y rol — SOLO el subconjunto que rompe silencioso en la UI: una ref que no
// resuelve nunca enlaza, un conf inválido pinta el dot gris, un ciclo de reporta_a
// colgaría cualquier recorrido del organigrama. Warnings no-fatales (como negocio):
// el dato igual se sirve, el cockpit lo delata en vez de mentir en silencio.
func validatePersonas(personas, roles []map[string]any) []string {
	w := []string{}
	asStr := func(v any) string { s, _ := v.(string); return s }
	asList := func(v any) []any { l, _ := v.([]any); return l }

	confOK := map[string]bool{"alta": true, "media": true, "baja": true}
	fuenteOK := map[string]bool{"repo": true, "Sistema leído": true, "Entrevista": true, "Declarado": true, "Inferido": true}

	// ids únicos por tipo + campos mínimos (id, nombre) + enums de provenance.
	collect := func(tipo string, items []map[string]any, ids map[string]bool) {
		for i, m := range items {
			id := asStr(m["id"])
			if id == "" {
				w = append(w, fmt.Sprintf("%s #%d sin id", tipo, i+1))
				continue
			}
			loc := fmt.Sprintf("%s %q", tipo, id)
			if ids[id] {
				w = append(w, loc+": id duplicado (vuelve ambiguas las refs)")
			}
			ids[id] = true
			if asStr(m["nombre"]) == "" {
				w = append(w, loc+": sin nombre")
			}
			if c := asStr(m["conf"]); c != "" && !confOK[c] {
				w = append(w, fmt.Sprintf("%s: conf %q inválida (esperado alta|media|baja)", loc, c))
			}
			if f := asStr(m["fuente"]); f != "" && !fuenteOK[f] {
				w = append(w, fmt.Sprintf("%s: fuente %q inválida (esperado repo|Sistema leído|Entrevista|Declarado|Inferido)", loc, f))
			}
		}
	}
	rolIDs := map[string]bool{}
	perIDs := map[string]bool{}
	collect("rol", roles, rolIDs)
	collect("persona", personas, perIDs)

	// persona.roles[].rol resuelve (owning side de persona↔rol) · reporta_a resuelve.
	reportaA := map[string]string{}
	for _, p := range personas {
		id := asStr(p["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("persona %q", id)
		for _, rr := range asList(p["roles"]) {
			rm, ok := rr.(map[string]any)
			if !ok {
				continue
			}
			if ref := asStr(rm["rol"]); ref != "" && !rolIDs[ref] {
				w = append(w, fmt.Sprintf("%s: rol %q no existe en roles/", loc, ref))
			}
		}
		if ref := asStr(p["reporta_a"]); ref != "" {
			if !perIDs[ref] {
				w = append(w, fmt.Sprintf("%s: reporta_a %q no existe en personas/", loc, ref))
			} else {
				reportaA[id] = ref
			}
		}
	}

	// Ciclo en reporta_a (self-ref ascendente, organigrama): se avisa una vez por
	// miembro del ciclo (la caminata vuelve al punto de partida). Keys ordenadas →
	// warnings deterministas.
	starts := make([]string, 0, len(reportaA))
	for id := range reportaA {
		starts = append(starts, id)
	}
	sort.Strings(starts)
	for _, start := range starts {
		cur, steps := reportaA[start], 0
		for cur != "" && steps <= len(reportaA) {
			if cur == start {
				w = append(w, fmt.Sprintf("persona %q: reporta_a forma un ciclo (el organigrama debe ser ascendente)", start))
				break
			}
			cur = reportaA[cur]
			steps++
		}
	}
	return w
}
