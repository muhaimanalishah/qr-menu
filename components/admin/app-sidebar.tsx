'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  BookOpen,
  Tag,
  UtensilsCrossed,
  QrCode,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSignOut } from '@/lib/hooks/useAuth';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Restaurant', icon: Store, href: '/admin/restaurant' },
  { label: 'Menus', icon: BookOpen, href: '/admin/menus' },
  { label: 'Categories', icon: Tag, href: '/admin/categories' },
  { label: 'Items', icon: UtensilsCrossed, href: '/admin/items' },
  { label: 'QR Codes', icon: QrCode, href: '/admin/qr' },
];

export function AppSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const { mutate: signOut, isPending } = useSignOut();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar 
      collapsible="icon"
      onClick={state === "collapsed" ? toggleSidebar : undefined}
      className={state === "collapsed" ? "cursor-pointer" : ""}
    >
      <SidebarHeader className="p-4">
        {/* Expanded: logo + trigger */}
        <div className="flex items-center justify-between group-data-[state=collapsed]:hidden">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-lg whitespace-nowrap">
              QR Menu
            </span>
          </div>
          <SidebarTrigger />
        </div>

        {/* Collapsed: trigger only */}
        <div className="hidden group-data-[state=collapsed]:flex justify-center">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground truncate group-data-[state=collapsed]:hidden">
            {email}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            disabled={isPending}
            className="w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="group-data-[state=collapsed]:hidden ml-2">
              {isPending ? 'Signing out...' : 'Sign out'}
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
