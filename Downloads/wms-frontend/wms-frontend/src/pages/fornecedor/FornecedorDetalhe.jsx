import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Power } from 'lucide-react';
import fornecedorService from '../../api/fornecedorService';
import { PageHeader, Loading } from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import FornecedorFormModal from './FornecedorForm';
import { STATUS_FORNECEDOR } from '../../utils/constants';
import { formatarDataHora } from '../../utils/formatters';
import { alertaConfirmacao, alertaErro, alertaSucesso } from '../../utils/alertas';

export default function FornecedorDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fornecedor, setFornecedor] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [respFornecedor, respEntradas] = await Promise.all([
        fornecedorService.consultarPorId(id),
        fornecedorService.consultarEntradas(id),
      ]);
      setFornecedor(respFornecedor.data);
      setEntradas(respEntradas.data?.content ?? respEntradas.data ?? []);
    } catch (erro) {
      alertaErro('Não foi possível carregar os dados do fornecedor', erro?.mensagem);
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleAlterarStatus() {
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
      carregar();
    } catch (erro) {
      alertaErro('Não foi possível alterar o status', erro?.mensagem);
    }
  }

  if (carregando) return <Loading texto="Carregando fornecedor..." />;
  if (!fornecedor) return null;

  const colunasEntradas = [
    { chave: 'id', titulo: 'ID' },
    {
      chave: 'data',
      titulo: 'Data / Hora',
      render: (item) => formatarDataHora(item.dia, item.hora),
    },
    {
      chave: 'produto',
      titulo: 'Produto',
      render: (item) => item.produto?.nome || item.produtoId,
    },
  ];

  return (
    <div>
      <button
        onClick={() => navigate('/fornecedores')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-wms-600 hover:text-wms-700"
      >
        <ArrowLeft size={16} /> Voltar para fornecedores
      </button>

      <PageHeader
        titulo={fornecedor.razaoSocial}
        subtitulo={`CNPJ: ${fornecedor.cnpj}`}
        acoes={
          <>
            <Button variant="secondary" icon={Pencil} onClick={() => setModalAberto(true)}>
              Editar
            </Button>
            <Button variant={fornecedor.status === STATUS_FORNECEDOR.ATIVO ? 'danger' : 'primary'} icon={Power} onClick={handleAlterarStatus}>
              {fornecedor.status === STATUS_FORNECEDOR.ATIVO ? 'Inativar' : 'Ativar'}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Dados do fornecedor" className="lg:col-span-1">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Status</dt>
              <dd className="mt-1">
                <Badge tom={fornecedor.status === STATUS_FORNECEDOR.ATIVO ? 'verde' : 'vermelho'}>
                  {fornecedor.status === STATUS_FORNECEDOR.ATIVO ? 'Ativo' : 'Inativo'}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Endereço</dt>
              <dd className="mt-1 text-slate-700">
                {fornecedor.endereco
                  ? `${fornecedor.endereco.rua}, ${fornecedor.endereco.numero} - ${fornecedor.endereco.bairro}, ${fornecedor.endereco.cidade}/${fornecedor.endereco.estado}`
                  : 'Não informado'}
              </dd>
            </div>
          </dl>
        </Card>

        <Card title="Entradas registradas para este fornecedor" className="lg:col-span-2">
          <Table colunas={colunasEntradas} dados={entradas} vazio="Nenhuma entrada registrada para este fornecedor." />
        </Card>
      </div>

      <FornecedorFormModal
        open={modalAberto}
        fornecedor={fornecedor}
        onClose={() => setModalAberto(false)}
        onSalvo={() => {
          setModalAberto(false);
          carregar();
        }}
      />
    </div>
  );
}
