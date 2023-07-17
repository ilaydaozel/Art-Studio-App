import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useBiographyModal from '@/app/hooks/useBiographyModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import { UserRequest } from '@/models/user';
import Selectbox from '../inputs/Selectbox';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { ArtistProfile } from '@prisma/client';

interface BiographyModalProps {
  artistProfile: ArtistProfile | null;
  onClose: () => void;
  onUpdate: () => void;
}

const BiographyModal = ({
  artistProfile,
  onClose,
  onUpdate,
}: BiographyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState(artistProfile?.biography);
  const biographyModal = useBiographyModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      biography: bio,
    },
  });

  const biography = watch('biography');

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    const { biography } = data;

    try {
      await axios.post(`/api/artistProfile`, { biography });
      toast.success('Biografi güncellendi!');
      biographyModal.onClose();
      onUpdate();
    } catch (error) {
      toast.error('Error');
      console.log('Biografi error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div>
      <label
        className='font-semibold text-neutral-600 text-lg'
        htmlFor='biography'
      >
        Biografi
      </label>
      <textarea
        className='w-full min-h-[100px] border-double border-2 border-neutral-300'
        id='biography'
        {...register('biography', { required: true })}
        placeholder='Hakkımda ..'
        onChange={(e) => {
          setBio(e.target.value);
        }}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={biographyModal.isOpen}
      title='Biografi'
      actionLabel='Güncelle'
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default BiographyModal;
