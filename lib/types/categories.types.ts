import { Database } from './supabase.types';

type Category = Database['public']['Tables']['categories']['Row'];

export type { Category };
