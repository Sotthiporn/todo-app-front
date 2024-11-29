import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;
