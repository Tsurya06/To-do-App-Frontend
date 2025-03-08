import { createAsyncThunk } from '@reduxjs/toolkit';
import {  authFailure, authLoadingStart, authLoginSuccess, authSignupSuccess, logout } from './authSlice';
import { login, logoutUser, signup } from '../../../services/auth/authApi';
import { ReqType } from '../../../types/apiResponseType';


export const loginThunk = createAsyncThunk(
  'auth/login',
  async (req: ReqType, { dispatch }) => {
    try {
      dispatch(authLoadingStart());
      const response = await login(req);
      dispatch(authLoginSuccess(response.data));
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data.message || 'Login failed';
      dispatch(authFailure(errorMessage));
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (req: ReqType, { dispatch }) => {
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
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      const response = await logoutUser();
      
      if (response.success) {
        dispatch(logout());
        return response;
      } else {
        // If server indicates logout wasn't successful
        throw new Error(response.message || 'Logout failed');
      }
    } catch (error: any) {
      // Handle both network errors and server errors
      const errorMessage = error.response?.data?.message || error.message || 'Failed to logout';
      dispatch(authFailure(errorMessage));
      
      // If it's a 401/403 error, still logout locally
      if (error.response?.status === 401 || error.response?.status === 403) {
        dispatch(logout());
      }
      throw error;
    }
  }
);