import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateModifierGroupInput,
  UpdateModifierGroupInput,
  DeleteModifierGroupInput,
} from '../schema/modifier-groups.schema';

export async function getModifierGroups(item_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('modifier_groups')
    .select('*')
    .eq('item_id', item_id);
}

export async function createModifierGroup(payload: CreateModifierGroupInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_groups').insert(payload);
}

export async function updateModifierGroup({ id, ...payload }: UpdateModifierGroupInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_groups').update(payload).eq('id', id);
}

export async function deleteModifierGroup({ id }: DeleteModifierGroupInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_groups').delete().eq('id', id);
}