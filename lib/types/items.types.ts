import { Database } from './supabase.types';

type Item = Database['public']['Tables']['items']['Row'];
type CreateItemPayload = Database['public']['Tables']['items']['Insert'];
type UpdateItemPayload = Database['public']['Tables']['items']['Update'] & { id: string };
type DeleteItemPayload = { id: string };

export type { Item, CreateItemPayload, UpdateItemPayload, DeleteItemPayload };
