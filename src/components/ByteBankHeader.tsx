import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  name: string;
  href: string;
}

interface ByteBankHeaderProps {
  logoUrl?: string;
  logoSmallUrl?: string;
  showAuthButtons?: boolean;
  assetBase?: string;
  navItems?: NavItem[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Financeiro', href: '/financeiro' },
  { name: 'Para você', href: '/paravoce' },
];

const ByteBankHeader: React.FC<ByteBankHeaderProps> = ({
  logoUrl = 'logo-green.svg',
  logoSmallUrl = 'logo-small.svg',
  showAuthButtons = true,
  assetBase = '',
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const resolveAsset = (path: string): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${assetBase}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleAuthClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-black text-white py-5 sticky top-0 z-50">
      <div className="w-full px-6 md:px-10">
        <div className="flex w-full justify-between items-center gap-5">
          {/* NAVBAR - Mobile/Tablet */}
          <div className="lg:order-2 lg:flex-1">
            <nav className="flex items-center">
              {/* Mobile Toggle */}
              <button
                type="button"
                className="lg:hidden bg-transparent border-none cursor-pointer p-2"
                onClick={toggleMobileMenu}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-9 h-9 stroke-[#47A138] stroke-2" fill="none" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Desktop Links */}
              <ul className="hidden lg:flex gap-10 xl:gap-16 list-none items-center">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.href)}
                      className={`text-[#47A138] no-underline text-[19px] font-medium transition-all duration-300 cursor-pointer hover:underline ${
                        isActive(item.href) ? 'font-semibold' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* LOGO */}
          <div className="lg:order-1 flex-shrink-0">
            <button
              type="button"
              onClick={handleLogoClick}
              className="inline-block leading-none"
              aria-label="ByteBank - Página Inicial"
            >
              {/* Logo grande - Mobile e Desktop */}
              <img
                src={resolveAsset(logoUrl)}
                alt="Logo ByteBank"
                className="block md:hidden lg:block w-[170px] h-[38px] lg:mr-[60px]"
              />
              {/* Logo pequeno - Tablet */}
              <img
                src={resolveAsset(logoSmallUrl)}
                alt="Logo ByteBank - Small"
                className="hidden md:block lg:hidden w-[45px] h-[45px]"
              />
            </button>
          </div>

          {/* AUTH BUTTONS */}
          {showAuthButtons && (
            <div className="hidden xl:flex gap-5 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleAuthClick('/cadastro')}
                className="inline-flex justify-center items-center h-11 text-center rounded-lg min-w-[180px] text-base font-semibold transition-all duration-300 no-underline cursor-pointer whitespace-nowrap bg-[#47a138] text-white border-none hover:bg-white hover:text-[#59b449]"
              >
                Abrir minha conta
              </button>
              <button
                type="button"
                onClick={() => handleAuthClick('/login')}
                className="inline-flex justify-center items-center h-11 text-center rounded-lg min-w-[180px] text-base font-semibold transition-all duration-300 no-underline cursor-pointer whitespace-nowrap bg-transparent border-[3px] border-[#47a138] text-[#47a138] hover:bg-[#47a138] hover:text-white"
              >
                Já tenho conta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-[73px] left-0 right-0 bg-black border-t border-[rgba(71,161,56,0.2)] px-6 md:px-10 flex-col gap-2 max-h-[calc(100vh-73px)] overflow-y-auto z-40 transition-all duration-300 ${
          mobileMenuOpen ? 'flex' : 'hidden'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => handleNavClick(item.href)}
            className="block py-4 border-b border-[rgba(71,161,56,0.1)] text-left text-[#47A138] no-underline text-[19px] font-medium transition-all duration-300 cursor-pointer hover:underline"
          >
            {item.name}
          </button>
        ))}

        {showAuthButtons && (
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleAuthClick('/cadastro')}
              className="w-full inline-flex justify-center items-center h-11 text-center rounded-lg text-base font-semibold transition-all duration-300 no-underline cursor-pointer whitespace-nowrap bg-[#47a138] text-white border-none hover:bg-white hover:text-[#59b449]"
            >
              Abrir minha conta
            </button>
            <button
              type="button"
              onClick={() => handleAuthClick('/login')}
              className="w-full inline-flex justify-center items-center h-11 text-center rounded-lg text-base font-semibold transition-all duration-300 no-underline cursor-pointer whitespace-nowrap bg-transparent border-[3px] border-[#47a138] text-[#47a138] hover:bg-[#47a138] hover:text-white"
            >
              Já tenho conta
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ByteBankHeader;
