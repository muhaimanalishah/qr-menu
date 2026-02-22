import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createModifierGroupAction,
  deleteModifierGroupAction,
  getModifierGroupsAction,
  updateModifierGroupAction,
} from '../actions/modifier-groups.actions';

export function useModifierGroups(item_id: string) {
  return useQuery({
    queryKey: ['modifier-groups', item_id],
    queryFn: () => getModifierGroupsAction(item_id),
  });
}

export function useCreateModifierGroup() {
  return useMutation({
    mutationFn: createModifierGroupAction,
  });
}

export function useUpdateModifierGroup() {
  return useMutation({
    mutationFn: updateModifierGroupAction,
  });
}

export function useDeleteModifierGroup() {
  return useMutation({
    mutationFn: deleteModifierGroupAction,
  });
}