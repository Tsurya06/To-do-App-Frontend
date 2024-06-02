import Cookies from "js-cookie";
import axios from "axios";
import { ReqType } from "../../types/apiResponseType";

const devURL = import.meta.env.VITE_BASE_URL;
const ADD_TODOS_END_POINT='api/v1/todo'
const DELETE_TODOS_END_POINT='api/v1/todo/delete/'

export const createTodo = async (req:ReqType)=>{
    const token = Cookies.get('user');
    try{
        const url = `${devURL}${ADD_TODOS_END_POINT}`
        const resp = await axios.post(url, req.body ? req.body : {}, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        console.log("resp",resp)
        return resp;
    }catch(error){
        throw error;
    }
}
export const editTodo = async (req:ReqType)=>{
    const token = Cookies.get('user');
    try{
        const url = `${devURL}${ADD_TODOS_END_POINT}/edit/${req.id}`
        const resp = await axios.patch(url, req.body ? req.body : {}, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error){
        throw error;
    }
}
export const getTodoList = async (req: ReqType) => {
    const token = Cookies.get('user');
    try {
        const url = `${devURL}${ADD_TODOS_END_POINT}/get-todos`;
        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp.data;
    } catch (error) {
        Cookies.remove('user');
        window.location.reload();
        throw error;
    }
}
export const deleteTodoById = async (req:ReqType)=>{
    const token = Cookies.get('user');
    try{
        const url = `${devURL}${DELETE_TODOS_END_POINT}${req.id}`
        const resp = await axios.delete(url,{
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error){
        throw error;
    }
}
