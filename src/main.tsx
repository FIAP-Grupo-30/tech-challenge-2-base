import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import './styles/globals.css';

console.log('🟢 @bytebank/base - Iniciando em modo standalone');

const App = () => (
  <Provider store={store}>
    <Navbar />
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #47A138, #3a8a2e)', 
        color: 'white', 
        padding: '2rem', 
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          ✅ Hello World - Base MicroFrontend
        </h1>
        <p>Componentes compartilhados (Navbar, Store, Services) funcionando!</p>
      </div>
    </main>
  </Provider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
