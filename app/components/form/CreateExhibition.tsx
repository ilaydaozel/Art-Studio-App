'use client';
import Input from '@/app/components/inputs/Input';
import useTranslate from '@/app/hooks/useTranslate';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormLayout from '../layouts/FormLayout';

const CreateExhibitionForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      startDate: Date(),
      endDate: Date(),
      organizedBy: '',
      artworkIds: [],
      artworks: [],
    },
  });

  const location = { element: 'login_modal' };
  const t = useTranslate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};
  return (
    <FormLayout
      title={t('title', location)}
      subtitle={t('subtitle', location)}
      actionLabel={t('action_label', location)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-4'>
        <Input
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          label={t('password', location)}
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </FormLayout>
  );
};
export default CreateExhibitionForm;
