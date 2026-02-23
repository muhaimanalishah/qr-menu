import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getMenusByRestaurant } from '@/lib/data/menus.dal';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function MenusPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    redirect('/setup');
  }

  const { data: menus } = await getMenusByRestaurant(restaurant.id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Menus</h1>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant&apos;s menus and availability.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/menus/new">Create New Menu</Link>
        </Button>
      </div>

      {menus && menus.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="flex flex-col justify-between p-5 border rounded-xl bg-card text-card-foreground shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-lg">{menu.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      menu.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {menu.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  /{menu.slug}
                </p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/admin/menus/${menu.id}/edit`}>Edit Menu</Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-xl bg-muted/20">
          <h3 className="text-lg font-medium">No menus found</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Get started by creating your first menu.
          </p>
          <Button asChild>
            <Link href="/admin/menus/new">Create New Menu</Link>
          </Button>
        </div>
      )}
    </div>
  );
}