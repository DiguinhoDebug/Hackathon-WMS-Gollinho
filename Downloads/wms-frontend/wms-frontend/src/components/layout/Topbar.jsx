import { Menu, UserCircle } from 'lucide-react';

export default function Topbar({ onAbrirMenuMobile }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <button
        onClick={onAbrirMenuMobile}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <UserCircle size={22} className="text-wms-600" />
        <span className="hidden sm:inline">Operador do armazém</span>
      </div>
    </header>
  );
}
