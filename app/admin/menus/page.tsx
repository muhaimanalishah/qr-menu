import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getMenusByRestaurant } from '@/lib/data/menus.dal';
import { Button } from '@/components/ui/button';
import { AdminContainer } from '@/components/admin/admin-container';
import { MenusTable } from '@/components/admin/menus/menus-table';
import { redirect } from 'next/navigation';

export default async function MenusPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    redirect('/setup');
  }

  const { data: menus } = await getMenusByRestaurant(restaurant.id);

  return (
    <AdminContainer
      header={
        <div>
          <h1 className="text-2xl font-semibold">Menus</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your restaurant&apos;s menus and availability.
          </p>
        </div>
      }
      toolbar={
        <Button asChild>
          <Link href="/admin/menus/new">Create New Menu</Link>
        </Button>
      }
    >
      <MenusTable menus={menus || []} />
    </AdminContainer>
  );
}
