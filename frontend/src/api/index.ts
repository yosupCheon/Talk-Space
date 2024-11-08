import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
}); 

export const login = async (userData: {username:string; password:string}) => {
  try {
    const response = await api.post('login', userData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userData: { username: string; password: string }) => {
  const response = await api.post('/create-user', userData);
  return response.data;
};
