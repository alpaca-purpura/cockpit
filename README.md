# Cockpit — El Twin de Ejecución Estratégica

> **Organization as Code ────> Organization Twin**
>
> Sistema para el levantamiento, diseño, creación, propagación/adopción, monitoreo y mejora continua de los cuatro pilares que sostienen a cualquier empresa: **Procesos**, **Roles**, **Objetivos** y **Personas/Puestos**. Basado en buenas prácticas ISO como ontología y disciplina operativa (sin el aparato de certificación).

---

## 👁️ Visión del Producto: ¿Por qué existe Cockpit?

Mapear una organización no debería ser un entregable estático de consultoría de diseño de procesos que se archiva en un PDF. Cockpit existe para resolver la desconexión entre la estrategia del directorio y la ejecución operativa diaria.

Nuestra tesis fundante es **Organization as Code** (GitOps Organizacional): toda la estructura, reglas y know-how de la empresa viven como **datos versionados en Git** (Repositorio Oficial) y evolucionan de forma continua hacia un **Organization Twin** (Digital Twin of an Organization o DTO, según Gartner).

El twin se calcula bajo la fórmula:
$$\text{Twin} = \text{Estado Deseado (TO-BE)} \times \text{Estado Real (AS-IS)} \times \text{Brecha Continua}$$

### El Diferenciador: El Hilo de Oro Medido
*   **Alineación Vertical Completa:** Conectamos de forma bidireccional los objetivos del directorio, OKRs de gerencia, KPIs cruzados por proceso, y el último clic del analista operativo.
*   **El Loop Cerrado (PDCA):** Detectar una brecha (drift organizacional o KPI fuera de rango) genera de forma automática propuestas de proyectos de mejora con su respectivo ROI estimado. El proyecto vive su ciclo completo, se implementa mediante arneses por puesto o desarrollo de software, y se mide si movió el KPI estratégico en Cockpit.
*   **Supervisión, no Ayuda:** En la fase madura del twin, las personas supervisan a los agentes (no al revés). El colaborador no ejecuta manualmente el trabajo repetitivo, sino que dirige la intención, aprueba excepciones, mide la eficiencia y propone mejoras a su arnés. La supervisión se especifica y se mide de forma determinista para evitar "zonas de deformación moral".

---

## 🏗️ Arquitectura de la Suite: Los Repositorios Hermanos

Cockpit no actúa solo; es la cabina de control y visualización de un ecosistema más amplio. El trabajo se compila por rol y proceso (el twin), se ensambla en puestos y se instala en la máquina de cada persona mediante aplicaciones de escritorio conectadas a través de un kernel de comunicación compartida (`studio-core`).

El ecosistema está dividido en los siguientes **repositorios "hermanos"** que complementan la suite completa de desarrollo, consultoría y operación:

```
                          ┌────────────────────────┐
                          │    Arnesia (P4)        │ <─── Fábrica de Arneses
                          └────────────────────────┘
                                      │ (Distribuye)
                                      ▼
   ┌───────────────────────────────────────────────────────────────────────┐
   │                                EDGE                                   │
   │                                                                       │
   │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────┐  │
   │  │  Consultio (N14) │  │ Colab Studio(N17)│  │   DevStudio (P2)    │  │
   │  │ (App Consultor)  │  │ (App Trabajador) │  │   (App Developer)   │  │
   │  └──────────────────┘  └──────────────────┘  └─────────────────────┘  │
   │           │                      │                      │             │
   │           ▼                      ▼                      ▼             │
   │  ┌─────────────────────────────────────────────────────────────────┐  │
   │  │             Runtime de Agente Local / Claude Code (N8)          │  │
   │  └─────────────────────────────────────────────────────────────────┘  │
   └──────────────────────────────────┬────────────────────────────────────┘
                                      │ (Deploy / Sincronización)
                                      ▼
   ┌───────────────────────────────────────────────────────────────────────┐
   │                        ORGANIZACIÓN (CLIENTE)                         │
   │                                                                       │
   │  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────┐  │
   │  │ Repo Oficial(N6) │  │   Cockpit (N13)  │  │  Data Lakehouse(N16)│  │
   │  │ (Estado Deseado) │  │  (Visualización) │  │    (Estado Real)    │  │
   │  └──────────────────┘  └──────────────────┘  └─────────────────────┘  │
   └───────────────────────────────────────────────────────────────────────┘
```

### 1. Arnesia (Harness Studio) · `~/Proyectos/harness-studio`
*   **Rol:** La fábrica central de arneses de la suite.
*   **Propósito:** Define, programa, firma y versiona los paquetes de skills, instrucciones, guardrails y herramientas que componen un rol-en-un-proceso. Transforma la consultoría textual en arneses de ejecución binarios que cargan las apps del edge (Consultio, Colab Studio y DevStudio).
*   **Relación:** Los arneses que produce Arnesia se distribuyen a través del canal oficial y guían el comportamiento de los agentes.

### 2. Consultio · `~/Proyectos/consultio`
*   **Rol:** La aplicación de escritorio del consultor (y posteriormente del Analista de Calidad del cliente).
*   **Propósito:** Es una aplicación fina montada sobre el kernel compartido `studio-core`. Se conecta con el Claude Code local para guiar el levantamiento y mapeo AS-IS (vía entrevistas adaptativas e ingesta de documentos crudos en el Depósito N12). Diseña el TO-BE de la empresa y ejecuta el "deploy de procesos" publicando el modelo en el Repositorio Oficial (N6).
*   **Relación:** Genera la metadata, procesos estructurados y los arneses específicos de la empresa que Cockpit renderiza y Colab Studio ejecuta.

### 3. Colab Studio · `(Por crear)`
*   **Rol:** La aplicación de escritorio del trabajador operativo (no-developer).
*   **Propósito:** Carga el repertorio de arneses asociados al puesto del colaborador (un puesto ensambla N roles). Conecta al trabajador con el twin estratégico dándole superpoderes de ejecución e inyectando automatizaciones en el día a día para mover los KPIs asignados.
*   **Relación:** Envía la telemetría operativa al Data Lakehouse (N16) para que Cockpit mida el drift operativo real.

### 4. Dev-studio · `~/Proyectos/dev-studio`
*   **Rol:** Consola de escritorio para el developer de la organización.
*   **Propósito:** Permite construir software a medida e integraciones contra los sistemas operacionales de la empresa (Sistema B / N18). Comparte el mismo kernel `studio-core` que usa Consultio para el manejo de sesiones, prompts, subagentes y comunicación con Claude Code.
*   **Relación:** Resuelve las brechas complejas de sistemas que no pueden ser atacadas mediante simples arneses sin código.

---

## 📐 Arquitectura Interna y Componentes (3 Planos · 16 Nodos)

El sistema opera bajo una arquitectura distribuida y desacoplada organizada en tres planos de visibilidad y ejecución:

### Plano del Fabricante (Nuestro)
*   **N15 Arnesia (Fábrica):** Compila el objeto normalizado y genera los arneses sin drift de origen.
*   **N2 Repositorio Maestro:** Aloja el código, plantillas de arneses y el método del consultor (M1-M3).
*   **N3 Portal (Distribución y Entitlements):** Gestiona la puerta comercial (login, cobros, descargas de apps), la validación de licencias offline-first usando firmas criptográficas Ed25519 (por fingerprint compuesto de máquina), y recibe telemetría agregada mediante OTel Collector (mTLS saliente).

### Plano de la Organización (Instancia del Cliente)
*   **N6 Repositorio Oficial (Estado Deseado):** Repositorio Git confidencial (Forgejo) que contiene la estructura organizacional y los manuales como código versionado (SSoT estructural).
*   **N16 Data Lakehouse (Estado Real):** Motor analítico de ingesta (basado en `dlt` + `DuckLake` + Parquet) que reúne en formato batch diario la operación de todos los sistemas empresariales (N18).
*   **N13 Cockpit (El Reconciliador del Twin):** Servidor local (`directorio`) que cruza la estructura de N6 con la operación de N16. Cuenta con el **módulo de visualización**, el **módulo de Gestión de Cambios** (flujo ISO dev $\rightarrow$ UAT $\rightarrow$ prod de procesos), el **motor de indicadores** (hilo de oro semántico), y el **ciclo brecha$\rightarrow$proyecto**.
*   **N12 Depósito de Fuentes (Landing Zone):** Espacio transitorio e hiperseguro cifrado AES-256 donde aterriza la documentación cruda del levantamiento antes de ser eliminada tras el mapeo.

### Plano Edge (Dispositivos del Usuario)
*   **N14 Consultio, N17 Colab Studio, N5 DevStudio:** Aplicaciones de escritorio para cada rol.
*   **N8 Runtime de Agente Local (Claude Code):** Motor que ejecuta la inferencia de forma local bajo la suscripción personal de cada humano firmado (respetando los términos de uso de Anthropic que prohíben la multiplexación server-side).

---

## 💻 Tecnologías y Stack Técnico

El repositorio de Cockpit utiliza un stack estricto de alto rendimiento, optimizado para ser portable, rápido de compilar y libre de dependencias monstruosas de infraestructura:

```
                               ┌──────────────────────┐
                               │     Next.js (UI)     │
                               │  Vite/Next Static    │
                               └──────────┬───────────┘
                                          │ (Compila & Exporta)
                                          ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           Go Backend (directorio)                      │
  │                                                                        │
  │  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────┐  │
  │  │     go:embed UI      │  │   sqlite (Auth/DB)   │  │   DuckDB     │  │
  │  └──────────────────────┘  └──────────────────────┘  └──────────────┘  │
  └────────────────────────────────────────────────────────────────────────┘
```

*   **Backend:** Módulo escrito en **Go 1.23** (`/go`). Levanta un binario autocontenido y ultraligero llamado `directorio` que corre en el puerto `4100`.
*   **Frontend:** Aplicación de SPA construida con **Next.js** en TypeScript (`/ui`). Para entornos de producción, la interfaz se compila y exporta estáticamente vía `./build-ui.sh`, siendo embebida de manera directa en el ejecutable de Go a través de la directiva `go:embed`.
*   **Base de Datos y Almacenamiento:**
    *   **SQLite:** Maneja la persistencia ligera de sesiones de usuario locales, auditoría de firmas de aprobación ISO de la Gestión de Cambios, y credenciales cifradas con `argon2id`.
    *   **DuckDB (`duckdb-go`):** Motor embebido para realizar consultas analíticas rápidas de los indicadores, conectándose nativamente al Data Lakehouse en caliente (`ATTACH ... AS lake`).
*   **Dolt/Forgejo/Git:** Utilizado como base de datos versionada de archivos para la SSoT estructural.

---

## 🛠️ Cómo Lograremos Trabajar (Dogma y Gates)

Trabajamos con el mismo nivel de orden y disciplina as-code que el twin promueve para nuestros clientes. Los tres principios de nuestra forma de trabajo son: **SSoT (Única Fuente de Verdad) $\rightarrow$ Vistas Generadas $\rightarrow$ Gates de pre-commit.**

### Los 4 Gates de Pre-commit (`.githooks/pre-commit`)
En cada commit que realices, se ejecutan de forma automática cuatro scripts verificadores deterministas que garantizan que el repositorio jamás sufra desvío de sincronización (drift):
1.  **Arquitectura as-code:** Valida que `sistema/arquitectura/NODOS.md` y `arquitectura.yaml` mantengan consistencia total para regenerar el html dinámico de despliegue y los assets de JS.
2.  **Metodología as-code:** Mantiene alineadas las 45 M-cards de `sistema/metodo/methodologies.yaml` y el flujo de procesos generando `GRAFO.md` y `METODOLOGIA.md`.
3.  **Roadmap as-code:** Toma todas las historias activas en `docs/product/stories/` y las releases, regenerando automáticamente la sección de estado en `docs/product/ROADMAP.md`.
4.  **Schema de Objeto:** Controla que las 12 entidades del schema v2 de negocio se correspondan exactamente con el validador del backend.

Cualquier discrepancia detiene el commit e impide subir código inconsistente.

---

## 🚦 Estado Actual del Proyecto (Graduado de Incubadora)

El repositorio de Cockpit fue graduado de manera exitosa (2026-07-06) de la célula P1 del monorepo `prenter-harness`.

### 🟢 Qué existe y está verificado:
*   **Modelos e Ingesta:** El modelo de dominio de portfolio (`ui/lib/portfolio.ts`) cuenta con 25 unit tests validados.
*   **Backend Go:** Servidor de APIs REST autocontenido `/api/portfolio` y `/api/negocio`.
*   **Frontend Next.js:** SPA fluida integrada con el design system PRENTER, con barra de navegación, páginas de negocio y el dashboard de prototipo de portfolio de ejemplo.
*   **Build determinístico:** `./build-ui.sh` exporta de forma estática y limpia la UI hacia el embedding de Go.

### 🟡 Qué está en desarrollo (Parcial / En Curso):
*   **Consultio v0:** Mapeo inicial del método M1-M3 mediante arneses nativos de Claude Code sin el shell visual (en construcción bajo `studio-core`).
*   **Fichas de Arquitectura:** El 100% de los 16 nodos están fichados finamente en `sistema/arquitectura/NODOS.md`.

### 🔴 Qué está pendiente (Pendientes del MVP de Twin):
*   **Motor de Indicadores:** Unión real entre los objetivos semánticos de N6 y las tablas de DuckDB de N16.
*   **Gestión de Cambios de Cockpit:** Interfaz de usuario para que el analista pueda solicitar, firmar y publicar procesos a Git de forma transparente.
*   **Licenciamiento por fingerprint:** Portal comercial N3 para control y firma de licencias offline-first.

---

## 🚀 Guía de Inicio Rápido (Desarrollo local)

1.  **Instalar dependencias del frontend:**
    ```bash
    cd ui && pnpm install
    ```
2.  **Compilar y empaquetar el frontend:**
    ```bash
    ./build-ui.sh
    ```
3.  **Ejecutar el servidor Go de Cockpit:**
    ```bash
    ./start.sh
    # Servidor backend corriendo en http://localhost:4100
    ```
4.  **Ejecutar Next.js en modo desarrollo con Rewrites hacia Go:**
    ```bash
    cd ui && pnpm dev
    # Servidor de desarrollo corriendo en http://localhost:4101
    ```
5.  **Correr Suite de Pruebas:**
    *   **Go tests:** `cd go && go test ./...`
    *   **UI tests:** `cd ui && pnpm test`

---
*Privado — © Alpaca Púrpura / Prenter.*
