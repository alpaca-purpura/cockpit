package cockpit

import "testing"

// Los tests son herméticos: las capacidades del workspace (devhub-owned) entran
// como fakes coherentes vía Deps — acá se testea la PROYECCIÓN (gap vs navegable),
// no el walker real de sistemas (ese vive en devhub y se cubre de su lado).

// Fase 3 · sistema con WORKSPACE externo (cross-repo): navegable + key compuesta.
// (El reenvío resolveSistema/systemWorkspaces es devhub-owned y se testea allá.)
func TestEmpresaFromProjectWorkspaceExterno(t *testing.T) {
	const ext = "/ws/prenter-harness"
	d := New(Deps{
		SelectableSistemasIn: func(root string) []string { return nil }, // shell sin boards → 0 descubiertos
		SoleSistemaIn: func(ws string) string {
			if ws == ext {
				return "products"
			}
			return ""
		},
		BoardDirFor: func(ws, sistema string) string { return ws + "/" + sistema + "/docs/product" },
		DirExists:   func(p string) bool { return p == ext+"/products/docs/product" },
	})
	p := Project{
		Name:   "prenter",
		Path:   "/shell/sin-boards",
		Active: false, // inactivo: igual navegable vía workspace externo
		Directorio: DirectorioMeta{
			Kind: "factory",
			Sistemas: []SistemaMeta{
				{Slug: "prenter-harness", Procedencia: "propio", Workspace: ext},
				{Slug: "odoo", Procedencia: "compartido", Ref: "odoo#company=Prenter"},
			},
		},
	}
	emp := d.empresaFromProject(p)
	if len(emp.Sistemas) != 2 {
		t.Fatalf("esperaba 2 sistemas, obtuve %d: %+v", len(emp.Sistemas), emp.Sistemas)
	}
	ah := emp.Sistemas[0]
	if ah.Slug != "prenter-harness" || !ah.Navegable || ah.Key != "prenter/prenter-harness" {
		t.Errorf("prenter-harness debe ser navegable con key compuesta: %+v", ah)
	}
	if emp.Sistemas[1].Navegable {
		t.Errorf("odoo (compartido sin workspace) debe seguir siendo gap: %+v", emp.Sistemas[1])
	}
}

// Fase 3 · sistema DESCUBIERTO bajo empresa INACTIVA → gap honesto (no navegable),
// porque no entra a multiProjects y resolveSistema fallaría (cierra el bug latente).
func TestEmpresaFromProjectDescubiertoInactivo(t *testing.T) {
	d := New(Deps{
		SelectableSistemasIn: func(root string) []string { return []string{"product"} },
	})
	activo := d.empresaFromProject(Project{Name: "x", Path: "/ws/x", Active: true, Directorio: DirectorioMeta{Kind: "own"}})
	if len(activo.Sistemas) != 1 || !activo.Sistemas[0].Navegable || activo.Sistemas[0].Key != "x/product" {
		t.Errorf("activo: el descubierto debe ser navegable con key: %+v", activo.Sistemas)
	}
	inactivo := d.empresaFromProject(Project{Name: "x", Path: "/ws/x", Active: false, Directorio: DirectorioMeta{Kind: "own"}})
	if len(inactivo.Sistemas) != 1 || inactivo.Sistemas[0].Navegable || inactivo.Sistemas[0].Key != "" {
		t.Errorf("inactivo: el descubierto debe ser gap (no navegable, key vacía): %+v", inactivo.Sistemas)
	}
}

// Empresa NO instrumentada (0 sistemas descubiertos): TODOS los sistemas
// declarados se muestran como gaps (incl. propio).
func TestEmpresaFromProjectGaps(t *testing.T) {
	d := New(Deps{
		SelectableSistemasIn: func(root string) []string { return nil },
	})
	p := Project{
		Name:   "perusaas",
		Path:   "/ruta/inexistente-para-test",
		Active: false,
		Directorio: DirectorioMeta{
			Kind: "own",
			Sistemas: []SistemaMeta{
				{Slug: "storefront", Procedencia: "propio"},
				{Slug: "odoo", Procedencia: "compartido", Ref: "odoo#company=PeruSaaS", Descripcion: "factura/suscripciones"},
			},
		},
	}
	emp := d.empresaFromProject(p)

	if emp.Slug != "perusaas" || emp.Kind != "own" || emp.Active != false {
		t.Fatalf("metadata mal: %+v", emp)
	}
	if len(emp.Sistemas) != 2 {
		t.Fatalf("esperaba 2 sistemas (storefront propio gap + odoo compartido), obtuve %d", len(emp.Sistemas))
	}
	for _, s := range emp.Sistemas {
		if s.Navegable {
			t.Errorf("sin sistemas descubiertos, nada debe ser navegable: %+v", s)
		}
		if s.Key != "" {
			t.Errorf("gap debe tener key vacía: %+v", s)
		}
	}
	if emp.Sistemas[0].Slug != "storefront" || emp.Sistemas[0].Procedencia != "propio" {
		t.Errorf("el propio declarado debe verse como gap cuando no hay instrumentación: %+v", emp.Sistemas[0])
	}
	if emp.Sistemas[1].Slug != "odoo" || emp.Sistemas[1].Procedencia != "compartido" || emp.Sistemas[1].Ref == "" {
		t.Errorf("odoo compartido mal proyectado: %+v", emp.Sistemas[1])
	}
	if emp.Sistemas[1].Descripcion != "factura/suscripciones" {
		t.Errorf("descripcion del gap debe propagarse (overview · I-41): %+v", emp.Sistemas[1])
	}
}

// Sin sistemas declarados ni sistemas → empresa visible con lista vacía (no nil).
func TestEmpresaFromProjectEmpty(t *testing.T) {
	d := New(Deps{
		SelectableSistemasIn: func(root string) []string { return nil },
	})
	emp := d.empresaFromProject(Project{Name: "vacia", Path: "/no/existe", Directorio: DirectorioMeta{Kind: "own"}})
	if emp.Sistemas == nil {
		t.Errorf("sistemas debe ser slice no-nil aunque vacío")
	}
	if len(emp.Sistemas) != 0 {
		t.Errorf("esperaba 0 sistemas, obtuve %d", len(emp.Sistemas))
	}
}

// buildPortfolio multi: filtra kind=="" (extra_projects, no son empresas del
// portfolio) y normaliza servicios nil→slice vacío (contrato JSON).
func TestBuildPortfolioMulti(t *testing.T) {
	d := New(Deps{
		IsMultiMode: func() bool { return true },
		RegistryProjects: func() ([]Project, []ServicioCompartido) {
			return []Project{
				{Name: "demo", Path: "/demo", Active: true}, // kind vacío → fuera
				{Name: "prenter", Path: "/p", Active: true, Directorio: DirectorioMeta{Kind: "factory"}},
			}, nil
		},
		DefaultSistema:       func() string { return "prenter/prenter-harness" },
		SelectableSistemasIn: func(root string) []string { return nil },
	})
	tree := d.buildPortfolio()
	if tree.Mode != "multi" || tree.DefaultSistema != "prenter/prenter-harness" {
		t.Fatalf("tree mal proyectado: %+v", tree)
	}
	if len(tree.Empresas) != 1 || tree.Empresas[0].Slug != "prenter" {
		t.Errorf("kind vacío debe filtrarse del portfolio: %+v", tree.Empresas)
	}
	if tree.ServiciosCompartidos == nil {
		t.Errorf("servicios nil debe normalizarse a slice vacío")
	}
}
