import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createQrCodeAction,
  deleteQrCodeAction,
  getQrCodeByMenuAction,
} from '../actions/qr-codes.actions';

export function useQrCodeByMenu(menu_id: string) {
  return useQuery({
    queryKey: ['qr-code', menu_id],
    queryFn: () => getQrCodeByMenuAction(menu_id),
    enabled: !!menu_id,
  });
}

export function useCreateQrCode() {
  return useMutation({
    mutationFn: createQrCodeAction,
  });
}

export function useDeleteQrCode() {
  return useMutation({
    mutationFn: deleteQrCodeAction,
  });
}
