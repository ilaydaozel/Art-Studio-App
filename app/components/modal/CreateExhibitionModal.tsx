'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useCreateExhibitionModal from '@/app/hooks/useCreateExhibitionModal';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { IArtistProfile } from '@/app/types';
import useTranslate from '@/app/hooks/useTranslate';

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}

const CreateExhibitionModal = () => {
  const createExhibitionModal = useCreateExhibitionModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);
  const location = { element: 'add_exhibition_modal' };
  const t = useTranslate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      startDate: Date(),
      endDate: Date(),
      organizedBy: '',
      coverImage: '',
    },
  });
  const title = watch('title');
  const description = watch('description');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const organizedBy = watch('organizedBy');
  const coverImage = watch('coverImage');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    if (step !== STEPS.PHOTO) {
      return onNext();
    }

    setIsLoading(true);
    const exhibitionData = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      organizedBy: organizedBy,
      coverImage: coverImage,
    };
    axios
      .post('/api/exhibition/createExhibition ', exhibitionData)
      .then(() => {
        toast.success('Sergi oluşturuldu!');
        window.location.reload();
        reset();
      })
      .catch((error) => {
        toast.error('Error!');
        console.log('error: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTO) {
      t('action_label', location);
    }

    return 'İleri';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return 'Geri';
  }, [step]);

  let bodyContent = (
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
  );

  if (step === STEPS.PHOTO) {
    bodyContent = (
      <ImageUpload
        onChange={(value) => setCustomValue('coverImage', value)}
        value={coverImage}
      />
    );
  }

  return (
    <Modal
      title={t('form_title', location)}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
      isOpen={createExhibitionModal.isOpen}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={createExhibitionModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateExhibitionModal;
