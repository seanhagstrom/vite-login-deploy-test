import React, { useEffect, useState, createContext } from 'react';
import { me } from '../axios-services/auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, settoken] = useState(''); //initially token is an empty string.
  //if the empty string is found we should be logged out.
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    settoken(localStorage['fit-token'] || '');
    if (localStorage['fit-token']) {
      (async () => {
        const result = await me(localStorage['fit-token']);
        setUser(result);
      })();

      // const getMe = async () => {
      //   const result = await me(localStorage['fit-token']);
      //   setUser(result);
      // };
      // getMe();
    }
  }, [shouldUpdate]);

  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage['fit-token'];
    updateAuthStatus();
  };

  const providerValue = {
    token,
    isLoggedIn: !!token,
    logout,
    updateAuthStatus,
    user,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
