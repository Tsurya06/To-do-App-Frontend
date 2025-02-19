import { API } from '../api/axiosInstance';
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";

const ADD_TASKS_END_POINT='api/v1/task'
const DELETE_TASKS_END_POINT='api/v1/task/delete/'

export const createTask = async (req:ReqType)=>{
    try{
        const url = `${ADD_TASKS_END_POINT}`
        const resp = await API.post(url, req.body ? req.body : {});
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const editTask = async (req:ReqType)=>{
    try{
        const url = `${ADD_TASKS_END_POINT}/edit/${req.id}`
        const resp = await API.patch(url, req.body ? req.body : {});
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const getTaskList = async (req:ReqType) => {
    try {
        const url = `${ADD_TASKS_END_POINT}/get-tasks`;
        const resp = await API.get(url, {
            params: req.params
        });
        return resp.data;
    } catch (error:any) {
        message.error(error.response?.data?.message || error.message);
        throw error;
    }
}
export const deleteTaskById = async (req:ReqType)=>{
    try{
        const url = `${DELETE_TASKS_END_POINT}${req.id}`
        const resp = await API.delete(url);
        return resp;
    }catch(error: any){
        message.error(error.message);
        throw error;
    }
}

export const getTaskById = async (req: { id: string }) => {
    try {
        const url = `${ADD_TASKS_END_POINT}/${req.id}`;
        const resp = await API.get(url);
        return resp.data;
    } catch (error: any) {
        message.error(error.response?.data?.message || error.message);
        throw error;
    }
}

export const addComment = async (req: { body: { taskId: string; text: string } }) => {
    try {
        const url = `${ADD_TASKS_END_POINT}/${req.body.taskId}/comments`;
        const resp = await API.post(url, req.body);
        return resp.data;
    } catch (error: any) {
        message.error(error.response?.data?.message || error.message);
        throw error;
    }
}
