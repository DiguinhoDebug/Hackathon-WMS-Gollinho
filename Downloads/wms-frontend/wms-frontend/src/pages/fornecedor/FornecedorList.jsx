import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Power } from 'lucide-react';
import fornecedorService from '../../api/fornecedorService';
import { PageHeader, Loading } from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import FornecedorFormModal from './FornecedorForm';
import { STATUS_FORNECEDOR } from '../../utils/constants';
import { alertaConfirmacao, alertaErro, alertaSucesso } from '../../utils/alertas';

export default function FornecedorList() {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  const carregarFornecedores = useCallback(async () => {
    setCarregando(true);
    try {
      const { data } = await fornecedorService.listar({ razaoSocial: busca || undefined });
      setFornecedores(data?.content ?? data ?? []);
    } catch (erro) {
      alertaErro('Não foi possível carregar os fornecedores', erro?.mensagem);
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  useEffect(() => {
    carregarFornecedores();
  }, [carregarFornecedores]);

  async function handleAlterarStatus(fornecedor) {
    const novoStatus =
      fornecedor.status === STATUS_FORNECEDOR.ATIVO ? STATUS_FORNECEDOR.INATIVO : STATUS_FORNECEDOR.ATIVO;

    const confirmou = await alertaConfirmacao({
      titulo: `${novoStatus === STATUS_FORNECEDOR.ATIVO ? 'Ativar' : 'Inativar'} fornecedor?`,
      texto: `${fornecedor.razaoSocial} será marcado como ${novoStatus.toLowerCase()}.`,
      confirmarTexto: 'Sim, alterar',
    });
    if (!confirmou.isConfirmed) return;

    try {
      await fornecedorService.alterarStatus(fornecedor.id, novoStatus);
      alertaSucesso('Status atualizado');
      carregarFornecedores();
    } catch (erro) {
      alertaErro('Não foi possível alterar o status', erro?.mensagem);
    }
  }

  const colunas = [
    { chave: 'id', titulo: 'ID' },
    { chave: 'razaoSocial', titulo: 'Razão social' },
    { chave: 'cnpj', titulo: 'CNPJ' },
    {
      chave: 'endereco',
      titulo: 'Cidade / UF',
      render: (item) =>
        item.endereco ? `${item.endereco.cidade || '-'} / ${item.endereco.estado || '-'}` : '-',
    },
    {
      chave: 'status',
      titulo: 'Status',
      render: (item) => (
        <Badge tom={item.status === STATUS_FORNECEDOR.ATIVO ? 'verde' : 'vermelho'}>
          {item.status === STATUS_FORNECEDOR.ATIVO ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        titulo="Fornecedores"
        subtitulo="Cadastro e consulta de fornecedores de insumos e produtos."
        acoes={
          <Button icon={Plus} onClick={() => setModalAberto(true)}>
            Novo fornecedor
          </Button>
        }
      />

      <Card className="mb-4">
        <div className="max-w-sm">
          <Input
            placeholder="Buscar por razão social..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            icon={Search}
          />
        </div>
      </Card>

      <Card>
        {carregando ? (
          <Loading texto="Carregando fornecedores..." />
        ) : (
          <Table
            colunas={colunas}
            dados={fornecedores}
            renderAcoes={(item) => (
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => navigate(`/fornecedores/${item.id}`)}
                  className="rounded-lg p-2 text-wms-600 hover:bg-wms-50"
                  title="Ver detalhes"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleAlterarStatus(item)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  title="Alternar status"
                >
                  <Power size={16} />
                </button>
              </div>
            )}
          />
        )}
      </Card>

      <FornecedorFormModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onSalvo={() => {
          setModalAberto(false);
          carregarFornecedores();
        }}
      />
    </div>
  );
}
