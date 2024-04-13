import Cookies from "js-cookie";
import { ReqType } from "../../todoThunks/TodoThunk";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:1234';
const ADD_TODOS_END_POINT='/api/v1/todo'
const DELETE_TODOS_END_POINT='/api/v1/todo/delete/'

export const createTodo = async (req:ReqType)=>{
    const token = Cookies.get('user');
    try{
        const url = `${ADD_TODOS_END_POINT}`
        const resp = await axios.post(url, req.body ? req.body : {}, {
            headers: {
                Authorization: `Bearer ${token ? JSON.parse(token).access : ''}`,
            },
        });
        return resp;
    }catch(error){
        throw error;
    }
}
export const getTodoList = async (req:ReqType)=>{
    try{
        const url = `${ADD_TODOS_END_POINT}/get-todos`
        const resp = await axios.get(url);
        return resp.data;
    }catch(error){
        throw error;
    }
}
export const deleteTodoById = async (req:ReqType)=>{
    try{
        const url = `${DELETE_TODOS_END_POINT}${req.id}`
        const resp = await axios.delete(url);
        return resp;
    }catch(error){
        throw error;
    }
}
