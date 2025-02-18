import { API } from '../api/axiosInstance';
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";

const ADD_TODOS_END_POINT='api/v1/todo'
const DELETE_TODOS_END_POINT='api/v1/todo/delete/'

export const createTodo = async (req:ReqType)=>{
    try{
        const url = `${ADD_TODOS_END_POINT}`
        const resp = await API.post(url, req.body ? req.body : {});
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const editTodo = async (req:ReqType)=>{
    try{
        const url = `${ADD_TODOS_END_POINT}/edit/${req.id}`
        const resp = await API.patch(url, req.body ? req.body : {});
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const getTodoList = async (req:ReqType) => {
    try {
        const url = `${ADD_TODOS_END_POINT}/get-todos`;
        const resp = await API.get(url, {
            params: req.params
        });
        return resp.data;
    } catch (error:any) {
        message.error(error.response?.data?.message || error.message);
        throw error;
    }
}
export const deleteTodoById = async (req:ReqType)=>{
    try{
        const url = `${DELETE_TODOS_END_POINT}${req.id}`
        const resp = await API.delete(url);
        return resp;
    }catch(error: any){
        message.error(error.message);
        throw error;
    }
}
