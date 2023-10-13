'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IArtistProfile, IArtwork, IExhibition } from '@/app/types';
import { useEffect, useState } from 'react';
import Header from './Header';
import About from './About';
import ArtworkList from '../lists/ArtworkList';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import SlidingButton from '../buttons/SlidingButton';
import SelectExhibitionArtworkPopup from '../popup/SelectExhibitionArtworkPopup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CreateExhibitionArtworkModal from '../modal/CreateExhibitionArtworkModal';
import useCreateExhibitionArtworkModal from '@/app/hooks/useCreateExhibitionArtworkModal';

import VirtualExhibitionPreview from './VirtualExhibitionPreview';
import { handleApiResponse } from '../utils/Helper';
interface ExhibitionProfileProps {
  exhibition: IExhibition;
  artworks?: IArtwork[];
  isEditable?: boolean;
  allArtistProfiles?: IArtistProfile[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: center;
  align-items: center;
`;

const ExhibitionProfile = ({
  exhibition,
  artworks = [],
  isEditable = false,
  allArtistProfiles,
}: ExhibitionProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showArtworkSelection, setShowArtworkSelection] = useState(false);
  const [remainingArtworks, setRemainingArtworks] = useState<IArtwork[]>([]);
  const router = useRouter();
  const createExhibitionArtworkModal = useCreateExhibitionArtworkModal();
  const t = useTranslate();
  const location = {
    element: 'list',
    superElement: 'exhibition_profile',
  };
  const handleDeleteArtworkFromExhibition = async (artworkId: string) => {
    await handleApiResponse(
      axios.post(
        `/api/exhibition/deleteArtworkFromExhibition/${exhibition.id}`,
        {
          artworkId,
        }
      ),
      setIsLoading,
      t,
      router,
      t('delete_successful_message', { element: 'exhibition_profile' })
    );
  };

  useEffect(() => {
    setRemainingArtworks(
      artworks.filter(
        (artwork: IArtwork) => !exhibition.artworkIds.includes(artwork.id)
      )
    );
  }, [exhibition.artworkIds]);

  return (
    <Container>
      <Header exhibition={exhibition}></Header>
      <About exhibition={exhibition} isEditable={isEditable}></About>
      <CreateExhibitionArtworkModal
        allArtistProfiles={allArtistProfiles || []}
      ></CreateExhibitionArtworkModal>
      <VirtualExhibitionPreview exhibition={exhibition} />
      {showArtworkSelection && (
        <SelectExhibitionArtworkPopup
          onClose={() => {
            setShowArtworkSelection(false);
          }}
          artworks={remainingArtworks}
          exhibition={exhibition}
        ></SelectExhibitionArtworkPopup>
      )}
      <ComponentWithHeading headingText={t('heading', location)}>
        {isEditable && (
          <div className='flex gap-2'>
            <SlidingButton
              label={t('add_button_text', location)}
              onClick={() => {
                createExhibitionArtworkModal.onOpen();
              }}
            />
            <SlidingButton
              onClick={() => setShowArtworkSelection(true)}
              label={t('add_artwork_to_exhibition_button_text', location)}
            ></SlidingButton>
          </div>
        )}

        <ArtworkList
          artworks={exhibition.artworks}
          onDelete={handleDeleteArtworkFromExhibition}
          isEditable={isEditable}
          width='90%'
        ></ArtworkList>
      </ComponentWithHeading>
    </Container>
  );
};

export default ExhibitionProfile;
