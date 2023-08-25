'use client';
import styled from 'styled-components';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { IArtistProfile } from '@/app/actions/type';
import { useState } from 'react';

interface ArtistPreviewProps {
  artist: IArtistProfile;
}

const NameText = styled.div<{ isLoading: boolean }>`
  pointer-events: ${(props) => (props.isLoading ? 'none' : 'auto')};
  color: #fff;
  transition: color 0.2s;
  position: absolute;
  bottom: 2px;
`;

const ArtistBox = styled.div<{ profilePic: string }>`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.profilePic});
  background-size: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  position: relative;
  font-size: 1.5rem;
  transition: font-size 0.2s background-color:0.2s;

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
    font-size: 1.7rem;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
    font-size: 1.2 rem;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    font-size: 1rem;
  }
`;

const ArtistPreview = ({ artist }: ArtistPreviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleArtistClick = async (artistId: string) => {
    try {
      setIsLoading(true);
      await router.push(`${ROUTE_PATHS.ARTIST_PROFILE}/${artistId}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <ArtistBox
      onClick={() => handleArtistClick(artist.user.id)}
      profilePic={artist.profilePic ? artist.profilePic : ''}
    >
      <NameText isLoading={isLoading}>
        {artist.user.name} {artist.user.surname}
      </NameText>
    </ArtistBox>
  );
};

export default ArtistPreview;
