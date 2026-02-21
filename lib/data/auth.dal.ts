import { signUpInput, signInInput } from '../schema/auth.schema';
import { createClient } from '../supabase/server';

export async function signUp({ email, password }: signUpInput) {
  const supabase = await createClient();
  return await supabase.auth.signUp({
    email: email,
    password: password,
  });
}

export async function signIn({ email, password }: signInInput) {
  const supabase = await createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut();
}