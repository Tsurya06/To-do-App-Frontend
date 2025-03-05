import { API, BASE_URL } from "../api/axiosInstance";
import Cookies from "js-cookie";
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";
// import { RootState } from "../../store/store";
// import { logout } from "../../store/features/auth/authSlice";
// import { Store } from "@reduxjs/toolkit";

const LOGIN_ENDPOINT = "auth/login";
const SIGNUP_ENDPOINT = "auth/signup";
const LOGOUT_ENDPOINT = "auth/logout";
const REFRESH_TOKEN_ENDPOINT = "auth/refresh";

export const login = async (req: ReqType) => {
  try {
    const url = `${BASE_URL}${LOGIN_ENDPOINT}`;
    const resp = await API.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error: any) {
    message.error(error.response.data.message);
    throw error;
  }
};

export const signup = async (req: ReqType) => {
  try {
    const url = `${BASE_URL}${SIGNUP_ENDPOINT}`;
    const resp = await API.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const url = `${BASE_URL}${LOGOUT_ENDPOINT}`;
    const resp = await API.post(url, {});
    return resp;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  const userData = Cookies.get("userDetail");
  if (!userData) {
    throw new Error("No refresh token found");
  }

  try {
    const { refresh } = JSON.parse(userData);
    const url = `${BASE_URL}${REFRESH_TOKEN_ENDPOINT}`;
    const response = await API.post(url, { refreshToken: refresh });

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

// // Function to initialize interceptors with access to the store
// export function setupInterceptors(store: Store<RootState>) {
//   API.interceptors.request.use(
//     (config) => {
//       const token = Cookies.get("userDetail");
//       if (token) {
//         config.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   API.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (!error.response) {
//         return Promise.reject(error);
//       }

//       const originalRequest = error.config;

//       // Only handle 401 errors for auth-related endpoints
//       if (error.response.status === 401) {
//         // Check if this is an auth-related endpoint
//         const isAuthEndpoint = originalRequest.url?.includes('auth/');
        
//         // For non-auth endpoints, try token refresh first
//         if (!isAuthEndpoint && !originalRequest._retry && Cookies.get("userDetail")) {
//           originalRequest._retry = true;
          
//           try {
//             const newToken = await refreshToken();
//             if (newToken) {
//               originalRequest.headers.Authorization = `Bearer ${newToken}`;
//               return API(originalRequest);
//             }
//           } catch (refreshError :any) {
//             // Only logout if refresh token is invalid
//             if (refreshError.response?.status === 401) {
//               store.dispatch(logout());
//             }
//             return Promise.reject(refreshError);
//           }
//         } 
//         // For auth endpoints or failed retries, only logout if it's an auth endpoint
//         else if (isAuthEndpoint) {
//           store.dispatch(logout());
//         }
//       }

//       // For all other errors, just reject without logging out
//       return Promise.reject(error);
//     }
//   );
// }
