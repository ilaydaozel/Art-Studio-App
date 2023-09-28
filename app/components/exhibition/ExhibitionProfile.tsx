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
import SelectExhibitionArtworkPopup from '../popup/SelectExhibitionArtworkPopup';

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
        <SelectExhibitionArtworkPopup
          onClose={() => {
            setShowArtworkSelection(false);
          }}
          artworks={artworks}
          exhibition={exhibition}
        ></SelectExhibitionArtworkPopup>
      )}
      <ComponentWithHeading headingText='Katılan Eserler'>
        <ArtworkList artworks={exhibition.artworks}></ArtworkList>
      </ComponentWithHeading>
    </Container>
  );
};

export default ExhibitionProfile;
