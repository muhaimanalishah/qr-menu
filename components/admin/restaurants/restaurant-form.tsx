'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import {
  useCreateRestaurant,
  useUpdateRestaurant,
} from '@/lib/hooks/useRestaurants';
import {
  createRestaurantSchema,
  RestaurantFormValues,
  CreateRestaurantInput,
} from '@/lib/schema/restaurants.schema';
import { slugify } from '@/lib/utils';
import { Restaurant } from '@/lib/types/restaurants.types';

type Props = {
  restaurant: Restaurant | null;
};

export function RestaurantForm({ restaurant }: Props) {
  const isEdit = !!restaurant;

  const { mutate: create, isPending: isCreating } = useCreateRestaurant();
  const { mutate: update, isPending: isUpdating } = useUpdateRestaurant();
  const isPending = isCreating || isUpdating;

  const form = useForm<RestaurantFormValues, unknown, CreateRestaurantInput>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: restaurant?.name ?? '',
      slug: restaurant?.slug ?? '',
      description: restaurant?.description ?? '',
      cuisine_type: restaurant?.cuisine_type ?? '',
      phone: restaurant?.phone ?? '',
      address: restaurant?.address ?? '',
      website: restaurant?.website ?? '',
      currency: restaurant?.currency ?? 'USD',
      language_direction:
        (restaurant?.language_direction as 'ltr' | 'rtl') ?? 'ltr',
    },
  });

  const onSubmit = (data: CreateRestaurantInput) => {
    if (isEdit) {
      update({ id: restaurant.id, ...data });
    } else {
      create(data);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Restaurant Name</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="Pizza Palace"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  field.onChange(e);
                  if (!isEdit) {
                    form.setValue('slug', slugify(e.target.value));
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
              <FieldLabel htmlFor="slug">Slug</FieldLabel>
              <Input
                {...field}
                id="slug"
                placeholder="pizza-palace"
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
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                {...field}
                id="description"
                placeholder="Best pizza in town"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="cuisine_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="cuisine_type">Cuisine Type</FieldLabel>
              <Input
                {...field}
                id="cuisine_type"
                placeholder="Italian"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                {...field}
                id="phone"
                placeholder="+1 234 567 8900"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                {...field}
                id="address"
                placeholder="123 Main St, New York"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                {...field}
                id="website"
                placeholder="https://pizzapalace.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="currency"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Input
                {...field}
                id="currency"
                placeholder="USD"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Restaurant'}
        </Button>
      </FieldGroup>
    </form>
  );
}
