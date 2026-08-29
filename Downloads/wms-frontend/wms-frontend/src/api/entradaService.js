import axiosClient from './axiosClient';

const RESOURCE = '/entradas';

const entradaService = {
  // GET /entradas - lista entradas, com filtros de período/produto/fornecedor
  listar: (params) => {
    return axiosClient.get(RESOURCE, { params });
    // params sugeridos: { dataInicio, dataFim, produtoId, fornecedorId, page, size }
  },

  // GET /entradas/:id - consulta uma entrada específica
  consultarPorId: (id) => {
    return axiosClient.get(`${RESOURCE}/${id}`);
  },

  // POST /entradas - cadastra uma nova entrada de estoque
  cadastrar: (entradaRequestDTO) => {
    return axiosClient.post(RESOURCE, entradaRequestDTO);
    // entradaRequestDTO: { dia, hora, produtoId, fornecedorId }
  },

  // GET /entradas/relatorio - gera relatório de entradas (retorna dados para exibição/exportação)
  gerarRelatorio: (params) => {
    return axiosClient.get(`${RESOURCE}/relatorio`, { params });
    // params sugeridos: { dataInicio, dataFim, fornecedorId, produtoId }
  },

  // GET /entradas/relatorio/pdf - baixa o relatório em PDF (caso o back-end gere o arquivo)
  baixarRelatorioPdf: (params) => {
    return axiosClient.get(`${RESOURCE}/relatorio/pdf`, {
      params,
      responseType: 'blob',
    });
  },
};

export default entradaService;
