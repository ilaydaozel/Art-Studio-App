'use client';
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
import { useState } from 'react';
import { IArtistProfile, IUserArtwork } from '@/app/actions/type';
import AddArtworkModal from '@/app/components/modal/AddArtworkModal';
import SlidingButton from '@/app/components/buttons/SlidingButton';
import ArtworkList from '@/app/components/artwork/ArtworkList';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
`;
const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const HeaderImage = styled.div<{ imageUrl: string }>`
  width: 50%;
  height: 100%;
  position: absolute;
  transform: translateX(100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
`;

const ProfileImage = styled.img<{ imageUrl: string }>`
  width: 100%;
  height: auto;
  content: url(${(props) => props.imageUrl});
`;

const NameHeading = styled.text`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  color: ${COLORS.darkGray};
`;

const SectionTitle = styled.div`
  width: 80%;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  text-align: left;
  margin: 2rem 0 0.25rem 0;
`;

const BiographyContent = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  word-break: break-all;
`;

const InformaionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledDivider = styled.div`
  width: 84%;
  border-top: 1px solid #e5e7eb;
  height: 1px;
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
  return (
    <div>
      <ProfilePictureModal
        artistProfile={profileInfo}
        onClose={profilePictureModal.onClose}
        onUpdate={refreshPage}
      />
      <BiographyModal
        artistProfile={profileInfo}
        onClose={biographyModal.onClose}
        onUpdate={refreshPage}
      />
      <HeadingContainer>
        <div className='flex justify-center items-center w-[50%] h-full'>
          <NameHeading>
            {profileInfo.user.name} {profileInfo.user.surname}
          </NameHeading>
        </div>
        <HeaderImage
          imageUrl={artworks ? artworks[0]?.artworkMedias[0] : ''}
        ></HeaderImage>
      </HeadingContainer>

      <LayoutContainer>
        <InformaionContainer>
          <SectionTitle>Hakkında</SectionTitle>
          <StyledDivider />
          <div className='flex items-center gap-10 mx-40 my-20'>
            <div className='flex flex-col w-[35%]'>
              <ProfileImage
                imageUrl={profileInfo?.profilePic || ''}
              ></ProfileImage>
              <ButtonWithIcon>
                Düzenle
                <FaRegEdit onClick={profilePictureModal.onOpen} />
              </ButtonWithIcon>
            </div>
            <div className='flex flex-col w-[65%]'>
              <BiographyContent>{profileInfo?.biography}</BiographyContent>
              <ButtonWithIcon>
                Düzenle
                <FaRegEdit onClick={biographyModal.onOpen} />
              </ButtonWithIcon>
            </div>
          </div>
        </InformaionContainer>

        <ArtworksContainer>
          <SectionTitle>Seçilmiş Eserler</SectionTitle>
          <StyledDivider />
          <AddArtworkModal artistProfile={profileInfo} />
          <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-[84%] flex justify-end mt-2'>
              {artworks ? (
                artworks.length < 3 ? (
                  <SlidingButton
                    label='Yeni Eser Ekle'
                    onClick={() => {
                      addArtworkModal.onOpen();
                    }}
                    icon={FaRegSquarePlus}
                  />
                ) : (
                  <h1>Maximum eser sayısına ulaştınız.</h1>
                )
              ) : (
                <></>
              )}
            </div>
            <ArtworkList
              artworks={artworks ? artworks : null}
              width='90%'
              deletable={true}
            ></ArtworkList>
          </div>
        </ArtworksContainer>
      </LayoutContainer>
    </div>
  );
};

export default ArtistPage;
