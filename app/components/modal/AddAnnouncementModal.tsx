'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import useCreateAnnouncementModal from '@/app/hooks/useCreateAnnAnnouncementModal';

const CreateAnnouncementModal = () => {
  const CreateAnnouncementModal = useCreateAnnouncementModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      caption: '',
      subcaption: '',
      smallCaption: '',
      link: '',
      coverImage: '',
    },
  });
  const caption = watch('caption');
  const subcaption = watch('subcaption');
  const smallCaption = watch('smallCaption');
  const link = watch('link');
  const coverImage = watch('coverImage');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const announcement = {
      caption: caption,
      subcaption: subcaption,
      smallCaption: smallCaption,
      link: link,
      coverImage: coverImage,
      isActive: true,
    };

    axios
      .post(`/api/announcement/CreateAnnouncement/`, announcement)
      .then(() => {
        toast.success('Duyuru eklendi!');
        window.location.reload();
        reset();
      })
      .catch((e) => {
        toast.error('Bir şeyler yanlış gitti');
        console.log(' error ', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div className='flex flex-row align-center justify-between flex-wrap'>
      <Input
        id='caption'
        label='Başlık'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='subcaption'
        label='Açıklama'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='smallCaption'
        label='Kısa Açıklama'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='link'
        label='Link'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <ImageUpload
        onChange={(value) => setCustomValue('coverImage', value)}
        value={coverImage}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={CreateAnnouncementModal.isOpen}
      title='Duyuru Ekle'
      actionLabel={'Tamamla'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={CreateAnnouncementModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateAnnouncementModal;
