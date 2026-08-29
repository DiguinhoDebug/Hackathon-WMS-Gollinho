import { useState } from 'react';
import { Search, MapPin, PackageX } from 'lucide-react';
import produtoService from '../../api/produtoService';
import { PageHeader, Loading } from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { alertaErro } from '../../utils/alertas';

export default function ProdutoLocalizar() {
  const [termo, setTermo] = useState('');
  const [produto, setProduto] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleBuscar(e) {
    e.preventDefault();
    if (!termo.trim()) return;

    setCarregando(true);
    setNaoEncontrado(false);
    setProduto(null);
    try {
      const { data } = await produtoService.localizar(termo.trim());
      if (!data) {
        setNaoEncontrado(true);
      } else {
        setProduto(data);
      }
    } catch (erro) {
      if (erro?.status === 404) {
        setNaoEncontrado(true);
      } else {
        alertaErro('Não foi possível localizar o produto', erro?.mensagem);
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <PageHeader
        titulo="Localizar produto"
        subtitulo="Busque pelo nome ou código do produto para encontrar sua posição no armazém."
      />

      <Card className="mb-4">
        <form onSubmit={handleBuscar} className="flex flex-wrap items-end gap-4">
          <div className="min-w-[260px] flex-1">
            <Input
              label="Produto"
              placeholder="Nome ou ID do produto"
              icon={Search}
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
          <Button type="submit" icon={Search} disabled={carregando}>
            {carregando ? 'Buscando...' : 'Localizar'}
          </Button>
        </form>
      </Card>

      {carregando && <Loading texto="Buscando produto..." />}

      {!carregando && naoEncontrado && (
        <Card>
          <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
            <PackageX size={32} />
            <p className="text-sm">Nenhum produto encontrado para "{termo}".</p>
          </div>
        </Card>
      )}

      {!carregando && produto && (
        <Card title="Produto encontrado">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Produto</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{produto.nome}</p>
              <p className="mt-1 text-sm text-slate-500">
                Fornecedor: {produto.fornecedor?.razaoSocial || '-'}
              </p>
            </div>

            <div className="rounded-xl bg-wms-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-wms-700">
                <MapPin size={18} />
                <span className="text-sm font-semibold">Posição na prateleira</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-2xl font-bold text-wms-700">{produto.prateleira?.andar ?? '-'}</p>
                  <p className="text-xs text-slate-500">Andar</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-wms-700">{produto.prateleira?.coluna ?? '-'}</p>
                  <p className="text-xs text-slate-500">Coluna</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-wms-700">{produto.prateleira?.quantidade ?? '-'}</p>
                  <p className="text-xs text-slate-500">Quantidade</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
