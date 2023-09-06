'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/constants/routes';
import ArtistAcccountMenu from './ArtistAcccountMenu';
import { IUser } from '@/app/[lang]/actions/type';
import ArtistPreview from '../../artists/ArtistPreview';

const ArtistContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin: 16px 4px;
`;

interface ArtistAccountPreviewProps {
  artist: IUser;
}

const ArtistAccountPreview = ({ artist }: ArtistAccountPreviewProps) => {
  const router = useRouter();
  const handleEdit = (artist: IUser) => {
    router.push(
      `${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${artist.id}`
    );
  };

  return (
    <ArtistContainer key={artist.id} onClick={() => handleEdit(artist)}>
      <ArtistPreview artist={artist}></ArtistPreview>
      <ArtistAcccountMenu currentArtist={artist}></ArtistAcccountMenu>
    </ArtistContainer>
  );
};

export default ArtistAccountPreview;
