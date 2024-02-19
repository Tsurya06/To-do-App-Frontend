// Define action types
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

// Action creators
export const addTodo = (text: string, title: string) => ({
  type: ADD_TODO,
  payload: { text, title },
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const editTodo = (id: number, newText: string, newTitle: string) => ({
  type: EDIT_TODO,
  payload: { id, newText, newTitle },
});
