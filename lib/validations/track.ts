import { z } from 'zod';

export const createTrackSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  artist: z.string().max(100, 'Artist name must be less than 100 characters').optional(),
});

export type CreateTrackFormData = z.infer<typeof createTrackSchema>;

