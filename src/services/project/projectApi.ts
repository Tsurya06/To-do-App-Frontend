import { API } from "../api/axiosInstance";
import { ReqType } from "../../types/apiResponseType";

const PROJECT_ENDPOINT = "api/v1/projects"; // Define your project API endpoint

export const createProject = async (req: ReqType) => {
    try {
        const response = await API.post(`${PROJECT_ENDPOINT}/create`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getProjectList = async (req: ReqType) => {
    try {
        const response = await API.get(`${PROJECT_ENDPOINT}/list`, {
            params: req.params
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getProjectById = async (req: ReqType) => {
    try {
        const response = await API.get(`${PROJECT_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const editProject = async (req: ReqType) => {
    try {
        const response = await API.put(`${PROJECT_ENDPOINT}/${req.id}`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteProjectById = async (req: ReqType) => {
    try {
        const response = await API.delete(`${PROJECT_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
// ... other project API calls
