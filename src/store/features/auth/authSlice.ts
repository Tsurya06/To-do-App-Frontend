import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { message } from "antd";
const user_data = Cookies.get("user");
export type LoginResponseType = {
  success: boolean;
  message: string;
  access: string;
  refresh: string;
  user: {
    id: string;
    username: string;
    password: string;
    email: string;
  };
};

export type UserAuthState = {
  user: LoginResponseType | null;
  isLoading: boolean;
  error: null | string | undefined;
  isAuthenticated: boolean;
};
const initialState: UserAuthState = {
  user: user_data ? JSON.parse(user_data) : null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginResponseType>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      message.success("Successfully logged in!");
    },
    sendVerificationLinkSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      message.success(action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      message.error(state.error);
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      message.success("Successfully logout!");
    },
    resetPasswordSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = null;
      message.success("Password Updated Successfully!");
    },
  },
});
