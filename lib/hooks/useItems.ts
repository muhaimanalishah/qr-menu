import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createItemAction,
  deleteItemAction,
  getItemByIdAction,
  getItemsAction,
  updateItemAction,
} from '../actions/items.actions';

export function useItems(category_id: string) {
  return useQuery({
    queryKey: ['items', category_id],
    queryFn: () => getItemsAction(category_id),
  });
}

export function useItemById(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => getItemByIdAction(id),
  });
}

export function useCreateItem() {
  return useMutation({
    mutationFn: createItemAction,
  });
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: updateItemAction,
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: deleteItemAction,
  });
}
