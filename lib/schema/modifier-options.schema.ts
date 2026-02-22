import { z } from 'zod';

export const createModifierOptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  modifier_group_id: z.uuid('Invalid modifier group ID'),
  price_modifier: z.number().default(0),
  position: z.number().optional().default(0),
});

export const updateModifierOptionSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  price_modifier: z.number().optional(),
  position: z.number().optional(),
});

export const deleteModifierOptionSchema = z.object({
  id: z.uuid(),
});

export type CreateModifierOptionInput = z.infer<typeof createModifierOptionSchema>;
export type UpdateModifierOptionInput = z.infer<typeof updateModifierOptionSchema>;
export type DeleteModifierOptionInput = z.infer<typeof deleteModifierOptionSchema>;