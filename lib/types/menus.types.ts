import { Database } from './supabase.types';

type Menu = Database['public']['Tables']['menus']['Row'];

export type { Menu };
