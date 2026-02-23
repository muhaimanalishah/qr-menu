import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().optional(),
  image_url: z.string().optional(),
  restaurant_id: z.uuid('Invalid restaurant ID'),
});

export const updateCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export const deleteCategorySchema = z.object({
  id: z.uuid(),
});

export type CategoryFormInput = z.input<typeof createCategorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;
