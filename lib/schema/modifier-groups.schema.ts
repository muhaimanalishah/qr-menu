import { z } from 'zod';

export const createModifierGroupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  item_id: z.uuid('Invalid item ID'),
  selection_type: z.enum(['single', 'multiple']).default('single'),
  min_selections: z.number().min(0).default(0),
  max_selections: z.number().min(1).default(1),
  position: z.number().optional().default(0),
});

export const updateModifierGroupSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  selection_type: z.enum(['single', 'multiple']).optional(),
  min_selections: z.number().min(0).optional(),
  max_selections: z.number().min(1).optional(),
  position: z.number().optional(),
});

export const deleteModifierGroupSchema = z.object({
  id: z.uuid(),
});

export type CreateModifierGroupInput = z.infer<typeof createModifierGroupSchema>;
export type UpdateModifierGroupInput = z.infer<typeof updateModifierGroupSchema>;
export type DeleteModifierGroupInput = z.infer<typeof deleteModifierGroupSchema>;