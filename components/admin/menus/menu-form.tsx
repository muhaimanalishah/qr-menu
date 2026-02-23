'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Tables } from '@/lib/types/supabase.types';

// UI-specific schema to avoid conflicts with the DAL schemas
const menuFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must be lowercase, no spaces, and only contain alphanumeric characters or hyphens'
    ),
  is_active: z.boolean().default(true),
});

type FormInput = z.input<typeof menuFormSchema>;
type FormOutput = z.infer<typeof menuFormSchema>;

interface MenuFormProps {
  restaurantId: string;
  initialData: Tables<'menus'> | null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function MenuForm({ restaurantId, initialData }: MenuFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const { mutate: createMenu, isPending: isCreating } = useCreateMenu();
  const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();
  const isPending = isCreating || isUpdating;

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
      is_active: initialData?.is_active ?? true,
    },
  });

  const onSubmit = (data: FormOutput) => {
    if (isEdit) {
      updateMenu(
        { id: initialData.id, ...data },
        { onSuccess: () => router.push('/admin/menus') }
      );
    } else {
      createMenu(
        { restaurant_id: restaurantId, ...data },
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
