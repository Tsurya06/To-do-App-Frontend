import axios from "axios";
import Cookies from "js-cookie";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { logout } from "../../store/features/auth/authSlice";

const devURL = import.meta.env.VITE_BASE_URL;

// Create API instance
export const API = axios.create({
  baseURL: devURL,
});

// Function to refresh token
const refreshToken = async () => {
  const userData = Cookies.get("userDetail");
  if (!userData) {
    throw new Error("No refresh token found");
  }

  try {
    const { refresh } = JSON.parse(userData);
    const response = await API.post(`auth/refresh`, { refreshToken: refresh });
    
    if (response.status === 200) {
      const newToken = response.data.access;
      // Keep the refresh token when updating
      Cookies.set("userDetail", JSON.stringify({ 
        access: newToken,
        refresh 
      }));
      return newToken;
    }
  } catch (error) {
    throw error;
  }
};

// Setup interceptors with store access
export function setupInterceptors(store: Store<RootState>) {
  // Request interceptor
  API.interceptors.request.use(
    (config) => {
      const token = Cookies.get("userDetail");
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!error.response) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;

      // Only handle 401 errors
      if (error.response.status === 401) {
        // Check if this is specifically an auth operation endpoint
        const isAuthOperationEndpoint = originalRequest.url?.includes('auth/login') || 
                                      originalRequest.url?.includes('auth/signup') ||
                                      originalRequest.url?.includes('auth/logout') 
        
        // Logout immediately if no refresh token exists
        // For non-auth operation endpoints, try token refresh first
        if (!isAuthOperationEndpoint && !originalRequest._retry && Cookies.get("userDetail")) {
          originalRequest._retry = true;
          
          try {
            const newToken = await refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return API(originalRequest);
            }
          } catch (refreshError: any) {
            // Only logout if refresh token is invalid
            if (refreshError?.response?.status === 401) {
              store.dispatch(logout());
            }
            return Promise.reject(refreshError);
          }
        } 
        // For auth operation endpoints or failed retries, logout
        else if (isAuthOperationEndpoint) {
          store.dispatch(logout());
        }
      }

      return Promise.reject(error);
    }
  );
}

// Export base URL for direct use if needed
export const BASE_URL = devURL; 