'use client';
import Heading from '@/app/components/Heading';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 10vh 0;
  width: 80vw;
  margin: auto;
`;

const AddArtwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      imageSrc: '',
    },
  });
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div>
      <FormContainer>
        <div className='flex flex-col gap-4'>
          <Heading title='Eser Ekle' />
          <Input
            id='email'
            label='Email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <ImageUpload
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default AddArtwork;
