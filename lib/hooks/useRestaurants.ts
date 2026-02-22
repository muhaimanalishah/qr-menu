import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createRestaurantAction,
  deleteRestaurantAction,
  getRestaurantByOwnerAction,
  getRestaurantBySlugAction,
  updateRestaurantAction,
} from '../actions/restaurants.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return useMutation({
    mutationFn: createRestaurantAction,
    onSuccess: () => {
      toast.success('Restaurant created successfully');
      router.replace('/admin');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateRestaurant() {
  return useMutation({
    mutationFn: updateRestaurantAction,
    onSuccess: () => {
      toast.success('Restaurant updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteRestaurant() {
  return useMutation({
    mutationFn: deleteRestaurantAction,
  });
}
