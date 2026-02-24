import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { AdminContainer } from '@/components/admin/admin-container';
import { RestaurantForm } from '@/components/admin/restaurants/restaurant-form';

export default async function RestaurantPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  return (
    <AdminContainer
      header={
        <div>
          <h1 className="text-2xl font-semibold">Restaurant</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {restaurant
              ? 'Update your restaurant details'
              : 'Set up your restaurant'}
          </p>
        </div>
      }
    >
      <div className="max-w-2xl">
        <RestaurantForm restaurant={restaurant ?? null} />
      </div>
    </AdminContainer>
  );
}
