'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IArtwork, IExhibition } from '@/app/types';
import { useEffect, useState } from 'react';
import Header from './Header';
import About from './About';
import ArtworkList from '../lists/ArtworkList';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import SlidingButton from '../buttons/SlidingButton';
import SelectExhibitionArtworkPopup from '../popup/SelectExhibitionArtworkPopup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
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
  const [remainingArtworks, setRemainingArtworks] = useState<IArtwork[]>([]);
  const router = useRouter();

  const handleDeleteArtworkFromExhibition = (artworkId: string) => {
    axios
      .post(`/api/exhibition/deleteArtworkFromExhibition/${exhibition.id}`, {
        artworkId,
      })
      .then(() => {
        toast.success('Eser sergiden silindi!');
        router.refresh();
      })
      .catch((error) => {
        console.log('error: ', error);
        toast.error('Bir şeyler yanlış gitti');
        router.refresh();
      });
  };

  useEffect(() => {
    setRemainingArtworks(
      artworks.filter(
        (artwork: IArtwork) => !exhibition.artworkIds.includes(artwork.id)
      )
    );
  }, [exhibition.artworkIds]);

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
          artworks={remainingArtworks}
          exhibition={exhibition}
        ></SelectExhibitionArtworkPopup>
      )}
      <ComponentWithHeading headingText='Katılan Eserler'>
        <ArtworkList
          artworks={exhibition.artworks}
          onDelete={handleDeleteArtworkFromExhibition}
          isEditable={true}
          width='90%'
        ></ArtworkList>
      </ComponentWithHeading>
    </Container>
  );
};

export default ExhibitionProfile;
