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
import { FaRegSquarePlus } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import { useState } from 'react';
import ArtworkContainer from '@/app/components/artwork/ArtworkContainer';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { IArtistProfile, IUserArtwork } from '@/app/actions/type';

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
const ButtonWithIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 4px;
  cursor: pointer;
  color: ${COLORS.gray};
  transition: color 0.2s transform 0.2s;

  &:hover {
    color: ${COLORS.darkGray};
    transform: scale(1.1);
  }
`;
const AddArtworkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

interface ArtistPageProps {
  profileInfo: IArtistProfile;
  artworks?: IUserArtwork[] | null;
}

const ArtistPage = ({ profileInfo, artworks }: ArtistPageProps) => {
  const router = useRouter();
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
  const addArtworkModal = useAddArtworkModal();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };
  const handleDelete = (artworkId: string) => {
    setIsLoading(true);

    axios
      .delete(`/api/userArtwork/${artworkId}`)
      .then(() => {
        toast.success('Eser silindi!');
        refreshPage();
      })
      .catch(() => {
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
            <div className='flex flex-col items-end pt-12'>
              <ProfilePictureModal
                artistProfile={profileInfo}
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
              <ButtonWithIcon>
                Düzenle
                <FaRegEdit onClick={profilePictureModal.onOpen} />
              </ButtonWithIcon>
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
                  <ButtonWithIcon>
                    Düzenle
                    <FaRegEdit onClick={biographyModal.onOpen} />
                  </ButtonWithIcon>
                </div>
                <BiographyContent>{profileInfo?.biography}</BiographyContent>
              </div>
            </div>
          </InformaionContainer>
          <div>
            <div className='p-10 rounded-xl flex flex-col items-end justify-center'>
              {artworks ? (
                artworks.length < 3 ? (
                  <AddArtworkButton
                    onClick={() => {
                      addArtworkModal.onOpen();
                    }}
                  >
                    Yeni Eser Ekle
                    <FaRegSquarePlus></FaRegSquarePlus>
                  </AddArtworkButton>
                ) : (
                  <h1>Maximum eser sayısına ulaştınız.</h1>
                )
              ) : (
                <></>
              )}

              <div className='flex w-full flex-wrap justify-around'>
                {artworks?.map((currentArtwork: IUserArtwork) => (
                  <div
                    key={currentArtwork.id}
                    className='flex flex-col items-end'
                  >
                    <ArtworkContainer
                      artwork={currentArtwork}
                    ></ArtworkContainer>
                    <ButtonWithIcon
                      onClick={() => handleDelete(currentArtwork.id)}
                    >
                      Sil
                      <MdDeleteForever style={{ width: '50%' }} />
                    </ButtonWithIcon>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
