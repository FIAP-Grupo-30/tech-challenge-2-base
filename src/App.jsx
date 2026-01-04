import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import HeaderBridge from './HeaderBridge';
import FooterBridge from './FooterBridge';

import './components/ByteBankHeader';
import './components/ByteBankFooter';

function App() {
  return (
    <BrowserRouter>
      {/* Bridges */}
      <HeaderBridge />
      <FooterBridge />

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <bytebank-header 
          logo-url="/logo-green.svg"
          logo-small-url="/logo-small.svg"
          show-auth-buttons="true"
        />

        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>

        <bytebank-footer logo-url="/logo-white.svg" />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
