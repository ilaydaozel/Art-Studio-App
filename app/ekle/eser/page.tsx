'use client';
import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 10px;
`;

const AddArtwork = () => {
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
  return (
    <div>
      <FormContainer>
        <div className='flex flex-col gap-4'>
          <Heading title='Tekrar Hoş Geldiniz!' subtitle='Giriş yapın!' />
          <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default AddArtwork;
