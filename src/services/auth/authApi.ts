import axios from "axios";
import Cookies from "js-cookie";
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";

const LOGIN_ENDPOINT = "auth/login";
const SIGNUP_ENDPOINT = "auth/signup";
const LOGOUT_ENDPOINT = "auth/logout";
const REFRESH_TOKEN_ENDPOINT = "auth/refresh";
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


export const login = async (req: ReqType) => {
  try {
    const url = `${LOGIN_ENDPOINT}`;
    const resp = await API.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error: any) {
    message.error(error.response.data.message);
    throw error;
  }
};

export const signup = async (req: ReqType) => {
  try {
    const url = `${SIGNUP_ENDPOINT}`;
    const resp = await API.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  const token = Cookies.get("userDetail");
  try {
    const url = `${LOGOUT_ENDPOINT}`;
    const resp = await API.post(
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

  const userData = JSON.parse(Cookies.get("userDetail")??'');

  const url = `${REFRESH_TOKEN_ENDPOINT}`;
  const response = await API.post(url, {
    refreshToken: userData.refresh,
  });

  if (response.status === 200) {
    const token = response.data.access;
    Cookies.set("userDetail", JSON.stringify({ access: token }));
    return token;
  }

  throw new Error("Failed to refresh token");
};
