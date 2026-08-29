import axiosClient from './axiosClient';

const RESOURCE = '/produtos';

const produtoService = {
  // GET /produtos - lista produtos cadastrados (usado em selects de Entrada, etc.)
  listar: (params) => {
    return axiosClient.get(RESOURCE, { params });
    // params sugeridos: { nome, fornecedorId, page, size }
  },

  // GET /produtos/:id - consulta um produto específico
  consultarPorId: (id) => {
    return axiosClient.get(`${RESOURCE}/${id}`);
  },

  // GET /produtos/localizar?nome=... ou ?id=...
  // Retorna o produto junto da posição na prateleira (andar, coluna, quantidade)
  // usado tanto na tela desktop quanto na tela mobile de localização.
  localizar: (termoBusca) => {
    return axiosClient.get(`${RESOURCE}/localizar`, {
      params: { termo: termoBusca },
    });
    // resposta sugerida (ProdutoResponseDTO estendido):
    // { id, nome, fornecedor: { id, razaoSocial }, prateleira: { andar, coluna, quantidade } }
  },

  // POST /produtos - cadastra um novo produto (se a tela de cadastro for necessária)
  cadastrar: (produtoRequestDTO) => {
    return axiosClient.post(RESOURCE, produtoRequestDTO);
    // produtoRequestDTO: { nome, fornecedorId }
  },
};

export default produtoService;
