import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export const login = async (userData: {username:string; password:string}) => {
  try {
    const response = await api.post('/user/login', userData);
    console.log(response)
    return {"result":"success", "data":response.data};
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

export const updateUser = async (userData: { username: string; newPassword: string }) => {
    try {
        const response = await api.put('/user/update-user', userData);  
        return {"result":"success", "data":response.data};
    } catch (error) {
        return {"result":"failed"}; 
    }
};

export const deleteUser = async (userData: { username: string;}) => {
    try {
        const response = await api.delete('/user/delete-user', {data: userData});  
        return {"result":"success", "data":response.data};
    } catch (error) {
        return {"result":"failed"}; 
    }
};
