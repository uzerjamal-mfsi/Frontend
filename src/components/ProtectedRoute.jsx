import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../lib/token-storage';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate('/login', { replace: true });
    }
  });
  return getToken() ? children : null;
}
