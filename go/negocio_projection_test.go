package cockpit

import "testing"

// La proyección objeto→Negocio (D-13 · RN-9): los lentes Mapa/Hilo/Brechas se
// alimentan del objeto normalizado cuando no hay negocio.yaml curado. Estos tests
// clavan el contrato de forma sin HTTP ni disco (función pura).

func TestProyectarNegocio_objetoVacio(t *testing.T) {
	if got := proyectarNegocio(nil, map[string][]map[string]any{}); got != nil {
		t.Fatalf("objeto vacío debe proyectar nil (empty-state honesto), got %v", got)
	}
}

func objetoDemo() (map[string]any, map[string][]map[string]any) {
	empresaDoc := map[string]any{"id": "terranova", "razon_social": "Terranova SA"}
	t := map[string][]map[string]any{
		"objetivos": {{
			"id":     "obj-lima",
			"nombre": "Consolidar Lima",
			"estado": map[string]any{"estado": "vigente"},
			"key_results": []any{
				map[string]any{"id": "obj-lima#kr1", "descripcion": "Margen 14→18", "from": 14, "to": 18, "unit": "%", "kpi_ref": "kpi-margen"},
			},
		}, {
			"id":     "obj-viejo",
			"nombre": "Objetivo deprecado",
			"estado": map[string]any{"estado": "deprecado"},
		}},
		"roles": {{"id": "rol-gg", "nombre": "Gerente General"}},
		"areas": {{"id": "area-gg", "nombre": "Gerencia General"}},
		"procesos": {{
			"id": "pr-audit", "nombre": "Auditoría interna", "digital": "manual",
			"dueño_ref": "rol-gg", "areas_ref": []any{"area-gg"},
			"fuente": "Entrevista", "conf": "media", "ciclo": "anual",
			"provisto_por": map[string]any{"nombre": "Estudio externo"},
		}, {
			"id": "pr-huerfano", "nombre": "Proceso sin área", "digital": "integrado",
		}},
		"kpis": {{
			"id": "kpi-margen", "proceso_ref": "pr-audit",
			"contribuye_a": []any{map[string]any{"kr_ref": "obj-lima#kr1", "peso": 1.0}},
		}},
		"brechas": {{
			"nombre": "Margen debajo de meta", "sub": "8 puntos de brecha",
			"tipo": "target_variance", "kr_ref": []any{"obj-lima#kr1"},
			"costo": "S/ 35k/mes", "prio": "alta", "severidad": "alta",
		}},
	}
	return empresaDoc, t
}

func TestProyectarNegocio_objetivosYKRs(t *testing.T) {
	neg := proyectarNegocio(objetoDemo())
	if neg == nil {
		t.Fatal("proyección nil con objeto poblado")
	}
	if neg["titulo"] != "Terranova SA" {
		t.Errorf("titulo = %v, want Terranova SA", neg["titulo"])
	}
	objs, _ := neg["objetivos"].([]map[string]any)
	if len(objs) != 1 {
		t.Fatalf("objetivos = %d, want 1 (el deprecado se excluye)", len(objs))
	}
	o := objs[0]
	if o["id"] != "obj-lima" || o["from"] != "14" || o["to"] != "18" || o["unit"] != "%" {
		t.Errorf("objetivo mal proyectado: %#v", o)
	}
	if o["kr"] != "Margen 14→18" {
		t.Errorf("kr = %v, want descripción del KR", o["kr"])
	}
}

func TestProyectarNegocio_areasProcesosSemaforoYHilo(t *testing.T) {
	neg := proyectarNegocio(objetoDemo())
	areas, _ := neg["areas"].([]map[string]any)
	// area-gg + la sintética "(sin área)" del proceso huérfano
	if len(areas) != 2 {
		t.Fatalf("areas = %d, want 2 (gerencia + sin-área)", len(areas))
	}
	gg := areas[0]
	procs, _ := gg["procesos"].([]map[string]any)
	if len(procs) != 1 {
		t.Fatalf("procesos de gerencia = %d, want 1", len(procs))
	}
	p := procs[0]
	if p["digital"] != "manual" {
		t.Errorf("digital = %v, want manual (semáforo directo del objeto)", p["digital"])
	}
	if p["puesto"] != "Gerente General" {
		t.Errorf("puesto = %v, want rol resuelto", p["puesto"])
	}
	if p["sistema"] != "Estudio externo" {
		t.Errorf("sistema = %v, want provisto_por.nombre", p["sistema"])
	}
	// el hilo: proceso → kpi (proceso_ref) → contribuye_a.kr_ref → objetivo
	objRefs, _ := p["obj"].([]string)
	if len(objRefs) != 1 || objRefs[0] != "obj-lima" {
		t.Errorf("obj[] = %v, want [obj-lima] (hilo proceso→kpi→kr→objetivo)", p["obj"])
	}
	// proceso huérfano cae en la última área sintética
	sin := areas[1]
	if sin["id"] != "_sin-area" {
		t.Errorf("área sintética id = %v, want _sin-area", sin["id"])
	}
}

func TestProyectarNegocio_brechasAtadasAObjetivo(t *testing.T) {
	neg := proyectarNegocio(objetoDemo())
	br, _ := neg["brechas"].([]map[string]any)
	if len(br) != 1 {
		t.Fatalf("brechas = %d, want 1", len(br))
	}
	b := br[0]
	if b["obj"] != "obj-lima" {
		t.Errorf("obj = %v, want obj-lima (kr_ref → objetivo)", b["obj"])
	}
	if b["prio"] != "alta" {
		t.Errorf("prio = %v, want alta", b["prio"])
	}
	if b["tipo"] != "Sistema" {
		t.Errorf("tipo = %v, want Sistema (target_variance mapeado)", b["tipo"])
	}
}
