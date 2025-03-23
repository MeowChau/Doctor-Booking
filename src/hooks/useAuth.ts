import { useState, useEffect } from 'react';

export interface AuthState {
  isLoggedIn: boolean;
  loggedInUser: string | null;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    loggedInUser: localStorage.getItem('loggedInUser'),
  });

  const login = (email: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', email);
    setAuthState({ isLoggedIn: true, loggedInUser: email });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setAuthState({ isLoggedIn: false, loggedInUser: null });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUser = localStorage.getItem('loggedInUser');
    setAuthState({ isLoggedIn, loggedInUser });
  }, []);

  return { authState, login, logout };
};

export default useAuth;
