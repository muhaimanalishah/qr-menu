import { createClient } from '../supabase/server';
import { getAuthenticatedUser } from './auth.dal';

export async function getQrCodeByMenu(menu_id: string) {
  const supabase = await createClient();
  return await supabase
    .from('qr_codes')
    .select('*')
    .eq('menu_id', menu_id)
    .single();
}

export async function createQrCode({
  menu_id,
  url,
}: {
  menu_id: string;
  url: string;
}) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('qr_codes').insert({ menu_id, url });
}

export async function deleteQrCode({ menu_id }: { menu_id: string }) {
  await getAuthenticatedUser();
  const supabase = await createClient();
  return await supabase.from('qr_codes').delete().eq('menu_id', menu_id);
}
