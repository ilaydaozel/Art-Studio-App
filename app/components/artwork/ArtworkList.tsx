'use client';
import styled from 'styled-components';
import { IUserArtwork } from '@/app/actions/type';
import { COLORS } from '@/constants/colors';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteForever } from 'react-icons/md';
import ArtworkContainer from './ArtworkContainer';

interface ArtworkListProps {
  artworks: IUserArtwork[] | null;
  width?: string;
  deletable?: boolean;
}

const ListContainer = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 5rem 0;
  width: ${(props) => props.width};
`;

const ButtonWithIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 4px;
  cursor: pointer;
  color: ${COLORS.gray};
  transition: color 0.2s transform 0.2s;

  &:hover {
    color: ${COLORS.darkGray};
  }
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
            <ButtonWithIcon onClick={() => handleDelete(currentArtwork.id)}>
              Sil
              <MdDeleteForever style={{ width: '50%' }} />
            </ButtonWithIcon>
          ) : (
            <></>
          )}
        </div>
      ))}
    </ListContainer>
  );
};

export default ArtworkList;
