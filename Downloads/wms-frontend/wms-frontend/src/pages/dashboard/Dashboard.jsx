import { Link } from 'react-router-dom';
import { Truck, ClipboardList, PackageSearch, Boxes } from 'lucide-react';
import Card from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';

const ATALHOS = [
  {
    to: '/fornecedores',
    icon: Truck,
    titulo: 'Fornecedores',
    descricao: 'Cadastrar, consultar e alterar status de fornecedores.',
  },
  {
    to: '/entradas',
    icon: ClipboardList,
    titulo: 'Entradas',
    descricao: 'Registrar e consultar entradas de produtos no armazém.',
  },
  {
    to: '/entradas/relatorio',
    icon: Boxes,
    titulo: 'Relatório de entradas',
    descricao: 'Gerar relatórios de entradas por período, produto ou fornecedor.',
  },
  {
    to: '/produtos/localizar',
    icon: PackageSearch,
    titulo: 'Localizar produto',
    descricao: 'Encontrar a posição de um produto na prateleira.',
  },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        titulo="Painel de controle"
        subtitulo="Indústria de Bebidas Gollinho — Gestão de Armazém (WMS)"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ATALHOS.map(({ to, icon: Icon, titulo, descricao }) => (
          <Link key={to} to={to}>
            <Card className="h-full transition hover:border-wms-300 hover:shadow-md">
              <div className="mb-3 inline-flex rounded-lg bg-wms-50 p-2.5 text-wms-600">
                <Icon size={22} />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{titulo}</h3>
              <p className="text-xs text-slate-500">{descricao}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
