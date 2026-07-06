// glue.go — helpers stateless vendorizados de devhub/go (CK-05): duplicación
// consciente, NO move (los originales quedan en devhub con otros usuarios).
// Criterio: se inyecta lo que tiene su verdad en devhub (estado workspace/registry);
// este glue puro cockpit lo necesitará standalone en Stage 4 (runtime propio).
// El envelope {error: msg} está congelado de facto — la UI depende de él.
package cockpit

import (
	"encoding/json"
	"net/http"
	"os"

	"gopkg.in/yaml.v3"
)

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, message string, extra map[string]any) {
	payload := map[string]any{"error": message}
	for k, v := range extra {
		payload[k] = v
	}
	writeJSON(w, status, payload)
}

// errnoMessage replica el formato de error de Node (`ENOENT: no such file or directory, open '...'`).
func errnoMessage(err error, p string) string {
	if os.IsNotExist(err) {
		return "ENOENT: no such file or directory, open '" + p + "'"
	}
	return err.Error()
}

// parseYAMLMap convierte YAML a map[string]any (yaml.v3 ya usa string keys).
func parseYAMLMap(raw []byte) (map[string]any, error) {
	var m map[string]any
	if err := yaml.Unmarshal(raw, &m); err != nil {
		return nil, err
	}
	return m, nil
}
