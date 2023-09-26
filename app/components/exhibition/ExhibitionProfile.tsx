'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { useState } from 'react';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/constants/routes';
import Header from './Header';
import About from './About';
import VirtualExhibitionPreview from './VirtualExhibitionPreview';
import ArtworkList from '../lists/ArtworkList';
import ComponentWithHeading from '../layouts/ComponentWithHeading';

interface ExhibitionProfileProps {
  exhibition: IExhibition;
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
      <Header exhibition={exhibition}></Header>
      <About exhibition={exhibition}></About>
      <ComponentWithHeading headingText='Katılan Eserler'>
        <ArtworkList artworks={exhibition.artworks}></ArtworkList>
      </ComponentWithHeading>
    </Container>
  );
};

export default ExhibitionProfile;
