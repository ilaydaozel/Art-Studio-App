'use client';
import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '@/app/[lang]/actions/type';
import ArtworkList from '@/app/[lang]/components/lists/ArtworkList';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import Header from '@/app/[lang]/components/artistProfile/Header';
import About from '@/app/[lang]/components/artistProfile/About';

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

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArtistProfile = ({
  artistProfile,
  artworks,
  isEditable = false,
}: ArtistProfileProps) => {
  return (
    <Container>
      <Header
        artistProfile={artistProfile}
        artworks={artworks}
        isEditable={isEditable}
      ></Header>
      <About artistProfile={artistProfile} isEditable={isEditable}></About>
      <ArtworksContainer>
        <HeadingWithUnderline title='Seçilmiş Eserler'></HeadingWithUnderline>
        {artworks ? (
          <ArtworkList
            artworks={artworks}
            width='90%'
            isEditable={isEditable}
          ></ArtworkList>
        ) : (
          <></>
        )}
      </ArtworksContainer>
    </Container>
  );
};

export default ArtistProfile;
