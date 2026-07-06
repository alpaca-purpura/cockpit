'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { PortfolioTree } from '../../lib/portfolio';

interface EmpresaContextValue {
  empresa: string;
  setEmpresa: (slug: string) => void;
  tree: PortfolioTree | null;
}

const EmpresaContext = createContext<EmpresaContextValue | null>(null);

/**
 * EmpresaProvider — runtime propio de Cockpit (Stage 4 · CK-07). Reemplaza al
 * adapter `app/(directorio)/layout.tsx` de devhub (CK-06): acá el árbol viene
 * de ESTE binario (GET /api/portfolio, puerto propio), no de useSistema()
 * inyectado por props. Solo `empresa` — Vista Negocio no tiene sub-selección
 * de sistema (eso es devhub/Delivery).
 */
export function EmpresaProvider({ children }: { children: ReactNode }) {
  const [tree, setTree] = useState<PortfolioTree | null>(null);
  const [empresa, setEmpresaState] = useState('');

  useEffect(() => {
    let alive = true;
    fetch('/api/portfolio')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PortfolioTree | null) => {
        if (!alive || !data || !Array.isArray(data.empresas)) return;
        setTree(data);
        setEmpresaState((cur) => cur || data.empresas[0]?.slug || '');
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <EmpresaContext.Provider value={{ empresa, setEmpresa: setEmpresaState, tree }}>
      {children}
    </EmpresaContext.Provider>
  );
}

export function useEmpresa(): EmpresaContextValue {
  const ctx = useContext(EmpresaContext);
  if (!ctx) throw new Error('useEmpresa fuera de EmpresaProvider');
  return ctx;
}
