import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateItemInput,
  UpdateItemInput,
  DeleteItemInput,
} from '../schema/items.schema';

export async function getItems(category_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('items')
    .select('*')
    .eq('category_id', category_id);
}

export async function getItemById(id: string) {
  const supabase = await createClient();
  return await supabase.from('items').select('*').eq('id', id).single();
}

export async function createItem(payload: CreateItemInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('items').insert(payload);
}

export async function updateItem({ id, ...payload }: UpdateItemInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('items').update(payload).eq('id', id);
}

export async function deleteItem({ id }: DeleteItemInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('items').delete().eq('id', id);
}
