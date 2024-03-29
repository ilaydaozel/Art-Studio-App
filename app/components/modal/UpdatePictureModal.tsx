'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import useUpdatePictureModal from '@/app/hooks/useUpdatePictureModal';
import { IArtistProfile } from '@/app/types';
import { handleApiResponse } from '../utils/Helper';
import { useRouter } from 'next/navigation';
import useTranslate from '@/app/hooks/useTranslate';

interface UpdatePictureModalProps {
  artistProfile: IArtistProfile | null;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdatePictureModal = ({
  artistProfile,
  onClose,
  onUpdate,
}: UpdatePictureModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const updatePictureModal = useUpdatePictureModal();
  const router = useRouter();
  const t = useTranslate();
  const location = { element: 'update_text_modal' };
  const pictureLink = artistProfile?.profilePic;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      profilePic: pictureLink ? pictureLink : '',
    },
  });
  const profilePic = watch('profilePic');

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    await handleApiResponse(
      axios.post(`/api/artistProfile/${artistProfile?.artistId}`, {
        profilePic,
      }),
      setIsLoading,
      t,
      router,
      t('update_successful_message', location),
      updatePictureModal.onClose
    );
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const bodyContent = (
    <div className='h-[80%]'>
      <ImageUpload
        onChange={(value) => setCustomValue('profilePic', value)}
        value={profilePic}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={updatePictureModal.isOpen}
      title='Profil Fotoğrafı Ekle'
      actionLabel='Güncelle'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default UpdatePictureModal;
