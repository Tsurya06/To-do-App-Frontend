import axios from 'axios';
import Cookies from 'js-cookie';
import { ReqType } from '../../types/apiResponseType';
import { message } from 'antd';

const devURL = import.meta.env.VITE_BASE_URL;
const LOGIN_ENDPOINT = 'auth/login';
const SIGNUP_ENDPOINT = 'auth/signup';
const LOGOUT_ENDPOINT = 'auth/logout';


export const login = async (req: ReqType) => {
  const token = Cookies.get('user');
  try {
    const url = `${devURL}${LOGIN_ENDPOINT}`;
    const resp = await axios.post(url, req.body ? req.body : {});
    return resp.data;
  } catch (error:any) {
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
    const token = Cookies.get('user');
    console.log('token', token)
    try {
      const url = `${devURL}${LOGOUT_ENDPOINT}`;
      const resp = await axios.post(
        url,
        {},
        {
          headers:{
            Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
          }
        }
      );
      return resp;
    } catch (error) {
      throw error;
    }
};