import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../../types/apiResponseType";
import { message } from "antd";


export type Tasks = {
  tasks: TaskType[];
  task: TaskType;
  total_count: number;
  isLoading: boolean;
  error: null | string | undefined;
}

const initialState: Tasks={
  tasks: [],
  task:{},
  total_count: 0,
  isLoading: false,
  error: null,
}

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    taskLoadingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTaskSuccess: (state,action: PayloadAction<{tasks:TaskType[], total_count: number}>) => {
      state.isLoading=false;
      state.error=null;
      state.tasks= action.payload.tasks
      state.total_count=action.payload.total_count
    },
    fetchTaskByIdSuccess: (state,action: PayloadAction<{task:TaskType}>) => {
      state.isLoading=false;
      state.error=null;
      state.task= action.payload.task
    },
    taskSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
      message.success(action.payload);
    },
    taskFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      message.error(state.error);
    },
  },
});

export const { fetchTaskSuccess,fetchTaskByIdSuccess, taskLoadingStart, taskFailure,taskSuccess } = taskSlice.actions;
