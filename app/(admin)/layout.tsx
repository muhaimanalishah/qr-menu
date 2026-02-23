import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';
import { getRestaurantByOwner } from '@/lib/data/restaurants.dal';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  let user;

  try {
    user = await getAuthenticatedUser();
  } catch (error) {
    redirect("/login");
  }
  
  const { data: restaurant } = await getRestaurantByOwner(user.id);

  if (!restaurant) {
    redirect("/setup");
  }

  return (
    <SidebarProvider>
      <AppSidebar email={user.email ?? ''} />
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
