'use server';

import {
  createQrCode,
  deleteQrCode,
  getQrCodeByMenu,
} from '../data/qr-codes.dal';

export async function getQrCodeByMenuAction(menu_id: string) {
  const { data, error } = await getQrCodeByMenu(menu_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function createQrCodeAction(payload: {
  menu_id: string;
  url: string;
}) {
  const { data, error } = await createQrCode(payload);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteQrCodeAction(menu_id: string) {
  const { data, error } = await deleteQrCode({ menu_id });
  if (error) throw new Error(error.message);
  return data;
}