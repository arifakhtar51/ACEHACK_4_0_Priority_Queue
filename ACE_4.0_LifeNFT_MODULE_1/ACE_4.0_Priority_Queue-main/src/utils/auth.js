// lifenft/src/utils/auth.js
import { useHistory } from 'react-router-dom';

export const useLogout = () => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem('username'); // Clear the username from sessionStorage
    history.push('/'); // Redirect to the home page
  };

  return logout;
};