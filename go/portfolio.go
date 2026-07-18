// portfolio.go — GET /api/portfolio (I-36 · vista de directorio). Movido de
// devhub/go en CK-02 Stage 2; la lógica es la misma, las capacidades del
// workspace entran por Deps (service.go).
//
// Proyecta el modelo Dueño→Empresa→Sistema mostrando el MAPA COMPLETO: cada
// empresa lista TODOS sus sistemas (navegables + no-instrumentados = gaps).
//   - navegable: hay un workspace-sistema descubierto → clicable (key="empresa/sistema").
//   - gap:       sistema declarado sin datos (Odoo compartido, externo, terciarizado,
//     o un propio aún no instrumentado) → key="" (se ve, no se navega).
//
// Regla anti-mismatch: si la empresa está instrumentada (tiene sistemas descubiertos),
// esos sistemas SON sus sistemas propios; los propio declarados no se duplican.
// Las empresas se muestran TODAS (activas o no): lo inactivo es un gap visible.
package cockpit

import "net/http"

type portfolioSistema struct {
	Slug        string `json:"slug"`
	Procedencia string `json:"procedencia"`           // propio | compartido | externo | terciarizado
	Key         string `json:"key,omitempty"`         // sistema-key navegable; "" = no instrumentado (gap)
	Ref         string `json:"ref,omitempty"`         // para compartido/externo: a qué apunta
	Descripcion string `json:"descripcion,omitempty"` // texto libre (overview de gap · I-41)
	Navegable   bool   `json:"navegable"`
}

type portfolioEmpresa struct {
	Slug     string             `json:"slug"` // "" en single-mode
	Kind     string             `json:"kind,omitempty"`
	Active   bool               `json:"active"`
	Sistemas []portfolioSistema `json:"sistemas"`
}

type portfolioTree struct {
	Mode                 string               `json:"mode"`                      // multi | single
	DefaultSistema       string               `json:"default_sistema,omitempty"` // sistema inicial preferido (env DEFAULT_SISTEMA)
	Empresas             []portfolioEmpresa   `json:"empresas"`
	ServiciosCompartidos []ServicioCompartido `json:"servicios_compartidos"`
}

func (d *Directorio) empresaFromProject(p Project) portfolioEmpresa {
	sistemas := []portfolioSistema{}

	// 1) sistemas descubiertos (subdirs con docs/product) = propios navegables.
	//    Navegable SOLO si la empresa está activa — si no, no entra a multiProjects
	//    y resolveSistema fallaría: se muestra como gap honesto hasta activarla
	//    (Fase 3: cierra el divorcio "navegable en el selector" vs "el board carga").
	discovered := d.deps.SelectableSistemasIn(p.Path)
	for _, b := range discovered {
		s := portfolioSistema{Slug: b, Procedencia: "propio", Navegable: p.Active}
		if p.Active {
			s.Key = p.Name + "/" + b
		}
		sistemas = append(sistemas, s)
	}

	// 2) sistemas declarados (registry): compartido/externo/terciarizado SIEMPRE
	//    (son gaps no-board); propio solo si la empresa NO tiene descubiertos
	//    (salvo que apunte a un workspace externo: eso es un sistema real, no dup).
	hasDiscovered := len(discovered) > 0
	for _, s := range p.Directorio.Sistemas {
		if s.Procedencia == "propio" && hasDiscovered && s.Workspace == "" {
			continue
		}
		sis := portfolioSistema{
			Slug: s.Slug, Procedencia: s.Procedencia, Ref: s.Ref, Descripcion: s.Descripcion, Navegable: false,
		}
		// Fase 3: sistema con workspace externo (cross-repo) → navegable si su board
		// existe en disco. La key `empresa/sistema` resuelve vía systemWorkspaces.
		if s.Workspace != "" {
			if inner := d.deps.SoleSistemaIn(s.Workspace); inner != "" && d.deps.DirExists(d.deps.BoardDirFor(s.Workspace, inner)) {
				sis.Navegable = true
				sis.Key = p.Name + "/" + s.Slug
			}
		}
		sistemas = append(sistemas, sis)
	}

	return portfolioEmpresa{Slug: p.Name, Kind: p.Directorio.Kind, Active: p.Active, Sistemas: sistemas}
}

func (d *Directorio) buildPortfolio() portfolioTree {
	if d.deps.IsMultiMode() {
		projects, servicios := d.deps.RegistryProjects()
		empresas := []portfolioEmpresa{}
		for _, p := range projects {
			if p.Directorio.Kind == "" {
				continue // extra_projects (ej. demo) no son empresas del portfolio
			}
			empresas = append(empresas, d.empresaFromProject(p))
		}
		if servicios == nil {
			servicios = []ServicioCompartido{}
		}
		return portfolioTree{Mode: "multi", DefaultSistema: d.deps.DefaultSistema(), Empresas: empresas, ServiciosCompartidos: servicios}
	}

	// single-mode: un workspace, sin registry → empresa "" con sus sistemas navegables.
	emp := portfolioEmpresa{Slug: "", Active: true, Sistemas: []portfolioSistema{}}
	if root, err := d.deps.WorkspaceRoot(); err == nil {
		for _, b := range d.deps.SelectableSistemasIn(root) {
			emp.Sistemas = append(emp.Sistemas, portfolioSistema{
				Slug: b, Procedencia: "propio", Key: b, Navegable: true,
			})
		}
	}
	return portfolioTree{Mode: "single", DefaultSistema: d.deps.DefaultSistema(), Empresas: []portfolioEmpresa{emp}, ServiciosCompartidos: []ServicioCompartido{}}
}

// HandlePortfolio — GET /api/portfolio.
func (d *Directorio) HandlePortfolio(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, 200, d.buildPortfolio())
}
