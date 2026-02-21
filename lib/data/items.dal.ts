import { createClient } from '../supabase/server';
import {
  CreateItemPayload,
  DeleteItemPayload,
  UpdateItemPayload,
} from '../types/items.types';

export async function getItems() {
  const supabase = await createClient();
  return await supabase.from('items').select('*');
}

export async function createItem(payload: CreateItemPayload) {
  const supabase = await createClient();
  return await supabase.from('items').insert([payload]);
}

export async function updateItem({ id, ...payload }: UpdateItemPayload) {
  const supabase = await createClient();
  return await supabase.from('items').update(payload).eq('id', id);
}

export async function deleteItem({ id }: DeleteItemPayload) {
  const supabase = await createClient();
  return await supabase.from('items').delete().eq('id', id);
}
