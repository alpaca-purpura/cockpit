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

// newNegocioAPI: Directorio con la única dep que negocio usa — ProjectByName
// sobre un slice fijo (espeja el snapshot de activos que inyecta el bridge).
func newNegocioAPI(projects []Project) *Directorio {
	return New(Deps{
		ProjectByName: func(name string) (Project, bool) {
			for _, p := range projects {
				if p.Name == name {
					return p, true
				}
			}
			return Project{}, false
		},
	})
}

// Fase 5 · Vista de Negocio (I-46): /api/negocio lee <repo>/empresa/negocio.yaml del
// SHELL de la empresa (Repo), no del board (Path). Con archivo → negocio poblado; sin
// archivo → negocio:null 200 (empty-state honesto). La altitud es la EMPRESA (?empresa=).
func writeNegocio(t *testing.T, root string) {
	t.Helper()
	dir := filepath.Join(root, "empresa")
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatal(err)
	}
	yaml := "empresa: prenter\ntitulo: Prenter\nobjetivos:\n- id: pipeline\n  nombre: Pipeline\n  kr: Deals\n  from: \"1\"\n  to: \"3\"\nareas:\n- id: ventas\n  nombre: Ventas\n  procesos:\n  - id: crm\n    nombre: CRM\n    sistema: registry.yaml\n    digital: manual\n    obj: [pipeline]\n"
	if err := os.WriteFile(filepath.Join(dir, "negocio.yaml"), []byte(yaml), 0o644); err != nil {
		t.Fatal(err)
	}
}

func TestHandleNegocio(t *testing.T) {
	// (1) empresa con shell (Repo) que tiene empresa/negocio.yaml.
	shell := t.TempDir()
	writeNegocio(t, shell)
	pPrenter := Project{Name: "prenter", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "factory"}}

	// (2) empresa con Repo pero SIN negocio.yaml.
	pBare := Project{Name: "vitalia", Path: t.TempDir(), Active: true, Directorio: DirectorioMeta{Repo: t.TempDir(), Kind: "own"}}

	// (3) empresa sin Repo → fallback a Path (que sí tiene negocio.yaml).
	pathOnly := t.TempDir()
	writeNegocio(t, pathOnly)
	pFallback := Project{Name: "perusaas", Path: pathOnly, Active: true, Directorio: DirectorioMeta{Kind: "own"}}

	d := newNegocioAPI([]Project{pPrenter, pBare, pFallback})

	// con negocio.yaml en el shell → negocio no-null, objetivos + areas proyectados
	rec := httptest.NewRecorder()
	d.HandleNegocio(rec, httptest.NewRequest(http.MethodGet, "/api/negocio?empresa=prenter", nil))
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200 (body=%s)", rec.Code, rec.Body.String())
	}
	var resp struct {
		Negocio map[string]any `json:"negocio"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatal(err)
	}
	if resp.Negocio == nil {
		t.Fatalf("negocio no debe ser null con negocio.yaml: %s", rec.Body.String())
	}
	if objs, ok := resp.Negocio["objetivos"].([]any); !ok || len(objs) != 1 {
		t.Fatalf("objetivos mal proyectados: %v", resp.Negocio["objetivos"])
	}
	if areas, ok := resp.Negocio["areas"].([]any); !ok || len(areas) != 1 {
		t.Fatalf("areas mal proyectadas: %v", resp.Negocio["areas"])
	}

	// sin negocio.yaml → negocio:null 200 (empty-state honesto)
	rec2 := httptest.NewRecorder()
	d.HandleNegocio(rec2, httptest.NewRequest(http.MethodGet, "/api/negocio?empresa=vitalia", nil))
	if rec2.Code != 200 {
		t.Fatalf("status = %d, want 200 (body=%s)", rec2.Code, rec2.Body.String())
	}
	var resp2 struct {
		Negocio any `json:"negocio"`
	}
	if err := json.Unmarshal(rec2.Body.Bytes(), &resp2); err != nil {
		t.Fatal(err)
	}
	if resp2.Negocio != nil {
		t.Errorf("sin negocio.yaml, negocio debe ser null: %s", rec2.Body.String())
	}

	// sin Repo → fallback a Path (que sí tiene negocio.yaml)
	rec3 := httptest.NewRecorder()
	d.HandleNegocio(rec3, httptest.NewRequest(http.MethodGet, "/api/negocio?empresa=perusaas", nil))
	if rec3.Code != 200 {
		t.Fatalf("fallback Path: status = %d, want 200 (body=%s)", rec3.Code, rec3.Body.String())
	}
	var resp3 struct {
		Negocio map[string]any `json:"negocio"`
	}
	if err := json.Unmarshal(rec3.Body.Bytes(), &resp3); err != nil {
		t.Fatal(err)
	}
	if resp3.Negocio == nil {
		t.Errorf("fallback a Path debe leer negocio.yaml: %s", rec3.Body.String())
	}

	// empresa desconocida → 400
	rec4 := httptest.NewRecorder()
	d.HandleNegocio(rec4, httptest.NewRequest(http.MethodGet, "/api/negocio?empresa=ghost", nil))
	if rec4.Code != 400 {
		t.Errorf("empresa desconocida: status = %d, want 400", rec4.Code)
	}

	// sin empresa param → 400
	rec5 := httptest.NewRecorder()
	d.HandleNegocio(rec5, httptest.NewRequest(http.MethodGet, "/api/negocio", nil))
	if rec5.Code != 400 {
		t.Errorf("sin empresa: status = %d, want 400", rec5.Code)
	}
}

// validateNegocio espeja negocio.schema.yaml: warnings no-fatales del subconjunto
// que rompe silencioso en la UI (enums digital/conf/prio + refs obj→objetivo inexistente).
func TestValidateNegocio(t *testing.T) {
	// (1) negocio bien formado → cero warnings.
	good, err := parseYAMLMap([]byte("empresa: prenter\ntitulo: P\nobjetivos:\n- id: pipeline\n  nombre: Pipeline\n  kr: Deals\n  from: \"1\"\n  to: \"3\"\nareas:\n- id: v\n  nombre: Ventas\n  procesos:\n  - id: crm\n    nombre: CRM\n    sistema: x\n    digital: integrado\n    conf: alta\n    obj: [pipeline]\nbrechas:\n- nombre: g1\n  tipo: Sistema\n  obj: pipeline\n  prio: alta\n"))
	if err != nil {
		t.Fatal(err)
	}
	if ws := validateNegocio(good); len(ws) != 0 {
		t.Fatalf("negocio válido no debe tener warnings: %v", ws)
	}

	// (2) negocio mal formado: enum digital inválido, conf inválida, prio inválida,
	// ref obj inexistente en proceso Y en brecha, + objetivo id duplicado.
	bad, err := parseYAMLMap([]byte("empresa: prenter\ntitulo: P\nobjetivos:\n- id: pipeline\n  nombre: P\n  kr: K\n  from: \"1\"\n  to: \"3\"\n- id: pipeline\n  nombre: Dup\n  kr: K\n  from: \"0\"\n  to: \"1\"\nareas:\n- id: v\n  nombre: Ventas\n  procesos:\n  - id: crm\n    nombre: CRM\n    sistema: x\n    digital: manaul\n    conf: altta\n    obj: [pipeline, fantasma]\nbrechas:\n- nombre: g1\n  tipo: Sistema\n  obj: noexiste\n  prio: urgente\n"))
	if err != nil {
		t.Fatal(err)
	}
	joined := strings.Join(validateNegocio(bad), "\n")
	for _, want := range []string{
		"id duplicado",                // objetivo pipeline duplicado
		"digital \"manaul\" inválido", // enum digital
		"conf \"altta\" inválida",     // enum conf
		"obj \"fantasma\" no existe",  // ref proceso
		"prio \"urgente\" inválida",   // enum prio brecha
		"obj \"noexiste\" no existe",  // ref brecha
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta warning %q en:\n%s", want, joined)
		}
	}
}
