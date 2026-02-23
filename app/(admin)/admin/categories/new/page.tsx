import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { CategoryForm } from '@/components/admin/categories/category-form';

export default async function NewCategoryPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Category</h1>
        <p className="text-sm text-muted-foreground">
          Add a new category to group your menu items.
        </p>
      </div>
      <CategoryForm restaurantId={restaurant!.id} initialData={null} />
    </div>
  );
}