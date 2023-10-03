'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IArtwork } from '../../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import Popup from '../popup/Popup';
import useTranslate from '../../hooks/useTranslate';
import Image from 'next/image';

interface HeaderProps {
  artistProfile: IArtistProfile;
  artworks?: IArtwork[];
  isEditable?: boolean;
}

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  height: 100vh;
  width: 100%;
  padding: 1rem;
`;
const NameHeading = styled.text`
  font-size: 2.5rem;
  font-weight: bold;
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

  const handleHeaderArtworkSelection = (artwork: IArtwork) => {
    setHeaderArtwork(artwork.artworkMedias[0] || '');
  };

  const location = { element: 'header', superElement: 'artist_profile' };
  const t = useTranslate();

  const handleCoverImageChange = async (coverImage: String) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/artistProfile/${artistProfile.artistId}`, {
        coverImage,
      });
      toast.success(t('change_successful_message', location));
      setShowArtworkSelection(false);
      refreshPage();
    } catch (error) {
      toast.error(t('change_failed_message', location));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HeadingContainer>
        <div className='w-[55%] h-[65%] relative'>
          <Image
            src={artistProfile.coverImage || ''}
            alt={'Header image'}
            fill
            priority={true}
            placeholder='blur'
            sizes='55vw'
            blurDataURL={artistProfile?.coverImage || ''}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className='flex flex-col justify-center items-center w-[40%] h-full'>
          <NameHeading>
            {artistProfile.user.name} {artistProfile.user.surname}
          </NameHeading>
          {isEditable ? (
            <TextButton
              label={t('change_image_button_text', location)}
              icon={FaRegEdit}
              onClick={() => setShowArtworkSelection(true)}
            ></TextButton>
          ) : (
            <></>
          )}
        </div>
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
          title={t('select_cover_image', location)}
          actionLabel={t('select_button_text', location)}
          onSubmit={() => handleCoverImageChange(coverImage)}
        ></Popup>
      )}
    </>
  );
};

export default Header;
