'use client';
import Input from '@/app/components/inputs/Input';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Selectbox from '../inputs/Selectbox';
import {
  PasswordLengthError,
  PasswordMismatchError,
} from '@/app/lib/exceptions';
import useTranslate from '@/app/hooks/useTranslate';
import FormLayout from './FormLayout';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const exceptionsLocation = { element: 'exceptions' };
  const t = useTranslate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading(true);
    const userData = {
      name: data.name,
      surname: data.surname,
      password: data.password,
      userType: 'artist',
      email: data.email,
      gender: data.gender,
    };

    try {
      if (data.password.length < 4) {
        throw new PasswordLengthError();
      }

      if (data.password !== data.password_again) {
        throw new PasswordMismatchError();
      }

      await axios
        .post('/api/user/register', userData)
        .then((response: AxiosResponse<any, any>) => {
          if (response.data?.error) {
            toast.error(t(response.data.error, exceptionsLocation));
          } else {
            toast.success('Kayıt olundu!');
            reset();
          }
        });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? t(error.message, exceptionsLocation)
          : t('unknownError', exceptionsLocation)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      title='Sanatçı Kayıt Formu'
      onSubmit={handleSubmit(onSubmit)}
      actionLabel='Kaydet'
    >
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
    </FormLayout>
  );
};

export default RegisterForm;
