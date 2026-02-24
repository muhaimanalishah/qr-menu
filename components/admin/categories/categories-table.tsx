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
import { useDeleteCategory } from '@/lib/hooks/useCategories';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '@/lib/types/categories.types';

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteCategoryMutation.mutateAsync({ id: deleteId });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
      setDeleteId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete category'
      );
    }
  };

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground line-clamp-2">
            {row.original.description || '-'}
          </span>
        ),
      },
      {
        accessorKey: 'image_url',
        header: 'Image',
        cell: ({ row }) => (
          <Badge variant={row.original.image_url ? 'default' : 'secondary'}>
            {row.original.image_url ? 'Yes' : 'No'}
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
              title="Edit category"
            >
              <Link href={`/admin/categories/${row.original.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => setDeleteId(row.original.id)}
              title="Delete category"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const categoryToDelete = categories.find((c) => c.id === deleteId);

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        emptyStateMessage="No categories found. Organize your menu items by creating your first category."
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{categoryToDelete?.name}
              &quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
