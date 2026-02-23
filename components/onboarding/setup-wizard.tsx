'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCreateRestaurant } from '@/lib/hooks/useRestaurants';
import {
  CreateRestaurantInput,
  createRestaurantSchema,
  RestaurantFormValues,
} from '@/lib/schema/restaurants.schema';

// Placeholder imports for the steps we will build next
import { StepOne } from './step-one';
import { StepTwo } from './step-two';

export function SetupWizard() {
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();
  const { mutate: createRestaurant, isPending } = useCreateRestaurant();

  const form = useForm<RestaurantFormValues, unknown, CreateRestaurantInput>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: {
      name: '',
      slug: '',
      currency: 'USD',
      description: '',
      cuisine_type: '',
      phone: '',
      address: '',
      website: '',
      language_direction: 'ltr',
    },
  });

  const nextStep = async () => {
    // Validate only the "Must Have" fields before advancing
    const isValid = await form.trigger(['name', 'slug', 'currency']);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = (data: CreateRestaurantInput) => {
    createRestaurant(data, {
      onSuccess: () => {
        router.push('/admin');
      },
    });
  };

  const onSkip = () => {
    // Submit whatever is currently in the form (the valid Step 1 data)
    createRestaurant(form.getValues() as CreateRestaurantInput, {
      onSuccess: () => {
        router.push('/admin');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {step === 1 ? 'Restaurant Basics' : 'Additional Details'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === 1
            ? 'Let’s start with the essential information for your menu.'
            : 'Add more details to your profile, or skip and fill these in later.'}
        </p>
      </div>

      <div className="w-full">
        {step === 1 ? (
          <StepOne form={form} nextStep={nextStep} />
        ) : (
          <StepTwo
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
            onSkip={onSkip}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}
