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

      <div className="flex flex-col min-h-screen">
        <bytebank-header
          id="bytebank-header"
          logo-url="logo-green.svg"
          logo-small-url="logo-small.svg"
          show-auth-buttons="true"
        />

        <main className="flex-1">
          <AppRoutes />
        </main>

        <bytebank-footer id="bytebank-footer" logo-url="logo-white.svg" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            try{
              const base = window.__BYTEBANK_ASSET_BASE__ || 'http://localhost:9001';
              const header = document.getElementById('bytebank-header');
              const footer = document.getElementById('bytebank-footer');
              if(header) header.setAttribute('asset-base', base);
              if(footer) footer.setAttribute('asset-base', base);
            }catch(e){console.warn('Failed to set asset-base for bytebank webcomponents', e)}
          })();
        `,
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
