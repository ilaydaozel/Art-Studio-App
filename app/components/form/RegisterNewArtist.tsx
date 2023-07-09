'use client';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Form from './Form';
import Selectbox from '../inputs/Selectbox';

const ArtistForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    const userData = {
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
