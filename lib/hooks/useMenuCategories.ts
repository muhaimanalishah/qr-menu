import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addCategoryToMenuAction,
  getMenuCategoriesAction,
  removeCategoryFromMenuAction,
  updateMenuCategoryPositionAction,
} from '../actions/menu-categories.actions';

export function useMenuCategories(menu_id: string) {
  return useQuery({
    queryKey: ['menu-categories', menu_id],
    queryFn: () => getMenuCategoriesAction(menu_id),
    enabled: !!menu_id,
  });
}

export function useAddCategoryToMenu() {
  return useMutation({
    mutationFn: addCategoryToMenuAction,
  });
}

export function useRemoveCategoryFromMenu() {
  return useMutation({
    mutationFn: removeCategoryFromMenuAction,
  });
}

export function useUpdateMenuCategoryPosition() {
  return useMutation({
    mutationFn: updateMenuCategoryPositionAction,
  });
}