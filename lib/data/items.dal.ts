import { createClient } from '../supabase/server';
import {
  CreateItemInput,
  UpdateItemInput,
  DeleteItemInput,
} from '../schema/items.schema';
import { getAuthenticatedUser } from './auth.dal';

export async function getItems() {
  const supabase = await createClient();
  return await supabase.from('items').select('*');
}

export async function createItem(payload: CreateItemInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('items').insert([payload]);
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