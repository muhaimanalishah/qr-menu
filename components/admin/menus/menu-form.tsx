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
import { useCreateMenu, useUpdateMenu } from '@/lib/hooks/useMenus';
import { Menu } from '@/lib/types/menus.types';
import { createMenuSchema, MenuFormInput, CreateMenuInput } from '@/lib/schema/menus.schema';
import { slugify } from '@/lib/utils';

interface MenuFormProps {
  restaurantId: string;
  initialData: Menu | null;
}

export function MenuForm({ restaurantId, initialData }: MenuFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const { mutate: createMenu, isPending: isCreating } = useCreateMenu();
  const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();
  const isPending = isCreating || isUpdating;

  const form = useForm<MenuFormInput, unknown, CreateMenuInput>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      restaurant_id: restaurantId,
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
      is_active: initialData?.is_active ?? true,
    },
  });

  const onSubmit = (data: CreateMenuInput) => {
    if (isEdit) {
      updateMenu(
        { id: initialData.id, ...data },
        { onSuccess: () => router.push('/admin/menus') }
      );
    } else {
      createMenu(
        data,
        { onSuccess: () => router.push('/admin/menus') }
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
              <FieldLabel htmlFor="name">Menu Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="Breakfast Menu"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  field.onChange(e);
                  if (!isEdit) {
                    form.setValue('slug', slugify(e.target.value), {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="slug">Menu URL Slug</FieldLabel>
              <Input
                {...field}
                id="slug"
                placeholder="breakfast-menu"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="is_active"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <FieldLabel htmlFor="is_active" className="mb-0">
                  Menu is Active
                </FieldLabel>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Inactive menus are hidden from your public QR code page.
              </p>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Menu'}
      </Button>
    </form>
  );
}
