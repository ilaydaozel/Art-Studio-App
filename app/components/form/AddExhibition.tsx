'use client';
import Input from '@/app/components/inputs/Input';
import useTranslate from '@/app/hooks/useTranslate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import FormLayout from '../layouts/FormLayout';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddExhibitionForm = () => {
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
    },
  });

  const location = { element: 'add_exhibition_modal' };
  const t = useTranslate();

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    const exhibitionData = {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      organizedBy: data.organizedBy,
    };
    axios
      .post('/api/exhibition', exhibitionData)
      .then(() => {
        toast.success('Sergi oluşturuldu!');
      })
      .catch((error) => {
        toast.error('Error');
        console.log('error: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <FormLayout
      title={t('form_title', location)}
      actionLabel={t('action_label', location)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-4'>
        <Input
          id='title'
          label={t('title', location)}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='description'
          label={t('description', location)}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='startDate'
          label={t('startDate', location)}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='endDate'
          label={t('endDate', location)}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='organizedBy'
          label={t('organizedBy', location)}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </FormLayout>
  );
};
export default AddExhibitionForm;
