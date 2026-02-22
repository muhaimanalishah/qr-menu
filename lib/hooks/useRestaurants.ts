import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createRestaurantAction,
  deleteRestaurantAction,
  getRestaurantByOwnerAction,
  getRestaurantBySlugAction,
  updateRestaurantAction,
} from '../actions/restaurants.actions';

export function useRestaurantByOwner(owner_id: string) {
  return useQuery({
    queryKey: ['restaurant-by-owner', owner_id],
    queryFn: () => getRestaurantByOwnerAction(owner_id),
  });
}

export function useRestaurantBySlug(slug: string) {
  return useQuery({
    queryKey: ['restaurant-by-slug', slug],
    queryFn: () => getRestaurantBySlugAction(slug),
  });
}

export function useCreateRestaurant() {
  return useMutation({
    mutationFn: createRestaurantAction,
  });
}

export function useUpdateRestaurant() {
  return useMutation({
    mutationFn: updateRestaurantAction,
  });
}

export function useDeleteRestaurant() {
  return useMutation({
    mutationFn: deleteRestaurantAction,
  });
}
