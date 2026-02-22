'use server';

import {
  createMenu,
  deleteMenu,
  getMenuBySlug,
  getMenusByRestaurant,
  updateMenu,
} from '../data/menuts.dal';
import {
  CreateMenuInput,
  createMenuSchema,
  DeleteMenuInput,
  deleteMenuSchema,
  UpdateMenuInput,
  updateMenuSchema,
} from '../schema/menus.schema';

export async function getMenusByRestaurantAction(restaurant_id: string) {
  const { data, error } = await getMenusByRestaurant(restaurant_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function getMenuBySlugAction(restaurant_id: string, slug: string) {
  const { data, error } = await getMenuBySlug(restaurant_id, slug);
  if (error) throw new Error(error.message);
  return data;
}

export async function createMenuAction(payload: CreateMenuInput) {
  const parsed = createMenuSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await createMenu(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateMenuAction(payload: UpdateMenuInput) {
  const parsed = updateMenuSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateMenu(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMenuAction(payload: DeleteMenuInput) {
  const parsed = deleteMenuSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await deleteMenu(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}
