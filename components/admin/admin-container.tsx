'use client';

import { ReactNode } from 'react';
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
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex-1 mx-auto max-w-6xl flex items-center justify-between">
            {header}
            {toolbar}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="mx-auto px-6 max-w-6xl py-6">{children}</div>
      </div>
    </div>
  );
}
