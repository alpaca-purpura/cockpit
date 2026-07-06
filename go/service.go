// service.go — la frontera entre células (CK-05): lo que cockpit necesita de
// devhub entra por acá, inyectado. package main (devhub) no se puede importar —
// la dirección es única: devhub importa cockpit y le presta capacidades vía Deps
// (su directorio_bridge.go). Espejo Go del alias @cockpit/* de la UI (Stage 1).
package cockpit

// Deps: capacidades devhub-owned (estado del workspace/registry y resolución
// single/multi). Son closures lazy — leen el estado del binario al request-time,
// así que el orden de construcción vs enableMultiMode() es irrelevante.
//
// ⚠ Contrato ASIMÉTRICO de las dos fuentes de proyectos (semántica observable —
// NO unificar):
//   - RegistryProjects lee el registry FRESH de disco en cada request y devuelve
//     TODOS los proyectos (incl. inactivos/kind vacío — buildPortfolio filtra):
//     el daemon refleja un `cockpit add` de otro proceso sin reiniciar.
//   - ProjectByName resuelve contra el snapshot de ACTIVOS del arranque
//     (multiProjects): empresa inactiva-pero-registrada → false → 400
//     "empresa desconocida" en /api/negocio.
type Deps struct {
	IsMultiMode          func() bool
	RegistryProjects     func() ([]Project, []ServicioCompartido)
	ProjectByName        func(name string) (Project, bool)
	WorkspaceRoot        func() (string, error)
	DefaultSistema       func() string
	SelectableSistemasIn func(root string) []string
	SoleSistemaIn        func(ws string) string
	BoardDirFor          func(ws, sistema string) string
	DirExists            func(p string) bool
}

// Directorio: los endpoints del directorio (P1), montables en cualquier mux —
// hoy el de devhub (mismo binario); en Stage 4, el runtime propio de cockpit
// monta ESTOS MISMOS handlers.
type Directorio struct {
	deps Deps
}

func New(deps Deps) *Directorio { return &Directorio{deps: deps} }
