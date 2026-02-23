import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { getMenusByRestaurant } from '@/lib/data/menus.dal';
import { getCategories } from '@/lib/data/categories.dal';
import { getItemsByRestaurant } from '@/lib/data/items.dal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, UtensilsCrossed, QrCode } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const user = await getAuthenticatedUser();
  const { data: restaurant } = await getRestaurantByOwner(user.id);
  if (!restaurant) {
    redirect("/admin/restaurant");
  }
  const { data: menus } = await getMenusByRestaurant(restaurant!.id);
  const { data: categories } = await getCategories(restaurant!.id);
  const { data: items } = await getItemsByRestaurant(restaurant!.id);

  const activeMenus = menus?.filter((m) => m.is_active).length ?? 0;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {restaurant!.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s an overview of your restaurant
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Menus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{menus?.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Menus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{activeMenus}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{categories?.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{items?.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/admin/menus">
            <BookOpen className="h-4 w-4 mr-2" />
            Go to Menus
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/items">
            <UtensilsCrossed className="h-4 w-4 mr-2" />
            Add Item
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/qr">
            <QrCode className="h-4 w-4 mr-2" />
            View QR Codes
          </Link>
        </Button>
      </div>
    </div>
  );
}