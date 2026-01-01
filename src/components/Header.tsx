import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="flex items-center sticky top-0 z-50 bg-[#000] pt-5 pb-5 text-white">
      <div className="w-full px-10">
        <div className="flex">
          <div className="flex w-full justify-between md:items-center lg:items-center xl:items-center sm:items-start xl:gap-20 lg:gap-9 md:gap-7 xl:justify-start md:justify-between sm:justify-between sm:w-full">
            <div className="md:order-2 sm:order-1">
              {/* <Navbar /> */}
            </div>
            <div className="md:order-1 sm:order-2">
              <Link to="/" aria-label="ByteBank - Página Inicial">
                <img 
                  src="src/assets/logo-green.svg" 
                  width={170}
                  height={32}
                  className="max-w-none sm:block md:block lg:hidden xl:block" 
                  alt="Logo ByteBank" 
                />
                <img 
                  src="src/assets/logo-small.svg" 
                  width={45} 
                  height={45} 
                  className="max-w-none hidden sm:hidden md:hidden lg:block xl:hidden" 
                  alt="Logo ByteBank - Small" 
                />
              </Link>              
            </div>
          </div>
          <div className="hidden sm:hidden md:hidden lg:block ml-7">
            <div className="flex gap-5 md:grid-cols-2">
              <Link 
                to="/cadastro"
                className="
                  inline-flex 
                  justify-center 
                  items-center 
                  h-11 
                  text-center 
                  rounded-[8px] 
                  bg-[#47a138] 
                  hover:bg-[#FFF] 
                  min-w-[180px] 
                  text-[16px] 
                  font-semibold 
                  hover:text-[#59b449] 
                  transition 
                  duration-300
                "
                aria-label="Abrir minha conta"
              >
                Abrir minha conta
              </Link>
              <Link
                to="/login"
                className="
                  inline-flex 
                  justify-center 
                  items-center 
                  h-11 
                  text-center 
                  rounded-[8px] 
                  bg-transparent 
                  hover:bg-[#47a138] 
                  border-[3px] 
                  border-[#47a138] 
                  min-w-[180px] 
                  text-[#47a138] 
                  hover:text-[#FFF] 
                  text-[16px] 
                  font-semibold 
                  transition 
                  duration-300
                "
                aria-label="Já tenho conta"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
