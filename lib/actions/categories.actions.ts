'use server';

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../data/categories.dal';
import {
  CreateCategoryInput,
  createCategorySchema,
  DeleteCategoryInput,
  deleteCategorySchema,
  UpdateCategoryInput,
  updateCategorySchema,
} from '../schema/categories.schema';

export async function getCategoriesAction(restaurant_id: string) {
  const { data, error } = await getCategories(restaurant_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function getCategoryByIdAction(id: string) {
  const { data, error } = await getCategoryById(id);
  if (error) throw new Error(error.message);
  return data;
}

export async function createCategoryAction(payload: CreateCategoryInput) {
  const parsed = createCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await createCategory(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCategoryAction(payload: UpdateCategoryInput) {
  const parsed = updateCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateCategory(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCategoryAction(payload: DeleteCategoryInput) {
  const parsed = deleteCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await deleteCategory(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}
