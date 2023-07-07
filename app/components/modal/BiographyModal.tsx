'use client';

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

const BiographyModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const biographyModal = useBiographyModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      gender: '',
      password: '',
      password_again: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    const userData: UserRequest = {
      name: data.name,
      surname: data.surname,
      password: data.password,
      userType: 'artist', // Add the user type value here
      email: data.email, // Add the email value here
      gender: data.gender, // Add the gender value here
    };
    if (data.password === data.password_again) {
      axios
        .post('/api/register', userData)
        .then(() => {
          toast.success('Kayıt olundu!');
          biographyModal.onClose();
        })
        .catch((error) => {
          toast.error('Error');
          console.log('Register error: ', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error('Şifreler aynı değil!');
      setIsLoading(false);
    }
  };

  const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 100px;
    padding: 8px;
    border: 2px solid ${COLORS.lightGray};
    margin: 12px;
    outline: none;
    transition: border-color 0.3s;
    resize: vertical;
    &:focus {
      border-color: ${COLORS.darkGray};
    }
  `;

  const bodyContent = (
    <div>
      <label className='font-semibold text-neutral-600 text-lg'>Biografi</label>
      <TextArea
        id='biography'
        {...register('biography', { required: true })}
        placeholder='Hakkınızda...'
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={biographyModal.isOpen}
      title='Biografi'
      actionLabel='Kaydol'
      onClose={biographyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default BiographyModal;
