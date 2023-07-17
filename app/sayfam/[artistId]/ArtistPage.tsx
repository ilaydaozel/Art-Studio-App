'use client';
import Image from 'next/image';
import useBiographyModal from '@/app/hooks/useBiographyModal';
import useProfilePictureModal from '@/app/hooks/useProfilePictureModal';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import useAddArtworkModal from '@/app/hooks/useAddArtworkModal';
import BiographyModal from '@/app/components/modal/BiographyModal';
import { useRouter } from 'next/navigation';
import ProfilePictureModal from '@/app/components/modal/ProfilePictureModal';
import { FaRegEdit } from 'react-icons/fa';
import { useState } from 'react';

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
  font-size: 1.25rem;
  font-weight: 500;
  color: ${COLORS.gray};
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
  const router = useRouter();
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
  const addArtworkModal = useAddArtworkModal();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
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
            <div className='flex flex-col items-end pt-12'>
              <ProfilePictureModal
                pictureLink={profileInfo?.profilePic}
                onClose={profilePictureModal.onClose}
                onUpdate={refreshPage}
              />
              <div className='p-1 shadow-lg'>
                <Image
                  width={350}
                  height={300}
                  src={profileInfo?.profilePic || ''}
                  alt={'profile Image'}
                />
              </div>
              <FaRegEdit
                className='cursor-pointer'
                onClick={biographyModal.onOpen}
              />
            </div>

            <div>
              <BiographyModal
                artistProfile={profileInfo}
                onClose={biographyModal.onClose}
                onUpdate={refreshPage}
              />
              <div className='w-full min-h-[50vh]'>
                <div className='flex flex-row items-baseline gap-4'>
                  <BiographyHeading>Biografi</BiographyHeading>
                  <FaRegEdit
                    className='cursor-pointer'
                    onClick={biographyModal.onOpen}
                  />
                </div>
                <BiographyContent>{profileInfo?.biography}</BiographyContent>
              </div>
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