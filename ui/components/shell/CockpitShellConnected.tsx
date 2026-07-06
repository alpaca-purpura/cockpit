'use client';

import type { ReactNode } from 'react';
import { useEmpresa } from '../providers/EmpresaProvider';
import { CockpitShell } from './CockpitShell';

/** Cablea EmpresaProvider → CockpitShell (props) — el layout raíz se queda
 *  server component; este wrapper es el único punto 'use client' necesario. */
export function CockpitShellConnected({ children }: { children: ReactNode }) {
  const { empresa, setEmpresa, tree } = useEmpresa();
  return (
    <CockpitShell empresa={empresa} empresas={tree?.empresas ?? []} onEmpresaChange={setEmpresa}>
      {children}
    </CockpitShell>
  );
}
