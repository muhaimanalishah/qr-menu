'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
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
import { useDeleteItem } from '@/lib/hooks/useItems';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Item } from '@/lib/types/items.types';

interface ItemsTableProps {
  items: Item[];
}

export function ItemsTable({ items }: ItemsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const deleteItemMutation = useDeleteItem();

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteItemMutation.mutateAsync({ id: deleteId });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Item deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete item'
      );
    }
  };

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'base_price',
        header: 'Base Price',
        cell: ({ row }) => (
          <span className="font-medium">
            ${row.original.base_price.toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: 'available',
        header: 'Status',
        cell: ({ row }) => {
          const { available, sold_out } = row.original;
          if (!available) {
            return <Badge variant="secondary">Hidden</Badge>;
          }
          if (sold_out) {
            return <Badge variant="destructive">Sold Out</Badge>;
          }
          return <Badge variant="default">Available</Badge>;
        },
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
              title="Edit item"
            >
              <Link href={`/admin/items/${row.original.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => setDeleteId(row.original.id)}
              title="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const itemToDelete = items.find((i) => i.id === deleteId);

  return (
    <>
      <DataTable
        columns={columns}
        data={items}
        emptyStateMessage="No items found. Get started by adding your first food or drink item."
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{itemToDelete?.name}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteItemMutation.isPending}
            >
              {deleteItemMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
