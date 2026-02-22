import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const user = await getAuthenticatedUser();
    const {data: restaurant} = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    return (
      <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-semibold">Welcome to QR Menu</h1>
        <p className="text-muted-foreground">
          Let&apos;s get your restaurant set up
        </p>
        <Button asChild>
          <Link href="/admin/restaurant">Set up your restaurant</Link>
        </Button>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar email={user.email ?? ''} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </SidebarProvider>
  );
}