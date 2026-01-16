# Base - Componentes Compartilhados ByteBank

## 📋 Visão Geral

O **@bytebank/base** é o microfrontend de infraestrutura compartilhada do ByteBank. Ele fornece componentes, serviços, hooks e estado global (Redux) que são utilizados por todos os outros microfrontends da aplicação.

Este MFE está **sempre ativo** em todas as rotas, funcionando como a camada de apresentação global e gerenciamento de estado centralizado.

## 🎯 Responsabilidades

### 1. **Componentes Globais**
- **Header/Footer**: Componentes web (Web Components) sempre visíveis
- Componentes UI reutilizáveis (futuros: Modal, Toast, Spinner, etc.)

### 2. **Gerenciamento de Estado (Redux)**
- **Auth Slice**: Autenticação e autorização do usuário
- **Account Slice**: Dados da conta bancária selecionada
- **Transaction Slice**: Transações financeiras com filtros e paginação

### 3. **Serviços Compartilhados**
- **API Service**: Cliente HTTP configurado para comunicação com backend
- **Event Bus**: Sistema de eventos customizados para comunicação entre MFEs

### 4. **Hooks Personalizados**
- Lógica reutilizável encapsulada
- Acesso facilitado ao Redux Store

### 5. **Tipos TypeScript**
- Interfaces e tipos compartilhados
- Garantia de type-safety entre MFEs

## 🏗️ Arquitetura

```
tech-challenge-2-base/
├── src/
│   ├── bytebank-base.tsx           # Entry point Module Federation
│   ├── App.tsx                     # Componente principal
│   ├── main.tsx                    # Ponto de entrada React
│   ├── routes.tsx                  # Configuração de rotas
│   ├── HeaderBridge.tsx            # Bridge para Web Components Header
│   ├── FooterBridge.tsx            # Bridge para Web Components Footer
│   ├── components/
│   │   ├── ByteBankHeader.js       # Web Component Header
│   │   ├── ByteBankFooter.js       # Web Component Footer
│   │   └── index.js                # Barrel export
│   ├── pages/
│   │   ├── Home.tsx                # Página inicial
│   │   ├── Login.tsx                # Página de login
│   │   ├── Cadastro.tsx            # Página de cadastro
│   │   └── DashboardRedirect.tsx   # Redirect para dashboard
│   ├── store/
│   │   ├── index.ts                # Configuração Redux Store
│   │   └── slices/
│   │       ├── authSlice.ts        # Estado de autenticação
│   │       ├── accountSlice.ts      # Estado da conta
│   │       └── transactionSlice.ts # Estado de transações
│   ├── services/
│   │   ├── api.ts                  # Cliente HTTP
│   │   └── eventBus.ts             # Event Bus
│   ├── hooks/
│   │   └── index.ts                # Custom hooks
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── index.css                   # Estilos globais (Tailwind CSS v4)
├── vite.config.ts                  # Configuração Vite + Module Federation
├── package.json
├── tsconfig.json
├── biome.json                      # Configuração BiomeJS
├── .tool-versions                  # Versão Node.js (asdf)
└── README.md
```

## 📦 Exportações Principais

O @bytebank/base exporta o componente principal via Module Federation:

```typescript
// Entry point: src/bytebank-base.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

const ByteBankBase = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ByteBankBase;
```

O Redux Store é exposto globalmente para outros microfrontends:

```typescript
// Store disponível globalmente
(window as any).__BYTEBANK_STORE__ = store;
```

## 🧩 Componentes

### Web Components (Header/Footer)

**Localização:** `src/components/ByteBankHeader.js` e `ByteBankFooter.js`

Componentes web customizados que são carregados via bridge e integrados com React Router.

### Bridges (HeaderBridge/FooterBridge)

**Localização:** `src/HeaderBridge.tsx` e `FooterBridge.tsx`

Componentes React que fazem a ponte entre os Web Components e o React Router, permitindo navegação e sincronização de estado.

## 🗃️ Redux Store

### Configuração Central

**Localização:** `src/store/index.ts`

```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transactions: transactionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true, // Redux DevTools habilitado
});

// Expõe a store globalmente para os microfrontends
(window as any).__BYTEBANK_STORE__ = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Slices

- **Auth Slice**: Gerencia autenticação do usuário
- **Account Slice**: Gerencia dados da conta selecionada
- **Transaction Slice**: Gerencia transações financeiras

## 🔌 Services

### API Service

**Localização:** `src/services/api.ts`

Cliente HTTP configurado com interceptors para autenticação e tratamento de erros.

### Event Bus

**Localização:** `src/services/eventBus.ts`

Sistema de eventos para comunicação entre MFEs.

## 🎨 Estilos Globais

**Localização:** `src/index.css`

```css
@import 'tailwindcss';

/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  background-color: #f5f5f5;
  -webkit-font-smoothing: antialiased;
}

/* Variáveis CSS ByteBank */
:root {
  --bytebank-green: #47a138;
  --bytebank-green-dark: #3a8a2e;
  --bytebank-green-light: #59b449;
  --bytebank-black: #000000;
  --bytebank-gray: #cccccc;
  --bytebank-gray-light: #e4e1e1;
  --bytebank-gray-medium: #666666;
}
```

## 🛠️ Comandos

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento na porta 9001.

### Build
```bash
npm run build
```
Cria build de produção na pasta `dist/`.

### Preview
```bash
npm run preview
```
Serve o build de produção para testes.

### Linting e Formatação
```bash
npm run lint      # Verifica problemas de código
npm run format    # Formata o código
npm run check     # Executa lint + format
```

## 📊 Dependências

### Produção
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "react-redux": "^9.1.0",
  "react-router-dom": "^7.12.0",
  "@reduxjs/toolkit": "^2.2.1",
  "@bytebank/shared": "git+https://github.com/FIAP-Grupo-30/shared.git"
}
```

### Desenvolvimento
```json
{
  "vite": "^7.3.1",
  "@originjs/vite-plugin-federation": "^1.4.1",
  "@vitejs/plugin-react": "^5.1.2",
  "@tailwindcss/vite": "^4.1.18",
  "tailwindcss": "^4.1.18",
  "@biomejs/biome": "^2.3.11",
  "@types/react": "^19.2.8",
  "@types/react-dom": "^19.2.3",
  "typescript": "^5.9.3"
}
```

## 🔍 Troubleshooting

### Redux DevTools não aparece
Verificar se extensão está instalada e `devTools: true` no store.

### Web Components não carregam
Verificar se o arquivo `bytebank-ui.js` está sendo carregado corretamente e se os bridges estão montados.

### Module Federation não funciona
Verificar se o remote está configurado corretamente no root-config e se a porta 9001 está acessível.

## 🔧 Gerenciamento de Versões

### Node.js
O projeto utiliza **Node.js LTS 24.12.0**, gerenciado via **asdf**. A versão está especificada no `package.json` (engines) e no `.tool-versions`.

Para configurar o ambiente:
```bash
asdf install nodejs 24.12.0
asdf local nodejs 24.12.0
```

## 👥 Equipe

**FIAP Grupo 30 - Tech Challenge 2**

## 📄 Licença

MIT License
