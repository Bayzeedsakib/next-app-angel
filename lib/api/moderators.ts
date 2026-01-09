import axiosInstance from '../axios';
import { Moderator, UpdateModeratorData } from '@/types/moderator';
import Cookies from 'js-cookie';

export const moderatorsApi = {
  // Get all moderators - SSR/CSR
  async getModerators(token?: string): Promise<Moderator[]> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axiosInstance.get<Moderator[]>('/moderators', { headers });
    return response.data;
  },

  // Get single moderator - SSR/CSR
  async getModerator(id: number, token?: string): Promise<Moderator> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axiosInstance.get<Moderator>(`/moderators/${id}`, { headers });
    return response.data;
  },

  // Update moderator - CSR
  async updateModerator(id: number, data: UpdateModeratorData): Promise<Moderator> {
    const response = await axiosInstance.put<Moderator>(`/moderators/${id}`, data);
    return response.data;
  },

  // Update moderator status - CSR
  async updateModeratorStatus(id: number, status: 'active' | 'inactive'): Promise<Moderator> {
    const response = await axiosInstance.patch<Moderator>(`/moderators/${id}/status`, { status });
    return response.data;
  },

  // Delete moderator - CSR
  async deleteModerator(id: number): Promise<void> {
    await axiosInstance.delete(`/moderators/${id}`);
  },
};

