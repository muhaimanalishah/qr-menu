import { z } from 'zod';

export const createRestaurantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must be lowercase, no spaces, and only contain alphanumeric characters or hyphens'
    ),
  description: z.string().optional(),
  cuisine_type: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.url().or(z.literal('')).optional(),
  currency: z.string().default('USD'),
  language_direction: z.enum(['ltr', 'rtl']).default('ltr'),
  primary_color: z.string().optional(),
});

export const updateRestaurantSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  description: z.string().optional(),
  cuisine_type: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.url().or(z.literal('')).optional(),
  currency: z.string().optional(),
  language_direction: z.enum(['ltr', 'rtl']).optional(),
  primary_color: z.string().optional(),
});

export type wRestaurantFormValues = z.input<typeof createRestaurantSchema>;
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>;
