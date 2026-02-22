import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
} from '../schema/categories.schema';

export async function getCategories(restaurant_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant_id);
}

export async function getCategoryById(id: string) {
  const supabase = await createClient();
  return await supabase.from('categories').select('*').eq('id', id).single();
}

export async function createCategory(payload: CreateCategoryInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('categories').insert(payload);
}

export async function updateCategory({ id, ...payload }: UpdateCategoryInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('categories').update(payload).eq('id', id);
}

export async function deleteCategory({ id }: DeleteCategoryInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('categories').delete().eq('id', id);
}
