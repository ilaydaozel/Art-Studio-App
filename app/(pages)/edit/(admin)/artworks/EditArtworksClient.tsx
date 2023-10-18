'use client';

import { IArtwork } from '@/app/types';
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
interface EditArtworksClientProps {
  artworks: IArtwork[];
}

const EditArtworksClient = ({ artworks }: EditArtworksClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const location = { element: 'artist_accounts' };
  const t = useTranslate();

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
    <>
      <ListWithButton
        buttonText={t('add_button_text', location)}
        onClick={() => router.push(`${ROUTE_PATHS.REGISTER}`)}
      >
        <ComponentWithHeading headingText={t('list_heading', location)}>
          {artworks.length > 0 ? (
            <ArtworkList
              isEditable
              artworks={artworks}
              onDelete={handleDeleteArtwork}
            ></ArtworkList>
          ) : (
            <EmptyState title='No Artworks found'></EmptyState>
          )}
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditArtworksClient;
