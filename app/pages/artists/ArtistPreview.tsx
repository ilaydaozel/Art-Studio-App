'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface ArtistPreviewProps {
  artist: any;
}

const NameText = styled.button`
  pointer: cursor;
  color: #fff;
  transition: color 0.2s;
  position: absolute;
  bottom: 2px;
`;

const ArtistContainer = styled.div<{ profilePic: string }>`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-image: ${(props) => `url('${props.profilePic}')`};
  background-size: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  position: relative;
  font-size: 150%;
  transition: font-size 0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:hover {
    font-size: 175%;
  }
`;

const ArtistPreview = ({ artist }: ArtistPreviewProps) => {
  const router = useRouter();
  console.log('pp:', artist.profilePic);

  const handleArtistClick = (artistId: string) => {
    router.push(`${ROUTE_PATHS.ARTIST_PROFILE}/${artistId}`);
  };
  return (
    <div onClick={() => handleArtistClick(artist.user.id)}>
      <ArtistContainer profilePic={artist.profilePic}>
        <NameText>
          {artist.user.name} {artist.user.surname}
        </NameText>
      </ArtistContainer>
    </div>
  );
};

export default ArtistPreview;
