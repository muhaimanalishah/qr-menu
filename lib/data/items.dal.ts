import { createClient } from '../supabase/server';
import {
  CreateItemInput,
  UpdateItemInput,
  DeleteItemInput,
} from '../schema/items.schema';

export async function getItems() {
  const supabase = await createClient();
  return await supabase.from('items').select('*');
}

export async function createItem(payload: CreateItemInput) {
  const supabase = await createClient();
  return await supabase.from('items').insert([payload]);
}

export async function updateItem({ id, ...payload }: UpdateItemInput) {
  const supabase = await createClient();
  return await supabase.from('items').update(payload).eq('id', id);
}

export async function deleteItem({ id }: DeleteItemInput) {
  const supabase = await createClient();
  return await supabase.from('items').delete().eq('id', id);
}
