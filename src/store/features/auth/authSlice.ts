// src/redux/auth/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import Cookies from 'js-cookie';
const userData=Cookies.get('user');

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
  authenticated: boolean;
}

const initialState: AuthState = {
  user: userData?JSON.parse(userData):null,
  loading: false,
  error: null,
  authenticated:false,
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
      state.authenticated=true;
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
      state.authenticated=false;
      message.error(state.user?.message)
    },
    logout:(state)=> {
      state.user = null;
      state.loading=false;
      Cookies.remove('user');
      message.success('You have been logged out successfully!');
    },
  },
});

export const {authSignupSuccess, authLoginSuccess, authFailure, authLoadingStart, logout } = authSlice.actions;

