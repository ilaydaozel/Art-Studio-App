'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '../../actions/type';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import Popup from '../popup/Popup';

interface HeaderProps {
  artistProfile: IArtistProfile;
  artworks: IUserArtwork[];
  isEditable: boolean;
}

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

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArtworkThumbnail = styled.img`
  width: 20vw;
  height: 40vh;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
const Header = ({
  artistProfile,
  artworks,
  isEditable = false,
}: HeaderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setHeaderArtwork] = useState(
    artistProfile?.coverImage || ''
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
      await axios.post(`/api/artistProfile/${artistProfile.artistId}`, {
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
    <>
      <HeadingContainer>
        <div className='flex flex-col justify-center items-center w-[50%] h-full'>
          <NameHeading>
            {artistProfile.user?.name} {artistProfile.user?.surname}
          </NameHeading>
          <TextButton
            label='Kapak Resmini Değiştir'
            icon={FaRegEdit}
            onClick={() => setShowArtworkSelection(true)}
          ></TextButton>
        </div>
        <HeaderImage imageUrl={coverImage}></HeaderImage>
      </HeadingContainer>

      {showArtworkSelection && (
        <Popup
          onClose={() => {
            setShowArtworkSelection(false);
            setHeaderArtwork(artistProfile?.coverImage || '');
          }}
          width='60%'
          body={
            <div className='flex justify-between gap-2'>
              {artworks?.map((artwork) => (
                <ArtworkThumbnail
                  key={artwork.id}
                  src={artwork.artworkMedias[0] || ''}
                  onClick={() => handleHeaderArtworkSelection(artwork)}
                />
              ))}
            </div>
          }
          title='Kapak Resmi Seç'
          actionLabel='Tamamla'
          onSubmit={() => handleCoverImageChange(coverImage)}
        ></Popup>
      )}
    </>
  );
};

export default Header;
