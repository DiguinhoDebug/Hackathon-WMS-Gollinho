# Gollinho WMS — Front-end

Front-end do sistema de gestão de armazém (WMS) da Indústria de Bebidas
Gollinho. React + Vite + Tailwind CSS + Axios + SweetAlert2, consumindo uma
API Java/Spring Boot.

## Como rodar

```bash
npm install
cp .env.example .env   # ajuste VITE_API_BASE_URL para a URL real do back-end
npm run dev
```

Abra `http://localhost:5173`. Redimensione a janela (ou abra em um celular)
para menos de 768px de largura para ver a interface mobile.

## Estrutura

```
src/
  api/            Axios: cliente base + um serviço por entidade (URLs comentadas)
  components/
    layout/       Sidebar, Topbar, layout desktop e layout mobile
    ui/           Componentes reutilizáveis (Button, Card, Table, Modal, Input...)
  hooks/          useIsMobile — decide qual layout/rotas renderizar
  pages/
    dashboard/    Painel inicial (atalhos)
    fornecedor/   Listagem, cadastro/edição (modal) e detalhe do fornecedor
    entrada/      Listagem, cadastro (modal) e relatório de entradas
    produto/      Localizar produto (versão desktop)
    mobile/       Localizar produto (versão mobile, tela única)
  routes/         Definição das rotas desktop e mobile
  utils/          Formatadores, constantes e wrapper do SweetAlert2
```

## Decisões de projeto

- **Desktop vs. mobile**: conforme especificado, o mobile é um app enxuto
  focado exclusivamente em "Localizar produto" (`useIsMobile` troca todo o
  conjunto de rotas). O desktop tem a gestão completa (Fornecedor, Entrada,
  Produto) com sidebar de navegação.
- **Identidade visual**: paleta branco/azul (`tailwind.config.js`, cor `wms`),
  tipografia Inter, cards com sombra suave e cantos arredondados — visual de
  sistema de gestão corporativo, sem elementos decorativos supérfluos.
- **Endereço e Prateleira**: como não apareceram como classes próprias
  (Model/DTO/Repository/Service/Controller) na documentação, foram tratadas
  como objetos aninhados: `endereco` dentro do Fornecedor, e `prateleira`
  (andar, coluna, quantidade) dentro da resposta de "Localizar produto".
  Se no back-end forem entidades com endpoints próprios, é só ajustar os
  services correspondentes.
- **URLs do Axios**: os paths (`/fornecedores`, `/entradas`, `/produtos`) e
  parâmetros de cada chamada estão comentados em
  `src/api/*.js` para facilitar o ajuste quando as rotas reais da API forem
  definidas. Note que a documentação lista as classes de back-end como
  `Cliente*` (Model/DTO/Repository/Service/Controller) para o que no domínio
  chamamos de "Fornecedor" — deixei um comentário em
  `fornecedorService.js` sinalizando essa possível divergência de nome/path.
- **SweetAlert2**: usado para confirmações (ex.: alterar status de
  fornecedor) e feedback de sucesso/erro após chamadas à API, com uma
  instância (`src/utils/alertas.js`) já estilizada com as cores do sistema.

## Pendências / dúvidas para alinhar com você

1. **Nomenclatura back-end**: o domínio "Fornecedor" corresponde à classe
   `Cliente` no back-end (Model/DTO/Repository/Service/Controller)? Se sim,
   qual o path real do endpoint (`/clientes` ou `/fornecedores`)?
2. **Autenticação**: o sistema terá login/JWT? Se sim, preciso das rotas de
   login e como o token deve ser enviado (já deixei o interceptor do Axios
   pronto para isso).
3. **Endereço e Prateleira**: são entidades com endpoints/CRUD próprios ou
   sempre embutidas em Fornecedor/Produto, como assumi?
4. **Paginação**: a API retorna listas paginadas (Spring `Page`, com
   `content`, `totalPages` etc.) ou uma lista simples? Os services já tratam
   os dois formatos, mas a paginação de tela (botões "próxima página") ainda
   não foi implementada.
5. **Relatório de entradas**: deve ser exibido em tela (tabela, como
   implementado), exportado em PDF/Excel, ou ambos? Deixei um método
   `baixarRelatorioPdf` já preparado, mas comentado como suposição.
6. **Cadastro de Produto**: a documentação cita "Localizar um produto" como
   única ação da tela de Produto — o cadastro de produto (nome, fornecedor)
   deve ter uma tela própria, ou é feito por outro meio (import, admin)?
7. **Status do fornecedor**: quais são os valores possíveis? Assumi
   `ATIVO`/`INATIVO` (ver `src/utils/constants.js`).

Fico à disposição para ajustar qualquer um desses pontos assim que a
documentação completa (ou o Swagger da API) estiver disponível.
