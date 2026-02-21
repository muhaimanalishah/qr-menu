'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../data/categories.dal';
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from '../schema/categories.schema';

export async function createCategoryAction(payload: unknown) {
  const parsed = createCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');
  const { error } = await createCategory(parsed.data);
  if (error) throw new Error('Failed to create category');

  revalidatePath('/admin');
}

export async function updateCategoryAction(payload: unknown) {
  const parsed = updateCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { error } = await updateCategory(parsed.data);
  if (error) throw new Error('Failed to update category');

  revalidatePath('/admin');
}

export async function deleteCategoryAction(payload: unknown) {
  const parsed = deleteCategorySchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { error } = await deleteCategory(parsed.data);
  if (error) throw new Error('Failed to delete category');

  revalidatePath('/admin');
}
