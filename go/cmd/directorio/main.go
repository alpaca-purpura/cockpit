// cmd/directorio/main.go — binario propio de Cockpit (P1 · N13 en NODOS.md,
// Stage 4 · CK-07). Runtime independiente del binario `cockpit` de DevHub
// (P2 · N5): sirve /api/portfolio + /api/negocio + la UI de Vista Negocio
// (CockpitShell), leyendo el MISMO ~/.cockpit/cockpit.yaml en disco
// (cockpit.LoadRegistry) — sin Deps, sin require+replace, sin depender de que
// el binario de devhub esté vivo.
//
// Uso:
//
//	directorio -workspace ~/Proyectos/demo-environment -port 4100
//	WORKSPACE_ROOT=~/Proyectos/demo-environment ./directorio
package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/alpacapurpura/cockpit"
)

//go:embed all:ui
var uiFS embed.FS

// activeProjects: snapshot de arranque — el contrato asimétrico CK-05
// (ProjectByName resuelve contra ESTO, no fresh-per-request: empresa
// inactiva-pero-registrada → false → 400 "empresa desconocida").
var (
	activeProjects []cockpit.Project
	multiMode      bool
)

// uiHandler sirve el static export con fallback estilo trailingSlash — copia
// exacta del de devhub/go/main.go (pequeño, sin estado, sin razón de compartir).
func uiHandler() http.Handler {
	sub, err := fs.Sub(uiFS, "ui")
	if err != nil {
		log.Fatalf("ui embebida no disponible: %v", err)
	}
	fileServer := http.FileServer(http.FS(sub))
	serveHTML := func(w http.ResponseWriter, name string, status int) bool {
		data, err := fs.ReadFile(sub, name)
		if err != nil {
			return false
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(status)
		_, _ = w.Write(data)
		return true
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		p := strings.Trim(strings.TrimPrefix(r.URL.Path, "/"), "/")
		if p == "" {
			p = "index.html"
		}
		if strings.HasSuffix(p, ".html") {
			if serveHTML(w, p, http.StatusOK) {
				return
			}
		}
		if st, err := fs.Stat(sub, p); err == nil && st.IsDir() {
			if serveHTML(w, p+"/index.html", http.StatusOK) {
				return
			}
		}
		if _, err := fs.Stat(sub, p); err != nil {
			if serveHTML(w, p+"/index.html", http.StatusOK) {
				return
			}
			if serveHTML(w, "404.html", http.StatusNotFound) {
				return
			}
		}
		fileServer.ServeHTTP(w, r)
	})
}

func main() {
	port := flag.Int("port", 4100, "puerto HTTP")
	workspace := flag.String("workspace", "", "workspace root (single-mode; default: registry multi-workspace o auto-detect)")
	flag.Parse()

	if *workspace != "" {
		os.Setenv("WORKSPACE_ROOT", *workspace)
	}

	var modeDesc string
	if *workspace != "" || os.Getenv("WORKSPACE_ROOT") != "" {
		root, err := cockpit.WorkspaceRoot()
		if err != nil {
			log.Fatalf("✗ %v", err)
		}
		modeDesc = "workspace=" + root
	} else if projects, _ := cockpit.LoadRegistry(); len(cockpit.ActiveProjects(projects)) > 0 {
		activeProjects = cockpit.ActiveProjects(projects)
		multiMode = true
		names := make([]string, len(activeProjects))
		for i, p := range activeProjects {
			names[i] = p.Name
		}
		modeDesc = fmt.Sprintf("multi-workspace=%v", names)
	} else {
		root, err := cockpit.WorkspaceRoot()
		if err != nil {
			log.Fatalf("✗ %v (o registrá proyectos: cockpit add PATH)", err)
		}
		modeDesc = "workspace=" + root
	}

	directorioAPI := cockpit.New(cockpit.Deps{
		IsMultiMode: func() bool { return multiMode },
		RegistryProjects: func() ([]cockpit.Project, []cockpit.ServicioCompartido) {
			return cockpit.LoadRegistry() // fresh de disco por request
		},
		ProjectByName: func(name string) (cockpit.Project, bool) {
			for _, p := range activeProjects { // snapshot de arranque
				if p.Name == name {
					return p, true
				}
			}
			return cockpit.Project{}, false
		},
		WorkspaceRoot:        cockpit.WorkspaceRoot,
		DefaultSistema:       cockpit.DefaultSistemaFromEnv,
		SelectableSistemasIn: cockpit.SelectableSistemasIn,
		SoleSistemaIn:        cockpit.SoleSistemaIn,
		BoardDirFor:          cockpit.BoardDirFor,
		DirExists:            cockpit.DirExists,
	})

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/portfolio", directorioAPI.HandlePortfolio)
	mux.HandleFunc("GET /api/negocio", directorioAPI.HandleNegocio)
	mux.HandleFunc("GET /api/objeto", directorioAPI.HandleObjeto)
	mux.Handle("/", uiHandler())

	addr := fmt.Sprintf(":%d", *port)
	log.Printf("🧭 directorio · %s · http://localhost%s", modeDesc, addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
