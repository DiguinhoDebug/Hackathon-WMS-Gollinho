import { Boxes } from 'lucide-react';
import { Outlet } from 'react-router-dom';

/**
 * Layout mobile do WMS Gollinho.
 *
 * Por definição do projeto, a versão mobile é um app enxuto voltado
 * exclusivamente à localização de produtos dentro do armazém (uso pelo
 * operador andando entre as prateleiras). As demais telas de gestão
 * (fornecedores, entradas, relatórios) ficam disponíveis apenas no desktop.
 */
export default function MobileLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex items-center gap-2 bg-wms-700 px-4 py-4 text-white shadow-sm">
        <Boxes size={22} className="text-wms-200" />
        <div>
          <p className="text-sm font-bold leading-tight">Gollinho WMS</p>
          <p className="text-[11px] text-wms-200">Localização de produtos</p>
        </div>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
