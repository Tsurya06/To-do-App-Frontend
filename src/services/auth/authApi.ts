import axios from "axios";
import Cookies from "js-cookie";
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";
import { RootState, store } from "../../store/store";
import { logout } from "../../store/features/auth/authSlice";
import { Store } from "@reduxjs/toolkit";

const devURL = import.meta.env.VITE_BASE_URL;
const LOGIN_ENDPOINT = "auth/login";
const SIGNUP_ENDPOINT = "auth/signup";
const LOGOUT_ENDPOINT = "auth/logout";
const REFRESH_TOKEN_ENDPOINT = "auth/refresh";
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
export const login = async (req: ReqType) => {
  try {
    const url = `${devURL}${LOGIN_ENDPOINT}`;
    const resp = await axios.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error: any) {
    message.error(error.response.data.message);
    throw error;
  }
};

export const signup = async (req: ReqType) => {
  try {
    const url = `${devURL}${SIGNUP_ENDPOINT}`;
    const resp = await axios.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  const token = Cookies.get("userDetail");
  try {
    const url = `${devURL}${LOGOUT_ENDPOINT}`;
    const resp = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token).access : ""}`,
        },
      }
    );
    return resp;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {

  const userData = JSON.parse(Cookies.get("userDetail")!);

  const url = `${devURL}${REFRESH_TOKEN_ENDPOINT}`;
  const response = await axios.post(url, {
    refreshToken: userData.refresh,
  });

  if (response.status === 200) {
    const token = response.data.access;
    Cookies.set("userDetail", JSON.stringify({ access: token }));
    return token;
  }

  throw new Error("Failed to refresh token");
};

// Function to initialize interceptors with access to the store
export function setupInterceptors(store: Store<RootState>) {
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

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return API(originalRequest);
          }
        } catch (refreshError) {
          // If token refresh fails, dispatch logout action
          store.dispatch(logout());
          Cookies.remove("userDetail");
          window.location.reload();
        }
      } else if (error.response.status === 401 && originalRequest._retry) {
        // If a retried request fails with 401, dispatch logout action
        store.dispatch(logout());
        Cookies.remove("userDetail");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
}

// Call setupInterceptors in your application's entry point, e.g., main.tsx
setupInterceptors(store);
