'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/constants/routes';
import ArtistAcccountMenu from './ArtistAcccountMenu';
import { IUser } from '@/app/[lang]/actions/type';

const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  gap: 4px;
  border: 1px solid ${COLORS.gray};
  border-radius: 50px;
`;

const ArtistName = styled.text`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.gray};
  &:hover {
    color: ${COLORS.darkGray};
    text-decoration: underline;
  }
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
    <ArtistContainer key={artist.id}>
      <ArtistName onClick={() => handleEdit(artist)}>
        {artist.name} {artist.surname}
      </ArtistName>
      <ArtistAcccountMenu currentArtist={artist}></ArtistAcccountMenu>
    </ArtistContainer>
  );
};

export default ArtistAccountPreview;
