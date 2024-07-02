import Cookies from "js-cookie";
import axios from "axios";
import { ReqType } from "../../types/apiResponseType";
import { message } from "antd";

const devURL = import.meta.env.VITE_BASE_URL;
const ADD_TODOS_END_POINT='api/v1/todo'
const DELETE_TODOS_END_POINT='api/v1/todo/delete/'
const API = axios.create({
    baseURL: devURL,
  });
export const createTodo = async (req:ReqType)=>{
    const token = Cookies.get('userDetail');
    try{
        const url = `${ADD_TODOS_END_POINT}`
        const resp = await API.post(url, req.body ? req.body : {}, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const editTodo = async (req:ReqType)=>{
    const token = Cookies.get('userDetail');
    try{
        const url = `${ADD_TODOS_END_POINT}/edit/${req.id}`
        const resp = await API.patch(url, req.body ? req.body : {}, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const getTodoList = async (req:ReqType) => {
    const token = Cookies.get('userDetail');
    try {
        const url = `${ADD_TODOS_END_POINT}/get-todos`;
        const config = {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
            params: req.params ,
        };
        const resp = await API.get(url, config);
        return resp.data;
    } catch (error:any) {
        Cookies.remove('userDetail');
        window.location.reload();
        message.error(error.message);
        throw error;
    }
}
export const deleteTodoById = async (req:ReqType)=>{
    const token = Cookies.get('userDetail');
    try{
        const url = `${DELETE_TODOS_END_POINT}${req.id}`
        const resp = await API.delete(url,{
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error: any){
        message.error(error.message);
        throw error;
    }
}
