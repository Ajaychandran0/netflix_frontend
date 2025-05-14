import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  console.log('useAuth', { isAuthenticated, user });
  return { isAuthenticated, user };

};

export default useAuth;
