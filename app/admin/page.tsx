import CategorySection from './components/CategorySection';
import ItemSection from './components/ItemSection';
import { createClient } from '@/lib/supabase/server';

export default async function AdminPage() {
  const supabase = await createClient();

  const [catRes, itemRes] = await Promise.all([
    supabase.from('categories').select('*'),
    supabase.from('items').select('*'),
  ]);

  const categories = catRes.data || [];
  const items = itemRes.data || [];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-black mb-10">Admin Dashboard</h1>

      <CategorySection categories={categories} />
      <ItemSection items={items} categories={categories} />
    </div>
  );
}
