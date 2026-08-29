const TONS = {
  azul: 'bg-wms-50 text-wms-700 ring-1 ring-inset ring-wms-200',
  verde: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  vermelho: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  cinza: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
};

export default function Badge({ children, tom = 'cinza' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONS[tom]}`}>
      {children}
    </span>
  );
}
