'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import useProfilePictureModal from '@/app/[lang]/hooks/useProfilePictureModal';
import { IArtistProfile } from '@/app/[lang]/types';

interface ProfilePictureModalProps {
  artistProfile: IArtistProfile | null;
  onClose: () => void;
  onUpdate: () => void;
}

const ProfilePictureModal = ({
  artistProfile,
  onClose,
  onUpdate,
}: ProfilePictureModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const profilePictureModal = useProfilePictureModal();
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

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    const { profilePic } = data;

    try {
      await axios.post(`/api/artistProfile/${artistProfile?.artistId}`, {
        profilePic,
      });
      toast.success('Profil fotoğrafı güncellendi!');
      profilePictureModal.onClose();
      onUpdate();
    } catch (error) {
      toast.error('Error');
      console.log('Profile pic error: ', error);
    } finally {
      setIsLoading(false);
    }
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
      isOpen={profilePictureModal.isOpen}
      title='Profil Fotoğrafı Ekle'
      actionLabel='Güncelle'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ProfilePictureModal;
