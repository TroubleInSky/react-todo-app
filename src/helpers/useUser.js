import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../store/User';
import { removeToken } from './authToken';

export default function useUser() {
  return useSelector(state => state.user);
}

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    removeToken()
    dispatch(updateUser({logged: false}));
  };

  return logout;
};