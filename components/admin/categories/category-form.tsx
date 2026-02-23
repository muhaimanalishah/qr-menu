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
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/lib/hooks/useCategories';
import { createCategorySchema, CategoryFormInput, CreateCategoryInput } from '@/lib/schema/categories.schema';
import { Category } from '@/lib/types/categories.types';
interface CategoryFormProps {
  restaurantId: string;
  initialData: Category | null;
}

export function CategoryForm({ restaurantId, initialData }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const isPending = isCreating || isUpdating;

  const form = useForm<CategoryFormInput, unknown, CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      restaurant_id: restaurantId,
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      image_url: initialData?.image_url ?? '',
    },
  });

  const onSubmit = (data: CategoryFormInput) => {
    if (isEdit) {
      updateCategory(
        { id: initialData.id, ...data },
        { onSuccess: () => router.push('/admin/categories') }
      );
    } else {
      createCategory(
        data,
        { onSuccess: () => router.push('/admin/categories') }
      );
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
              <FieldLabel htmlFor="name">Category Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="e.g. Starters, Main Course"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                placeholder="Delicious appetizers to start your meal"
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
                placeholder="https://example.com/image.jpg"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Category'}
      </Button>
    </form>
  );
}
