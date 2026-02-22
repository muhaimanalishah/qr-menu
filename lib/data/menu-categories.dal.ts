import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';

export async function getMenuCategories(menu_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('menu_categories')
    .select('*')
    .eq('menu_id', menu_id);
}

export async function addCategoryToMenu(payload: {
  menu_id: string;
  category_id: string;
  position?: number;
}) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('menu_categories').insert(payload);
}

export async function removeCategoryFromMenu({
  menu_id,
  category_id,
}: {
  menu_id: string;
  category_id: string;
}) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase
    .from('menu_categories')
    .delete()
    .eq('menu_id', menu_id)
    .eq('category_id', category_id);
}

export async function updateMenuCategoryPosition({
  menu_id,
  category_id,
  position,
}: {
  menu_id: string;
  category_id: string;
  position: number;
}) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase
    .from('menu_categories')
    .update({ position })
    .eq('menu_id', menu_id)
    .eq('category_id', category_id);
}
