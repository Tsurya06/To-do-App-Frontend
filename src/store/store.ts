import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { taskSlice } from './features/task/taskSlice';
import { authSlice } from './features/auth/authSlice';
import { authMiddleware } from './middleware/authMiddleware';
import { projectSlice } from './features/project/projectSlice';
import { userSlice } from './features/user/userSlice';
import { notificationSlice } from './features/notification/notificationSlice';

export const store = configureStore({
    reducer: {
        taskReducer: taskSlice.reducer,
        authReducer: authSlice.reducer,
        projectReducer: projectSlice.reducer,
        userReducer: userSlice.reducer,
        notificationReducer: notificationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
