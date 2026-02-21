import { signIn, signUp } from '../data/auth.dal';
import { createUser, getUserById } from '../data/users.dal';
import {
  signInInput,
  signInSchema,
  signUpInput,
  signUpSchema,
} from '../schema/auth.schema';

export async function signUpWithEmailAction(payload: signUpInput) {
  const parsed = signUpSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await signUp(parsed.data);
  if (error || !data.user) throw new Error('Failed to sign up');

  const { error: userError } = await createUser({
    id: data.user.id,
    name: parsed.data.name,
    email: parsed.data.email,
  });
  if (userError) throw new Error('Failed to create user');
}

export async function signInWithEmailAction(payload: signInInput) {
  const parsed = signInSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await signIn(parsed.data);
  if (error || !data.session)
    throw new Error('Failed to sign in or found no session');

  const user = await getUserById(data.session.user.id);
  if (user.error || !user.data) throw new Error('User not found');

  return { ...data.session.user, ...user.data };
}
