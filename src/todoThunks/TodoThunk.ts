import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoSuccess,createTodoSuccess, todoFailure, todoLoadingStart } from "../reducers/todoReducer";
import {createTodo, deleteTodoById, getTodoList} from "../services/api/todoApi"
import { TodoType } from "../modals/type";

export type ReqType = {
    body?: object;
    params?: {};
    type?: string;
    id?: string;
};

export const CreateTodo = createAsyncThunk(
    "todo/AddTodo",
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await createTodo(req);
        const todos: any= response.data;
        const total_count: number= response.data.total_count;
        dispatch(createTodoSuccess({todos:todos,total_count:total_count}))
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
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await getTodoList(req);
        const todos: TodoType[]= response.data;
        const total_count: number= response.data.total_count;
        dispatch(createTodoSuccess({todos:todos,total_count:total_count}))
        console.log("sdkjf",response)
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
export const DeleteTodoById = createAsyncThunk(
    "todo/DeleteTodoById",
    async(req: ReqType ,{ dispatch, rejectWithValue } )=>{
    try{
        dispatch(todoLoadingStart())
        const response = await deleteTodoById(req);
        const todos: any= response.data;
        console.log("resp data",todos)
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