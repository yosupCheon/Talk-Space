import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export const createRoom = async (userData: {hostName: string, roomName: string}, token:string) => { 
  try {
    const response = await api.post('/room/create-room', {
      headers: { authorization: token as string }, data: userData });
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  } 
};

export const joinRoom = async (userData:{joinName:string, roomName: string}, token:string) => {
  try {
    const response = await api.put ('/room/join-room', {
      headers: { authorization: token as string }, data: userData });
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  }  
};

export const exitRoom = async (userData:{username:string, roomname: string}, token:string) => {
  try {
    const response = await api.put ('/room/exit-room', {
      headers: { authorization: token as string }, data: userData });
    return {"result":"success", "data":response.data};
  } catch (error) { 
    return {"result":"failed"}; 
  }  
};

