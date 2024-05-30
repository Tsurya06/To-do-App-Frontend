// src/redux/auth/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { loginThunk, signupThunk } from './authThunk';
const user_data=Cookies.get('user');

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
  user: user_data?JSON.parse(user_data):null,
  loading: false,
  error: null,
  authenticated:false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess:(state, action: PayloadAction<LoginResponseType>)=> {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure:(state, action: PayloadAction<string>)=> {
      state.error = action.payload;
      state.loading = false;
    },
    authLoadingStart:(state)=> {
      state.loading = true;
    },
    logout:(state)=> {
      state.user = null;
      Cookies.remove('user');
    },
  },
});

export const { authSuccess, authFailure, authLoadingStart, logout } = authSlice.actions;

