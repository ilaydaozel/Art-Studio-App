'use client';
import Image from 'next/image';
import useBiographyModal from '@/app/hooks/useBiographyModal';
import useProfilePictureModal from '@/app/hooks/useProfilePictureModal';
import { COLORS } from '@/constants/colors';
import { ArtistProfile } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
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
interface ArtistPageProps {
  profileInfo?: any | null;
}

const ArtistPage = ({ profileInfo }: ArtistPageProps) => {
  console.log('ARTIST: ', profileInfo);
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
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>
            {profileInfo?.user.name} {profileInfo?.user.surname}
          </h1>
          <div className='flex flex-grow gap-2'>
            <div className='w-[30vw]'>
              <Image
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
                src={profileInfo?.profilePic || ''}
                alt={'profile Image'}
              />
              <h4
                className='underline text-sm'
                onClick={() => profilePictureModal.onOpen}
              >
                Düzenle
              </h4>
            </div>

            <div className='w-full'>
              <label className='font-semibold text-neutral-600 text-lg'>
                Biografi
              </label>
              <div>{profileInfo?.biography}</div>
              <h4
                className='underline text-sm'
                onClick={() => biographyModal.onOpen}
              >
                Düzenle
              </h4>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
