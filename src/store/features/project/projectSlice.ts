import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectType } from "../../../types/apiResponseType";
import { message } from "antd";

interface ProjectState {
    projects: ProjectType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    isLoading: false,
    error: null,
};

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        projectLoadingStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProjectsSuccess: (state, action: PayloadAction<ProjectType[]>) => {
            state.projects = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        projectOperationSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            message.success(action.payload);
        },
        projectFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    projectLoadingStart,
    fetchProjectsSuccess,
    projectOperationSuccess,
    projectFailure,
} = projectSlice.actions;

export default projectSlice.reducer; 