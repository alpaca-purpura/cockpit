package cockpit

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// v2 (historia schema-v2-hilo-de-oro-kinetica): 12 entidades (+kpi, +proyecto_mejora, +idea),
// campo errors[] (bloqueantes) además de warnings[], corte limpio (formas v1 muertas = ERROR),
// hilo medible (kpi→kr, actividad→kpi, proyecto→brecha/idea), máquina de estados del proyecto,
// RN-8 (CK-24), RN-14 (divorcio KR↔compensación), RN-15 (auditoría de beneficios), verbos
// contra vocabulario, divergente DERIVADO. Specs: 01-spec.md v2 + 03-arch.md (D-A1..D-A7).

// writeObjetoV2 puebla un shell COMPLETO v2: el fixture mínimo que ejercita las 12
// entidades y todas las aristas nuevas del hilo (SC-1).
func writeObjetoV2(t *testing.T, root string) {
	t.Helper()
	files := map[string]string{
		"empresa/empresa.yaml": `id: vertice
razon_social: "Inmobiliaria Vértice S.A.C."
config_estrategia: { modo: gpd-anual }
unidades:
- { id: "empresa#u1", nombre: "Obra Los Álamos", tipo: obra, entidad_legal_ref: "empresa#el1" }
entidades_legales:
- { id: "empresa#el1", razon_social: "SPV Los Álamos S.A.C.", tax_id: "20601234567" }
fuente: Declarado
conf: alta
`,
		"empresa/personas/per-mateo.yaml": `id: per-mateo
nombre: Mateo
roles:
- { rol: rol-gerente }
vinculo: empleado
fuente: Entrevista
conf: alta
`,
		"empresa/personas/per-ana.yaml": `id: per-ana
nombre: Ana
roles:
- { rol: rol-analista }
reporta_a:
- { ref: per-mateo, tipo: jerarquico }
vinculo: empleado
fuente: Entrevista
conf: alta
`,
		"empresa/roles/rol-gerente.yaml":         "id: rol-gerente\nnombre: Gerente General\n",
		"empresa/roles/rol-analista.yaml":        "id: rol-analista\nnombre: Analista de Cobranza\n",
		"empresa/areas/area-finanzas.yaml":       "id: area-finanzas\nnombre: Finanzas\nlider_ref: rol-gerente\n",
		"empresa/sistemas/sis-odoo.yaml":         "id: sis-odoo\nnombre: Odoo\nprocedencia: propio\nsirve_a: interno\ncapabilities_ref: [cap-cobranza]\n",
		"empresa/capabilities/cap-cobranza.yaml": "id: cap-cobranza\nnombre: Gestión de Cobranzas\n",
		"empresa/procesos/pr-cobranza.yaml": `id: pr-cobranza
nombre: Cobranza
dueño_ref: rol-gerente
areas_ref: [area-finanzas]
sistemas_ref: [sis-odoo]
realiza_capabilities: [cap-cobranza]
digital: manual
riesgos:
- { desc: "pagos no conciliados a tiempo", prob: media, impacto: alto, mitigacion: "corte diario" }
provisto_por: { nombre: "Estudio Contable Rojas", tipo: proveedor }
actividades:
- id: "pr-cobranza#a1"
  orden: 1
  verbo: conciliar
  titulo: Conciliar pagos
  carril_ref: rol-analista
  tipo: humana
  tiempos: { toque: "30m", espera: "4h" }
  mandato: preventivo
  automatizacion: { volumen: 120, excepciones_pct: 5, datos: estructurados, reglas: estables, criterio_promptable: true, tolerancia_revision: alta, riesgo_error: bajo }
  triage: { veredicto: automatizable-rpa, fuente: Inferido, conf: media }
  alimenta_kpi_refs:
  - { kpi_ref: kpi-dias-cobro, peso: 1 }
  raci: { R: [rol-analista], A: rol-gerente, C: [], I: [] }
  fuente: Entrevista
  conf: alta
- id: "pr-cobranza#a2"
  orden: 2
  verbo: notificar
  titulo: Notificar morosos
  carril_ref: rol-analista
  tipo: humana
  flujos_alternos:
  - { cuando: "cliente disputa el cobro", secuencia: ["pr-cobranza#a1"] }
  fuente: Entrevista
  conf: media
`,
		"empresa/objetivos/obj-caja.yaml": `id: obj-caja
nombre: Mejorar flujo de caja
horizonte: anual
cadencia_revision: mensual
estado: { estado: vigente }
perspectiva: financiera
dueño_ref: rol-gerente
key_results:
- id: "obj-caja#kr1"
  descripcion: Reducir días de cobro
  metrica: días de cobro
  from: 45
  to: 30
  current: 38
  kpi_ref: kpi-dias-cobro
  accountable_ref: rol-gerente
  acople_compensacion: true
  driver_refs: [pr-cobranza, cap-cobranza]
`,
		"empresa/kpis/kpi-dias-cobro.yaml": `id: kpi-dias-cobro
nombre: dias-promedio-cobro
tipologia: kpi
tipo: lag
proceso_ref: pr-cobranza
dueño_ref: rol-gerente
unidad_medida: días
banda: { target: 30, umbral_amarillo: 40, umbral_rojo: 50 }
frecuencia: mensual
contribuye_a:
- { kr_ref: "obj-caja#kr1", peso: 1 }
rollup: peor-hijo
mediciones:
- { id: "kpi-dias-cobro#m1", fecha: "2026-06-30", valor_declarado: 38, unidad_ref: "empresa#u1", fuente: Declarado, conf: media }
- { id: "kpi-dias-cobro#m2", fecha: "2026-07-15", valor_declarado: 36, valor_observado: { valor: 36, query_ref: "lake://cobranza/dias" }, fuente: Observado, conf: alta }
fuente: Declarado
conf: alta
`,
		"empresa/brechas/gap-cobranza.yaml": `id: gap-cobranza
nombre: Cobranza manual
tipo: target_variance
against_ref: pr-cobranza
kr_ref: ["obj-caja#kr1"]
prio: alta
estado: accionable
`,
		"empresa/ideas/idea-recordatorio.yaml": `id: idea-recordatorio
titulo: Recordatorio automático de pago
proponente_refs: [per-ana]
sobre_refs: [pr-cobranza]
estado: promovida
evaluacion: { comite_ref: area-finanzas, criterios: { viabilidad: alta, impacto: medio, alineacion: alta }, feedback: "aprobada para piloto", fecha: "2026-07-01" }
reconocimiento: { tipo: "mención + bono", fecha: "2026-07-05" }
promovida_a_ref: pm-recordatorios
fuente: Entrevista
conf: alta
`,
		"empresa/proyectos-mejora/pm-recordatorios.yaml": `id: pm-recordatorios
nombre: Recordatorios automáticos de cobranza
dueño_ref: rol-analista
sponsor_ref: rol-gerente
origen_brecha_refs: [gap-cobranza]
origen_idea_refs: [idea-recordatorio]
metodologia: dmaic
caso_negocio: { tipo_beneficio: hard-saving, beneficio_anualizado: 45000, inversion: 8000, payback_meses: 3, roi: 4.6, formula_beneficio: "días de cobro × costo financiero diario", periodo_realizacion_meses: 12, supuestos: "tasa 12% anual" }
prio: alta
mueve_refs:
- { ref: kpi-dias-cobro, delta_esperado: "-8 días" }
- { ref: "obj-caja#kr1" }
estado: en-ejecucion
firmas: { sponsor: { por_ref: rol-gerente, fecha: "2026-07-02" }, finanzas: { por_ref: rol-gerente, fecha_pre: "2026-07-02" } }
hitos:
- { id: "pm-recordatorios#h1", nombre: "Define cerrado", fecha: "2026-07-03", estado: hecho }
fuente: Declarado
conf: alta
`,
	}
	for rel, body := range files {
		p := filepath.Join(root, rel)
		if err := os.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
	}
}

type objetoV2Resp struct {
	Empresa         map[string]any   `json:"empresa"`
	Personas        []map[string]any `json:"personas"`
	Kpis            []map[string]any `json:"kpis"`
	ProyectosMejora []map[string]any `json:"proyectos_mejora"`
	Ideas           []map[string]any `json:"ideas"`
	Warnings        []string         `json:"warnings"`
	Errors          []string         `json:"errors"`
}

func getObjeto(t *testing.T, d *Directorio, empresa string) (int, objetoV2Resp, string) {
	t.Helper()
	rec := httptest.NewRecorder()
	d.HandleObjeto(rec, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa="+empresa, nil))
	var resp objetoV2Resp
	if err := json.Unmarshal(rec.Body.Bytes(), &resp); err != nil {
		t.Fatalf("json: %v (%s)", err, rec.Body.String())
	}
	return rec.Code, resp, rec.Body.String()
}

// SC-1 — objeto v2 completo: 12 entidades, cero warnings, cero errors, hilo recorrible.
func TestObjetoV2Completo(t *testing.T) {
	shell := t.TempDir()
	writeObjetoV2(t, shell)
	d := newNegocioAPI([]Project{{Name: "vertice", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}})

	code, resp, body := getObjeto(t, d, "vertice")
	if code != 200 {
		t.Fatalf("status=%d body=%s", code, body)
	}
	if len(resp.Errors) != 0 {
		t.Fatalf("objeto v2 válido no debe tener errors: %v", resp.Errors)
	}
	if len(resp.Warnings) != 0 {
		t.Fatalf("objeto v2 válido no debe tener warnings: %v", resp.Warnings)
	}
	if len(resp.Kpis) != 1 || len(resp.ProyectosMejora) != 1 || len(resp.Ideas) != 1 {
		t.Fatalf("rebanadas v2: kpis=%d proyectos_mejora=%d ideas=%d (esperado 1/1/1)", len(resp.Kpis), len(resp.ProyectosMejora), len(resp.Ideas))
	}
}

// SC-2 (mitad negativa) — formas v1 muertas = ERROR que nombra la forma v2 (corte limpio).
func TestFormasV1Muertas(t *testing.T) {
	shell := t.TempDir()
	writeObjetoV2(t, shell)
	dead := map[string]string{
		"empresa/procesos/pr-viejo.yaml": `id: pr-viejo
nombre: Proceso viejo
kpis:
- { nombre: "días de cobro", target: "30", unidad: días }
actividades:
- id: "pr-viejo#a1"
  orden: 1
  titulo: Algo
  tiempo: "2h"
`,
		"empresa/personas/per-viejo.yaml": "id: per-viejo\nnombre: Viejo\nreporta_a: per-mateo\n",
	}
	for rel, body := range dead {
		p := filepath.Join(shell, rel)
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	d := newNegocioAPI([]Project{{Name: "vertice", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}})
	_, resp, _ := getObjeto(t, d, "vertice")
	joined := strings.Join(resp.Errors, "\n")
	for _, want := range []string{
		"kpis embebido eliminado en v2",
		"entidad kpi",
		"tiempos{toque, espera}",
		"reporta_a como ref simple eliminado en v2",
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta error %q en:\n%s", want, joined)
		}
	}
}

// SC-3 — kpi.dueño_ref → persona = ERROR citando CK-24 (RN-8).
func TestKpiDuenoPersona(t *testing.T) {
	shell := t.TempDir()
	writeObjetoV2(t, shell)
	kpiMal := "id: kpi-malo\nnombre: kpi-malo\ndueño_ref: per-mateo\n"
	if err := os.WriteFile(filepath.Join(shell, "empresa", "kpis", "kpi-malo.yaml"), []byte(kpiMal), 0o644); err != nil {
		t.Fatal(err)
	}
	d := newNegocioAPI([]Project{{Name: "vertice", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}})
	_, resp, _ := getObjeto(t, d, "vertice")
	joined := strings.Join(resp.Errors, "\n")
	if !strings.Contains(joined, "CK-24") || !strings.Contains(joined, `kpi "kpi-malo"`) {
		t.Errorf("falta error CK-24 por dueño persona:\n%s", joined)
	}
}

// SC-4 — refs colgantes del hilo v2 → un warning nombrado por ref.
func TestRefsColgantesV2(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	tt := map[string][]map[string]any{
		"kpis": {parse(`id: kpi-1
nombre: kpi-uno
proceso_ref: pr-ghost
dueño_ref: rol-ghost
contribuye_a:
- { kr_ref: "obj-x#kr9" }
en_tension_con: [kpi-ghost]
mediciones:
- { id: "kpi-1#m1", fecha: "2026-01-01", valor_declarado: 1, unidad_ref: "empresa#u9", fuente: Declarado, conf: alta }
`)},
		"proyectos-mejora": {parse(`id: pm-1
nombre: PM Uno
estado: propuesto
origen_brecha_refs: [gap-ghost]
origen_idea_refs: [idea-ghost]
mueve_refs:
- { ref: kpi-ghost }
`)},
		"ideas": {parse("id: idea-1\ntitulo: I\nproponente_refs: [per-ghost]\nestado: aprobada\nsobre_refs: [pr-ghost]\n")},
	}
	w, _ := validateObjeto("x", nil, tt)
	joined := strings.Join(w, "\n")
	for _, want := range []string{
		`proceso_ref "pr-ghost" no existe`,
		`kr_ref "obj-x#kr9" no existe`,
		`en_tension_con "kpi-ghost" no existe`,
		`unidad_ref "empresa#u9" no existe`,
		`origen_brecha_refs "gap-ghost" no existe`,
		`origen_idea_refs "idea-ghost" no existe`,
		`mueve_refs "kpi-ghost" no existe`,
		`proponente_refs "per-ghost" no existe`,
		`sobre_refs "pr-ghost" no existe`,
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta warning %q en:\n%s", want, joined)
		}
	}
}

// SC-5 (lectura) — verbo sinónimo → sugerencia · desconocido → sin clasificar ·
// SC-9 — verbo presente sin provenance → warning anti-gaming (RN-13).
func TestVerbosVocabulario(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	tt := map[string][]map[string]any{
		"roles": {parse("id: rol-a\nnombre: A\n")},
		"procesos": {parse(`id: pr-1
nombre: Uno
actividades:
- id: "pr-1#a1"
  orden: 1
  verbo: chequear
  titulo: Chequear pagos
  fuente: Entrevista
  conf: alta
- id: "pr-1#a2"
  orden: 2
  verbo: levitar
  titulo: Levitar facturas
  fuente: Entrevista
  conf: alta
- id: "pr-1#a3"
  orden: 3
  verbo: conciliar
  titulo: Conciliar sin evidencia
`)},
	}
	w, _ := validateObjeto("x", nil, tt)
	joined := strings.Join(w, "\n")
	for _, want := range []string{
		`verbo "chequear" es sinónimo — normalizar a "verificar"`,
		`verbo "levitar" fuera del vocabulario`,
		`verbo sin provenance`,
	} {
		if !strings.Contains(joined, want) {
			t.Errorf("falta warning %q en:\n%s", want, joined)
		}
	}
}

// SC-7 — divergencia declarado vs observado: el payload la PINTA (derivado), el
// archivo de instancia queda INTACTO (jamás se persiste — RN-9).
func TestDivergenciaDerivada(t *testing.T) {
	shell := t.TempDir()
	writeObjetoV2(t, shell)
	kpiPath := filepath.Join(shell, "empresa", "kpis", "kpi-dias-cobro.yaml")
	divergente := `id: kpi-dias-cobro
nombre: dias-promedio-cobro
dueño_ref: rol-gerente
mediciones:
- { id: "kpi-dias-cobro#m1", fecha: "2026-07-15", valor_declarado: 12, valor_observado: { valor: 7, query_ref: "lake://x" }, fuente: Observado, conf: alta }
`
	if err := os.WriteFile(kpiPath, []byte(divergente), 0o644); err != nil {
		t.Fatal(err)
	}
	before, _ := os.ReadFile(kpiPath)
	d := newNegocioAPI([]Project{{Name: "vertice", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}})
	_, resp, body := getObjeto(t, d, "vertice")
	if len(resp.Kpis) != 1 {
		t.Fatalf("kpis=%d body=%s", len(resp.Kpis), body)
	}
	meds, _ := resp.Kpis[0]["mediciones"].([]any)
	if len(meds) != 1 {
		t.Fatalf("mediciones=%d", len(meds))
	}
	m0, _ := meds[0].(map[string]any)
	if dv, _ := m0["divergente"].(bool); !dv {
		t.Errorf("la medición 12≠7 debe salir divergente:true en el payload: %v", m0)
	}
	after, _ := os.ReadFile(kpiPath)
	if string(before) != string(after) {
		t.Errorf("el archivo de instancia NO debe modificarse (derivado, no persistido)")
	}
}

// SC-8 — objetivo sin key_results → warning `sin-ancla-de-valor` (RN-4′ — ya no error).
func TestSinAnclaDeValor(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	tt := map[string][]map[string]any{
		"objetivos": {parse("id: obj-solo\nnombre: Sin KRs\n")},
	}
	w, e := validateObjeto("x", nil, tt)
	joined := strings.Join(w, "\n")
	if !strings.Contains(joined, "sin-ancla-de-valor") {
		t.Errorf("falta warning sin-ancla-de-valor: %v", w)
	}
	if len(e) != 0 {
		t.Errorf("objetivo sin KRs NO es error (RN-4′): %v", e)
	}
}

// SC-10 — máquina de estados del proyecto (RN-12) + cierre hard-saving sin firma post (RN-15).
func TestCicloMejoraGobernado(t *testing.T) {
	casos := []struct {
		de, hacia string
		ok        bool
	}{
		{"propuesto", "cerrado", false}, // salto directo prohibido
		{"propuesto", "triaje", true},
		{"en-verificacion", "en-ejecucion", true}, // loop-back MASP
		{"en-verificacion", "estandarizado", true},
		{"estandarizado", "beneficios-en-auditoria", true},
		{"beneficios-en-auditoria", "cerrado", true},
		{"cerrado", "en-ejecucion", false},   // terminal
		{"aprobado", "estandarizado", false}, // salta ejecución/verificación
	}
	for _, c := range casos {
		if got := transicionProyectoValida(c.de, c.hacia); got != c.ok {
			t.Errorf("transición %s→%s = %v, esperado %v", c.de, c.hacia, got, c.ok)
		}
	}

	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	// cierre con hard-saving SIN firmas.finanzas.fecha_post → ERROR (RN-15)
	tt := map[string][]map[string]any{
		"proyectos-mejora": {parse(`id: pm-truco
nombre: Cierre sin auditoría
estado: cerrado
caso_negocio: { tipo_beneficio: hard-saving, beneficio_anualizado: 1000 }
firmas: { finanzas: { por_ref: rol-x, fecha_pre: "2026-01-01" } }
`)},
	}
	_, e := validateObjeto("x", nil, tt)
	joined := strings.Join(e, "\n")
	if !strings.Contains(joined, "hard-saving") || !strings.Contains(joined, "fecha_post") {
		t.Errorf("falta error RN-15 (cierre hard-saving sin firma finanzas post): %v", e)
	}
	// estado fuera de enum → error
	tt2 := map[string][]map[string]any{
		"proyectos-mejora": {parse("id: pm-x\nnombre: X\nestado: volando\n")},
	}
	_, e2 := validateObjeto("x", nil, tt2)
	if !strings.Contains(strings.Join(e2, "\n"), `estado "volando"`) {
		t.Errorf("falta error de estado inválido: %v", e2)
	}
}

// SC-11 — divorcio KR↔compensación (RN-14): acople true + modo okr-trimestral = ERROR;
// mismo dato con modo gpd-anual = OK.
func TestDivorcioKrCompensacion(t *testing.T) {
	parse := func(s string) map[string]any {
		m, err := parseYAMLMap([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		return m
	}
	obj := `id: obj-1
nombre: O
key_results:
- id: "obj-1#kr1"
  descripcion: D
  metrica: m
  from: 1
  to: 2
  acople_compensacion: true
`
	tt := map[string][]map[string]any{"objetivos": {parse(obj)}}

	empOKR := parse("id: x\nrazon_social: X\nconfig_estrategia: { modo: okr-trimestral }\n")
	_, e := validateObjeto("x", empOKR, tt)
	if !strings.Contains(strings.Join(e, "\n"), "RN-14") {
		t.Errorf("acople_compensacion en modo okr-trimestral debe ser ERROR RN-14: %v", e)
	}

	empGPD := parse("id: x\nrazon_social: X\nconfig_estrategia: { modo: gpd-anual }\n")
	_, e2 := validateObjeto("x", empGPD, tt)
	if strings.Contains(strings.Join(e2, "\n"), "RN-14") {
		t.Errorf("acople_compensacion en modo gpd-anual es VÁLIDO (PLR): %v", e2)
	}
}

// SC-12 — paridad schema↔Go (D-A7): los enums/transiciones que el Go espeja coinciden
// con sistema/schema/objeto.schema.yaml y verbos.yaml (una sola fuente, dos consumidores).
func TestParidadSchema(t *testing.T) {
	raw, err := os.ReadFile(filepath.Join("..", "sistema", "schema", "objeto.schema.yaml"))
	if err != nil {
		t.Fatalf("no pude leer objeto.schema.yaml: %v", err)
	}
	schema, err := parseYAMLMap(raw)
	if err != nil {
		t.Fatal(err)
	}
	enums := oMap(schema["enums"])

	setDe := func(v any) map[string]bool {
		out := map[string]bool{}
		for _, x := range oList(v) {
			out[oStr(x)] = true
		}
		return out
	}
	igual := func(nombre string, schemaSet, goSet map[string]bool) {
		t.Helper()
		for k := range schemaSet {
			if !goSet[k] {
				t.Errorf("paridad %s: %q está en el schema, falta en Go", nombre, k)
			}
		}
		for k := range goSet {
			if !schemaSet[k] {
				t.Errorf("paridad %s: %q está en Go, falta en el schema", nombre, k)
			}
		}
	}
	igual("fuente", setDe(enums["fuente"]), objFuenteOK)
	igual("estado_proyecto", setDe(enums["estado_proyecto"]), objEstadoProyectoOK)
	igual("estado_idea", setDe(enums["estado_idea"]), objEstadoIdeaOK)
	igual("estado_brecha", setDe(enums["estado_brecha"]), objEstadoBrechaOK)
	igual("modo_estrategia", setDe(enums["modo_estrategia"]), objModoEstrategiaOK)
	igual("tipo_unidad", setDe(enums["tipo_unidad"]), objTipoUnidadOK)

	// transiciones_proyecto del schema == tabla Go
	trans := oMap(oMap(schema["acciones"])["transiciones_proyecto"])
	if len(trans) == 0 {
		t.Fatal("schema sin acciones.transiciones_proyecto")
	}
	for de, haciaV := range trans {
		goHacia := transicionesProyecto[de]
		goSet := map[string]bool{}
		for _, h := range goHacia {
			goSet[h] = true
		}
		schemaSet := setDe(haciaV)
		igual("transiciones["+de+"]", schemaSet, goSet)
	}
	for de := range transicionesProyecto {
		if _, ok := trans[de]; !ok {
			t.Errorf("paridad transiciones: estado %q está en Go, falta en el schema", de)
		}
	}

	// vocabulario: el runtime carga verbos.yaml del repo (D-A4)
	v := cargaVerbos()
	if len(v.canonicos) < 30 {
		t.Errorf("vocabulario cargado con %d canónicos (< 30 — ¿no encontró verbos.yaml?)", len(v.canonicos))
	}
	if v.sinonimoDe["chequear"] != "verificar" {
		t.Errorf("sinónimo chequear→verificar no cargado: %v", v.sinonimoDe["chequear"])
	}
}

// NFR — shell sintético ~500 archivos: GET completo < 1s (p95 frío).
func BenchmarkHandleObjeto500(b *testing.B) {
	shell := b.TempDir()
	base := filepath.Join(shell, "empresa")
	_ = os.MkdirAll(filepath.Join(base, "procesos"), 0o755)
	_ = os.MkdirAll(filepath.Join(base, "kpis"), 0o755)
	_ = os.MkdirAll(filepath.Join(base, "roles"), 0o755)
	_ = os.WriteFile(filepath.Join(base, "empresa.yaml"), []byte("id: mega\nrazon_social: Mega\n"), 0o644)
	_ = os.WriteFile(filepath.Join(base, "roles", "rol-r.yaml"), []byte("id: rol-r\nnombre: R\n"), 0o644)
	for i := 0; i < 250; i++ {
		pr := fmt.Sprintf("id: pr-%d\nnombre: P%d\ndueño_ref: rol-r\nactividades:\n- { id: \"pr-%d#a1\", orden: 1, verbo: conciliar, titulo: T, fuente: Entrevista, conf: alta }\n", i, i, i)
		_ = os.WriteFile(filepath.Join(base, "procesos", fmt.Sprintf("pr-%d.yaml", i)), []byte(pr), 0o644)
		kp := fmt.Sprintf("id: kpi-%d\nnombre: kpi-n-%d\ndueño_ref: rol-r\nproceso_ref: pr-%d\nmediciones:\n- { id: \"kpi-%d#m1\", fecha: \"2026-01-01\", valor_declarado: 1, fuente: Declarado, conf: alta }\n", i, i, i, i)
		_ = os.WriteFile(filepath.Join(base, "kpis", fmt.Sprintf("kpi-%d.yaml", i)), []byte(kp), 0o644)
	}
	d := newNegocioAPI([]Project{{Name: "mega", Path: shell, Active: true, Directorio: DirectorioMeta{Repo: shell, Kind: "own"}}})
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		rec := httptest.NewRecorder()
		d.HandleObjeto(rec, httptest.NewRequest(http.MethodGet, "/api/objeto?empresa=mega", nil))
		if rec.Code != 200 {
			b.Fatal(rec.Code)
		}
	}
}
