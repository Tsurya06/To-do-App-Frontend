import axios from "axios";
import Cookies from "js-cookie";
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";

const devURL = import.meta.env.VITE_BASE_URL;
const LOGIN_ENDPOINT = "auth/login";
const SIGNUP_ENDPOINT = "auth/signup";
const LOGOUT_ENDPOINT = "auth/logout";

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

  const url = `${devURL}auth/refresh`;
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

// Axios response interceptor
axios.interceptors.response.use(
  (response) => response, // If response is successful, just return it
  async (error) => {
    const originalRequest = error.config;
    // If response is a 401 and it's not a try to refresh token, try to refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as being retried

      // Try to refresh token
      const newToken = await refreshToken();

      // If refresh is successful, retry original request with new token
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    } else if (error.response.status === 401 && originalRequest._retry) {
      // If response is a 401 and it's a retry, remove userDetail cookie and reload the page
      Cookies.remove("userDetail");
      window.location.reload();
      
    }
    return Promise.reject(error);
  }
);
