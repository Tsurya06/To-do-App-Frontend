import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../../types/apiResponseType";
import { message } from "antd";

interface UserState {
    users: UserType[];
    user: UserType;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: {},
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoadingStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<UserType[]> ) => {
            state.users = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchUserByIdSuccess: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        userOperationSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            message.success(action.payload);
        },
        userFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            message.error(state.error);
        },
    },
});

export const {
    userLoadingStart,
    fetchUsersSuccess,
    userOperationSuccess,
    fetchUserByIdSuccess,
    userFailure,
} = userSlice.actions;

export default userSlice.reducer; 