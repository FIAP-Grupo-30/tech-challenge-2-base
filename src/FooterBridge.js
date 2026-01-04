import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FooterBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    const onServiceClick = (e) => {
      if (e.detail?.href) {
        navigate(e.detail.href);
      }
    };

    window.addEventListener('service-click', onServiceClick);

    return () => {
      window.removeEventListener('service-click', onServiceClick);
    };
  }, [navigate]);

  return null;
}
