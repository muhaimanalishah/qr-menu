import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/admin/app-sidebar';
import { getAuthenticatedUser } from '@/lib/data/auth.dal';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  return (
    <SidebarProvider>
      <AppSidebar email={user.email ?? ''} />
      <main className="flex-1 overflow-auto">{children}</main>
    </SidebarProvider>
  );
}
