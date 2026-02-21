'use server';

import { revalidatePath } from 'next/cache';
import {
  CreateItemPayload,
  UpdateItemPayload,
  DeleteItemPayload,
} from '../types/items.types';
import { createItem, updateItem, deleteItem } from '../data-access/items.dal';

export async function createItemAction(payload: CreateItemPayload) {
  const { error } = await createItem(payload);

  if (error) {
    return { error: error.message || 'Failed to create item' };
  }

  revalidatePath('/admin');
}

export async function updateItemAction(payload: UpdateItemPayload) {
  const { error } = await updateItem(payload);

  if (error) {
    return { error: error.message || 'Failed to update item' };
  }

  revalidatePath('/admin');
}

export async function deleteItemAction(payload: DeleteItemPayload) {
  const { error } = await deleteItem(payload);

  if (error) {
    return { error: error.message || 'Failed to delete item' };
  }

  revalidatePath('/admin');
}
