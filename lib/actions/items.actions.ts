'use server';

import { revalidatePath } from 'next/cache';
import {
  CreateItemPayload,
  UpdateItemPayload,
  DeleteItemPayload,
} from '../types/items.types';
import {
  createItem,
  updateItem,
  deleteMenuItem,
} from '../data-access/items.dal';

export async function createItemAction(payload: CreateItemPayload) {
  const { error } = await createItem(payload);
  if (!error) {
    revalidatePath('/admin/items');
  }
}

export async function updateItemAction(payload: UpdateItemPayload) {
  const { error } = await updateItem(payload);
  if (!error) {
    revalidatePath('/admin/items');
  }
}

export async function deleteItemAction(payload: DeleteItemPayload) {
  const { error } = await deleteMenuItem(payload);
  if (!error) {
    revalidatePath('/admin/items');
  }
}
