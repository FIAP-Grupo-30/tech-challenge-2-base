# Base - Componentes Compartilhados ByteBank

## 📋 Visão Geral

O **@bytebank/base** é o microfrontend de infraestrutura compartilhada do ByteBank. Ele fornece componentes, serviços e hooks que são utilizados por todos os outros microfrontends da aplicação.

Este MFE está **sempre ativo** em todas as rotas, funcionando como a camada de apresentação global.

## 🎯 Responsabilidades

### 1. **Componentes Globais**
- **Header/Footer**: Componentes web (Web Components) sempre visíveis
- Componentes UI reutilizáveis (futuros: Modal, Toast, Spinner, etc.)

### 2. **Integração com Store Global (Zustand)**
- Acessa a store Zustand do `@bytebank/root` via Module Federation
- **Auth**: Autenticação e autorização do usuário
- **Account**: Dados da conta bancária selecionada
- **Transactions**: Transações financeiras com filtros e paginação

### 3. **Serviços Compartilhados**
- **API Service**: Cliente HTTP configurado para comunicação com backend
- **Event Bus**: Sistema de eventos customizados para comunicação entre MFEs

### 4. **Hooks Personalizados**
- Lógica reutilizável encapsulada
- Acesso facilitado à store Zustand global

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
│   ├── model/
│   │   └── types.ts                # Tipos TypeScript compartilhados
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
import App from '../App';
import '../styles/globals.css';

const ByteBankBase = () => <App />;

export default ByteBankBase;
```

## 🔄 Integração com Store Global

O microfrontend base acessa a store Zustand global via Module Federation do `@bytebank/root`:

```typescript
// Importar store via Module Federation
import useStore from '@bytebank/root/bytebank-store';

// Usar a store nos componentes
const auth = useStore((state) => state.auth);
const login = useStore((state) => state.login);

// Chamar actions
await login({ email, password });
```

## 🧩 Componentes

### Web Components (Header/Footer)

**Localização:** `src/components/ByteBankHeader.js` e `ByteBankFooter.js`

Componentes web customizados que são carregados via bridge e integrados com React Router.

### Bridges (HeaderBridge/FooterBridge)

**Localização:** `src/HeaderBridge.tsx` e `FooterBridge.tsx`

Componentes React que fazem a ponte entre os Web Components e o React Router, permitindo navegação e sincronização de estado.

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

### Uso de Prefixos Tailwind CSS

⚠️ **IMPORTANTE**: Este projeto utiliza o prefixo `base:` para todas as classes Tailwind CSS para evitar conflitos com outros microfrontends.

#### Configuração

O prefixo é configurado no arquivo `src/globals.css`:

```css
@import "tailwindcss" prefix(base);
```

#### Como Usar Classes Tailwind

Todas as classes Tailwind usadas diretamente no JSX devem incluir o prefixo `base:`:

```tsx
// ✅ CORRETO - Com prefixo
<div className="base:flex base:items-center base:justify-center">
  <p className="base:text-2xl base:font-bold base:text-white">Conteúdo</p>
</div>

// ❌ ERRADO - Sem prefixo (pode causar conflitos)
<div className="flex items-center justify-center">
  <p className="text-2xl font-bold text-white">Conteúdo</p>
</div>
```

#### Variantes e Responsividade

Para variantes como `hover:`, `focus:`, e breakpoints responsivos (`md:`, `lg:`, etc.), use o formato `[prefixo]:[variante]:[classe]`:

```tsx
// Hover
<button className="base:bg-green-500 base:hover:bg-green-600">

// Responsividade
<div className="base:flex base:flex-col base:md:flex-row">

// Classes arbitrárias
<div className="base:bg-[#47A138] base:w-[170px]">
```

#### No @apply (globals.css)

Quando usar `@apply` dentro de `@layer components`, use o formato `[prefixo]:[variante]:[classe]`:

```css
@layer components {
  .minha-classe {
    @apply base:bg-white base:hover:bg-gray-100 base:md:flex;
  }
}
```

#### Classes Customizadas (NÃO precisam de prefixo)

Classes customizadas definidas em `@layer components` (como `.btn-bytebank-primary`) **NÃO** precisam de prefixo, pois já são nomes únicos:

```tsx
// ✅ CORRETO - Classe customizada sem prefixo
<button className="btn-bytebank-primary">Clique aqui</button>
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
  "react-router-dom": "^7.12.0",
  "zustand": "^5.0.10"
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

## 🛠️ Plataforma de hospedagem

Vercel - https://vercel.com/

## 👥 Equipe

**FIAP Grupo 30 - Tech Challenge 2**

## 📄 Licença

MIT License
