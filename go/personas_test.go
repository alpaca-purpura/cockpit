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

// BL-01 · CK-12: /api/personas lee persona + rol un-archivo-por-entidad del shell
// (<repo>/empresa/personas/ + <repo>/empresa/roles/, layout plano D-15). Carpetas
// ausentes → listas vacías 200 (empty-state honesto); archivo malo → warning, no rompe.
func writePersonas(t *testing.T, root string) {
	t.Helper()
	for rel, body := range map[string]string{
		"empresa/personas/per-ana.yaml": "id: per-ana\nnombre: Ana\nroles:\n- { rol: rol-gerente }\nfuente: Entrevista\nconf: alta\n",
		"empresa/roles/rol-gerente.yaml": "id: rol-gerente\nnombre: Gerente General\nautoridad: aprueba todo\nfuente: Declarado\nconf: alta\n",
	} {
		p := filepath.Join(root, rel)
		if err := os.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
	}
}

func TestHandlePersonas(t *testing.T) {
	// (1) empresa con shell poblado (Repo con empresa/personas/ + empresa/roles/).
	shell := t.TempDir()
	writePersonas(t, shell)
	pPrenter := Project{Name: "prenter", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "factory"}}

	// (2) empresa con Repo pero SIN carpetas de entidades.
	pBare := Project{Name: "vitalia", Path: t.TempDir(), Active: true, Directorio: DirectorioMeta{Repo: t.TempDir(), Kind: "own"}}

	// (3) empresa sin Repo → fallback a Path (que sí tiene entidades).
	pathOnly := t.TempDir()
	writePersonas(t, pathOnly)
	pFallback := Project{Name: "perusaas", Path: pathOnly, Active: true, Directorio: DirectorioMeta{Kind: "own"}}

	d := newNegocioAPI([]Project{pPrenter, pBare, pFallback})

	// con entidades en el shell → personas y roles poblados, cero warnings
	rec := httptest.NewRecorder()
	d.HandlePersonas(rec, httptest.NewRequest(http.MethodGet, "/api/personas?empresa=prenter", nil))
	if rec.Code != 200 {
		t.Fatalf("status = %d, want 200 (body=%s)", rec.Code, rec.Body.String())
	}
	var resp struct {
		Personas []map[string]any `json:"personas"`
		Roles    []map[string]any `json:"roles"`
		Warnings []string         `json:"warnings"`
	}
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatal(err)
	}
	if len(resp.Personas) != 1 || len(resp.Roles) != 1 {
		t.Fatalf("personas/roles mal leídos: %s", rec.Body.String())
	}
	if len(resp.Warnings) != 0 {
		t.Fatalf("shell válido no debe tener warnings: %v", resp.Warnings)
	}

	// sin carpetas → listas vacías 200 (empty-state honesto, no error)
	rec2 := httptest.NewRecorder()
	d.HandlePersonas(rec2, httptest.NewRequest(http.MethodGet, "/api/personas?empresa=vitalia", nil))
	if rec2.Code != 200 {
		t.Fatalf("status = %d, want 200 (body=%s)", rec2.Code, rec2.Body.String())
	}
	var resp2 struct {
		Personas []map[string]any `json:"personas"`
		Roles    []map[string]any `json:"roles"`
	}
	if err := json.Unmarshal(rec2.Body.Bytes(), &resp2); err != nil {
		t.Fatal(err)
	}
	if len(resp2.Personas) != 0 || len(resp2.Roles) != 0 {
		t.Errorf("sin carpetas deben ser listas vacías: %s", rec2.Body.String())
	}

	// sin Repo → fallback a Path
	rec3 := httptest.NewRecorder()
	d.HandlePersonas(rec3, httptest.NewRequest(http.MethodGet, "/api/personas?empresa=perusaas", nil))
	if rec3.Code != 200 {
		t.Fatalf("fallback Path: status = %d, want 200 (body=%s)", rec3.Code, rec3.Body.String())
	}
	if !strings.Contains(rec3.Body.String(), "per-ana") {
		t.Errorf("fallback a Path debe leer personas/: %s", rec3.Body.String())
	}

	// empresa desconocida → 400 · sin empresa param → 400
	rec4 := httptest.NewRecorder()
	d.HandlePersonas(rec4, httptest.NewRequest(http.MethodGet, "/api/personas?empresa=ghost", nil))
	if rec4.Code != 400 {
		t.Errorf("empresa desconocida: status = %d, want 400", rec4.Code)
	}
	rec5 := httptest.NewRecorder()
	d.HandlePersonas(rec5, httptest.NewRequest(http.MethodGet, "/api/personas", nil))
	if rec5.Code != 400 {
		t.Errorf("sin empresa: status = %d, want 400", rec5.Code)
	}

	// archivo yaml roto → warning con el nombre del archivo, la respuesta no rompe
	broken := filepath.Join(shell, "empresa", "roles", "rol-roto.yaml")
	if err := os.WriteFile(broken, []byte(":\t esto no es yaml: [\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	rec6 := httptest.NewRecorder()
	d.HandlePersonas(rec6, httptest.NewRequest(http.MethodGet, "/api/personas?empresa=prenter", nil))
	if rec6.Code != 200 {
		t.Fatalf("archivo roto no debe romper la respuesta: status = %d", rec6.Code)
	}
	if !strings.Contains(rec6.Body.String(), "rol-roto.yaml") {
		t.Errorf("falta warning del archivo roto: %s", rec6.Body.String())
	}
}

// validatePersonas espeja los invariantes de objeto.schema.yaml (persona/rol): ids
// únicos, refs que resuelven (persona.roles[].rol, reporta_a), sin ciclos de
// reporta_a, enums conf/fuente válidos. Warnings no-fatales, como validateNegocio.
func TestValidatePersonas(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}

	// (1) entidades bien formadas → cero warnings.
	good := validatePersonas(
		[]map[string]any{parse("id: per-a\nnombre: Ana\nroles:\n- { rol: rol-g }\nreporta_a: per-b\nconf: alta\n"), parse("id: per-b\nnombre: Beto\nfuente: Declarado\n")},
		[]map[string]any{parse("id: rol-g\nnombre: Gerente\n")},
	)
	if len(good) != 0 {
		t.Fatalf("entidades válidas no deben tener warnings: %v", good)
	}

	// (2) mal formadas: id duplicado, sin nombre, conf/fuente inválidas, rol
	// inexistente, reporta_a inexistente, ciclo de reporta_a.
	ws := validatePersonas(
		[]map[string]any{
			parse("id: per-a\nnombre: Ana\nroles:\n- { rol: rol-fantasma }\nreporta_a: per-b\nconf: altta\n"),
			parse("id: per-b\nnombre: Beto\nreporta_a: per-a\nfuente: Chisme\n"),
			parse("id: per-c\nnombre: Cata\nreporta_a: per-ghost\n"),
		},
		[]map[string]any{
			parse("id: rol-g\nnombre: Gerente\n"),
			parse("id: rol-g\nnombre: Gerente Bis\n"),
			parse("id: rol-anon\n"),
		},
	)
	joined := strings.Join(ws, "\n")
	for _, want := range []string{
		"rol \"rol-g\": id duplicado",
		"rol \"rol-anon\": sin nombre",
		"conf \"altta\" inválida",
		"fuente \"Chisme\" inválida",
		"rol \"rol-fantasma\" no existe en roles/",
		"reporta_a \"per-ghost\" no existe en personas/",
		"persona \"per-a\": reporta_a forma un ciclo",
		"persona \"per-b\": reporta_a forma un ciclo",
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta warning %q en:\n%s", want, joined)
		}
	}
}
