import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectLoadingStart, fetchProjectsSuccess, projectOperationSuccess, projectFailure } from "./projectSlice";
import { createProject, getProjectList, editProject, deleteProjectById, getProjectById } from "../../../services/project/projectApi"; // Import project API functions
import { ReqType } from "../../../types/apiResponseType";

export const CreateProjectThunk = createAsyncThunk(
    "project/CreateProject",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(projectLoadingStart());
            const response = await createProject(req);
            const projects = response.data;
            dispatch(projectOperationSuccess(projects.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to create project';
            if (error.response.status !== 401) {
                dispatch(projectFailure(errorMessage));
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const GetProjectList = createAsyncThunk(
    "project/GetProjectList",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(projectLoadingStart());
            const response = await getProjectList(req);
            const projects = response.data;
            dispatch(fetchProjectsSuccess(projects));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to fetch projects';
            dispatch(projectFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

// ... other project thunks (Edit, Delete, Get by ID, etc.)

export const EditProjectThunk = createAsyncThunk(
    "project/EditProject",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(projectLoadingStart());
            const response = await editProject(req);
            const projects = response.data;
            dispatch(projectOperationSuccess(projects.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to update project';
            dispatch(projectFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

export const DeleteProjectThunk = createAsyncThunk(
    "project/DeleteProject",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(projectLoadingStart());
            const response = await deleteProjectById(req);
            const projects = response.data;
            dispatch(projectOperationSuccess(projects.message));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to delete project';
            dispatch(projectFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

export const GetProjectByIdThunk = createAsyncThunk(
    "project/GetProjectById",
    async (req: ReqType, { dispatch, rejectWithValue }) => {
        try {
            dispatch(projectLoadingStart());
            const response = await getProjectById(req);
            const project = response.data;
            // Since this is a single project, we'll wrap it in an array for the reducer
            dispatch(fetchProjectsSuccess([project]));
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response.data.message || 'Failed to fetch project';
            dispatch(projectFailure(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
); 