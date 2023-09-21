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
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 5rem 0;
  width: ${(props) => props.width};
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
