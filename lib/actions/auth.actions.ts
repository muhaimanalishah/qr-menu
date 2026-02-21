'use server';

import { signIn, signOut, signUp } from '../data/auth.dal';
import { createUser, getUserById } from '../data/users.dal';
import {
  signInInput,
  signInSchema,
  signUpInput,
  signUpSchema,
} from '../schema/auth.schema';
import { createServiceClient } from '../supabase/server';

export async function emailSignUpAction(payload: signUpInput) {
  const parsed = signUpSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await signUp(parsed.data);
  if (error || !data.user) {
    throw new Error('Failed to sign up');
  }

  const { error: userError } = await createUser({
    id: data.user.id,
    name: parsed.data.name,
    email: parsed.data.email,
  });
  if (userError) {
    const serviceClient = createServiceClient();
    await serviceClient.auth.admin.deleteUser(data.user.id);
    throw new Error('Failed to create user');
  }
}

export async function emailSignInAction(payload: signInInput) {
  const parsed = signInSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await signIn(parsed.data);
  if (error || !data.session)
    throw new Error('Failed to sign in or found no session');

  const user = await getUserById(data.session.user.id);
  if (user.error || !user.data) throw new Error('User not found');

  return {
    id: data.session.user.id,
    email: data.session.user.email,
    name: user.data.name,
  };
}

export async function signOutAction() {
  await signOut();
}
