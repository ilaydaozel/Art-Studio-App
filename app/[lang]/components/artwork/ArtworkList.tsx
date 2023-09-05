'use client';
import styled from 'styled-components';
import { IUserArtwork } from '@/app/[lang]/actions/type';
import { COLORS } from '@/constants/colors';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteForever } from 'react-icons/md';
import ArtworkContainer from './ArtworkContainer';
import TextButton from '../buttons/TextButton';

interface ArtworkListProps {
  artworks: IUserArtwork[] | null;
  width?: string;
  deletable?: boolean;
}

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

  const handleDelete = (artworkId: string) => {
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
          <ArtworkContainer artwork={currentArtwork}></ArtworkContainer>
          {deletable ? (
            <TextButton
              label='Sil'
              icon={MdDeleteForever}
              onClick={() => handleDelete(currentArtwork.id)}
            ></TextButton>
          ) : (
            <></>
          )}
        </div>
      ))}
    </ListContainer>
  );
};

export default ArtworkList;
