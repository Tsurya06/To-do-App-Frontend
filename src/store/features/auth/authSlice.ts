import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import Cookies from 'js-cookie';
const userData=Cookies.get('userDetail');

export type LoginResponseType = {
  success: boolean;
  message: string;
  access: string;
  refresh: string;
  user: {
    id: string;
    username: string;
    email:string; 
  };
};

export type AuthState= {
  user: LoginResponseType | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: userData?JSON.parse(userData):null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoadingStart:(state)=> {
      state.loading = true;
    },
    authLoginSuccess:(state, action: PayloadAction<LoginResponseType>)=> {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      message.success(state.user?.message)
    },
    authSignupSuccess:(state, action: PayloadAction<string>)=> {
      state.loading = false;
      state.error = null;
      message.success(action.payload)
    },
    authFailure:(state, action: PayloadAction<string>)=> {
      state.error = action.payload;
      state.loading = false;
      message.error(state.user?.message)
    },
    logout:(state)=> {
      state.user = null;
      state.error = null;
      state.loading=false;
      Cookies.remove('userDetail');
      window.location.reload();
      message.success('You have been logged out successfully!');
    },
  },
});

export const {authSignupSuccess, authLoginSuccess, authFailure, authLoadingStart, logout } = authSlice.actions;

