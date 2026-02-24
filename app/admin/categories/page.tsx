import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { Button } from '@/components/ui/button';
import { AdminContainer } from '@/components/admin/admin-container';
import { CategoriesTable } from '@/components/admin/categories/categories-table';

export default async function CategoriesPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: categories } = await getCategories(restaurant!.id);

  return (
    <AdminContainer
      header={
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your menu items into different categories.
          </p>
        </div>
      }
      toolbar={
        <Button asChild>
          <Link href="/admin/categories/new">Create New Category</Link>
        </Button>
      }
    >
      <CategoriesTable categories={categories || []} />
    </AdminContainer>
  );
}
