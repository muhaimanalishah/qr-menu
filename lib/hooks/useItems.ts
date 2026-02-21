import { useMutation } from '@tanstack/react-query';
import {
  createItemAction,
  deleteItemAction,
  updateItemAction,
} from '../actions/items.actions';
import { toast } from 'sonner';
import {
  CreateItemInput,
  UpdateItemInput,
  DeleteItemInput,
} from '../schema/items.schema';

export function useCreateItem() {
  return useMutation({
    mutationFn: (payload: CreateItemInput) => createItemAction(payload),
    onSuccess: () => toast.success('Item created successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: (payload: UpdateItemInput) => updateItemAction(payload),
    onSuccess: () => toast.success('Item updated successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: (payload: DeleteItemInput) => deleteItemAction(payload),
    onSuccess: () => toast.success('Item deleted successfully!'),
    onError: (error) => toast.error(error.message),
  });
}
