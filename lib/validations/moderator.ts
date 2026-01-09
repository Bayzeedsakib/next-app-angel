import { z } from 'zod';

export const updateModeratorSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

export type UpdateModeratorFormData = z.infer<typeof updateModeratorSchema>;

