'use client';

import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '@/app/types';
import ArtworkList from '@/app/components/lists/ArtworkList';
import Header from '@/app/components/artistProfile/Header';
import About from '@/app/components/artistProfile/About';
import SlidingButton from '../buttons/SlidingButton';
import useAddArtworkModal from '../../hooks/useAddArtworkModal';
import AddArtworkModal from '../modal/AddArtworkModal';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '../../hooks/useTranslate';
interface ArtistProfileProps {
  artistProfile: IArtistProfile;
  artworks?: IUserArtwork[];
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
  const addArtworkModal = useAddArtworkModal();

  const useT = (text: string): string => {
    return useTranslate(text, {
      element: 'list',
      superElement: 'artist_profile',
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
      <ComponentWithHeading headingText={useT('heading')}>
        <AddArtworkModal artistProfile={artistProfile} />
        {isEditable ? (
          <div className='w-[84%] flex justify-end mt-2'>
            {artworks ? (
              artworks.length < 3 ? (
                <SlidingButton
                  label={useT('add_button_text')}
                  onClick={() => {
                    addArtworkModal.onOpen();
                  }}
                />
              ) : (
                <h1>{useT('max_artwork_number_warning')}</h1>
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
          ></ArtworkList>
        ) : (
          <></>
        )}
      </ComponentWithHeading>
    </Container>
  );
};

export default ArtistProfile;
