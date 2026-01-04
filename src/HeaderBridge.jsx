import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HeaderBridge() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onNavClick = (e) => {
      if (e.detail?.href) {
        navigate(e.detail.href);
      }
    };

    const onLogoClick = () => {
      navigate('/');
    };

    const onAuthClick = (e) => {
      if (e.detail?.href) {
        navigate(e.detail.href);
      }
    };

    window.addEventListener('nav-click', onNavClick);
    window.addEventListener('logo-click', onLogoClick);
    window.addEventListener('auth-click', onAuthClick);

    return () => {
      window.removeEventListener('nav-click', onNavClick);
      window.removeEventListener('logo-click', onLogoClick);
      window.removeEventListener('auth-click', onAuthClick);
    };
  }, [navigate]);

  // 🔄 Sincronizar rota ativa no Header
  useEffect(() => {
    const header = document.querySelector('bytebank-header');
    header?.setActiveMenuItem(location.pathname);
  }, [location.pathname]);

  return null;
}
