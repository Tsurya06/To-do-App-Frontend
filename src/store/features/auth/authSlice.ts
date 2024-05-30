// src/redux/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { loginThunk, signupThunk } from './authThunk';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    authLoadingStart(state) {
      state.loading = true;
    },
    logout(state) {
      state.user = null;
      Cookies.remove('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { authSuccess, authFailure, authLoadingStart, logout } = authSlice.actions;

