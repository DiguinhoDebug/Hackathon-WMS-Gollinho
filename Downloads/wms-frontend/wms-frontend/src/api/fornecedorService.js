import axiosClient from './axiosClient';

/**
 * Serviço de Fornecedor.
 *
 * Observação: no back-end (Spring Boot) a classe corresponde a
 * ClienteController / ClienteService / ClienteRepository, então o path
 * pode precisar ser "/clientes" em vez de "/fornecedores" — ajuste a
 * constante abaixo conforme o endpoint real exposto pela API.
 */
const RESOURCE = '/fornecedores'; // troque para '/clientes' se for o path real da API

const fornecedorService = {
  // GET /fornecedores - lista todos os fornecedores (com filtros opcionais)
  listar: (params) => {
    return axiosClient.get(RESOURCE, { params });
    // params sugeridos: { razaoSocial, cnpj, status, page, size }
  },

  // GET /fornecedores/:id - consulta dados de um fornecedor específico
  consultarPorId: (id) => {
    return axiosClient.get(`${RESOURCE}/${id}`);
  },

  // GET /fornecedores/:id/entradas - consulta as entradas vinculadas ao fornecedor
  consultarEntradas: (id) => {
    return axiosClient.get(`${RESOURCE}/${id}/entradas`);
  },

  // POST /fornecedores - cadastra um novo fornecedor
  cadastrar: (fornecedorRequestDTO) => {
    return axiosClient.post(RESOURCE, fornecedorRequestDTO);
    // fornecedorRequestDTO: { razaoSocial, cnpj, endereco: { rua, numero, bairro, cidade, estado } }
  },

  // PUT /fornecedores/:id - atualiza dados cadastrais do fornecedor
  atualizar: (id, fornecedorRequestDTO) => {
    return axiosClient.put(`${RESOURCE}/${id}`, fornecedorRequestDTO);
  },

  // PATCH /fornecedores/:id/status - altera o status (ativo/inativo) do fornecedor
  alterarStatus: (id, status) => {
    return axiosClient.patch(`${RESOURCE}/${id}/status`, { status });
  },
};

export default fornecedorService;
