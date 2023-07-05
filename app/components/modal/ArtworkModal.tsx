'use client';

import axios from 'axios';
import { useState } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useArtworkModal from '@/app/hooks/useArtworkModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import ImageUpload from '../inputs/ImageUpload';

const ArtworkModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const artworkModal = useArtworkModal();
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/', data)
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

  const bodyContent = (
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
      />
      <Input
        id='height'
        label='Uzunluk'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <div className='h-6 w-full'></div>
      <ImageUpload
        label='Eser Fotoğrafı'
        onChange={(value) => setCustomValue('media', value)}
        value={media}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={artworkModal.isOpen}
      title='Resim Ekle'
      actionLabel='Ekle'
      onClose={artworkModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ArtworkModal;
