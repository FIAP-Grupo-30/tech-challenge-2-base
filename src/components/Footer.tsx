import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#000] pt-9 pb-9 text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 p-4 gap-8">
          {/* Serviços */}
          <section aria-labelledby="services">
            <h4
              id="services"
              className="mb-5 text-[20px] font-semibold text-[#47a138]"
            >
              Serviços
            </h4>
            <nav aria-label="Serviços">
              <ul className="space-y-3 text-lg" role="list">
                <li>
                  <Link to="#" className="hover:text-[#47a138]" rel="noopener noreferrer">Dashboard</Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-[#47a138]" rel="noopener noreferrer">Financeiro</Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-[#47a138]" rel="noopener noreferrer">Conta corrente</Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-[#47a138]" rel="noopener noreferrer">Conta PJ</Link>                  
                </li>
                <li>
                  <Link to="#" className="hover:text-[#47a138]" rel="noopener noreferrer">Cartão de Crédito</Link>                                    
                </li>
              </ul>
            </nav>
          </section>

          {/* Contato */}
          <section aria-labelledby="contact">
            <h4
              id="contact"
              className="mb-5 text-[20px] font-semibold text-[#47a138]"
            >
              Contato
            </h4>
            <p className="mb-3 text-lg">(11) 0800-000-0000</p>
            <p className="mb-3 text-lg">meajuda@bytebank.com.br</p>
            <p className="mb-3 text-lg">ouvidoria@bytebank.com.br</p>
          </section>

          {/* Desenvolvido por Bytebank */}
          <section aria-labelledby="developer-by-bytebank">
            <h4
              id="developer-by-bytebank"
              className="mb-5 text-[20px] font-semibold text-[#47a138] lg:text-center xl:text-center"
            >
              Desenvolvido por Bytebank
            </h4>
            <figure className="flex mt-3 mb-8 lg:justify-center xl:justify-center">
              <img src="src/assets/logo-white.svg" height={35} width={180} alt="Logo Branco" />              
            </figure>
            <nav
              className="flex items-center lg:justify-center xl:justify-center"
              aria-label="Desenvolvido por Bytebank"
            >
              <ul className="flex items-center space-x-9" role="list">
                <li>
                  <Link to="#" target="_blank" rel="noopener noreferrer"><img src="src/assets/instagram.svg" width={36} height={36} alt="Instagram" /></Link>
                </li>
                <li>
                  <Link to="#" target="_blank" rel="noopener noreferrer"><img src="src/assets/whatsapp.svg" width={36} height={36} alt="WhatsApp" /></Link>                  
                </li>
                <li>
                  <Link to="#" target="_blank" rel="noopener noreferrer"><img src="src/assets/youtube.svg" width={36} height={36} alt="YouTube" /></Link>                                    
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </footer>
  );
}
