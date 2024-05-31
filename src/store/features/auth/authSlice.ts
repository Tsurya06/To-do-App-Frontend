// src/redux/auth/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    authSuccess:(state, action: PayloadAction<LoginResponseType>)=> {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.authenticated=true;
    },
    authFailure:(state, action: PayloadAction<string>)=> {
      state.error = action.payload;
      state.loading = false;
      state.authenticated=false;
    },
    logout:(state)=> {
      state.user = null;
      Cookies.remove('user');
    },
  },
});

export const { authSuccess, authFailure, authLoadingStart, logout } = authSlice.actions;

