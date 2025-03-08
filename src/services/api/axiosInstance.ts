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
async function refreshToken() {
  const userDetail = Cookies.get("userDetail");
  if (!userDetail) {
    throw new Error("No refresh token available");
  }

  try {
    const parsedToken = JSON.parse(userDetail);
    const refreshUrl = `/auth/refresh/`;
    
    const response = await axios.post(
      `${devURL}${refreshUrl}`,
      {
        refresh_token: parsedToken.refresh
      }
    );
    
    // Update the cookie with the new access token
    if (response.data && response.data.access) {
      parsedToken.access = response.data.access;
      Cookies.set("userDetail", JSON.stringify(parsedToken), { expires: 7 });
      return response.data.access;
    } else {
      throw new Error("Invalid refresh token response");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
}

// Setup interceptors with store access
export function setupInterceptors(store: Store<RootState>) {
  // Request interceptor
  API.interceptors.request.use(
    (config) => {
      const token = Cookies.get("userDetail");
      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          if (parsedToken.access) {
            config.headers.Authorization = `Bearer ${parsedToken.access}`;
          }
        } catch (error) {
          console.error('Invalid token format:', error);
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If there's no response or the request has already been retried, reject
      if (!error.response || originalRequest._retry) {
        return Promise.reject(error);
      }

      // Handle 401 errors (Unauthorized)
      if (error.response.status === 401) {
        // Don't refresh for auth endpoints
        const isAuthEndpoint = originalRequest.url?.includes('auth/login') ||
                             originalRequest.url?.includes('auth/signup') ||
                             originalRequest.url?.includes('auth/logout');

        if (isAuthEndpoint) {
          return Promise.reject(error);
        }

        // Mark the request as retried to prevent infinite loops
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const newToken = await refreshToken();
          
          // Update the request header with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Retry the original request with the new token
          return API(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, log the user out
          console.error("Token refresh failed, logging out:", refreshError);
          store.dispatch(logout());
          
          // Clear cookies and local storage
          Cookies.remove("userDetail");
          localStorage.removeItem("permissions");
          
          return Promise.reject(refreshError);
        }
      }

      // For all other errors, just reject
      return Promise.reject(error);
    }
  );
}

// Export base URL for direct use if needed
export const BASE_URL = devURL;
