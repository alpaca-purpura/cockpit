// GENERADO desde NODOS.md por sistema/arquitectura/gen_arquitectura.py — NO editar a mano.
window.NODOS = {
  "N15": {
    "titulo": "Arnesia — fábrica de arneses",
    "plano": "Fabricante",
    "tipo": "servicio/exec-env",
    "madurez": "existe (parcial)",
    "marca": "★IP",
    "campos": [
      [
        "objetivo",
        "Ser la **fábrica de arneses**: producir y versionar los paquetes de skills/instrucciones/guardrails que definen **un rol dentro de un proceso**, ejecutables sobre Claude Code. Es donde se construye y evoluciona el activo que vendemos convertido en producto operable — el método deja de ser documento y se vuelve arnés que corre en el puesto."
      ],
      [
        "resumen",
        "Aplicación de la fábrica (nuestra, y entregable al cliente para que mantenga los suyos): edita el Repositorio Maestro (N2), compila el objeto normalizado + el método en `SKILL.md`/plugins por rol, y publica al canal de distribución (N3). Patrón \"docs→skills sin drift\": el arnés se **compila** desde la fuente, jamás se edita a mano."
      ],
      [
        "plano · tipo · madurez",
        "Fabricante · servicio/exec-env (app de la fábrica) · **existe (parcial)** — el repo P4 existe; falta el pipeline arnés-por-rol contra el objeto normalizado de Cockpit."
      ],
      [
        "responsabilidades",
        "Fabricar/versionar los arneses por rol-en-proceso **[R8]** · compilar doc humano + `SKILL.md` desde la MISMA fuente (objeto normalizado, anti-drift) · empaquetar por rol (skill = procedimiento, plugin = rol, marketplace = mapa de procesos) · entregar los arneses al canal de distribución (N3) para consultores y para el cliente."
      ],
      [
        "no_objetivos",
        "NO opera el engagement (eso es Consultio/N14) · NO razona sobre datos del cliente · NO es multi-tenant server-side · NO edita a mano el artefacto generado (se regenera)."
      ],
      [
        "stack",
        "**Agent Skills (estándar abierto, Anthropic oct-2025 / agentskills.io dic-2025)**: `SKILL.md` + `references/` + progressive disclosure; plugin = bundle de skills + MCP + subagentes + comandos (patrón Cowork empresarial, feb-2026). Anti-drift estilo Inkeep (compilar en build-time desde la fuente, gate que rechaza edición del generado). Stack de la app por decidir (BL-15 lo cubre para Consultio; Arnesia comparte linaje P4)."
      ],
      [
        "expone",
        "Los arneses compilados hacia N3 (canal de releases) y, en el engagement, hacia el Repositorio de Arneses del cliente (parte de N6)."
      ],
      [
        "estado + persistencia",
        "El código y las plantillas de arnés viven en el Repositorio Maestro (N2). Sin estado de cliente."
      ],
      [
        "escala + disponibilidad",
        "Herramienta de fábrica, uso interno + entregable. Si no está disponible, no bloquea al cliente (los arneses ya distribuidos siguen)."
      ],
      [
        "integraciones_externas",
        "Claude Code (para probar arneses) · N2 (fuente) · N3 (canal)."
      ],
      [
        "seguridad",
        "Es donde vive el know-how del método antes de empaquetarse. Al entregarse al cliente, la protección pasa a **licencia + contrato** (deroga el límite \"método nunca al cliente\" — ver chequeo 1). Least-privilege contra los repos."
      ],
      [
        "nfr / cumplimiento_progresivo",
        "Versionado semántico de arneses; canal firmado (hereda N3/TUF); trazabilidad de qué versión de arnés corre cada puesto (telemetría N3)."
      ],
      [
        "comunicacion",
        "Arnesia → N2 (edita la fuente) · Arnesia → N3 (publica arneses) · Arnesia → N6 (en el engagement, siembra el Repositorio de Arneses del cliente)."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: N2 (fuente del método/código), Claude Code (prueba). consumido_por: N14/N17/N5 (cargan los arneses que produce), N3 (los distribuye), el cliente (los mantiene tras la entrega)."
      ],
      [
        "riesgos_abiertos",
        "(1) Frontera Arnesia (fábrica) vs Consultio (app del consultor) — qué se construye en cuál. (2) Modelo de entrega/licencia de Arnesia al cliente (¿la mantiene el Analista de Calidad?, ¿con qué límites?). (3) Anti-drift real: gate que rechace arneses editados a mano. (4) Cuánto método baja empaquetado vs se sirve por actualización."
      ],
      [
        "fuentes",
        "[Agent Skills — Anthropic](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) · [Cowork plugins empresariales](https://claude.com/blog/cowork-plugins-across-enterprise) · [Docs→Skills sin drift — Inkeep](https://inkeep.com/blog/docs-to-agent-skills) · `proyecto/research/rediseno-total/07-proceso-como-arnes.md`."
      ]
    ]
  },
  "N2": {
    "titulo": "Repositorio Maestro (método + arneses + código)",
    "plano": "Fabricante",
    "tipo": "artefacto/dato",
    "madurez": "existe (parcial)",
    "marca": "★IP",
    "campos": [
      [
        "objetivo",
        "Centralizar como **dato versionado** todo lo que la fábrica mantiene y actualiza: el método (m1·m2·m3), el razonamiento de discovery convertido en arneses, los arneses plantilla por rol, y el código fuente de las apps (Consultio, Colab Studio, DevStudio, Cockpit, Arnesia). Es el activo más valioso: se mejora central y se propaga por releases sin rehacer nada en el cliente."
      ],
      [
        "resumen",
        "Monorepo/repos privados de la fábrica: `process/` (proceso como dato), M-cards, schemas L0, arneses plantilla, y el código de los productos. Fuente de la que N15 compila y N3 distribuye."
      ],
      [
        "plano · tipo · madurez",
        "Fabricante · artefacto/dato · **existe (parcial)**. Existen `sistema/metodo/` (proceso m1/m2/m3, methodologies.yaml, schemas) y el código de Cockpit; falta consolidar los arneses plantilla y el pipeline de compilación (N15)."
      ],
      [
        "responsabilidades",
        "Ser SSoT del método + arneses plantilla + código · versionado y auditable · legible por N15 (compilable a arneses) y por humanos · evolucionable con anti-drift (gate `gen_all.py --check`, mismo linaje que CK-17)."
      ],
      [
        "no_objetivos",
        "NO contiene datos de cliente · NO ejecuta (es dato; N15 lo compila, el edge lo corre) · NO se entrega crudo al cliente (se entrega el arnés compilado + Arnesia licenciada, no el repo de la fábrica)."
      ],
      [
        "formato",
        "Markdown (método/narrativa) + YAML/JSON (`methodologies.yaml`, `process/`, schemas, objeto.schema) + código (Go/TS/…). git."
      ],
      [
        "propietario + clasificacion",
        "**Nuestro (Prenter).** ★IP/know-how — la pieza más sensible. La entrega al cliente es del **arnés compilado**, no de esta fuente."
      ],
      [
        "residencia + retencion",
        "Repos privados de la fábrica (nube/GitHub privado). Persiste con nosotros. Se compila y distribuye; el crudo del método no baja al cliente."
      ],
      [
        "versionado",
        "git + `KIT_VERSION`/semver; schema = contrato; gate anti-drift garantiza que los generados (arneses, docs) no driften de la fuente."
      ],
      [
        "quién_escribe / quién_lee",
        "Escribe: nosotros (fábrica, vía `disena-etapa`, `ledger`, Arnesia). Lee: N15 (compila arneses), humanos (el porqué del método)."
      ],
      [
        "comunicacion",
        "No es servicio: N15 lo lee y compila; N3 publica lo compilado. git + API del host privado."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: schemas L0, git. consumido_por: N15 (Arnesia), N3 (distribución)."
      ],
      [
        "riesgos_abiertos",
        "Granularidad de qué método baja empaquetado en el arnés vs se sirve por actualización (espejo del viejo riesgo N1/N2) · el método empaquetado en el cliente ya no es \"fuerte por arquitectura\": la protección es licencia + contrato (ver chequeo 1) · convergencia objeto.schema ↔ negocio.schema (BL-02 cerrado; BL-19 pendiente)."
      ],
      [
        "fuentes",
        "`sistema/metodo/` · [Git for Data — DoltHub](https://www.dolthub.com/blog/2020-03-06-so-you-want-git-for-data/) · `proyecto/research/rediseno-total/07-proceso-como-arnes.md`."
      ]
    ]
  },
  "N3": {
    "titulo": "Portal — distribución + telemetría + licencias",
    "plano": "Fabricante",
    "tipo": "servicio",
    "madurez": "no-construido",
    "marca": "—",
    "campos": [
      [
        "objetivo",
        "Ser la **puerta comercial** (portal: login, cobro, asientos, descargas) y el canal técnico: publicar releases firmadas que el edge y los instalables del cliente **jalan**, gestionar los **entitlements/licencias por asiento** (quién tiene derecho a qué, en cuántas máquinas — fingerprint compuesto —, revocable), y recibir **telemetría agregada** opt-in (salud/uso de la flota, nunca datos crudos) — para poder ofrecer mantenimiento sin abrir puertos hacia el cliente."
      ],
      [
        "resumen",
        "El \"Plano del Fabricante\" operable: canal de releases (binario Cockpit, apps de escritorio, arneses), licencias offline-first, telemetría por pull/push saliente. Dos audiencias: nuestros consultores (siempre) y clientes con contrato de mantenimiento (opt-in; el cliente que se auto-mantiene con su Arnesia no jala nada nuestro)."
      ],
      [
        "plano · tipo · madurez",
        "Fabricante · servicio · **no-construido**. Piezas madurísimas (go-tuf v2, Tauri updater, marketplaces de Claude Code, OTel, Ed25519) — el nodo de menor riesgo técnico."
      ],
      [
        "responsabilidades",
        "Publicar releases firmadas (binario + apps + arneses) que el cliente jala y verifica **[R9]** · emitir/validar licencias (entitlements por cliente, revocables) · recibir telemetría agregada (scrubbing) para dashboards de flota · canales (consultores siempre-verde / clientes estable) + rollback."
      ],
      [
        "no_objetivos",
        "NO empuja updates (no inbound; el cliente decide cuándo jala) · NO recibe datos crudos (ni PII ni contenido) · NO es APM ni data warehouse · NO es el mapa de procesos (eso es el marketplace de arneses, contenido, no infraestructura)."
      ],
      [
        "stack",
        "**Binario:** go-tuf v2 (v0.7 deprecado) + TUF-on-CI sobre GitHub Actions (caso \"baja frecuencia, un mantenedor\"; Sigstore lo usa en prod). Fallback: cosign/minisign + Releases. **Apps de escritorio:** Tauri v2 updater (firma minisign obligatoria, pull JSON estático) o Electron autoUpdater si el stack ya es Electron. **Arneses:** marketplace privado de Claude Code por cliente (repo git privado + `marketplace.json`; acceso = credencial del git host, revocar = cortar mantenimiento; pinning por commit SHA). **Licencias:** license files Ed25519 (`crypto/ed25519` stdlib, patrón keygen-go) offline-first; Keygen CE self-host solo a +10 clientes. **Telemetría:** OTLP + mTLS por tenant (OTel Collector en el cliente; routing por tenant). GitHub org privada = plano único."
      ],
      [
        "expone",
        "Repo TUF (`root/timestamp/snapshot/targets.json` + artefactos) por HTTPS · endpoint de licencias (validación offline; opcional online para revocación) · endpoint OTLP/mTLS de telemetría · JSON de updater de apps por canal."
      ],
      [
        "estado + persistencia",
        "Stateful ligero: artefactos firmados en object storage + CDN; claves de firma en HSM/KMS (root/targets offline); telemetría time-series retención corta; registro de licencias/entitlements. No guarda nada por-cliente salvo \"tenant X corre versión Y, licencia Z, salud W\"."
      ],
      [
        "escala + disponibilidad",
        "Trivial (object storage + CDN + un Collector). **Si cae: cero impacto en el cliente** — corre con su versión y reintenta; la telemetría se bufferea/descarta. El nodo más tolerante a fallos."
      ],
      [
        "integraciones_externas",
        "GitHub Actions (TUF-on-CI) · object storage/CDN · KMS/HSM · (opcional) Grafana."
      ],
      [
        "seguridad",
        "Integridad por TUF (firma M-of-N, anti-rollback, resiste repo comprometido) · licencias firmadas Ed25519 · telemetría mTLS por tenant + minimización en origen + scrubbing en el Collector + opt-in · el cliente solo abre conexiones **salientes**."
      ],
      [
        "nfr / cumplimiento_progresivo",
        "Firmas verificables; revocación de licencia por fin de contrato; consentimiento de telemetría por contrato; canal separado consultores/clientes."
      ],
      [
        "comunicacion",
        "Cliente → nodo (releases/licencias): **PULL HTTPS, lo inicia el cliente.** Cliente → nodo (telemetría): **push saliente OTLP/mTLS** (originado en el cliente). El Fabricante nunca disca al cliente."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: object storage/CDN + KMS + pipeline de build (N2/N15). consumido_por: N13 (binario Cockpit), N14/N17/N5 (apps + arneses), el cliente (mantenimiento opt-in)."
      ],
      [
        "riesgos_abiertos",
        "(1) Custodia/rotación de claves TUF (ceremonia = sobrecarga para equipo chico → ¿umbral 2-of-3? ¿firma manual por release?). (2) Bug conocido de marketplaces (autoUpdate no refresca `installed_plugins.json`, #52218) — verificar antes de depender de hooks en arneses. (3) Política de auto-update por canal. (4) Lista blanca exacta de métricas + consentimiento. (5) Licenciamiento propio (license files) vs Keygen CE — cuándo migrar."
      ],
      [
        "fuentes",
        "[go-tuf v2](https://github.com/theupdateframework/go-tuf) · [TUF-on-CI](https://github.com/theupdateframework/tuf-on-ci) · [Tauri v2 updater](https://v2.tauri.app/plugin/updater/) · [Claude Code marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) · [keygen-go](https://github.com/keygen-sh/keygen-go) · [OTel Collector + mTLS](https://opentelemetry.io/blog/2025/expose-otel-collector-gateway-api/) · `proyecto/research/rediseno-total/04-distribucion-licencias-telemetria.md`."
      ]
    ]
  },
  "N6": {
    "titulo": "Repositorio Oficial (confidencial, infra del cliente)",
    "plano": "Organización",
    "tipo": "artefacto/dato",
    "madurez": "no-construido",
    "marca": "★datos",
    "campos": [
      [
        "objetivo",
        "Ser la **única fuente de verdad** de la organización, confidencial y en su red: procesos, manuales, estructura organizacional as-code, arneses por rol, y (futuro) el know-how. Versionado, auditable, legible por humanos y agentes. Es lo que el consultor construye y publica, y lo que Cockpit lee para renderizar por nivel de acceso."
      ],
      [
        "resumen",
        "\"Git como base de archivos\" servido self-hosted en la máquina del cliente. Cuatro cuerpos: **Repositorio de Arneses** (los arneses por rol de la org) · **Metadata Organizada** (objeto normalizado: procesos/roles/puestos/objetivos/brechas as-code) · **Documentos Oficiales versionados** (manuales, procesos — fuente + PDF derivado) · **Knowledge Database** (know-how, futura — `pendiente`)."
      ],
      [
        "plano · tipo · madurez",
        "Organización · artefacto/dato · **no-construido** (el modelo git existe conceptualmente; falta el despliegue self-hosted confidencial y el poblado real)."
      ],
      [
        "responsabilidades",
        "Contener y versionar todo el conocimiento oficial de la org · dar historia/autoría/reversibilidad (base del control de información documentada ISO §7.5) · servir la estructura a Cockpit (lectura) y recibir las publicaciones del consultor (escritura) · alojar los arneses que cargan las apps del edge."
      ],
      [
        "no_objetivos",
        "NO es DB transaccional ni de queries agregadas en caliente (eso lo hace Cockpit/lakehouse) · NO es el landing del crudo (eso es N12) · NO guarda datos de operación de alta frecuencia (eso es N16) · NO sale de la red del cliente."
      ],
      [
        "formato",
        "Markdown (documentos, manuales, know-how) · YAML/JSON (objeto normalizado, arneses como skills) · PDF derivado (generado en el publish). Git nativo; PDFs pesados → LFS/releases."
      ],
      [
        "propietario + clasificacion",
        "**Cliente (la PyME).** ★datos del cliente, confidencial. El consultor/analista escribe, el cliente posee y controla acceso."
      ],
      [
        "residencia + retencion",
        "**Servidor/máquina del cliente**, con backups (`forgejo dump` + restic a disco externo/S3 del cliente). Retención indefinida vía historia git (es el valor: trazabilidad). El repo ES el archivo histórico."
      ],
      [
        "versionado",
        "Git (commits, branches, tags, blame, diff). El \"deploy de procesos\" = commit + tag firmado con fecha efectiva; la Gestión de Cambios (N13) usa branches (borrador) / main (vigente) / tags (copias controladas)."
      ],
      [
        "quién_escribe / quién_lee",
        "Escriben: Consultio (N14, publica el mapa **[R7]**), Arnesia (N15, siembra arneses), el Analista de Calidad (N19, publica cambios vía N13). Leen: Cockpit (N13, estructura + documentos), las apps del edge (cargan sus arneses), humanos."
      ],
      [
        "comunicacion",
        "No es servicio nuestro: protocolo git + servidor self-hosted (Forgejo). Cockpit lee vía deploy-token read-only (API o `go-git`); el publicador escribe con credencial least-privilege."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: git, servidor del cliente, backups. consumido_por: N13 (lee estructura/documentos), N14/N17/N5 (cargan arneses), N19 (gestiona cambios)."
      ],
      [
        "riesgos_abiertos",
        "(1) **BD vs archivos** (BL nuevo): git/archivos = SSoT, cualquier BD = índice derivado reconstruible (SQLite/bleve en Cockpit), nunca SSoT. (2) Motor de índice/búsqueda — hasta tener volumen. (3) Repos separados por nivel de confidencialidad — solo si un cliente lo exige. (4) Conexión concreta con un ERP como SSoT adicional (pendiente, se ve al tocar ese sistema)."
      ],
      [
        "fuentes",
        "[Forgejo](https://forgejo.org/) · [QMS en git — OpenRegulatory](https://openregulatory.com/articles/quality-management-system-qms-in-github-gitlab) · `proyecto/research/rediseno-total/01-repositorio-oficial.md`."
      ]
    ]
  },
  "N13": {
    "titulo": "Cockpit — Gestión de Cambios + Visualización",
    "plano": "Organización",
    "tipo": "servicio/exec-env",
    "madurez": "existe (parcial)",
    "marca": "—",
    "campos": [
      [
        "objetivo",
        "Ser el **tablero único** de la organización: cruzar la estructura organizacional (procesos/roles/objetivos, de N6) con la operación día a día (de N16) y servirla a cada usuario **según su nivel de acceso**; y darle al Analista de Calidad el módulo de **Gestión de Cambios** para mantener lo oficial siguiendo ISO. Corre en la red del cliente, cero npm/python/Docker."
      ],
      [
        "resumen",
        "Binario Go propio (`directorio`, hoy) con UI embebida. **Módulo Visualización:** Hilo de Oro · Brechas · Empresa→Sistema · objeto normalizado (9 entidades) + indicadores del lakehouse. **Módulo Gestión de Cambios:** solicitudes/aprobación/publicación de versiones (ISO §7.5/§6.3). Auth embebida + autorización derivada de la estructura del repo."
      ],
      [
        "plano · tipo · madurez",
        "Organización · servicio/exec-env · **existe (parcial)** — la Visualización base está construida y verificada standalone (Go build/vet/test + UI); faltan Gestión de Cambios, niveles de acceso reales y el cruce con el lakehouse."
      ],
      [
        "responsabilidades",
        "Servir la SPA embebida (`go:embed`) · API JSON (`/api/portfolio`, `/api/negocio`, `/api/objeto`) · leer/validar el objeto normalizado (9 entidades, CK-13) de N6 · **cruzar estructura × operación (N16) y servir por nivel de acceso [R11]** · **Gestión de Cambios** (solicitud/aprobación/publicación de versiones, firma persistida) sobre N6 [alimenta R13] · autenticar y autorizar por rol organizacional."
      ],
      [
        "no_objetivos",
        "NO es el SSoT de la estructura (lo lee de N6) · NO es el almacén de operación (lo consulta en N16) · NO razona server-side multi-tenant (murió N1) · NO edita git a mano en la UI (la Gestión de Cambios oculta git al analista)."
      ],
      [
        "stack",
        "`net/http` stdlib · `go:embed` + SPA (deuda Go/Next → Vite SPA, BL-20). **Auth:** embebida — argon2id (`x/crypto`) + `alexedwards/scs` (sesiones server-side, store SQLite); passkeys opcionales (`go-webauthn`); campo `provider` desde el día 1 para OIDC futuro. **Autorización:** middleware propio ~200 líneas, **policy-as-data** derivada de N6 (el rol organizacional ES la política; 4 niveles como enum ordenado Gobernanza>Estratégico>Táctico>Operativo). **Lakehouse:** DuckDB embebido (`github.com/duckdb/duckdb-go`), `ATTACH ... AS lake (TYPE ducklake)` en lectura. **Gestión de Cambios:** git de backend + UI que oculta git."
      ],
      [
        "expone",
        "HTTP/JSON: `/api/portfolio`, `/api/negocio`, `/api/objeto` · vistas por nivel · endpoints de Gestión de Cambios (solicitud/aprobación/publicación) · lectura de indicadores del lake."
      ],
      [
        "estado + persistencia",
        "Verdad de estructura/documentos: N6 (git). Operación: N16 (lakehouse). Estado propio de Cockpit: credenciales/sesiones + registro de firmas de aprobación (SQLite local) — las credenciales viven aquí, JAMÁS en el repo."
      ],
      [
        "escala + disponibilidad",
        "1 organización/despliegue, multi-usuario por niveles. Proceso único, launcher propio (`directorio -workspace … -port 4100`); crash → restart."
      ],
      [
        "integraciones_externas",
        "`git`/N6 (estructura, deploy-token read-only) · N16 (DuckDB embebido) · N3 (updates del binario)."
      ],
      [
        "seguridad",
        "Vive en la red del cliente. Auth embebida (sesiones OWASP vía scs; argon2id). Autorización por nivel derivada de N6, enlazada por ID estable (email/ID de puesto); credenciales en DB local, nunca en el repo. Gestión de Cambios: firma de aprobación autenticada + persistida en DB además de git (el audit trail no depende solo de la plataforma)."
      ],
      [
        "nfr / cumplimiento_progresivo",
        "Control de información documentada ISO §7.5 (versión vigente/obsoleta, aprobación previa a publicación, acuse, revisión periódica) vía Gestión de Cambios. TLS en LAN, audit trail de accesos."
      ],
      [
        "comunicacion",
        "Lee N6 (git, read-only) · lee N16 (DuckDB) · sirve HTTPS a los navegadores de N11 · jala updates de N3. Binario independiente, cero import de código de otros productos."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: N6 (estructura/documentos), N16 (operación), N3 (updates). consumido_por: **N11** (los 4 niveles, vía navegador), **N19** (Analista de Calidad, Gestión de Cambios), **N9/N14** (preview local del consultor)."
      ],
      [
        "riesgos_abiertos",
        "(1) Módulo Gestión de Cambios sin construir — **sube al MVP (CK-21/D8)**: es el gate dev→UAT→prod que hace viable la captura \"a prueba de tontos\" sin mapas basura. (2) Niveles de acceso reales (sube a alta); accesos derivados de la estructura/RRHH = la estructura PROPONE, un humano APRUEBA (human-in-the-loop, CK-21/D8). (3) Motor de indicadores sin construir (era \"cruce estructura × lakehouse\"; ascendido a componente por CK-21 — esquema semántico operación→KPI→OKR→objetivo). (4) Ciclo brecha→proyecto sin construir (CK-21/D2 — el diferenciador de loop cerrado). (5) Deuda Go/Next (BL-20). (6) Cómo Cockpit descubre el objeto normalizado en N6 (deploy-token a Forgejo — igual en modalidad hosteada o self-hosted)."
      ],
      [
        "fuentes",
        "`proyecto/research/rediseno-total/05-auth-rbac.md` · `06-gestion-cambios-iso.md` · `03-data-lakehouse.md` · Strangler Fig (vía CK-07)."
      ]
    ]
  },
  "N16": {
    "titulo": "Data Lakehouse",
    "plano": "Organización",
    "tipo": "servicio/dato",
    "madurez": "no-construido",
    "marca": "★datos",
    "campos": [
      [
        "objetivo",
        "Consolidar los datos de operación de todos los sistemas de la organización (N18) en un almacén analítico ligero que **nutre a Cockpit**: el cruce estructura × operación que convierte el mapa estático en un tablero vivo."
      ],
      [
        "resumen",
        "Lakehouse pequeño en la infra del cliente: pipelines de ingesta + almacén columnar + catálogo. Consumido por Cockpit (binario Go) que hace el join contra la estructura de N6."
      ],
      [
        "plano · tipo · madurez",
        "Organización · servicio/dato · **no-construido**."
      ],
      [
        "responsabilidades",
        "Ingerir la operación de N18 (APIs SaaS, ERP, DBs a medida, Excels) → almacén analítico **[R10]** · versionar/snapshot (time travel) · exponer al binario Go de Cockpit para el cruce con indicadores."
      ],
      [
        "no_objetivos",
        "NO es el SSoT de la estructura (eso es N6) · NO es transaccional (es analítico) · NO requiere data engineers/K8s · NO sale de la red del cliente (salvo modalidad hosteada por nosotros, opción de pago)."
      ],
      [
        "stack",
        "**Ingesta:** dlt (Python puro, sin servidor; SaaS vía verified sources/REST, ERP y DBs vía `sql_database`+ConnectorX). **Almacén:** DuckLake (Parquet en disco local o S3/MinIO del cliente) + **catálogo Postgres** (escritor-pipeline y lector-Cockpit concurrentes; snapshots) — un solo host sin Postgres arranca con catálogo SQLite y migra con un `ATTACH`. **Excel** de primera clase (dlt `filesystem`+`read_excel` o `read_xlsx` de DuckDB, con hash/fecha para auditabilidad). **Exposición a Go:** DuckDB embebido (`duckdb-go`), lectura vía `ATTACH ... (TYPE ducklake)`. **Orquestación:** systemd timers + healthcheck. Iceberg/Delta/Spark/ClickHouse/Airbyte/Dagster = sobreingeniería a esta escala."
      ],
      [
        "expone",
        "El lake por DuckLake al binario Cockpit (embebido, cero servicio intermedio). Sin puerto nuevo por default."
      ],
      [
        "estado + persistencia",
        "Parquet + catálogo (SQLite→Postgres) en la infra del cliente. Retención según política; snapshots/time travel para \"cómo íbamos\"."
      ],
      [
        "escala + disponibilidad",
        "50 GB–2 TB analíticos típicos. Batch horario/diario cubre \"cómo vamos día a día\"; sin streaming. Si cae la ingesta, Cockpit muestra el último snapshot."
      ],
      [
        "integraciones_externas",
        "N18 (fuentes) · (modalidad hosteada) MotherDuck si el cliente paga hosting nuestro."
      ],
      [
        "seguridad",
        "Datos de operación del cliente ★. En su infra por default; cifrado at-rest; acceso read-only del binario Cockpit. Modalidad hosteada por nosotros = DPA + zero-retention como cualquier tránsito."
      ],
      [
        "nfr / cumplimiento_progresivo",
        "Auditabilidad de cargas (hash/fecha por archivo/pipeline); linaje básico; time travel."
      ],
      [
        "comunicacion",
        "dlt jala de N18 (según sistema: API/DB/FS) → escribe DuckLake · Cockpit lee embebido. Todo dentro del data plane del cliente."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: N18 (fuentes), almacenamiento del cliente. consumido_por: **N13** (Cockpit hace el cruce y sirve indicadores)."
      ],
      [
        "riesgos_abiertos",
        "(1) **Default invertido por CK-21/D3**: hosteado por nosotros (single-tenant, dentro de la instancia del cliente en nuestra nube) = default comercial; infra del cliente = tier enterprise/regulados. La arquitectura es idéntica en ambas modalidades. (2) Catálogo SQLite vs Postgres según despliegue. (3) Esquema semántico de indicadores → **ascendido a componente \"motor de indicadores\" de N13 (CK-21)**; aquí queda el contrato de exposición del lake. (4) Conectores concretos por sistema (se diseñan con el cliente real; MVP = Excel + 1 conector)."
      ],
      [
        "fuentes",
        "[DuckLake 1.0](https://ducklake.select/2026/04/13/ducklake-10/) · [dlt](https://dlthub.com/) · [duckdb-go](https://github.com/duckdb/duckdb-go) · `proyecto/research/rediseno-total/03-data-lakehouse.md`."
      ]
    ]
  },
  "N12": {
    "titulo": "Depósito de fuentes (landing zone)",
    "plano": "Organización",
    "tipo": "artefacto/dato",
    "madurez": "no-construido",
    "marca": "★datos",
    "campos": [
      [
        "objetivo",
        "Ser el área donde **aterriza el crudo de entrada** del levantamiento (manuales, MOF, organigramas, inventarios, exports, dumps de USB/correo) para que el consultor lo procese con Consultio. Separado de la verdad curada (N6) porque el crudo es **transitorio, voluminoso y el de mayor riesgo de retención** — aislarlo permite **destruirlo** apenas el mapa está hecho. **[R3]**"
      ],
      [
        "resumen",
        "Zona de aterrizaje del crudo en la máquina del cliente (o del consultor como fallback): N9 deposita, Consultio lo procesa, se retiene poco y se destruye."
      ],
      [
        "plano · tipo · madurez",
        "Organización · artefacto/dato · **no-construido**."
      ],
      [
        "responsabilidades",
        "Recibir lo que deposita N9 **[R2]** · servir el crudo a Consultio (N14) para procesar · **aplicar retención/destrucción** (borrar tras generar el mapa) · registrar quién depositó qué (audit) **[R3]**."
      ],
      [
        "no_objetivos",
        "NO es el SSoT (eso es N6) · NO guarda la verdad curada · NO sale del entorno del cliente · NO es de larga vida (el crudo se destruye; lo derivado vive en N6)."
      ],
      [
        "formato",
        "Carpeta/object store (PDF, Word, Excel, imágenes, exports) — **NO git** (binarios/voluminoso diffean mal)."
      ],
      [
        "propietario + clasificacion",
        "Cliente. ★datos — **el material más sensible** (crudo sin curar). Confidencial."
      ],
      [
        "residencia + retencion",
        "Máquina/servidor del cliente. Retención **corta** + **destrucción post-procesamiento** (la cláusula de no-retención del DPA se materializa aquí). PyME sin servidor: laptop gestionada del consultor bajo contrato = fallback degradado."
      ],
      [
        "versionado",
        "Ninguno (staging transitorio; el histórico vive en N6)."
      ],
      [
        "quién_escribe / quién_lee",
        "Escribe: N9 (deposita). Lee: Consultio (N14, procesa). Nadie más."
      ],
      [
        "comunicacion",
        "No es servicio: filesystem/object store. N9 escribe, N14 lee."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: almacenamiento del entorno. consumido_por: **N14** (Consultio lo procesa)."
      ],
      [
        "riesgos_abiertos",
        "(1) Política de retención exacta (¿destruir tras el mapa o tras ratificar el AS-IS?). (2) Cifrado at-rest (AES-256 por default). (3) ¿Object store vs carpeta simple? según infra."
      ],
      [
        "fuentes",
        "[GDPR DPA Art. 28 — destrucción](https://gdpr.eu/data-processing-agreement/)."
      ]
    ]
  },
  "N18": {
    "titulo": "Sistemas operacionales de la organización",
    "plano": "Organización",
    "tipo": "sistemas fuente",
    "madurez": "existe",
    "marca": "★datos",
    "campos": [
      [
        "objetivo",
        "Representar los sistemas que la organización ya opera y que generan la data del día a día: son las **fuentes** del Data Lakehouse (N16) y, en el caso del sistema a medida, el **destino** del desarrollo (N5/N10)."
      ],
      [
        "resumen",
        "Tres arquetipos + archivos: SaaS externo (Sistema C), ERP enlatado (Sistema A), sistema a medida (Sistema B), y Excels que suben los usuarios operativos. Un ERP futuro entra como SSoT operacional adicional."
      ],
      [
        "plano · tipo · madurez",
        "Organización · sistemas fuente · **existe** (son del cliente; su integración con el lake es lo no-construido)."
      ],
      [
        "responsabilidades",
        "Ser las fuentes de verdad de la operación · exponer sus datos (API/DB/export/Excel) para que N16 los ingiera **[R10]** · (sistema a medida) recibir las capabilities que construyen los devs."
      ],
      [
        "no_objetivos",
        "NO los construimos nosotros (salvo el a medida, vía DevStudio) · NO son SSoT de la estructura organizacional (eso es N6) · NO se modifican para el lake (ingesta read-only)."
      ],
      [
        "formato",
        "Heterogéneo: APIs REST (SaaS), DB relacional (ERP/a medida), archivos (Excel)."
      ],
      [
        "propietario + clasificacion",
        "Cliente. ★datos de operación, confidenciales."
      ],
      [
        "residencia + retencion",
        "Infra del cliente (o SaaS de terceros que el cliente ya contrató). Retención según cada sistema."
      ],
      [
        "versionado",
        "El de cada sistema; el lake les da snapshot/time travel al ingerir."
      ],
      [
        "quién_escribe / quién_lee",
        "Escriben: los usuarios operativos (su día a día, algunos vía Colab Studio/N17). Lee (para el lake): N16 (ingesta read-only)."
      ],
      [
        "comunicacion",
        "N16 jala de cada sistema según su interfaz (API/DB/FS). El sistema a medida además recibe deploys de N5/N10."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: la operación del cliente. consumido_por: **N16** (lakehouse), **N5/N10** (el a medida, como destino de desarrollo)."
      ],
      [
        "riesgos_abiertos",
        "(1) Conectores concretos por sistema (se diseñan con el cliente). (2) El ERP como SSoT adicional — cómo se concilia con N6 (pendiente, al tocar ese sistema). (3) Calidad/gobernanza de los Excels manuales."
      ],
      [
        "fuentes",
        "Diagrama del operador (`mapaCockpitTotal`) · `proyecto/research/rediseno-total/03-data-lakehouse.md`."
      ]
    ]
  },
  "N14": {
    "titulo": "Consultio — App del Consultor",
    "plano": "Edge (máquina del consultor)",
    "tipo": "runtime edge / exec-env",
    "madurez": "no-construido",
    "marca": "★IP",
    "campos": [
      [
        "objetivo",
        "Darle al Consultor (N9) su herramienta de trabajo: app **instalable** que se cuelga de su Claude Code (N8) y desde la cual hace **todo el levantamiento y construye el mapa completo** de la organización (procesos/roles/objetivos/personas + manuales, bajo estándar) — como un dev construye software — y lo **publica al Repositorio Oficial** (N6): \"deploy de procesos\". Es la superficie única del consultor."
      ],
      [
        "resumen",
        "Clon de DevStudio (N5) con nombre propio (Consultio), cargando los arneses del método (m1·m2·m3) que produce Arnesia (N15). Opera el engagement con carriles/provenance, construye el objeto normalizado + documentos oficiales + arneses de la org, lleva **preview local de Cockpit** (ve cómo lo verá la organización antes de publicar, patrón dev-server), y publica a N6 vía git. Transferible: inicia con el consultor Prenter, luego lo hereda el Analista de Calidad del cliente (N19)."
      ],
      [
        "plano · tipo · madurez",
        "Edge (máquina del consultor) · runtime edge / exec-env (app instalable) · **no-construido** (se clona de DevStudio cuando esté terminado; nombre y adaptación propios — BL-15)."
      ],
      [
        "responsabilidades",
        "Capturar el AS-IS operando el método **[R4]** · construir el mapa completo — objeto normalizado + documentos oficiales + arneses por rol **[R5]** · calcular la brecha + los proyectos **[R6]** · **publicar el resultado ratificado a N6 — \"deploy de procesos\" [R7]** · llevar preview local de Cockpit (N13) para revisar antes de publicar · depositar/procesar crudo (N12)."
      ],
      [
        "no_objetivos",
        "NO fabrica los arneses (eso es Arnesia/N15; Consultio los usa) · NO es multi-usuario/SaaS (una instalación por persona, como N8) · NO renderiza la Vista de la organización en producción (eso es N13; Consultio corre una **instancia local de preview** del mismo renderer) · NO retiene crudo (aterriza en N12)."
      ],
      [
        "runtime + licencia",
        "App local instalable (linaje DevStudio/harness-studio). **Se cuelga de N8** — el Claude Code del propio consultor (driver CLI-nativo, stdin/stdout stream-json), **BYO licencia**: la app jamás toca credenciales de Anthropic. Trabajo desatendido, si existiera, iría por API key — no por la app. Stack por decidir (BL-15, hereda del clon DevStudio)."
      ],
      [
        "qué_construye / contra_qué",
        "Construye/edita el objeto normalizado (`empresa/<tipo>/`, D-15) + documentos oficiales + arneses de la org; contra N6 (Repositorio Oficial), vía git."
      ],
      [
        "local_vs_remoto",
        "Local: la app, los arneses del método, el trabajo del engagement, el preview de Cockpit. Remoto: N6 (push del resultado) · N3 (updates de la app y de los arneses del método)."
      ],
      [
        "seguridad",
        "El método viaja como arneses en la app (persona nuestra) y **se entrega al cliente** con la transferencia — la protección pasa a licencia + contrato (deroga el límite \"método nunca al cliente\", ver chequeo 1). Credenciales git least-privilege contra N6. Crudo fuera de la app (N12). Actualización firmada (N3, TUF/Tauri)."
      ],
      [
        "comunicacion",
        "Consultio → **N8** (stdin/stdout, stream-json — el motor) · → **N6** (git, \"deploy de procesos\") · → **N12** (depósito de crudo) · ← **N3** (updates de app + arneses)."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: **N8** (motor), **N15** (arneses del método), N6 (destino), N3 (updates). consumido_por: **N9** (consultor Prenter) y luego **N19** (Analista de Calidad del cliente) · aguas abajo **N13** (renderiza lo publicado)."
      ],
      [
        "riesgos_abiertos",
        "(1) Definición del producto-app = clon de DevStudio + adaptación propia — **ya NO bloquea (CK-21/D7): el v0 son los arneses sin shell**; el clon llega después. (2) Modelo de publicación a N6: **resuelto en lo esencial (CK-21/D5)** — dev→UAT→prod con aprobación (Gestión de Cambios); detalle fino al construir. (3) Cuánto método baja empaquetado en los arneses de la app vs se sirve por N3. (4) Transferencia consultor→analista: qué arneses/permisos cambian al entregar."
      ],
      [
        "fuentes",
        "Nombre y modelo: operador (CK-18) · linaje DevStudio (`~/Proyectos/dev-studio`, DH-NN) · `proyecto/research/rediseno-total/07-proceso-como-arnes.md`."
      ]
    ]
  },
  "N17": {
    "titulo": "Colab Studio — app del trabajador",
    "plano": "Edge (máquina del trabajador)",
    "tipo": "runtime edge / exec-env",
    "madurez": "no-construido",
    "marca": "—",
    "campos": [
      [
        "objetivo",
        "Darle a cada trabajador operativo de la organización su app instalable que se cuelga de su Claude Code y carga **los arneses específicos de su puesto** (cada puesto ejecuta N roles), para que su agente ya sepa operar sus procesos — el mapa oficial vuelto trabajo diario ejecutable."
      ],
      [
        "resumen",
        "Variante de DevStudio para el trabajador no-dev (contadores, analistas, usuarios). Carga los arneses por rol del Repositorio de Arneses (parte de N6, producidos por Arnesia). Su trabajo queda enfocado por esos arneses; produce salidas (p.ej. Excels) que nutren el lakehouse (N16)."
      ],
      [
        "plano · tipo · madurez",
        "Edge (máquina del trabajador) · runtime edge / exec-env (app instalable) · **no-construido**."
      ],
      [
        "responsabilidades",
        "Operar el día a día del puesto con sus arneses **[R12]** · cargar los arneses de rol correctos (del Repositorio de Arneses) · producir las salidas del puesto → algunas alimentan N16 (Excels/registros)."
      ],
      [
        "no_objetivos",
        "NO fabrica arneses (los usa; Arnesia/N15) · NO es multi-usuario (una instalación por trabajador) · NO toca credenciales de Anthropic (BYO licencia como N8) · NO construye software a medida (eso es DevStudio/N5)."
      ],
      [
        "runtime + licencia",
        "App local instalable; **se cuelga de N8** (Claude Code del trabajador, BYO licencia; driver CLI-nativo). Igual doctrina ToS que N5/N14: una instancia por humano."
      ],
      [
        "qué_construye / contra_qué",
        "Ejecuta los procesos del puesto; produce las salidas del trabajo (documentos, registros, Excels) contra los sistemas de la org (N18) y/o el lake (N16)."
      ],
      [
        "local_vs_remoto",
        "Local: la app, los arneses del puesto, el trabajo. Remoto: N6 (de donde jala sus arneses) · N3 (updates) · N18/N16 (donde deja/toma datos de operación)."
      ],
      [
        "seguridad",
        "Arneses del puesto = el método operacional entregado al cliente (licencia + contrato). BYO licencia. Least-privilege contra los sistemas que su puesto toca."
      ],
      [
        "comunicacion",
        "Colab Studio → **N8** (stream-json, motor) · ← **N6** (jala arneses del puesto) · ↔ **N18/N16** (datos de operación) · ← **N3** (updates)."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: **N8** (motor), **N6** (arneses del puesto), N3 (updates). consumido_por: **N11** (los usuarios operativos son su operador) · aguas abajo **N16** (recibe sus salidas)."
      ],
      [
        "riesgos_abiertos",
        "(1) Definición de producto (¿clon de DevStudio como Consultio, o variante propia?). (2) Cómo se mapea puesto → N roles → N arneses (contra el objeto normalizado). (3) Gobernanza de las salidas que alimentan el lake (calidad del Excel). (4) Frontera con N13 (Colab opera; Cockpit muestra)."
      ],
      [
        "fuentes",
        "Operador (CK-18) · `proyecto/research/rediseno-total/07-proceso-como-arnes.md`."
      ]
    ]
  },
  "N5": {
    "titulo": "DevStudio — app de desarrollo (P2)",
    "plano": "Edge (máquina del developer)",
    "tipo": "runtime edge / exec-env",
    "madurez": "existe (parcial)",
    "marca": "—",
    "campos": [
      [
        "objetivo",
        "Darle a cada developer su consola **instalable** para construir y mantener software (proceso/arquitectura/doc as-code) sobre Claude Code. En el modelo CK-18 se entrega también a los **devs del cliente** para implementar capabilities en su sistema a medida (N18/Sistema B)."
      ],
      [
        "resumen",
        "App de escritorio (binario Go + UI embebida). Cada dev ve sus repos y sus historias; la versión Product Manager concentra refinamiento/priorización. Es el linaje del que se **clona Consultio** (N14). Sus arneses de dev se modifican en Arnesia (N15)."
      ],
      [
        "plano · tipo · madurez",
        "Edge (máquina del developer) · runtime edge / exec-env · **existe (parcial)** — esqueleto + dogfooding (DH-13..DH-17)."
      ],
      [
        "responsabilidades",
        "Operar el ciclo de desarrollo como proceso-as-code **[R14 junto a N8/N10]** · gestionar el runtime de delivery (N8): se cuelga sobre Claude Code (driver CLI-nativo, BYO licencia) · leer/escribir el sistema a medida del cliente (N18) · (PM) refinamiento + priorización."
      ],
      [
        "no_objetivos",
        "NO es server compartido · NO toca credenciales de Anthropic (BYO licencia) · NO lo gobierna este repo (célula P2, DH-NN) · NO opera el método del engagement (eso es Consultio/N14, aunque comparten linaje)."
      ],
      [
        "runtime + licencia",
        "App instalable; se cuelga de N8 bajo la licencia del propio dev (DH-10). Misma doctrina ToS: una suscripción, un humano."
      ],
      [
        "qué_construye / contra_qué",
        "Historias → tests → producción, contra el sistema a medida del cliente (N18/Sistema B) y su repositorio de código."
      ],
      [
        "local_vs_remoto",
        "Local: la app, Claude Code, git. Remoto: el repositorio de código del cliente · N3 (updates) · N18 (destino del deploy)."
      ],
      [
        "seguridad",
        "Credenciales del dev, least-privilege contra los sistemas del cliente. Delivery automatizado server-side (si se quisiera) = API key, no suscripción."
      ],
      [
        "comunicacion",
        "DevStudio → **N8** (stream-json) · ↔ repositorio de código + N18 (git/deploy) · ← N3 (updates, si P2 usa este canal)."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: N8, el repositorio de código del cliente. consumido_por: **N10** (developer del cliente) y los roles del ciclo · aguas abajo N18 (Sistema B recibe capabilities)."
      ],
      [
        "riesgos_abiertos",
        "(1) Entrega a devs del cliente: licenciamiento y arneses de dev (Arnesia). (2) Cómo se clona Consultio de esta base. (3) Distribución/updates de escritorio (N3/Tauri — lo decide P2). (4) Modelo multi-usuario/sync de P2."
      ],
      [
        "fuentes",
        "`~/Proyectos/dev-studio` (DH-10/DH-12..DH-17) · operador (CK-18)."
      ]
    ]
  },
  "N8": {
    "titulo": "Runtime de agente local (Claude Code)",
    "plano": "Edge (laptop)",
    "tipo": "runtime edge",
    "madurez": "existe",
    "marca": "—",
    "campos": [
      [
        "objetivo",
        "Ejecutar el trabajo de agente **en la máquina del humano firmado**, con SU suscripción **[R15]**: motor debajo de las tres apps del edge. Es la mitad \"local\" del runtime; cualquier compute desatendido/server-side iría por API key (no hay nodo server-side en el modelo CK-18 — murió N7)."
      ],
      [
        "resumen",
        "Cada humano firmado (consultor, trabajador, dev) corre Claude Code (Pro/Max) en su laptop. Local-por-humano **por restricción de licencia**. Nadie opera el CLI a pelo: la app de su rol se cuelga sobre N8 (driver CLI-nativo, stream-json) — N14/N17/N5 gestionan su instancia. N8 = el motor debajo."
      ],
      [
        "plano · tipo · madurez",
        "Edge (laptop) · runtime edge (interactivo humano-en-el-loop, headless `claude -p` opcional) · **existe** (producto maduro first-party)."
      ],
      [
        "responsabilidades",
        "Ejecutar las sesiones que cada app parametrice **[R15]**: Consultio (método del engagement), Colab Studio (procesos del puesto), DevStudio (delivery). El dueño del QUÉ es la app; N8 presta el motor."
      ],
      [
        "no_objetivos",
        "NO se ejecuta server-side como servicio compartido · NO se multiplexa una suscripción entre humanos · NO es dueño del método (N14/N15) ni del proceso de desarrollo (N5) — es motor, no superficie."
      ],
      [
        "runtime + licencia (restricción ToS — sección crítica)",
        "**NO se puede multiplexar la suscripción de Claude Code server-side. Cada humano usa su propia suscripción. Sí se permite headless (`claude -p`) bajo la cuenta del propio humano.** (Consumer Terms §3.7: automatización solo vía API key o donde se permita; el CLI en la máquina del usuario es esa excepción. Feb-2026: OAuth de Free/Pro/Max no permitido en otros productos/Agent SDK. Jun-2026: créditos \"Agent SDK\" por suscriptor, atados a un humano firmado, no habilitan pooling server-side.) **Conclusión:** todo el edge = por-humano-en-su-laptop; cualquier compute server-side usaría API key. Tratar el licenciamiento como configurable (Anthropic cambió 3× en H1-2026)."
      ],
      [
        "qué_construye / contra_qué",
        "Lo que cada app le parametrice; el resultado lo publica la app (Consultio→N6, DevStudio→código, Colab Studio→salidas), no N8."
      ],
      [
        "local_vs_remoto",
        "Local: runtime (ejecución de tools, git) en la laptop. Remoto: inferencia vía suscripción. El método/proceso se inyecta como arneses; la ejecución es humano-gobernada."
      ],
      [
        "seguridad",
        "Credenciales de suscripción del humano, en su laptop, vía CLI oficial — NO se extraen ni centralizan. Acceso a N6/sistemas con credenciales propias least-privilege."
      ],
      [
        "comunicacion",
        "Laptop ↔ Anthropic (suscripción, inferencia) · laptop ↔ N6/sistemas (git/API) · app gestora → N8 (stdin/stdout, stream-json)."
      ],
      [
        "depende_de / consumido_por",
        "depende_de: suscripción del humano, los sistemas que la app toca. consumido_por: **N14 (Consultio)** · **N17 (Colab Studio)** · **N5 (DevStudio)** — cada una gestiona una instancia."
      ],
      [
        "riesgos_abiertos",
        "(1) Tentación de multiplexar (violación + baneo; server-side=API key). (2) Deriva de términos → licenciamiento configurable, revisar por release. (3) \"Ordinary individual usage\" → modelar costo por humano. (4) \"Transitan, no persisten\": el dato del cliente que el agente procesa **transita** a Anthropic durante la inferencia (zero-retention), aun sin nodo server-side — ver chequeo del hallazgo."
      ],
      [
        "fuentes",
        "[The Register — ban on third-party access (feb 2026)](https://www.theregister.com/software/2026/02/20/anthropic-clarifies-ban-on-third-party-tool-access-to-claude/5014546) · [VentureBeat — reinstates with a catch (jun 2026)](https://venturebeat.com/technology/anthropic-reinstates-openclaw-and-third-party-agent-usage-on-claude-subscriptions-with-a-catch)."
      ]
    ]
  },
  "N9": {
    "titulo": "Consultor (transferible → Analista de Calidad)",
    "plano": "Edge",
    "tipo": "actor",
    "madurez": "existe",
    "marca": "—",
    "campos": [
      [
        "objetivo_del_actor",
        "Conducir el levantamiento y construir el sistema de la organización (mapa + documentos + arneses) desde Consultio, y publicarlo al Repositorio Oficial. Lleva el método al cliente. Rol **transferible**: inicia siendo persona de Prenter, luego lo hereda un Analista de Calidad del cliente (N19)."
      ],
      [
        "resumen",
        "El experto (Prenter) que opera Consultio (N14) sobre su Claude Code (N8). Al cerrar el engagement, transfiere la operación al cliente."
      ],
      [
        "plano · tipo · madurez",
        "Edge (su máquina) · actor · existe."
      ],
      [
        "responsabilidades / no_objetivos",
        "Recolecta y cura las fuentes crudas → deposita en **N12 [R2]** · opera Consultio para capturar el AS-IS **[R4]**, construir el mapa **[R5]** y calcular la brecha **[R6]** · ratifica y **publica a N6 [R7]** · conduce entrevistas · aporta contexto político/estratégico. **NO fabrica arneses** (Arnesia) · **NO posee los datos** (del cliente)."
      ],
      [
        "permisos / RACI",
        "Máxima autoridad del **método** (A/R en levantamiento/construcción). **Su herramienta propia es N14 (Consultio)** con **N8** debajo. Al transferir, cede la operación de mantenimiento al Analista de Calidad (N19)."
      ],
      [
        "interfaces_que_usa",
        "**N14 (Consultio)** con **N8** debajo, **N12** (deposita crudo), **N6** (publica), **N13** (preview de Cockpit)."
      ],
      [
        "momentos",
        "Etapa 1 (levantamiento) + Etapa 2 (construcción/publicación). En Etapa 3 el rol pasa a N19."
      ],
      [
        "comunicacion",
        "git a N6 · stream-json a N8 · HTTPS a N3 (updates)."
      ],
      [
        "riesgos_abiertos",
        "Dependencia del consultor experto = límite de escala; se mitiga con el método como arnés (N15/N2) — cuánto se logra es pregunta abierta del modelo de negocio. La transferencia al analista es el mecanismo de salida."
      ]
    ]
  },
  "N19": {
    "titulo": "Analista de Calidad (del cliente)",
    "plano": "Edge",
    "tipo": "actor",
    "madurez": "no-construido",
    "marca": "—",
    "campos": [
      [
        "objetivo_del_actor",
        "Mantener el sistema oficial de la organización tras el engagement: recibir solicitudes de cambio, revisarlas/aprobarlas y publicar nuevas versiones, siguiendo buenas prácticas ISO (información documentada §7.5, gestión del cambio §6.3). Es el dueño del cambio del lado del cliente."
      ],
      [
        "resumen",
        "Rol del cliente que hereda la operación de Consultio (N14) y usa el módulo **Gestión de Cambios** de Cockpit (N13) para gobernar los cambios sobre el Repositorio Oficial (N6). El repo solo tiene lo oficial, versionado; el analista es quien lo evoluciona."
      ],
      [
        "plano · tipo · madurez",
        "Edge · actor · **no-construido** (rol futuro, aparece al cerrar el primer engagement)."
      ],
      [
        "responsabilidades / no_objetivos",
        "Gestionar el cambio del sistema (ISO): solicitar/revisar/aprobar/publicar versiones **[R13]** · mantener los arneses de la org (con Arnesia entregada) · **NO** hace el levantamiento inicial (eso fue el consultor) · **NO** ve git a pelo (la Gestión de Cambios lo oculta)."
      ],
      [
        "permisos / RACI",
        "A/R en la Gestión de Cambios del cliente. Autoridad para aprobar y publicar versiones oficiales. Credenciales de publicación contra N6."
      ],
      [
        "interfaces_que_usa",
        "**N13 (Cockpit — módulo Gestión de Cambios)**, **N14 (Consultio, heredada)** con **N8** debajo, **N6** (publica), **N15/Arnesia** (mantiene arneses)."
      ],
      [
        "momentos",
        "Etapa 3 (operación y mejora continua), tras la transferencia desde N9."
      ],
      [
        "comunicacion",
        "Vía Cockpit (Gestión de Cambios) → N6 (publica versiones) · Consultio → N8 (motor) · git a N6."
      ],
      [
        "riesgos_abiertos",
        "(1) Perfil real del analista (técnico/no-técnico) → la UI debe ocultar git del todo. (2) Modelo de firma electrónica que satisfaga a un auditor ISO (clic autenticado = aprobación si el procedimiento lo define). (3) Qué permisos/arneses cambian en la transferencia desde N9."
      ],
      [
        "fuentes",
        "Operador (CK-18) · `proyecto/research/rediseno-total/06-gestion-cambios-iso.md`."
      ]
    ]
  },
  "N10": {
    "titulo": "Developer (del cliente)",
    "plano": "Edge",
    "tipo": "actor",
    "madurez": "existe",
    "marca": "—",
    "campos": [
      [
        "objetivo_del_actor",
        "Construir el software a medida de la organización (Sistema B) contra sus sistemas, gobernando a Claude Code (N8) desde DevStudio (N5). Del cliente, si lo tiene."
      ],
      [
        "resumen",
        "El humano que implementa capabilities en el sistema a medida, con N8 como copiloto y N5 como consola."
      ],
      [
        "plano · tipo · madurez",
        "Edge (laptop) · actor · existe."
      ],
      [
        "responsabilidades / no_objetivos",
        "Implementa, testea, lleva a prod contra el sistema a medida (N18) **[R14]**. NO diseña el mapa de procesos (eso es el consultor/N9) · NO decide prioridades de negocio (los niveles de la org, N11)."
      ],
      [
        "permisos / RACI",
        "R en desarrollo. Credenciales least-privilege contra el código y los entornos del cliente. Su propia suscripción Claude Code (N8, ToS)."
      ],
      [
        "interfaces_que_usa",
        "N5 (DevStudio), N8 (Claude Code), el repositorio de código + N18 (Sistema B)."
      ],
      [
        "momentos",
        "Etapa 3 (desarrollo continuo de capabilities)."
      ],
      [
        "comunicacion",
        "git/HTTPS a los sistemas del cliente; suscripción a Anthropic."
      ],
      [
        "riesgos_abiertos",
        "¿El cliente tiene devs? Si no, el desarrollo a medida lo hace Prenter (modelo de entrega). Los arneses de dev se modifican en Arnesia (N15)."
      ]
    ]
  },
  "N11": {
    "titulo": "Usuarios de la organización (4 niveles)",
    "plano": "Edge (thin)",
    "tipo": "actor",
    "madurez": "existe",
    "marca": "—",
    "campos": [
      [
        "objetivo_del_actor",
        "Ver la organización viva (mapa, OKRs, brechas, indicadores del día a día) **según su nivel de acceso**, y mover sus KPIs. Cuatro niveles: **Gobernanza** (directorio), **Estratégico** (C-level/gerencias), **Táctico** (jefaturas), **Operativo** (analistas/usuarios)."
      ],
      [
        "resumen",
        "Toda la organización es usuaria de Cockpit vía navegador; cada nivel ve lo que su rol permite, en coherencia con la estructura del Repositorio Oficial. Los operativos, además, operan su día a día con Colab Studio (N17)."
      ],
      [
        "plano · tipo · madurez",
        "Edge (thin browser; operativos también con app) · actor · existe."
      ],
      [
        "responsabilidades / no_objetivos",
        "Gobernanza da contexto/objetivos **[R1]** y ratifica prioridades; todos consumen su vista por nivel. Operativo, además, ejecuta procesos con sus arneses (vía N17). NO operan el método de levantamiento (eso es el consultor) · NO ven lo que su nivel no permite."
      ],
      [
        "permisos / RACI",
        "Gobernanza = máxima autoridad del negocio (A en objetivos/prioridades). Los niveles descienden: Estratégico > Táctico > Operativo, con visibilidad fina por rol derivada de N6."
      ],
      [
        "interfaces_que_usa",
        "**N13** (Cockpit, vista por nivel, navegador) · **N17** (Colab Studio, solo operativos)."
      ],
      [
        "momentos",
        "Etapa 1 (Gobernanza da objetivos) · Etapa 3 (todos, cockpit vivo, continuo)."
      ],
      [
        "comunicacion",
        "HTTPS (navegador) a N13 · (operativos) app sobre N8."
      ],
      [
        "riesgos_abiertos",
        "(1) Modelo de niveles de acceso real (autorización en N13, ex-BL-12). (2) Onboarding de usuarios/credenciales por nivel. (3) Coherencia del mapa nivel-organizacional ↔ nivel-de-acceso (policy-as-data derivada de N6)."
      ]
    ]
  }
};
