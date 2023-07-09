'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import useAddArtworkModal from '@/app/hooks/useAddArtworkModal';

import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { UserArtwork } from '@prisma/client';

enum STEPS {
  INFORMATION = 0,
  PHOTO = 1,
}

const ArtworkModal = () => {
  const router = useRouter();
  const addArtworkModal = useAddArtworkModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);

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
      creationYear: '',
      medium: '',
      type: '',
      width: 0,
      height: 0,
      media: '',
    },
  });
  const title = watch('title');
  const description = watch('description');
  const creationYear = watch('creationYear');
  const type = watch('type');
  const medium = watch('medium');
  const width = watch('width');
  const height = watch('height');
  const media = watch('media');

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PHOTO) {
      return onNext();
    }

    setIsLoading(true);

    const artwork = {
      title: title,
      description: description,
      creationYear: creationYear,
      medium: medium,
      type: type,
      width: typeof width === 'string' ? Number(width) : width,
      height: typeof height === 'string' ? Number(height) : height,
      mediaLink: [media],
      exhibitionIds: [],
    };

    axios
      .post('/api/userArtwork', artwork)
      .then(() => {
        toast.success('Eser eklendi!');
        window.location.reload();
        reset();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTO) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-row justify-between flex-wrap'>
      <Input
        id='title'
        label='Başlık'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='description'
        label='Açıklama'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='creationYear'
        label='Yapım Yılı'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='medium'
        label='Teknik'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='type'
        label='Tür'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='width'
        label='Yükseklik'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
      />
      <Input
        id='height'
        label='Uzunluk'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='number'
      />
    </div>
  );

  if (step === STEPS.PHOTO) {
    bodyContent = (
      <ImageUpload
        label='Eser Fotoğrafı'
        onChange={(value) => setCustomValue('media', value)}
        value={media}
      />
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={addArtworkModal.isOpen}
      title='Eser Ekle!'
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={addArtworkModal.onClose}
      body={bodyContent}
    />
  );
};

export default ArtworkModal;
