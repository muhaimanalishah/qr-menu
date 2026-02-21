'use server';

import { revalidatePath } from 'next/cache';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../data-access/categories.dal';
import {
  CreateCategoryPayload,
  DeleteCategoryPayload,
  UpdateCategoryPayload,
} from '../types/categories.types';

export async function createCategoryAction(payload: CreateCategoryPayload) {
  const { error } = await createCategory(payload);

  if (error) {
    return { error: error.message || 'Failed to create category' };
  }

  revalidatePath('/admin');
}

export async function updateCategoryAction(payload: UpdateCategoryPayload) {
  const { error } = await updateCategory(payload);

  if (error) {
    return { error: error.message || 'Failed to update category' };
  }

  revalidatePath('/admin');
}

export async function deleteCategoryAction({ id }: DeleteCategoryPayload) {
  const { error } = await deleteCategory({ id });

  if (error) {
    return { error: error.message || 'Failed to delete category' };
  }

  revalidatePath('/admin');
}
