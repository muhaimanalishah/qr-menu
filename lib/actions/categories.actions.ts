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
} from '../types/categories.types';

export async function createCategoryAction(payload: CreateCategoryPayload) {
  const { error } = await createCategory(payload);

  if (!error) {
    revalidatePath('/admin');
  }
}

export async function updateCategoryAction(payload: CreateCategoryPayload) {
  const { error } = await updateCategory(payload);

  if (!error) {
    revalidatePath('/admin');
  }
}

export async function deleteCategoryAction({ id }: DeleteCategoryPayload) {
  const { error } = await deleteCategory({ id });

  if (!error) {
    revalidatePath('/admin');
  }
}
