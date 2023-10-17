'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IArtwork } from '../../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import EditButton from '../buttons/EditButton';
import Popup from '../popup/Popup';
import useTranslate from '../../hooks/useTranslate';
import Image from 'next/image';
import { handleApiResponse } from '../utils/Helper';

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
    artistProfile?.coverImage || '/images/blurImage.jpg'
  );
  const [showArtworkSelection, setShowArtworkSelection] = useState(false);

  const handleHeaderArtworkSelection = (artwork: IArtwork) => {
    setHeaderArtwork(artwork.artworkMedias[0] || '/images/blurImage.jpg');
  };

  const location = { element: 'header', superElement: 'artist_profile' };
  const t = useTranslate();

  const handleCoverImageChange = async (coverImage: String) => {
    await handleApiResponse(
      axios.post(`/api/artistProfile/${artistProfile.artistId}`, {
        coverImage,
      }),
      setIsLoading,
      t,
      router,
      t('change_successful_message', location),
      () => {
        setShowArtworkSelection(false);
      }
    );
  };

  return (
    <>
      <HeadingContainer>
        <div className='w-[55%] h-[65%] relative'>
          <Image
            src={artistProfile.coverImage || '/images/blurImage.jpg'}
            alt={'Header image'}
            fill
            priority={true}
            placeholder='blur'
            sizes='55vw'
            blurDataURL={'/images/blurImage.jpg'}
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
            <EditButton
              label={t('change_image_button_text', location)}
              icon={FaRegEdit}
              onClick={() => setShowArtworkSelection(true)}
            ></EditButton>
          ) : (
            <></>
          )}
        </div>
      </HeadingContainer>

      {showArtworkSelection && (
        <Popup
          onClose={() => {
            setShowArtworkSelection(false);
            setHeaderArtwork(
              artistProfile?.coverImage || '/images/blurImage.jpg'
            );
          }}
          width='60%'
          body={
            <div className='flex justify-between gap-2'>
              {artworks?.map((artwork) => (
                <ArtworkThumbnail
                  key={artwork.id}
                  src={artwork.artworkMedias[0] || '/images/blurImage.jpg'}
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
