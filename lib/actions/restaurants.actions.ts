'use server';

import { getAuthenticatedUser } from '../data/auth.dal';
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurantByOwner,
  getRestaurantBySlug,
  updateRestaurant,
} from '../data/restaurants.dal';
import {
  CreateRestaurantInput,
  createRestaurantSchema,
  UpdateRestaurantInput,
  updateRestaurantSchema,
} from '../schema/restaurants.schema';

export async function getRestaurantByOwnerAction(owner_id: string) {
  const { data, error } = await getRestaurantByOwner(owner_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function getRestaurantBySlugAction(slug: string) {
  const { data, error } = await getRestaurantBySlug(slug);
  if (error) throw new Error(error.message);
  return data;
}

export async function createRestaurantAction(payload: CreateRestaurantInput) {
  const parsed = createRestaurantSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const user = await getAuthenticatedUser();

  const { data, error } = await createRestaurant(parsed.data, user.id);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateRestaurantAction(payload: UpdateRestaurantInput) {
  const parsed = updateRestaurantSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateRestaurant(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteRestaurantAction(id: string) {
  const { data, error } = await deleteRestaurant({ id });
  if (error) throw new Error(error.message);
  return data;
}
