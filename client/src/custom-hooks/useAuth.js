import { useContext } from 'react';
import { AuthContext } from '../context';

export const useAuth = () => {
  const { token, isLoggedIn, logout, updateAuthStatus, user } =
    useContext(AuthContext);

  return {
    token,
    isLoggedIn,
    logout,
    updateAuthStatus,
    user,
  };
};
