import { useNavigate } from 'react-router-dom';
import vantagensMock from '../data/vantagens.json';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      
      <div className="bg-gradient-to-b from-[#004D61] to-[#FFF] pt-10 pb-23">
        <div className="container mx-auto">

          {/* BANNER */}
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-18 gap-14 p-5">
            <section>
              <div className="flex items-center h-full">
                <div>
                  <h1 className="font-bold text-[33px] leading-[1.5em] lg:text-left md:text-center text-center">
                    Experimente mais liberdade no controle da sua vida
                    financeira. Crie sua conta com a gente!
                  </h1>
                </div>
              </div>
            </section>

            <section>
              <img
                className="mx-auto"
                src="/banner-home.svg"
                alt="Banner"
                width="900"
                height="450"
              />
            </section>
          </div>

          {/* CTA MOBILE */}
          <div className="sm:block md:block lg:hidden mb-18 pl-4 pr-4">
            <div className="flex gap-5 md:grid-cols-2">
              
              <button
                onClick={() => navigate('/cadastro')}
                className="inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-[#000] hover:bg-[transparent] border-[3px] border-[#000] w-full font-semibold text-[#FFF] text-[19px] hover:text-[#000] transition duration-300"
                aria-label="Abrir minha conta"
              >
                Abrir minha conta
              </button>

              <button
                onClick={() => navigate('/login')}
                className="inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-transparent hover:bg-[#000] border-[3px] border-[#000] w-full font-semibold text-[#000] hover:text-[#FFF] text-[19px] transition duration-300"
                aria-label="Já tenho conta"
              >
                Já tenho conta
              </button>

            </div>
          </div>

          {/* VANTAGENS */}
          <div>
            <h2 className="text-center font-bold text-[30px] mb-16">
              Vantagens do nosso banco:
            </h2>

            <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {vantagensMock.map((vantagem) => (
                <section key={vantagem.id} className="text-center p-4">
                  <figure>
                    <img
                      className="mx-auto"
                      src={vantagem.imagemUrl}
                      alt={vantagem.titulo}
                      width="74"
                      height="56"
                    />
                  </figure>

                  <h3 className="font-bold text-[22px] text-[#47A138] mt-5 mb-5">
                    {vantagem.titulo}
                  </h3>

                  <p className="text-[#767676] text-[19px]">
                    {vantagem.descricao}
                  </p>
                </section>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
