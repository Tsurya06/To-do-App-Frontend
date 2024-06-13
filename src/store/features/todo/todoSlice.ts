import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../../../types/apiResponseType";
import { message } from "antd";


export type Todos = {
  todos: TodoType[];
  total_count: number;
  isLoading: boolean;
  error: null | string | undefined;
}

const initialState: Todos={
  todos: [],
  total_count: 0,
  isLoading: false,
  error: null,
}

export const todoSlice = createSlice({
  name: "todosSlice",
  initialState,
  reducers: {
    todoLoadingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTodoSuccess: (state,action: PayloadAction<{todos:TodoType[], total_count: number}>) => {
      state.isLoading=false;
      state.error=null;
      state.todos= action.payload.todos
      state.total_count=action.payload.total_count
    },
    todoSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
      message.success(action.payload);
    },
    todoFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      message.error(state.error);
    },
  },
});

export const { fetchTodoSuccess, todoLoadingStart, todoFailure,todoSuccess } = todoSlice.actions;
