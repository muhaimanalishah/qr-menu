'use client';

import { useCreateItem, useDeleteItem, useUpdateItem } from '@/lib/hooks/useItems';
import { CreateItemInput, createItemSchema } from '@/lib/schema/items.schema';
import { Category } from '@/lib/types/categories.types';
import { Item } from '@/lib/types/items.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ItemSectionProps {
  items: Item[];
  categories: Category[];
}

export default function ItemSection({ items, categories }: ItemSectionProps) {
  const { mutate: createItem, isPending: isCreatingItem } = useCreateItem();
  const { mutate: deleteItem, isPending: isDeletingItem } = useDeleteItem();
  const { mutate: updateItem } = useUpdateItem();

  const form = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: '',
      price: 0,
      category_id: '',
    },
  });

  const onSubmit = (data: CreateItemInput) => {
    createItem(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section className="p-6 border rounded-xl bg-white shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 bg-gray-50 p-4 rounded-lg"
      >
        <input
          {...form.register('name')}
          placeholder="Item name"
          className="border p-2 rounded"
        />
        <input
          {...form.register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Price"
          className="border p-2 rounded"
        />
        <select {...form.register('category_id')} className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isCreatingItem}
          className="md:col-span-3 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreatingItem ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-gray-400 italic">No items added yet.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-3 border rounded-lg transition-colors ${!item.available ? 'bg-gray-100 opacity-60' : 'bg-white'}`}
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.price.toFixed(2)} PKR —{' '}
                {categories.find((c) => c.id === item.category_id)?.name || 'Uncategorized'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer gap-2">
                <span className="text-xs font-medium text-gray-400">
                  {item.available ? 'Active' : 'Hidden'}
                </span>
                <input
                  type="checkbox"
                  checked={item.available ?? false}
                  onChange={() => updateItem({ id: item.id, available: !item.available })}
                  className="w-4 h-4 accent-blue-600"
                />
              </label>

              <button
                onClick={() => deleteItem({ id: item.id })}
                disabled={isDeletingItem}
                className="text-red-500 hover:text-red-700 text-sm font-medium border border-red-200 px-3 py-1 rounded-md hover:border-red-500 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}