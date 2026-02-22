import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateMenuInput,
  UpdateMenuInput,
  DeleteMenuInput,
} from '../schema/menus.schema';

export async function getMenusByRestaurant(restaurant_id: string) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase
    .from('menus')
    .select('*')
    .eq('restaurant_id', restaurant_id);
}

export async function getMenuBySlug(restaurant_id: string, slug: string) {
  const supabase = await createClient();
  return await supabase
    .from('menus')
    .select('*')
    .eq('restaurant_id', restaurant_id)
    .eq('slug', slug)
    .single();
}

export async function createMenu(payload: CreateMenuInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('menus').insert(payload);
}

export async function updateMenu({ id, ...payload }: UpdateMenuInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('menus').update(payload).eq('id', id);
}

export async function deleteMenu({ id }: DeleteMenuInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('menus').delete().eq('id', id);
}
