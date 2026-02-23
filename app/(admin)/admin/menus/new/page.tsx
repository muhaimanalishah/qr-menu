import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { redirect } from 'next/navigation';
import { MenuForm } from '@/components/admin/menu-form';

export default async function NewMenuPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    redirect('/setup');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create Menu</h1>
        <p className="text-sm text-muted-foreground">
          Add a new menu to your restaurant.
        </p>
      </div>
      <MenuForm restaurantId={restaurant.id} initialData={null} />
    </div>
  );
}