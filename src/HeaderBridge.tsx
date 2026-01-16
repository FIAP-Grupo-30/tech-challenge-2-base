import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavClickEvent extends CustomEvent {
  detail?: {
    href: string;
  };
}

interface AuthClickEvent extends CustomEvent {
  detail?: {
    href: string;
  };
}

export default function HeaderBridge() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onNavClick = (e: Event) => {
      const event = e as NavClickEvent;
      if (event.detail?.href) {
        navigate(event.detail.href);
      }
    };

    const onLogoClick = () => {
      navigate('/');
    };

    const onAuthClick = (e: Event) => {
      const event = e as AuthClickEvent;
      if (event.detail?.href) {
        navigate(event.detail.href);
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
    const header = document.querySelector('bytebank-header') as ByteBankHeaderElement | null;
    if (header?.setActiveMenuItem) {
      header.setActiveMenuItem(location.pathname);
    }
  }, [location.pathname]);

  return null;
}
