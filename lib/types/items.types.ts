import { Database } from './supabase.types';

type Item = Database['public']['Tables']['items']['Row'];

export type { Item };
