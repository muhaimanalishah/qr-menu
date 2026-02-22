'use server';

import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from '../data/items.dal';
import {
  CreateItemInput,
  createItemSchema,
  DeleteItemInput,
  deleteItemSchema,
  UpdateItemInput,
  updateItemSchema,
} from '../schema/items.schema';

export async function getItemsAction(category_id: string) {
  const { data, error } = await getItems(category_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function getItemByIdAction(id: string) {
  const { data, error } = await getItemById(id);
  if (error) throw new Error(error.message);
  return data;
}

export async function createItemAction(payload: CreateItemInput) {
  const parsed = createItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await createItem(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateItemAction(payload: UpdateItemInput) {
  const parsed = updateItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateItem(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteItemAction(payload: DeleteItemInput) {
  const parsed = deleteItemSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await deleteItem(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}
