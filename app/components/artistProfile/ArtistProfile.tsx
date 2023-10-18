'use client';

import styled from 'styled-components';
import { IArtistProfile } from '@/app/types';
import ArtworkList from '@/app/components/lists/ArtworkList';
import Header from '@/app/components/artistProfile/Header';
import About from '@/app/components/artistProfile/About';
import SlidingButton from '../buttons/SlidingButton';
import useCreateArtworkModal from '../../hooks/useCreateArtworkModal';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '../../hooks/useTranslate';
import CreateArtworkModal from '../modal/CreateArtworkModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { handleApiResponse } from '../utils/Helper';
import { useState } from 'react';
import EmptyState from '../EmptyState';
interface ArtistProfileProps {
  artistProfile: IArtistProfile;
  isEditable?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ArtistProfile = ({
  artistProfile,
  isEditable = false,
}: ArtistProfileProps) => {
  const createArtworkModal = useCreateArtworkModal();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslate();
  const router = useRouter();
  const location = {
    element: 'list',
    superElement: 'artist_profile',
  };

  const handleDeleteArtwork = async (artworkId: string) => {
    await handleApiResponse(
      axios.delete(`/api/artwork/deleteArtwork/${artworkId}`),
      setIsLoading,
      t,
      router,
      t('delete_successful_message', { element: 'artist_profile' })
    );
  };
  return (
    <Container>
      <Header
        artistProfile={artistProfile}
        artworks={artistProfile.artworks}
        isEditable={isEditable}
      ></Header>
      <About artistProfile={artistProfile} isEditable={isEditable}></About>
      <ComponentWithHeading headingText={t('heading', location)}>
        <CreateArtworkModal artistProfile={artistProfile}></CreateArtworkModal>
        {isEditable &&
          (artistProfile.artworks.length < 3 ? (
            <SlidingButton
              label={t('add_button_text', location)}
              onClick={() => {
                createArtworkModal.onOpen();
              }}
            />
          ) : (
            <h1>{t('max_artwork_number_warning', location)}</h1>
          ))}

        <div className='w-[84%] flex justify-center mt-2'>
          {artistProfile.artworks.length > 0 ? (
            <ArtworkList
              artworks={artistProfile.artworks}
              width='90%'
              isEditable={isEditable}
              onDelete={handleDeleteArtwork}
            ></ArtworkList>
          ) : (
            <EmptyState item='artworks' />
          )}
        </div>
      </ComponentWithHeading>
    </Container>
  );
};

export default ArtistProfile;
