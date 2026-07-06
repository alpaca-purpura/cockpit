// Package cockpit — célula P1 (Cockpit de Directorio). CK-02 Stage 2: los tipos
// y handlers directorio-específicos extraídos de devhub/go. DevHub importa este
// paquete (misma dirección que el alias @cockpit/* de la UI en Stage 1); lo que
// cockpit necesita de devhub entra inyectado vía Deps (service.go) — package main
// no se puede importar, la dirección es única.
package cockpit

// DirectorioMeta: campos OPCIONALES de un proyecto que pertenecen a la vista de
// directorio, no al workspace genérico. Un cockpit.yaml viejo (sin estos campos)
// sigue parseando → zero-value. Se generan de chris-corp/portfolio/registry.yaml.
// DevHub los embebe con `yaml:",inline"` en registryProject: el wire format de
// ~/.cockpit/cockpit.yaml queda plano (kind/sistemas/repo al nivel del proyecto).
type DirectorioMeta struct {
	Kind     string        `yaml:"kind,omitempty" json:"kind,omitempty"`         // factory | own | client
	Sistemas []SistemaMeta `yaml:"sistemas,omitempty" json:"sistemas,omitempty"` // dependencias no-sistema (compartido/externo/terciarizado)
	// Repo (Fase 5 · I-46): el shell de la empresa (identidad/negocio), distinto del
	// board (Path/cockpit.path/worktree). Casa del negocio.yaml para la Vista de
	// Negocio. Para prenter Repo==Path; para las luana el shell ≠ worktree. Aditivo.
	Repo string `yaml:"repo,omitempty" json:"repo,omitempty"`
}

// SistemaMeta: un sistema declarado de la empresa que NO es un workspace-sistema
// (Odoo compartido, un SaaS externo, un proceso terciarizado).
type SistemaMeta struct {
	Slug        string `yaml:"slug" json:"slug"`
	Procedencia string `yaml:"procedencia" json:"procedencia"` // propio | compartido | externo | terciarizado
	Ref         string `yaml:"ref,omitempty" json:"ref,omitempty"`
	Descripcion string `yaml:"descripcion,omitempty" json:"descripcion,omitempty"` // texto libre del sistema (overview · I-41)
	// Workspace (Fase 3): un sistema cuyo board NO vive en un subdir de la empresa
	// sino en OTRO path/repo (ej. prenter→prenter-harness). Aditivo/omitempty
	// (backward-compat). Si está presente y el board existe, el sistema es navegable:
	// la key `empresa/sistema` resuelve a ese workspace vía la tabla systemWorkspaces.
	Workspace string `yaml:"workspace,omitempty" json:"workspace,omitempty"`
}

// ServicioCompartido: infra del dueño consumida por varias empresas (ej. Odoo).
// Se de-dup en el rollup del dueño (Increment 3); aquí solo se expone.
type ServicioCompartido struct {
	Slug         string   `yaml:"slug" json:"slug"`
	Nombre       string   `yaml:"nombre,omitempty" json:"nombre,omitempty"`
	ConsumidoPor []string `yaml:"consumido_por,omitempty" json:"consumido_por,omitempty"`
}

// Project: la vista que cockpit tiene de un proyecto del registry. Hasta Stage 4
// (CK-07) devhub adaptaba registryProject→Project vía bridge; desde Stage 4,
// cockpit lee `~/.cockpit/cockpit.yaml` directo (registry.go) — los tags yaml
// abajo son el wire format real (mismo shape flat que devhub's registryProject,
// red: TestRegistryWireFormatRoundTrip).
type Project struct {
	Name       string         `yaml:"name" json:"name"`
	Path       string         `yaml:"path" json:"path"`
	Active     bool           `yaml:"active" json:"active"`
	Directorio DirectorioMeta `yaml:",inline"`
}
