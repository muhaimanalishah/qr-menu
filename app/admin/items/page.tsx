import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getItemsByRestaurant } from '@/lib/data/items.dal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function ItemsPage() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  const { data: items } = await getItemsByRestaurant(restaurant!.id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
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

      {items && items.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between p-5 border rounded-xl shadow-sm ${
                !item.available ? 'bg-muted/30' : 'bg-card text-card-foreground'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <div className="flex gap-2 flex-col items-end">
                    <span className="font-medium">
                      {item.base_price.toFixed(2)}
                    </span>
                    {item.sold_out && (
                      <Badge variant="destructive" className="text-xs">
                        Sold Out
                      </Badge>
                    )}
                    {!item.available && (
                      <Badge variant="secondary" className="text-xs">
                        Hidden
                      </Badge>
                    )}
                  </div>
                </div>
                {item.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No description
                  </p>
                )}
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/admin/items/${item.id}/edit`}>Edit Item</Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-xl bg-muted/20">
          <h3 className="text-lg font-medium">No items found</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Get started by adding your first food or drink item.
          </p>
          <Button asChild>
            <Link href="/admin/items/new">Create New Item</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
