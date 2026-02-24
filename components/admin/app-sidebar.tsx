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
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useSignOut } from '@/lib/hooks/useAuth';
import { useSidebar } from '@/components/ui/sidebar';

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
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 flex-shrink-0" />
          <span className="font-semibold text-lg whitespace-nowrap">
            QR Menu
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.href}
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {state === 'collapsed' && (
                        <TooltipContent side="right">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground truncate">{email}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            disabled={isPending}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isPending ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
