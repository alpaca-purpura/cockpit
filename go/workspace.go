// workspace.go — resolución de root + sistemas (Stage 4 · CK-07). Puerto de la
// parte PURA de devhub/go/workspace.go: sin dependencia de multi-mode ni de
// systemWorkspaces (esos siguen devhub-only — cross-repo routing que devhub
// resuelve con su propia copia vendorizada, no con el runtime de cockpit).
package cockpit

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"sync"
)

const platformSlug = "platform"
const fillSentinel = "__FILL_ME__"

var slugRe = regexp.MustCompile(`^[a-zA-Z0-9][a-zA-Z0-9_-]*$`)

func isValidSlug(slug string) bool { return slugRe.MatchString(slug) }

var (
	rootOnce   sync.Once
	cachedRoot string
	rootErr    error
)

// WorkspaceRoot: single-mode root (paridad con la lógica de devhub) — env
// WORKSPACE_ROOT, luego `git rev-parse --show-toplevel`, luego walk-up buscando
// pnpm-workspace.yaml/.git.
func WorkspaceRoot() (string, error) {
	rootOnce.Do(func() {
		if env := os.Getenv("WORKSPACE_ROOT"); env != "" {
			abs, err := filepath.Abs(env)
			if err == nil {
				if st, statErr := os.Stat(abs); statErr == nil && st.IsDir() {
					cachedRoot = abs
					return
				}
			}
			rootErr = fmt.Errorf("WORKSPACE_ROOT no existe en disco: %s", env)
			return
		}

		if out, err := exec.Command("git", "rev-parse", "--show-toplevel").Output(); err == nil {
			root := strings.TrimSpace(string(out))
			if root != "" {
				if _, statErr := os.Stat(root); statErr == nil {
					cachedRoot = root
					return
				}
			}
		}

		dir, _ := os.Getwd()
		for dir != filepath.Dir(dir) {
			if fileExists(filepath.Join(dir, "pnpm-workspace.yaml")) || fileExists(filepath.Join(dir, ".git")) {
				cachedRoot = dir
				return
			}
			dir = filepath.Dir(dir)
		}

		rootErr = fmt.Errorf("no se pudo resolver WORKSPACE_ROOT · setea env var WORKSPACE_ROOT o ejecuta desde dentro de un git repo")
	})
	return cachedRoot, rootErr
}

func fileExists(p string) bool {
	_, err := os.Stat(p)
	return err == nil
}

// DirExists: usado también por registry.go (ActiveProjects) y por Deps.
func DirExists(p string) bool {
	st, err := os.Stat(p)
	return err == nil && st.IsDir()
}

func isBootstrappedSistema(root, slug string) bool {
	return DirExists(filepath.Join(root, slug, "docs", "product"))
}

// sistemasIn: sistemas reales de un root — declarados en el seam
// (project.config.yaml) + descubiertos por filesystem.
func sistemasIn(root string) []string {
	var fromSeam []string
	for _, slug := range seamSistemaSlugs(root) {
		if isValidSlug(slug) && isBootstrappedSistema(root, slug) {
			fromSeam = append(fromSeam, slug)
		}
	}
	seen := map[string]bool{}
	for _, s := range fromSeam {
		seen[s] = true
	}

	var discovered []string
	entries, err := os.ReadDir(root)
	if err == nil {
		for _, e := range entries {
			name := e.Name()
			if !e.IsDir() || strings.HasPrefix(name, ".") || !isValidSlug(name) || seen[name] {
				continue
			}
			if isBootstrappedSistema(root, name) {
				discovered = append(discovered, name)
			}
		}
		sort.Strings(discovered)
	}

	return append(fromSeam, discovered...)
}

// SelectableSistemasIn: reales + platform (pseudo-sistema si root/docs/product existe).
func SelectableSistemasIn(root string) []string {
	real := sistemasIn(root)
	if DirExists(filepath.Join(root, "docs", "product")) {
		return append(real, platformSlug)
	}
	return real
}

// SoleSistemaIn: el único sistema navegable de un workspace (auto-discover).
// "" si hay 0 o >1 (ambiguo).
func SoleSistemaIn(workspace string) string {
	ss := SelectableSistemasIn(workspace)
	if len(ss) == 1 {
		return ss[0]
	}
	return ""
}

// BoardDirFor: dónde vive el docs/product de (workspace, sistema). platform → raíz.
func BoardDirFor(workspace, sistema string) string {
	if sistema == platformSlug {
		return filepath.Join(workspace, "docs", "product")
	}
	return filepath.Join(workspace, sistema, "docs", "product")
}

// DefaultSistemaFromEnv: sistema inicial preferido (DEFAULT_SISTEMA por-worktree).
// "cross-sistema" (hub) o vacío → sin preferencia.
func DefaultSistemaFromEnv() string {
	if env := os.Getenv("DEFAULT_SISTEMA"); env != "" && env != "cross-sistema" {
		return env
	}
	return ""
}

// ── seam (project.config.yaml por root) ─────────────────────────────────────

func readSeam(root string) map[string]any {
	raw, err := os.ReadFile(filepath.Join(root, "project.config.yaml"))
	if err != nil {
		return nil
	}
	m, err := parseYAMLMap(raw)
	if err != nil {
		return nil
	}
	return m
}

func seamSistemaSlugs(root string) []string {
	seam := readSeam(root)
	if seam == nil {
		return nil
	}
	// el seam puede declarar la key nueva `sistemas:` (I-52) o la legacy `brands:`.
	sistemas, _ := seam["sistemas"].(map[string]any)
	if sistemas == nil {
		sistemas, _ = seam["brands"].(map[string]any)
	}
	active, _ := sistemas["active"].([]any)
	var out []string
	for _, item := range active {
		entry, _ := item.(map[string]any)
		if slug, ok := entry["slug"].(string); ok && slug != "" && slug != fillSentinel {
			out = append(out, slug)
		}
	}
	return out
}
