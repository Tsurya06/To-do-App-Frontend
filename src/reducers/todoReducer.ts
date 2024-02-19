import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../modals/type";

const initialState: Todo[] = [];

const todoReducer = createSlice({
  name: "todosSlice",
  initialState,
  reducers: {
    addTodo: (state,action: PayloadAction<{ title: string; text: string }>) => {
      const { title, text } = action.payload;
      state.push({ id: Date.now(), title, text, completed: false });
    },
    deleteTodoById: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo(
      state,
      action: PayloadAction<{ id: number; title: string; text: string }>
    ) {
      const { id, title, text } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.title = title;
        todoToUpdate.text = text;
      }
    },
  },
});

export const { addTodo, deleteTodoById, toggleTodo, updateTodo } = todoReducer.actions;
export default todoReducer.reducer;
