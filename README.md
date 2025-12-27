# Base - Componentes Compartilhados ByteBank

## 📋 Visão Geral

O **@bytebank/base** é o microfrontend de infraestrutura compartilhada do ByteBank. Ele fornece componentes, serviços, hooks e estado global (Redux) que são utilizados por todos os outros microfrontends da aplicação.

Este MFE está **sempre ativo** em todas as rotas, funcionando como a camada de apresentação global e gerenciamento de estado centralizado.

## 🎯 Responsabilidades

### 1. **Componentes Globais**
- **Navbar**: Barra de navegação principal sempre visível
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
│   ├── bytebank-base.tsx           # Entry point Single-SPA
│   ├── components/
│   │   ├── index.tsx               # Barrel export
│   │   └── Navbar.tsx              # Componente de navegação
│   ├── store/
│   │   ├── index.ts                # Configuração Redux Store
│   │   └── slices/
│   │       ├── authSlice.ts        # Estado de autenticação
│   │       ├── accountSlice.ts     # Estado da conta
│   │       └── transactionSlice.ts # Estado de transações
│   ├── services/
│   │   ├── api.ts                  # Cliente HTTP
│   │   └── eventBus.ts             # Event Bus
│   ├── hooks/
│   │   └── index.ts                # Custom hooks
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── styles/
│       └── globals.css             # Estilos globais
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 📦 Exportações Principais

O @bytebank/base exporta tudo o que é necessário para outros MFEs:

```typescript
// Single-SPA lifecycle
export const { bootstrap, mount, unmount } = lifecycles;

// Redux Store
export * from './store';

// Redux Actions (com alias para evitar conflitos)
export { login, logout, clearError as clearAuthError } from './store/slices/authSlice';
export { selectAccount, updateBalance, clearAccount, clearError as clearAccountError } from './store/slices/accountSlice';
export { setFilters, clearFilters, setPage, clearError as clearTransactionError } from './store/slices/transactionSlice';

// Hooks, Services, Types, Components
export * from './hooks';
export * from './services/api';
export * from './services/eventBus';
export * from './types';
export * from './components';
```

## 🧩 Componentes

### Navbar Component

**Localização:** `src/components/Navbar.tsx`

**Funcionalidades:**
- Logo ByteBank com link para home
- Links de navegação (Dashboard, Financeiro)
- Informações do usuário logado
- Botão de logout
- Design responsivo

**Estrutura:**
```tsx
<nav className="navbar">
  <div className="navbar-logo">
    <Link to="/">ByteBank</Link>
  </div>
  
  <div className="navbar-links">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/financeiro">Financeiro</Link>
  </div>
  
  <div className="navbar-user">
    <span>{user?.name}</span>
    <button onClick={handleLogout}>Sair</button>
  </div>
</nav>
```

**Integração com Redux:**
```typescript
const user = useSelector((state: RootState) => state.auth.user);
const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(logout());
  // Emit evento para outros MFEs
  window.dispatchEvent(new Event('bytebank-logout'));
};
```

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Auth Slice

**Localização:** `src/store/slices/authSlice.ts`

**Estado:**
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Actions Síncronas:**
- `login(user, token)`: Define usuário autenticado
- `logout()`: Remove autenticação
- `clearError()`: Limpa mensagens de erro

**Actions Assíncronas (Thunks):**
```typescript
// Login do usuário
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao fazer login');
    }
  }
);

// Verificar token salvo
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('bytebank_token');
    if (!token) return rejectWithValue('Sem token');
    
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return rejectWithValue('Token inválido');
    }
  }
);
```

**Uso em Componentes:**
```typescript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '@bytebank/base';

const dispatch = useDispatch();
const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

// Login
await dispatch(loginUser({ email, password }));

// Logout
dispatch(logout());
```

### Account Slice

**Localização:** `src/store/slices/accountSlice.ts`

**Estado:**
```typescript
interface AccountState {
  accounts: Account[];
  selectedAccount: Account | null;
  balance: number;
  isLoading: boolean;
  error: string | null;
}

interface Account {
  id: string;
  accountNumber: string;
  agency: string;
  type: 'CHECKING' | 'SAVINGS';
  balance: number;
  userId: string;
}
```

**Actions Síncronas:**
- `selectAccount(account)`: Seleciona conta ativa
- `updateBalance(newBalance)`: Atualiza saldo
- `clearAccount()`: Limpa seleção
- `clearError()`: Limpa erros

**Actions Assíncronas:**
```typescript
// Buscar contas do usuário
export const fetchAccount = createAsyncThunk(
  'account/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/account?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar conta');
    }
  }
);
```

**Seletores:**
```typescript
export const selectAccountState = (state: RootState) => state.account;
export const selectSelectedAccount = (state: RootState) => state.account.selectedAccount;
export const selectBalance = (state: RootState) => state.account.balance;
```

### Transaction Slice

**Localização:** `src/store/slices/transactionSlice.ts`

**Estado:**
```typescript
interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: {
    type: 'all' | 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
    category: string;
    dateRange: { start: Date | null; end: Date | null };
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  category: string;
  date: string;
  accountId: string;
  balance: number;
}
```

**Actions Síncronas:**
- `setFilters(filters)`: Aplica filtros
- `clearFilters()`: Remove filtros
- `setPage(page)`: Muda página
- `clearError()`: Limpa erros

**Actions Assíncronas:**
```typescript
// Buscar transações
export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/account/${accountId}/statement`);
      return response.data.result?.transactions || [];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao buscar transações');
    }
  }
);

// Criar nova transação
export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (transaction: NewTransaction, { rejectWithValue }) => {
    try {
      const response = await api.post('/transaction', transaction);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erro ao criar transação');
    }
  }
);
```

**Seletores:**
```typescript
export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectFilteredTransactions = (state: RootState) => state.transactions.filteredTransactions;
export const selectTransactionFilters = (state: RootState) => state.transactions.filters;
export const selectPagination = (state: RootState) => state.transactions.pagination;

// Seletor com lógica de paginação
export const selectPaginatedTransactions = (state: RootState) => {
  const { filteredTransactions, pagination } = state.transactions;
  const start = (pagination.page - 1) * pagination.pageSize;
  return filteredTransactions.slice(start, start + pagination.pageSize);
};
```

## 🔌 Services

### API Service

**Localização:** `src/services/api.ts`

Cliente HTTP configurado com Axios:

```typescript
import axios from 'axios';

// Configuração base
export const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - adiciona token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bytebank_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response - trata erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - fazer logout
      localStorage.removeItem('bytebank_token');
      window.dispatchEvent(new Event('bytebank-logout'));
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Uso:**
```typescript
import { api } from '@bytebank/base';

// GET
const response = await api.get('/account/123/statement');

// POST
const response = await api.post('/transaction', {
  type: 'DEPOSIT',
  amount: 100,
  description: 'Depósito',
});

// PUT
const response = await api.put('/account/123', { balance: 1000 });

// DELETE
const response = await api.delete('/transaction/456');
```

### Event Bus

**Localização:** `src/services/eventBus.ts`

Sistema de eventos para comunicação entre MFEs:

```typescript
// Tipos de eventos
export enum ByteBankEvents {
  TRANSACTION_CREATED = 'bytebank:transaction-created',
  BALANCE_UPDATED = 'bytebank:balance-updated',
  LOGOUT = 'bytebank:logout',
  ACCOUNT_CHANGED = 'bytebank:account-changed',
}

// Emitir evento
export const emit = (eventName: ByteBankEvents, data?: any) => {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
};

// Escutar evento
export const on = (eventName: ByteBankEvents, callback: (data: any) => void) => {
  const handler = (event: Event) => {
    callback((event as CustomEvent).detail);
  };
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
};

// Escutar evento uma vez
export const once = (eventName: ByteBankEvents, callback: (data: any) => void) => {
  const handler = (event: Event) => {
    callback((event as CustomEvent).detail);
    window.removeEventListener(eventName, handler);
  };
  window.addEventListener(eventName, handler);
};
```

**Uso:**
```typescript
import { emit, on, ByteBankEvents } from '@bytebank/base';

// MFE Financeiro - emite evento após criar transação
const handleCreateTransaction = async (transaction) => {
  const result = await api.post('/transaction', transaction);
  emit(ByteBankEvents.TRANSACTION_CREATED, result.data);
};

// MFE Dashboard - escuta evento
useEffect(() => {
  const unsubscribe = on(ByteBankEvents.TRANSACTION_CREATED, (transaction) => {
    console.log('Nova transação:', transaction);
    // Atualizar dashboard
  });
  
  return unsubscribe; // Cleanup
}, []);
```

## 🎣 Hooks Personalizados

**Localização:** `src/hooks/index.ts`

```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Hooks tipados
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook para auth
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  return {
    ...auth,
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logout()),
  };
};

// Hook para conta
export const useAccount = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  
  return {
    ...account,
    fetchAccount: (userId) => dispatch(fetchAccount(userId)),
    selectAccount: (account) => dispatch(selectAccount(account)),
  };
};

// Hook para transações
export const useTransactions = () => {
  const transactions = useAppSelector((state) => state.transactions);
  const dispatch = useAppDispatch();
  
  return {
    ...transactions,
    fetch: (accountId) => dispatch(fetchTransactions(accountId)),
    create: (transaction) => dispatch(createTransaction(transaction)),
    setFilters: (filters) => dispatch(setFilters(filters)),
  };
};
```

## 📘 TypeScript Types

**Localização:** `src/types/index.ts`

```typescript
// Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
}

// Conta
export interface Account {
  id: string;
  accountNumber: string;
  agency: string;
  type: 'CHECKING' | 'SAVINGS';
  balance: number;
  userId: string;
  createdAt: string;
}

// Transação
export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  category: string;
  date: string;
  accountId: string;
  balance: number;
}

// Nova transação (sem ID)
export interface NewTransaction {
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description: string;
  category: string;
  accountId: string;
  targetAccountId?: string; // Para transferências
}

// Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
```

## 🎨 Estilos Globais

**Localização:** `src/styles/globals.css`

```css
/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design Tokens ByteBank */
:root {
  --bytebank-green: #47A138;
  --bytebank-green-dark: #3a8a2e;
  --bytebank-green-light: #59b449;
  --bytebank-black: #000000;
  --bytebank-gray: #CCCCCC;
  --bytebank-gray-light: #e4e1e1;
  --bytebank-gray-medium: #666666;
}

/* Reset e Base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f5f5f5;
  -webkit-font-smoothing: antialiased;
}

/* Utility Classes */
.btn-primary {
  background-color: var(--bytebank-green);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--bytebank-green-dark);
}
```

## 🔄 Integração com Outros MFEs

### No MFE Financeiro

```typescript
import React, { useEffect } from 'react';
import { useAccount, useTransactions, on, ByteBankEvents } from '@bytebank/base';

const FinanceiroApp = () => {
  const { selectedAccount } = useAccount();
  const { transactions, fetch } = useTransactions();
  
  useEffect(() => {
    if (selectedAccount) {
      fetch(selectedAccount.id);
    }
  }, [selectedAccount]);
  
  useEffect(() => {
    // Escutar mudanças na conta
    const unsubscribe = on(ByteBankEvents.ACCOUNT_CHANGED, (account) => {
      fetch(account.id);
    });
    
    return unsubscribe;
  }, []);
  
  return <div>{/* UI */}</div>;
};
```

### No MFE Dashboard

```typescript
import React from 'react';
import { useAuth, useAccount, useAppSelector } from '@bytebank/base';

const DashboardApp = () => {
  const { user, isAuthenticated } = useAuth();
  const { selectedAccount, balance } = useAccount();
  const transactions = useAppSelector(state => state.transactions.transactions);
  
  return (
    <div>
      <h1>Bem-vindo, {user?.name}!</h1>
      <p>Saldo: R$ {balance.toFixed(2)}</p>
      <p>Transações: {transactions.length}</p>
    </div>
  );
};
```

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type check
npm run type-check
```

## 📊 Dependências

### Produção
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^8.1.3",
  "@reduxjs/toolkit": "^1.9.7",
  "single-spa": "^5.9.5",
  "single-spa-react": "^6.0.0",
  "axios": "^1.6.0"
}
```

### Desenvolvimento
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.1.0",
  "typescript": "^5.3.0",
  "tailwindcss": "^3.4.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@types/single-spa-react": "^5.1.0"
}
```

## 🔍 Troubleshooting

### Redux DevTools não aparece
Verificar se extensão está instalada e `devTools: true` no store.

### Hooks não funcionam em outros MFEs
Garantir que o @bytebank/base está montado (sempre ativo em '/').

### Eventos não disparam
Verificar se Event Bus está sendo importado corretamente e eventos estão registrados.

## 👥 Equipe

**FIAP Grupo 30 - Tech Challenge 2**
