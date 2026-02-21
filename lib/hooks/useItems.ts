import { useMutation } from '@tanstack/react-query';
import {
  CreateItemPayload,
  DeleteItemPayload,
  UpdateItemPayload,
} from '../types/items.types';
import {
  createItemAction,
  deleteItemAction,
  updateItemAction,
} from '../actions/items.actions';
import { toast } from 'sonner';

export function useCreateItem() {
  return useMutation({
    mutationFn: (payload: CreateItemPayload) => createItemAction(payload),
    onSuccess: () => toast.success('Item created successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: (payload: UpdateItemPayload) => updateItemAction(payload),
    onSuccess: () => toast.success('Item updated successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: (payload: DeleteItemPayload) => deleteItemAction(payload),
    onSuccess: () => toast.success('Item deleted successfully!'),
    onError: (error) => toast.error(error.message),
  });
}
