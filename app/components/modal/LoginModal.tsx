'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';
import useTranslate from '../../hooks/useTranslate';

const LoginModal = () => {
  const router = useRouter();
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

  const location = { element: 'login_modal' };
  const t = useTranslate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success(t('login_successful_message', location));
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(t('login_failed_message', location));
      }
    });
  };

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
        label={t('password', location)}
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={t('title', location)}
      subtitle={t('subtitle', location)}
      actionLabel={t('action_label', location)}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default LoginModal;
