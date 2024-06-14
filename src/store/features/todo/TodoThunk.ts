import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoSuccess, todoFailure, todoLoadingStart, fetchTodoSuccess } from "./todoSlice";
import {createTodo, deleteTodoById, editTodo, getTodoList} from "../../../services/todo/todoApi"
import { ReqType } from "../../../types/apiResponseType";



export const CreateTodoThunk = createAsyncThunk(
    "todo/AddTodo",
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await createTodo(req);
        const todos: any= response.data;
        dispatch(todoSuccess(todos.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to add todo';
        if (error.response.status !== 401) {
          dispatch(todoFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
  }  
);

export const EditTodoThunk = createAsyncThunk(
    "todo/EditTodo",
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await editTodo(req);
        const todos: any= response.data;
        dispatch(todoSuccess(todos.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to add todo';
        if (error.response.status !== 401) {
          dispatch(todoFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
  }  
);

export const GetTodoList = createAsyncThunk(
    "todo/GetTodoList",
    async(_ ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await getTodoList();
        const todos: any= response.data;
        const total_count: number= response.data.total_count;
        dispatch(fetchTodoSuccess({todos:todos,total_count:total_count}))
        return response;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to fetch todo list';
        if (error.response.status !== 401) {
          dispatch(todoFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
  }  
);
export const DeleteTodoByIdThunk = createAsyncThunk(
    "todo/DeleteTodoById",
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await deleteTodoById(req);
        const todos: any= response.data;
        dispatch(todoSuccess(todos.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to delete todo';
        if (error.response.status !== 401) {
          dispatch(todoFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
  }  
);