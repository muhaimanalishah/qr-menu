import { Database } from './supabase.types';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

export type { Restaurant };
