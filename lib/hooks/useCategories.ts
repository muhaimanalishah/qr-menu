import { useMutation } from '@tanstack/react-query';
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput,
} from '../schema/categories.schema';
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '../actions/categories.actions';
import { toast } from 'sonner';

export function useCreateCategory() {
  return useMutation({
    mutationFn: (payload: CreateCategoryInput) => createCategoryAction(payload),
    onSuccess: () => toast.success('Category created successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: (payload: UpdateCategoryInput) => updateCategoryAction(payload),
    onSuccess: () => toast.success('Category updated successfully!'),
    onError: (error) => toast.error(error.message),
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (payload: DeleteCategoryInput) => deleteCategoryAction(payload),
    onSuccess: () => toast.success('Category deleted successfully!'),
    onError: (error) => toast.error(error.message),
  });
}
