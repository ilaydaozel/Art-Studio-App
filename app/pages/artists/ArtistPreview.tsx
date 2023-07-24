'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface ArtistPreviewProps {
  artist: any;
}

const NameText = styled.button`
  margin: 1%;
  pointer: cursor;
  color: ${COLORS.gray};
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.darkGray};
  }
`;

const ArtistPreview = ({ artist }: ArtistPreviewProps) => {
  const router = useRouter();
  const handleArtistClick = (artistId: string) => {
    router.push(`${ROUTE_PATHS.ARTIST_PROFILE}/${artistId}`);
  };
  return (
    <div onClick={() => handleArtistClick(artist.user.id)}>
      <NameText>
        {artist.user.name} {artist.user.surname}
      </NameText>
    </div>
  );
};

export default ArtistPreview;
