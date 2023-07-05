'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import useLoginModal from '@/app/hooks/useLoginModal';
import { UserRequest } from '@/models/user';
import Selectbox from '../inputs/Selectbox';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

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
          registerModal.onClose();
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error('Şifreler aynı değil!');
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className='flex flex-wrap felx-between gap-2 flex-row'>
      <Input
        id='name'
        label='Ad'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='surname'
        label='Soyad'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='Email'
        width='49%'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Selectbox
        id='gender'
        label='Cinsiyet'
        width='49%'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        choices={['Kadın', 'Erkek', 'Bilinmiyor']}
      />
      <Input
        id='password'
        label='Şifre'
        width='49%'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password_again'
        label='Şifre Tekrar'
        width='49%'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <div
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>
          Hesabınız var mı?
          <span
            onClick={onToggle}
            className='
            text-neutral-800
            cursor-pointer 
            underline
            ml-2
            font-semibold
            '
          >
            Giriş Yap
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Konak Sanat Akademisi`ne Hoş Geldiniz!'
      subtitle='Bir Hesap Oluşturun'
      actionLabel='Kaydol'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
