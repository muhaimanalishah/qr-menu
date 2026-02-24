import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getItemsByRestaurant } from '@/lib/data/items.dal';
import { Button } from '@/components/ui/button';
import { AdminContainer } from '@/components/admin/admin-container';
import { ItemsTable } from '@/components/admin/items/items-table';

export default async function ItemsPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: items } = await getItemsByRestaurant(restaurant!.id);

  return (
    <AdminContainer
      header={
        <div>
          <h1 className="text-2xl font-semibold">Menu Items</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the food and drink items on your menus.
          </p>
        </div>
      }
      toolbar={
        <Button asChild>
          <Link href="/admin/items/new">Create New Item</Link>
        </Button>
      }
    >
      <ItemsTable items={items || []} />
    </AdminContainer>
  );
}
