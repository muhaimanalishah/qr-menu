import { createClient } from '../supabase/server';
import {
  CreateCategoryPayload,
  DeleteCategoryPayload,
  UpdateCategoryPayload,
} from '../types/categories.types';

export async function getCategories() {
  const supabase = await createClient();
  return await supabase.from('categories').select('*');
}

export async function createCategory(payload: CreateCategoryPayload) {
  const supabase = await createClient();
  return await supabase.from('categories').insert(payload);
}

export async function updateCategory({
  id,
  ...payload
}: UpdateCategoryPayload) {
  const supabase = await createClient();
  return await supabase.from('categories').update(payload).eq('id', id);
}

export async function deleteCategory({ id }: DeleteCategoryPayload) {
  const supabase = await createClient();
  return await supabase.from('categories').delete().eq('id', id);
}
