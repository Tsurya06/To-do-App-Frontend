import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../../../types/apiResponseType";
import { message } from "antd";

interface NotificationState {
    notifications: NotificationType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    isLoading: false,
    error: null,
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notificationLoadingStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchNotificationsSuccess: (state, action: PayloadAction<NotificationType[]>) => {
            state.notifications = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        notificationOperationSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            message.success(action.payload);

        },
        notificationFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    notificationLoadingStart,
    fetchNotificationsSuccess,
    notificationOperationSuccess,
    notificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer; 