import axios from 'axios';

/**
 * Cliente HTTP centralizado da aplicação.
 *
 * A URL base deve apontar para a API Java Spring Boot do WMS Gollinho.
 * Ajuste o valor de VITE_API_BASE_URL no arquivo .env conforme o ambiente
 * (local, homologação, produção).
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição: local ideal para futuramente anexar token JWT, ex:
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('wms_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// Interceptor de resposta: centraliza tratamento de erros HTTP
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const mensagem =
      error?.response?.data?.message ||
      error?.response?.data?.erro ||
      error?.message ||
      'Erro inesperado ao comunicar com o servidor.';

    if (status === 401) {
      // TODO: redirecionar para login / limpar sessão quando autenticação for implementada
    }

    return Promise.reject({ status, mensagem, original: error });
  }
);

export default axiosClient;
