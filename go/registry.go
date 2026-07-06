// registry.go — lectura propia de ~/.cockpit/cockpit.yaml (Stage 4 · CK-07).
// Hasta Stage 4 cockpit recibía esto inyectado vía Deps (devhub lo leía y
// adaptaba). El archivo es COMPARTIDO en disco entre los dos binarios — cockpit
// lo lee directo, sin depender de que el binario de devhub esté vivo. Devhub
// sigue siendo dueño de `cockpit add`/`remove`/`auto-add` (mutación); acá solo
// se lee.
package cockpit

import (
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

type registryFile struct {
	Projects             []Project            `yaml:"projects"`
	ServiciosCompartidos []ServicioCompartido `yaml:"servicios_compartidos,omitempty"`
}

func registryPath() string {
	home, err := os.UserHomeDir()
	if err != nil {
		return filepath.Join(".cockpit", "cockpit.yaml")
	}
	return filepath.Join(home, ".cockpit", "cockpit.yaml")
}

// LoadRegistry: fresh de disco en cada llamada — TODOS los proyectos (incl.
// inactivos). Refleja un `cockpit add` de otro proceso sin reiniciar.
func LoadRegistry() (projects []Project, servicios []ServicioCompartido) {
	raw, err := os.ReadFile(registryPath())
	if err != nil {
		return nil, nil
	}
	var reg registryFile
	if err := yaml.Unmarshal(raw, &reg); err != nil {
		return nil, nil
	}
	return reg.Projects, reg.ServiciosCompartidos
}

// ActiveProjects: filtro de activos con path vivo en disco — para el snapshot
// de arranque (contrato asimétrico CK-05: ProjectByName resuelve contra ESTE
// snapshot, no fresh-per-request).
func ActiveProjects(projects []Project) []Project {
	var out []Project
	for _, p := range projects {
		if p.Active && DirExists(p.Path) {
			out = append(out, p)
		}
	}
	return out
}
