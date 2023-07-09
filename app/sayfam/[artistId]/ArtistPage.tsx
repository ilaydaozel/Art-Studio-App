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
const NameHeading = styled.text`
  font-size: 3.5vw;
  font-weight: 600;
  color: ${COLORS.darkGray};
`;
const BiographyHeading = styled.text`
  font-size: 2.5vw;
  font-weight: 600;
  color: ${COLORS.darkGray};
`;
const BiographyContent = styled.text`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
`;
const HeadingContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: solid 1px;
  border-color: ${COLORS.lightGray};
  padding: 3% 1% 1% 0;
`;
const InformaionContainer = styled.div`
  margin: 6% 2% 3% 2%;
  display: flex;
  gap: 4%;
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
      <div className='p-[2vw]'>
        <div className='flex flex-col'>
          <HeadingContainer>
            <NameHeading>
              {profileInfo?.user.name} {profileInfo?.user.surname}
            </NameHeading>
          </HeadingContainer>

          <InformaionContainer>
            <div className='w-[40vw]'>
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
              <BiographyHeading>Biografi</BiographyHeading>
              <BiographyContent>{profileInfo?.biography}</BiographyContent>
              <h4
                className='underline text-sm'
                onClick={() => biographyModal.onOpen}
              >
                Düzenle
              </h4>
            </div>
          </InformaionContainer>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
