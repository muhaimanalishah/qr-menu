import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getMenuById } from '@/lib/data/menus.dal';
import { redirect } from 'next/navigation';
import { MenuForm } from '@/components/admin/menu-form';

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    redirect('/setup');
  }

  const { data: menu } = await getMenuById(id);

  if (!menu) {
    redirect('/admin/menus');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Menu</h1>
        <p className="text-sm text-muted-foreground">
          Update the details for {menu.name}.
        </p>
      </div>
      <MenuForm restaurantId={restaurant.id} initialData={menu} />
    </div>
  );
}