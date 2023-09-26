'use client';
import styled from 'styled-components';
import { IArtwork } from '@/app/types';
import { useRouter } from 'next/navigation';
import Artwork from '../artwork/Artwork';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';

interface ArtworkListProps {
  artworks: IArtwork[];
  width?: string;
  isEditable?: boolean;
}

const ArtworkContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  margin: 16px 4px;
`;

const ListContainer = styled.div<{ width: string }>`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: ${(props) => props.width};
  margin: 2rem 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const ArtworkList = ({
  artworks,
  width = '100%',
  isEditable = false,
}: ArtworkListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };

  const handleDeleteArtwork = (artworkId: string) => {
    setIsLoading(true);
    axios
      .delete(`/api/artwork/deleteArtwork/${artworkId}`)
      .then(() => {
        toast.success('Eser silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
        refreshPage();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ListContainer width={width}>
      {artworks.map((currentArtwork: IArtwork) => (
        <div key={currentArtwork.id} className='flex flex-col items-end'>
          <Link href={`/artwork/${currentArtwork.id}`}>
            <ArtworkContainer>
              <Artwork artwork={currentArtwork}></Artwork>
              {isEditable ? (
                <EditMenu
                  onDeleteClick={() => handleDeleteArtwork(currentArtwork.id)}
                ></EditMenu>
              ) : (
                <></>
              )}
            </ArtworkContainer>
          </Link>
        </div>
      ))}
    </ListContainer>
  );
};

export default ArtworkList;
