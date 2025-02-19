import { API } from "../api/axiosInstance";
import { ReqType } from "../../types/apiResponseType";

const USER_ENDPOINT = "api/v1/users"; // Define your user API endpoint

export const createUser = async (req: ReqType) => {
    try {
        const response = await API.post(`${USER_ENDPOINT}/create`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserList = async (req: ReqType) => {
    try {
        const response = await API.get(`${USER_ENDPOINT}/list`, {
            params: req.params
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const editUser = async (req: ReqType) => {
    try {
        const response = await API.put(`${USER_ENDPOINT}/${req.id}`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (req: ReqType) => {
    try {
        const response = await API.delete(`${USER_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (req: ReqType) => {
    try {
        const response = await API.get(`${USER_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// ... other user API calls (if needed for your features)
