import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createMenuAction,
  deleteMenuAction,
  getMenuBySlugAction,
  getMenusByRestaurantAction,
  updateMenuAction,
} from '../actions/menus.actions';

export function useMenusByRestaurant(restaurant_id: string) {
  return useQuery({
    queryKey: ['menus', restaurant_id],
    queryFn: () => getMenusByRestaurantAction(restaurant_id),
  });
}

export function useMenuBySlug(restaurant_id: string, slug: string) {
  return useQuery({
    queryKey: ['menu-by-slug', restaurant_id, slug],
    queryFn: () => getMenuBySlugAction(restaurant_id, slug),
  });
}

export function useCreateMenu() {
  return useMutation({
    mutationFn: createMenuAction,
  });
}

export function useUpdateMenu() {
  return useMutation({
    mutationFn: updateMenuAction,
  });
}

export function useDeleteMenu() {
  return useMutation({
    mutationFn: deleteMenuAction,
  });
}