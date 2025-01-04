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

export const createRoom = async (userData: {hostName: string, roomName: string}) => { 
  try {
    const response = await api.post('/room/create-room', userData);
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  } 
};

export const joinRoom = async (userData:{joinName:string, roomName: string}) => {
  try {
    const response = await api.put ('/room/join-room', userData);
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  }  
};

export const exitRoom = async (userData:{username:string, roomname: string}) => {
  try {
    const response = await api.put ('/room/exit-room', userData);
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  }  
};

