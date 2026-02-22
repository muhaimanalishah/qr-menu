'use server';

import { getUserById, updateUser } from '../data/users.dal';

export async function getUserByIdAction(id: string) {
  const { data, error } = await getUserById(id);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserAction(payload: {
  id: string;
  name?: string;
  email?: string;
  restaurant_id?: string | null;
}) {
  const { data, error } = await updateUser(payload);
  if (error) throw new Error(error.message);
  return data;
}