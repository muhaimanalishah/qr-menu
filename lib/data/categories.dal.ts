import { createClient } from '../supabase/server';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  DeleteCategoryInput,
} from '../schema/categories.schema';
import { getAuthenticatedUser } from './auth.dal';

export async function getCategories() {
  const supabase = await createClient();
  return await supabase.from('categories').select('*');
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