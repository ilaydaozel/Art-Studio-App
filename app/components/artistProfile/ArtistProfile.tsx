'use client';

import styled from 'styled-components';
import { IArtistProfile, IArtwork } from '@/app/types';
import ArtworkList from '@/app/components/lists/ArtworkList';
import Header from '@/app/components/artistProfile/Header';
import About from '@/app/components/artistProfile/About';
import SlidingButton from '../buttons/SlidingButton';
import useCreateArtworkModal from '../../hooks/useCreateArtworkModal';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '../../hooks/useTranslate';
import CreateArtworkModal from '../modal/CreateArtworkModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface ArtistProfileProps {
  artistProfile: IArtistProfile;
  artworks?: IArtwork[];
  isEditable?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ArtistProfile = ({
  artistProfile,
  artworks,
  isEditable = false,
}: ArtistProfileProps) => {
  const createArtworkModal = useCreateArtworkModal();
  const location = {
    element: 'list',
    superElement: 'artist_profile',
  };
  const t = useTranslate();
  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  const handleDeleteArtwork = (artworkId: string) => {
    axios
      .delete(`/api/artwork/deleteArtwork/${artworkId}`)
      .then(() => {
        toast.success('Eser silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
        refreshPage();
      });
  };
  return (
    <Container>
      <Header
        artistProfile={artistProfile}
        artworks={artworks}
        isEditable={isEditable}
      ></Header>
      <About artistProfile={artistProfile} isEditable={isEditable}></About>
      <ComponentWithHeading headingText={t('heading', location)}>
        <CreateArtworkModal artistProfile={artistProfile}></CreateArtworkModal>
        {isEditable ? (
          <div className='w-[84%] flex justify-end mt-2'>
            {artworks ? (
              artworks.length < 3 ? (
                <SlidingButton
                  label={t('add_button_text', location)}
                  onClick={() => {
                    createArtworkModal.onOpen();
                  }}
                />
              ) : (
                <h1>{t('max_artwork_number_warning', location)}</h1>
              )
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {artworks ? (
          <ArtworkList
            artworks={artworks}
            width='90%'
            isEditable={isEditable}
            onDelete={handleDeleteArtwork}
          ></ArtworkList>
        ) : (
          <></>
        )}
      </ComponentWithHeading>
    </Container>
  );
};

export default ArtistProfile;
