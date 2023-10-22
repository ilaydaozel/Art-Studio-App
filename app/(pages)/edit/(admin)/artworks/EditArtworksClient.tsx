'use client';

import { IArtistProfile, IArtwork } from '@/app/types';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import useTranslate from '@/app/hooks/useTranslate';
import ArtworkList from '@/app/components/lists/ArtworkList';
import axios from 'axios';
import { useState } from 'react';
import EmptyState from '@/app/components/EmptyState';
import { handleApiResponse } from '@/app/components/utils/Helper';
import SlidingButton from '@/app/components/buttons/SlidingButton';
import CreateExhibitionArtworkModal from '@/app/components/modal/CreateExhibitionArtworkModal';
import useCreateExhibitionArtworkModal from '@/app/hooks/useCreateExhibitionArtworkModal';
interface EditArtworksClientProps {
  artworks: IArtwork[];
  artistProfiles: IArtistProfile[];
}

const EditArtworksClient = ({
  artworks,
  artistProfiles,
}: EditArtworksClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const location = { element: 'edit_artworks' };
  const t = useTranslate();
  const createExhibitionArtworkModal = useCreateExhibitionArtworkModal();

  const handleDeleteArtwork = async (artworkId: string) => {
    await handleApiResponse(
      axios.delete(`/api/artwork/deleteArtwork/${artworkId}`),
      setIsLoading,
      t,
      router,
      t('delete_successful_message', location)
    );
  };
  return (
    <>
      <ListWithButton
        buttonText={t('add_button_text', location)}
        onClick={() => {
          createExhibitionArtworkModal.onOpen();
        }}
      >
        <CreateExhibitionArtworkModal
          allArtistProfiles={artistProfiles}
        ></CreateExhibitionArtworkModal>

        <ComponentWithHeading headingText={t('heading', location)}>
          <div className='flex gap-2'></div>
          {artworks.length > 0 ? (
            <ArtworkList
              isEditable
              artworks={artworks}
              onDelete={handleDeleteArtwork}
              width='84%'
            ></ArtworkList>
          ) : (
            <EmptyState item='artworks'></EmptyState>
          )}
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditArtworksClient;
