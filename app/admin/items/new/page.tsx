import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { ItemForm } from '@/components/admin/items/item-form';

export default async function NewItemPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: categories } = await getCategories(restaurant!.id);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Item</h1>
        <p className="text-sm text-muted-foreground">
          Add a new food or drink item to your restaurant.
        </p>
      </div>
      <ItemForm
        initialData={null}
        categories={categories ?? []}
      />
    </div>
  );
}
