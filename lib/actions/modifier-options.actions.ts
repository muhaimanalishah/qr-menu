'use server';

import {
  createModifierOption,
  deleteModifierOption,
  getModifierOptions,
  updateModifierOption,
} from '../data/modifier-options.dal';
import {
  CreateModifierOptionInput,
  createModifierOptionSchema,
  DeleteModifierOptionInput,
  deleteModifierOptionSchema,
  UpdateModifierOptionInput,
  updateModifierOptionSchema,
} from '../schema/modifier-options.schema';

export async function getModifierOptionsAction(modifier_group_id: string) {
  const { data, error } = await getModifierOptions(modifier_group_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function createModifierOptionAction(payload: CreateModifierOptionInput) {
  const parsed = createModifierOptionSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await createModifierOption(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateModifierOptionAction(payload: UpdateModifierOptionInput) {
  const parsed = updateModifierOptionSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await updateModifierOption(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteModifierOptionAction(payload: DeleteModifierOptionInput) {
  const parsed = deleteModifierOptionSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Invalid payload');

  const { data, error } = await deleteModifierOption(parsed.data);
  if (error) throw new Error(error.message);
  return data;
}