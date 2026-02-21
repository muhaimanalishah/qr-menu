import { z } from 'zod';

export const createItemSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    price:  z.number().min(0, 'Price must be a positive number'),
    category_id: z.uuid('Invalid category ID'),
});

export const updateItemSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1).max(100).optional(),
    price: z.number().min(0).optional(),
    category_id: z.uuid().optional(),
    available: z.boolean().optional(),
});

export const deleteItemSchema = z.object({
    id: z.uuid(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type DeleteItemInput = z.infer<typeof deleteItemSchema>;