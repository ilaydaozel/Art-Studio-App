'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useCreateExhibitionModal from '@/app/hooks/useCreateExhibitionModal';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import useTranslate from '@/app/hooks/useTranslate';
import DatePicker from '../inputs/DatePicker';
import { handleApiResponse } from '../utils/Helper';
import { useRouter } from 'next/navigation';

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}

const CreateExhibitionModal = () => {
  const createExhibitionModal = useCreateExhibitionModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);
  const t = useTranslate();
  const router = useRouter();
  const location = { element: 'create_exhibition_modal' };

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
      startDate: '',
      endDate: '',
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

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
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
    await handleApiResponse(
      axios.post('/api/exhibition/createExhibition', exhibitionData),
      setIsLoading,
      t,
      createExhibitionModal.onClose,
      router,
      t('creation_successful_message', location),
      () => {
        reset();
        setStep(STEPS.INFORMATION);
      }
    );
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTO) {
      return t('action_label', location);
    }

    return t('forward_label', location);
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return t('back_label', location);
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
      />
      <DatePicker
        id='startDate'
        label={t('start_date', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <DatePicker
        id='endDate'
        label={t('end_date', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='organizedBy'
        label={t('organized_by', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  if (step === STEPS.PHOTO) {
    bodyContent = (
      <ImageUpload
        label={t('cover_image', location)}
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
