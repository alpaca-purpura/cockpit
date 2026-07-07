'use client';

import { useEffect, useState } from 'react';
import { Spinner, ErrorBanner, EmptyState } from '../ui/Spinner';
import { cn } from '../../lib/cn';
import {
  getPersonas,
  quienesCumplen,
  rolesDePersona,
  procesosDelRol,
} from '../../lib/personas';
import type { Persona, Rol, PersonasData } from '../../lib/personas';
import type { Negocio } from '../../lib/negocio';

/**
 * Tab Personas (BL-01 · CK-12) — el pilar Personas de primera clase. Lee roles
 * (cargos) y personas del objeto normalizado (empresa/personas/ + empresa/roles/ del
 * shell), NO del negocio.yaml (D-13: proyección). Por rol: quién lo cumple (inverso
 * por scan) y qué procesos del diagnóstico corre (match puesto↔rol.nombre — puente
 * hasta que negocio.yaml se genere del objeto). Fetch propio y lazy: Tabs solo monta
 * la lente activa, así el diagnóstico no espera a las personas.
 */

const CONF_DOT: Record<string, string> = {
  alta: '#2ecf96',
  media: '#f5a524',
  baja: '#e5564b',
};

// negocio nullable: el pilar Personas vive UPSTREAM del negocio.yaml (objeto
// normalizado) — existe aunque el diagnóstico no esté curado aún (caso prenter, D-15).
export function PersonasTab({
  empresa,
  negocio,
}: {
  empresa: string;
  negocio: Negocio | null;
}) {
  const [data, setData] = useState<PersonasData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setData(null);
    setError(null);
    getPersonas(empresa)
      .then((d) => {
        if (alive) setData(d);
      })
      .catch((err) => {
        if (alive) setError((err as Error).message);
      });
    return () => {
      alive = false;
    };
  }, [empresa]);

  if (error) return <ErrorBanner message={error} />;
  if (!data) return <Spinner />;

  const { personas, roles } = data;
  if (personas.length === 0 && roles.length === 0) {
    return (
      <EmptyState>
        <span className="text-[#e4e4e7] font-medium">{empresa}</span> todavía no tiene su{' '}
        <span className="text-[#93c5fd]">pilar Personas</span> poblado. Se llena
        un-archivo-por-entidad en{' '}
        <code className="text-[#71717a]">empresa/personas/</code> y{' '}
        <code className="text-[#71717a]">empresa/roles/</code> del repo de la empresa
        (contrato: <code className="text-[#71717a]">sistema/schema/objeto.schema.yaml</code>).
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mismo patrón que el banner de negocio.yaml: warnings no-fatales al leer —
          el dato malo se delata en vez de mentir en silencio. */}
      {data._warnings && data._warnings.length > 0 && (
        <div className="rounded-md border border-[#5e4a22] bg-[#f5a524]/[0.08] p-3">
          <div className="text-xs font-semibold text-[#f5a524]">
            ⚠ personas/roles mal formados · {data._warnings.length}{' '}
            {data._warnings.length === 1 ? 'aviso' : 'avisos'}
          </div>
          <ul className="mt-1.5 space-y-0.5 font-mono text-[11px] text-[#d4d4d8]">
            {data._warnings.map((wmsg, i) => (
              <li key={i}>· {wmsg}</li>
            ))}
          </ul>
          <p className="mt-1.5 text-[10px] text-[#71717a]">
            Contrato:{' '}
            <code className="text-[#71717a]">sistema/schema/objeto.schema.yaml</code>. Se
            muestra lo que se pudo leer.
          </p>
        </div>
      )}

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a1a1aa]">
          Roles <span className="font-normal text-[#71717a]">({roles.length})</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {roles.map((rol) => (
            <RolCard key={rol.id} rol={rol} personas={personas} negocio={negocio} />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a1a1aa]">
          Personas <span className="font-normal text-[#71717a]">({personas.length})</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {personas.map((p) => (
            <PersonaCard key={p.id} persona={p} roles={roles} personas={personas} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Rol (cargo · Business Role) ──────────────────────────────────────────────

function RolCard({
  rol,
  personas,
  negocio,
}: {
  rol: Rol;
  personas: Persona[];
  negocio: Negocio | null;
}) {
  const cumplen = quienesCumplen(personas, rol.id);
  const procesos = negocio ? procesosDelRol(negocio, rol) : [];

  return (
    <div className="rounded-md border border-[#27272a] bg-[var(--color-panel2)] p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-semibold leading-tight text-[#e4e4e7]">
          {rol.nombre}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {rol.es_stakeholder && (
            <span className="rounded-full border border-[#27272a] px-1.5 py-0.5 text-[10px] text-[#a1a1aa]">
              stakeholder
            </span>
          )}
          <ConfDot conf={rol.conf} />
        </div>
      </div>

      {rol.descripcion && (
        <p className="mt-1 text-xs leading-relaxed text-[#a1a1aa]">{rol.descripcion}</p>
      )}
      {rol.autoridad && (
        <p className="mt-1.5 text-[11px] text-[#71717a]">
          Autoridad: <span className="text-[#d4d4d8]">{rol.autoridad}</span>
        </p>
      )}
      {rol.responsabilidades && rol.responsabilidades.length > 0 && (
        <ul className="mt-1.5 space-y-0.5 text-[11px] text-[#a1a1aa]">
          {rol.responsabilidades.map((resp, i) => (
            <li key={i}>· {resp}</li>
          ))}
        </ul>
      )}

      {/* Quién lo cumple — inverso por scan de persona.roles[]; sin persona = vacante
          o cumplido externamente (el detalle vive en la descripción del rol). */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {cumplen.length > 0 ? (
          cumplen.map((p) => (
            <span
              key={p.id}
              className="rounded-full border border-[#2ecf96]/40 bg-[#2ecf96]/[0.08] px-2 py-0.5 text-[11px] text-[#2ecf96]"
            >
              {p.nombre}
            </span>
          ))
        ) : (
          <span className="rounded-full border border-[#5e4a22] bg-[#f5a524]/[0.08] px-2 py-0.5 text-[11px] text-[#f5a524]">
            sin persona asignada
          </span>
        )}
      </div>

      {procesos.length > 0 && (
        <div className="mt-2 border-t border-[#27272a] pt-2">
          <div className="text-[10px] uppercase tracking-wide text-[#71717a]">
            Procesos que corre ({procesos.length})
          </div>
          <ul className="mt-1 space-y-0.5 text-[11px] text-[#a1a1aa]">
            {procesos.map((p) => (
              <li key={p.id}>
                · {p.nombre} <span className="text-[#71717a]">({p.area})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Persona (Business Actor individual) ──────────────────────────────────────

function PersonaCard({
  persona,
  roles,
  personas,
}: {
  persona: Persona;
  roles: Rol[];
  personas: Persona[];
}) {
  const nombres = rolesDePersona(persona, roles);
  const jefe = persona.reporta_a
    ? personas.find((p) => p.id === persona.reporta_a)?.nombre ?? persona.reporta_a
    : null;

  return (
    <div className="rounded-md border border-[#27272a] bg-[var(--color-panel2)] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold leading-tight text-[#e4e4e7]">
            {persona.nombre}
          </div>
          {persona.contacto?.email && (
            <div className="mt-0.5 font-mono text-[11px] text-[#71717a]">
              {persona.contacto.email}
            </div>
          )}
        </div>
        <ConfDot conf={persona.conf} />
      </div>

      {nombres.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {nombres.map((n, i) => (
            <span
              key={i}
              className="rounded-full border border-[#27272a] px-2 py-0.5 text-[11px] text-[#a1a1aa]"
            >
              {n}
            </span>
          ))}
        </div>
      )}

      {jefe && (
        <p className="mt-2 text-[11px] text-[#71717a]">
          Reporta a: <span className="text-[#d4d4d8]">{jefe}</span>
        </p>
      )}
      {persona.fuente && (
        <p className="mt-1 text-[10px] text-[#71717a]">Fuente: {persona.fuente}</p>
      )}
    </div>
  );
}

/** Dot de confianza (§14 — honestidad sin falsa certeza); sin conf → sin dot. */
function ConfDot({ conf }: { conf?: string }) {
  if (!conf) return null;
  return (
    <span
      title={`conf: ${conf}`}
      className={cn('mt-1 inline-block h-2 w-2 shrink-0 rounded-full')}
      style={{ backgroundColor: CONF_DOT[conf] ?? '#71717a' }}
    />
  );
}
