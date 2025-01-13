import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export const login = async (userData: {username:string; password:string}) => {
  try {
    const response = await api.post('/user/login', userData); 
    return {"result":"success", "data":response.data, "token":response.data.token};
  } catch (error) {  
    return {"result":"failed"}; 
  }
};

export const createUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await api.post('/user/create-user', userData);  
    return {"result":"success", "data":response.data};
  } catch (error) {
    return {"result":"failed"}; 
  }
};

export const updateUser = async (userData: { username: string; newPassword: string}, token:String) => {
    try {
        const response = await api.put('/user/update-user', userData, {headers:{authorization: token as string}});
        return {"result":"success", "data":response.data};
    } catch (error) {
        return {"result":"failed"}; 
    }
};

export const deleteUser = async (userData: { username: string;}, token:String) => {
    try {
      const response = await api.delete('/user/delete-user', {
        headers: { authorization: token as string }, data: userData });
        return {"result":"success", "data":response.data};
    } catch (error) {
        return {"result":"failed"}; 
    }
};
