import { useState } from 'react';
import { FileDown, Search } from 'lucide-react';
import entradaService from '../../api/entradaService';
import { PageHeader, Loading } from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { formatarDataHora } from '../../utils/formatters';
import { alertaErro } from '../../utils/alertas';

export default function EntradaRelatorio() {
  const [filtros, setFiltros] = useState({ dataInicio: '', dataFim: '' });
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  function atualizarFiltro(campo, valor) {
    setFiltros((f) => ({ ...f, [campo]: valor }));
  }

  async function handleGerar() {
    setCarregando(true);
    try {
      const { data } = await entradaService.gerarRelatorio({
        dataInicio: filtros.dataInicio || undefined,
        dataFim: filtros.dataFim || undefined,
      });
      setResultado(data?.content ?? data ?? []);
    } catch (erro) {
      alertaErro('Não foi possível gerar o relatório', erro?.mensagem);
    } finally {
      setCarregando(false);
    }
  }

  async function handleBaixarPdf() {
    try {
      const { data } = await entradaService.baixarRelatorioPdf({
        dataInicio: filtros.dataInicio || undefined,
        dataFim: filtros.dataFim || undefined,
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio-entradas.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (erro) {
      alertaErro('Não foi possível baixar o relatório em PDF', erro?.mensagem);
    }
  }

  const colunas = [
    { chave: 'id', titulo: 'ID' },
    { chave: 'dataHora', titulo: 'Data / Hora', render: (item) => formatarDataHora(item.dia, item.hora) },
    { chave: 'produto', titulo: 'Produto', render: (item) => item.produto?.nome || item.produtoId },
    { chave: 'fornecedor', titulo: 'Fornecedor', render: (item) => item.fornecedor?.razaoSocial || item.fornecedorId },
  ];

  return (
    <div>
      <PageHeader
        titulo="Relatório de entradas"
        subtitulo="Selecione o período desejado para gerar o relatório de entradas do armazém."
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-end gap-4">
          <Input
            type="date"
            label="Data início"
            value={filtros.dataInicio}
            onChange={(e) => atualizarFiltro('dataInicio', e.target.value)}
          />
          <Input
            type="date"
            label="Data fim"
            value={filtros.dataFim}
            onChange={(e) => atualizarFiltro('dataFim', e.target.value)}
          />
          <Button icon={Search} onClick={handleGerar} disabled={carregando}>
            {carregando ? 'Gerando...' : 'Gerar relatório'}
          </Button>
          {resultado && (
            <Button variant="secondary" icon={FileDown} onClick={handleBaixarPdf}>
              Baixar PDF
            </Button>
          )}
        </div>
      </Card>

      {carregando && <Loading texto="Gerando relatório..." />}

      {!carregando && resultado && (
        <Card title={`Resultado (${resultado.length} entradas)`}>
          <Table colunas={colunas} dados={resultado} vazio="Nenhuma entrada encontrada para o período selecionado." />
        </Card>
      )}
    </div>
  );
}
