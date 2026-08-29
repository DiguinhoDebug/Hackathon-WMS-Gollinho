import { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import entradaService from '../../api/entradaService';
import fornecedorService from '../../api/fornecedorService';
import produtoService from '../../api/produtoService';
import { alertaErro, alertaSucesso } from '../../utils/alertas';

const FORM_INICIAL = {
  dia: '',
  hora: '',
  produtoId: '',
  fornecedorId: '',
};

export default function EntradaFormModal({ open, onClose, onSalvo }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (!open) return;
    setForm(FORM_INICIAL);
    setErros({});

    async function carregarListas() {
      try {
        const [respFornecedores, respProdutos] = await Promise.all([
          fornecedorService.listar(),
          produtoService.listar(),
        ]);
        setFornecedores(respFornecedores.data?.content ?? respFornecedores.data ?? []);
        setProdutos(respProdutos.data?.content ?? respProdutos.data ?? []);
      } catch (erro) {
        alertaErro('Não foi possível carregar fornecedores/produtos', erro?.mensagem);
      }
    }
    carregarListas();
  }, [open]);

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function validar() {
    const novosErros = {};
    if (!form.dia) novosErros.dia = 'Informe a data.';
    if (!form.hora) novosErros.hora = 'Informe a hora.';
    if (!form.produtoId) novosErros.produtoId = 'Selecione o produto.';
    if (!form.fornecedorId) novosErros.fornecedorId = 'Selecione o fornecedor.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSalvar() {
    if (!validar()) return;
    setSalvando(true);
    try {
      await entradaService.cadastrar({
        dia: form.dia,
        hora: form.hora,
        produtoId: Number(form.produtoId),
        fornecedorId: Number(form.fornecedorId),
      });
      alertaSucesso('Entrada registrada com sucesso');
      onSalvo?.();
    } catch (erro) {
      alertaErro('Não foi possível registrar a entrada', erro?.mensagem);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nova entrada"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Registrar entrada'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          type="date"
          label="Dia"
          required
          value={form.dia}
          error={erros.dia}
          onChange={(e) => atualizarCampo('dia', e.target.value)}
        />
        <Input
          type="time"
          label="Hora"
          required
          value={form.hora}
          error={erros.hora}
          onChange={(e) => atualizarCampo('hora', e.target.value)}
        />
        <div className="sm:col-span-2">
          <Select
            label="Produto"
            required
            placeholder="Selecione o produto"
            value={form.produtoId}
            error={erros.produtoId}
            onChange={(e) => atualizarCampo('produtoId', e.target.value)}
            options={produtos.map((p) => ({ value: p.id, label: p.nome }))}
          />
        </div>
        <div className="sm:col-span-2">
          <Select
            label="Fornecedor"
            required
            placeholder="Selecione o fornecedor"
            value={form.fornecedorId}
            error={erros.fornecedorId}
            onChange={(e) => atualizarCampo('fornecedorId', e.target.value)}
            options={fornecedores.map((f) => ({ value: f.id, label: f.razaoSocial }))}
          />
        </div>
      </div>
    </Modal>
  );
}
