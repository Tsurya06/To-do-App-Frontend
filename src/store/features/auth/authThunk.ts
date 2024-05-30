// src/redux/auth/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authSuccess, authFailure, authLoadingStart, logout } from './authSlice';
import Cookies from 'js-cookie';
import { login, signup } from '../../../services/auth/authApi';
import { ReqType } from '../../../types/apiResponseType';

interface AuthRequest {
  email: string;
  password: string;
}

interface SignupRequest extends AuthRequest {
  name: string;
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (req: ReqType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authLoadingStart());
      const response = await login(req);
      Cookies.set('user', JSON.stringify(response));
      dispatch(authSuccess(response));
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data.message || 'Login failed';
      if (error.response.status !== 401) {
        dispatch(authFailure(errorMessage));
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (req: ReqType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authLoadingStart());
      const response = await signup(req);
      dispatch(authSuccess(response));
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data.message || 'Signup failed';
      if (error.response.status !== 401) {
        dispatch(authFailure(errorMessage));
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { dispatch, rejectWithValue }) => {
      try {
        const response:any = await logoutUser();
        dispatch(logout());
        return response;
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to logout';
        if (error.response.status !== 401) {
          dispatch(authFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
    }
  );