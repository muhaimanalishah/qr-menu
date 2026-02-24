'use client';

import { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface AdminContainerProps {
  children: ReactNode;
  header?: ReactNode;
  toolbar?: ReactNode;
  className?: string;
}

export function AdminContainer({
  children,
  header,
  toolbar,
  className,
}: AdminContainerProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header section with sidebar trigger */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="mx-auto px-6 max-w-6xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            {header}
          </div>
          {toolbar}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto px-6 max-w-6xl py-6">{children}</div>
      </div>
    </div>
  );
}
