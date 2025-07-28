import axios from 'axios';
import type { LoginRequest } from '../types/User';

const API_URL = 'http://localhost:3000/api/auth'; // Replace with your backend URL

export const loginUser = async (data: LoginRequest) => {
  const response = await axios.post(`${API_URL}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};
