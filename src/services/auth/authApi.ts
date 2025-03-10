import { API, BASE_URL } from "../api/axiosInstance";
import Cookies from "js-cookie";
import { ReqType } from "../../types/apiResponseType";

const LOGIN_ENDPOINT = "auth/login";
const SIGNUP_ENDPOINT = "auth/signup";
const LOGOUT_ENDPOINT = "auth/logout";
const REFRESH_TOKEN_ENDPOINT = "auth/refresh";

export const login = async (req: ReqType) => {
  try {
    const url = `${BASE_URL}${LOGIN_ENDPOINT}`;
    const resp = await API.post(url, req.body ? req.body : {});
    return resp;
  } catch (error: any) {
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
    const userDetail = Cookies.get("userDetail");
    if (!userDetail) {
      throw new Error("No active session");
    }

    const { access } = JSON.parse(userDetail);
    const url = `${BASE_URL}${LOGOUT_ENDPOINT}`;
    
    // Send the access token in Authorization header
    const resp = await API.post(url, {}, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    });

    // Clear cookies after successful server logout
    if (resp.data.success) {
      Cookies.remove("userDetail");
    }
    return resp.data;
  } catch (error) {
    // Still clear local session on error
    Cookies.remove("userDetail");
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
    const response = await API.post(`${REFRESH_TOKEN_ENDPOINT}`, { refreshToken: refresh });
    
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
