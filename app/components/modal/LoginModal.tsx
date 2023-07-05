'use client';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './Modal';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
        console.log('signed in user:  ', data);
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Şifre'
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
          Hesabınız yok mu?
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
            Kaydol
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Tekrar Hoş Geldiniz!'
      subtitle='Giriş Yapın'
      actionLabel='Giriş Yap'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
