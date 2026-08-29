import { Routes, Route } from 'react-router-dom';
import DesktopLayout from '../components/layout/DesktopLayout';
import MobileLayout from '../components/layout/MobileLayout';

import Dashboard from '../pages/dashboard/Dashboard';
import FornecedorList from '../pages/fornecedor/FornecedorList';
import FornecedorDetalhe from '../pages/fornecedor/FornecedorDetalhe';
import EntradaList from '../pages/entrada/EntradaList';
import EntradaRelatorio from '../pages/entrada/EntradaRelatorio';
import ProdutoLocalizar from '../pages/produto/ProdutoLocalizar';
import MobileLocalizarProduto from '../pages/mobile/MobileLocalizarProduto';

/**
 * No mobile, a aplicação é restrita à funcionalidade de localização de
 * produtos (conforme definição do projeto). No desktop, todas as telas
 * de gestão do WMS ficam disponíveis através da sidebar.
 */
export function AppRoutesMobile() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="*" element={<MobileLocalizarProduto />} />
      </Route>
    </Routes>
  );
}

export function AppRoutesDesktop() {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fornecedores" element={<FornecedorList />} />
        <Route path="/fornecedores/:id" element={<FornecedorDetalhe />} />
        <Route path="/entradas" element={<EntradaList />} />
        <Route path="/entradas/relatorio" element={<EntradaRelatorio />} />
        <Route path="/produtos/localizar" element={<ProdutoLocalizar />} />
      </Route>
    </Routes>
  );
}
