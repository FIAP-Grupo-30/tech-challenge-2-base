import React from 'react';
import * as ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import './styles/globals.css';

console.log('🟢 @bytebank/base - Módulo carregado com sucesso!');

// Componente Root para o Single SPA
const Root: React.FC = () => {
  console.log('🟢 @bytebank/base - Renderizando Navbar...');
  return (
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
};

// Configuração Single SPA React
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('navbar') || document.body,
  errorBoundary(err: Error, info: any, props: any) {
    console.error('❌ Erro no @bytebank/base:', err, info);
    return <div className="text-red-500 p-4">Erro ao carregar navbar</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

// Exporta tudo para os outros MFEs consumirem
export * from './store';
export { login, logout, clearError as clearAuthError } from './store/slices/authSlice';
export { selectAccount, updateBalance, clearAccount, clearError as clearAccountError } from './store/slices/accountSlice';
export { setFilters, clearFilters, setPage, clearError as clearTransactionError } from './store/slices/transactionSlice';
export * from './hooks';
export * from './services/api';
export * from './services/eventBus';
export * from './types';
export * from './components';
