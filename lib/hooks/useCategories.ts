import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  getCategoryByIdAction,
  updateCategoryAction,
} from '../actions/categories.actions';

export function useCategories(restaurant_id: string) {
  return useQuery({
    queryKey: ['categories', restaurant_id],
    queryFn: () => getCategoriesAction(restaurant_id),
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryByIdAction(id),
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategoryAction,
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategoryAction,
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategoryAction,
  });
}
