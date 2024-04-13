import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoType } from "../modals/type";
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

const todoReducer = createSlice({
  name: "todosSlice",
  initialState,
  reducers: {
    todoLoadingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createTodoSuccess: (state,action: PayloadAction<{todos:TodoType[], total_count: number}>) => {
      state.isLoading=false;
      state.error=null;
      state.todos= action.payload.todos
      message.success("Record created!")
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

    // deleteTodoById: (state, action: PayloadAction<number>) => {
    //   return state.filter(todo => todo.id !== action.payload);
    // },
    // toggleTodo(state, action: PayloadAction<number>) {
    //   const todo = state.find((todo) => todo.id === action.payload);
    //   if (todo) {
    //     todo.completed = !todo.completed;
    //   }
    // },
    // updateTodo(
    //   state,
    //   action: PayloadAction<{ id: number; title: string; text: string }>
    // ) {
    //   const { id, title, text } = action.payload;
    //   const todoToUpdate = state.find((todo) => todo.id === id);
    //   if (todoToUpdate) {
    //     todoToUpdate.title = title;
    //     todoToUpdate.text = text;
    //   }
    // },
  },
});

export const { createTodoSuccess, todoLoadingStart, todoFailure,todoSuccess } = todoReducer.actions;
export default todoReducer.reducer;
