// objeto.go — GET /api/objeto (el objeto normalizado completo · BL-02 · CK-13 · v2 CK-21).
//
// v2 (historia schema-v2-hilo-de-oro-kinetica): las 12 entidades de
// sistema/schema/objeto.schema.yaml (empresa · persona · rol · área · proceso · sistema ·
// objetivo · kpi · proyecto_mejora · idea · capability · brecha) leídas un-archivo-por-entidad
// del shell (empresa/<tipo>/, layout plano — D-15) y validadas JUNTAS al leer. La respuesta
// distingue errors[] (bloqueantes: formas v1 muertas, CK-24/RN-8, RN-14, RN-15, estados
// inválidos) de warnings[] (refs colgantes, enums menores, provenance ausente). El estado
// `divergente` de una medición (declarado vs observado) se DERIVA en el payload — jamás se
// persiste (RN-9). El vocabulario de verbos se carga de sistema/schema/verbos.yaml (D-A4).
// La paridad de estos espejos contra el schema la vigila TestParidadSchema (D-A7).
package cockpit

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"

	"gopkg.in/yaml.v3"
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
	{"kpis", "kpi"},
	{"proyectos-mejora", "proyecto_mejora"},
	{"ideas", "idea"},
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

	empresaDoc, t, warnings := cargarObjeto(base)
	wv, ev := validateObjeto(empresa, empresaDoc, t)
	warnings = append(warnings, wv...)
	derivaDivergente(t["kpis"]) // anotación en el payload — el disco no se toca (RN-9)

	writeJSON(w, 200, map[string]any{
		"empresa":          empresaDoc,
		"personas":         t["personas"],
		"roles":            t["roles"],
		"areas":            t["areas"],
		"procesos":         t["procesos"],
		"sistemas":         t["sistemas"],
		"objetivos":        t["objetivos"],
		"kpis":             t["kpis"],
		"proyectos_mejora": t["proyectos-mejora"],
		"ideas":            t["ideas"],
		"capabilities":     t["capabilities"],
		"brechas":          t["brechas"],
		"path":             base,
		"warnings":         warnings,
		"errors":           ev,
	})
}

// readEntidades lee <base>/<tipo>/*.yaml (un archivo = una entidad, objeto.schema).
// Carpeta ausente = [] (la empresa aún no pobló ese tipo, no es error); un archivo
// ilegible/mal formado = warning y se sigue. os.ReadDir ordena por nombre → orden estable.
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
func oBool(v any) bool          { b, _ := v.(bool); return b }

// oNum acepta los numéricos que yaml.v3 produce (int · int64 · float64).
func oNum(v any) (float64, bool) {
	switch n := v.(type) {
	case int:
		return float64(n), true
	case int64:
		return float64(n), true
	case float64:
		return n, true
	}
	return 0, false
}

// enums de objeto.schema.yaml (espejo — el subconjunto que rompe silencioso).
// Paridad schema↔Go vigilada por TestParidadSchema (D-A7).
var (
	objConfOK        = map[string]bool{"alta": true, "media": true, "baja": true}
	objPrioOK        = objConfOK // misma terna (M28)
	objFuenteOK      = map[string]bool{"repo": true, "Sistema leído": true, "Entrevista": true, "Declarado": true, "Inferido": true, "Observado": true}
	objDigitalOK     = map[string]bool{"manual": true, "externo": true, "integrado": true}
	objProcedenciaOK = map[string]bool{"propio": true, "compartido": true, "externo": true, "terciarizado": true}
	objSirveAOK      = map[string]bool{"interno": true, "cliente-final": true}
	objTipoActOK     = map[string]bool{"humana": true, "sistema": true, "reunion": true, "decision": true, "espera": true}
	objGapTipoOK     = map[string]bool{"nonconformity": true, "target_variance": true, "assessment_finding": true}
	// --- v2 ---
	objEstadoBrechaOK    = map[string]bool{"accionable": true, "a-corroborar": true, "off-thread": true, "sin-ancla-de-valor": true}
	objModoEstrategiaOK  = map[string]bool{"okr-trimestral": true, "gpd-anual": true, "mixto": true}
	objHorizonteOK       = map[string]bool{"proposito": true, "3a": true, "anual": true, "trimestre": true}
	objEstadoObjetivoOK  = map[string]bool{"vigente": true, "deprecado": true}
	objPerspectivaOK     = map[string]bool{"financiera": true, "cliente": true, "procesos": true, "aprendizaje": true}
	objTipologiaKpiOK    = map[string]bool{"kpi": true, "dpi": true, "kri": true}
	objTipoKpiOK         = map[string]bool{"lead": true, "lag": true}
	objFrecuenciaOK      = map[string]bool{"diaria": true, "semanal": true, "mensual": true, "trimestral": true}
	objRollupOK          = map[string]bool{"peor-hijo": true, "promedio": true, "ponderado": true}
	objTipoBeneficioOK   = map[string]bool{"hard-saving": true, "soft-saving": true, "cost-avoidance": true, "aumento-ingresos": true}
	objMetodologiaMejOK  = map[string]bool{"pdca": true, "dmaic": true, "masp": true, "kaizen": true}
	objEstadoProyectoOK  = map[string]bool{"propuesto": true, "triaje": true, "en-evaluacion": true, "aprobado": true, "en-ejecucion": true, "en-verificacion": true, "estandarizado": true, "beneficios-en-auditoria": true, "cerrado": true, "rechazado": true, "suspendido": true, "cancelado": true}
	objEstadoIdeaOK      = map[string]bool{"enviada": true, "en-evaluacion": true, "aprobada": true, "rechazada": true, "promovida": true}
	objVeredictoResOK    = map[string]bool{"movio": true, "parcial": true, "no-movio": true}
	objVeredictoTriageOK = map[string]bool{"eliminable": true, "automatizable-rpa": true, "automatizable-agente": true, "aumentable": true, "humano-por-diseño": true}
	objMandatoOK         = map[string]bool{"regulatorio": true, "preventivo": true, "habilitante": true}
	objDatosAutoOK       = map[string]bool{"estructurados": true, "no-estructurados": true, "mixtos": true}
	objReglasAutoOK      = map[string]bool{"estables": true, "cambiantes": true}
	objTipoReporteOK     = map[string]bool{"jerarquico": true, "funcional": true}
	objVinculoOK         = map[string]bool{"empleado": true, "contratista": true, "tercero": true}
	objTipoUnidadOK      = map[string]bool{"proyecto": true, "obra": true, "sucursal": true, "franquicia": true, "planta": true}
	objTipoProveedorOK   = map[string]bool{"bpo": true, "outsourcing": true, "proveedor": true}
	objImpactoOK         = map[string]bool{"alto": true, "medio": true, "bajo": true}
)

// transicionesProyecto — la máquina de estados de proyecto_mejora (RN-12). Espejo de
// acciones.transiciones_proyecto del schema (paridad: TestParidadSchema). Loop-back MASP:
// en-verificacion → en-ejecucion (si la acción no bloqueó el problema, se retrocede).
var transicionesProyecto = map[string][]string{
	"propuesto":               {"triaje", "rechazado"},
	"triaje":                  {"en-evaluacion", "rechazado"},
	"en-evaluacion":           {"aprobado", "rechazado"},
	"aprobado":                {"en-ejecucion", "suspendido", "cancelado"},
	"en-ejecucion":            {"en-verificacion", "suspendido", "cancelado"},
	"en-verificacion":         {"estandarizado", "en-ejecucion", "cancelado"},
	"estandarizado":           {"beneficios-en-auditoria"},
	"beneficios-en-auditoria": {"cerrado"},
	"suspendido":              {"en-ejecucion", "cancelado"},
	"rechazado":               {},
	"cancelado":               {},
	"cerrado":                 {},
}

// transicionProyectoValida — la consulta que la Gestión de Cambios (BL-24) hará al
// ejecutar las acciones kinéticas del schema.
func transicionProyectoValida(de, hacia string) bool {
	for _, h := range transicionesProyecto[de] {
		if h == hacia {
			return true
		}
	}
	return false
}

// ---- vocabulario de verbos (sistema/schema/verbos.yaml — D-A4) ----

type vocabularioVerbos struct {
	canonicos  map[string]bool
	sinonimoDe map[string]string // sinónimo → canónico
}

var (
	verbosOnce sync.Once
	verbosVoc  vocabularioVerbos
)

// cargaVerbos lee el vocabulario UNA vez desde la raíz del repo cockpit (el binario corre
// desde go/ o desde la raíz). Ausente → vocabulario vacío = fail-open (sin warnings de verbo).
func cargaVerbos() vocabularioVerbos {
	verbosOnce.Do(func() {
		verbosVoc = vocabularioVerbos{canonicos: map[string]bool{}, sinonimoDe: map[string]string{}}
		for _, cand := range []string{
			filepath.Join("sistema", "schema", "verbos.yaml"),
			filepath.Join("..", "sistema", "schema", "verbos.yaml"),
			filepath.Join("..", "..", "sistema", "schema", "verbos.yaml"),
		} {
			raw, err := os.ReadFile(cand)
			if err != nil {
				continue
			}
			var doc struct {
				Verbos []struct {
					Verbo     string   `yaml:"verbo"`
					Sinonimos []string `yaml:"sinonimos"`
				} `yaml:"verbos"`
			}
			if yaml.Unmarshal(raw, &doc) != nil {
				continue
			}
			for _, v := range doc.Verbos {
				verbosVoc.canonicos[v.Verbo] = true
				for _, s := range v.Sinonimos {
					verbosVoc.sinonimoDe[s] = v.Verbo
				}
			}
			return
		}
	})
	return verbosVoc
}

// derivaDivergente anota divergente:true/false en cada medición que tenga AMBOS valores
// (declarado y observado) — derivado en el payload, el YAML de instancia queda intacto (RN-9).
func derivaDivergente(kpis []map[string]any) {
	for _, k := range kpis {
		for _, mv := range oList(k["mediciones"]) {
			m := oMap(mv)
			if m == nil {
				continue
			}
			dec, okD := oNum(m["valor_declarado"])
			obs, okO := oNum(oMap(m["valor_observado"])["valor"])
			if okD && okO {
				m["divergente"] = dec != obs
			}
		}
	}
}

// validateObjeto espeja los invariantes de sistema/schema/objeto.schema.yaml v2 sobre el
// objeto ENTERO. Devuelve (warnings, errors): los errors bloquean (formas v1 muertas,
// CK-24/RN-8, RN-14, RN-15, estados/transiciones inválidos, idea promovida sin destino);
// los warnings delatan sin bloquear (patrón validateNegocio).
func validateObjeto(slug string, empresaDoc map[string]any, t map[string][]map[string]any) ([]string, []string) {
	w := []string{}
	e := []string{}

	// -- pase 1: ids por tipo + básicos (id único, nombre/titulo, conf/fuente) --
	ids := map[string]map[string]bool{} // singular → set de ids
	for _, tipo := range tiposObjeto {
		set := map[string]bool{}
		campoNombre := "nombre"
		if tipo.singular == "idea" {
			campoNombre = "titulo"
		}
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
			if oStr(m[campoNombre]) == "" {
				w = append(w, fmt.Sprintf("%s: sin %s", loc, campoNombre))
			}
			if c := oStr(m["conf"]); c != "" && !objConfOK[c] {
				w = append(w, fmt.Sprintf("%s: conf %q inválida (esperado alta|media|baja)", loc, c))
			}
			if f := oStr(m["fuente"]); f != "" && !objFuenteOK[f] {
				w = append(w, fmt.Sprintf("%s: fuente %q inválida (esperado repo|Sistema leído|Entrevista|Declarado|Inferido|Observado)", loc, f))
			}
		}
		ids[tipo.singular] = set
	}

	// weak-entities direccionables: key_results (obj-x#krN) + unidades (empresa#uN) +
	// entidades legales (empresa#elN).
	krIDs := map[string]bool{}
	for _, o := range t["objetivos"] {
		for _, kr := range oList(o["key_results"]) {
			if id := oStr(oMap(kr)["id"]); id != "" {
				krIDs[id] = true
			}
		}
	}
	unidadIDs := map[string]bool{}
	legalIDs := map[string]bool{}
	if empresaDoc != nil {
		for _, uv := range oList(empresaDoc["entidades_legales"]) {
			if id := oStr(oMap(uv)["id"]); id != "" {
				legalIDs[id] = true
			}
		}
		for _, uv := range oList(empresaDoc["unidades"]) {
			if id := oStr(oMap(uv)["id"]); id != "" {
				unidadIDs[id] = true
			}
		}
	}

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
	refKR := func(loc, campo, refID string) {
		if refID != "" && !krIDs[refID] {
			w = append(w, fmt.Sprintf("%s: %s %q no existe en los key_results de objetivos/", loc, campo, refID))
		}
	}

	// -- empresa (la raíz del tenant): identidad + config_estrategia + unidades D-07 --
	modo := "okr-trimestral" // default del schema
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
		if cfg := oMap(empresaDoc["config_estrategia"]); cfg != nil {
			if m := oStr(cfg["modo"]); m != "" {
				if !objModoEstrategiaOK[m] {
					w = append(w, fmt.Sprintf("empresa.yaml: config_estrategia.modo %q inválido (esperado okr-trimestral|gpd-anual|mixto)", m))
				} else {
					modo = m
				}
			}
		}
		for i, uv := range oList(empresaDoc["unidades"]) {
			u := oMap(uv)
			uloc := fmt.Sprintf("empresa.yaml unidad #%d", i+1)
			if uid := oStr(u["id"]); uid != "" {
				uloc = fmt.Sprintf("empresa.yaml unidad %q", uid)
			} else {
				w = append(w, uloc+" sin id (local `empresa#uN` — D-07)")
			}
			if tu := oStr(u["tipo"]); tu != "" && !objTipoUnidadOK[tu] {
				w = append(w, fmt.Sprintf("%s: tipo %q inválido (esperado proyecto|obra|sucursal|franquicia|planta)", uloc, tu))
			}
			if el := oStr(u["entidad_legal_ref"]); el != "" && !legalIDs[el] {
				w = append(w, fmt.Sprintf("%s: entidad_legal_ref %q no existe en empresa.entidades_legales", uloc, el))
			}
		}
	}

	// -- persona: roles[].rol → rol · reporta_a v2 (lista matricial, + ciclo jerárquico) --
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
		switch ra := p["reporta_a"].(type) {
		case string:
			if ra != "" {
				e = append(e, loc+": reporta_a como ref simple eliminado en v2 — usar lista {ref, tipo: jerarquico|funcional} (organigrama matricial)")
			}
		case []any:
			jerarquicos := 0
			for _, iv := range ra {
				item := oMap(iv)
				r := oStr(item["ref"])
				ref(loc, "reporta_a", r, "persona")
				tr := oStr(item["tipo"])
				if tr != "" && !objTipoReporteOK[tr] {
					w = append(w, fmt.Sprintf("%s: reporta_a.tipo %q inválido (esperado jerarquico|funcional)", loc, tr))
				}
				if tr == "jerarquico" && ids["persona"][r] {
					jerarquicos++
					if jerarquicos == 1 {
						reportaA[id] = r
					}
				}
			}
			if jerarquicos > 1 {
				w = append(w, loc+": más de un reporta_a jerárquico (el organigrama ascendente admite 1; el resto = funcional)")
			}
		}
		if v := oStr(p["vinculo"]); v != "" && !objVinculoOK[v] {
			w = append(w, fmt.Sprintf("%s: vinculo %q inválido (esperado empleado|contratista|tercero)", loc, v))
		}
		ref(loc, "tercero_ref", oStr(p["tercero_ref"]), "sistema")
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

	// -- proceso: el hub del Hilo — refs + riesgos tipados + actividades v2 --
	voc := cargaVerbos()
	for _, p := range t["procesos"] {
		id := oStr(p["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("proceso %q", id)
		if _, tiene := p["kpis"]; tiene {
			e = append(e, loc+": kpis embebido eliminado en v2 — migrar a entidad kpi (kpis/kpi-*.yaml) con proceso_ref")
		}
		ref(loc, "dueño_ref", oStr(p["dueño_ref"]), "rol")
		refList(loc, "areas_ref", p["areas_ref"], "area")
		refList(loc, "sistemas_ref", p["sistemas_ref"], "sistema")
		refList(loc, "secuencia_ref", p["secuencia_ref"], "proceso")
		refList(loc, "realiza_capabilities", p["realiza_capabilities"], "capability")
		if d := oStr(p["digital"]); d != "" && !objDigitalOK[d] {
			w = append(w, fmt.Sprintf("%s: digital %q inválido (esperado manual|externo|integrado)", loc, d))
		}
		for i, rv := range oList(p["riesgos"]) {
			r := oMap(rv)
			if r == nil {
				w = append(w, fmt.Sprintf("%s riesgo #%d: forma libre — v2 lo tipó {desc, prob, impacto, mitigacion} (cl.6.1)", loc, i+1))
				continue
			}
			if pr := oStr(r["prob"]); pr != "" && !objConfOK[pr] {
				w = append(w, fmt.Sprintf("%s riesgo #%d: prob %q inválida (esperado alta|media|baja)", loc, i+1, pr))
			}
			if im := oStr(r["impacto"]); im != "" && !objImpactoOK[im] {
				w = append(w, fmt.Sprintf("%s riesgo #%d: impacto %q inválido (esperado alto|medio|bajo)", loc, i+1, im))
			}
		}
		if pp := oMap(p["provisto_por"]); pp != nil {
			if tp := oStr(pp["tipo"]); tp != "" && !objTipoProveedorOK[tp] {
				w = append(w, fmt.Sprintf("%s: provisto_por.tipo %q inválido (esperado bpo|outsourcing|proveedor)", loc, tp))
			}
		}
		// pre-pase: ids locales (para flujos_alternos.secuencia)
		actIDs := map[string]bool{}
		for _, av := range oList(p["actividades"]) {
			if aid := oStr(oMap(av)["id"]); aid != "" {
				actIDs[aid] = true
			}
		}
		vistos := map[string]bool{}
		for i, av := range oList(p["actividades"]) {
			a := oMap(av)
			aid := oStr(a["id"])
			aloc := fmt.Sprintf("%s actividad #%d", loc, i+1)
			if aid == "" {
				w = append(w, aloc+" sin id (local `"+id+"#aN`, direccionable por el grafo)")
			} else {
				aloc = fmt.Sprintf("%s actividad %q", loc, aid)
				if vistos[aid] {
					w = append(w, aloc+": id local duplicado dentro del padre")
				}
				vistos[aid] = true
			}
			if tiempoViejo := oStr(a["tiempo"]); tiempoViejo != "" {
				e = append(e, aloc+": tiempo (string) eliminado en v2 — usar tiempos{toque, espera} (VSM)")
			}
			ref(aloc, "carril_ref", oStr(a["carril_ref"]), "rol")
			refList(aloc, "sistemas_ref", a["sistemas_ref"], "sistema")
			if tp := oStr(a["tipo"]); tp != "" && !objTipoActOK[tp] {
				w = append(w, fmt.Sprintf("%s: tipo %q inválido (esperado humana|sistema|reunion|decision|espera)", aloc, tp))
			}
			if raci := oMap(a["raci"]); raci != nil {
				if aRef := oStr(raci["A"]); aRef == "" {
					w = append(w, aloc+": raci.A debe ser exactamente 1 rol (string, no lista/ausente)")
				} else {
					ref(aloc, "raci.A", aRef, "rol")
				}
				for _, letra := range []string{"R", "C", "I"} {
					refList(aloc, "raci."+letra, raci[letra], "rol")
				}
			}
			// verbo contra el vocabulario (RN-11, case-insensitive: los humanos capitalizan)
			// + anti-gaming (RN-13)
			if verbo := oStr(a["verbo"]); verbo != "" {
				vlow := strings.ToLower(verbo)
				if len(voc.canonicos) > 0 && !voc.canonicos[vlow] {
					if canon, esSin := voc.sinonimoDe[vlow]; esSin {
						w = append(w, fmt.Sprintf("%s: verbo %q es sinónimo — normalizar a %q (vocabulario verbos.yaml)", aloc, verbo, canon))
					} else {
						w = append(w, fmt.Sprintf("%s: verbo %q fuera del vocabulario (sistema/schema/verbos.yaml — verbo nuevo entra por PR con clase ALM×MGI, RN-11)", aloc, verbo))
					}
				}
				if oStr(a["fuente"]) == "" && oStr(a["conf"]) == "" && oStr(a["evidencia_ref"]) == "" {
					w = append(w, aloc+": verbo sin provenance (fuente/conf/evidencia_ref) — el score aguas abajo hereda conf baja (RN-13)")
				}
			}
			if m := oStr(a["mandato"]); m != "" && !objMandatoOK[m] {
				w = append(w, fmt.Sprintf("%s: mandato %q inválido (esperado regulatorio|preventivo|habilitante)", aloc, m))
			}
			if auto := oMap(a["automatizacion"]); auto != nil {
				if d := oStr(auto["datos"]); d != "" && !objDatosAutoOK[d] {
					w = append(w, fmt.Sprintf("%s: automatizacion.datos %q inválido", aloc, d))
				}
				if r := oStr(auto["reglas"]); r != "" && !objReglasAutoOK[r] {
					w = append(w, fmt.Sprintf("%s: automatizacion.reglas %q inválido", aloc, r))
				}
				if tr := oStr(auto["tolerancia_revision"]); tr != "" && !objConfOK[tr] {
					w = append(w, fmt.Sprintf("%s: automatizacion.tolerancia_revision %q inválida", aloc, tr))
				}
				if re := oStr(auto["riesgo_error"]); re != "" && !objImpactoOK[re] {
					w = append(w, fmt.Sprintf("%s: automatizacion.riesgo_error %q inválido", aloc, re))
				}
			}
			if tri := oMap(a["triage"]); tri != nil {
				if v := oStr(tri["veredicto"]); v != "" && !objVeredictoTriageOK[v] {
					w = append(w, fmt.Sprintf("%s: triage.veredicto %q inválido", aloc, v))
				}
				if oStr(tri["fuente"]) == "" || oStr(tri["conf"]) == "" {
					w = append(w, aloc+": triage sin provenance (el veredicto ratificado lleva fuente+conf — duda 3)")
				}
			}
			if tlx := oMap(a["tlx"]); tlx != nil {
				if f := oStr(tlx["fuente"]); f != "" && !objFuenteOK[f] {
					w = append(w, fmt.Sprintf("%s: tlx.fuente %q inválida", aloc, f))
				}
			}
			for _, akv := range oList(a["alimenta_kpi_refs"]) {
				ref(aloc, "alimenta_kpi_refs", oStr(oMap(akv)["kpi_ref"]), "kpi")
			}
			for j, fav := range oList(a["flujos_alternos"]) {
				fa := oMap(fav)
				if oStr(fa["cuando"]) == "" {
					w = append(w, fmt.Sprintf("%s flujo alterno #%d: sin `cuando` (la condición del branch)", aloc, j+1))
				}
				for _, sv := range oList(fa["secuencia"]) {
					if s := oStr(sv); s != "" && !actIDs[s] {
						w = append(w, fmt.Sprintf("%s flujo alterno #%d: secuencia %q no existe en las actividades del proceso", aloc, j+1, s))
					}
				}
			}
		}
	}

	// -- sistema: enums + refs (sin cambios v2) --
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

	// -- objetivo v2: entidad OKR plena (horizonte/estado/perspectiva · KRs opcionales RN-4′ ·
	//    kpi_ref/accountable/acople RN-14) --
	for _, o := range t["objetivos"] {
		id := oStr(o["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("objetivo %q", id)
		ref(loc, "dueño_ref", oStr(o["dueño_ref"]), "rol")
		ref(loc, "parent_ref", oStr(o["parent_ref"]), "objetivo")
		if h := oStr(o["horizonte"]); h != "" && !objHorizonteOK[h] {
			w = append(w, fmt.Sprintf("%s: horizonte %q inválido (esperado proposito|3a|anual|trimestre)", loc, h))
		}
		if est := oMap(o["estado"]); est != nil {
			if s := oStr(est["estado"]); s != "" && !objEstadoObjetivoOK[s] {
				w = append(w, fmt.Sprintf("%s: estado %q inválido (esperado vigente|deprecado)", loc, s))
			}
			ref(loc, "estado.superseded_by", oStr(est["superseded_by"]), "objetivo")
		}
		if p := oStr(o["perspectiva"]); p != "" && !objPerspectivaOK[p] {
			w = append(w, fmt.Sprintf("%s: perspectiva %q inválida (BSC: financiera|cliente|procesos|aprendizaje)", loc, p))
		}
		krs := oList(o["key_results"])
		if len(krs) == 0 {
			w = append(w, loc+": sin-ancla-de-valor (sin key_results — RN-4′: el diagnóstico no se vacía, pero este objetivo no ancla el hilo)")
		}
		for i, krv := range krs {
			kr := oMap(krv)
			kloc := fmt.Sprintf("%s kr #%d", loc, i+1)
			if kid := oStr(kr["id"]); kid != "" {
				kloc = fmt.Sprintf("%s kr %q", loc, kid)
			}
			for _, campo := range []string{"descripcion", "metrica"} {
				if oStr(kr[campo]) == "" {
					w = append(w, fmt.Sprintf("%s: sin %s (OKR: el KR se mide o no es KR)", kloc, campo))
				}
			}
			for _, campo := range []string{"from", "to"} {
				if _, esNum := oNum(kr[campo]); !esNum {
					if oStr(kr[campo]) != "" {
						w = append(w, fmt.Sprintf("%s: %s no numérico (v2 — el baseline/target se mide en números; unit va aparte)", kloc, campo))
					} else {
						w = append(w, fmt.Sprintf("%s: sin %s (OKR: el KR se mide o no es KR)", kloc, campo))
					}
				}
			}
			if _, esNum := oNum(kr["current"]); kr["current"] != nil && !esNum {
				w = append(w, kloc+": current no numérico (v2)")
			}
			ref(kloc, "kpi_ref", oStr(kr["kpi_ref"]), "kpi")
			ref(kloc, "accountable_ref", oStr(kr["accountable_ref"]), "rol")
			if oBool(kr["acople_compensacion"]) && modo != "gpd-anual" && modo != "mixto" {
				e = append(e, fmt.Sprintf("%s: acople_compensacion=true con modo %s — divorcio KR↔compensación (RN-14: sandbagging; válido solo en gpd-anual|mixto)", kloc, modo))
			}
			refList(kloc, "driver_refs", kr["driver_refs"], "proceso", "capability")
		}
	}

	// -- kpi v2: dueño rol|área (CK-24) · ancla proceso · KR N:M · mediciones con provenance --
	for _, k := range t["kpis"] {
		id := oStr(k["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("kpi %q", id)
		duenio := oStr(k["dueño_ref"])
		switch {
		case duenio == "":
			w = append(w, loc+": sin dueño_ref (requerido — rol o área, CK-24)")
		case ids["persona"][duenio]:
			e = append(e, fmt.Sprintf("%s: dueño_ref %q es una persona — el KPI ancla a rol|área, la persona es ocupante (CK-24 · RN-8)", loc, duenio))
		case !ids["rol"][duenio] && !ids["area"][duenio]:
			w = append(w, fmt.Sprintf("%s: dueño_ref %q no existe en rol|area", loc, duenio))
		}
		if pr := oStr(k["proceso_ref"]); pr == "" {
			w = append(w, loc+": sin proceso_ref (hilo incompleto — ¿de qué proceso es salud este KPI?)")
		} else {
			ref(loc, "proceso_ref", pr, "proceso")
		}
		if tp := oStr(k["tipologia"]); tp != "" && !objTipologiaKpiOK[tp] {
			w = append(w, fmt.Sprintf("%s: tipologia %q inválida (esperado kpi|dpi|kri)", loc, tp))
		}
		if tp := oStr(k["tipo"]); tp != "" && !objTipoKpiOK[tp] {
			w = append(w, fmt.Sprintf("%s: tipo %q inválido (esperado lead|lag)", loc, tp))
		}
		if fr := oStr(k["frecuencia"]); fr != "" && !objFrecuenciaOK[fr] {
			w = append(w, fmt.Sprintf("%s: frecuencia %q inválida (esperado diaria|semanal|mensual|trimestral)", loc, fr))
		}
		if ro := oStr(k["rollup"]); ro != "" && !objRollupOK[ro] {
			w = append(w, fmt.Sprintf("%s: rollup %q inválido (esperado peor-hijo|promedio|ponderado)", loc, ro))
		}
		for _, cv := range oList(k["contribuye_a"]) {
			refKR(loc, "kr_ref", oStr(oMap(cv)["kr_ref"]))
		}
		refList(loc, "en_tension_con", k["en_tension_con"], "kpi")
		medIDs := map[string]bool{}
		for i, mv := range oList(k["mediciones"]) {
			m := oMap(mv)
			mloc := fmt.Sprintf("%s medición #%d", loc, i+1)
			if mid := oStr(m["id"]); mid != "" {
				mloc = fmt.Sprintf("%s medición %q", loc, mid)
				if medIDs[mid] {
					w = append(w, mloc+": id local duplicado")
				}
				medIDs[mid] = true
			}
			if oStr(m["fecha"]) == "" {
				w = append(w, mloc+": sin fecha")
			}
			if oStr(m["fuente"]) == "" || oStr(m["conf"]) == "" {
				w = append(w, mloc+": sin fuente/conf (RN-9 — toda medición lleva provenance)")
			}
			if u := oStr(m["unidad_ref"]); u != "" && !unidadIDs[u] {
				w = append(w, fmt.Sprintf("%s: unidad_ref %q no existe en empresa.unidades (D-07)", mloc, u))
			}
		}
	}

	// -- proyecto_mejora v2: máquina de estados (RN-12) · doble firma (RN-15) · orígenes --
	for _, pm := range t["proyectos-mejora"] {
		id := oStr(pm["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("proyecto_mejora %q", id)
		estado := oStr(pm["estado"])
		switch {
		case estado == "":
			e = append(e, loc+": sin estado (requerido — enum estado_proyecto)")
		case !objEstadoProyectoOK[estado]:
			e = append(e, fmt.Sprintf("%s: estado %q inválido (enum estado_proyecto — las transiciones las gobiernan las acciones kinéticas, RN-12)", loc, estado))
		}
		ref(loc, "dueño_ref", oStr(pm["dueño_ref"]), "rol")
		ref(loc, "sponsor_ref", oStr(pm["sponsor_ref"]), "rol")
		brechas := oList(pm["origen_brecha_refs"])
		ideas := oList(pm["origen_idea_refs"])
		if len(brechas) == 0 && len(ideas) == 0 {
			w = append(w, loc+": proyecto-sin-diagnóstico (sin origen_brecha_refs NI origen_idea_refs — ¿de dónde salió?)")
		}
		refList(loc, "origen_brecha_refs", pm["origen_brecha_refs"], "brecha")
		refList(loc, "origen_idea_refs", pm["origen_idea_refs"], "idea")
		if m := oStr(pm["metodologia"]); m != "" && !objMetodologiaMejOK[m] {
			w = append(w, fmt.Sprintf("%s: metodologia %q inválida (esperado pdca|dmaic|masp|kaizen)", loc, m))
		}
		if pr := oStr(pm["prio"]); pr != "" && !objPrioOK[pr] {
			w = append(w, fmt.Sprintf("%s: prio %q inválida", loc, pr))
		}
		cn := oMap(pm["caso_negocio"])
		tipoBeneficio := ""
		if cn != nil {
			tipoBeneficio = oStr(cn["tipo_beneficio"])
			if tipoBeneficio != "" && !objTipoBeneficioOK[tipoBeneficio] {
				w = append(w, fmt.Sprintf("%s: caso_negocio.tipo_beneficio %q inválido (esperado hard-saving|soft-saving|cost-avoidance|aumento-ingresos)", loc, tipoBeneficio))
			}
		}
		for _, mvv := range oList(pm["mueve_refs"]) {
			mr := oStr(oMap(mvv)["ref"])
			if mr != "" && !ids["kpi"][mr] && !krIDs[mr] {
				w = append(w, fmt.Sprintf("%s: mueve_refs %q no existe en kpi|key_result", loc, mr))
			}
		}
		firmas := oMap(pm["firmas"])
		if sp := oMap(firmas["sponsor"]); sp != nil {
			ref(loc, "firmas.sponsor.por_ref", oStr(sp["por_ref"]), "rol")
		}
		fin := oMap(firmas["finanzas"])
		if fin != nil {
			ref(loc, "firmas.finanzas.por_ref", oStr(fin["por_ref"]), "rol")
		}
		if estado == "cerrado" {
			if tipoBeneficio == "hard-saving" && (fin == nil || oStr(fin["fecha_post"]) == "") {
				e = append(e, loc+": cerrado con hard-saving sin firmas.finanzas.fecha_post — la auditoría de beneficios por finanzas es previa al cierre (RN-15)")
			}
			if oMap(pm["resultado"]) == nil {
				w = append(w, loc+": cerrado sin resultado{} (¿el KPI se movió o no? — el loop cierra con dato real)")
			}
		}
		if res := oMap(pm["resultado"]); res != nil {
			if v := oStr(res["veredicto"]); v != "" && !objVeredictoResOK[v] {
				w = append(w, fmt.Sprintf("%s: resultado.veredicto %q inválido (esperado movio|parcial|no-movio)", loc, v))
			}
		}
		hitoIDs := map[string]bool{}
		for _, hv := range oList(pm["hitos"]) {
			if hid := oStr(oMap(hv)["id"]); hid != "" {
				if hitoIDs[hid] {
					w = append(w, fmt.Sprintf("%s hito %q: id local duplicado", loc, hid))
				}
				hitoIDs[hid] = true
			}
		}
	}

	// -- idea v2: funil (autoría ≥1 · estado · promoción con destino) --
	for _, i := range t["ideas"] {
		id := oStr(i["id"])
		if id == "" {
			continue
		}
		loc := fmt.Sprintf("idea %q", id)
		if len(oList(i["proponente_refs"])) == 0 {
			w = append(w, loc+": sin proponente_refs (la autoría se reconoce — kaizen teian; ≥1 persona)")
		}
		refList(loc, "proponente_refs", i["proponente_refs"], "persona")
		refList(loc, "sobre_refs", i["sobre_refs"], "proceso", "sistema", "area")
		estado := oStr(i["estado"])
		switch {
		case estado == "":
			e = append(e, loc+": sin estado (requerido — enum estado_idea)")
		case !objEstadoIdeaOK[estado]:
			e = append(e, fmt.Sprintf("%s: estado %q inválido (enum estado_idea)", loc, estado))
		}
		prom := oStr(i["promovida_a_ref"])
		if estado == "promovida" && prom == "" {
			e = append(e, loc+": estado=promovida sin promovida_a_ref (una idea promovida apunta a su proyecto)")
		}
		if prom != "" && !ids["proyecto_mejora"][prom] {
			e = append(e, fmt.Sprintf("%s: promovida_a_ref %q no existe en proyecto_mejora", loc, prom))
		}
		if ev := oMap(i["evaluacion"]); ev != nil {
			ref(loc, "evaluacion.comite_ref", oStr(ev["comite_ref"]), "rol", "area")
		}
	}

	// -- capability: parent_ref → capability --
	for _, c := range t["capabilities"] {
		if id := oStr(c["id"]); id != "" {
			ref(fmt.Sprintf("capability %q", id), "parent_ref", oStr(c["parent_ref"]), "capability")
		}
	}

	// -- brecha: against_ref REQUERIDO · enums (estado v2 tipado) · kr_ref --
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
		if es := oStr(b["estado"]); es != "" && !objEstadoBrechaOK[es] {
			w = append(w, fmt.Sprintf("%s: estado %q inválido (esperado accionable|a-corroborar|off-thread|sin-ancla-de-valor)", loc, es))
		}
		for _, krv := range oList(b["kr_ref"]) {
			refKR(loc, "kr_ref", oStr(krv))
		}
	}

	return w, e
}

// ciclos detecta ciclos en una self-ref (reporta_a, parent_ref): se avisa una vez
// por miembro del ciclo. Keys ordenadas → warnings deterministas.
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
