'use client';
import Input from '@/app/components/inputs/Input';
import useTranslate from '@/app/hooks/useTranslate';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormLayout from '../layouts/FormLayout';

const LoginForm = () => {
  const router = useRouter();
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
    console.log('clicked');
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success(t('login_successful_message', location));
        router.refresh();
        router.back();
      }
      if (callback?.error) {
        console.log(callback.error);
        toast.error(t('login_failed_message', location));
      }
    });
  };
  return (
    <FormLayout
      title={t('title', location)}
      subtitle={t('subtitle', location)}
      actionLabel={t('action_label', location)}
      onSubmit={handleSubmit(onSubmit)}
    >
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
    </FormLayout>
  );
};
export default LoginForm;
