import { useMutation } from "@tanstack/react-query";
import { CreateCategoryPayload, DeleteCategoryPayload, UpdateCategoryPayload } from "../types/categories.types";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "../actions/categories.actions";
import { toast } from "sonner";

export function useCreateCategory() {
  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategoryAction(payload),
    onSuccess: () => toast.success('Category created successfully!'),
    onError: (error) => toast.error(error.message)
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => updateCategoryAction(payload),
    onSuccess: () => toast.success('Category updated successfully!'),
    onError: (error) => toast.error(error.message)
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (payload: DeleteCategoryPayload) => deleteCategoryAction(payload),
    onSuccess: () => toast.success('Category deleted successfully!'),
    onError: (error) => toast.error(error.message)
  });
}