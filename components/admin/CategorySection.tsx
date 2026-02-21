'use client';

import { useCreateCategory, useDeleteCategory } from '@/lib/hooks/useCategories';
import { CreateCategoryInput, createCategorySchema } from '@/lib/schema/categories.schema';
import { Category } from '@/lib/types/categories.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  const {mutate: createCategory, isPending: isCreating} = useCreateCategory();
  const {mutate: deleteCategory, isPending: isDeleting} = useDeleteCategory();

  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: CreateCategoryInput) => {
    createCategory(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <section className="p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {/* CREATE: The form automatically sends data to the server action */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <input
          {...form.register('name')}
          placeholder="New category name..."
          className="border p-2 rounded flex-1"
        />
        <button type="submit" disabled={isCreating} className="bg-black text-white px-4 py-2 rounded">
          {isCreating ? 'Adding...' : 'Add'}
        </button>
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
        )}
      </form>

      {/* READ & DELETE */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span>{cat.name}</span>
            <button
              onClick={() => deleteCategory({ id: cat.id })}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
