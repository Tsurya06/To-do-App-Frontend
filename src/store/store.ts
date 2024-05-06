import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todoSlice } from './features/todo/todoSlice';
import { authSlice } from './features/auth/authSlice';

export const store = configureStore({
    reducer: {
        todosReducer:todoSlice.reducer,
        auth: authSlice.reducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
