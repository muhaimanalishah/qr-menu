import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { getItemById } from '@/lib/data/items.dal';
import { redirect } from 'next/navigation';
import { ItemForm } from '@/components/admin/items/item-form';

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: categories } = await getCategories(restaurant!.id);
  const { data: item } = await getItemById(id);

  if (!item) {
    redirect('/admin/items');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Item</h1>
        <p className="text-sm text-muted-foreground">
          Update the details for {item.name}.
        </p>
      </div>
      <ItemForm
        restaurantId={restaurant!.id}
        initialData={item}
        categories={categories ?? []}
      />
    </div>
  );
}
