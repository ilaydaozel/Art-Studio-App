'use client';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Form from './Form';
import Selectbox from '../inputs/Selectbox';
import {
  PasswordLengthError,
  PasswordMismatchError,
  UnknownError,
} from '@/app/lib/exceptions';
import useTranslate from '@/app/hooks/useTranslate';

const ArtistForm = () => {
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

      const response = await axios.post('/api/register', userData);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Kayıt olundu!');
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(error.message, exceptionsLocation));
      } else {
        const unkownError = new UnknownError();
        toast.error(t(unkownError.message, exceptionsLocation));
        console.error('Error: ', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Form
      title='Sanatçı Kayıt Formu'
      body={bodyContent}
      submitActionLabel='Kaydet'
      onSubmit={handleSubmit(onSubmit)}
    ></Form>
  );
};

export default ArtistForm;
