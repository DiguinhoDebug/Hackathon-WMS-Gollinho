import { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import fornecedorService from '../../api/fornecedorService';
import { mascaraCnpj } from '../../utils/formatters';
import { ESTADOS_BR } from '../../utils/constants';
import { alertaErro, alertaSucesso } from '../../utils/alertas';

const FORM_INICIAL = {
  razaoSocial: '',
  cnpj: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
};

/**
 * Modal responsável tanto pelo cadastro quanto pela edição de fornecedor.
 * Passe `fornecedor` (ProdutoResponseDTO equivalente do fornecedor) para
 * abrir em modo edição; deixe undefined para modo cadastro.
 */
export default function FornecedorFormModal({ open, onClose, onSalvo, fornecedor }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const modoEdicao = Boolean(fornecedor);

  useEffect(() => {
    if (fornecedor) {
      setForm({
        razaoSocial: fornecedor.razaoSocial || '',
        cnpj: fornecedor.cnpj || '',
        rua: fornecedor.endereco?.rua || '',
        numero: fornecedor.endereco?.numero || '',
        bairro: fornecedor.endereco?.bairro || '',
        cidade: fornecedor.endereco?.cidade || '',
        estado: fornecedor.endereco?.estado || '',
      });
    } else {
      setForm(FORM_INICIAL);
    }
    setErros({});
  }, [fornecedor, open]);

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function validar() {
    const novosErros = {};
    if (!form.razaoSocial.trim()) novosErros.razaoSocial = 'Informe a razão social.';
    if (form.cnpj.replace(/\D/g, '').length !== 14) novosErros.cnpj = 'CNPJ inválido.';
    if (!form.cidade.trim()) novosErros.cidade = 'Informe a cidade.';
    if (!form.estado) novosErros.estado = 'Selecione o estado.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSalvar() {
    if (!validar()) return;

    const payload = {
      razaoSocial: form.razaoSocial,
      cnpj: form.cnpj,
      endereco: {
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
      },
    };

    setSalvando(true);
    try {
      if (modoEdicao) {
        await fornecedorService.atualizar(fornecedor.id, payload);
        alertaSucesso('Fornecedor atualizado com sucesso');
      } else {
        await fornecedorService.cadastrar(payload);
        alertaSucesso('Fornecedor cadastrado com sucesso');
      }
      onSalvo?.();
    } catch (erro) {
      alertaErro('Não foi possível salvar o fornecedor', erro?.mensagem);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={modoEdicao ? 'Editar fornecedor' : 'Novo fornecedor'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={salvando}>
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Razão social"
            required
            value={form.razaoSocial}
            error={erros.razaoSocial}
            onChange={(e) => atualizarCampo('razaoSocial', e.target.value)}
            placeholder="Ex: Bebidas Gollinho Distribuidora LTDA"
          />
        </div>
        <Input
          label="CNPJ"
          required
          value={form.cnpj}
          error={erros.cnpj}
          onChange={(e) => atualizarCampo('cnpj', mascaraCnpj(e.target.value))}
          placeholder="00.000.000/0000-00"
        />
        <div />

        <div className="sm:col-span-2">
          <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Endereço
          </p>
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Rua"
            value={form.rua}
            onChange={(e) => atualizarCampo('rua', e.target.value)}
          />
        </div>
        <Input
          label="Número"
          value={form.numero}
          onChange={(e) => atualizarCampo('numero', e.target.value)}
        />
        <Input
          label="Bairro"
          value={form.bairro}
          onChange={(e) => atualizarCampo('bairro', e.target.value)}
        />
        <Input
          label="Cidade"
          required
          value={form.cidade}
          error={erros.cidade}
          onChange={(e) => atualizarCampo('cidade', e.target.value)}
        />
        <Select
          label="Estado"
          required
          value={form.estado}
          error={erros.estado}
          onChange={(e) => atualizarCampo('estado', e.target.value)}
          placeholder="Selecione"
          options={ESTADOS_BR.map((uf) => ({ value: uf, label: uf }))}
        />
      </div>
    </Modal>
  );
}
