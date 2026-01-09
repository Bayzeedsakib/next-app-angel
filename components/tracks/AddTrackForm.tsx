'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTrackSchema, CreateTrackFormData } from '@/lib/validations/track';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AddTrackFormProps {
  onSubmit: (data: CreateTrackFormData) => Promise<void>;
}

export default function AddTrackForm({ onSubmit }: AddTrackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTrackFormData>({
    resolver: zodResolver(createTrackSchema),
  });

  const handleFormSubmit = async (data: CreateTrackFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          {...register('title')}
          label="Track Title"
          placeholder="Enter track title"
          error={errors.title?.message}
        />
        <Input
          {...register('artist')}
          label="Artist (Optional)"
          placeholder="Enter artist name"
          error={errors.artist?.message}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding Track...' : 'Add Track'}
      </Button>
    </form>
  );
}

