'use client';

import { Controller, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field';
import { CreateRestaurantInput, RestaurantFormValues } from '@/lib/schema/restaurants.schema';

interface StepOneProps {
  form: UseFormReturn<RestaurantFormValues, unknown, CreateRestaurantInput>;
  nextStep: () => void;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function StepOne({ form, nextStep }: StepOneProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Restaurant Name *</FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="Pizza Palace"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  field.onChange(e);
                  // Auto-generate the slug based on the name
                  form.setValue('slug', slugify(e.target.value), {
                    shouldValidate: true,
                  });
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
              <FieldLabel htmlFor="slug">Menu URL Slug *</FieldLabel>
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
          name="currency"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="currency">Currency *</FieldLabel>
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
      </FieldGroup>

      <Button type="button" onClick={nextStep} className="w-full mt-6">
        Continue
      </Button>
    </div>
  );
}