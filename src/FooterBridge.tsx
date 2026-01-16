import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceClickEvent extends CustomEvent {
  detail?: {
    href: string;
  };
}

export default function FooterBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    const onServiceClick = (e: Event) => {
      const event = e as ServiceClickEvent;
      if (event.detail?.href) {
        navigate(event.detail.href);
      }
    };

    window.addEventListener('service-click', onServiceClick);

    return () => {
      window.removeEventListener('service-click', onServiceClick);
    };
  }, [navigate]);

  return null;
}
