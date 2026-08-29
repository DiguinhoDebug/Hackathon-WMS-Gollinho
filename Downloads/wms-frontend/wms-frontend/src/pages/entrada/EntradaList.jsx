import { useCallback, useEffect, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import entradaService from '../../api/entradaService';
import { PageHeader, Loading } from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import EntradaFormModal from './EntradaForm';
import { formatarDataHora } from '../../utils/formatters';
import { alertaErro } from '../../utils/alertas';

export default function EntradaList() {
  const [entradas, setEntradas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [filtros, setFiltros] = useState({ dataInicio: '', dataFim: '' });

  const carregarEntradas = useCallback(async () => {
    setCarregando(true);
    try {
      const { data } = await entradaService.listar({
        dataInicio: filtros.dataInicio || undefined,
        dataFim: filtros.dataFim || undefined,
      });
      setEntradas(data?.content ?? data ?? []);
    } catch (erro) {
      alertaErro('Não foi possível carregar as entradas', erro?.mensagem);
    } finally {
      setCarregando(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregarEntradas();
  }, [carregarEntradas]);

  const colunas = [
    { chave: 'id', titulo: 'ID' },
    { chave: 'dataHora', titulo: 'Data / Hora', render: (item) => formatarDataHora(item.dia, item.hora) },
    { chave: 'produto', titulo: 'Produto', render: (item) => item.produto?.nome || item.produtoId },
    { chave: 'fornecedor', titulo: 'Fornecedor', render: (item) => item.fornecedor?.razaoSocial || item.fornecedorId },
  ];

  return (
    <div>
      <PageHeader
        titulo="Entradas"
        subtitulo="Registro de entradas de produtos no armazém."
        acoes={
          <Button icon={Plus} onClick={() => setModalAberto(true)}>
            Nova entrada
          </Button>
        }
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter size={16} /> Filtrar por período
          </div>
          <Input
            type="date"
            label="De"
            value={filtros.dataInicio}
            onChange={(e) => setFiltros((f) => ({ ...f, dataInicio: e.target.value }))}
          />
          <Input
            type="date"
            label="Até"
            value={filtros.dataFim}
            onChange={(e) => setFiltros((f) => ({ ...f, dataFim: e.target.value }))}
          />
        </div>
      </Card>

      <Card>
        {carregando ? (
          <Loading texto="Carregando entradas..." />
        ) : (
          <Table colunas={colunas} dados={entradas} />
        )}
      </Card>

      <EntradaFormModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onSalvo={() => {
          setModalAberto(false);
          carregarEntradas();
        }}
      />
    </div>
  );
}
