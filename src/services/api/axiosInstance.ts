import axios from "axios";
import Cookies from "js-cookie";

const devURL = import.meta.env.VITE_BASE_URL;

// Create API instance
export const API = axios.create({
  baseURL: devURL,
});

// Add default auth header to all requests
API.interceptors.request.use((config) => {
  const token = Cookies.get("userDetail");
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
  }
  return config;
});

// Export base URL for direct use if needed
export const BASE_URL = devURL; 