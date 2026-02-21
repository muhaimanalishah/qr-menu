import { createClient } from '../supabase/server';

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
  const supabase = await createClient();
  return await supabase
    .from('users')
    .select('name, email')
    .eq('id', id)
    .single();
}
