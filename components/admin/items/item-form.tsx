'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { useCreateItem, useUpdateItem } from '@/lib/hooks/useItems';
import { Item } from '@/lib/types/items.types';
import { Category } from '@/lib/types/categories.types';
import { CreateItemInput, createItemSchema, ItemFormInput } from '@/lib/schema/items.schema';

interface ItemFormProps {
  initialData: Item | null;
  categories: Category[];
}

export function ItemForm({
  initialData,
  categories,
}: ItemFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const { mutate: createItem, isPending: isCreating } = useCreateItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateItem();
  const isPending = isCreating || isUpdating;

  const form = useForm<ItemFormInput, unknown, CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      base_price: initialData?.base_price ?? 0,
      category_id: initialData?.category_id ?? '',
      image_url: initialData?.image_url ?? '',
      available: initialData?.available ?? true,
      sold_out: initialData?.sold_out ?? false,
    },
  });

const onSubmit = (data: CreateItemInput) => {
    if (isEdit) {
      updateItem(
        { id: initialData.id, ...data },
        { onSuccess: () => router.push('/admin/items') }
      );
    } else {
      createItem({ ...data }, { onSuccess: () => router.push('/admin/items') });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Item Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="e.g. Margherita Pizza"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="base_price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="base_price">Price</FieldLabel>
                <Input
                  {...field}
                  value={field.value as number | string}
                  id="base_price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="category_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category_id">Category</FieldLabel>
                <select
                  {...field}
                  id="category_id"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-invalid={fieldState.invalid}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">
                Description (Optional)
              </FieldLabel>
              <Input
                {...field}
                id="description"
                placeholder="Fresh tomatoes, mozzarella, and basil"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="image_url">Image URL (Optional)</FieldLabel>
              <Input
                {...field}
                id="image_url"
                placeholder="https://example.com/pizza.jpg"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-6 mt-4">
          <Controller
            name="available"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="h-4 w-4 rounded border-input accent-primary"
                  />
                  <FieldLabel htmlFor="available" className="mb-0">
                    Visible on Menu
                  </FieldLabel>
                </div>
              </Field>
            )}
          />

          <Controller
            name="sold_out"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sold_out"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className="h-4 w-4 rounded border-input accent-primary"
                  />
                  <FieldLabel htmlFor="sold_out" className="mb-0">
                    Mark as Sold Out
                  </FieldLabel>
                </div>
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Item'}
      </Button>
    </form>
  );
}
