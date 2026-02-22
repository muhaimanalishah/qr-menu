import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';

export async function createUser({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  const supabase = await createClient();
  return await supabase.from('users').insert({ id, name, email });
}

export async function getUserById(id: string) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('users').select('*').eq('id', id).single();
}

export async function updateUser({
  id,
  ...payload
}: {
  id: string;
  name?: string;
  email?: string;
  restaurant_id?: string | null;
}) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('users').update(payload).eq('id', id);
}
