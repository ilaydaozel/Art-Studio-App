'use client';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import Input from '@/app/components/inputs/Input';
import axios from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Form from './Form';
import Button from '../Button';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
import useArtworkModal from '@/app/hooks/useArtworkModal';
import UserMenuElement from '../navbar/UserMenuElement';
import ArtworkModal from '../modal/ArtworkModal';

const PictureContainer = styled.div`
  width: 100%;
  margin: 10px;
  height: full;
  cursor: pointer;
  transition: all 0.3s;
  border: solid 2px ${COLORS.lightGray};
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${COLORS.gray};
  border-radius: 25px;
  font-size: 16px;
  &:hover {
    font-size: 18px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 8px;
  border: 2px solid ${COLORS.lightGray};
  margin: 12px;
  outline: none;
  transition: border-color 0.3s;
  resize: vertical;
  &:focus {
    border-color: ${COLORS.darkGray};
  }
`;

const ArtistForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const artworkModal = useArtworkModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      biography: '',
      profilePic: '',
      artworks: [],
    },
  });
  const biography = watch('biography');
  const profilePic = watch('profilePic');
  const artworks = watch('artworks');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log('sent data:', data);
    axios
      .post('/api/artistProfile', data)
      .then(() => {
        toast.success('Sanatçı sayfası güncellendi!');
        window.location.reload();
        reset();
      })
      .catch((error) => {
        console.log('Error: ', error);
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col'>
      <div className='flex gap-4 justify-between'>
        <div className='w-[30vw]'>
          <ImageUpload
            label='Profil Fotoğrafı'
            onChange={(value) => setCustomValue('profilePic', value)}
            value={profilePic}
          />
        </div>

        <div className='w-full'>
          <label className='font-semibold text-neutral-600 text-lg'>
            Biografi
          </label>
          <TextArea
            id='biography'
            {...register('biography', { required: true })}
            placeholder='Hakkınızda...'
          />
        </div>
      </div>

      <div className='w-full my-20'>
        <h1 className='font-semibold text-neutral-600 text-lg'>
          Eklenecek Eserler
        </h1>
        <div className='p-2 h-[50vh] shadow-xl rounded-xl m-4'>
          <div className='flex h-full flex-grow justify-between'>
            <PictureContainer
              onClick={() => {
                artworkModal.onOpen();
              }}
            >
              Eser Bilgilerini Gir
            </PictureContainer>
            <PictureContainer
              onClick={() => {
                artworkModal.onOpen();
              }}
            >
              Eser Bilgilerini Gir
            </PictureContainer>
            <PictureContainer
              onClick={() => {
                artworkModal.onOpen();
              }}
            >
              Eser Bilgilerini Gir
            </PictureContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Form
      title='Sanatçı Sayfası Formu'
      body={bodyContent}
      submitActionLabel='Kaydet'
      onSubmit={handleSubmit(onSubmit)}
    ></Form>
  );
};

export default ArtistForm;
