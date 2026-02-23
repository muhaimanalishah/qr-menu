import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().optional(),
  image_url: z.string().optional(),
  base_price: z.number().min(0, 'Price must be at least 0').default(0),
  category_id: z.uuid('Invalid category ID'),
  available: z.boolean().optional(),
  sold_out: z.boolean().optional(),
  position: z.number().optional(),
});

export const updateItemSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  base_price: z.number().min(0).optional(),
  category_id: z.uuid().optional(),
  available: z.boolean().optional(),
  sold_out: z.boolean().optional(),
  position: z.number().optional(),
});

export const deleteItemSchema = z.object({
  id: z.uuid(),
});

export type ItemFormInput = z.input<typeof createItemSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type DeleteItemInput = z.infer<typeof deleteItemSchema>;
