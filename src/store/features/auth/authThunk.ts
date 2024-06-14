import { createAsyncThunk } from '@reduxjs/toolkit';
import {  authFailure, authLoadingStart, authLoginSuccess, authSignupSuccess, logout } from './authSlice';
import { login, logoutUser, signup } from '../../../services/auth/authApi';
import { ReqType } from '../../../types/apiResponseType';


export const loginThunk = createAsyncThunk(
  'auth/login',
  async (req: ReqType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(authLoadingStart());
      const response = await login(req);
      dispatch(authLoginSuccess(response));
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
      dispatch(authSignupSuccess(response.message));
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

export const logoutUserThunk = createAsyncThunk(
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