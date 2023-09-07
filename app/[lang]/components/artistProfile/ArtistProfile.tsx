'use client';

import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '@/app/[lang]/actions/type';
import ArtworkList from '@/app/[lang]/components/lists/ArtworkList';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import Header from '@/app/[lang]/components/artistProfile/Header';
import About from '@/app/[lang]/components/artistProfile/About';
import SlidingButton from '../buttons/SlidingButton';
import useAddArtworkModal from '../../hooks/useAddArtworkModal';
import AddArtworkModal from '../modal/AddArtworkModal';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
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
  return (
    <Container>
      <Header
        artistProfile={artistProfile}
        artworks={artworks}
        isEditable={isEditable}
      ></Header>
      <About artistProfile={artistProfile} isEditable={isEditable}></About>
      <ComponentWithHeading headingText='Seçilmiş Eserler'>
        <AddArtworkModal artistProfile={artistProfile} />
        {isEditable ? (
          <div className='w-[84%] flex justify-end mt-2'>
            {artworks ? (
              artworks.length < 3 ? (
                <SlidingButton
                  label='Yeni Eser Ekle +'
                  onClick={() => {
                    addArtworkModal.onOpen();
                  }}
                />
              ) : (
                <h1>Maximum eser sayısına ulaştınız.</h1>
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
