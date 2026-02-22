import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserByIdAction, updateUserAction } from '../actions/users.actions';

export function useUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserByIdAction(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUserAction,
  });
}
