'use client';

import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '@/app/types';
import ArtworkList from '@/app/components/lists/ArtworkList';
import HeadingWithUnderline from '@/app/components/heading/HeadingWithUnderline';
import Header from '@/app/components/artistProfile/Header';
import About from '@/app/components/artistProfile/About';
import SlidingButton from '../buttons/SlidingButton';
import useAddArtworkModal from '../../hooks/useAddArtworkModal';
import AddArtworkModal from '../modal/AddArtworkModal';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
interface ArtistProfileProps {
  artistProfile: IArtistProfile;
  artworks?: IUserArtwork[];
  isEditable?: boolean;
  messages: any;
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
  messages,
}: ArtistProfileProps) => {
  const addArtworkModal = useAddArtworkModal();
  console.log('messages: ', messages);
  return (
    <Container>
      <Header
        artistProfile={artistProfile}
        artworks={artworks}
        isEditable={isEditable}
        messages={messages.header}
      ></Header>
      <About
        artistProfile={artistProfile}
        isEditable={isEditable}
        messages={messages.about}
      ></About>
      <ComponentWithHeading headingText={messages.list.heading}>
        <AddArtworkModal artistProfile={artistProfile} />
        {isEditable ? (
          <div className='w-[84%] flex justify-end mt-2'>
            {artworks ? (
              artworks.length < 3 ? (
                <SlidingButton
                  label={messages.list.add_button_text}
                  onClick={() => {
                    addArtworkModal.onOpen();
                  }}
                />
              ) : (
                <h1>{messages.list.max_artwork_number_warning}</h1>
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
