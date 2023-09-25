'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { useState } from 'react';
import Popup from '../popup/Popup';
import StartMenu from '../virtualExhibition/StartMenu';

interface ExhibitionProfileProps {
  exhibition: IExhibition;
  isEditable?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ExhibitionProfile = ({
  exhibition,
  isEditable = false,
}: ExhibitionProfileProps) => {
  const [showExhibition, setShowExhibition] = useState(false);

  const location = {
    element: 'list',
    superElement: 'artist_profile',
  };
  const t = useTranslate();

  return (
    <Container>
      <button onClick={() => setShowExhibition(true)}>Virtual Reality</button>

      {showExhibition && (
        <Popup
          onClose={() => setShowExhibition(false)}
          width='100%'
          isFullScreen={true}
          body={<StartMenu artworks={exhibition.artworks}></StartMenu>}
        ></Popup>
      )}
    </Container>
  );
};

export default ExhibitionProfile;
