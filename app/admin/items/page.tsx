import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getItemsByRestaurant } from '@/lib/data/items.dal';
import { Button } from '@/components/ui/button';
import { ItemsTable } from '@/components/admin/items/items-table';

export default async function ItemsPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: items } = await getItemsByRestaurant(restaurant!.id);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Menu Items</h1>
          <p className="text-sm text-muted-foreground">
            Manage the food and drink items on your menus.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/items/new">Create New Item</Link>
        </Button>
      </div>

      <ItemsTable items={items || []} />
    </div>
  );
}
