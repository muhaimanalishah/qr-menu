'use server';

import { revalidatePath } from 'next/cache';
import { createItem, updateItem, deleteItem } from '../data/items.dal';
import { createItemSchema, deleteItemSchema, updateItemSchema } from '../schema/items.schema';

export async function createItemAction(payload: unknown) {
  const parsed = createItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { error } = await createItem(parsed.data);
  if (error) throw new Error('Failed to create item');

  revalidatePath('/admin');
}

export async function updateItemAction(payload: unknown) {
  const parsed = updateItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { error } = await updateItem(parsed.data);
  if (error) throw new Error('Failed to update item');

  revalidatePath('/admin');
}

export async function deleteItemAction(payload: unknown) {
  const parsed = deleteItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');
  
  const { error } = await deleteItem(parsed.data);
  if (error) throw new Error('Failed to delete item');

  revalidatePath('/admin');
}
