import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationLoadingStart, fetchNotificationsSuccess, notificationOperationSuccess, notificationFailure } from "./notificationSlice";
import { getNotificationList, markAsRead } from "../../../services/notification/notificationApi";
import { ReqType } from "../../../types/apiResponseType";

export const GetNotificationList = createAsyncThunk(
    "notification/GetNotificationList",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(notificationLoadingStart());
            const response = await getNotificationList(req);
            const notifications = response.data;
            dispatch(fetchNotificationsSuccess(notifications));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to fetch notifications';
            if (error.response.status !== 401) {
                dispatch(notificationFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const MarkAsReadThunk = createAsyncThunk(
    "notification/MarkAsRead",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(notificationLoadingStart());
            const response = await markAsRead(req);
            const notifications = response.data;
            dispatch(notificationOperationSuccess(notifications.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to mark notification as read';
            if (error.response.status !== 401) {
                dispatch(notificationFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
); 