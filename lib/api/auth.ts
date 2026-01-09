import axiosInstance from '../axios';
import { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';

export const authApi = {
  // Login - CSR
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register - CSR
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

