import { Database } from './supabase.types';

type Category = Database['public']['Tables']['categories']['Row'];
type CreateCategoryPayload =
  Database['public']['Tables']['categories']['Insert'];
type UpdateCategoryPayload =
  Database['public']['Tables']['categories']['Update'];
type DeleteCategoryPayload = { id: string };

export type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  DeleteCategoryPayload,
};
