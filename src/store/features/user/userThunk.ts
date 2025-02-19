import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLoadingStart, fetchUsersSuccess, userOperationSuccess, userFailure } from "./userSlice";
import { createUser, getUserList, editUser, deleteUserById, getUserById } from "../../../services/user/userApi";
import { ReqType } from "../../../types/apiResponseType";

export const CreateUserThunk = createAsyncThunk(
    "user/CreateUser",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(userLoadingStart());
            const response = await createUser(req);
            const users = response.data;
            dispatch(userOperationSuccess(users.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to create user';
            if (error.response.status !== 401) {
                dispatch(userFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const GetUserById = createAsyncThunk(
    "user/GetUserById",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(userLoadingStart());
            const response = await getUserById(req);
            const users = response.data;
            dispatch(fetchUsersSuccess(users));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to fetch user';
            if (error.response.status !== 401) {
                dispatch(userFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);
export const GetUserList = createAsyncThunk(
    "user/GetUserList",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(userLoadingStart());
            const response = await getUserList(req);
            const users = response.data;
            dispatch(fetchUsersSuccess(users));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to fetch users';
            if (error.response.status !== 401) {
                dispatch(userFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const EditUserThunk = createAsyncThunk(
    "user/EditUser",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(userLoadingStart());
            const response = await editUser(req);
            const users = response.data;
            dispatch(userOperationSuccess(users.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to update user';
            if (error.response.status !== 401) {
                dispatch(userFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const DeleteUserThunk = createAsyncThunk(
    "user/DeleteUser",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(userLoadingStart());
            const response = await deleteUserById(req);
            const users = response.data;
            dispatch(userOperationSuccess(users.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to delete user';
            if (error.response.status !== 401) {
                dispatch(userFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
); 

