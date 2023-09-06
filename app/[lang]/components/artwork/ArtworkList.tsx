'use client';
import styled from 'styled-components';
import { IUserArtwork } from '@/app/[lang]/actions/type';
import { useRouter } from 'next/navigation';
import Artwork from './Artwork';
import EditMenu from '../menu/EditMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ArtworkListProps {
  artworks: IUserArtwork[] | null;
  width?: string;
  deletable?: boolean;
}

const ArtworkContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
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
  deletable = false,
}: ArtworkListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPage = () => {
    router.refresh();
  };

  const handleDeleteArtwork = (artworkId: string) => {
    setIsLoading(true);
    axios
      .delete(`/api/userArtwork/deleteUserArtwork/${artworkId}`)
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
      {artworks?.map((currentArtwork: IUserArtwork) => (
        <div key={currentArtwork.id} className='flex flex-col items-end'>
          <ArtworkContainer>
            <Artwork artwork={currentArtwork}></Artwork>
            {deletable ? (
              <EditMenu
                onDeleteClick={() => handleDeleteArtwork(currentArtwork.id)}
              ></EditMenu>
            ) : (
              <></>
            )}
          </ArtworkContainer>
        </div>
      ))}
    </ListContainer>
  );
};

export default ArtworkList;
