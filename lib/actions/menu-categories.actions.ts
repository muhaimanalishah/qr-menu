'use server';

import {
  addCategoryToMenu,
  getMenuCategories,
  removeCategoryFromMenu,
  updateMenuCategoryPosition,
} from '../data/menu-categories.dal';

export async function getMenuCategoriesAction(menu_id: string) {
  const { data, error } = await getMenuCategories(menu_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function addCategoryToMenuAction(payload: {
  menu_id: string;
  category_id: string;
  position?: number;
}) {
  const { data, error } = await addCategoryToMenu(payload);
  if (error) throw new Error(error.message);
  return data;
}

export async function removeCategoryFromMenuAction(payload: {
  menu_id: string;
  category_id: string;
}) {
  const { data, error } = await removeCategoryFromMenu(payload);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateMenuCategoryPositionAction(payload: {
  menu_id: string;
  category_id: string;
  position: number;
}) {
  const { data, error } = await updateMenuCategoryPosition(payload);
  if (error) throw new Error(error.message);
  return data;
}