import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createModifierOptionAction,
  deleteModifierOptionAction,
  getModifierOptionsAction,
  updateModifierOptionAction,
} from '../actions/modifier-options.actions';

export function useModifierOptions(modifier_group_id: string) {
  return useQuery({
    queryKey: ['modifier-options', modifier_group_id],
    queryFn: () => getModifierOptionsAction(modifier_group_id),
  });
}

export function useCreateModifierOption() {
  return useMutation({
    mutationFn: createModifierOptionAction,
  });
}

export function useUpdateModifierOption() {
  return useMutation({
    mutationFn: updateModifierOptionAction,
  });
}

export function useDeleteModifierOption() {
  return useMutation({
    mutationFn: deleteModifierOptionAction,
  });
}
