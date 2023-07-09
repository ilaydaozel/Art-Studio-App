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
import useAddArtworkModal from '@/app/hooks/useAddArtworkModal';

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
  align-items: center;
  gap: 4%;
`;
interface ArtistPageProps {
  profileInfo?: any | null;
}

const ArtistPage = ({ profileInfo }: ArtistPageProps) => {
  console.log('ARTIST: ', profileInfo);
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
  const addArtworkModal = useAddArtworkModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log('sent data:', data);
    axios
      .post('/api/artistProfile', data)
      .then(() => {
        toast.success('Sanatçı sayfası güncellendi!');
        window.location.reload();
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
            <div className='pt-12'>
              <div className='w-[30vw] min-h-[40vh] p-2 shadow-lg'>
                <Image
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                  src={profileInfo?.profilePic || ''}
                  alt={'profile Image'}
                />
              </div>
              <h4
                className='underline text-sm'
                onClick={() => profilePictureModal.onOpen}
              >
                Düzenle
              </h4>
            </div>
            <div>
              <div className='w-full min-h-[50vh]'>
                <BiographyHeading>Biografi</BiographyHeading>
                <BiographyContent>{profileInfo?.biography}</BiographyContent>
              </div>
              <h4
                className='underline text-sm'
                onClick={() => biographyModal.onOpen}
              >
                Düzenle
              </h4>
            </div>
          </InformaionContainer>
          <div>
            <div className='p-2 h-[50vh] shadow-xl rounded-xl m-4'>
              <div className='flex h-full flex-grow justify-between'>
                <PictureContainer
                  onClick={() => {
                    addArtworkModal.onOpen();
                  }}
                >
                  Eser Bilgilerini Gir
                </PictureContainer>
                <PictureContainer
                  onClick={() => {
                    addArtworkModal.onOpen();
                  }}
                >
                  Eser Bilgilerini Gir
                </PictureContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
