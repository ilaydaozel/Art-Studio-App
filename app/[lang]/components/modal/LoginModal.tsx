'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/[lang]/hooks/useLoginModal';
import Modal from './Modal';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  messages: any;
}
const LoginModal = ({ messages }: LoginModalProps) => {
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success(messages.login_successful_message);
        router.refresh();
        router.push('/');
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(messages.login_failed_message);
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
        label={messages.password}
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
      title={messages.title}
      subtitle={messages.subtitle}
      actionLabel={messages.action_label}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default LoginModal;
