import { z } from 'zod';

export const createMenuSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, no spaces, and only contain alphanumeric characters or hyphens'),
  restaurant_id: z.uuid('Invalid restaurant ID'),
  is_active: z.boolean().optional().default(true),
});

export const updateMenuSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  is_active: z.boolean().optional(),
});

export const deleteMenuSchema = z.object({
  id: z.uuid(),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
export type DeleteMenuInput = z.infer<typeof deleteMenuSchema>;