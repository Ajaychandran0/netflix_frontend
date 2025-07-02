import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useAuth = () => {
  const { isAuthenticated, user, isAdmin } = useSelector((state: RootState) => state.auth);
  console.log('useAuth', { isAuthenticated, user });
  return { isAuthenticated, user, isAdmin };

};

export default useAuth;
