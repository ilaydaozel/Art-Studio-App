'use client';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Form from './Form';
import Button from '../Button';
import useArtworkModal from '@/app/hooks/useArtworkModal';

const ArtistForm = () => {
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
        toast.success('Sanatçı eklendi!');
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
      <Button onClick={artworkModal.onOpen} label={'Resim Ekle'}></Button>
    </div>
  );

  return (
    <Form
      title='Kayıtlı Sanatçı Eseri Ekleme Formu'
      body={bodyContent}
      submitActionLabel='Kaydet'
      onSubmit={handleSubmit(onSubmit)}
    ></Form>
  );
};

export default ArtistForm;
