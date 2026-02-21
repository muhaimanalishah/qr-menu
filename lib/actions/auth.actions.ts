import { signUp } from '../data/auth.dal';
import { createUser } from '../data/users.dal';
import { signUpInput, signUpSchema } from '../schema/auth.schema';

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
