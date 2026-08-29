import { useState } from 'react';
import { Search, MapPin, PackageX, Layers, Columns3, Boxes } from 'lucide-react';
import produtoService from '../../api/produtoService';
import { alertaErro } from '../../utils/alertas';

export default function MobileLocalizarProduto() {
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
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <form onSubmit={handleBuscar} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            autoFocus
            inputMode="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Nome ou código do produto"
            className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-10 pr-3 text-base
              text-slate-800 shadow-sm outline-none focus:border-wms-500 focus:ring-2 focus:ring-wms-500"
          />
        </div>
        <button
          type="submit"
          disabled={carregando}
          className="rounded-xl bg-wms-600 px-5 text-sm font-semibold text-white shadow-sm active:bg-wms-700 disabled:opacity-50"
        >
          {carregando ? '...' : 'Buscar'}
        </button>
      </form>

      {carregando && (
        <div className="flex items-center justify-center gap-3 py-10 text-slate-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-wms-500 border-t-transparent" />
          <span className="text-sm">Buscando...</span>
        </div>
      )}

      {!carregando && naoEncontrado && (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-white py-12 text-slate-400 shadow-card">
          <PackageX size={36} />
          <p className="px-6 text-center text-sm">Nenhum produto encontrado para "{termo}".</p>
        </div>
      )}

      {!carregando && produto && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          <div className="bg-wms-700 px-5 py-4 text-white">
            <p className="text-[11px] uppercase tracking-wide text-wms-200">Produto localizado</p>
            <p className="mt-0.5 text-lg font-bold leading-tight">{produto.nome}</p>
            {produto.fornecedor?.razaoSocial && (
              <p className="mt-1 text-xs text-wms-100">Fornecedor: {produto.fornecedor.razaoSocial}</p>
            )}
          </div>

          <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
            <div className="flex flex-col items-center gap-1 py-4">
              <Layers size={18} className="text-wms-600" />
              <p className="text-xl font-bold text-slate-800">{produto.prateleira?.andar ?? '-'}</p>
              <p className="text-[11px] text-slate-400">Andar</p>
            </div>
            <div className="flex flex-col items-center gap-1 py-4">
              <Columns3 size={18} className="text-wms-600" />
              <p className="text-xl font-bold text-slate-800">{produto.prateleira?.coluna ?? '-'}</p>
              <p className="text-[11px] text-slate-400">Coluna</p>
            </div>
            <div className="flex flex-col items-center gap-1 py-4">
              <Boxes size={18} className="text-wms-600" />
              <p className="text-xl font-bold text-slate-800">{produto.prateleira?.quantidade ?? '-'}</p>
              <p className="text-[11px] text-slate-400">Qtd.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-5 py-3 text-sm text-slate-500">
            <MapPin size={16} className="text-wms-600" />
            Dirija-se ao andar {produto.prateleira?.andar ?? '-'}, coluna {produto.prateleira?.coluna ?? '-'}.
          </div>
        </div>
      )}

      {!carregando && !produto && !naoEncontrado && (
        <div className="flex flex-col items-center gap-2 py-14 text-slate-300">
          <Search size={40} />
          <p className="text-sm text-slate-400">Digite um produto para localizar na prateleira.</p>
        </div>
      )}
    </div>
  );
}
