import { API } from "../api/axiosInstance";
import { ReqType } from "../../types/apiResponseType";

const USER_ENDPOINT = "auth"; // Define your user API endpoint
const USER_LIST_ENDPOINT = "/api/v1/admin/users";
export const createUser = async (req: ReqType) => {
    try {
        const response = await API.post(`${USER_ENDPOINT}/admin/users`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserList = async (req: ReqType) => {
    try {
        const response = await API.get(`${USER_LIST_ENDPOINT}`, {
            params: req.params
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editUser = async (req: ReqType) => {
    try {
        const response = await API.patch(`${USER_LIST_ENDPOINT}/${req.id}`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteUserById = async (req: ReqType) => {
    try {
        const response = await API.delete(`${USER_LIST_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (req: ReqType) => {
    try {
        const response = await API.get(`${USER_LIST_ENDPOINT}/${req.id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ... other user API calls (if needed for your features)
