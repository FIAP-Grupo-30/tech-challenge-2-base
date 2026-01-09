import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // If dashboard is a separate MFE mounted at /dashboard, navigate there
    navigate('/dashboard', { replace: true });
    // fallback: if external MFE is at a different origin, use window.location
    // window.location.href = '/dashboard';
  }, [navigate]);
  return null;
}
