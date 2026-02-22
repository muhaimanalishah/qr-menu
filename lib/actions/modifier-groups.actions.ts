'use server';

import {
  createModifierGroup,
  deleteModifierGroup,
  getModifierGroups,
  updateModifierGroup,
} from '../data/modifier-groups.dal';
import {
  CreateModifierGroupInput,
  createModifierGroupSchema,
  DeleteModifierGroupInput,
  deleteModifierGroupSchema,
  UpdateModifierGroupInput,
  updateModifierGroupSchema,
} from '../schema/modifier-groups.schema';

export async function getModifierGroupsAction(item_id: string) {
  const { data, error } = await getModifierGroups(item_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function createModifierGroupAction(payload: CreateModifierGroupInput) {
  const parsed = createModifierGroupSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await createModifierGroup(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateModifierGroupAction(payload: UpdateModifierGroupInput) {
  const parsed = updateModifierGroupSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateModifierGroup(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteModifierGroupAction(payload: DeleteModifierGroupInput) {
  const parsed = deleteModifierGroupSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await deleteModifierGroup(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}