import axiosInstance from '../axios';
import { Track, CreateTrackData } from '@/types/track';

export const tracksApi = {
  // Get moderator tracks - CSR
  async getModeratorTracks(moderatorId: number): Promise<Track[]> {
    const response = await axiosInstance.get<Track[]>(`/moderators/${moderatorId}/tracks`);
    return response.data;
  },

  // Add track to moderator - CSR
  async addTrack(moderatorId: number, data: CreateTrackData): Promise<Track> {
    const response = await axiosInstance.post<Track>(`/moderators/${moderatorId}/tracks`, data);
    return response.data;
  },

  // Delete track - CSR
  async deleteTrack(trackId: number): Promise<void> {
    await axiosInstance.delete(`/moderators/tracks/${trackId}`);
  },
};

