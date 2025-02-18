import { Middleware } from '@reduxjs/toolkit';
import { logout } from '../features/auth/authSlice';
import { refreshToken } from '../../services/auth/authApi';
import Cookies from 'js-cookie';

export const authMiddleware: Middleware = (store) => (next) => async (action:any) => {
  // First pass the action through
  const result = next(action);

  // Check if the action is a rejected action from an API call
  if (action.type.endsWith('/rejected')) {
    const error = action.payload || action.error;
    
    // Only handle 401 errors
    if (error?.response?.status === 401) {
      const userDetail = Cookies.get('userDetail');
      
      // If no userDetail exists, logout
      if (!userDetail) {
        store.dispatch(logout());
        return result;
      }

      try {
        // Try to refresh the token
        await refreshToken();
        // If successful, retry the failed action
        // You might want to implement retry logic here
      } catch (refreshError: any) {
        // Only logout if refresh token is invalid/expired
        if (refreshError.response?.status === 401) {
          store.dispatch(logout());
        }
      }
    }
  }

  return result;
}; 