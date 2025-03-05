import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskSuccess, taskFailure, taskLoadingStart, fetchTaskSuccess, fetchTaskByIdSuccess } from "./taskSlice";

import { ReqType } from "../../../types/apiResponseType";
import { createTask, editTask, getTaskList, deleteTaskById, getTaskById, addComment } from "../../../services/task/taskApi";

export const CreateTaskThunk = createAsyncThunk(
    "task/AddTask",
    async(req: ReqType, { dispatch, rejectWithValue } )=>{
    try{
        dispatch(taskLoadingStart())
        const response = await createTask(req);
        const tasks = response.data;
        dispatch(taskSuccess(tasks.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to add task';
        if (error.response.status !== 401) {
          dispatch(taskFailure(errorMessage));
        }
        return rejectWithValue(errorMessage);
      }
  }  
);

export const EditTaskThunk = createAsyncThunk(
    "task/EditTask",
    async(req: ReqType, { dispatch, rejectWithValue } )=>{
    try{
        dispatch(taskLoadingStart())
        const response = await editTask(req);
        const tasks = response.data;
        dispatch(taskSuccess(tasks.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to edit task';
        dispatch(taskFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
  }  
);

export const GetTaskList = createAsyncThunk(
    "task/GetTaskList",
    async(req:ReqType, { dispatch, rejectWithValue } )=>{
    try{
        dispatch(taskLoadingStart())
        const response = await getTaskList(req);
        console.log(response);
        const tasks = response.data.tasks;
        const total_count = response.total_count;
        dispatch(fetchTaskSuccess({tasks: tasks, total_count: total_count}))
        return response;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to fetch task list';
        dispatch(taskFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
  }  
);

export const DeleteTaskByIdThunk = createAsyncThunk(
    "task/DeleteTaskById",
    async(req: ReqType, { dispatch, rejectWithValue } )=>{
    try{
        dispatch(taskLoadingStart())
        const response = await deleteTaskById(req);
        const tasks = response.data;
        dispatch(taskSuccess(tasks.message))
        return response.data;
    }catch (error: any) {
        const errorMessage = error.response.data.message || 'Failed to delete task';
        dispatch(taskFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
  }  
);

export const GetTaskByIdThunk = createAsyncThunk(
    "task/GetTaskById",
    async (req: { id: string }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(taskLoadingStart());
            const response = await getTaskById(req);
            const task = response.data;
            dispatch(fetchTaskByIdSuccess({ task }));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch task';
            dispatch(taskFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

export const AddCommentThunk = createAsyncThunk(
    "task/AddComment",
    async (req: { body: { taskId: string; text: string } }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(taskLoadingStart());
            const response = await addComment(req);
            dispatch(taskSuccess("Comment added successfully"));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to add comment';
            dispatch(taskFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);
