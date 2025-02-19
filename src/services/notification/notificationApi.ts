import { API } from "../api/axiosInstance";
import { ReqType } from "../../types/apiResponseType";

const NOTIFICATION_ENDPOINT = "api/v1/notifications"; // Define your notification API endpoint

export const getNotificationList = async (req: ReqType) => {
    try {
        const response = await API.get(`${NOTIFICATION_ENDPOINT}/list`, {
            params: req.params
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const markAsRead = async (req: ReqType) => {
    try {
        const response = await API.put(`${NOTIFICATION_ENDPOINT}/${req.id}/mark-read`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createNotification = async (req: ReqType) => {
    try {
        const response = await API.post(`${NOTIFICATION_ENDPOINT}/create`, req.body);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteNotification = async (req: ReqType) => {
    try {
        const response = await API.delete(`${NOTIFICATION_ENDPOINT}/${req.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

