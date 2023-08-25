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
import axios from 'axios';
import toast from 'react-hot-toast';
import HeadingWithUnderline from '@/app/components/HeadingWithUnderline';
import TextButton from '@/app/components/buttons/TextButton';

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
const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameHeading = styled.text`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  margin: 10px;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const BiographyContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  word-break: break-all;
`;
const BiographyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
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

const ArtworkSelectionPopup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const ArtworkThumbnail = styled.img`
  width: 30%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
interface ArtistPageProps {
  profileInfo: IArtistProfile;
  artworks?: IUserArtwork[] | null;
}

const ArtistPage = ({ profileInfo, artworks }: ArtistPageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const biographyModal = useBiographyModal();
  const profilePictureModal = useProfilePictureModal();
  const addArtworkModal = useAddArtworkModal();
  const [headerArtwork, setHeaderArtwork] = useState(
    profileInfo?.coverImage || ''
  );
  const [showArtworkSelection, setShowArtworkSelection] = useState(false);
  const refreshPage = () => {
    router.refresh();
  };

  const handleHeaderArtworkSelection = (artwork: IUserArtwork) => {
    setHeaderArtwork(artwork.artworkMedias[0] || '');
  };

  const handleCoverImageChange = async (coverImage: String) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/artistProfile/${profileInfo.artistId}`, {
        coverImage,
      });
      toast.success('Kapak fotoğrafı güncellendi!');
      setShowArtworkSelection(false);
      refreshPage();
    } catch (error) {
      toast.error('Error');
      console.log('Kapak fotoğrafı error: ', error);
    } finally {
      setIsLoading(false);
    }
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
        <div className='flex flex-col justify-center items-center w-[50%] h-full'>
          <NameHeading>
            {profileInfo.user.name} {profileInfo.user.surname}
          </NameHeading>
          <TextButton
            label='Kapak Resmini Değiştir'
            icon={FaRegEdit}
            onClick={() => setShowArtworkSelection(true)}
          ></TextButton>
        </div>
        <HeaderImage imageUrl={headerArtwork}></HeaderImage>
      </HeadingContainer>

      {showArtworkSelection && (
        <ArtworkSelectionPopup>
          <div>
            <CloseButton onClick={() => setShowArtworkSelection(false)}>
              X
            </CloseButton>
            <h2>Kapak Resmi Seç</h2>
          </div>
          <div className='flex justify-between'>
            {artworks?.map((artwork) => (
              <ArtworkThumbnail
                key={artwork.id}
                src={artwork.artworkMedias[0] || ''}
                onClick={() => handleHeaderArtworkSelection(artwork)}
              />
            ))}
          </div>
          <SlidingButton
            label='Tamamla'
            onClick={() => handleCoverImageChange(headerArtwork)}
          />
        </ArtworkSelectionPopup>
      )}
      <LayoutContainer>
        <InformaionContainer>
          <HeadingWithUnderline title='Hakkında'></HeadingWithUnderline>
          <div className='flex items-center justify-center w-[80%] my-10 gap-10'>
            <ProfileImageContainer className='xl:w-[35%] md:w-[40%] sm:w-[50%]'>
              <ProfileImage
                imageUrl={profileInfo?.profilePic || ''}
              ></ProfileImage>
              <TextButton
                label='Düzenle'
                icon={FaRegEdit}
                onClick={profilePictureModal.onOpen}
              ></TextButton>
            </ProfileImageContainer>
            <BiographyContainer>
              <BiographyContent>{profileInfo?.biography}</BiographyContent>
              <TextButton
                label='Düzenle'
                icon={FaRegEdit}
                onClick={biographyModal.onOpen}
              ></TextButton>
            </BiographyContainer>
          </div>
        </InformaionContainer>

        <ArtworksContainer>
          <HeadingWithUnderline title='Seçilmiş Eserler'></HeadingWithUnderline>
          <AddArtworkModal artistProfile={profileInfo} />
          <div className='w-full flex flex-col items-center justify-center'>
            <div className='w-[84%] flex justify-end mt-2'>
              {artworks ? (
                artworks.length < 3 ? (
                  <SlidingButton
                    label='Yeni Eser Ekle +'
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
