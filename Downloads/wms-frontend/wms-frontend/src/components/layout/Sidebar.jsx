import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, PackageSearch, ClipboardList, Boxes } from 'lucide-react';

const ITENS = [
  { to: '/', label: 'Painel', icon: LayoutDashboard, fim: true },
  { to: '/fornecedores', label: 'Fornecedores', icon: Truck },
  { to: '/entradas', label: 'Entradas', icon: ClipboardList },
  { to: '/entradas/relatorio', label: 'Relatório de entradas', icon: Boxes },
  { to: '/produtos/localizar', label: 'Localizar produto', icon: PackageSearch },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col bg-wms-700 text-white md:flex">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <Boxes size={26} className="text-wms-200" />
        <div>
          <p className="text-sm font-bold leading-tight">Gollinho WMS</p>
          <p className="text-[11px] text-wms-200">Gestão de Armazém</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {ITENS.map(({ to, label, icon: Icon, fim }) => (
          <NavLink
            key={to}
            to={to}
            end={fim}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-white text-wms-700' : 'text-wms-50 hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 text-[11px] text-wms-200 border-t border-white/10">
        Indústria de Bebidas Gollinho
      </div>
    </aside>
  );
}
