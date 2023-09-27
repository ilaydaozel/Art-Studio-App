'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IArtwork, IExhibition } from '@/app/types';
import { useState } from 'react';
import Header from './Header';
import About from './About';
import ArtworkList from '../lists/ArtworkList';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import Popup from '../popup/Popup';
import SlidingButton from '../buttons/SlidingButton';

interface ExhibitionProfileProps {
  exhibition: IExhibition;
  artworks?: IArtwork[];
  isEditable?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: center;
  align-items: center;
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
const ExhibitionProfile = ({
  exhibition,
  artworks = [],
  isEditable = false,
}: ExhibitionProfileProps) => {
  const [showArtworkSelection, setShowArtworkSelection] = useState(false);

  return (
    <Container>
      <Header exhibition={exhibition}></Header>
      <About exhibition={exhibition}></About>
      <SlidingButton
        onClick={() => setShowArtworkSelection(true)}
        label='Sistemden Resim Seç'
      ></SlidingButton>
      {showArtworkSelection && (
        <Popup
          onClose={() => {
            setShowArtworkSelection(false);
          }}
          width='100%'
          body={
            <div className='flex justify-between gap-2'>
              {artworks ? (
                artworks.map((artwork) => (
                  <ArtworkThumbnail
                    key={artwork.id}
                    src={artwork.artworkMedias[0] || ''}
                  />
                ))
              ) : (
                <p>There are no artworks!</p>
              )}
            </div>
          }
          title={'Resim seç'}
          actionLabel={'Tamamla'}
          onSubmit={() => {}}
        ></Popup>
      )}
      <ComponentWithHeading headingText='Katılan Eserler'>
        <ArtworkList artworks={exhibition.artworks}></ArtworkList>
      </ComponentWithHeading>
    </Container>
  );
};

export default ExhibitionProfile;
