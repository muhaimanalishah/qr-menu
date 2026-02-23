import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { RestaurantForm } from '@/components/admin/restaurants/restaurant-form';

export default async function RestaurantPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Restaurant</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {restaurant
            ? 'Update your restaurant details'
            : 'Set up your restaurant'}
        </p>
      </div>
      <RestaurantForm restaurant={restaurant ?? null} />
    </div>
  );
}
