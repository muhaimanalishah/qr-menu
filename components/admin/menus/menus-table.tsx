'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Menu } from '@/lib/types/menus.types';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useDeleteMenu } from '@/lib/hooks/useMenus';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface MenusTableProps {
  menus: Menu[];
}

export function MenusTable({ menus }: MenusTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const deleteMenuMutation = useDeleteMenu();

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteMenuMutation.mutateAsync({ id: deleteId });
      queryClient.invalidateQueries({ queryKey: ['menus'] });
      toast.success('Menu deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete menu'
      );
    }
  };

  const columns = useMemo<ColumnDef<Menu>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'slug',
        header: 'Slug',
        cell: ({ row }) => (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {row.original.slug}
          </code>
        ),
      },
      {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }) => (
          <Badge variant={row.original.is_active ? 'default' : 'secondary'}>
            {row.original.is_active ? 'Active' : 'Hidden'}
          </Badge>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => {
          const created = row.original.created_at;
          const date = created ? new Date(created) : null;
          return <span>{date?.toLocaleDateString() ?? '-'}</span>;
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 w-8 p-0"
              title="Edit menu"
            >
              <Link href={`/admin/menus/${row.original.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => setDeleteId(row.original.id)}
              title="Delete menu"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const menuToDelete = menus.find((m) => m.id === deleteId);

  return (
    <>
      <DataTable
        columns={columns}
        data={menus}
        emptyStateMessage="No menus found. Get started by creating your first menu."
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{menuToDelete?.name}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMenuMutation.isPending}
            >
              {deleteMenuMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
