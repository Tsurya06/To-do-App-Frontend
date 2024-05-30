// src/services/auth/authApi.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { ReqType } from '../../types/apiResponseType';

const devURL = import.meta.env.VITE_BASE_URL;
const LOGIN_ENDPOINT = 'auth/login';
const SIGNUP_ENDPOINT = 'auth/signup';


export const login = async (req: ReqType) => {
  const token = Cookies.get('user');
  try {
    const url = `${devURL}${LOGIN_ENDPOINT}`;
    const resp = await axios.post(url, req.body ? req.body : {}, {
        headers: {
            Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
        },
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (req: ReqType) => {
  const token = Cookies.get('user');
  try {
    const url = `${devURL}${SIGNUP_ENDPOINT}`;
    const resp = await axios.post(url, req.body ? req.body : {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return resp.data;
  } catch (error) {
    throw error;
  }
};
