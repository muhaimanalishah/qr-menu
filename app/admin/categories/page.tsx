import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { Button } from '@/components/ui/button';
import { CategoriesTable } from '@/components/admin/categories/categories-table';

export default async function CategoriesPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: categories } = await getCategories(restaurant!.id);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Organize your menu items into different categories.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">Create New Category</Link>
        </Button>
      </div>

      <CategoriesTable categories={categories || []} />
    </div>
  );
}
