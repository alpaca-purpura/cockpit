package cockpit

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// BL-02 · CK-13: /api/objeto lee las 9 entidades de objeto.schema.yaml
// un-archivo-por-entidad del shell (<repo>/empresa/<tipo>/, layout plano D-15;
// empresa.yaml = raíz del tenant) y las valida JUNTAS (las refs del Hilo cruzan
// entidades). Carpetas ausentes → listas vacías 200; archivo malo → warning.

// writeObjeto puebla un shell con un objeto mínimo VÁLIDO que teje el Hilo entero:
// objetivo→KR→(driver) proceso→rol/persona→sistema→capability→brecha.
func writeObjeto(t *testing.T, root string) {
	t.Helper()
	files := map[string]string{
		"empresa/empresa.yaml":                   "id: vertice\nrazon_social: \"Inmobiliaria Vértice S.A.C.\"\nfuente: Declarado\nconf: alta\n",
		"empresa/personas/per-mateo.yaml":        "id: per-mateo\nnombre: Mateo\nroles:\n- { rol: rol-gerente }\nfuente: Entrevista\nconf: alta\n",
		"empresa/roles/rol-gerente.yaml":         "id: rol-gerente\nnombre: Gerente General\n",
		"empresa/roles/rol-analista.yaml":        "id: rol-analista\nnombre: Analista de Cobranza\n",
		"empresa/areas/area-finanzas.yaml":       "id: area-finanzas\nnombre: Finanzas\nlider_ref: rol-gerente\n",
		"empresa/sistemas/sis-odoo.yaml":         "id: sis-odoo\nnombre: Odoo\nprocedencia: propio\nsirve_a: interno\ncapabilities_ref: [cap-cobranza]\n",
		"empresa/capabilities/cap-cobranza.yaml": "id: cap-cobranza\nnombre: Gestión de Cobranzas\n",
		"empresa/procesos/pr-cobranza.yaml": `id: pr-cobranza
nombre: Cobranza
dueño_ref: rol-gerente
areas_ref: [area-finanzas]
sistemas_ref: [sis-odoo]
realiza_capabilities: [cap-cobranza]
digital: manual
actividades:
- id: "pr-cobranza#a1"
  orden: 1
  titulo: Conciliar pagos
  carril_ref: rol-analista
  tipo: humana
  raci: { R: [rol-analista], A: rol-gerente, C: [], I: [] }
`,
		"empresa/objetivos/obj-caja.yaml": `id: obj-caja
nombre: Mejorar flujo de caja
dueño_ref: rol-gerente
key_results:
- id: "obj-caja#kr1"
  descripcion: Reducir días de cobro
  metrica: días de cobro
  from: 45
  to: 30
  driver_refs: [pr-cobranza, cap-cobranza]
`,
		"empresa/brechas/gap-cobranza.yaml": "id: gap-cobranza\nnombre: Cobranza manual\ntipo: target_variance\nagainst_ref: pr-cobranza\nkr_ref: [\"obj-caja#kr1\"]\nprio: alta\n",
	}
	for rel, body := range files {
		p := filepath.Join(root, rel)
		if err := os.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
	}
}

func TestHandleObjeto(t *testing.T) {
	shell := t.TempDir()
	writeObjeto(t, shell)
	pVertice := Project{Name: "vertice", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}
	pBare := Project{Name: "vitalia", Path: t.TempDir(), Active: true, Directorio: DirectorioMeta{Repo: t.TempDir(), Kind: "own"}}
	d := newNegocioAPI([]Project{pVertice, pBare})

	// objeto completo y válido → 9 rebanadas pobladas, CERO warnings (el Hilo teje)
	rec := httptest.NewRecorder()
	d.HandleObjeto(rec, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=vertice", nil))
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200 (body=%s)", rec.Code, rec.Body.String())
	}
	var resp struct {
		Empresa      map[string]any   `json:"empresa"`
		Personas     []map[string]any `json:"personas"`
		Roles        []map[string]any `json:"roles"`
		Areas        []map[string]any `json:"areas"`
		Procesos     []map[string]any `json:"procesos"`
		Sistemas     []map[string]any `json:"sistemas"`
		Objetivos    []map[string]any `json:"objetivos"`
		Capabilities []map[string]any `json:"capabilities"`
		Brechas      []map[string]any `json:"brechas"`
		Warnings     []string         `json:"warnings"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatal(err)
	}
	if resp.Empresa == nil {
		t.Fatalf("empresa.yaml debe proyectarse: %s", rec.Body.String())
	}
	for name, n := range map[string]int{
		"personas": len(resp.Personas), "roles": len(resp.Roles), "areas": len(resp.Areas),
		"procesos": len(resp.Procesos), "sistemas": len(resp.Sistemas), "objetivos": len(resp.Objetivos),
		"capabilities": len(resp.Capabilities), "brechas": len(resp.Brechas),
	} {
		if n == 0 {
			t.Errorf("rebanada %s vacía, debería estar poblada", name)
		}
	}
	if len(resp.Warnings) != 0 {
		t.Fatalf("objeto válido no debe tener warnings: %v", resp.Warnings)
	}

	// shell sin poblar → empresa:null + listas vacías 200 (empty-state honesto)
	rec2 := httptest.NewRecorder()
	d.HandleObjeto(rec2, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=vitalia", nil))
	if rec2.Code != 200 {
		t.Fatalf("status = %d, want 200", rec2.Code)
	}
	var resp2 struct {
		Empresa  any              `json:"empresa"`
		Personas []map[string]any `json:"personas"`
	}
	if err := json.Unmarshal(rec2.Body.Bytes(), &resp2); err != nil {
		t.Fatal(err)
	}
	if resp2.Empresa != nil || len(resp2.Personas) != 0 {
		t.Errorf("shell vacío debe dar empresa:null + listas vacías: %s", rec2.Body.String())
	}

	// empresa desconocida → 400 · sin empresa param → 400
	rec3 := httptest.NewRecorder()
	d.HandleObjeto(rec3, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=ghost", nil))
	if rec3.Code != 400 {
		t.Errorf("empresa desconocida: status = %d, want 400", rec3.Code)
	}
	rec4 := httptest.NewRecorder()
	d.HandleObjeto(rec4, httptest.NewRequest(http.MethodGet, "/api/objeto", nil))
	if rec4.Code != 400 {
		t.Errorf("sin empresa: status = %d, want 400", rec4.Code)
	}

	// archivo yaml roto → warning con nombre de archivo, la respuesta no rompe
	if err := os.WriteFile(filepath.Join(shell, "empresa", "sistemas", "sis-roto.yaml"), []byte(":\t no es yaml: [\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	rec5 := httptest.NewRecorder()
	d.HandleObjeto(rec5, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=vertice", nil))
	if rec5.Code != 200 || !strings.Contains(rec5.Body.String(), "sis-roto.yaml") {
		t.Errorf("archivo roto: status=%d, falta warning: %s", rec5.Code, rec5.Body.String())
	}

	// empresa.yaml con id ≠ slug → warning (el id ES el ?empresa= del cockpit)
	if err := os.WriteFile(filepath.Join(shell, "empresa", "empresa.yaml"), []byte("id: otra\nrazon_social: X\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	rec6 := httptest.NewRecorder()
	d.HandleObjeto(rec6, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=vertice", nil))
	if !strings.Contains(rec6.Body.String(), "≠ slug") {
		t.Errorf("falta warning de id ≠ slug: %s", rec6.Body.String())
	}
}

// validateObjeto espeja los invariantes de objeto.schema.yaml sobre el objeto entero:
// refs cruzadas del Hilo, enums, RACI A==1, key_results ≥ 1, ciclos.
func TestValidateObjeto(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	tt := map[string][]map[string]any{
		"personas": {
			parse("id: per-a\nnombre: Ana\nroles:\n- { rol: rol-fantasma }\nreporta_a:\n- { ref: per-b, tipo: jerarquico }\nconf: altta\n"),
			parse("id: per-b\nnombre: Beto\nreporta_a:\n- { ref: per-a, tipo: jerarquico }\nfuente: Chisme\n"),
		},
		"roles": {
			parse("id: rol-g\nnombre: Gerente\n"),
			parse("id: rol-g\nnombre: Gerente Bis\n"), // id duplicado
			parse("id: rol-anon\n"),                   // sin nombre
		},
		"areas": {
			parse("id: area-x\nnombre: X\nlider_ref: rol-ghost\nparent_ref: area-y\n"),
			parse("id: area-y\nnombre: Y\nparent_ref: area-x\n"), // ciclo x↔y
		},
		"procesos": {
			parse(`id: pr-1
nombre: Uno
dueño_ref: rol-ghost
areas_ref: [area-ghost]
sistemas_ref: [sis-ghost]
secuencia_ref: [pr-ghost]
realiza_capabilities: [cap-ghost]
digital: manaul
actividades:
- id: "pr-1#a1"
  orden: 1
  titulo: T
  carril_ref: rol-ghost
  tipo: telepatia
  raci: { R: [rol-ghost], A: [rol-g], C: [], I: [] }
- id: "pr-1#a1"
  orden: 2
  titulo: Dup
`),
		},
		"sistemas": {
			parse("id: sis-1\nnombre: S\nprocedencia: prestado\nsirve_a: marte\ncapabilities_ref: [cap-ghost]\nintegra_con_ref: [sis-ghost]\n"),
		},
		"objetivos": {
			parse("id: obj-1\nnombre: O\ndueño_ref: rol-ghost\nparent_ref: obj-ghost\nkey_results: []\n"),
			parse("id: obj-2\nnombre: O2\nkey_results:\n- id: \"obj-2#kr1\"\n  descripcion: D\n  metrica: \"\"\n  from: 1\n  to: 2\n  driver_refs: [pr-ghost]\n"),
		},
		"capabilities": {
			parse("id: cap-1\nnombre: C\nparent_ref: cap-ghost\n"),
		},
		"brechas": {
			parse("id: gap-1\nnombre: G\ntipo: drama\nprio: urgente\nkr_ref: [\"obj-x#kr9\"]\n"), // sin against_ref
			parse("id: gap-2\nnombre: G2\nagainst_ref: nada\n"),
		},
	}
	empresa := parse("id: otra\nrazon_social: \"\"\n")

	wv, ev := validateObjeto("vertice", empresa, tt)
	joined := strings.Join(append(append([]string{}, wv...), ev...), "\n")
	for _, want := range []string{
		// empresa
		`empresa.yaml: id "otra" ≠ slug`,
		"empresa.yaml: sin razon_social",
		// básicos
		`rol "rol-g": id duplicado`,
		`rol "rol-anon": sin nombre`,
		`conf "altta" inválida`,
		`fuente "Chisme" inválida`,
		// persona
		`rol "rol-fantasma" no existe en rol`,
		`persona "per-a": reporta_a forma un ciclo`,
		// area
		`area "area-x": lider_ref "rol-ghost" no existe`,
		`area "area-x": parent_ref forma un ciclo`,
		// proceso + actividades
		`proceso "pr-1": dueño_ref "rol-ghost" no existe`,
		`areas_ref "area-ghost" no existe`,
		`sistemas_ref "sis-ghost" no existe`,
		`secuencia_ref "pr-ghost" no existe`,
		`realiza_capabilities "cap-ghost" no existe`,
		`digital "manaul" inválido`,
		`carril_ref "rol-ghost" no existe`,
		`tipo "telepatia" inválido`,
		"raci.A debe ser exactamente 1",
		`actividad "pr-1#a1": id local duplicado`,
		// sistema
		`procedencia "prestado" inválida`,
		`sirve_a "marte" inválido`,
		`capabilities_ref "cap-ghost" no existe`,
		`integra_con_ref "sis-ghost" no existe`,
		// objetivo (v2: sin KRs = warning sin-ancla-de-valor, RN-4′)
		`objetivo "obj-1": sin-ancla-de-valor`,
		`parent_ref "obj-ghost" no existe`,
		"sin metrica",
		`driver_refs "pr-ghost" no existe en proceso|capability`,
		// capability
		`capability "cap-1": parent_ref "cap-ghost" no existe`,
		// brecha
		`brecha "gap-1": sin against_ref`,
		`tipo "drama" inválido`,
		`prio "urgente" inválida`,
		`kr_ref "obj-x#kr9" no existe`,
		`brecha "gap-2": against_ref "nada" no existe en capability|proceso|sistema|objetivo`,
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta warning %q en:\n%s", want, joined)
		}
	}

	// objeto totalmente válido → cero warnings (se valida con el fixture del handler
	// en TestHandleObjeto; acá el caso mínimo: vacío = válido).
	if ws, es := validateObjeto("x", nil, map[string][]map[string]any{}); len(ws) != 0 || len(es) != 0 {
		t.Errorf("objeto vacío no debe tener warnings/errors: %v %v", ws, es)
	}
}
