'use client';

import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import useCreateAnnouncementModal from '@/app/hooks/useCreateAnnouncementModal';
import useTranslate from '@/app/hooks/useTranslate';
import { handleApiResponse } from '../utils/Helper';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

const CreateAnnouncementModal = () => {
  const createAnnouncementModal = useCreateAnnouncementModal();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslate();
  const router = useRouter();
  const location = { element: 'create_announcement_modal' };

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const announcement = {
      caption: caption,
      subcaption: subcaption,
      smallCaption: smallCaption,
      link: link,
      coverImage: coverImage,
      isActive: true,
    };

    await handleApiResponse(
      axios.post(`/api/announcement/createAnnouncement/`, announcement),
      setIsLoading,
      t,
      router,
      t('creation_successful_message', location),
      () => {
        createAnnouncementModal.onClose();
        reset();
      }
    );
  };

  let bodyContent = (
    <div className='flex flex-row align-center justify-between flex-wrap'>
      <Input
        id='caption'
        label={t('title', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='subcaption'
        label={t('description', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='smallCaption'
        label={t('short_description', location)}
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id='link'
        label={t('link', location)}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <ImageUpload
        onChange={(value) => setCustomValue('coverImage', value)}
        value={coverImage}
        label={t('cover_image', location)}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={createAnnouncementModal.isOpen}
      title={t('form_title', location)}
      actionLabel={t('action_label', location)}
      onSubmit={handleSubmit(onSubmit)}
      onClose={createAnnouncementModal.onClose}
      body={bodyContent}
    />
  );
};

export default CreateAnnouncementModal;
