import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateModifierOptionInput,
  UpdateModifierOptionInput,
  DeleteModifierOptionInput,
} from '../schema/modifier-options.schema';

export async function getModifierOptions(modifier_group_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('modifier_options')
    .select('*')
    .eq('modifier_group_id', modifier_group_id);
}

export async function createModifierOption(payload: CreateModifierOptionInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_options').insert(payload);
}

export async function updateModifierOption({
  id,
  ...payload
}: UpdateModifierOptionInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_options').update(payload).eq('id', id);
}

export async function deleteModifierOption({ id }: DeleteModifierOptionInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('modifier_options').delete().eq('id', id);
}
