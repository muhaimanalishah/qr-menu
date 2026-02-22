import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from '../schema/restaurants.schema';

export async function getRestaurantByOwner(owner_id: string) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', owner_id)
    .single();
}

export async function getRestaurantBySlug(slug: string) {
  const supabase = await createClient();
  return await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single();
}

export async function createRestaurant(payload: CreateRestaurantInput, owner_id: string) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('restaurants').insert({ ...payload, owner_id });
}

export async function updateRestaurant({ id, ...payload }: UpdateRestaurantInput) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('restaurants').update(payload).eq('id', id);
}

export async function deleteRestaurant({ id }: { id: string }) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('restaurants').delete().eq('id', id);
}