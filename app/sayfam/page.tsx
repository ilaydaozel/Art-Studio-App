'use client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import useBiographyModal from '../hooks/useBiographyModal';
import useProfilePictureModal from '../hooks/useProfilePictureModal';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ImageUpload from '../components/inputs/ImageUpload';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

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

const ArtistPage = () => {
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
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

  return (
    <div>
      <div className='p-20'>
        <div className='flex'>
          <div className='flex flex-grow gap-2'>
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
              <div>hello</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Button label={'Düzenle'} onClick={biographyModal.onOpen}></Button>
      <Button
        label={'Profil Fotoğrafını Düzenle'}
        onClick={profilePictureModal.onOpen}
      ></Button>
    </div>
  );
};

export default ArtistPage;
