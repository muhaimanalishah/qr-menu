import CategorySection from '@/components/admin/CategorySection';
import ItemSection from '@/components/admin/ItemSection';
import { getCategories } from '@/lib/data/categories.dal';
import { getItems } from '@/lib/data/items.dal';

export default async function AdminPage() {
  const [catRes, itemRes] = await Promise.all([getCategories(), getItems()]);

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
